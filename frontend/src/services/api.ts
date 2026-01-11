import axios, { AxiosError, InternalAxiosRequestConfig } from "axios";
import { Car, Inquiry, Testimonial, Service, ApiResponse } from "@/types";

// Dynamic import for offlineQueue to avoid SSR issues
const getOfflineQueue = async () => {
  if (typeof window === 'undefined') return null;
  const { offlineQueue } = await import("@/lib/offlineQueue");
  return offlineQueue;
};

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5001/api";

/**
 * Sanitize string input to prevent XSS
 */
const sanitizeString = (str: string): string => {
  return str
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;');
};

/**
 * Recursively sanitize object values
 */
const sanitizeData = <T>(data: T): T => {
  if (typeof data === 'string') {
    return sanitizeString(data) as T;
  }
  if (Array.isArray(data)) {
    return data.map(sanitizeData) as T;
  }
  if (data && typeof data === 'object') {
    const sanitized: Record<string, unknown> = {};
    for (const [key, value] of Object.entries(data)) {
      sanitized[key] = sanitizeData(value);
    }
    return sanitized as T;
  }
  return data;
};

/**
 * Generate a unique request ID for tracking
 */
const generateRequestId = (): string => {
  return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
};

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 15000,
  headers: { 
    "Content-Type": "application/json",
  },
  withCredentials: true, // For cookie-based refresh tokens
  // Security: Don't send cookies to different origins
  xsrfCookieName: 'XSRF-TOKEN',
  xsrfHeaderName: 'X-XSRF-TOKEN',
});

// Request interceptor - add security headers and sanitize data
api.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    // Add request ID for tracking
    config.headers['X-Request-ID'] = generateRequestId();
    
    // Add timestamp to prevent replay attacks
    config.headers['X-Request-Timestamp'] = Date.now().toString();
    
    // Sanitize request data for POST/PUT/PATCH
    if (config.data && ['post', 'put', 'patch'].includes(config.method?.toLowerCase() || '')) {
      config.data = sanitizeData(config.data);
    }
    
    // Sanitize query params
    if (config.params) {
      config.params = sanitizeData(config.params);
    }
    
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor with retry logic and error handling
api.interceptors.response.use(
  (response) => {
    // Validate response structure
    if (response.data && typeof response.data === 'object') {
      return response;
    }
    return response;
  },
  async (error: AxiosError) => {
    const originalRequest = error.config as InternalAxiosRequestConfig & { _retry?: boolean; _offlineQueued?: boolean };
    
    // Handle network errors - queue for offline sync
    if (!error.response) {
      console.error('[API] Network error:', error.message);
      
      // Queue POST/PUT/PATCH requests for later sync
      if (
        typeof window !== 'undefined' &&
        originalRequest &&
        ['post', 'put', 'patch'].includes(originalRequest.method?.toLowerCase() || '') &&
        !originalRequest._offlineQueued
      ) {
        try {
          const offlineQueue = await getOfflineQueue();
          if (offlineQueue) {
            const data = originalRequest.data ? JSON.parse(originalRequest.data) : {};
            const queueId = await offlineQueue.queueRequest(
              originalRequest.url || '',
              originalRequest.method?.toUpperCase() || 'POST',
              data
            );
            console.log('[API] Request queued for offline sync:', queueId);
          
            // Return a mock success response
            return {
              data: {
                success: true,
                queued: true,
                message: 'Your request has been saved and will be submitted when you are back online.',
                queueId,
              },
              status: 202,
              statusText: 'Accepted (Queued)',
              headers: {},
              config: originalRequest,
            };
          }
        } catch (queueError) {
          console.error('[API] Failed to queue request:', queueError);
        }
      }
      
      return Promise.reject(new Error('Network error. Please check your connection.'));
    }
    
    // Handle 401 - try to refresh token once
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      
      try {
        // Attempt token refresh
        await api.post('/auth/refresh');
        return api(originalRequest);
      } catch (refreshError) {
        // Clear auth state on refresh failure
        if (typeof window !== 'undefined') {
          localStorage.removeItem('nissan_access_token');
          localStorage.removeItem('nissan_token_expiry');
          localStorage.removeItem('nissan_user');
        }
        return Promise.reject(error);
      }
    }
    
    // Handle rate limiting
    if (error.response.status === 429) {
      console.warn('[API] Rate limited. Retrying after delay...');
      const retryAfter = parseInt(error.response.headers['retry-after'] || '5', 10);
      await new Promise(resolve => setTimeout(resolve, retryAfter * 1000));
      return api(originalRequest);
    }
    
    // Log security-related errors
    if ([400, 403].includes(error.response.status)) {
      console.warn('[API] Security error:', error.response.status, error.response.data);
    }
    
    return Promise.reject(error);
  }
);

// Cars API
export const carsApi = {
  getAll: (params?: Record<string, string>) => 
    api.get<ApiResponse<Car[]>>("/cars", { params }),
  getBySlug: (slug: string) => 
    api.get<ApiResponse<Car>>(`/cars/${slug}`),
  getFeatured: () => 
    api.get<ApiResponse<{ bestSellers: Car[]; newLaunches: Car[] }>>("/cars/featured"),
  getByCategory: (category: string) => 
    api.get<ApiResponse<Car[]>>(`/cars/category/${category}`),
};

// Inquiries API
export const inquiriesApi = {
  create: (data: Partial<Inquiry>) => 
    api.post<ApiResponse<{ id: string }>>("/inquiries", data),
  bookTestDrive: (data: Partial<Inquiry>) => 
    api.post<ApiResponse<{ id: string }>>("/inquiries/test-drive", data),
  requestQuote: (data: Partial<Inquiry>) => 
    api.post<ApiResponse<{ id: string }>>("/inquiries/price-quote", data),
};

// Contact API
export const contactApi = {
  submit: (data: { name: string; email: string; phone: string; subject: string; message: string }) =>
    api.post<ApiResponse<void>>("/contact", data),
  getInfo: () => 
    api.get<ApiResponse<Record<string, unknown>>>("/contact/info"),
};

// Testimonials API
export const testimonialsApi = {
  getAll: (limit?: number) => 
    api.get<ApiResponse<Testimonial[]>>("/testimonials", { params: { limit } }),
  create: (data: Partial<Testimonial>) => 
    api.post<ApiResponse<{ id: string }>>("/testimonials", data),
};

// Services API
export const servicesApi = {
  getAll: () => 
    api.get<ApiResponse<Service[]>>("/services"),
  getPopular: () => 
    api.get<ApiResponse<Service[]>>("/services/popular"),
};

// Export both named and default
export { api };
export default api;
