/**
 * Authentication Library
 * 
 * Handles authentication state, token management, and API calls
 * Works with the backend JWT authentication system
 * 
 * @author Nissan Jammu Development Team
 */

import { api } from '@/services/api';

// Types
export interface User {
  id: string;
  name: string;
  email: string;
  phone?: string;
  avatar?: string;
  role: 'user' | 'admin' | 'staff';
  isVerified: boolean;
}

export interface AuthTokens {
  accessToken: string;
  expiresIn: number;
}

export interface AuthResponse {
  success: boolean;
  message: string;
  data?: {
    user: User;
    accessToken: string;
    expiresIn: number;
  };
}

// Token storage keys
const ACCESS_TOKEN_KEY = 'nissan_access_token';
const TOKEN_EXPIRY_KEY = 'nissan_token_expiry';
const USER_KEY = 'nissan_user';

/**
 * Auth class for managing authentication
 */
class AuthManager {
  private accessToken: string | null = null;
  private tokenExpiry: number | null = null;
  private refreshPromise: Promise<boolean> | null = null;

  constructor() {
    if (typeof window !== 'undefined') {
      this.loadFromStorage();
    }
  }

  /**
   * Load auth state from localStorage
   */
  private loadFromStorage() {
    try {
      this.accessToken = localStorage.getItem(ACCESS_TOKEN_KEY);
      const expiry = localStorage.getItem(TOKEN_EXPIRY_KEY);
      this.tokenExpiry = expiry ? parseInt(expiry) : null;
    } catch (error) {
      console.error('Error loading auth from storage:', error);
    }
  }

  /**
   * Save auth state to localStorage
   */
  private saveToStorage(accessToken: string, expiresIn: number, user: User) {
    try {
      const expiry = Date.now() + expiresIn;
      localStorage.setItem(ACCESS_TOKEN_KEY, accessToken);
      localStorage.setItem(TOKEN_EXPIRY_KEY, expiry.toString());
      localStorage.setItem(USER_KEY, JSON.stringify(user));
      this.accessToken = accessToken;
      this.tokenExpiry = expiry;
    } catch (error) {
      console.error('Error saving auth to storage:', error);
    }
  }

  /**
   * Clear auth state
   */
  private clearStorage() {
    try {
      localStorage.removeItem(ACCESS_TOKEN_KEY);
      localStorage.removeItem(TOKEN_EXPIRY_KEY);
      localStorage.removeItem(USER_KEY);
      this.accessToken = null;
      this.tokenExpiry = null;
    } catch (error) {
      console.error('Error clearing auth storage:', error);
    }
  }

  /**
   * Check if user is authenticated
   */
  isAuthenticated(): boolean {
    if (!this.accessToken || !this.tokenExpiry) return false;
    // Consider token expired 1 minute before actual expiry
    return Date.now() < this.tokenExpiry - 60000;
  }

  /**
   * Get current access token
   */
  getAccessToken(): string | null {
    if (this.isAuthenticated()) {
      return this.accessToken;
    }
    return null;
  }

  /**
   * Get stored user
   */
  getUser(): User | null {
    try {
      const userStr = localStorage.getItem(USER_KEY);
      return userStr ? JSON.parse(userStr) : null;
    } catch {
      return null;
    }
  }

  /**
   * Register new user
   */
  async register(data: {
    name: string;
    email: string;
    phone?: string;
    password: string;
  }): Promise<AuthResponse> {
    try {
      const response = await api.post('/auth/register', data);
      
      if (response.data.success && response.data.data) {
        const { user, accessToken, expiresIn } = response.data.data;
        this.saveToStorage(accessToken, expiresIn, user);
      }
      
      return response.data;
    } catch (error: any) {
      return {
        success: false,
        message: error.response?.data?.message || 'Registration failed',
      };
    }
  }

  /**
   * Login user
   */
  async login(email: string, password: string): Promise<AuthResponse> {
    try {
      const response = await api.post('/auth/login', { email, password });
      
      if (response.data.success && response.data.data) {
        const { user, accessToken, expiresIn } = response.data.data;
        this.saveToStorage(accessToken, expiresIn, user);
      }
      
      return response.data;
    } catch (error: any) {
      return {
        success: false,
        message: error.response?.data?.message || 'Login failed',
      };
    }
  }

  /**
   * Logout user
   */
  async logout(): Promise<void> {
    try {
      await api.post('/auth/logout', {}, {
        headers: { Authorization: `Bearer ${this.accessToken}` }
      });
    } catch (error) {
      // Ignore errors, just clear local state
    }
    this.clearStorage();
  }

  /**
   * Refresh access token
   */
  async refreshToken(): Promise<boolean> {
    // Prevent multiple simultaneous refresh requests
    if (this.refreshPromise) {
      return this.refreshPromise;
    }

    this.refreshPromise = (async () => {
      try {
        const response = await api.post('/auth/refresh');
        
        if (response.data.success && response.data.data) {
          const { accessToken, expiresIn } = response.data.data;
          const user = this.getUser();
          if (user) {
            this.saveToStorage(accessToken, expiresIn, user);
          }
          return true;
        }
        return false;
      } catch (error) {
        this.clearStorage();
        return false;
      } finally {
        this.refreshPromise = null;
      }
    })();

    return this.refreshPromise;
  }

  /**
   * Get current user profile from server
   */
  async getProfile(): Promise<User | null> {
    try {
      const response = await api.get('/auth/me', {
        headers: { Authorization: `Bearer ${this.accessToken}` }
      });
      
      if (response.data.success && response.data.data) {
        localStorage.setItem(USER_KEY, JSON.stringify(response.data.data));
        return response.data.data;
      }
      return null;
    } catch (error) {
      return null;
    }
  }

  /**
   * Update user profile
   */
  async updateProfile(data: Partial<User>): Promise<AuthResponse> {
    try {
      const response = await api.put('/auth/profile', data, {
        headers: { Authorization: `Bearer ${this.accessToken}` }
      });
      
      if (response.data.success && response.data.data) {
        localStorage.setItem(USER_KEY, JSON.stringify(response.data.data));
      }
      
      return response.data;
    } catch (error: any) {
      return {
        success: false,
        message: error.response?.data?.message || 'Update failed',
      };
    }
  }

  /**
   * Change password
   */
  async changePassword(currentPassword: string, newPassword: string): Promise<AuthResponse> {
    try {
      const response = await api.put('/auth/password', 
        { currentPassword, newPassword },
        { headers: { Authorization: `Bearer ${this.accessToken}` } }
      );
      return response.data;
    } catch (error: any) {
      return {
        success: false,
        message: error.response?.data?.message || 'Password change failed',
      };
    }
  }

  /**
   * Request password reset
   */
  async forgotPassword(email: string): Promise<AuthResponse> {
    try {
      const response = await api.post('/auth/forgot-password', { email });
      return response.data;
    } catch (error: any) {
      return {
        success: false,
        message: error.response?.data?.message || 'Request failed',
      };
    }
  }

  /**
   * Reset password with token
   */
  async resetPassword(token: string, password: string): Promise<AuthResponse> {
    try {
      const response = await api.post('/auth/reset-password', { token, password });
      return response.data;
    } catch (error: any) {
      return {
        success: false,
        message: error.response?.data?.message || 'Password reset failed',
      };
    }
  }
}

// Export singleton instance
export const auth = new AuthManager();

// Export type for use in components
export type { AuthManager };
