'use client';

import { useState } from 'react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { ProtectedRoute } from '@/components/auth/ProtectedRoute';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { branchDepartments, Branch, Department } from '@/lib/mock-data';
import { getBranchColor } from '@/lib/colors';
import { Building, Users, PoundSterling, Calendar, Phone, Mail, MapPin } from 'lucide-react';

export default function BranchesPage() {
  const [selectedBranch, setSelectedBranch] = useState<Branch | null>(null);
  const [selectedDepartment, setSelectedDepartment] = useState<Department | null>(null);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-GB', {
      style: 'currency',
      currency: 'GBP'
    }).format(amount);
  };

  const getDepartmentIcon = (departmentName: string) => {
    if (departmentName.includes('Bathroom')) return '🚿';
    if (departmentName.includes('Kitchen')) return '🍳';
    if (departmentName.includes('Window') || departmentName.includes('Door')) return '🪟';
    if (departmentName.includes('Exterior')) return '🏠';
    return '🔨';
  };

  return (
    <ProtectedRoute permissions={['branches_read']}>
      <DashboardLayout>
        <div className="space-y-6">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-foreground">Branches & Departments</h1>
              <p className="mt-2 text-sm text-gray-600 dark:text-muted-foreground">
                Overview of HHI branches and their departments
              </p>
            </div>
          </div>

          {/* Branches Overview */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
            {branchDepartments.map((branch) => (
              <Card 
                key={branch.name}
                className="cursor-pointer hover:shadow-lg transition-shadow"
                onClick={() => setSelectedBranch(branch)}
              >
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg flex items-center gap-2">
                      <Building className="h-5 w-5" />
                      {branch.name}
                    </CardTitle>
                    <Badge 
                      variant="outline"
                      className={getBranchColor(branch.name)}
                    >
                      {branch.departments.length} depts
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-muted-foreground">
                    <Users className="h-4 w-4" />
                    <span>{branch.totalEmployees} employees</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-muted-foreground">
                    <Calendar className="h-4 w-4" />
                    <span>{branch.totalProjects} projects</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-muted-foreground">
                    <PoundSterling className="h-4 w-4" />
                    <span>{formatCurrency(branch.totalRevenue)}</span>
                  </div>
                  <div className="pt-2 border-t">
                    <p className="text-sm font-medium text-gray-900 dark:text-foreground">{branch.manager}</p>
                    <p className="text-xs text-gray-500 dark:text-muted-foreground">Branch Manager</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Selected Branch Details */}
          {selectedBranch && (
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center gap-2">
                    <Building className="h-6 w-6" />
                    {selectedBranch.name} Branch
                  </CardTitle>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => setSelectedBranch(null)}
                  >
                    Close
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                {/* Branch Info */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                  <div className="flex items-center gap-3">
                    <MapPin className="h-5 w-5 text-gray-500" />
                    <div>
                      <p className="text-sm font-medium">{selectedBranch.address}</p>
                      <p className="text-xs text-gray-500">Address</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Phone className="h-5 w-5 text-gray-500" />
                    <div>
                      <p className="text-sm font-medium">{selectedBranch.phone}</p>
                      <p className="text-xs text-gray-500">Phone</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Mail className="h-5 w-5 text-gray-500" />
                    <div>
                      <p className="text-sm font-medium">{selectedBranch.email}</p>
                      <p className="text-xs text-gray-500">Email</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Users className="h-5 w-5 text-gray-500" />
                    <div>
                      <p className="text-sm font-medium">{selectedBranch.manager}</p>
                      <p className="text-xs text-gray-500">Manager</p>
                    </div>
                  </div>
                </div>

                {/* Departments */}
                <div>
                  <h3 className="text-xl font-semibold mb-4">Departments</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {selectedBranch.departments.map((department) => (
                      <Card 
                        key={department.id}
                        className="cursor-pointer hover:shadow-md transition-shadow"
                        onClick={() => setSelectedDepartment(department)}
                      >
                        <CardHeader className="pb-3">
                          <div className="flex items-center justify-between">
                            <CardTitle className="text-lg flex items-center gap-2">
                              <span className="text-2xl">{getDepartmentIcon(department.name)}</span>
                              {department.name}
                            </CardTitle>
                            <Badge variant="outline" className="text-xs">
                              {department.employeeCount} staff
                            </Badge>
                          </div>
                        </CardHeader>
                        <CardContent className="space-y-3">
                          <p className="text-sm text-gray-600 dark:text-muted-foreground">
                            {department.description}
                          </p>
                          <div className="grid grid-cols-2 gap-4 text-sm">
                            <div>
                              <p className="font-medium text-gray-900 dark:text-foreground">
                                {department.activeProjects}
                              </p>
                              <p className="text-gray-500 dark:text-muted-foreground">Active Projects</p>
                            </div>
                            <div>
                              <p className="font-medium text-gray-900 dark:text-foreground">
                                {formatCurrency(department.monthlyRevenue)}
                              </p>
                              <p className="text-gray-500 dark:text-muted-foreground">Monthly Revenue</p>
                            </div>
                          </div>
                          <div className="pt-2 border-t">
                            <p className="text-sm font-medium text-gray-900 dark:text-foreground">
                              {department.manager}
                            </p>
                            <p className="text-xs text-gray-500 dark:text-muted-foreground">Department Manager</p>
                          </div>
                          <div className="flex flex-wrap gap-1">
                            {department.categories.map((category) => (
                              <Badge key={category} variant="outline" className="text-xs">
                                {category}
                              </Badge>
                            ))}
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Selected Department Details */}
          {selectedDepartment && (
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center gap-2">
                    <span className="text-2xl">{getDepartmentIcon(selectedDepartment.name)}</span>
                    {selectedDepartment.name}
                  </CardTitle>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => setSelectedDepartment(null)}
                  >
                    Close
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div>
                    <h4 className="text-lg font-semibold mb-4">Department Information</h4>
                    <div className="space-y-4">
                      <div>
                        <p className="text-sm font-medium text-gray-900 dark:text-foreground">Description</p>
                        <p className="text-sm text-gray-600 dark:text-muted-foreground">
                          {selectedDepartment.description}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-900 dark:text-foreground">Manager</p>
                        <p className="text-sm text-gray-600 dark:text-muted-foreground">
                          {selectedDepartment.manager}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-900 dark:text-foreground">Employee Count</p>
                        <p className="text-sm text-gray-600 dark:text-muted-foreground">
                          {selectedDepartment.employeeCount} staff members
                        </p>
                      </div>
                    </div>
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold mb-4">Performance Metrics</h4>
                    <div className="space-y-4">
                      <div className="flex justify-between items-center p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                        <span className="text-sm font-medium">Active Projects</span>
                        <span className="text-lg font-bold text-blue-600">
                          {selectedDepartment.activeProjects}
                        </span>
                      </div>
                      <div className="flex justify-between items-center p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                        <span className="text-sm font-medium">Monthly Revenue</span>
                        <span className="text-lg font-bold text-green-600">
                          {formatCurrency(selectedDepartment.monthlyRevenue)}
                        </span>
                      </div>
                      <div className="flex justify-between items-center p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                        <span className="text-sm font-medium">Revenue per Employee</span>
                        <span className="text-lg font-bold text-purple-600">
                          {formatCurrency(selectedDepartment.monthlyRevenue / selectedDepartment.employeeCount)}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="mt-6">
                  <h4 className="text-lg font-semibold mb-3">Service Categories</h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedDepartment.categories.map((category) => (
                      <Badge key={category} variant="outline" className="text-sm">
                        {category}
                      </Badge>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </DashboardLayout>
    </ProtectedRoute>
  );
} 