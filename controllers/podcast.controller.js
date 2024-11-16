import {
  getPodcast,
  getAllPodcasts,
  getPodcastAudio,
} from "../models/podcast.js";

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

export const getPodcastAudioById = async (req, res, next) => {
  const { stream, audio, size } = await getPodcastAudio(req.params.id);
  res.writeHead(200, {
    "Content-Type": `audio/${audio}`,
    "Content-Length": size,
  });
  stream.pipe(res);
  stream.on("error", (err) => {
    console.error("Error reading the file:", err);
    next(err);
  });
};
