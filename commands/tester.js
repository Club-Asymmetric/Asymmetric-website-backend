import database from "../database.js";
import { fileURLToPath } from "url";
import path from "path";
import fs from "fs/promises";
import mime from "mime-types";
import dotenv from "dotenv";
import { publicDecrypt } from "crypto";
import { RecordId } from "surrealdb";

dotenv.config();

const db = await database("event_registrations");
try {
  let promises = [];
  let pathStructure = {};
  async function recursiveRead(dir, cur = pathStructure) {
    const entries = await fs.readdir(dir, { withFileTypes: true });
    for (const entry of entries) {
      const fullPath = path.join(dir, entry.name);
      if (entry.isDirectory()) {
        cur[entry.name] = {};
        await recursiveRead(fullPath, cur[entry.name]);
      } else {
        const mimeType = mime.lookup(entry.name);
        if (mimeType && mimeType.startsWith("image/")) {
          const photo = (
            await db.create("photo", {
              binary: await fs.readFile(fullPath, null),
              mime: mimeType.split("/")[1],
            })
          )[0].id.id;
          cur[entry.name] = photo;
        }
      }
    }
  }
  await recursiveRead(
    path.join(path.dirname(fileURLToPath(import.meta.url)), "../photos")
  );
  console.log(pathStructure);
  await Promise.all(promises);
} catch (error) {
  console.error(
    "failed to migrate to surrealdb",
    error instanceof Error ? error.message : String(error)
  );
} finally {
  await db.close();
}
