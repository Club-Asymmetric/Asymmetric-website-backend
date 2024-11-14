import express from "express";
import { getPodcastByName, getAllPodcasts } from "../models/podcast.js";
import { logging } from "../middlewares/logger.js";
const router = express.Router();

router.use(logging);

router.get("/:id", async (req, res) => {
  try {
    const podcast = await getPodcast(req.params.id);
    return res.json(podcast);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

router.get("/", getAllPodcasts);

export default router;
