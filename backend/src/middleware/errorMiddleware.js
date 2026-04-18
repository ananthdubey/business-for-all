const ApiError = require('../utils/ApiError');
const logger = require('../utils/logger');

const notFound = (req, _res, next) => {
  next(new ApiError(404, `Route not found: ${req.originalUrl}`));
};

const errorHandler = (error, _req, res, _next) => {
  logger.error(error.message, error);

  let statusCode = error.statusCode || 500;
  let message = error.message || 'Internal server error';

  if (error.name === 'ValidationError') {
    statusCode = 400;
  }

  if (error.name === 'JsonWebTokenError' || error.name === 'TokenExpiredError') {
    statusCode = 401;
    message = 'Your session is invalid or has expired. Please sign in again.';
  }

  if (error.code === 11000) {
    statusCode = 409;
    message = 'A record with this value already exists';
  }

  if (error.name === 'MulterError') {
    statusCode = 400;
  }

  if (typeof message === 'string' && message.startsWith('CORS origin not allowed:')) {
    statusCode = 403;
  }

  res.status(statusCode).json({
    success: false,
    message,
    data: {},
    ...(process.env.NODE_ENV !== 'production' && error.stack ? { stack: error.stack } : {}),
  });
};

module.exports = {
  notFound,
  errorHandler,
};
