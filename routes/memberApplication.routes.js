import express from "express";
import multer from "multer";
import { rateLimiter } from "../middlewares/rateLimiter.js";
import { validateMemberApplication } from "../middlewares/validation.js";
import { applyForMembership } from "../controllers/memberApplication.controller.js";

const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 5 * 1024 * 1024 },
});

const router = express.Router();

router.post(
  "/",
  rateLimiter,
  upload.single("resume"),
  validateMemberApplication,
  applyForMembership
);

export default router;
