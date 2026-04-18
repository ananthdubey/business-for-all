const express = require('express');
const {
  getProfile,
  updateProfile,
  getFavorites,
  addFavorite,
  removeFavorite,
} = require('../controllers/userController');
const { protect } = require('../middleware/authMiddleware');
const validateRequest = require('../middleware/validateRequest');
const {
  updateProfileValidator,
  favoriteValidator,
  favoriteParamValidator,
} = require('../validators/userValidators');

const router = express.Router();

router.use(protect);

router.get('/profile', getProfile);
router.put('/profile', updateProfileValidator, validateRequest, updateProfile);
router.get('/favorites', getFavorites);
router.post('/favorites', favoriteValidator, validateRequest, addFavorite);
router.delete('/favorites/:categoryId', favoriteParamValidator, validateRequest, removeFavorite);

module.exports = router;
