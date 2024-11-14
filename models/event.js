import database from "../database.js";
import { RecordId } from "surrealdb";

export async function getAllEvents() {
  return (await database()).select("event");
}

export async function getEvent(id) {
  return await (await database()).select(new RecordId("event", id));
}
