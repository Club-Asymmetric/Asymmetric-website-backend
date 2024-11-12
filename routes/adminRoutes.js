import express from 'express';
import * as adminController from '../controllers/adminController.js';
import authMiddleware from '../middlewares/authMiddleware.js';
const router = express.Router();


export const viewRegistrationsHandler = (req, res) => { /* Implement logic */ };
export const viewEventsHandler = (req, res) => { /* Implement logic */ };
export const viewPhotosHandler = (req, res) => { /* Implement logic */ };


router.get('/registrations', authMiddleware, adminController.viewRegistrationsHandler);
router.get('/events', authMiddleware, adminController.viewEventsHandler);
router.get('/photos', authMiddleware, adminController.viewPhotosHandler);

export default router;
