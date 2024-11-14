import express from "express";
import {
  getPodcasts,
  getPodcastById,
} from "../controllers/podcast.controller.js";
import { logging } from "../middlewares/logger.js";
const router = express.Router();

router.use(logging);

router.get("/:id", getPodcastById);

router.get("/", getPodcasts);

export default router;
