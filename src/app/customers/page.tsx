'use client';

import { useEffect, useState } from 'react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { DataTable } from '@/components/ui/DataTable';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { apiService, FilterOptions, SortOptions } from '@/lib/api';
import { Customer } from '@/lib/mock-data';

export default function CustomersPage() {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [branchFilter, setBranchFilter] = useState('');
  const [sortField, setSortField] = useState('');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');

  const branches = ['Belfast', 'Newtownabbey', 'Lisburn', 'Bangor', 'Coleraine'];

  useEffect(() => {
    loadCustomers();
  }, [searchQuery, branchFilter, sortField, sortDirection]);

  const loadCustomers = async () => {
    try {
      setLoading(true);
      const filters: FilterOptions = {
        search: searchQuery || undefined,
        branch: branchFilter || undefined,
      };

      const sort: SortOptions | undefined = sortField ? {
        field: sortField,
        direction: sortDirection
      } : undefined;

      const response = await apiService.getCustomers(1, 50, filters, sort);
      setCustomers(response.data);
    } catch (error) {
      console.error('Error loading customers:', error);
    } finally {
      setLoading(false);
    }
  };

  const columns = [
    { key: 'name', label: 'Name' },
    { key: 'email', label: 'Email' },
    { key: 'phone', label: 'Phone' },
    { key: 'branch', label: 'Branch' },
    { key: 'totalProjects', label: 'Projects' },
    { key: 'totalValue', label: 'Value' },
    { key: 'rating', label: 'Rating' },
    { key: 'registrationDate', label: 'Registration Date' }
  ];

  const handleSort = (field: string) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('pl-PL');
  };

  const enhancedData = customers.map(customer => ({
    ...customer,
    registrationDate: formatDate(customer.registrationDate)
  }));

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-foreground dark:bg-[#404040] px-4 py-2 rounded">Customers</h1>
            <p className="mt-2 text-sm text-gray-600 dark:text-muted-foreground">
              Manage HHI customer database - {customers.length} customers
            </p>
          </div>
          <div className="mt-4 sm:mt-0">
            <Button variant="default">
              + Add Customer
            </Button>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white dark:bg-card rounded-lg shadow-sm border border-gray-200 dark:border-border p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-foreground mb-2">
                Search
              </label>
              <Input
                type="text"
                placeholder="Name, email, phone..."
                value={searchQuery}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchQuery(e.target.value)}
              />
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

        {/* Customers Table */}
        <div className="bg-white dark:bg-card rounded-lg shadow-sm border border-gray-200 dark:border-border">
          <div className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-foreground">
                Customer List
              </h3>
              <div className="text-sm text-gray-500 dark:text-muted-foreground">
                {customers.length} customers
              </div>
            </div>

            {loading ? (
              <div className="flex items-center justify-center h-32">
                <div className="text-lg">Loading customers...</div>
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

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="bg-white dark:bg-card rounded-lg shadow-sm border border-gray-200 dark:border-border p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="w-8 h-8 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center">
                  <span className="text-blue-600 dark:text-blue-400 text-sm font-medium">👥</span>
                </div>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500 dark:text-muted-foreground">Total Customers</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-foreground">{customers.length}</p>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-card rounded-lg shadow-sm border border-gray-200 dark:border-border p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="w-8 h-8 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center">
                  <span className="text-green-600 dark:text-green-400 text-sm font-medium">💰</span>
                </div>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500 dark:text-muted-foreground">Total Value</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-foreground">
                  £{customers.reduce((sum, c) => sum + c.totalValue, 0).toLocaleString()}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-card rounded-lg shadow-sm border border-gray-200 dark:border-border p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="w-8 h-8 bg-yellow-100 dark:bg-yellow-900 rounded-full flex items-center justify-center">
                  <span className="text-yellow-600 dark:text-yellow-400 text-sm font-medium">⭐</span>
                </div>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500 dark:text-muted-foreground">Average Rating</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-foreground">
                  {(customers.reduce((sum, c) => sum + c.rating, 0) / customers.length).toFixed(1)}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-card rounded-lg shadow-sm border border-gray-200 dark:border-border p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="w-8 h-8 bg-purple-100 dark:bg-purple-900 rounded-full flex items-center justify-center">
                  <span className="text-purple-600 dark:text-purple-400 text-sm font-medium">🔨</span>
                </div>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500 dark:text-muted-foreground">Total Projects</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-foreground">
                  {customers.reduce((sum, c) => sum + c.totalProjects, 0)}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
} 