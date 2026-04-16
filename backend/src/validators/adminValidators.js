const { body, param } = require('express-validator');

const updateApplicationStatusValidator = [
  param('id').isMongoId().withMessage('A valid application id is required'),
  body('status')
    .isIn(['pending', 'approved', 'rejected', 'under-review'])
    .withMessage('A valid application status is required'),
  body('adminNotes')
    .optional()
    .isString()
    .isLength({ max: 1000 })
    .withMessage('Admin notes must be under 1000 characters'),
];

module.exports = {
  updateApplicationStatusValidator,
};
