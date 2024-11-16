import database from "../database.js";
import { RecordId } from "surrealdb";

export async function getPodcast(id) {
  const out = (
    await (
      await database()
    ).query("(SELECT *, image.id() OMIT audio FROM $podcast)[0]", {
      podcast: new RecordId("podcast", id),
    })
  )[0];
  if (!out) throw ClientError.notFound();
  return out;
}

export async function getAllPodcasts() {
  return await (
    await database()
  ).query("SELECT *, image.id() OMIT audio FROM podcast");
}

export async function getPodcastAudio(id) {}
