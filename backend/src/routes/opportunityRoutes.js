const express = require('express');
const {
  getCategories,
  getCategoryBySlug,
} = require('../controllers/categoryController');
const validateRequest = require('../middleware/validateRequest');
const { slugParamValidator } = require('../validators/categoryValidators');

const router = express.Router();

router.get('/', getCategories);
router.get('/:slug', slugParamValidator, validateRequest, getCategoryBySlug);

module.exports = router;
