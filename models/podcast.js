import database from "../database.js";
import { RecordId } from "surrealdb";
import { ClientError } from "../errors/ApiError.js";
import { fileURLToPath } from "url";
import fs from "fs";
import path from "path";

export async function getPodcast(id) {
  const out = (
    await (
      await database()
    ).query("(SELECT *, image.id(), id.id() FROM $podcast)[0]", {
      podcast: new RecordId("podcast", id),
    })
  )[0];
  if (!out) throw ClientError.notFound();
  return out;
}

export async function getAllPodcasts() {
  return (
    await (await database()).query("SELECT *, image.id(), id.id() FROM podcast")
  )[0];
}

export async function getPodcastAudio(id) {
  const mp3Path = path.join(
    path.dirname(fileURLToPath(import.meta.url)),
    `../audio.db/${id}`
  ); // Replace 'audio.mp3' with your actual file name
  const stat = fs.statSync(mp3Path);
  const fileSize = stat.size;

  return {
    stream: fs.createReadStream(mp3Path),
    mime: (
      await (
        await database()
      ).query("(SELECT VALUE mime FROM $podcast)[0]", {
        podcast: new RecordId("podcast", id),
      })
    )[0],
    size: fileSize,
  };
}
