import database from "../database.js";
import { fileURLToPath } from "url";
import path from "path";
import fs from "fs/promises";
import mime from "mime-types";
import dotenv from "dotenv";
import { RecordId } from "surrealdb";

dotenv.config();

const db = await database();
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
    location: "Saravana Bhavana",
    min_team_size: 1,
    max_team_size: 2,
    description: "Yonko Buggy's Livestream @ Marineford",
  });
  await db.create("event", {
    name: "Shinokuni's Auction",
    participants: 250,
    date: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000),
    registration_start: new Date(),
    location: "Saravana Bhavana",
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
    location: "Saravana Bhavana",
    min_team_size: 1,
    max_team_size: 2,
    photos: Object.entries(pathStructure["events"]["enieslobby"]).map(
      ([_, v]) => new RecordId("photo", v)
    ),
    description: "Sniper King Sogeking's Adventures @ Enies Lobby",
  });
  await db.create("podcast", {
    name: "Roger's Podcast",
    publish: true,
    guests: ["Roger"],
    description: "Roger, the King of the Pirates",
    image: new RecordId("photo", pathStructure["podcasts"]["roger.webp"]),
    mime: "mpeg",
  });
  await db.create("podcast", {
    name: "Buggy's Podcast",
    publish: true,
    guests: ["Buggy"],
    description: "Buggy, the Leader of the Cross Guild",
    image: new RecordId("photo", pathStructure["podcasts"]["buggy.webp"]),
    mime: "mpeg",
  });
  await db.create("podcast", {
    name: "Spandem's Podcast",
    publish: false,
    guests: ["Spandam"],
    description: "Spandam, the Leader of CP9",
    image: new RecordId("photo", pathStructure["podcasts"]["spandam.webp"]),
    mime: "mpeg",
  });

  await db.create("member", {
    name: "Monkey D. Luffy",
    role: "Leader",
    photos: Object.entries(pathStructure["members"]["luffy"]).map(
      ([_, v]) => new RecordId("photo", v)
    ),
    description: "Strawhat",
    portfolio: "https://onepiece.fandom.com/wiki/Luffy",
  });
  await db.create("member", {
    name: "Roronoa Zoro",
    role: "Swordsman",
    photos: Object.entries(pathStructure["members"]["zoro"]).map(
      ([_, v]) => new RecordId("photo", v)
    ),
    description: "King of Hell",
    portfolio: "https://onepiece.fandom.com/wiki/Zoro",
  });
  await db.create("member", {
    name: "Nami",
    role: "Navigator",
    photos: Object.entries(pathStructure["members"]["nami"]).map(
      ([_, v]) => new RecordId("photo", v)
    ),
    description: "Cat Burglar",
    portfolio: "https://onepiece.fandom.com/wiki/Nami",
  });
  await db.create("member", {
    name: "Usopp",
    role: "Sniper",
    photos: Object.entries(pathStructure["members"]["usopp"]).map(
      ([_, v]) => new RecordId("photo", v)
    ),
    description: "Spandam, the Leader of CP9",
    portfolio: "https://onepiece.fandom.com/wiki/Usopp",
  });
  await db.create("member", {
    name: "Vinsmoke Sanji",
    role: "Cook",
    photos: Object.entries(pathStructure["members"]["sanji"]).map(
      ([_, v]) => new RecordId("photo", v)
    ),
    description: "Black Leg",
    portfolio: "https://onepiece.fandom.com/wiki/Sanji",
  });
  await db.create("member", {
    name: "Tony Tony Chopper",
    role: "Doctor",
    photos: Object.entries(pathStructure["members"]["chopper"]).map(
      ([_, v]) => new RecordId("photo", v)
    ),
    description: "Cotton Candy Lover",
    portfolio: "https://onepiece.fandom.com/wiki/Chopper",
  });
  await db.create("member", {
    name: "Nico Robin",
    role: "Archaeologist",
    photos: Object.entries(pathStructure["members"]["robin"]).map(
      ([_, v]) => new RecordId("photo", v)
    ),
    description: "Devil's Child",
    portfolio: "https://onepiece.fandom.com/wiki/Robin",
  });
  await db.create("member", {
    name: "Franky",
    role: "Shipwright",
    photos: Object.entries(pathStructure["members"]["luffy"]).map(
      ([_, v]) => new RecordId("photo", v)
    ),
    description: "Cyborg",
    portfolio: "https://onepiece.fandom.com/wiki/Franky",
  });
  await db.create("member", {
    name: "Brook",
    role: "Musician",
    photos: Object.entries(pathStructure["members"]["luffy"]).map(
      ([_, v]) => new RecordId("photo", v)
    ),
    description: "Soul King",
    portfolio: "https://onepiece.fandom.com/wiki/Brook",
  });
  await db.create("member", {
    name: "Jinbei",
    role: "Helmsman",
    photos: Object.entries(pathStructure["members"]["luffy"]).map(
      ([_, v]) => new RecordId("photo", v)
    ),
    description: "First Son of the Sea",
    portfolio: "https://onepiece.fandom.com/wiki/Jinbei",
  });
} catch (error) {
  console.error(
    "failed to migrate to surrealdb",
    error instanceof Error ? error.message : String(error)
  );
} finally {
  await db.close();
}
