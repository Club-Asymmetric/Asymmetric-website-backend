import express from 'express';
import * as podcastController from '../controllers/podcastController.js';
const router = express.Router();

router.get('/', podcastController.getAllPodcastsHandler);
router.post('/', podcastController.createPodcastHandler);

export default router;