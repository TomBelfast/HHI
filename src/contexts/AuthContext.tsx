'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { authService, LoginCredentials, AuthState } from '@/lib/auth';

interface AuthContextType extends AuthState {
  login: (credentials: LoginCredentials) => Promise<void>;
  logout: () => Promise<void>;
  refreshUser: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<AuthState>({
    user: null,
    isAuthenticated: false,
    isLoading: true,
    error: null
  });

  // Initialize auth state on mount
  useEffect(() => {
    const initializeAuth = () => {
      try {
        const user = authService.getCurrentUser();
        setState({
          user,
          isAuthenticated: !!user,
          isLoading: false,
          error: null
        });
      } catch (_error) {
        setState({
          user: null,
          isAuthenticated: false,
          isLoading: false,
          error: 'Failed to initialize authentication'
        });
      }
    };

    initializeAuth();
  }, []);

  const login = async (credentials: LoginCredentials) => {
    try {
      setState(prev => ({ ...prev, isLoading: true, error: null }));
      
      const user = await authService.login(credentials);
      
      setState({
        user,
        isAuthenticated: true,
        isLoading: false,
        error: null
      });
    } catch (_error) {
      setState(prev => ({
        ...prev,
        isLoading: false,
        error: 'Login failed'
      }));
      throw _error;
    }
  };

  const logout = async () => {
    try {
      setState(prev => ({ ...prev, isLoading: true }));
      
      await authService.logout();
      
      setState({
        user: null,
        isAuthenticated: false,
        isLoading: false,
        error: null
      });
    } catch (_error) {
      setState(prev => ({
        ...prev,
        isLoading: false,
        error: 'Logout failed'
      }));
    }
  };

  const refreshUser = () => {
    const user = authService.getCurrentUser();
    setState(prev => ({
      ...prev,
      user,
      isAuthenticated: !!user
    }));
  };

  const value: AuthContextType = {
    ...state,
    login,
    logout,
    refreshUser
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth(): AuthContextType {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
} 