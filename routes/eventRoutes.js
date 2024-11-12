import express from 'express';
import logger from '../middlewares/logger.js';
const router = express.Router();

import { getEvent, getAllEvents } from '../database/models.js';

router.use(logger('events'));
router.get('/:name', (req, res) => {
    return res.json(getAllEvents());
});
router.get('/', (req, res) => {
    return res.json(getEvent(req.params.name));
});

export default router;
