import express from 'express';
import { eventRegistration, registration } from '../controllers/registration.controller.js';
const router = express.Router();

router.post('/', registration);

router.post('/event', eventRegistration);

export default router;
