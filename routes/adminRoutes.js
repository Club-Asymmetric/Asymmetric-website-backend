import express from 'express';
import authMiddleware from '../middlewares/authMiddleware.js';
import { getRegistrations, getEvents, getPhotos } from '../controllers/admin.controller.js';
const router = express.Router();

router.get('/registrations', authMiddleware, getRegistrations);
router.get('/events', authMiddleware, getEvents);
router.get('/photos', authMiddleware, getPhotos);

export default router;
