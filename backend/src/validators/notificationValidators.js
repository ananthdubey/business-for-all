const { param } = require('express-validator');

const notificationIdValidator = [
  param('id').isMongoId().withMessage('A valid notification id is required'),
];

module.exports = {
  notificationIdValidator,
};
