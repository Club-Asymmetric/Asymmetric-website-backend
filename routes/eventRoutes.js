import express from "express";
const router = express.Router();

import {
  getEventById,
  getEvents,
  eventRegistration,
} from "../controllers/event.controller.js";

import { validateForm } from "../middlewares/validation.js";

router.post("/:id/register", validateForm, eventRegistration);
router.get("/:id", getEventById);
router.get("/", getEvents);

export default router;
