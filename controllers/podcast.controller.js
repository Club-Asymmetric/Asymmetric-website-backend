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

export const getPodcasts = async (req, res, next) => {
  try {
    res.json(await getAllPodcasts());
  } catch (error) {
    next(error);
  }
};

export const getPodcastAudioById = async (req, res, next) => {
  try {
    const { stream, mime, size } = await getPodcastAudio(req.params.id);
    console.log(mime);
    res.writeHead(200, {
      "Content-Type": `audio/${mime}`,
      "Content-Length": size,
    });
    stream.pipe(res);
    stream.on("error", (err) => {
      next(err);
    });
  } catch (error) {
    next(error);
  }
};
