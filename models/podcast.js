import database from "../database.js";
import { RecordId } from "surrealdb";

export async function getPodcast(id) {
  return await (await database()).select(new RecordId("podcast", id));
}

export async function getAllPodcasts() {
  return await (await database()).select("podcast");
}

export async function getPodcastAudio(id) {}
