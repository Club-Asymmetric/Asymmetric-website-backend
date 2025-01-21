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
    description:
      "Join the flamboyant and self-proclaimed genius, Buggy the Clown, as he fearlessly dives into the heart of Marineford during the most explosive battle in history! Witness the clash of legends, shocking revelations, and the ultimate showdown for the Pirate Era's fate—all from the hilarious and unpredictable perspective of Buggy himself!\n\nExpect outrageous commentary, accidental heroics, and plenty of moments where Buggy steals the spotlight (whether he deserves it or not). As Marines and Pirates collide in a high-stakes war, will Buggy rise to glory or hilariously stumble his way through the chaos? One thing’s for sure—anything can happen when Buggy goes live! \n\nTune in for:\n\n🎥 Exclusive (and possibly exaggerated) behind-the-scenes views.\n😂 Buggy’s comedic takes on the strongest fighters.\n🔥 Epic battles captured up close.\n\nDon’t miss out—this is history in the making, and Buggy’s making it all about him!",
    synopsis:
      "Buggy the Clown hilariously live-streams the chaos of Marineford, turning legendary battles into his personal spotlight!",
    redirect: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
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
    description:
      'Step into the twisted brilliance of Caesar Clown as he unveils his deadliest creation, Shinokuni, at an exclusive underground auction! Witness the ultimate showcase of scientific horror as the infamous "Master of Gas" demonstrates the power of his lethal weapon, capable of wiping out entire nations.\n\nThis high-stakes event is not for the faint-hearted—elite buyers from the underworld, warlords, and rogue nations are invited to bid on this destructive masterpiece. Expect dazzling displays of terror, Caesar’s eccentric commentary, and perhaps a few "accidental" test subjects!\n\nWill Shinokuni become the most feared weapon in history? Or will Caesar’s grand event spiral into chaos under his unpredictable genius? Join us for a sinister spectacle where danger and drama are guaranteed!\n\nNote: Attendees are advised to bring protective gear… just in case.',
    synopsis:
      "Caesar Clown hosts a sinister auction, showcasing the deadly Shinokuni weapon to the underworld's elite in a spectacle of chaos and terror!",
    redirect: undefined,
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
    description:
      'Step into the masked hero’s boots and relive the epic saga of Enies Lobby through the eyes of the legendary Sogeking! In this thrilling event, dive into his "secret diaries," where truth and imagination collide to recount daring rescues, fiery battles, and heroic feats (with just a dash of exaggeration).\n\nFrom firing the iconic Firebird Star to inspiring his crew with unmatched bravery, Sogeking takes you on a wild adventure filled with action, laughter, and heart. As the Straw Hats face off against CP9 to rescue Nico Robin, uncover untold stories, secret strategies, and the masked marksman’s "hidden" role in shaping the legend of Enies Lobby!\n\nJoin Sogeking for an unforgettable journey where the line between myth and reality blurs—because every hero deserves their moment to shine!',
    synopsis:
      "Join Sogeking on a wild adventure through his secret diaries, reliving the legendary events of Enies Lobby with a heroic twist!",
    redirect: undefined,
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
    description:
      "Yo! I'm Monkey D. Luffy, and I'm gonna be the Pirate King! I may not be the smartest guy out there, but I’ve got something better—unshakable determination and a big dream! Ever since I was a kid, I knew I was gonna sail the seas, find the One Piece, and rule the Grand Line! With my Gum-Gum powers, there's no challenge I can't take on. I'm building a crew of awesome people, and together, we're gonna face the toughest enemies and make history!\n\nI don’t care much for rules, but I’ll fight for my friends with everything I’ve got. When it comes to adventure, I'm all in—nothing can stop me! So, if you're ready to live a life of freedom and fun, join me! Let’s set sail and chase our dreams to the ends of the world!",
    portfolio: "https://onepiece.fandom.com/wiki/Luffy",
    energy: "MEAT!!",
    dimension: "174cm",
    type: "",
    hobbies: "Eating, fighting, exploring, making friends",
    features: "Rubber Human, Conqueror's Haki, Observation Haki, Armament Haki",
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
    description:
      "The name's Roronoa Zoro. I'm a swordsman, and I’ve got one goal—to become the greatest swordsman in the world. I've got three swords, and I'll use every one of them to carve my way to the top. I don't care about anything other than getting stronger and proving myself. I’ve trained my whole life for this, and I’ll take on anyone who thinks they can stand in my way.\n\nI’m not much for talking, but if you’re in my crew, you’ve got my loyalty. I’ll fight for them, protect them, and I won’t back down from any challenge. So, if you’re looking for a swordsman who never gives up, then you’ve found your man. Just don’t get in my way when I’m on a mission, and maybe we’ll get along.",
    portfolio: "https://onepiece.fandom.com/wiki/Zoro",
    energy: "Booze..",
    dimension: "181cm",
    type: "Sigma 🗿",
    hobbies: "Training, sleeping, drinking",
    features:
      "Three-sword Style, Conqueror's Haki, Observation Haki, Armament Haki",
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
    description:
      "Hey there! I’m Nami, the best navigator you’ll ever meet. I’ve got a knack for maps, weather, and pretty much anything to do with sailing. I’ve been sailing the seas since I was a kid, and there’s no island I can’t find. But I’ve got a dream, too— I want to draw a complete map of the world, and nothing's going to stop me from making that happen.\n\nI’m not all about navigation, though. I’m also a great strategist and a bit of a thief, so I’ll make sure we’ve got everything we need to keep moving forward. I don’t like to fight much, but I’ll defend my crew when it counts. Just don’t mess with my treasure! I’ve got big plans, and I’m not afraid to do whatever it takes to achieve them. So, if you want someone who’s got both brains and a good sense of direction, I’m your girl.",
    portfolio: "https://onepiece.fandom.com/wiki/Nami",
    energy: "Lightning ⚡",
    dimension: "170cm",
    type: "",
    hobbies: "Navigating, drawing maps, shopping",
    features: "Clima-Tact, Sorcery Clima-Tact, Zeus",
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
    description:
      "Hey, I’m Usopp! The greatest sharpshooter and liar the world’s ever seen! I’ve got a dream of becoming a brave warrior of the sea, just like my dad, Yasopp, and I’ll make sure everyone knows my name. Sure, I’ve got a knack for telling tall tales, but they’re all in the name of protecting my crew and getting one step closer to my dream.\n\nI’m not as strong as some of the others, but I’ve got a sharp mind, and my gadgets and slingshot are always ready to save the day. I may be a little scared sometimes, but when it comes to my friends, I’ll stand strong and do whatever it takes to help them. I may not look like much, but I’ve got the heart of a warrior, and I’ll keep fighting for what I believe in. So, if you need someone to watch your back or come up with a plan, I’m your guy! Just don’t expect me to go down without a fight!",
    portfolio: "https://onepiece.fandom.com/wiki/Usopp",
    energy: "Pop Greens 🌱",
    dimension: "176cm",
    type: "Kaya",
    hobbies: "Inventing, storytelling, sniping",
    features: "Kabuto, Black Kabuto, Pop Greens",
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
    description:
      "The name's Vinsmoke Sanji, the finest cook you'll ever meet, and don't you forget it! I may be a man of few words—well, mostly because I’d rather let my cooking speak for me—but if you’re hungry, I’ll make you a meal you’ll never forget. My dream? To find the All Blue, the one place where all the seas meet, where I can cook the greatest dishes in the world. It's a dream I won’t let anyone stand in the way of.\n\nI’m also a fighter, so don’t think I’m just about the kitchen. My legs are my weapons, and I’ll kick anyone who threatens my crew or my friends. I might have a bit of a temper—especially when it comes to annoying people or when someone disrespects my cooking—but I’ll always put my crew first. Respect is earned, but good food is something I’ll never compromise on. If you're looking for a badass chef who can fight and cook, then look no further.",
    portfolio: "https://onepiece.fandom.com/wiki/Sanji",
    energy: "Women",
    dimension: "180cm",
    type: "Women",
    hobbies: "Cooking, fighting",
    features: "Diable Jambe, Sky Walk",
  },
  "0000000000000chopper": {
    id: "0000000000000chopper",
    name: "Tony Tony Chopper",
    role: "Doctor",
    photos: ["00000000chopper1.jpg"],
    description:
      "Hi, I’m Tony Tony Chopper! I’m a doctor, and I’ve got a big dream— I want to become the best doctor in the world and help as many people as I can. I used to be an outcast because I’m a reindeer who ate the Human-Human Fruit, but now, I’m part of the Straw Hat crew, and I’ve got friends who care about me. I may look small, but I’m no ordinary reindeer! Thanks to my Devil Fruit powers, I can change my shape and size, and that makes me a pretty handy doctor and fighter, too.\n\nI’m still learning and growing, but I’m always doing my best for the crew. I love to study medicine and try to help anyone who’s hurt or sick. So, if you’re ever in need of medical attention, I’m your guy! Just don’t make fun of my appearance or my age, or I might get a little upset… but I’ll still help you out, of course!",
    portfolio: "https://onepiece.fandom.com/wiki/Chopper",
    energy: "Cotton Candy",
    dimension: "90cm",
    type: "Reindeer",
    hobbies: "Studying medicine, eating cotton candy",
    features: "Human-Human Fruit, Rumble Ball",
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
    description:
      "Hello, I’m Nico Robin, the archaeologist of the Straw Hat Pirates. I’ve spent my life seeking the truth about the Void Century, the lost history that no one is supposed to know. It's a dangerous pursuit, but I've never been one to shy away from risks. I’ve had a tough past, but now I’ve found a crew that I can truly trust and call family. \n\nI’m a bit of a quiet and mysterious person, but that doesn’t mean I’m unapproachable. I’m well-versed in history, languages, and ancient civilizations, and I’m always looking for new discoveries. As for combat, my powers come from the Hana Hana no Mi, which allows me to sprout extra limbs anywhere I want—very handy in a fight, and for reaching things from high places!\n\nI may not be the most talkative, but I’ll always stand by my crew and help them out when they need it. My goal is to uncover the secrets of the world, and I’ll do whatever it takes to reach it.",
    portfolio: "https://onepiece.fandom.com/wiki/Robin",
    energy: "Books",
    dimension: "188cm",
    type: "",
    hobbies: "Reading, researching, exploring ruins",
    features: "Flower-flower fruit, Clutch, Gigantesco Mano",
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
    description:
      "Yo, I'm Franky, the shipwright of the Straw Hat Pirates! I’m a cyborg with a heart of steel and a passion for building the greatest ships in the world. My dream? To build a ship that can sail to the ends of the earth—the perfect ship for a pirate crew like ours. And guess what? I made the Thousand Sunny, the ship that’ll carry us to the Grand Line and beyond! \n\nI’ve got an attitude as strong as my body, but I’m not just about muscle. I’ve got mad engineering skills, and I’ll fix, upgrade, or even completely rebuild anything when it needs it. People might call me a bit eccentric, but I like to live life loud and proud. When I’m not working on the Sunny, you’ll probably find me having fun or working on some crazy invention.\n\nI don’t let anyone mess with my crew, and I’ll fight with everything I’ve got if someone tries. So, if you need a ship that’ll never let you down, I’m the guy to talk to. Let’s build something amazing, and I’ll make sure it’s stronger than any ship out there!",
    portfolio: "https://onepiece.fandom.com/wiki/Franky",
    energy: "Cola",
    dimension: "240cm",
    type: "",
    hobbies: "Building ships, inventing, dancing",
    features: "Cyborg, Battle Frankies, Radical Beam",
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
    description:
      "Yohohoho! I’m Brook, the musician and swordsman of the Straw Hat Pirates! I’m a living skeleton, thanks to the power of the Revive-Revive Fruit, which brought me back from the dead. Though I may not have any flesh, my bones are as strong as they come! I’ve got a dream to reunite with my long-lost friend, Laboon, and play music all over the world. \n\nI’m not just about music, though. I’m also pretty skilled with a sword, and I’m always ready to protect my crew. I’m a bit of a gentleman, and I’m very polite—though, I do tend to make a lot of bad puns and jokes that might make you cringe. I don’t mind though, because I believe that laughter and music are what make the world a better place!\n\nSo, if you need a song to lift your spirits or a sword to protect you, I’m your man! And if you ever want to hear some bone-rattling tunes, just let me know, and I’ll play for you! Yohohoho!",
    portfolio: "https://onepiece.fandom.com/wiki/Brook",
    energy: "Soul",
    dimension: "277cm",
    type: "Women",
    hobbies: "Playing music, telling jokes, sword fighting",
    features: "Revive-Revive Fruit, Soul King",
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
    description:
      "I’m Jinbei, a fish-man and a proud member of the Straw Hat Pirates. I’ve spent my life fighting for peace between fish-men and humans, and I believe in creating a world where everyone, regardless of race, can live in harmony. As a former Warlord of the Sea and a skilled fisherman, I’ve seen the darkest sides of the world, but I’ve always held onto my convictions and fought for what’s right.\n\nI’m a man of honor, and I don’t take my promises lightly. Whether it’s to protect my friends or uphold my duty, I always give my best. My strength comes from my fish-man heritage, and I’m a master of Fish-Man Karate, which I use to defend those I care about. I’ve spent years learning the way of the sea and am always ready to lend my wisdom to the crew.\n\nI may be calm and composed most of the time, but when it comes to my friends and allies, I’ll stand by them through anything. I’m here to support my crew on our journey and help make this world a better place for everyone.",
    portfolio: "https://onepiece.fandom.com/wiki/Jinbei",
    energy: "Tea",
    dimension: "301cm",
    type: "Fishman",
    hobbies: "Fishman Karate, meditating, training",
    features: "Fish-Man Karate",
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
