const User = require('../models/User');
const FranchiseCategory = require('../models/FranchiseCategory');
const ApiError = require('../utils/ApiError');
const asyncHandler = require('../utils/asyncHandler');
const { sendResponse } = require('../utils/apiResponse');

const getProfile = asyncHandler(async (req, res) => {
  return sendResponse(res, {
    message: 'Profile fetched successfully',
    data: req.user,
  });
});

const updateProfile = asyncHandler(async (req, res) => {
  const allowedFields = ['fullName', 'phone', 'city', 'state'];

  allowedFields.forEach((field) => {
    if (req.body[field] !== undefined) {
      req.user[field] = req.body[field];
    }
  });

  await req.user.save();

  const freshUser = await User.findById(req.user._id).select('-password');

  return sendResponse(res, {
    message: 'Profile updated successfully',
    data: freshUser,
  });
});

const getFavorites = asyncHandler(async (req, res) => {
  const freshUser = await User.findById(req.user._id).populate('favoriteCategories');

  return sendResponse(res, {
    message: 'Favorites fetched successfully',
    data: freshUser?.favoriteCategories || [],
  });
});

const addFavorite = asyncHandler(async (req, res) => {
  const category = await FranchiseCategory.findById(req.body.categoryId);

  if (!category) {
    throw new ApiError(404, 'Opportunity not found');
  }

  const alreadySaved = req.user.favoriteCategories.some(
    (favoriteId) => favoriteId.toString() === category._id.toString()
  );

  if (!alreadySaved) {
    req.user.favoriteCategories.push(category._id);
    await req.user.save();
  }

  const freshUser = await User.findById(req.user._id).populate('favoriteCategories');

  return sendResponse(res, {
    message: alreadySaved ? 'Opportunity already saved' : 'Opportunity saved successfully',
    data: freshUser?.favoriteCategories || [],
  });
});

const removeFavorite = asyncHandler(async (req, res) => {
  req.user.favoriteCategories = req.user.favoriteCategories.filter(
    (favoriteId) => favoriteId.toString() !== req.params.categoryId
  );

  await req.user.save();

  const freshUser = await User.findById(req.user._id).populate('favoriteCategories');

  return sendResponse(res, {
    message: 'Saved opportunity removed',
    data: freshUser?.favoriteCategories || [],
  });
});

module.exports = {
  getProfile,
  updateProfile,
  getFavorites,
  addFavorite,
  removeFavorite,
};
