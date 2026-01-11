/**
 * Authentication Service
 * 
 * Handles user authentication, registration, and session management
 * Implements secure password hashing, JWT tokens, and session tracking
 * 
 * @author Nissan Jammu Development Team
 * @version 1.0.0
 */

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const db = require('../database');

// Configuration
const JWT_SECRET = process.env.JWT_SECRET || 'your-super-secret-jwt-key-change-in-production';
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || '15m';
const REFRESH_TOKEN_EXPIRES_IN = process.env.REFRESH_TOKEN_EXPIRES_IN || '7d';
const BCRYPT_ROUNDS = 12;

class AuthService {
  /**
   * Register a new user
   * @param {object} userData - User registration data
   * @returns {object} Created user and tokens
   */
  async register({ name, email, phone, password }) {
    // Validate input
    if (!name || !email || !password) {
      throw new Error('Name, email and password are required');
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      throw new Error('Invalid email format');
    }

    // Validate password strength (OWASP recommendations)
    if (password.length < 8) {
      throw new Error('Password must be at least 8 characters long');
    }
    if (password.length > 128) {
      throw new Error('Password must not exceed 128 characters');
    }
    if (!/[a-z]/.test(password)) {
      throw new Error('Password must contain at least one lowercase letter');
    }
    if (!/[A-Z]/.test(password)) {
      throw new Error('Password must contain at least one uppercase letter');
    }
    if (!/[0-9]/.test(password)) {
      throw new Error('Password must contain at least one number');
    }
    // Check for common passwords (basic list - extend as needed)
    const commonPasswords = ['password', '12345678', 'qwerty123', 'admin123', 'letmein'];
    if (commonPasswords.includes(password.toLowerCase())) {
      throw new Error('Password is too common. Please choose a stronger password');
    }

    // Check if user already exists
    const existingUser = await db.findOne('users', { email: email.toLowerCase() });
    if (existingUser) {
      throw new Error('Email already registered');
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, BCRYPT_ROUNDS);

    // Create user
    const user = await db.create('users', {
      name: name.trim(),
      email: email.toLowerCase().trim(),
      phone: phone?.trim() || null,
      password: hashedPassword,
      role: 'user',
      isVerified: false,
      isActive: true,
    });

    // Generate tokens
    const tokens = await this.generateTokens(user);

    // Remove password from response
    const { password: _, ...userWithoutPassword } = user;

    return {
      user: userWithoutPassword,
      ...tokens,
    };
  }

  /**
   * Login user
   * @param {string} email - User email
   * @param {string} password - User password
   * @param {object} metadata - Session metadata (userAgent, ipAddress)
   * @returns {object} User and tokens
   */
  async login(email, password, metadata = {}) {
    // Validate input
    if (!email || !password) {
      throw new Error('Email and password are required');
    }

    // Find user
    const user = await db.findOne('users', { email: email.toLowerCase() });
    if (!user) {
      throw new Error('Invalid email or password');
    }

    // Check if user is active
    if (!user.isActive) {
      throw new Error('Account has been deactivated');
    }

    // Verify password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new Error('Invalid email or password');
    }

    // Generate tokens
    const tokens = await this.generateTokens(user);

    // Create session
    await this.createSession(user.id, tokens.refreshToken, metadata);

    // Update last login
    await db.updateById('users', user.id, { lastLogin: new Date().toISOString() });

    // Remove password from response
    const { password: _, ...userWithoutPassword } = user;

    return {
      user: userWithoutPassword,
      ...tokens,
    };
  }

  /**
   * Logout user - invalidate refresh token
   * @param {string} refreshToken - Refresh token to invalidate
   */
  async logout(refreshToken) {
    if (!refreshToken) return;

    // Delete session
    await db.delete('sessions', { token: refreshToken });
  }

  /**
   * Refresh access token
   * @param {string} refreshToken - Valid refresh token
   * @returns {object} New tokens
   */
  async refreshTokens(refreshToken) {
    if (!refreshToken) {
      throw new Error('Refresh token is required');
    }

    // Verify refresh token
    let decoded;
    try {
      decoded = jwt.verify(refreshToken, JWT_SECRET);
    } catch (error) {
      throw new Error('Invalid refresh token');
    }

    // Check if session exists
    const session = await db.findOne('sessions', { 
      token: refreshToken,
      userId: decoded.userId,
    });

    if (!session) {
      throw new Error('Session not found or expired');
    }

    // Check if session is expired
    if (new Date(session.expiresAt) < new Date()) {
      await db.deleteById('sessions', session.id);
      throw new Error('Session expired');
    }

    // Get user
    const user = await db.findById('users', decoded.userId);
    if (!user || !user.isActive) {
      throw new Error('User not found or inactive');
    }

    // Generate new tokens
    const tokens = await this.generateTokens(user);

    // Update session with new token
    await db.updateById('sessions', session.id, {
      token: tokens.refreshToken,
      expiresAt: new Date(Date.now() + this.parseDuration(REFRESH_TOKEN_EXPIRES_IN)).toISOString(),
    });

    return tokens;
  }

  /**
   * Generate access and refresh tokens
   * @param {object} user - User object
   * @returns {object} Access and refresh tokens
   */
  async generateTokens(user) {
    const payload = {
      userId: user.id,
      email: user.email,
      role: user.role,
    };

    const accessToken = jwt.sign(payload, JWT_SECRET, {
      expiresIn: JWT_EXPIRES_IN,
    });

    const refreshToken = jwt.sign({ userId: user.id }, JWT_SECRET, {
      expiresIn: REFRESH_TOKEN_EXPIRES_IN,
    });

    return {
      accessToken,
      refreshToken,
      expiresIn: this.parseDuration(JWT_EXPIRES_IN),
    };
  }

  /**
   * Create session record
   * @param {string} userId - User ID
   * @param {string} token - Refresh token
   * @param {object} metadata - Session metadata
   */
  async createSession(userId, token, metadata = {}) {
    const expiresAt = new Date(Date.now() + this.parseDuration(REFRESH_TOKEN_EXPIRES_IN));

    await db.create('sessions', {
      userId,
      token,
      userAgent: metadata.userAgent || null,
      ipAddress: metadata.ipAddress || null,
      expiresAt: expiresAt.toISOString(),
    });
  }

  /**
   * Verify access token
   * @param {string} token - Access token
   * @returns {object} Decoded token payload
   */
  verifyAccessToken(token) {
    try {
      return jwt.verify(token, JWT_SECRET);
    } catch (error) {
      throw new Error('Invalid or expired token');
    }
  }

  /**
   * Get user by ID
   * @param {string} userId - User ID
   * @returns {object} User without password
   */
  async getUserById(userId) {
    const user = await db.findById('users', userId);
    if (!user) return null;

    const { password, ...userWithoutPassword } = user;
    return userWithoutPassword;
  }

  /**
   * Update user profile
   * @param {string} userId - User ID
   * @param {object} updates - Fields to update
   * @returns {object} Updated user
   */
  async updateProfile(userId, updates) {
    // Only allow specific fields to be updated
    const allowedFields = ['name', 'phone', 'avatar'];
    const sanitizedUpdates = {};

    for (const field of allowedFields) {
      if (updates[field] !== undefined) {
        sanitizedUpdates[field] = updates[field];
      }
    }

    await db.updateById('users', userId, sanitizedUpdates);
    return this.getUserById(userId);
  }

  /**
   * Change password
   * @param {string} userId - User ID
   * @param {string} currentPassword - Current password
   * @param {string} newPassword - New password
   */
  async changePassword(userId, currentPassword, newPassword) {
    const user = await db.findById('users', userId);
    if (!user) {
      throw new Error('User not found');
    }

    // Verify current password
    const isValid = await bcrypt.compare(currentPassword, user.password);
    if (!isValid) {
      throw new Error('Current password is incorrect');
    }

    // Validate new password
    if (newPassword.length < 8) {
      throw new Error('New password must be at least 8 characters long');
    }

    // Hash and update password
    const hashedPassword = await bcrypt.hash(newPassword, BCRYPT_ROUNDS);
    await db.updateById('users', userId, { password: hashedPassword });

    // Invalidate all sessions except current
    await db.delete('sessions', { userId });
  }

  /**
   * Request password reset
   * @param {string} email - User email
   * @returns {string} Reset token (in production, send via email)
   */
  async requestPasswordReset(email) {
    const user = await db.findOne('users', { email: email.toLowerCase() });
    if (!user) {
      // Don't reveal if email exists
      return { message: 'If the email exists, a reset link will be sent' };
    }

    // Generate reset token
    const resetToken = crypto.randomBytes(32).toString('hex');
    const hashedToken = crypto.createHash('sha256').update(resetToken).digest('hex');
    const expires = new Date(Date.now() + 3600000).toISOString(); // 1 hour

    await db.updateById('users', user.id, {
      resetPasswordToken: hashedToken,
      resetPasswordExpires: expires,
    });

    // In production, send email with reset link
    // For now, return token (remove in production!)
    return { 
      message: 'Password reset instructions sent',
      resetToken, // Remove in production!
    };
  }

  /**
   * Reset password with token
   * @param {string} token - Reset token
   * @param {string} newPassword - New password
   */
  async resetPassword(token, newPassword) {
    const hashedToken = crypto.createHash('sha256').update(token).digest('hex');

    const user = await db.findOne('users', {
      resetPasswordToken: hashedToken,
    });

    if (!user) {
      throw new Error('Invalid or expired reset token');
    }

    if (new Date(user.resetPasswordExpires) < new Date()) {
      throw new Error('Reset token has expired');
    }

    // Validate new password
    if (newPassword.length < 8) {
      throw new Error('Password must be at least 8 characters long');
    }

    // Hash and update password
    const hashedPassword = await bcrypt.hash(newPassword, BCRYPT_ROUNDS);
    await db.updateById('users', user.id, {
      password: hashedPassword,
      resetPasswordToken: null,
      resetPasswordExpires: null,
    });

    // Invalidate all sessions
    await db.delete('sessions', { userId: user.id });

    return { message: 'Password reset successful' };
  }

  /**
   * Parse duration string to milliseconds
   * @param {string} duration - Duration string (e.g., '15m', '7d')
   * @returns {number} Duration in milliseconds
   */
  parseDuration(duration) {
    const match = duration.match(/^(\d+)([smhd])$/);
    if (!match) return 900000; // Default 15 minutes

    const value = parseInt(match[1]);
    const unit = match[2];

    switch (unit) {
      case 's': return value * 1000;
      case 'm': return value * 60 * 1000;
      case 'h': return value * 60 * 60 * 1000;
      case 'd': return value * 24 * 60 * 60 * 1000;
      default: return 900000;
    }
  }

  /**
   * Clean up expired sessions
   */
  async cleanupExpiredSessions() {
    const now = new Date().toISOString();
    await db.delete('sessions', { expiresAt: { $lt: now } });
  }
}

module.exports = new AuthService();
