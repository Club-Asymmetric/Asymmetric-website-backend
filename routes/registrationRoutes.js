import express from 'express';
import * as registrationController from '../controllers/registrationController.js';
const router = express.Router();


export const registerUserHandler = (req, res) => { /* Implement logic */ };



router.post('/', registrationController.registerUserHandler);

export default router;