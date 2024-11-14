import database from "../database.js";
import { RecordId } from "surrealdb";

export async function getPhoto(id) {
  return await (await database()).select(new RecordId("photo", id));
}
