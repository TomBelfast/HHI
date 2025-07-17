'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { ProtectedRoute } from '@/components/auth/ProtectedRoute';
import { PermissionGate } from '@/components/auth/PermissionGate';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Badge } from '@/components/ui/Badge';
import { DataTable } from '@/components/ui/DataTable';
import { apiService } from '@/lib/api';
import { PERMISSIONS } from '@/lib/auth';
import { getBranchColor, getUserStatusColor, getRoleColor } from '@/lib/colors';

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  branch?: string;
  phone: string;
  specialization?: string;
  rating?: number;
  projectsCompleted?: number;
  completedJobs?: number;
  averageTime?: string;
  // Additional fields from task #3.3
  status: 'active' | 'inactive' | 'suspended';
  userType: 'admin' | 'branch_manager' | 'branch_worker' | 'subcontractor';
  createdAt: string;
  lastLogin?: string;
  avatar?: string;
  preferences?: {
    theme: 'light' | 'dark' | 'auto';
    notifications: {
      email: boolean;
      sms: boolean;
      push: boolean;
    };
    language: 'en' | 'pl';
  };
  security?: {
    twoFactorEnabled: boolean;
    lastPasswordChange: string;
    failedLoginAttempts: number;
  };
  activity?: {
    lastActivity: string;
    totalLogins: number;
    averageSessionTime: string;
  };
}

export default function UsersPage() {
  const router = useRouter();
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [roleFilter, setRoleFilter] = useState('');
  const [branchFilter, setBranchFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [sortField, setSortField] = useState('');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    try {
      setLoading(true);
      console.log('Starting to load users...');
      
      // Test bezpośredniego dostępu do mockUsers
      const mockUsersDirect = await import('@/lib/mock-data');
      console.log('Direct mockUsers:', mockUsersDirect.mockUsers);
      
      const response = await apiService.getUsers(1, 100); // Pobierz więcej użytkowników
      console.log('API Response:', response);
      console.log('Users data:', response.data);
      setUsers(response.data);
    } catch (error) {
      console.error('Error loading users:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDeactivateUser = async (userId: string) => {
    if (!confirm('Czy na pewno chcesz dezaktywować tego użytkownika?')) {
      return;
    }

    try {
      // Symulacja API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setUsers(prevUsers => 
        prevUsers.map(user => 
          user.id === userId 
            ? { ...user, status: 'inactive' as const }
            : user
        )
      );
      
      alert('Użytkownik został dezaktywowany.');
    } catch (error) {
      console.error('Error deactivating user:', error);
      alert('Błąd podczas dezaktywacji użytkownika.');
    }
  };

  const handleActivateUser = async (userId: string) => {
    if (!confirm('Czy na pewno chcesz aktywować tego użytkownika?')) {
      return;
    }

    try {
      // Symulacja API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setUsers(prevUsers => 
        prevUsers.map(user => 
          user.id === userId 
            ? { ...user, status: 'active' as const }
            : user
        )
      );
      
      alert('Użytkownik został aktywowany.');
    } catch (error) {
      console.error('Error activating user:', error);
      alert('Błąd podczas aktywacji użytkownika.');
    }
  };

  const handleDeleteUser = async (userId: string) => {
    if (!confirm('Czy na pewno chcesz usunąć tego użytkownika? Ta operacja jest nieodwracalna.')) {
      return;
    }

    try {
      // Symulacja API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setUsers(prevUsers => prevUsers.filter(user => user.id !== userId));
      
      alert('Użytkownik został usunięty.');
    } catch (error) {
      console.error('Error deleting user:', error);
      alert('Błąd podczas usuwania użytkownika.');
    }
  };

  const getRoleIcon = (role: string) => {
    switch (role) {
      case 'System Administrator':
        return '👑';
      case 'Branch Manager':
        return '👔';
      case 'Branch Worker':
        return '👷';
      case 'Subcontractor':
        return '🔧';
      default:
        return '👤';
    }
  };

  const filteredUsers = users.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         user.role.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesRole = !roleFilter || user.role === roleFilter;
    const matchesBranch = !branchFilter || user.branch === branchFilter;
    const matchesStatus = !statusFilter || user.status === statusFilter;
    
    return matchesSearch && matchesRole && matchesBranch && matchesStatus;
  });

  console.log('Users state:', users);
  console.log('Filtered users:', filteredUsers);
  console.log('Search query:', searchQuery);
  console.log('Role filter:', roleFilter);
  console.log('Branch filter:', branchFilter);

  const sortedUsers = [...filteredUsers].sort((a, b) => {
    if (!sortField) return 0;
    
    const aValue = a[sortField as keyof User];
    const bValue = b[sortField as keyof User];
    
    if (typeof aValue === 'string' && typeof bValue === 'string') {
      return sortDirection === 'asc' 
        ? aValue.localeCompare(bValue)
        : bValue.localeCompare(aValue);
    }
    
    if (typeof aValue === 'number' && typeof bValue === 'number') {
      return sortDirection === 'asc' ? aValue - bValue : bValue - aValue;
    }
    
    return 0;
  });

  console.log('Sorted users:', sortedUsers);

  const roles = Array.from(new Set(users.map(u => u.role)));
  const branches = Array.from(new Set(users.map(u => u.branch).filter(Boolean)));
  const statuses = Array.from(new Set(users.map(u => u.status)));

  const columns = [
    { key: 'name', label: 'Name' },
    { key: 'email', label: 'Email' },
    { key: 'role', label: 'Role' },
    { key: 'userType', label: 'User Type' },
    { key: 'status', label: 'Status' },
    { key: 'branch', label: 'Branch' },
    { key: 'phone', label: 'Phone' },
    { key: 'specialization', label: 'Specialization' },
    { key: 'rating', label: 'Rating' },
    { key: 'projectsCompleted', label: 'Projects' },
    { key: 'lastLogin', label: 'Last Login' },
    { key: 'actions', label: 'Actions' }
  ];

  const enhancedData = sortedUsers.map(user => ({
    ...user,
    userType: user.userType ? user.userType.replace('_', ' ').charAt(0).toUpperCase() + user.userType.replace('_', ' ').slice(1) : '-',
    status: user.status ? (
      <Badge 
        variant="outline"
        className={getUserStatusColor(user.status)}
      >
        {user.status.charAt(0).toUpperCase() + user.status.slice(1)}
      </Badge>
    ) : '-',
    role: (
      <div className="flex items-center">
        <span className="mr-2">{getRoleIcon(user.role)}</span>
        <Badge 
          variant="outline"
          className={getRoleColor(user.role)}
        >
          {user.role}
        </Badge>
      </div>
    ),
    rating: user.rating ? (
      <div className="flex items-center">
        <span className="text-yellow-500 mr-1">⭐</span>
        <span>{user.rating}</span>
      </div>
    ) : '-',
    specialization: user.specialization || '-',
    branch: user.branch ? (
      <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${getBranchColor(user.branch).bg} ${getBranchColor(user.branch).text} ${getBranchColor(user.branch).border} border`}>
        {user.branch}
      </span>
    ) : '-',
    projectsCompleted: user.projectsCompleted || user.completedJobs || '-',
    lastLogin: user.lastLogin ? new Date(user.lastLogin).toLocaleDateString('pl-PL') : '-',
    actions: (
      <div className="flex space-x-2">
        <PermissionGate permissions={[PERMISSIONS.USERS_WRITE]}>
          <Button
            variant="outline"
            size="sm"
            onClick={() => router.push(`/users/${user.id}/edit`)}
          >
            Edit
          </Button>
        </PermissionGate>
        <PermissionGate permissions={[PERMISSIONS.PERMISSIONS_READ]}>
          <Button
            variant="outline"
            size="sm"
            onClick={() => router.push(`/users/${user.id}/permissions`)}
          >
            Permissions
          </Button>
        </PermissionGate>
        <PermissionGate permissions={[PERMISSIONS.USERS_WRITE]}>
          {user.status === 'active' ? (
            <Button
              variant="outline"
              size="sm"
              onClick={() => handleDeactivateUser(user.id)}
              className="text-orange-600 border-orange-200 hover:bg-orange-50"
            >
              Deactivate
            </Button>
          ) : (
            <Button
              variant="outline"
              size="sm"
              onClick={() => handleActivateUser(user.id)}
              className="text-green-600 border-green-200 hover:bg-green-50"
            >
              Activate
            </Button>
          )}
        </PermissionGate>
        <PermissionGate permissions={[PERMISSIONS.USERS_WRITE]}>
          <Button
            variant="outline"
            size="sm"
            onClick={() => handleDeleteUser(user.id)}
            className="text-red-600 border-red-200 hover:bg-red-50"
          >
            Delete
          </Button>
        </PermissionGate>
      </div>
    )
  }));

  console.log('Enhanced data:', enhancedData);

  const totalUsers = users.length;
  const activeWorkers = users.filter(u => u.role === 'Branch Worker').length;
  const contractors = users.filter(u => u.role === 'Subcontractor').length;
  const averageRating = users.filter(u => u.rating).length > 0 
    ? (users.filter(u => u.rating).reduce((sum, u) => sum + (u.rating || 0), 0) / users.filter(u => u.rating).length).toFixed(1)
    : '0.0';

  return (
    <ProtectedRoute permissions={[PERMISSIONS.USERS_READ]}>
      <DashboardLayout>
        <div className="space-y-6">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Users</h1>
              <p className="mt-2 text-sm text-gray-600">
                Manage HHI staff and contractors - {totalUsers} users
              </p>
            </div>
            <div className="mt-4 sm:mt-0 flex space-x-2">
              <PermissionGate permissions={[PERMISSIONS.PERMISSIONS_READ]}>
                <Button variant="outline" onClick={() => router.push('/users/permissions')}>
                  Manage Permissions
                </Button>
              </PermissionGate>
              <PermissionGate permissions={[PERMISSIONS.USERS_WRITE]}>
                <Button variant="primary" onClick={() => router.push('/users/new')}>
                  + Add User
                </Button>
              </PermissionGate>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                    <span className="text-blue-600 text-sm font-medium">👥</span>
                  </div>
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-500">Total Users</p>
                  <p className="text-2xl font-bold text-gray-900">{totalUsers}</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                    <span className="text-green-600 text-sm font-medium">👷</span>
                  </div>
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-500">Active Workers</p>
                  <p className="text-2xl font-bold text-gray-900">{activeWorkers}</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                    <span className="text-purple-600 text-sm font-medium">🔧</span>
                  </div>
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-500">Contractors</p>
                  <p className="text-2xl font-bold text-gray-900">{contractors}</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <div className="w-8 h-8 bg-yellow-100 rounded-full flex items-center justify-center">
                    <span className="text-yellow-600 text-sm font-medium">⭐</span>
                  </div>
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-500">Average Rating</p>
                  <p className="text-2xl font-bold text-gray-900">{averageRating}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Filters */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Search
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
                  Role
                </label>
                <select
                  value={roleFilter}
                  onChange={(e) => setRoleFilter(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary"
                >
                  <option value="">All roles</option>
                  {roles.map(role => (
                    <option key={role} value={role}>{role}</option>
                  ))}
                </select>
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
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Status
                </label>
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary"
                >
                  <option value="">All statuses</option>
                  {statuses.map(status => (
                    <option key={status} value={status}>
                      {status.charAt(0).toUpperCase() + status.slice(1)}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div className="mt-4">
              <Button 
                variant="secondary" 
                onClick={() => {
                  setSearchQuery('');
                  setRoleFilter('');
                  setBranchFilter('');
                  setStatusFilter('');
                  setSortField('');
                  setSortDirection('asc');
                }}
              >
                Clear Filters
              </Button>
            </div>
          </div>

          {/* Users Table */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200">
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">
                  User List
                </h3>
                <div className="text-sm text-gray-500">
                  {sortedUsers.length} users
                </div>
              </div>

              {loading ? (
                <div className="flex items-center justify-center h-32">
                  <div className="text-lg">Loading users...</div>
                </div>
              ) : (
                <div>
                  <div className="mb-4 p-4 bg-blue-50 border border-blue-200 rounded">
                    <p><strong>Debug Info:</strong></p>
                    <p>Users count: {users.length}</p>
                    <p>Filtered users count: {filteredUsers.length}</p>
                    <p>Sorted users count: {sortedUsers.length}</p>
                    <p>Enhanced data count: {enhancedData.length}</p>
                  </div>
                  <DataTable
                    data={enhancedData}
                    columns={columns}
                    itemsPerPage={15}
                    showPagination={true}
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      </DashboardLayout>
    </ProtectedRoute>
  );
} 