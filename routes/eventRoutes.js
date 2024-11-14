import express from "express";
const router = express.Router();

import { getEventById, getEvents } from "../controllers/event.controller.js";

router.get("/:id", getEventById);
router.get("/", getEvents);

export default router;
