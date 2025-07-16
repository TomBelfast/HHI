'use client';

import { useEffect, useState } from 'react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { DataTable } from '@/components/ui/DataTable';
import { apiService } from '@/lib/api';

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  branch: string;
  phone: string;
  specialization?: string;
  rating?: number;
  projectsCompleted?: number;
  completedJobs?: number;
  averageTime?: string;
}

export default function UsersPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [roleFilter, setRoleFilter] = useState('');
  const [branchFilter, setBranchFilter] = useState('');
  const [sortField, setSortField] = useState('');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    try {
      setLoading(true);
      const response = await apiService.getUsers();
      setUsers(response.data);
    } catch (error) {
      console.error('Error loading users:', error);
    } finally {
      setLoading(false);
    }
  };

  const getRoleColor = (role: string) => {
    switch (role) {
      case 'System Administrator':
        return 'bg-red-100 text-red-800';
      case 'Branch Manager':
        return 'bg-blue-100 text-blue-800';
      case 'Branch Worker':
        return 'bg-green-100 text-green-800';
      case 'Subcontractor':
        return 'bg-purple-100 text-purple-800';
      default:
        return 'bg-gray-100 text-gray-800';
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
    
    return matchesSearch && matchesRole && matchesBranch;
  });

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

  const roles = Array.from(new Set(users.map(u => u.role)));
  const branches = Array.from(new Set(users.map(u => u.branch).filter(Boolean)));

  const columns = [
    { key: 'name', label: 'Name' },
    { key: 'email', label: 'Email' },
    { key: 'role', label: 'Role' },
    { key: 'branch', label: 'Branch' },
    { key: 'phone', label: 'Phone' },
    { key: 'specialization', label: 'Specialization' },
    { key: 'rating', label: 'Rating' },
    { key: 'projectsCompleted', label: 'Projects' }
  ];

  const enhancedData = sortedUsers.map(user => ({
    ...user,
    role: (
      <div className="flex items-center">
        <span className="mr-2">{getRoleIcon(user.role)}</span>
        <Badge className={getRoleColor(user.role)}>
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
    projectsCompleted: user.projectsCompleted || user.completedJobs || '-'
  }));

  const totalUsers = users.length;
  const activeWorkers = users.filter(u => u.role === 'Branch Worker').length;
  const contractors = users.filter(u => u.role === 'Subcontractor').length;
  const averageRating = users.filter(u => u.rating).length > 0 
    ? (users.filter(u => u.rating).reduce((sum, u) => sum + (u.rating || 0), 0) / users.filter(u => u.rating).length).toFixed(1)
    : '0.0';

  return (
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
          <div className="mt-4 sm:mt-0">
            <Button variant="default">
              + Add User
            </Button>
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
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
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
          </div>
          <div className="mt-4">
            <Button 
              variant="secondary" 
              onClick={() => {
                setSearchQuery('');
                setRoleFilter('');
                setBranchFilter('');
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
              <DataTable
                data={enhancedData}
                columns={columns}
                itemsPerPage={15}
                showPagination={true}
              />
            )}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
} 