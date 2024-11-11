import express from 'express';
import * as adminController from '../controllers/adminController.js';
import authMiddleware from '../middlewares/authMiddleware.js';
const router = express.Router();

router.get('/registrations', authMiddleware, adminController.viewRegistrations);
router.get('/events', authMiddleware, adminController.viewEvents);
router.get('/photos', authMiddleware, adminController.viewPhotos);

export default router;
