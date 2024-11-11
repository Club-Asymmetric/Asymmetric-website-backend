import express from 'express';
import * as eventController from '../controllers/eventController.js';
const router = express.Router();

router.get('/', eventController.getAllEvents);
router.post('/', eventController.createEvent);

export default router;