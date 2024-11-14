import express from 'express';
import { getPodcastByName, getAllPodcasts } from '../models/podcast.js';
import { logging } from '../middlewares/logger.js';
const router = express.Router();

router.use(logging);

router.get('/:name', getPodcastByName);

router.get('/', getAllPodcasts);

export default router;
