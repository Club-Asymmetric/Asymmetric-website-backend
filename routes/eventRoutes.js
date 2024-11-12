import express, { json } from "express";
import logger from "../middlewares/logger.js";
const router = express.Router();

import { getEvent, getAllEvents } from "../models/event.js";
import e from "express";

router.use((req, res, next) => {
  logger.info(`${req.method} ${req.url}`);
  next();
});
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
  console.log(events);
  return res.json(events);
});

export default router;
