const { body } = require('express-validator');

const passwordRule =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z\d]).{8,}$/;

const registerValidator = [
  body('fullName').trim().notEmpty().withMessage('Full name is required'),
  body('email').isEmail().withMessage('A valid email is required').normalizeEmail(),
  body('phone').trim().notEmpty().withMessage('Phone number is required'),
  body('password')
    .matches(passwordRule)
    .withMessage(
      'Password must be at least 8 characters and include uppercase, lowercase, number, and special character'
    ),
  body('city').optional().isString().withMessage('City must be text'),
  body('state').optional().isString().withMessage('State must be text'),
];

const loginValidator = [
  body('email').isEmail().withMessage('A valid email is required').normalizeEmail(),
  body('password').notEmpty().withMessage('Password is required'),
];

module.exports = {
  registerValidator,
  loginValidator,
};
