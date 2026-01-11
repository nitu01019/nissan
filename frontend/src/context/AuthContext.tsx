"use client";

/**
 * Authentication Context
 * 
 * Provides authentication state and methods to all components
 * Uses React Context for global state management
 * 
 * @author Nissan Jammu Development Team
 */

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { auth, User, AuthResponse } from '@/lib/auth';

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<AuthResponse>;
  register: (data: { name: string; email: string; phone?: string; password: string }) => Promise<AuthResponse>;
  logout: () => Promise<void>;
  updateProfile: (data: Partial<User>) => Promise<AuthResponse>;
  refreshUser: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Initialize auth state on mount
  useEffect(() => {
    const initAuth = async () => {
      try {
        if (auth.isAuthenticated()) {
          const storedUser = auth.getUser();
          if (storedUser) {
            setUser(storedUser);
            // Refresh user data in background
            const freshUser = await auth.getProfile();
            if (freshUser) {
              setUser(freshUser);
            }
          }
        }
      } catch (error) {
        console.error('Auth initialization error:', error);
      } finally {
        setIsLoading(false);
      }
    };

    initAuth();
  }, []);

  const login = useCallback(async (email: string, password: string) => {
    const response = await auth.login(email, password);
    if (response.success && response.data) {
      setUser(response.data.user);
    }
    return response;
  }, []);

  const register = useCallback(async (data: { name: string; email: string; phone?: string; password: string }) => {
    const response = await auth.register(data);
    if (response.success && response.data) {
      setUser(response.data.user);
    }
    return response;
  }, []);

  const logout = useCallback(async () => {
    await auth.logout();
    setUser(null);
  }, []);

  const updateProfile = useCallback(async (data: Partial<User>) => {
    const response = await auth.updateProfile(data);
    if (response.success && response.data) {
      setUser(response.data as unknown as User);
    }
    return response;
  }, []);

  const refreshUser = useCallback(async () => {
    const freshUser = await auth.getProfile();
    if (freshUser) {
      setUser(freshUser);
    }
  }, []);

  const value: AuthContextType = {
    user,
    isLoading,
    isAuthenticated: !!user && auth.isAuthenticated(),
    login,
    register,
    logout,
    updateProfile,
    refreshUser,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

// HOC for protecting routes
export function withAuth<P extends object>(
  Component: React.ComponentType<P>,
  redirectTo: string = '/login'
) {
  return function ProtectedComponent(props: P) {
    const { isAuthenticated, isLoading } = useAuth();

    useEffect(() => {
      if (!isLoading && !isAuthenticated) {
        window.location.href = redirectTo;
      }
    }, [isAuthenticated, isLoading]);

    if (isLoading) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-secondary-900">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-500"></div>
        </div>
      );
    }

    if (!isAuthenticated) {
      return null;
    }

    return <Component {...props} />;
  };
}
