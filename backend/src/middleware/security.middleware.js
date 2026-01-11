/**
 * Security Middleware
 * 
 * Comprehensive security measures for the API
 * Includes CSRF, XSS, SQL Injection protection
 * 
 * @author Nissan Jammu Development Team
 */

const crypto = require('crypto');

/**
 * CSRF Token Management
 */
const csrfTokens = new Map();

const generateCSRFToken = (sessionId) => {
  const token = crypto.randomBytes(32).toString('hex');
  csrfTokens.set(sessionId, {
    token,
    expires: Date.now() + 3600000, // 1 hour
  });
  return token;
};

const csrfProtection = (req, res, next) => {
  // Skip for GET, HEAD, OPTIONS
  if (['GET', 'HEAD', 'OPTIONS'].includes(req.method)) {
    return next();
  }

  const sessionId = req.cookies?.sessionId || req.headers['x-session-id'];
  const csrfToken = req.headers['x-csrf-token'] || req.body?._csrf;

  if (!sessionId || !csrfToken) {
    return res.status(403).json({
      success: false,
      message: 'CSRF token missing',
      code: 'CSRF_MISSING',
    });
  }

  const stored = csrfTokens.get(sessionId);
  if (!stored || stored.token !== csrfToken || stored.expires < Date.now()) {
    return res.status(403).json({
      success: false,
      message: 'Invalid CSRF token',
      code: 'CSRF_INVALID',
    });
  }

  next();
};

/**
 * XSS Protection - Sanitize input
 */
const sanitizeInput = (obj) => {
  if (typeof obj === 'string') {
    return obj
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#x27;')
      .replace(/\//g, '&#x2F;');
  }
  if (Array.isArray(obj)) {
    return obj.map(sanitizeInput);
  }
  if (obj && typeof obj === 'object') {
    const sanitized = {};
    for (const [key, value] of Object.entries(obj)) {
      sanitized[key] = sanitizeInput(value);
    }
    return sanitized;
  }
  return obj;
};

const xssProtection = (req, res, next) => {
  if (req.body) {
    req.body = sanitizeInput(req.body);
  }
  if (req.query) {
    req.query = sanitizeInput(req.query);
  }
  if (req.params) {
    req.params = sanitizeInput(req.params);
  }
  next();
};

/**
 * SQL Injection Protection
 */
const sqlInjectionPatterns = [
  /(\b(SELECT|INSERT|UPDATE|DELETE|DROP|UNION|ALTER)\b)/gi,
  /(--)|(;)|(\/\*)|(\*\/)/g,
  /(\bOR\b\s+\d+\s*=\s*\d+)/gi,
  /(\bAND\b\s+\d+\s*=\s*\d+)/gi,
];

const detectSQLInjection = (value) => {
  if (typeof value !== 'string') return false;
  return sqlInjectionPatterns.some(pattern => pattern.test(value));
};

const sqlInjectionProtection = (req, res, next) => {
  const checkObject = (obj, path = '') => {
    if (!obj) return null;
    
    for (const [key, value] of Object.entries(obj)) {
      const currentPath = path ? `${path}.${key}` : key;
      
      if (typeof value === 'string' && detectSQLInjection(value)) {
        return currentPath;
      }
      if (typeof value === 'object' && value !== null) {
        const result = checkObject(value, currentPath);
        if (result) return result;
      }
    }
    return null;
  };

  const suspicious = checkObject(req.body) || 
                     checkObject(req.query) || 
                     checkObject(req.params);

  if (suspicious) {
    console.warn(`⚠️ SQL Injection attempt detected in ${suspicious}`);
    return res.status(400).json({
      success: false,
      message: 'Invalid input detected',
      code: 'INVALID_INPUT',
    });
  }

  next();
};

/**
 * Security Headers
 */
const securityHeaders = (req, res, next) => {
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('X-Frame-Options', 'DENY');
  res.setHeader('X-XSS-Protection', '1; mode=block');
  res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');
  res.setHeader('Permissions-Policy', 'geolocation=(), microphone=(), camera=()');
  next();
};

/**
 * Request ID for tracking
 */
const requestId = (req, res, next) => {
  req.requestId = crypto.randomBytes(8).toString('hex');
  res.setHeader('X-Request-ID', req.requestId);
  next();
};

/**
 * Log suspicious activity
 */
const suspiciousActivityLog = [];

const logSuspiciousActivity = (req, reason) => {
  suspiciousActivityLog.push({
    timestamp: new Date().toISOString(),
    ip: req.ip,
    path: req.path,
    method: req.method,
    reason,
    userAgent: req.headers['user-agent'],
  });
  
  // Keep only last 1000 entries
  if (suspiciousActivityLog.length > 1000) {
    suspiciousActivityLog.shift();
  }
};

/**
 * Account lockout tracking
 * Prevents brute force attacks by locking accounts after failed attempts
 */
const failedLoginAttempts = new Map();
const LOCKOUT_THRESHOLD = 5;
const LOCKOUT_DURATION = 15 * 60 * 1000; // 15 minutes

const checkAccountLockout = (email) => {
  const attempts = failedLoginAttempts.get(email);
  if (!attempts) return { locked: false };
  
  if (attempts.count >= LOCKOUT_THRESHOLD) {
    const timeRemaining = attempts.lockedUntil - Date.now();
    if (timeRemaining > 0) {
      return { 
        locked: true, 
        timeRemaining: Math.ceil(timeRemaining / 1000 / 60),
        message: `Account temporarily locked. Try again in ${Math.ceil(timeRemaining / 1000 / 60)} minutes.`
      };
    }
    // Lockout expired, reset
    failedLoginAttempts.delete(email);
  }
  return { locked: false };
};

const recordFailedLogin = (email) => {
  const attempts = failedLoginAttempts.get(email) || { count: 0 };
  attempts.count += 1;
  
  if (attempts.count >= LOCKOUT_THRESHOLD) {
    attempts.lockedUntil = Date.now() + LOCKOUT_DURATION;
  }
  
  failedLoginAttempts.set(email, attempts);
  return attempts.count;
};

const clearFailedLogins = (email) => {
  failedLoginAttempts.delete(email);
};

/**
 * Validate request timestamp to prevent replay attacks
 */
const validateRequestTimestamp = (req, res, next) => {
  const timestamp = req.headers['x-request-timestamp'];
  
  if (timestamp) {
    const requestTime = parseInt(timestamp, 10);
    const now = Date.now();
    const maxAge = 5 * 60 * 1000; // 5 minutes
    
    if (isNaN(requestTime) || Math.abs(now - requestTime) > maxAge) {
      logSuspiciousActivity(req, 'Invalid or expired request timestamp');
      return res.status(400).json({
        success: false,
        message: 'Invalid request timestamp',
        code: 'INVALID_TIMESTAMP',
      });
    }
  }
  
  next();
};

/**
 * Validate Content-Type header for POST/PUT/PATCH requests
 */
const validateContentType = (req, res, next) => {
  if (['POST', 'PUT', 'PATCH'].includes(req.method)) {
    const contentType = req.headers['content-type'];
    
    if (!contentType || !contentType.includes('application/json')) {
      // Allow form-urlencoded and multipart for specific endpoints
      if (!contentType?.includes('application/x-www-form-urlencoded') && 
          !contentType?.includes('multipart/form-data')) {
        return res.status(415).json({
          success: false,
          message: 'Unsupported Media Type. Use application/json',
          code: 'UNSUPPORTED_MEDIA_TYPE',
        });
      }
    }
  }
  
  next();
};

/**
 * Sanitize file names to prevent path traversal
 */
const sanitizeFileName = (fileName) => {
  if (!fileName) return '';
  return fileName
    .replace(/\.\./g, '')
    .replace(/[/\\]/g, '')
    .replace(/[^a-zA-Z0-9._-]/g, '_');
};

/**
 * Clean up expired lockouts periodically
 */
setInterval(() => {
  const now = Date.now();
  for (const [email, attempts] of failedLoginAttempts.entries()) {
    if (attempts.lockedUntil && attempts.lockedUntil < now) {
      failedLoginAttempts.delete(email);
    }
  }
}, 60 * 1000); // Every minute

module.exports = {
  generateCSRFToken,
  csrfProtection,
  xssProtection,
  sqlInjectionProtection,
  securityHeaders,
  requestId,
  logSuspiciousActivity,
  getSuspiciousActivityLog: () => suspiciousActivityLog,
  // New security features
  checkAccountLockout,
  recordFailedLogin,
  clearFailedLogins,
  validateRequestTimestamp,
  validateContentType,
  sanitizeFileName,
};
