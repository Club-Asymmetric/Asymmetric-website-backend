import express from "express";
import { getPodcast, getAllPodcasts } from "../models/podcast.js";
import { logging } from "../middlewares/logger.js";
const router = express.Router();

router.use(logging);

router.get("/:name", async (req, res) => {
  try {
    const podcast = await getPodcast(req.params.name);
    return res.json(podcast);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

router.get("/", async (req, res) => {
  try {
    let podcasts = await getAllPodcasts();
    for (let i in podcasts) {
      let p = podcasts[i].audioFile;
      podcasts[i].audioFile = btoa(String.fromCharCode(...new Uint8Array(p)));
    }
    return res.json(podcasts);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

export default router;
