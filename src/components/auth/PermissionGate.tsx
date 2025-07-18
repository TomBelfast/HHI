'use client';

import React from 'react';
import { usePermissions } from '@/hooks/usePermissions';

interface PermissionGateProps {
  children: React.ReactNode;
  permissions?: string[];
  requireAll?: boolean;
  fallback?: React.ReactNode;
  userType?: 'admin' | 'branch_manager' | 'branch_worker' | 'subcontractor';
}

export function PermissionGate({
  children,
  permissions = [],
  requireAll = false,
  fallback = null,
  userType
}: PermissionGateProps) {
  const { hasAnyPermission, hasAllPermissions, user } = usePermissions();

  // Check if user is authenticated
  if (!user) {
    return <>{fallback}</>;
  }

  // Check user type if specified
  if (userType && user.userType !== userType) {
    return <>{fallback}</>;
  }

  // Check permissions if specified
  if (permissions.length > 0) {
    const hasAccess = requireAll 
      ? hasAllPermissions(permissions)
      : hasAnyPermission(permissions);
    
    if (!hasAccess) {
      return <>{fallback}</>;
    }
  }

  return <>{children}</>;
} 