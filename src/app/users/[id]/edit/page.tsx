'use client';

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { ProtectedRoute } from '@/components/auth/ProtectedRoute';
import { PermissionGate } from '@/components/auth/PermissionGate';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Label } from '@/components/ui/Label';
import { Textarea } from '@/components/ui/Textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/Select';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
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
}

export default function EditUserPage() {
  const router = useRouter();
  const params = useParams();
  const userId = params.id as string;
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
    status: 'active'
  });

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [user, setUser] = useState<any>(null);

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

  useEffect(() => {
    loadUser();
  }, [userId]);

  const loadUser = async () => {
    try {
      setLoading(true);
      const response = await apiService.getUser(userId);
      const userData = response.data;
      setUser(userData);
      
      setFormData({
        name: userData.name,
        email: userData.email,
        phone: userData.phone,
        role: userData.role,
        userType: userData.userType,
        branch: userData.branch || '',
        specialization: userData.specialization || '',
        status: userData.status
      });
    } catch (error) {
      console.error('Error loading user:', error);
      setErrors({ load: 'Failed to load user data' });
    } finally {
      setLoading(false);
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
        [field]: value as 'admin' | 'branch_manager' | 'branch_worker' | 'subcontractor',
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

    // Check if current user can edit this user
    if (currentUser?.userType === 'branch_manager') {
      if (formData.userType === 'admin') {
        newErrors.userType = 'Branch managers cannot edit admin users';
      }
      if (formData.branch !== currentUser.branch) {
        newErrors.branch = 'Branch managers can only edit users in their own branch';
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

    setSaving(true);

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

      await apiService.updateUser(userId, userData);
      
      // Redirect to users page
      router.push('/users');
    } catch (error) {
      console.error('Error updating user:', error);
      setErrors({ submit: 'Failed to update user. Please try again.' });
    } finally {
      setSaving(false);
    }
  };

  const canEditUserType = (userType: string): boolean => {
    if (!currentUser) return false;
    
    // Admin can edit any user type
    if (currentUser.userType === 'admin') return true;
    
    // Branch manager can only edit branch_worker and subcontractor
    if (currentUser.userType === 'branch_manager') {
      return userType === 'branch_worker' || userType === 'subcontractor';
    }
    
    return false;
  };

  if (loading) {
    return (
      <ProtectedRoute permissions={[PERMISSIONS.USERS_WRITE]}>
        <DashboardLayout>
          <div className="flex items-center justify-center h-64">
            <div className="text-lg">Loading user data...</div>
          </div>
        </DashboardLayout>
      </ProtectedRoute>
    );
  }

  if (errors.load) {
    return (
      <ProtectedRoute permissions={[PERMISSIONS.USERS_WRITE]}>
        <DashboardLayout>
          <div className="flex items-center justify-center h-64">
            <div className="text-red-600">{errors.load}</div>
          </div>
        </DashboardLayout>
      </ProtectedRoute>
    );
  }

  return (
    <ProtectedRoute permissions={[PERMISSIONS.USERS_WRITE]}>
      <DashboardLayout>
        <div className="space-y-6">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Edit User</h1>
              <p className="mt-2 text-sm text-gray-600">
                Update user information for {user?.name}
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
            <CardHeader>
              <CardTitle>User Information</CardTitle>
              <CardDescription>
                Update the user's details and settings
              </CardDescription>
            </CardHeader>
            <CardContent>
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
                        <SelectItem value="admin" disabled={!canEditUserType('admin')}>
                          Administrator
                        </SelectItem>
                        <SelectItem value="branch_manager" disabled={!canEditUserType('branch_manager')}>
                          Branch Manager
                        </SelectItem>
                        <SelectItem value="branch_worker" disabled={!canEditUserType('branch_worker')}>
                          Branch Worker
                        </SelectItem>
                        <SelectItem value="subcontractor" disabled={!canEditUserType('subcontractor')}>
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
                    disabled={saving}
                  >
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    variant="default"
                    disabled={saving}
                  >
                    {saving ? 'Saving Changes...' : 'Save Changes'}
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </DashboardLayout>
    </ProtectedRoute>
  );
} 