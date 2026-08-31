const logger = require('../utils/logger');
const { ApiError } = require('../utils/apiResponse');

/**
 * Converts known error types (Mongoose validation/cast/duplicate-key,
 * JWT errors) into a consistent ApiError shape before the final handler
 * sends the response. Keeps controllers free of error-type-sniffing logic.
 */
const normalizeError = (err) => {
  if (err instanceof ApiError) return err;

  // Mongoose bad ObjectId
  if (err.name === 'CastError') {
    return new ApiError(400, `Invalid ${err.path}: ${err.value}`);
  }

  // Mongoose validation errors
  if (err.name === 'ValidationError') {
    const errors = Object.values(err.errors).map((e) => e.message);
    return new ApiError(400, 'Validation failed', errors);
  }

  // Mongoose duplicate key (e.g. duplicate email)
  if (err.code === 11000) {
    const field = Object.keys(err.keyValue || {})[0];
    return new ApiError(409, `${field} already exists`);
  }

  // JWT errors
  if (err.name === 'JsonWebTokenError') {
    return new ApiError(401, 'Invalid authentication token');
  }
  if (err.name === 'TokenExpiredError') {
    return new ApiError(401, 'Authentication token expired');
  }

  // Fallback: unexpected/programmer error — do not leak internals in prod
  return new ApiError(500, err.message || 'Internal server error');
};

// eslint-disable-next-line no-unused-vars
const errorHandler = (err, req, res, next) => {
  const normalized = normalizeError(err);

  if (!normalized.isOperational || normalized.statusCode >= 500) {
    logger.error(`${req.method} ${req.originalUrl} - ${err.stack || err.message}`);
  }

  res.status(normalized.statusCode || 500).json({
    success: false,
    message: normalized.message,
    ...(normalized.errors?.length && { errors: normalized.errors }),
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack }),
  });
};

const notFound = (req, res, next) => {
  next(new ApiError(404, `Route not found: ${req.originalUrl}`));
};

module.exports = { errorHandler, notFound };
