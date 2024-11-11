import express from 'express';
import * as podcastController from '../controllers/podcastController.js';
const router = express.Router();

router.get('/', podcastController.getAllPodcasts);
router.post('/', podcastController.createPodcast);

export default router;