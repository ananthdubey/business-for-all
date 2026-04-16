const { body } = require('express-validator');

const contactValidator = [
  body('name').trim().notEmpty().withMessage('Name is required'),
  body('email').isEmail().withMessage('A valid email is required').normalizeEmail(),
  body('phone').optional().isString().withMessage('Phone must be text'),
  body('message')
    .trim()
    .notEmpty()
    .withMessage('Message is required')
    .isLength({ min: 10 })
    .withMessage('Message must be at least 10 characters'),
];

module.exports = {
  contactValidator,
};
