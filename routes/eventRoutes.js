import express from "express";
const router = express.Router();
import { rateLimiter } from "../middlewares/rateLimiter.js";

import {
  getEventById,
  getEvents,
  eventRegistration,
} from "../controllers/event.controller.js";

import { validateForm } from "../middlewares/validation.js";
import cookieParser from "cookie-parser";

router.post(
  "/:id/register",
  rateLimiter,
  express.json(),
  cookieParser(),
  validateForm,
  eventRegistration
);
router.get("/:id", getEventById);
router.get("/", getEvents);

export default router;
