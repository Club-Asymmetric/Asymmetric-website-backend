const express = require('express');
const adminController = require('../controllers/adminController');
const authMiddleware = require('../middlewares/authMiddleware');
const router = express.Router();

router.get('/registrations', authMiddleware, adminController.viewRegistrations);
router.get('/events', authMiddleware, adminController.viewEvents);
router.get('/photos', authMiddleware, adminController.viewPhotos);

module.exports = router;
