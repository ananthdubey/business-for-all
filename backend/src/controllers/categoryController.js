const FranchiseCategory = require('../models/FranchiseCategory');
const dbState = require('../config/dbState');
const asyncHandler = require('../utils/asyncHandler');
const ApiError = require('../utils/ApiError');
const { sendResponse } = require('../utils/apiResponse');
const slugify = require('../utils/slugify');
const { getPagination, getPagingMeta } = require('../utils/pagination');

const getCategories = asyncHandler(async (req, res) => {
  const { search, type, active, page, limit, skip } = getPagination(req.query);
  const regex = search ? new RegExp(search, 'i') : null;

  const filters = {
    ...(regex ? { $or: [{ title: regex }, { description: regex }, { type: regex }] } : {}),
    ...(type ? { type } : {}),
    ...(typeof active === 'string' ? { active: active === 'true' } : {}),
  };

  if (!dbState.getState().isReady) {
    return sendResponse(res, {
      message: 'Categories unavailable while the database reconnects',
      data: [],
      meta: getPagingMeta({ page, limit, total: 0 }),
    });
  }

  const [categories, total] = await Promise.all([
    FranchiseCategory.find(filters).sort({ createdAt: -1 }).skip(skip).limit(limit),
    FranchiseCategory.countDocuments(filters),
  ]);

  return sendResponse(res, {
    message: 'Categories fetched successfully',
    data: categories,
    meta: getPagingMeta({ page, limit, total }),
  });
});

const getCategoryBySlug = asyncHandler(async (req, res) => {
  if (!dbState.getState().isReady) {
    throw new ApiError(503, 'Categories are temporarily unavailable while the database reconnects');
  }

  const category = await FranchiseCategory.findOne({ slug: req.params.slug });
  if (!category) {
    throw new ApiError(404, 'Category not found');
  }

  return sendResponse(res, {
    message: 'Category fetched successfully',
    data: category,
  });
});

const createCategory = asyncHandler(async (req, res) => {
  if (!dbState.getState().isReady) {
    throw new ApiError(503, 'Categories are temporarily unavailable while the database reconnects');
  }

  const payload = {
    ...req.body,
    slug: req.body.slug ? slugify(req.body.slug) : slugify(req.body.title),
  };

  const existingCategory = await FranchiseCategory.findOne({ slug: payload.slug });
  if (existingCategory) {
    throw new ApiError(409, 'A category with this slug already exists');
  }

  const category = await FranchiseCategory.create(payload);

  return sendResponse(res, {
    statusCode: 201,
    message: 'Category created successfully',
    data: category,
  });
});

const updateCategory = asyncHandler(async (req, res) => {
  if (!dbState.getState().isReady) {
    throw new ApiError(503, 'Categories are temporarily unavailable while the database reconnects');
  }

  const category = await FranchiseCategory.findById(req.params.id);
  if (!category) {
    throw new ApiError(404, 'Category not found');
  }

  const nextSlug = req.body.slug
    ? slugify(req.body.slug)
    : req.body.title
      ? slugify(req.body.title)
      : category.slug;

  const duplicateCategory = await FranchiseCategory.findOne({
    slug: nextSlug,
    _id: { $ne: category._id },
  });

  if (duplicateCategory) {
    throw new ApiError(409, 'Another category already uses this slug');
  }

  Object.assign(category, {
    ...req.body,
    slug: nextSlug,
  });

  if (category.investmentMax < category.investmentMin) {
    throw new ApiError(400, 'Maximum investment must be greater than or equal to minimum investment');
  }

  await category.save();

  return sendResponse(res, {
    message: 'Category updated successfully',
    data: category,
  });
});

const deleteCategory = asyncHandler(async (req, res) => {
  if (!dbState.getState().isReady) {
    throw new ApiError(503, 'Categories are temporarily unavailable while the database reconnects');
  }

  const category = await FranchiseCategory.findById(req.params.id);
  if (!category) {
    throw new ApiError(404, 'Category not found');
  }

  await category.deleteOne();

  return sendResponse(res, {
    message: 'Category deleted successfully',
    data: {},
  });
});

module.exports = {
  getCategories,
  getCategoryBySlug,
  createCategory,
  updateCategory,
  deleteCategory,
};
