'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { ProtectedRoute } from '@/components/auth/ProtectedRoute';
import { PermissionGate } from '@/components/auth/PermissionGate';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Label } from '@/components/ui/Label';
import { Textarea } from '@/components/ui/Textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/Select';
import { Card } from '@/components/ui/Card';
import { apiService } from '@/lib/api';
import { PERMISSIONS, AuthService } from '@/lib/auth';

interface UserFormData {
  name: string;
  email: string;
  phone: string;
  role: string;
  userType: 'admin' | 'branch_manager' | 'branch_worker' | 'subcontractor';
  branch: string;
  specialization: string;
  status: 'active' | 'inactive' | 'suspended';
  password: string;
  confirmPassword: string;
}

export default function NewUserPage() {
  const router = useRouter();
  const authService = AuthService.getInstance();
  const currentUser = authService.getCurrentUser();
  
  const [formData, setFormData] = useState<UserFormData>({
    name: '',
    email: '',
    phone: '',
    role: '',
    userType: 'branch_worker',
    branch: '',
    specialization: '',
    status: 'active',
    password: '',
    confirmPassword: ''
  });

  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Available branches
  const branches = ['Belfast', 'Newtownabbey', 'Lisburn', 'Bangor', 'Coleraine'];
  
  // Role options based on user type
  const getRoleOptions = (userType: string) => {
    switch (userType) {
      case 'admin':
        return ['System Administrator'];
      case 'branch_manager':
        return ['Branch Manager'];
      case 'branch_worker':
        return ['Branch Worker', 'Senior Worker', 'Apprentice'];
      case 'subcontractor':
        return ['Subcontractor', 'Specialist Contractor'];
      default:
        return [];
    }
  };

  const handleInputChange = (field: keyof UserFormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
    
    // Update role when userType changes
    if (field === 'userType') {
      const roleOptions = getRoleOptions(value);
      setFormData(prev => ({
        ...prev,
        userType: value as 'admin' | 'branch_manager' | 'branch_worker' | 'subcontractor',
        role: roleOptions[0] || ''
      }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone is required';
    }

    if (!formData.role) {
      newErrors.role = 'Role is required';
    }

    if (!formData.branch && formData.userType !== 'admin') {
      newErrors.branch = 'Branch is required for non-admin users';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    // Check if current user can create this type of user
    if (currentUser?.userType === 'branch_manager') {
      if (formData.userType === 'admin') {
        newErrors.userType = 'Branch managers cannot create admin users';
      }
      if (formData.branch !== currentUser.branch) {
        newErrors.branch = 'Branch managers can only create users in their own branch';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setLoading(true);

    try {
      const userData = {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        role: formData.role,
        userType: formData.userType,
        branch: formData.branch || undefined,
        specialization: formData.specialization || undefined,
        status: formData.status
      };

      await apiService.createUser(userData);
      
      // Redirect to users page
      router.push('/users');
    } catch (error) {
      console.error('Error creating user:', error);
      setErrors({ submit: 'Failed to create user. Please try again.' });
    } finally {
      setLoading(false);
    }
  };

  const canCreateUserType = (userType: string): boolean => {
    if (!currentUser) return false;
    
    // Admin can create any user type
    if (currentUser.userType === 'admin') return true;
    
    // Branch manager can only create branch_worker and subcontractor
    if (currentUser.userType === 'branch_manager') {
      return userType === 'branch_worker' || userType === 'subcontractor';
    }
    
    return false;
  };

  return (
    <ProtectedRoute permissions={[PERMISSIONS.USERS_WRITE]}>
      <DashboardLayout>
        <div className="space-y-6">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Add New User</h1>
              <p className="mt-2 text-sm text-gray-600">
                Create a new user account for HHI system
              </p>
            </div>
            <div className="mt-4 sm:mt-0">
              <Button variant="secondary" onClick={() => router.push('/users')}>
                ← Back to Users
              </Button>
            </div>
          </div>

          {/* Form */}
          <Card>
            <div className="p-6">
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Basic Information */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="name">Full Name *</Label>
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleInputChange('name', e.target.value)}
                      placeholder="John Doe"
                      required
                    />
                    {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
                  </div>

                  <div>
                    <Label htmlFor="email">Email Address *</Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleInputChange('email', e.target.value)}
                      placeholder="john.doe@hhi-ni.com"
                      required
                    />
                    {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
                  </div>

                  <div>
                    <Label htmlFor="phone">Phone Number *</Label>
                    <Input
                      id="phone"
                      value={formData.phone}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleInputChange('phone', e.target.value)}
                      placeholder="+44 28 1234 5678"
                      required
                    />
                    {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
                  </div>

                  <div>
                    <Label htmlFor="specialization">Specialization</Label>
                    <Input
                      id="specialization"
                      value={formData.specialization}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleInputChange('specialization', e.target.value)}
                      placeholder="Plumbing, Electrical, etc."
                    />
                  </div>
                </div>

                {/* User Type and Role */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="userType">User Type *</Label>
                    <Select 
                      value={formData.userType} 
                      onValueChange={(value: string) => handleInputChange('userType', value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select user type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="admin" disabled={!canCreateUserType('admin')}>
                          Administrator
                        </SelectItem>
                        <SelectItem value="branch_manager" disabled={!canCreateUserType('branch_manager')}>
                          Branch Manager
                        </SelectItem>
                        <SelectItem value="branch_worker" disabled={!canCreateUserType('branch_worker')}>
                          Branch Worker
                        </SelectItem>
                        <SelectItem value="subcontractor" disabled={!canCreateUserType('subcontractor')}>
                          Subcontractor
                        </SelectItem>
                      </SelectContent>
                    </Select>
                    {errors.userType && <p className="text-red-500 text-sm mt-1">{errors.userType}</p>}
                  </div>

                  <div>
                    <Label htmlFor="role">Role *</Label>
                    <Select 
                      value={formData.role} 
                      onValueChange={(value: string) => handleInputChange('role', value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select role" />
                      </SelectTrigger>
                      <SelectContent>
                        {getRoleOptions(formData.userType).map(role => (
                          <SelectItem key={role} value={role}>{role}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    {errors.role && <p className="text-red-500 text-sm mt-1">{errors.role}</p>}
                  </div>
                </div>

                {/* Branch and Status */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="branch">Branch</Label>
                    <Select 
                      value={formData.branch} 
                      onValueChange={(value: string) => handleInputChange('branch', value)}
                      disabled={formData.userType === 'admin'}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select branch" />
                      </SelectTrigger>
                      <SelectContent>
                        {branches.map(branch => (
                          <SelectItem key={branch} value={branch}>{branch}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    {errors.branch && <p className="text-red-500 text-sm mt-1">{errors.branch}</p>}
                  </div>

                  <div>
                    <Label htmlFor="status">Status *</Label>
                    <Select 
                      value={formData.status} 
                      onValueChange={(value: string) => handleInputChange('status', value)}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="active">Active</SelectItem>
                        <SelectItem value="inactive">Inactive</SelectItem>
                        <SelectItem value="suspended">Suspended</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {/* Password */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="password">Password *</Label>
                    <Input
                      id="password"
                      type="password"
                      value={formData.password}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleInputChange('password', e.target.value)}
                      placeholder="Minimum 6 characters"
                      required
                    />
                    {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
                  </div>

                  <div>
                    <Label htmlFor="confirmPassword">Confirm Password *</Label>
                    <Input
                      id="confirmPassword"
                      type="password"
                      value={formData.confirmPassword}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleInputChange('confirmPassword', e.target.value)}
                      placeholder="Confirm password"
                      required
                    />
                    {errors.confirmPassword && <p className="text-red-500 text-sm mt-1">{errors.confirmPassword}</p>}
                  </div>
                </div>

                {/* Submit Error */}
                {errors.submit && (
                  <div className="bg-red-50 border border-red-200 rounded-md p-4">
                    <p className="text-red-600 text-sm">{errors.submit}</p>
                  </div>
                )}

                {/* Submit Buttons */}
                <div className="flex justify-end space-x-4">
                  <Button
                    type="button"
                    variant="secondary"
                    onClick={() => router.push('/users')}
                    disabled={loading}
                  >
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    variant="primary"
                    disabled={loading}
                  >
                    {loading ? 'Creating User...' : 'Create User'}
                  </Button>
                </div>
              </form>
            </div>
          </Card>
        </div>
      </DashboardLayout>
    </ProtectedRoute>
  );
} 