const FranchiseApplication = require('../models/FranchiseApplication');
const FranchiseCategory = require('../models/FranchiseCategory');
const Notification = require('../models/Notification');
const User = require('../models/User');
const asyncHandler = require('../utils/asyncHandler');
const ApiError = require('../utils/ApiError');
const { sendResponse } = require('../utils/apiResponse');
const { sendApplicationStatusEmail } = require('../utils/email');
const logger = require('../utils/logger');
const { getPagination, getPagingMeta } = require('../utils/pagination');

const buildApplicationSearchQuery = async (search) => {
  if (!search) {
    return {};
  }

  const regex = new RegExp(search, 'i');
  const matchedUsers = await User.find({
    $or: [{ fullName: regex }, { email: regex }, { phone: regex }],
  }).select('_id');

  return {
    $or: [
      { businessName: regex },
      { location: regex },
      { experience: regex },
      { userId: { $in: matchedUsers.map((user) => user._id) } },
    ],
  };
};

const getAdminApplications = asyncHandler(async (req, res) => {
  const { page, limit, skip } = getPagination(req.query);
  const { status, categoryId, search } = req.query;

  const filters = {
    ...(status ? { status } : {}),
    ...(categoryId ? { categoryId } : {}),
    ...(await buildApplicationSearchQuery(search)),
  };

  const [applications, total] = await Promise.all([
    FranchiseApplication.find(filters)
      .populate('userId', 'fullName email phone city state')
      .populate('categoryId', 'title slug type')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit),
    FranchiseApplication.countDocuments(filters),
  ]);

  return sendResponse(res, {
    message: 'Applications fetched successfully',
    data: applications,
    meta: getPagingMeta({ page, limit, total }),
  });
});

const updateApplicationStatus = asyncHandler(async (req, res) => {
  const { status, adminNotes } = req.body;

  const application = await FranchiseApplication.findById(req.params.id)
    .populate('userId', 'fullName email')
    .populate('categoryId', 'title');

  if (!application) {
    throw new ApiError(404, 'Application not found');
  }

  application.status = status;
  if (typeof adminNotes === 'string') {
    application.adminNotes = adminNotes;
  }
  await application.save();

  await Notification.create({
    userId: application.userId._id,
    title: `Application ${status}`,
    message: `Your application for ${application.categoryId.title} is now ${status}.`,
  });

  sendApplicationStatusEmail({
    to: application.userId.email,
    fullName: application.userId.fullName,
    categoryTitle: application.categoryId.title,
    status,
    adminNotes: application.adminNotes,
  }).catch((error) => logger.error('Failed to send application status email', error));

  return sendResponse(res, {
    message: 'Application status updated successfully',
    data: application,
  });
});

const getAdminUsers = asyncHandler(async (req, res) => {
  const { page, limit, skip } = getPagination(req.query);
  const { search, role } = req.query;
  const regex = search ? new RegExp(search, 'i') : null;

  const filters = {
    ...(role ? { role } : {}),
    ...(regex
      ? {
          $or: [{ fullName: regex }, { email: regex }, { phone: regex }, { city: regex }],
        }
      : {}),
  };

  const [users, total] = await Promise.all([
    User.find(filters)
      .select('-password')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit),
    User.countDocuments(filters),
  ]);

  return sendResponse(res, {
    message: 'Users fetched successfully',
    data: users,
    meta: getPagingMeta({ page, limit, total }),
  });
});

const getDashboardStats = asyncHandler(async (_req, res) => {
  const [
    totalUsers,
    totalApplications,
    pendingApplications,
    approvedApplications,
    totalCategories,
  ] = await Promise.all([
    User.countDocuments(),
    FranchiseApplication.countDocuments(),
    FranchiseApplication.countDocuments({ status: 'pending' }),
    FranchiseApplication.countDocuments({ status: 'approved' }),
    FranchiseCategory.countDocuments(),
  ]);

  return sendResponse(res, {
    message: 'Dashboard statistics fetched successfully',
    data: {
      totalUsers,
      totalApplications,
      pendingApplications,
      approvedApplications,
      totalCategories,
    },
  });
});

module.exports = {
  getAdminApplications,
  updateApplicationStatus,
  getAdminUsers,
  getDashboardStats,
};
