import database from "../database.js";
import { RecordId } from "surrealdb";

export async function getAllEvents() {
  return (await database()).query("SELECT *, photos[*].id() FROM event");
}

export async function getEvent(id) {
  return await (
    await database()
  ).query("SELECT *, photos[*].id() FROM $event", {
    event: new RecordId("event", id),
  });
}
