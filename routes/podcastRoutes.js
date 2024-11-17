import express from "express";
import {
  getPodcasts,
  getPodcastById,
  getPodcastAudioById,
} from "../controllers/podcast.controller.js";
const router = express.Router();

router.get("/", getPodcasts);
router.get("/:id", getPodcastById);
router.get("/:id/stream", getPodcastAudioById);

export default router;
