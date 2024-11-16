import database from "../database.js";
import { RecordId } from "surrealdb";
import { ClientError } from "../errors/ApiError.js";

export async function getPhoto(id) {
  const out = await (await database()).select(new RecordId("photo", id));
  if (!out) throw ClientError.notFound();
  return out;
}
