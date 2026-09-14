import express from "express";
import { rateLimiter } from "../middlewares/rateLimiter.js";
import { validateMemberApplication } from "../middlewares/validation.js";
import { applyForMembership } from "../controllers/memberApplication.controller.js";

const router = express.Router();

router.post(
  "/",
  rateLimiter,
  express.json(),
  validateMemberApplication,
  applyForMembership
);

export default router;
