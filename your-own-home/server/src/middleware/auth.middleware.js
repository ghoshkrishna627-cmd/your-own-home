const jwt = require('jsonwebtoken');
const catchAsync = require('../utils/catchAsync');
const { ApiError } = require('../utils/apiResponse');
const User = require('../models/User');

/**
 * Verifies the access-token JWT stored in the httpOnly cookie and attaches
 * the authenticated user to req.user. Never reads tokens from headers or
 * localStorage — cookie-only, per the auth architecture.
 */
const protect = catchAsync(async (req, res, next) => {
  const token = req.cookies?.accessToken;

  if (!token) {
    throw new ApiError(401, 'Not authenticated. Please log in.');
  }

  const decoded = jwt.verify(token, process.env.JWT_ACCESS_SECRET);

  const user = await User.findById(decoded.id).select('-password');
  if (!user) {
    throw new ApiError(401, 'User belonging to this token no longer exists');
  }
  if (!user.isActive) {
    throw new ApiError(403, 'This account has been disabled');
  }

  req.user = user;
  next();
});

/**
 * Optional auth: attaches req.user if a valid cookie is present, but does
 * not reject the request otherwise. Useful for e.g. showing "favorited"
 * state on listings only when logged in.
 */
const attachUserIfPresent = catchAsync(async (req, res, next) => {
  const token = req.cookies?.accessToken;
  if (!token) return next();

  try {
    const decoded = jwt.verify(token, process.env.JWT_ACCESS_SECRET);
    const user = await User.findById(decoded.id).select('-password');
    if (user && user.isActive) req.user = user;
  } catch (err) {
    // silently ignore — this route doesn't require auth
  }
  next();
});

module.exports = { protect, attachUserIfPresent };
