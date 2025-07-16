'use client';

import { useEffect, useState } from 'react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { ProtectedRoute } from '@/components/auth/ProtectedRoute';
import { PermissionGate } from '@/components/auth/PermissionGate';
import { DataTable } from '@/components/ui/DataTable';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { apiService, FilterOptions, SortOptions } from '@/lib/api';
import { Project, Customer } from '@/lib/mock-data';
import { PERMISSIONS } from '@/lib/auth';
import Link from 'next/link';

export default function ProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [branchFilter, setBranchFilter] = useState('');
  const [sortField, setSortField] = useState('');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');

  const branches = ['Belfast', 'Newtownabbey', 'Lisburn', 'Bangor', 'Coleraine'];
  const statuses = ['Quote Sent', 'Approved', 'In Progress', 'Installation Completed', 'Materials Received', 'Installation Scheduled', 'Repair Completed', 'Invoice Sent', 'Awaiting Payment', 'Paid', 'Awaiting Review'];

  // Branch color mapping - same as in reports and customers
  const getBranchColor = (branchName: string) => {
    const branchColors: Record<string, { bg: string; text: string; border: string }> = {
      'Belfast': { bg: 'bg-red-100', text: 'text-red-800', border: 'border-red-200' },
      'Newtownabbey': { bg: 'bg-blue-100', text: 'text-blue-800', border: 'border-blue-200' },
      'Lisburn': { bg: 'bg-green-100', text: 'text-green-800', border: 'border-green-200' },
      'Bangor': { bg: 'bg-purple-100', text: 'text-purple-800', border: 'border-purple-200' },
      'Coleraine': { bg: 'bg-orange-100', text: 'text-orange-800', border: 'border-orange-200' }
    };
    
    return branchColors[branchName] || { bg: 'bg-gray-100', text: 'text-gray-800', border: 'border-gray-200' };
  };

  useEffect(() => {
    loadData();
  }, [searchQuery, statusFilter, branchFilter, sortField, sortDirection]);

  const loadData = async () => {
    try {
      setLoading(true);
      const [projectsResponse, customersResponse] = await Promise.all([
        apiService.getProjects(1, 50),
        apiService.getCustomers(1, 50)
      ]);
      setProjects(projectsResponse.data);
      setCustomers(customersResponse.data);
    } catch (error) {
      console.error('Error loading data:', error);
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Quote Sent':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'Approved':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'In Progress':
        return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'Installation Completed':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'Materials Received':
        return 'bg-purple-100 text-purple-800 border-purple-200';
      case 'Installation Scheduled':
        return 'bg-indigo-100 text-indigo-800 border-indigo-200';
      case 'Repair Completed':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'Invoice Sent':
        return 'bg-cyan-100 text-cyan-800 border-cyan-200';
      case 'Awaiting Payment':
        return 'bg-amber-100 text-amber-800 border-amber-200';
      case 'Paid':
        return 'bg-emerald-100 text-emerald-800 border-emerald-200';
      case 'Awaiting Review':
        return 'bg-rose-100 text-rose-800 border-rose-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getCustomerName = (customerId: string) => {
    const customer = customers.find(c => c.id === customerId);
    return customer ? customer.name : 'Unknown Customer';
  };

  const columns = [
    { key: 'title', label: 'Project' },
    { key: 'customerName', label: 'Customer' },
    { 
      key: 'status', 
      label: 'Status',
      render: (value: string) => {
        const statusColor = getStatusColor(value);
        return (
          <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${statusColor} border`}>
            {value.charAt(0).toUpperCase() + value.slice(1)}
          </span>
        );
      }
    },
    { key: 'value', label: 'Value' },
    { 
      key: 'branch', 
      label: 'Branch',
      render: (value: string) => {
        const branchColor = getBranchColor(value);
        return (
          <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${branchColor.bg} ${branchColor.text} ${branchColor.border} border`}>
            {value}
          </span>
        );
      }
    },
    { key: 'assignedWorker', label: 'Assigned To' },
    { key: 'createdDate', label: 'Created Date' }
  ];

  const filteredProjects = projects.filter(project => {
    const matchesSearch = project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         getCustomerName(project.customerId).toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = !statusFilter || project.status === statusFilter;
    const matchesBranch = !branchFilter || project.branch === branchFilter;
    
    return matchesSearch && matchesStatus && matchesBranch;
  });

  const sortedProjects = [...filteredProjects].sort((a, b) => {
    if (!sortField) return 0;
    
    const aValue = a[sortField as keyof Project];
    const bValue = b[sortField as keyof Project];
    
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

  const enhancedData = sortedProjects.map(project => ({
    ...project,
    customerName: getCustomerName(project.customerId),
    status: project.status, // Explicitly include status
    value: `£${project.value.toLocaleString()}`,
    createdDate: new Date(project.createdDate).toLocaleDateString('pl-PL'),
    title: (
      <Link 
        href={`/projects/${project.id}`}
        className="text-primary hover:text-primary/80 font-medium"
      >
        {project.title}
      </Link>
    )
  }));

  const totalProjects = projects.length;
  const activeProjects = projects.filter(p => p.status === 'In Progress').length;
  const completedProjects = projects.filter(p => p.status === 'Installation Completed' || p.status === 'Repair Completed').length;
  const totalValue = projects.reduce((sum, p) => sum + p.value, 0);

  return (
    <ProtectedRoute permissions={[PERMISSIONS.PROJECTS_READ]}>
      <DashboardLayout>
        <div className="space-y-6">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-foreground">Projects</h1>
              <p className="mt-2 text-sm text-gray-600 dark:text-muted-foreground">
                Manage HHI projects and installations - {totalProjects} projects
              </p>
            </div>
            <div className="mt-4 sm:mt-0">
              <PermissionGate permissions={[PERMISSIONS.PROJECTS_WRITE]}>
                <Button variant="default">
                  + New Project
                </Button>
              </PermissionGate>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="bg-white dark:bg-card rounded-lg shadow-sm border border-gray-200 dark:border-border p-6">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <div className="w-8 h-8 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center">
                    <span className="text-blue-600 dark:text-blue-400 text-sm font-medium">📋</span>
                  </div>
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-500 dark:text-muted-foreground">Total Projects</p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-foreground">{totalProjects}</p>
                </div>
              </div>
            </div>

            <div className="bg-white dark:bg-card rounded-lg shadow-sm border border-gray-200 dark:border-border p-6">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <div className="w-8 h-8 bg-orange-100 dark:bg-orange-900 rounded-full flex items-center justify-center">
                    <span className="text-orange-600 dark:text-orange-400 text-sm font-medium">🔨</span>
                  </div>
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-500 dark:text-muted-foreground">Active Projects</p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-foreground">{activeProjects}</p>
                </div>
              </div>
            </div>

            <div className="bg-white dark:bg-card rounded-lg shadow-sm border border-gray-200 dark:border-border p-6">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <div className="w-8 h-8 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center">
                    <span className="text-green-600 dark:text-green-400 text-sm font-medium">✅</span>
                  </div>
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-500 dark:text-muted-foreground">Completed</p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-foreground">{completedProjects}</p>
                </div>
              </div>
            </div>

            <div className="bg-white dark:bg-card rounded-lg shadow-sm border border-gray-200 dark:border-border p-6">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <div className="w-8 h-8 bg-purple-100 dark:bg-purple-900 rounded-full flex items-center justify-center">
                    <span className="text-purple-600 dark:text-purple-400 text-sm font-medium">💰</span>
                  </div>
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-500 dark:text-muted-foreground">Total Value</p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-foreground">£{totalValue.toLocaleString()}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Filters */}
          <div className="bg-white dark:bg-card rounded-lg shadow-sm border border-gray-200 dark:border-border p-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-foreground mb-2">
                  Search
                </label>
                <Input
                  type="text"
                  placeholder="Project name, customer..."
                  value={searchQuery}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchQuery(e.target.value)}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-foreground mb-2">
                  Status
                </label>
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-border rounded-md focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary dark:bg-card dark:text-foreground"
                >
                  <option value="">All statuses</option>
                  {statuses.map(status => (
                    <option key={status} value={status}>
                      {status.charAt(0).toUpperCase() + status.slice(1)}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-foreground mb-2">
                  Branch
                </label>
                <select
                  value={branchFilter}
                  onChange={(e) => setBranchFilter(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-border rounded-md focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary dark:bg-card dark:text-foreground"
                >
                  <option value="">All branches</option>
                  {branches.map(branch => (
                    <option key={branch} value={branch}>{branch}</option>
                  ))}
                </select>
              </div>
              <div className="flex items-end">
                <Button 
                  variant="secondary" 
                  onClick={() => {
                    setSearchQuery('');
                    setStatusFilter('');
                    setBranchFilter('');
                    setSortField('');
                    setSortDirection('asc');
                  }}
                >
                  Clear Filters
                </Button>
              </div>
            </div>
          </div>

          {/* Projects Table */}
          <div className="bg-white dark:bg-card rounded-lg shadow-sm border border-gray-200 dark:border-border">
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-foreground">
                  Project List
                </h3>
                <div className="text-sm text-gray-500 dark:text-muted-foreground">
                  {sortedProjects.length} projects
                </div>
              </div>

              {loading ? (
                <div className="flex items-center justify-center h-32">
                  <div className="text-lg">Loading projects...</div>
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
    </ProtectedRoute>
  );
} 