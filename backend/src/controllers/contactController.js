const ContactLead = require('../models/ContactLead');
const dbState = require('../config/dbState');
const asyncHandler = require('../utils/asyncHandler');
const ApiError = require('../utils/ApiError');
const { sendResponse } = require('../utils/apiResponse');
const { sendSupportLeadEmail } = require('../utils/email');
const logger = require('../utils/logger');

const submitContactLead = asyncHandler(async (req, res) => {
  if (!dbState.getState().isReady) {
    throw new ApiError(503, 'Contact form is temporarily unavailable while the database reconnects');
  }

  const lead = await ContactLead.create(req.body);

  sendSupportLeadEmail(lead).catch((error) => logger.error('Failed to send support lead email', error));

  return sendResponse(res, {
    statusCode: 201,
    message: 'Your message has been submitted successfully',
    data: lead,
  });
});

module.exports = {
  submitContactLead,
};
