import database from "../database.js";
import { fileURLToPath } from "url";
import path from "path";
import fs from "fs/promises";
import mime from "mime-types";
import dotenv from "dotenv";
import { Duration, RecordId } from "surrealdb";

dotenv.config();

const db = await database("event_registrations");
try {
  let pathStructure = {};
  async function recursiveRead(dir, cur = pathStructure) {
    const entries = await fs.readdir(dir, { withFileTypes: true });
    for (const entry of entries) {
      const fullPath = path.join(dir, entry.name);
      if (entry.isDirectory()) {
        cur[entry.name] = {};
        await recursiveRead(fullPath, cur[entry.name]);
      } else {
        const mimeType = mime.lookup(entry.name);
        if (mimeType && mimeType.startsWith("image/")) {
          const photo = (
            await db.create("photo", {
              binary: await fs.readFile(fullPath, null),
              mime: mimeType.split("/")[1],
            })
          )[0].id.id;
          cur[entry.name] = photo;
        }
      }
    }
  }
  await recursiveRead(
    path.join(path.dirname(fileURLToPath(import.meta.url)), "../photos")
  );
  console.log(pathStructure);
  await db.create("event", {
    name: "Buggy's Live Stream",
    participants: 1000,
    date: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000),
    photos: Object.entries(pathStructure["events"]["marineford"]).map(
      ([_, v]) => new RecordId("photo", v)
    ),
    registration_start: new Date(),
    registration_end: new Date(Date.now() + 24 * 60 * 60 * 1000),
    min_team_size: 1,
    max_team_size: 2,
    description: "Yonko Buggy's Livestream @ Marineford",
  });
  await db.create("event", {
    name: "Shinokuni's Auction",
    participants: 250,
    date: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000),
    registration_start: new Date(),
    registration_end: new Date(Date.now() + 24 * 60 * 60 * 1000),
    min_team_size: 1,
    max_team_size: 2,
    photos: Object.entries(pathStructure["events"]["punkhazard"]).map(
      ([_, v]) => new RecordId("photo", v)
    ),
    description: "Caesar Clown's Destructive Weapon Showcase @ Punkhazard",
  });
  await db.create("event", {
    name: "Sogeking's Secret Diaries",
    participants: 8000,
    date: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000),
    registration_start: new Date(),
    registration_end: new Date(Date.now() + 24 * 60 * 60 * 1000),
    min_team_size: 1,
    max_team_size: 2,
    photos: Object.entries(pathStructure["events"]["enieslobby"]).map(
      ([_, v]) => new RecordId("photo", v)
    ),
    description: "Sniper King Sogeking's Adventures @ Enies Lobby",
  });
  await db.create("podcast", {
    name: "Roger's Podcast",
    publish: new Date(),
    guests: ["Roger"],
    description: "Roger, the King of the Pirates",
    image: new RecordId("photo", pathStructure["podcasts"]["roger.webp"]),
    mime: "mpeg",
  });
  await db.create("podcast", {
    name: "Buggy's Podcast",
    publish: new Date(),
    guests: ["Buggy"],
    description: "Buggy, the Leader of the Cross Guild",
    image: new RecordId("photo", pathStructure["podcasts"]["buggy.webp"]),
    mime: "mpeg",
  });
  await db.create("podcast", {
    name: "Spandem's Podcast",
    publish: new Date(),
    guests: ["Spandam"],
    description: "Spandam, the Leader of CP9",
    image: new RecordId("photo", pathStructure["podcasts"]["spandam.webp"]),
    mime: "mpeg",
  });
} catch (error) {
  console.error(
    "failed to migrate to surrealdb",
    error instanceof Error ? error.message : String(error)
  );
} finally {
  await db.close();
}
