const { body, param } = require('express-validator');

const createCategoryValidator = [
  body('title').trim().notEmpty().withMessage('Title is required'),
  body('slug').optional().trim().isString().withMessage('Slug must be a string'),
  body('type').trim().notEmpty().withMessage('Type is required'),
  body('description').trim().notEmpty().withMessage('Description is required'),
  body('investmentMin')
    .isFloat({ min: 0 })
    .withMessage('Minimum investment must be a valid number'),
  body('investmentMax')
    .isFloat({ min: 0 })
    .withMessage('Maximum investment must be a valid number'),
  body('image').optional().isString().withMessage('Image must be a string'),
  body('benefits').optional().isArray().withMessage('Benefits must be an array'),
  body('active').optional().isBoolean().withMessage('Active must be a boolean'),
  body('investmentMax').custom((value, { req }) => {
    if (Number(value) < Number(req.body.investmentMin)) {
      throw new Error('Maximum investment must be greater than or equal to minimum investment');
    }
    return true;
  }),
];

const updateCategoryValidator = [
  param('id').isMongoId().withMessage('A valid category id is required'),
  body('title').optional().trim().notEmpty().withMessage('Title cannot be empty'),
  body('slug').optional().trim().isString().withMessage('Slug must be a string'),
  body('type').optional().trim().notEmpty().withMessage('Type cannot be empty'),
  body('description').optional().trim().notEmpty().withMessage('Description cannot be empty'),
  body('investmentMin')
    .optional()
    .isFloat({ min: 0 })
    .withMessage('Minimum investment must be a valid number'),
  body('investmentMax')
    .optional()
    .isFloat({ min: 0 })
    .withMessage('Maximum investment must be a valid number'),
  body('image').optional().isString().withMessage('Image must be a string'),
  body('benefits').optional().isArray().withMessage('Benefits must be an array'),
  body('active').optional().isBoolean().withMessage('Active must be a boolean'),
  body('investmentMax').optional().custom((value, { req }) => {
    if (
      req.body.investmentMin !== undefined &&
      Number(value) < Number(req.body.investmentMin)
    ) {
      throw new Error('Maximum investment must be greater than or equal to minimum investment');
    }
    return true;
  }),
];

const slugParamValidator = [
  param('slug').trim().notEmpty().withMessage('A valid category slug is required'),
];

const idParamValidator = [
  param('id').isMongoId().withMessage('A valid category id is required'),
];

module.exports = {
  createCategoryValidator,
  updateCategoryValidator,
  slugParamValidator,
  idParamValidator,
};
