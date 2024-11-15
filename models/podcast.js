import database from "../database.js";
import { RecordId } from "surrealdb";

export async function getPodcast(id) {
  return await (
    await database()
  ).query("SELECT *, image.id() OMIT audio FROM $podcast", {
    podcast: new RecordId("podcast", id),
  });
}

export async function getAllPodcasts() {
  return await (
    await database()
  ).query("SELECT *, image.id() OMIT audio FROM podcast");
}

export async function getPodcastAudio(id) {}
