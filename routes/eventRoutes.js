import express from "express";
const router = express.Router();

import { getEvent, getAllEvents } from "../models/event.js";

router.get("/:name", async (req, res) => {
  return res.json(await getEvent(req.params.name));
});
router.get("/", async (req, res) => {
  let events = await getAllEvents();
  for (let i in events) {
    console.log(events[i]);
    for (let j in events[i].photos) {
      events[i].photos[j] = events[i].photos[j].id;
    }
  }
  return res.json(events);
});

export default router;
