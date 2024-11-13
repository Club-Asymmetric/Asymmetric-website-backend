import { fileURLToPath } from "url";
import path from "path";
import fs from "fs";
import database from "./database.js";

const db = await database("event_registrations");
try {
  await db.query(
    fs.readFileSync(
      path.dirname(fileURLToPath(import.meta.url)) +
        "/migrations/event_registration_down.surql",
      { encoding: "utf-8" }
    )
  );
  await db.query(
    fs.readFileSync(
      path.dirname(fileURLToPath(import.meta.url)) +
        "/migrations/podcast_down.surql",
      { encoding: "utf-8" }
    )
  );
} catch (error) {
  console.error(
    "failed to immigrate to surrealdb",
    error instanceof Error ? error.message : String(error)
  );
} finally {
  db.close();
}
