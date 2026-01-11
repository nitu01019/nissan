/**
 * Authentication Middleware
 * 
 * Protects routes and validates user sessions
 * Implements role-based access control
 * 
 * @author Nissan Jammu Development Team
 */

const authService = require('../services/auth.service');

/**
 * Authenticate user - require valid access token
 */
const authenticate = async (req, res, next) => {
  try {
    // Get token from header
    const authHeader = req.headers.authorization;
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({
        success: false,
        message: 'Authentication required. Please login.',
        code: 'AUTH_REQUIRED',
      });
    }

    const token = authHeader.split(' ')[1];

    // Verify token
    const decoded = authService.verifyAccessToken(token);

    // Get user
    const user = await authService.getUserById(decoded.userId);
    
    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'User not found',
        code: 'USER_NOT_FOUND',
      });
    }

    if (!user.isActive) {
      return res.status(403).json({
        success: false,
        message: 'Account has been deactivated',
        code: 'ACCOUNT_DEACTIVATED',
      });
    }

    // Attach user to request
    req.user = user;
    req.userId = user.id;

    next();
  } catch (error) {
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({
        success: false,
        message: 'Token expired. Please refresh.',
        code: 'TOKEN_EXPIRED',
      });
    }

    return res.status(401).json({
      success: false,
      message: 'Invalid authentication token',
      code: 'INVALID_TOKEN',
    });
  }
};

/**
 * Optional authentication - attach user if token provided, but don't require it
 */
const optionalAuth = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    
    if (authHeader && authHeader.startsWith('Bearer ')) {
      const token = authHeader.split(' ')[1];
      const decoded = authService.verifyAccessToken(token);
      const user = await authService.getUserById(decoded.userId);
      
      if (user && user.isActive) {
        req.user = user;
        req.userId = user.id;
      }
    }

    next();
  } catch (error) {
    // Ignore errors - user will just be undefined
    next();
  }
};

/**
 * Require specific role(s)
 * @param {string|string[]} roles - Required role(s)
 */
const requireRole = (...roles) => {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: 'Authentication required',
        code: 'AUTH_REQUIRED',
      });
    }

    const flatRoles = roles.flat();
    
    if (!flatRoles.includes(req.user.role)) {
      return res.status(403).json({
        success: false,
        message: 'Access denied. Insufficient permissions.',
        code: 'INSUFFICIENT_PERMISSIONS',
      });
    }

    next();
  };
};

/**
 * Require admin role
 */
const requireAdmin = requireRole('admin');

/**
 * Require staff or admin role
 */
const requireStaff = requireRole('admin', 'staff');

/**
 * Rate limiter for auth routes (stricter limits)
 */
const rateLimit = require('express-rate-limit');

const authRateLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 10, // 10 requests per window
  message: {
    success: false,
    message: 'Too many authentication attempts. Please try again later.',
    code: 'RATE_LIMITED',
  },
  standardHeaders: true,
  legacyHeaders: false,
});

const loginRateLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  max: 5, // 5 failed attempts per hour
  message: {
    success: false,
    message: 'Too many failed login attempts. Please try again in an hour.',
    code: 'LOGIN_RATE_LIMITED',
  },
  skipSuccessfulRequests: true,
});

module.exports = {
  authenticate,
  optionalAuth,
  requireRole,
  requireAdmin,
  requireStaff,
  authRateLimiter,
  loginRateLimiter,
};
