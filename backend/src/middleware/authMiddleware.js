const jwt = require('jsonwebtoken');
const User = require('../models/User');
const env = require('../config/env');
const dbState = require('../config/dbState');
const ApiError = require('../utils/ApiError');
const asyncHandler = require('../utils/asyncHandler');

const getTokenFromRequest = (req) => {
  const authHeader = req.headers.authorization;

  if (authHeader && authHeader.startsWith('Bearer ')) {
    return authHeader.split(' ')[1];
  }

  if (req.cookies && req.cookies[env.cookieName]) {
    return req.cookies[env.cookieName];
  }

  return null;
};

const protect = asyncHandler(async (req, _res, next) => {
  const token = getTokenFromRequest(req);

  if (!token) {
    throw new ApiError(401, 'Authentication token is missing');
  }

  const decoded = jwt.verify(token, env.jwtSecret);

  if (!dbState.getState().isReady) {
    throw new ApiError(503, 'Authentication is temporarily unavailable while the database reconnects');
  }

  const user = await User.findById(decoded.id).select('-password');

  if (!user) {
    throw new ApiError(401, 'User not found or no longer available');
  }

  req.user = user;
  next();
});

const adminOnly = (req, _res, next) => {
  if (req.user?.role !== 'admin') {
    return next(new ApiError(403, 'Admin access is required'));
  }

  return next();
};

module.exports = {
  protect,
  adminOnly,
};
