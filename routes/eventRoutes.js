import express from 'express';
import * as eventController from '../controllers/eventController.js';
import logger from '../middlewares/logger.js';
const router = express.Router();

router.use(logger('events'));
router.get('/:name', eventController.getEventHandler);
router.get('/', eventController.getAllEventsHandler);

export default router;
