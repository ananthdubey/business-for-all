const express = require('express');
const { submitContactLead } = require('../controllers/contactController');
const validateRequest = require('../middleware/validateRequest');
const { contactValidator } = require('../validators/contactValidators');

const router = express.Router();

router.post('/', contactValidator, validateRequest, submitContactLead);

module.exports = router;
