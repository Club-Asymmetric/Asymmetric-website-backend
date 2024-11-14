import { fileURLToPath } from "url";
import path from "path";
import fs from "fs";
import database from "../database.js";

const db = await database("event_registrations");
try {
  console.log(
    await db.query(
      fs.readFileSync(
        path.join(
          path.dirname(fileURLToPath(import.meta.url)),
          "../migrations/destruct.surql"
        ),
        { encoding: "utf-8" }
      )
    )
  );
} catch (error) {
  console.error(
    "failed to immigrate to surrealdb",
    error instanceof Error ? error.message : String(error)
  );
} finally {
  await db.close();
}
