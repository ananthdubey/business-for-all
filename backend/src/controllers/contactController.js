const ContactLead = require('../models/ContactLead');
const asyncHandler = require('../utils/asyncHandler');
const { sendResponse } = require('../utils/apiResponse');
const { sendSupportLeadEmail } = require('../utils/email');
const logger = require('../utils/logger');

const submitContactLead = asyncHandler(async (req, res) => {
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
