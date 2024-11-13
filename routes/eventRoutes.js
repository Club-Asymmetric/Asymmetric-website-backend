import express, { json } from "express";
import { logging } from "../middlewares/logger.js";
const router = express.Router();

import { getEvent, getAllEvents } from "../models/event.js";
import e from "express";

router.use(logging);
router.get("/:name", async (req, res) => {
  return res.json(await getEvent(req.params.name));
});
router.get("/", async (req, res) => {
  let events = await getAllEvents();
  for (let i in events) {
    for (let j in events[i].photos) {
      let p = events[i].photos[j];
      events[i].photos[j] = btoa(String.fromCharCode(...new Uint8Array(p)));
    }
  }
  return res.json(events);
});

export default router;
