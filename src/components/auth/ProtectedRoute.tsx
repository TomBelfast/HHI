'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { usePermissions } from '@/hooks/usePermissions';
import { PERMISSIONS } from '@/lib/auth';

interface ProtectedRouteProps {
  children: React.ReactNode;
  permissions?: string[];
  requireAll?: boolean;
  userType?: 'admin' | 'branch_manager' | 'branch_worker' | 'subcontractor';
  fallback?: React.ReactNode;
}

export function ProtectedRoute({
  children,
  permissions = [],
  requireAll = false,
  userType,
  fallback
}: ProtectedRouteProps) {
  const { isAuthenticated, isLoading } = useAuth();
  const { hasAnyPermission, hasAllPermissions, user } = usePermissions();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push('/login');
    }
  }, [isLoading, isAuthenticated, router]);

  // Show loading state
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  // Redirect to login if not authenticated
  if (!isAuthenticated) {
    return null;
  }

  // Check user type if specified
  if (userType && user?.userType !== userType) {
    if (fallback) {
      return <>{fallback}</>;
    }
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Access Denied</h1>
          <p className="text-gray-600">You don't have permission to access this page.</p>
        </div>
      </div>
    );
  }

  // Check permissions if specified
  if (permissions.length > 0) {
    const hasAccess = requireAll 
      ? hasAllPermissions(permissions)
      : hasAnyPermission(permissions);
    
    if (!hasAccess) {
      if (fallback) {
        return <>{fallback}</>;
      }
      return (
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900 mb-2">Access Denied</h1>
            <p className="text-gray-600">You don't have the required permissions to access this page.</p>
          </div>
        </div>
      );
    }
  }

  return <>{children}</>;
} 