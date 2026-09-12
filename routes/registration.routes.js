import express from "express";
import { rateLimiter } from "../middlewares/rateLimiter.js";
import { validateRegistration } from "../middlewares/validation.js";
import { registerForEvent } from "../controllers/registration.controller.js";

const router = express.Router();

router.post("/", rateLimiter, express.json(), validateRegistration, registerForEvent);

export default router;
