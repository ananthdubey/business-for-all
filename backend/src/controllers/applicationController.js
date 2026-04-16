const FranchiseApplication = require('../models/FranchiseApplication');
const FranchiseCategory = require('../models/FranchiseCategory');
const Notification = require('../models/Notification');
const asyncHandler = require('../utils/asyncHandler');
const ApiError = require('../utils/ApiError');
const { sendResponse } = require('../utils/apiResponse');

const mapUploadedDocuments = (files = []) =>
  files.map((file) => ({
    originalName: file.originalname,
    fileName: file.filename,
    fileUrl: `/uploads/documents/${file.filename}`,
    mimeType: file.mimetype,
    size: file.size,
  }));

const createApplication = asyncHandler(async (req, res) => {
  const { categoryId, businessName, investmentBudget, location, experience } = req.body;

  const category = await FranchiseCategory.findOne({ _id: categoryId, active: true });
  if (!category) {
    throw new ApiError(404, 'Active franchise category not found');
  }

  const application = await FranchiseApplication.create({
    userId: req.user._id,
    categoryId,
    businessName,
    investmentBudget,
    location,
    experience,
    documents: mapUploadedDocuments(req.files),
  });

  await Notification.create({
    userId: req.user._id,
    title: 'Application submitted',
    message: `Your application for ${category.title} has been submitted successfully.`,
  });

  const populatedApplication = await FranchiseApplication.findById(application._id)
    .populate('categoryId', 'title slug type')
    .populate('userId', 'fullName email');

  return sendResponse(res, {
    statusCode: 201,
    message: 'Application submitted successfully',
    data: populatedApplication,
  });
});

const getMyApplications = asyncHandler(async (req, res) => {
  const applications = await FranchiseApplication.find({ userId: req.user._id })
    .populate('categoryId', 'title slug type investmentMin investmentMax')
    .sort({ createdAt: -1 });

  return sendResponse(res, {
    message: 'Your applications fetched successfully',
    data: applications,
  });
});

const getApplicationById = asyncHandler(async (req, res) => {
  const application = await FranchiseApplication.findById(req.params.id)
    .populate('userId', 'fullName email phone city state')
    .populate('categoryId', 'title slug type description');

  if (!application) {
    throw new ApiError(404, 'Application not found');
  }

  const isOwner = application.userId._id.toString() === req.user._id.toString();
  if (!isOwner && req.user.role !== 'admin') {
    throw new ApiError(403, 'You are not authorized to view this application');
  }

  return sendResponse(res, {
    message: 'Application fetched successfully',
    data: application,
  });
});

const cancelApplication = asyncHandler(async (req, res) => {
  const application = await FranchiseApplication.findById(req.params.id);

  if (!application) {
    throw new ApiError(404, 'Application not found');
  }

  if (application.userId.toString() !== req.user._id.toString()) {
    throw new ApiError(403, 'You are not authorized to cancel this application');
  }

  if (!['pending', 'under-review'].includes(application.status)) {
    throw new ApiError(400, 'Only pending or under-review applications can be cancelled');
  }

  application.status = 'rejected';
  application.adminNotes = application.adminNotes
    ? `${application.adminNotes}\nCancelled by applicant.`
    : 'Cancelled by applicant.';

  await application.save();

  return sendResponse(res, {
    message: 'Application cancelled successfully',
    data: application,
  });
});

module.exports = {
  createApplication,
  getMyApplications,
  getApplicationById,
  cancelApplication,
};
