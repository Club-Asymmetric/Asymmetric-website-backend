import database from "../database.js";
import { RecordId } from "surrealdb";
import { ClientError } from "../errors/ApiError.js";

export async function getAllEvents() {
  return (await database()).query("SELECT *, photos[*].id() FROM event");
}

export async function getEvent(id) {
  const out = (
    await (
      await database()
    ).query("(SELECT *, photos[*].id() FROM $event)[0]", {
      event: new RecordId("event", id),
    })
  )[0];
  if (!out) throw ClientError.notFound();
  return out;
}
