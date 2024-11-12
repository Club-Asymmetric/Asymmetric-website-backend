import express from 'express';
import * as podcastController from '../controllers/podcastController.js';
const router = express.Router();


export const getAllPodcastsHandler = (req, res) => { /* Implement logic */ };
export const createPodcastHandler = (req, res) => { /* Implement logic */ };


router.get('/', podcastController.getAllPodcastsHandler);
router.post('/', podcastController.createPodcastHandler);

export default router;