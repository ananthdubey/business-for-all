const bcrypt = require('bcrypt');
const User = require('../models/User');
const asyncHandler = require('../utils/asyncHandler');
const ApiError = require('../utils/ApiError');
const { sendAuthResponse, sendResponse } = require('../utils/apiResponse');
const { getCookieOptions } = require('../utils/cookies');
const env = require('../config/env');
const dbState = require('../config/dbState');
const { generateToken } = require('../utils/generateToken');
const { sendRegistrationEmail } = require('../utils/email');
const logger = require('../utils/logger');

const ensureDatabaseReady = () => {
  if (!dbState.getState().isReady) {
    throw new ApiError(503, 'Authentication is temporarily unavailable while the database reconnects');
  }
};

const register = asyncHandler(async (req, res) => {
  ensureDatabaseReady();
  const { fullName, email, phone, password, city, state } = req.body;

  const existingUser = await User.findOne({ email: email.toLowerCase() });
  if (existingUser) {
    throw new ApiError(409, 'An account with this email already exists');
  }

  const hashedPassword = await bcrypt.hash(password, 12);
  const user = await User.create({
    fullName,
    email: email.toLowerCase(),
    phone,
    password: hashedPassword,
    city,
    state,
  });

  const token = generateToken(user);

  res.cookie(env.cookieName, token, getCookieOptions());

  sendRegistrationEmail({
    to: user.email,
    fullName: user.fullName,
  }).catch((error) => logger.error('Failed to send registration email', error));

  return sendAuthResponse(res, {
    statusCode: 201,
    message: 'Registration successful',
    token,
    user,
  });
});

const login = asyncHandler(async (req, res) => {
  ensureDatabaseReady();
  const { email, password } = req.body;

  const user = await User.findOne({ email: email.toLowerCase() });
  if (!user) {
    throw new ApiError(401, 'Invalid email or password');
  }

  const passwordMatches = await bcrypt.compare(password, user.password);
  if (!passwordMatches) {
    throw new ApiError(401, 'Invalid email or password');
  }

  const token = generateToken(user);

  res.cookie(env.cookieName, token, getCookieOptions());

  return sendAuthResponse(res, {
    message: 'Login successful',
    token,
    user,
  });
});

const getMe = asyncHandler(async (req, res) => {
  return sendResponse(res, {
    message: 'Authenticated user fetched successfully',
    data: req.user,
  });
});

const logout = asyncHandler(async (_req, res) => {
  res.clearCookie(env.cookieName, getCookieOptions());

  return sendResponse(res, {
    message: 'Logout successful',
    data: {},
  });
});

module.exports = {
  register,
  login,
  getMe,
  logout,
};
