import express from "express";

import path from "path";
import { fileURLToPath } from "url";
import dotenv from "dotenv";
import fs from "fs";
import errorHandler from "./errors/errorHandler.js";

dotenv.config();
const photos = {
  "0000000000luffy1.gif": "gif",
  "0000000000luffy2.jpg": "jpeg",
  "0000000000luffy3.jpg": "jpeg",
  "0000marineford1.webp": "webp",
  "0000marineford2.webp": "webp",
  "0000marineford3.webp": "webp",
  "000000000jinbei1.jpg": "jpeg",
  "000000000jinbei2.jpg": "jpeg",
  "000000000jinbei3.jpg": "jpeg",
  "000000000jinbei4.jpg": "jpeg",
  "000000000jinbei5.jpg": "jpeg",
  "000000000jinbei6.jpg": "jpeg",
  "000000000jinbei7.jpg": "jpeg",
  "000000000jinbei8.jpg": "jpeg",
  "0000000000brook1.jpg": "jpeg",
  "0000000000brook2.jpg": "jpeg",
  "0000000000brook3.jpg": "jpeg",
  "0000000000brook4.jpg": "jpeg",
  "0000000000brook5.jpg": "jpeg",
  "0000000000brook6.jpg": "jpeg",
  "000000000franky1.jpg": "jpeg",
  "000000000franky2.jpg": "jpeg",
  "000000000franky3.jpg": "jpeg",
  "000000000franky4.jpg": "jpeg",
  "000000000franky5.jpg": "jpeg",
  "0000000000robin1.jpg": "jpeg",
  "0000000000robin2.jpg": "jpeg",
  "0000000000robin3.jpg": "jpeg",
  "0000000000robin4.jpg": "jpeg",
  "0000000000robin5.jpg": "jpeg",
  "0000000000robin6.jpg": "jpeg",
  "0000000000robin7.jpg": "jpeg",
  "0000000000robin8.jpg": "jpeg",
  "00000000chopper1.jpg": "jpeg",
  "0000000000sanji1.jpg": "jpeg",
  "0000000000sanji2.jpg": "jpeg",
  "0000000000sanji3.jpg": "jpeg",
  "0000000000usopp1.jpg": "jpeg",
  "0000000000usopp2.jpg": "jpeg",
  "0000000000usopp3.jpg": "jpeg",
  "00000000000nami1.jpg": "jpeg",
  "00000000000nami2.jpg": "jpeg",
  "00000000000nami3.jpg": "jpeg",
  "00000000000nami4.jpg": "jpeg",
  "00000000000nami5.jpg": "jpeg",
  "00000000000nami6.jpg": "jpeg",
  "00000000000nami7.jpg": "jpeg",
  "00000000000nami8.jpg": "jpeg",
  "00000000000nami9.jpg": "jpeg",
  "0000000000nami10.jpg": "jpeg",
  "00000000000zoro1.jpg": "jpeg",
  "00000000000zoro2.jpg": "jpeg",
  "00000000000zoro3/jpg": "jpeg",
  "00000000000zoro4.jpg": "jpeg",
  "0000000000roger.webp": "webp",
  "0000000000buggy.webp": "webp",
  "00000000spandam.webp": "webp",
  "0000enieslobby1.webp": "webp",
  "0000enieslobby2.webp": "webp",
  "0000enieslobby3.webp": "webp",
  "0000punkhazard1.webp": "webp",
  "0000punkhazard2.webp": "webp",
};
const events = {
  "0000000000marineford": {
    id: "0000000000marineford",
    name: "Buggy's Live Stream",
    participants: 1000,
    date: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000),
    photos: [
      "0000marineford1.webp",
      "0000marineford2.webp",
      "0000marineford3.webp",
    ],
    registration_start: new Date(),
    location: "Saravana Bhavana",
    min_team_size: 1,
    max_team_size: 2,
    description: "Yonko Buggy's Livestream @ Marineford",
  },
  "0000000000punkhazard": {
    id: "0000000000punkhazard",
    name: "Shinokuni's Auction",
    participants: 250,
    date: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000),
    registration_start: new Date(),
    location: "Saravana Bhavana",
    min_team_size: 1,
    max_team_size: 2,
    photos: ["0000punkhazard1.webp", "0000punkhazard2.webp"],
    description: "Caesar Clown's Destructive Weapon Showcase @ Punkhazard",
  },
  "0000000000enieslobby": {
    id: "0000000000enieslobby",
    name: "Sogeking's Secret Diaries",
    participants: 8000,
    date: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000),
    registration_start: new Date(),
    location: "Saravana Bhavana",
    min_team_size: 1,
    max_team_size: 2,
    photos: [
      "0000enieslobby1.webp",
      "0000enieslobby2.webp",
      "0000enieslobby3.webp",
    ],
    description: "Sniper King Sogeking's Adventures @ Enies Lobby",
  },
};

const podcasts = {
  "000000000000000roger": {
    id: "000000000000000roger",
    name: "Roger's Podcast",
    publish: true,
    guests: ["Roger"],
    description: "Roger, the King of the Pirates",
    image: "0000000000roger.webp",
    mime: "mpeg",
  },
  "000000000000000buggy": {
    id: "000000000000000buggy",
    name: "Buggy's Podcast",
    publish: true,
    guests: ["Buggy"],
    description: "Buggy, the Leader of the Cross Guild",
    image: "0000000000buggy.webp",
    mime: "mpeg",
  },
  "0000000000000spandem": {
    id: "0000000000000spandem",
    name: "Spandem's Podcast",
    publish: false,
    guests: ["Spandam"],
    description: "Spandam, the Leader of CP9",
    image: "00000000spandam.webp",
    mime: "mpeg",
  },
};

const members = {
  "000000000000000luffy": {
    id: "000000000000000luffy",
    name: "Monkey D. Luffy",
    role: "Leader",
    photos: [
      "0000000000luffy1.gif",
      "0000000000luffy2.jpg",
      "0000000000luffy3.jpg",
    ],
    description: "Strawhat",
    portfolio: "https://onepiece.fandom.com/wiki/Luffy",
  },
  "0000000000000000zoro": {
    id: "0000000000000000zoro",
    name: "Roronoa Zoro",
    role: "Swordsman",
    photos: [
      "00000000000zoro1.jpg",
      "00000000000zoro2.jpg",
      "00000000000zoro3/jpg",
      "00000000000zoro4.jpg",
    ],
    description: "King of Hell",
    portfolio: "https://onepiece.fandom.com/wiki/Zoro",
  },
  "0000000000000000nami": {
    id: "0000000000000000nami",
    name: "Nami",
    role: "Navigator",
    photos: [
      "00000000000nami1.jpg",
      "00000000000nami2.jpg",
      "00000000000nami3.jpg",
      "00000000000nami4.jpg",
      "00000000000nami5.jpg",
      "00000000000nami6.jpg",
      "00000000000nami7.jpg",
      "00000000000nami8.jpg",
      "00000000000nami9.jpg",
      "0000000000nami10.jpg",
    ],
    description: "Cat Burglar",
    portfolio: "https://onepiece.fandom.com/wiki/Nami",
  },
  "000000000000000usopp": {
    id: "000000000000000usopp",
    name: "Usopp",
    role: "Sniper",
    photos: [
      "0000000000usopp1.jpg",
      "0000000000usopp2.jpg",
      "0000000000usopp3.jpg",
    ],
    description: "Spandam, the Leader of CP9",
    portfolio: "https://onepiece.fandom.com/wiki/Usopp",
  },
  "000000000000000sanji": {
    id: "000000000000000sanji",
    name: "Vinsmoke Sanji",
    role: "Cook",
    photos: [
      "0000000000sanji1.jpg",
      "0000000000sanji2.jpg",
      "0000000000sanji3.jpg",
    ],
    description: "Black Leg",
    portfolio: "https://onepiece.fandom.com/wiki/Sanji",
  },
  "0000000000000chopper": {
    id: "0000000000000chopper",
    name: "Tony Tony Chopper",
    role: "Doctor",
    photos: ["00000000chopper1.jpg"],
    description: "Cotton Candy Lover",
    portfolio: "https://onepiece.fandom.com/wiki/Chopper",
  },
  "000000000000000robin": {
    id: "000000000000000robin",
    name: "Nico Robin",
    role: "Archaeologist",
    photos: [
      "0000000000robin1.jpg",
      "0000000000robin2.jpg",
      "0000000000robin3.jpg",
      "0000000000robin4.jpg",
      "0000000000robin5.jpg",
      "0000000000robin6.jpg",
      "0000000000robin7.jpg",
      "0000000000robin8.jpg",
    ],
    description: "Devil's Child",
    portfolio: "https://onepiece.fandom.com/wiki/Robin",
  },
  "00000000000000franky": {
    id: "00000000000000franky",
    name: "Franky",
    role: "Shipwright",
    photos: [
      "000000000franky1.jpg",
      "000000000franky2.jpg",
      "000000000franky3.jpg",
      "000000000franky4.jpg",
      "000000000franky5.jpg",
    ],
    description: "Cyborg",
    portfolio: "https://onepiece.fandom.com/wiki/Franky",
  },
  "000000000000000brook": {
    id: "000000000000000brook",
    name: "Brook",
    role: "Musician",
    photos: [
      "0000000000brook1.jpg",
      "0000000000brook2.jpg",
      "0000000000brook3.jpg",
      "0000000000brook4.jpg",
      "0000000000brook5.jpg",
      "0000000000brook6.jpg",
    ],
    description: "Soul King",
    portfolio: "https://onepiece.fandom.com/wiki/Brook",
  },
  "00000000000000jinbei": {
    id: "00000000000000jinbei",
    name: "Jinbei",
    role: "Helmsman",
    photos: [
      "000000000jinbei1.jpg",
      "000000000jinbei2.jpg",
      "000000000jinbei3.jpg",
      "000000000jinbei4.jpg",
      "000000000jinbei5.jpg",
      "000000000jinbei6.jpg",
      "000000000jinbei7.jpg",
      "000000000jinbei8.jpg",
    ],
    description: "First Son of the Sea",
    portfolio: "https://onepiece.fandom.com/wiki/Jinbei",
  },
};

const app = express();

app.get("/api/events", (req, res) => {
  res.json(events);
});

app.get("/api/events/:id", (req, res) => {
  res.json(events[req.params.id]);
});

app.get("/api/members", (req, res) => {
  res.json(members);
});
app.get("/api/members/:id", (req, res) => {
  res.json(members[req.params.id]);
});

app.get("/api/podcasts", (req, res) => {
  res.json(podcasts);
});
app.get("/api/podcasts/:id", (req, res) => {
  res.json(podcasts[req.params.id]);
});
app.use("/api/podcasts/:id/stream", (req, res) => {
  try {
    let filePath = path.join(
      path.dirname(fileURLToPath(import.meta.url)),
      "audio",
      req.params.id.replace(/^0+/, "")
    );
    let stat = fs.statSync(filePath);
    let size = stat.size;
    res.writeHead(200, {
      "Content-Type": `audio/${podcasts[req.params.id].mime}`,
      "Content-Length": size,
    });
    let stream = fs.createReadStream(filePath);
    stream.pipe(res);
    stream.on("error", (err) => {
      next(err);
    });
  } catch (error) {
    next(error);
  }
});

app.get("/images/are/not/here/:id", (req, res) => {
  try {
    const binary = fs.readFileSync(
      path.join(
        path.dirname(fileURLToPath(import.meta.url)),
        "photos",
        req.params.id.replace(/^0+/, "")
      ),
      { encoding: null }
    );
    res.header("Content-Type", `image/${photos[req.params.id]}`);
    res.send(Buffer.from(binary));
  } catch (error) {
    next(error);
  }
});

app.get("/api/credits", (req, res) => {
  res.sendFile("credits.json", {
    root: path.dirname(fileURLToPath(import.meta.url)),
  });
});

app.listen(3000, () => {
  console.log("server start in http://localhost:3000");
});
