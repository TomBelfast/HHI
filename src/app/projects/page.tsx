'use client';

import { useEffect, useState } from 'react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { DataTable } from '@/components/ui/DataTable';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { apiService, FilterOptions, SortOptions } from '@/lib/api';
import { Project, Customer } from '@/lib/mock-data';

export default function ProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [branchFilter, setBranchFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');
  const [sortField, setSortField] = useState('');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');

  const branches = ['Belfast', 'Newtownabbey', 'Lisburn', 'Bangor', 'Coleraine'];
  const statuses = ['Contact Received', 'Quote Sent', 'Contract Signed', 'Materials Received', 'Installation Scheduled', 'Installation Completed', 'Repair Completed'];
  const categories = ['Bathrooms', 'Kitchens', 'Windows & Doors', 'HD Decking', 'PVC Fascia Soffit & Guttering'];

  useEffect(() => {
    loadProjects();
    loadCustomers();
  }, [searchQuery, branchFilter, statusFilter, categoryFilter, sortField, sortDirection]);

  const loadProjects = async () => {
    try {
      setLoading(true);
      const filters: FilterOptions = {
        search: searchQuery || undefined,
        branch: branchFilter || undefined,
        status: statusFilter || undefined,
        category: categoryFilter || undefined,
      };

      const sort: SortOptions | undefined = sortField ? {
        field: sortField,
        direction: sortDirection
      } : undefined;

      const response = await apiService.getProjects(1, 50, filters, sort);
      setProjects(response.data);
    } catch (error) {
      console.error('Error loading projects:', error);
    } finally {
      setLoading(false);
    }
  };

  const loadCustomers = async () => {
    try {
      const response = await apiService.getCustomers(1, 100);
      setCustomers(response.data);
    } catch (error) {
      console.error('Error loading customers:', error);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Installation Completed':
      case 'Repair Completed':
        return 'bg-green-100 text-green-800';
      case 'Quote Sent':
        return 'bg-yellow-100 text-yellow-800';
      case 'Materials Received':
        return 'bg-blue-100 text-blue-800';
      case 'Installation Scheduled':
        return 'bg-purple-100 text-purple-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'Bathrooms':
        return '🚿';
      case 'Kitchens':
        return '🍳';
      case 'Windows & Doors':
        return '🪟';
      case 'HD Decking':
        return '🪵';
      case 'PVC Fascia Soffit & Guttering':
        return '🏠';
      default:
        return '🔨';
    }
  };

  const columns = [
    { key: 'title', label: 'Project' },
    { key: 'customerName', label: 'Customer' },
    { key: 'category', label: 'Category' },
    { key: 'status', label: 'Status' },
    { key: 'value', label: 'Value' },
    { key: 'branch', label: 'Branch' },
    { key: 'assignedWorker', label: 'Worker' },
    { key: 'createdDate', label: 'Created Date' }
  ];

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('pl-PL');
  };

  const enhancedData = projects.map(project => {
    const customer = customers.find(c => c.id === project.customerId);
    return {
      ...project,
      customerName: customer?.name || 'Unknown customer',
      createdDate: formatDate(project.createdDate)
    };
  });

  const activeProjects = projects.filter(p => 
    !['Installation Completed', 'Repair Completed'].includes(p.status)
  );

  const totalRevenue = projects.reduce((sum, p) => sum + p.value, 0);

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Projects</h1>
            <p className="mt-2 text-sm text-gray-600">
              Manage HHI projects - {projects.length} projects
            </p>
          </div>
          <div className="mt-4 sm:mt-0">
            <Button variant="default">
              + New Project
            </Button>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                  <span className="text-blue-600 text-sm font-medium">🔨</span>
                </div>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">All Projects</p>
                <p className="text-2xl font-bold text-gray-900">{projects.length}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                  <span className="text-green-600 text-sm font-medium">⚡</span>
                </div>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">Active Projects</p>
                <p className="text-2xl font-bold text-gray-900">{activeProjects.length}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="w-8 h-8 bg-yellow-100 rounded-full flex items-center justify-center">
                  <span className="text-yellow-600 text-sm font-medium">💰</span>
                </div>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">Total Value</p>
                <p className="text-2xl font-bold text-gray-900">
                  £{totalRevenue.toLocaleString()}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                  <span className="text-purple-600 text-sm font-medium">📊</span>
                </div>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">Average Value</p>
                <p className="text-2xl font-bold text-gray-900">
                  £{projects.length > 0 ? Math.round(totalRevenue / projects.length).toLocaleString() : '0'}
                </p>
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
                placeholder="Project name, description..."
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
                  <option key={status} value={status}>{status}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Category
              </label>
              <select
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary"
              >
                <option value="">All categories</option>
                {categories.map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
            </div>
          </div>
          <div className="mt-4">
            <Button 
              variant="secondary" 
              onClick={() => {
                setSearchQuery('');
                setBranchFilter('');
                setStatusFilter('');
                setCategoryFilter('');
                setSortField('');
                setSortDirection('asc');
              }}
            >
              Clear Filters
            </Button>
          </div>
        </div>

        {/* Projects Table */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          <div className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-semibold text-gray-900">
                Project List
              </h3>
              <div className="text-sm text-gray-500">
                {projects.length} projects
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
  );
} 