import express from "express";
import { rateLimiter } from "../middlewares/rateLimiter.js";
import { validateForm } from "../middlewares/validation.js";
const router = express.Router();

import {
  getEventById,
  getEvents,
  eventRegistration,
} from "../controllers/event.controller.js";

router.get("/:id", getEventById);
router.get("/", getEvents);
router.post(
  "/:id/register",
  rateLimiter,
  express.json(),
  validateForm,
  eventRegistration
);

export default router;
