import express from "express";
import { rateLimiter } from "../middlewares/rateLimiter.js";
import { validateMemberApplication } from "../middlewares/validation.js";
import { applyForMembership } from "../controllers/memberApplication.controller.js";
import { checkApplicationsOpen } from "../middlewares/applicationsOpen.js";

const router = express.Router();

router.post(
  "/",
  checkApplicationsOpen,
  rateLimiter,
  express.json(),
  validateMemberApplication,
  applyForMembership
);

export default router;
