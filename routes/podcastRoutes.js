const express = require('express');
const podcastController = require('../controllers/podcastController');
const router = express.Router();

router.get('/', podcastController.getAllPodcasts);
router.post('/', podcastController.createPodcast);

module.exports = router;
