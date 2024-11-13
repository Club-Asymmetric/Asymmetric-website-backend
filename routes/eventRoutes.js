import express, { json } from "express";
import { logging } from "../middlewares/logger.js";
const router = express.Router();

import { getEvent, getAllEvents } from "../models/event.js";
import database from "../database.js";

router.get("/:name", async (req, res) => {
  return res.json(await getEvent(req.params.name));
});
router.get("/", async (req, res) => {
  let events = await getAllEvents();
  for (let i in events) {
    for (let j in events[i].photos) {
      let [p] = events[i].photos[j];
      let { binary, mime } = await (await database()).select(p);
      console.log(binary, mime);
      events[i].photos[j] = { mime };
      events[i].photos[j].binary = btoa(
        String.fromCharCode(...new Uint8Array(binary))
      );
    }
  }
  return res.json(events);
});

export default router;
