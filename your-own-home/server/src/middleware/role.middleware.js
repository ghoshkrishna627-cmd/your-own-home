const { ApiError } = require('../utils/apiResponse');

/**
 * Restricts a route to specific roles. Must run AFTER `protect`.
 *
 * Usage: router.post('/listings', protect, requireRole('host'), createListing)
 * Usage: router.get('/admin/users', protect, requireRole('admin'), getUsers)
 */
const requireRole = (...roles) => (req, res, next) => {
  if (!req.user) {
    return next(new ApiError(401, 'Not authenticated'));
  }
  if (!roles.includes(req.user.role)) {
    return next(new ApiError(403, 'You do not have permission to perform this action'));
  }
  next();
};

/**
 * Ownership check for resources with a `.host` field (e.g. Listing).
 * Ensures a host can only mutate their own listings — admins bypass this.
 * Expects the resource to already be loaded onto req.resource by a prior
 * middleware/controller step, OR is used inline in controllers.
 */
const requireOwnership = (resourceOwnerId, req) => {
  if (req.user.role === 'admin') return true;
  return resourceOwnerId.toString() === req.user._id.toString();
};

module.exports = { requireRole, requireOwnership };
