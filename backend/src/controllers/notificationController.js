const Notification = require('../models/Notification');
const asyncHandler = require('../utils/asyncHandler');
const ApiError = require('../utils/ApiError');
const { sendResponse } = require('../utils/apiResponse');

const getNotifications = asyncHandler(async (req, res) => {
  const notifications = await Notification.find({ userId: req.user._id }).sort({ createdAt: -1 });

  return sendResponse(res, {
    message: 'Notifications fetched successfully',
    data: notifications,
  });
});

const markNotificationAsRead = asyncHandler(async (req, res) => {
  const notification = await Notification.findById(req.params.id);

  if (!notification) {
    throw new ApiError(404, 'Notification not found');
  }

  if (notification.userId.toString() !== req.user._id.toString()) {
    throw new ApiError(403, 'You are not authorized to update this notification');
  }

  notification.read = true;
  await notification.save();

  return sendResponse(res, {
    message: 'Notification marked as read',
    data: notification,
  });
});

module.exports = {
  getNotifications,
  markNotificationAsRead,
};
