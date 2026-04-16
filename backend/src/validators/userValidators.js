const { body } = require('express-validator');

const updateProfileValidator = [
  body('fullName').optional().trim().notEmpty().withMessage('Full name cannot be empty'),
  body('phone').optional().trim().notEmpty().withMessage('Phone cannot be empty'),
  body('city').optional().isString().withMessage('City must be text'),
  body('state').optional().isString().withMessage('State must be text'),
];

module.exports = {
  updateProfileValidator,
};
