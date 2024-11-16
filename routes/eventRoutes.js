import express from "express";
const router = express.Router();

import {
  getEventById,
  getEvents,
  eventRegistration,
} from "../controllers/event.controller.js";

import { validateForm } from "../middlewares/validation.js";

router.get("/:id", getEventById);
router.get("/", getEvents);
router.post("/:id/register", validateForm, eventRegistration);

export default router;
