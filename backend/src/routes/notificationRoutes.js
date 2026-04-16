const express = require('express');
const { getNotifications, markNotificationAsRead } = require('../controllers/notificationController');
const { protect } = require('../middleware/authMiddleware');
const validateRequest = require('../middleware/validateRequest');
const { notificationIdValidator } = require('../validators/notificationValidators');

const router = express.Router();

router.use(protect);

router.get('/', getNotifications);
router.put('/:id/read', notificationIdValidator, validateRequest, markNotificationAsRead);

module.exports = router;
