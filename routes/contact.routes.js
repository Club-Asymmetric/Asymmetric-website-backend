import express from "express";
import { rateLimiter } from "../middlewares/rateLimiter.js";
import { validateContact } from "../middlewares/validation.js";
import { submitContact } from "../controllers/contact.controller.js";

const router = express.Router();

router.post("/", rateLimiter, express.json(), validateContact, submitContact);

export default router;
