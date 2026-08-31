const { validationResult } = require('express-validator');
const { ApiError } = require('../utils/apiResponse');

/**
 * Runs after an array of express-validator checks (defined per-route in
 * src/validators/) and turns any failures into a consistent 400 ApiError.
 *
 * Usage:
 *   router.post('/', registerValidator, validate, authController.register)
 */
const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const messages = errors.array().map((e) => `${e.path}: ${e.msg}`);
    return next(new ApiError(400, 'Validation failed', messages));
  }
  next();
};

module.exports = validate;
