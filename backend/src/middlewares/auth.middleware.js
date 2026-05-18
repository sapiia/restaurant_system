/**
 * Authentication middleware
 * Verifies JWT token from Authorization header
 */
const authMiddleware = (req, res, next) => {
  // TODO: Implement JWT verification
  next();
};

module.exports = authMiddleware;
