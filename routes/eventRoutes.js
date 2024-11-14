import express from "express";
const router = express.Router();

import { getEventById, getEvents } from "../controllers/event.controller.js";

router.get("/:id", async (req, res) => {
  return res.json(await getEvent(req.params.id));
});
router.get("/", async (req, res) => {
  return res.json(await getAllEvents());
});

export default router;
