import database from "../database.js";
import { RecordId } from "surrealdb";
import { ClientError } from "../errors/ApiError.js";
import crypto from "crypto";

export async function getAllEvents() {
  return (
    await (
      await database()
    ).query("SELECT *, photos[*].id(), id.id() FROM event")
  )[0];
}

export async function getEvent(id) {
  const out = (
    await (
      await database()
    ).query("(SELECT *, photos[*].id(), id.id() FROM $event)[0]", {
      event: new RecordId("event", id),
    })
  )[0];
  if (!out) throw ClientError.notFound();
  return out;
}

export async function registerForEvent(
  id,
  { name, year, department, college, email, number, team, members }
) {
  return (
    await (
      await database()
    ).create("registration", {
      name,
      year,
      department,
      college,
      email,
      number,
      event: new RecordId("event", id),
      team,
      members,
      hash: crypto
        .createHash("sha256")
        .update(email + process.env.REG_SALT + id)
        .digest("hex"),
    })
  )[0].hash;
}
