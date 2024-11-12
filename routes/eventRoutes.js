import express from "express";
import logger from "../middlewares/logger.js";
const router = express.Router();

import { getEvent, getAllEvents } from "../models/event.js";

router.use((req, res, next) => {
  logger.info(`${req.method} ${req.url}`);
  next();
});
router.get("/:name", async (req, res) => {
  return res.json(await getEvent(req.params.name));
});
router.get("/", async (req, res) => {
  return res.json(await getAllEvents());
});

export default router;
