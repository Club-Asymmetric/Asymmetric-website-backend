import { getPodcast, getAllPodcasts } from "../models/podcast.js";

export const getPodcastById = async (req, res) => {
  res.json(await getPodcast(req.params.id));
};

export const getPodcasts = async (req, res) => {
  res.json(await getAllPodcasts());
};
