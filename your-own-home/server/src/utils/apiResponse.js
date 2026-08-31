/**
 * Standardized API response envelope used across every controller.
 *
 * Success: { success: true, data: {...}, message?: "..." }
 * Error:   { success: false, message: "...", errors?: [...] }
 */

class ApiError extends Error {
  constructor(statusCode, message, errors = []) {
    super(message);
    this.statusCode = statusCode;
    this.errors = errors;
    this.isOperational = true; // distinguishes expected errors from bugs
    Error.captureStackTrace(this, this.constructor);
  }
}

const sendSuccess = (res, { statusCode = 200, message, data = {} }) => {
  return res.status(statusCode).json({
    success: true,
    ...(message && { message }),
    data,
  });
};

module.exports = { ApiError, sendSuccess };
