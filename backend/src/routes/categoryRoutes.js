const express = require('express');
const {
  getCategories,
  getCategoryBySlug,
  createCategory,
  updateCategory,
  deleteCategory,
} = require('../controllers/categoryController');
const { protect, adminOnly } = require('../middleware/authMiddleware');
const validateRequest = require('../middleware/validateRequest');
const {
  createCategoryValidator,
  updateCategoryValidator,
  slugParamValidator,
  idParamValidator,
} = require('../validators/categoryValidators');

const router = express.Router();

router.get('/', getCategories);
router.get('/:slug', slugParamValidator, validateRequest, getCategoryBySlug);
router.post('/', protect, adminOnly, createCategoryValidator, validateRequest, createCategory);
router.put('/:id', protect, adminOnly, updateCategoryValidator, validateRequest, updateCategory);
router.delete('/:id', protect, adminOnly, idParamValidator, validateRequest, deleteCategory);

module.exports = router;
