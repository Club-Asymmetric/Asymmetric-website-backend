import { getPodcast, getAllPodcasts } from "../models/podcast.js";

export const getPodcastById = async (req, res, next) => {
  try {
    res.json(await getPodcast(req.params.id));
  } catch (error) {
    next(error);
  }
};

export const getPodcasts = async (req, res) => {
  res.json(await getAllPodcasts());
};
