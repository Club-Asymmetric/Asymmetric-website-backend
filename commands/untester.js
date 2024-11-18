import database from "../database.js";
import { fileURLToPath } from "url";
import path from "path";
import fs from "fs/promises";
import mime from "mime-types";
import dotenv from "dotenv";
import { RecordId } from "surrealdb";

dotenv.config();

const db = await database();
try {
  console.log(await db.delete("photo"));
  console.log(await db.delete("member"));
  console.log(await db.delete("podcast"));
  console.log(await db.delete("event"));
  console.log(await db.delete("registration"));
} catch (error) {
  console.error(
    "failed to migrate to surrealdb",
    error instanceof Error ? error.message : String(error)
  );
} finally {
  await db.close();
}
