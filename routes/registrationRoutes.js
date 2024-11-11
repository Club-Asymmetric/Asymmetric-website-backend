import express from 'express';
import * as registrationController from '../controllers/registrationController.js';
const router = express.Router();

router.post('/', registrationController.registerUser);

export default router;