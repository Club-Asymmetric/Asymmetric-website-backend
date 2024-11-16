import express from "express";
import {
  getPodcasts,
  getPodcastById,
  getPodcastAudioById,
} from "../controllers/podcast.controller.js";
const router = express.Router();

router.get("/:id/stream", getPodcastAudioById);
router.get("/:id", getPodcastById);
router.get("/", getPodcasts);

export default router;
