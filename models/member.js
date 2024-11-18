import database from "../database.js";
import { RecordId } from "surrealdb";
import { ClientError } from "../errors/ApiError.js";

export async function getMember(id) {
  const out = (
    await (
      await database()
    ).query("(SELECT *, id.id(), photos[*].id() FROM $member)[0]", {
      member: new RecordId("member", id),
    })
  )[0];
  if (!out) throw ClientError.notFound();
  return out;
}

export async function getAllMembers(id) {
  return (
    await (
      await database()
    ).query("SELECT *, id.id(), photos[*].id() FROM member")
  )[0];
}
