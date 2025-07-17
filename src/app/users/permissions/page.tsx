'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { ProtectedRoute } from '@/components/auth/ProtectedRoute';
import { PermissionGate } from '@/components/auth/PermissionGate';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Badge } from '@/components/ui/Badge';
import { Card } from '@/components/ui/Card';
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

interface UserPermissions {
  userId: string;
  permissions: string[];
}

export default function UserPermissionsPage() {
  const router = useRouter();
  const authService = AuthService.getInstance();
  const currentUser = authService.getCurrentUser();
  
  const [users, setUsers] = useState<User[]>([]);
  const [userPermissions, setUserPermissions] = useState<Record<string, string[]>>({});
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [branchFilter, setBranchFilter] = useState('');
  const [editingUser, setEditingUser] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);

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
    loadUsers();
  }, []);

  const loadUsers = async () => {
    try {
      setLoading(true);
      const response = await apiService.getUsers();
      const usersData = response.data;
      
      // Filter users based on current user's permissions
      let filteredUsers = usersData;
      
      // If current user is branch manager, only show users from their branch
      if (currentUser?.userType === 'branch_manager' && currentUser?.branch) {
        filteredUsers = usersData.filter((user: User) => 
          user.branch === currentUser.branch && user.userType !== 'admin'
        );
      }
      
      // If current user is not admin, don't show admin users
      if (currentUser?.userType !== 'admin') {
        filteredUsers = filteredUsers.filter((user: User) => user.userType !== 'admin');
      }
      
      setUsers(filteredUsers);
      
      // Initialize permissions for each user
      const permissionsMap: Record<string, string[]> = {};
      filteredUsers.forEach((user: User) => {
        permissionsMap[user.id] = getDefaultPermissions(user.userType);
      });
      setUserPermissions(permissionsMap);
    } catch (error) {
      console.error('Error loading users:', error);
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

  const canEditUser = (user: User): boolean => {
    if (!currentUser) return false;
    
    // Admin can edit anyone
    if (currentUser.userType === 'admin') return true;
    
    // Branch manager can only edit users from their branch (not admins)
    if (currentUser.userType === 'branch_manager') {
      return user.branch === currentUser.branch && user.userType !== 'admin';
    }
    
    return false;
  };

  const togglePermission = (userId: string, permission: string) => {
    if (!canEditUser(users.find(u => u.id === userId)!)) return;
    
    setUserPermissions(prev => {
      const currentPermissions = prev[userId] || [];
      const newPermissions = currentPermissions.includes(permission)
        ? currentPermissions.filter(p => p !== permission)
        : [...currentPermissions, permission];
      
      return {
        ...prev,
        [userId]: newPermissions
      };
    });
  };

  const saveUserPermissions = async (userId: string) => {
    try {
      setSaving(true);
      // In a real app, this would call an API to save permissions
      console.log(`Saving permissions for user ${userId}:`, userPermissions[userId]);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setEditingUser(null);
    } catch (error) {
      console.error('Error saving permissions:', error);
    } finally {
      setSaving(false);
    }
  };

  const getPermissionCategory = (permission: string) => {
    const perm = availablePermissions.find(p => p.key === permission);
    return perm?.category || 'Other';
  };

  const filteredUsers = users.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         user.role.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesBranch = !branchFilter || user.branch === branchFilter;
    
    return matchesSearch && matchesBranch;
  });

  const branches = Array.from(new Set(users.map(u => u.branch).filter(Boolean)));

  return (
    <ProtectedRoute permissions={[PERMISSIONS.PERMISSIONS_READ]}>
      <DashboardLayout>
        <div className="space-y-6">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">User Permissions</h1>
              <p className="mt-2 text-sm text-gray-600">
                Manage user permissions and access rights
              </p>
            </div>
            <div className="mt-4 sm:mt-0">
              <Button variant="secondary" onClick={() => router.push('/users')}>
                ← Back to Users
              </Button>
            </div>
          </div>

          {/* Filters */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Search Users
                </label>
                <Input
                  type="text"
                  placeholder="Name, email, role..."
                  value={searchQuery}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchQuery(e.target.value)}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Branch
                </label>
                <select
                  value={branchFilter}
                  onChange={(e) => setBranchFilter(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary"
                >
                  <option value="">All branches</option>
                  {branches.map(branch => (
                    <option key={branch} value={branch}>{branch}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Users and Permissions */}
          {loading ? (
            <div className="flex items-center justify-center h-32">
              <div className="text-lg">Loading users...</div>
            </div>
          ) : (
            <div className="space-y-6">
              {filteredUsers.map(user => (
                <Card key={user.id} className="border border-gray-200">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-lg font-bold">{user.name}</h3>
                      <p className="text-sm text-gray-600">
                        {user.email} • {user.role} • {user.branch || 'No branch'}
                      </p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Badge className={
                        user.status === 'active' ? 'bg-green-100 text-green-800' :
                        user.status === 'inactive' ? 'bg-gray-100 text-gray-800' :
                        'bg-red-100 text-red-800'
                      }>
                        {user.status}
                      </Badge>
                      {canEditUser(user) && (
                        <Button
                          variant={editingUser === user.id ? "destructive" : "secondary"}
                          size="sm"
                          onClick={() => setEditingUser(editingUser === user.id ? null : user.id)}
                          disabled={saving}
                        >
                          {editingUser === user.id ? 'Cancel' : 'Edit Permissions'}
                        </Button>
                      )}
                      {editingUser === user.id && (
                        <>
                          <Button variant="primary" size="sm" onClick={() => saveUserPermissions(user.id)}>
                            Zapisz
                          </Button>
                          <Button variant="secondary" size="sm" onClick={() => setEditingUser(null)}>
                            Anuluj
                          </Button>
                        </>
                      )}
                    </div>
                  </div>
                  <div className="space-y-4">
                    {editingUser === user.id ? (
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {Object.entries(
                          availablePermissions.reduce((acc, perm) => {
                            const category = perm.category;
                            if (!acc[category]) acc[category] = [];
                            acc[category].push(perm);
                            return acc;
                          }, {} as Record<string, typeof availablePermissions>)
                        ).map(([category, permissions]) => (
                          <div key={category} className="space-y-2">
                            <h4 className="font-medium text-sm text-gray-700">{category}</h4>
                            <div className="space-y-2">
                              {permissions.map(permission => (
                                <label key={permission.key} className="flex items-center space-x-2">
                                  <input
                                    type="checkbox"
                                    checked={userPermissions[user.id]?.includes(permission.key) || false}
                                    onChange={() => togglePermission(user.id, permission.key)}
                                    className="rounded border-gray-300 text-primary focus:ring-primary"
                                  />
                                  <span className="text-sm text-gray-600">{permission.label}</span>
                                </label>
                              ))}
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="space-y-2">
                        <div className="flex flex-wrap gap-1">
                          {userPermissions[user.id]?.map(permission => {
                            const perm = availablePermissions.find(p => p.key === permission);
                            return (
                              <Badge key={permission} variant="secondary" className="text-xs">
                                {perm?.label || permission}
                              </Badge>
                            );
                          })}
                        </div>
                        {!userPermissions[user.id]?.length && (
                          <p className="text-sm text-gray-500">No permissions assigned</p>
                        )}
                      </div>
                    )}
                  </div>
                </Card>
              ))}
              
              {filteredUsers.length === 0 && (
                <div className="text-center py-8">
                  <p className="text-gray-500">No users found matching your criteria</p>
                </div>
              )}
            </div>
          )}
        </div>
      </DashboardLayout>
    </ProtectedRoute>
  );
} 