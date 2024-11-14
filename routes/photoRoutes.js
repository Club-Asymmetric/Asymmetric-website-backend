import express from 'express';
import { getPhotoById } from '../controllers/photo.controller.js';

const router = express.Router();
router.get('/:id', getPhotoById);
export default router;
