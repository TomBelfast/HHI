import { useAuth } from '@/contexts/AuthContext';
import { authService, PERMISSIONS } from '@/lib/auth';

export function usePermissions() {
  const { user } = useAuth();

  const hasPermission = (permission: string): boolean => {
    if (!user) return false;
    return authService.hasPermission(permission);
  };

  const hasAnyPermission = (permissions: string[]): boolean => {
    if (!user) return false;
    return authService.hasAnyPermission(permissions);
  };

  const hasAllPermissions = (permissions: string[]): boolean => {
    if (!user) return false;
    return authService.hasAllPermissions(permissions);
  };

  const isAdmin = (): boolean => {
    return hasPermission(PERMISSIONS.ADMIN_ALL);
  };

  const isBranchManager = (): boolean => {
    return user?.userType === 'branch_manager';
  };

  const isBranchWorker = (): boolean => {
    return user?.userType === 'branch_worker';
  };

  const isSubcontractor = (): boolean => {
    return user?.userType === 'subcontractor';
  };

  const canManageUsers = (): boolean => {
    return hasAnyPermission([PERMISSIONS.USERS_READ, PERMISSIONS.USERS_WRITE, PERMISSIONS.USERS_DELETE]);
  };

  const canManageCustomers = (): boolean => {
    return hasAnyPermission([PERMISSIONS.CUSTOMERS_READ, PERMISSIONS.CUSTOMERS_WRITE, PERMISSIONS.CUSTOMERS_DELETE]);
  };

  const canManageProjects = (): boolean => {
    return hasAnyPermission([PERMISSIONS.PROJECTS_READ, PERMISSIONS.PROJECTS_WRITE, PERMISSIONS.PROJECTS_DELETE]);
  };

  const canViewAnalytics = (): boolean => {
    return hasPermission(PERMISSIONS.ANALYTICS_READ);
  };

  const canManageSettings = (): boolean => {
    return hasAnyPermission([PERMISSIONS.SETTINGS_READ, PERMISSIONS.SETTINGS_WRITE]);
  };

  return {
    hasPermission,
    hasAnyPermission,
    hasAllPermissions,
    isAdmin,
    isBranchManager,
    isBranchWorker,
    isSubcontractor,
    canManageUsers,
    canManageCustomers,
    canManageProjects,
    canViewAnalytics,
    canManageSettings,
    user
  };
} 