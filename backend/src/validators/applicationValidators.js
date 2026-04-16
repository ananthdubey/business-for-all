const { body, param } = require('express-validator');

const createApplicationValidator = [
  body('categoryId').isMongoId().withMessage('A valid category is required'),
  body('businessName').trim().notEmpty().withMessage('Business name is required'),
  body('investmentBudget')
    .notEmpty()
    .withMessage('Investment budget is required')
    .bail()
    .isFloat({ min: 0 })
    .withMessage('Investment budget must be a valid number'),
  body('location').trim().notEmpty().withMessage('Location is required'),
  body('experience').optional().isString().withMessage('Experience must be text'),
];

const idParamValidator = [
  param('id').isMongoId().withMessage('A valid application id is required'),
];

module.exports = {
  createApplicationValidator,
  idParamValidator,
};
