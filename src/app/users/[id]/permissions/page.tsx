'use client';

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { ProtectedRoute } from '@/components/auth/ProtectedRoute';
import { PermissionGate } from '@/components/auth/PermissionGate';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { apiService } from '@/lib/api';
import { PERMISSIONS, AuthService } from '@/lib/auth';

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  userType: 'admin' | 'branch_manager' | 'branch_worker' | 'subcontractor';
  branch?: string;
  status: 'active' | 'inactive' | 'suspended';
}

export default function UserPermissionsPage() {
  const router = useRouter();
  const params = useParams();
  const userId = params.id as string;
  const authService = AuthService.getInstance();
  const currentUser = authService.getCurrentUser();
  
  const [user, setUser] = useState<User | null>(null);
  const [userPermissions, setUserPermissions] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [editing, setEditing] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Available permissions
  const availablePermissions = [
    { key: PERMISSIONS.CUSTOMERS_READ, label: 'Read Customers', category: 'Customers' },
    { key: PERMISSIONS.CUSTOMERS_WRITE, label: 'Write Customers', category: 'Customers' },
    { key: PERMISSIONS.CUSTOMERS_DELETE, label: 'Delete Customers', category: 'Customers' },
    { key: PERMISSIONS.PROJECTS_READ, label: 'Read Projects', category: 'Projects' },
    { key: PERMISSIONS.PROJECTS_WRITE, label: 'Write Projects', category: 'Projects' },
    { key: PERMISSIONS.PROJECTS_DELETE, label: 'Delete Projects', category: 'Projects' },
    { key: PERMISSIONS.USERS_READ, label: 'Read Users', category: 'Users' },
    { key: PERMISSIONS.USERS_WRITE, label: 'Write Users', category: 'Users' },
    { key: PERMISSIONS.USERS_DELETE, label: 'Delete Users', category: 'Users' },
    { key: PERMISSIONS.ANALYTICS_READ, label: 'Read Analytics', category: 'Analytics' },
    { key: PERMISSIONS.ANALYTICS_WRITE, label: 'Write Analytics', category: 'Analytics' },
    { key: PERMISSIONS.SETTINGS_READ, label: 'Read Settings', category: 'Settings' },
    { key: PERMISSIONS.SETTINGS_WRITE, label: 'Write Settings', category: 'Settings' },
    { key: PERMISSIONS.PERMISSIONS_READ, label: 'Read Permissions', category: 'Permissions' },
    { key: PERMISSIONS.PERMISSIONS_WRITE, label: 'Write Permissions', category: 'Permissions' },
    { key: PERMISSIONS.PERMISSIONS_MANAGE_OWN_BRANCH, label: 'Manage Own Branch', category: 'Permissions' }
  ];

  useEffect(() => {
    loadUser();
  }, [userId]);

  const loadUser = async () => {
    try {
      setLoading(true);
      const response = await apiService.getUser(userId);
      const userData = response.data;
      setUser(userData);
      
      // Initialize permissions based on user type
      const defaultPermissions = getDefaultPermissions(userData.userType);
      setUserPermissions(defaultPermissions);
    } catch (error) {
      console.error('Error loading user:', error);
      setErrors({ load: 'Failed to load user data' });
    } finally {
      setLoading(false);
    }
  };

  const getDefaultPermissions = (userType: string): string[] => {
    const rolePermissions = {
      admin: [
        PERMISSIONS.CUSTOMERS_READ, PERMISSIONS.CUSTOMERS_WRITE, PERMISSIONS.CUSTOMERS_DELETE,
        PERMISSIONS.PROJECTS_READ, PERMISSIONS.PROJECTS_WRITE, PERMISSIONS.PROJECTS_DELETE,
        PERMISSIONS.USERS_READ, PERMISSIONS.USERS_WRITE, PERMISSIONS.USERS_DELETE,
        PERMISSIONS.ANALYTICS_READ, PERMISSIONS.ANALYTICS_WRITE,
        PERMISSIONS.SETTINGS_READ, PERMISSIONS.SETTINGS_WRITE,
        PERMISSIONS.PERMISSIONS_READ, PERMISSIONS.PERMISSIONS_WRITE,
        PERMISSIONS.ADMIN_ALL
      ],
      branch_manager: [
        PERMISSIONS.CUSTOMERS_READ, PERMISSIONS.CUSTOMERS_WRITE,
        PERMISSIONS.PROJECTS_READ, PERMISSIONS.PROJECTS_WRITE,
        PERMISSIONS.USERS_READ, PERMISSIONS.USERS_WRITE,
        PERMISSIONS.ANALYTICS_READ,
        PERMISSIONS.PERMISSIONS_READ, PERMISSIONS.PERMISSIONS_MANAGE_OWN_BRANCH
      ],
      branch_worker: [
        PERMISSIONS.CUSTOMERS_READ, PERMISSIONS.CUSTOMERS_WRITE,
        PERMISSIONS.PROJECTS_READ, PERMISSIONS.PROJECTS_WRITE
      ],
      subcontractor: [
        PERMISSIONS.PROJECTS_READ
      ]
    };
    
    return rolePermissions[userType as keyof typeof rolePermissions] || [];
  };

  const canEditUser = (): boolean => {
    if (!currentUser || !user) return false;
    
    // Admin can edit anyone
    if (currentUser.userType === 'admin') return true;
    
    // Branch manager can only edit users from their branch (not admins)
    if (currentUser.userType === 'branch_manager') {
      return user.branch === currentUser.branch && user.userType !== 'admin';
    }
    
    return false;
  };

  const canGrantPermission = (permission: string): boolean => {
    if (!currentUser) return false;
    
    // Admin can grant any permission
    if (currentUser.userType === 'admin') return true;
    
    // Branch manager cannot grant admin-level permissions
    if (currentUser.userType === 'branch_manager') {
      const adminPermissions = [
        PERMISSIONS.USERS_DELETE,
        PERMISSIONS.CUSTOMERS_DELETE,
        PERMISSIONS.PROJECTS_DELETE,
        PERMISSIONS.SETTINGS_WRITE,
        PERMISSIONS.PERMISSIONS_WRITE,
        PERMISSIONS.ADMIN_ALL
      ];
      return !adminPermissions.includes(permission);
    }
    
    return false;
  };

  const togglePermission = (permission: string) => {
    if (!canEditUser() || !canGrantPermission(permission)) return;
    
    setUserPermissions(prev => {
      const newPermissions = prev.includes(permission)
        ? prev.filter(p => p !== permission)
        : [...prev, permission];
      
      return newPermissions;
    });
  };

  const saveUserPermissions = async () => {
    try {
      setSaving(true);
      // In a real app, this would call an API to save permissions
      console.log(`Saving permissions for user ${userId}:`, userPermissions);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setEditing(false);
    } catch (error) {
      console.error('Error saving permissions:', error);
      setErrors({ save: 'Failed to save permissions' });
    } finally {
      setSaving(false);
    }
  };

  const getPermissionCategory = (permission: string) => {
    const perm = availablePermissions.find(p => p.key === permission);
    return perm?.category || 'Other';
  };

  if (loading) {
    return (
      <ProtectedRoute permissions={[PERMISSIONS.PERMISSIONS_READ]}>
        <DashboardLayout>
          <div className="flex items-center justify-center h-64">
            <div className="text-lg">Loading user data...</div>
          </div>
        </DashboardLayout>
      </ProtectedRoute>
    );
  }

  if (errors.load || !user) {
    return (
      <ProtectedRoute permissions={[PERMISSIONS.PERMISSIONS_READ]}>
        <DashboardLayout>
          <div className="flex items-center justify-center h-64">
            <div className="text-red-600">{errors.load || 'User not found'}</div>
          </div>
        </DashboardLayout>
      </ProtectedRoute>
    );
  }

  return (
    <ProtectedRoute permissions={[PERMISSIONS.PERMISSIONS_READ]}>
      <DashboardLayout>
        <div className="space-y-6">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">User Permissions</h1>
              <p className="mt-2 text-sm text-gray-600">
                Manage permissions for {user.name}
              </p>
            </div>
            <div className="mt-4 sm:mt-0 flex space-x-2">
              <Button variant="secondary" onClick={() => router.push('/users')}>
                ← Back to Users
              </Button>
              {canEditUser() && (
                <Button
                  variant={editing ? "destructive" : "default"}
                  onClick={() => setEditing(!editing)}
                  disabled={saving}
                >
                  {editing ? 'Cancel' : 'Edit Permissions'}
                </Button>
              )}
              {editing && (
                <Button
                  variant="default"
                  onClick={saveUserPermissions}
                  disabled={saving}
                >
                  {saving ? 'Saving...' : 'Save Permissions'}
                </Button>
              )}
            </div>
          </div>

          {/* User Info */}
          <Card>
            <CardHeader>
              <CardTitle>User Information</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm font-medium text-gray-500">Name</p>
                  <p className="text-lg">{user.name}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">Email</p>
                  <p className="text-lg">{user.email}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">Role</p>
                  <p className="text-lg">{user.role}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">User Type</p>
                  <p className="text-lg">{user.userType.replace('_', ' ').charAt(0).toUpperCase() + user.userType.replace('_', ' ').slice(1)}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">Branch</p>
                  <p className="text-lg">{user.branch || 'N/A'}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">Status</p>
                  <Badge className={
                    user.status === 'active' ? 'bg-green-100 text-green-800' :
                    user.status === 'inactive' ? 'bg-gray-100 text-gray-800' :
                    'bg-red-100 text-red-800'
                  }>
                    {user.status.charAt(0).toUpperCase() + user.status.slice(1)}
                  </Badge>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Permissions */}
          <Card>
            <CardHeader>
              <CardTitle>Permissions</CardTitle>
              <CardDescription>
                {editing ? 'Select the permissions to grant to this user' : 'Current permissions for this user'}
              </CardDescription>
            </CardHeader>
            <CardContent>
              {editing ? (
                <div className="space-y-6">
                  {Object.entries(
                    availablePermissions.reduce((acc, perm) => {
                      const category = perm.category;
                      if (!acc[category]) acc[category] = [];
                      acc[category].push(perm);
                      return acc;
                    }, {} as Record<string, typeof availablePermissions>)
                  ).map(([category, permissions]) => (
                    <div key={category} className="space-y-3">
                      <h4 className="font-medium text-lg text-gray-700">{category}</h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                        {permissions.map(permission => (
                          <label key={permission.key} className="flex items-center space-x-2 p-3 border rounded-lg hover:bg-gray-50">
                            <input
                              type="checkbox"
                              checked={userPermissions.includes(permission.key)}
                              onChange={() => togglePermission(permission.key)}
                              disabled={!canGrantPermission(permission.key)}
                              className="rounded border-gray-300 text-primary focus:ring-primary"
                            />
                            <span className="text-sm text-gray-700">{permission.label}</span>
                          </label>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="space-y-4">
                  {Object.entries(
                    userPermissions.reduce((acc, permission) => {
                      const category = getPermissionCategory(permission);
                      if (!acc[category]) acc[category] = [];
                      acc[category].push(permission);
                      return acc;
                    }, {} as Record<string, string[]>)
                  ).map(([category, permissions]) => (
                    <div key={category} className="space-y-2">
                      <h4 className="font-medium text-sm text-gray-700">{category}</h4>
                      <div className="flex flex-wrap gap-1">
                        {permissions.map(permission => {
                          const perm = availablePermissions.find(p => p.key === permission);
                          return (
                            <Badge key={permission} variant="secondary" className="text-xs">
                              {perm?.label || permission}
                            </Badge>
                          );
                        })}
                      </div>
                    </div>
                  ))}
                  
                  {userPermissions.length === 0 && (
                    <p className="text-sm text-gray-500">No permissions assigned</p>
                  )}
                </div>
              )}

              {/* Save Error */}
              {errors.save && (
                <div className="mt-4 bg-red-50 border border-red-200 rounded-md p-4">
                  <p className="text-red-600 text-sm">{errors.save}</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </DashboardLayout>
    </ProtectedRoute>
  );
} 