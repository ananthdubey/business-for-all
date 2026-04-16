const User = require('../models/User');
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

module.exports = {
  getProfile,
  updateProfile,
};
