const express = require('express');
const { getProfile, updateProfile } = require('../controllers/userController');
const { protect } = require('../middleware/authMiddleware');
const validateRequest = require('../middleware/validateRequest');
const { updateProfileValidator } = require('../validators/userValidators');

const router = express.Router();

router.use(protect);

router.get('/profile', getProfile);
router.put('/profile', updateProfileValidator, validateRequest, updateProfile);

module.exports = router;
