import express from 'express';
import * as eventController from '../controllers/eventController.js';
import logger from '../middlewares/logger.js';
const router = express.Router();


import { getEvent, getAllEvents } from '../database/models.js'

export const getAllEventsHandler = (req, res) => {
    return res.json(getAllEvents());
};
export const getEventHandler = (req, res) => {
    return res.json(getEvent(req.params.name));
};




router.use(logger('events'));
router.get('/:name', eventController.getEventHandler);
router.get('/', eventController.getAllEventsHandler);

export default router;
