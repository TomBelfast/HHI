'use client';

import { useEffect, useState } from 'react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { ProtectedRoute } from '@/components/auth/ProtectedRoute';
import { apiService } from '@/lib/api';
import { Analytics } from '@/lib/mock-data';
import { PERMISSIONS } from '@/lib/auth';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell
} from 'recharts';

export default function AnalyticsPage() {
  const [analyticsData, setAnalyticsData] = useState<Analytics | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadAnalytics();
  }, []);

  const loadAnalytics = async () => {
    try {
      setLoading(true);
      const response = await apiService.getAnalytics();
      setAnalyticsData(response.data);
    } catch (error) {
      console.error('Error loading analytics:', error);
    } finally {
      setLoading(false);
    }
  };

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8'];

  if (loading) {
    return (
      <ProtectedRoute permissions={[PERMISSIONS.ANALYTICS_READ]}>
        <DashboardLayout>
          <div className="flex items-center justify-center h-64">
            <div className="text-lg">Loading analytics...</div>
          </div>
        </DashboardLayout>
      </ProtectedRoute>
    );
  }

  if (!analyticsData) {
    return (
      <ProtectedRoute permissions={[PERMISSIONS.ANALYTICS_READ]}>
        <DashboardLayout>
          <div className="text-center text-red-600">
            Error loading analytics data
          </div>
        </DashboardLayout>
      </ProtectedRoute>
    );
  }

  // Prepare data for charts
  const revenueData = analyticsData.history.map(item => ({
    month: item.month,
    revenue: item.revenue,
    completed_projects: item.completed_projects,
    conversion_rate: item.conversion_rate
  }));

  const serviceTypeData = analyticsData.service_type_performance.map(item => ({
    name: item.service_type,
    projects: item.projects,
    revenue: item.revenue
  }));

  const statusDistributionData = Object.entries(analyticsData.project_status_distribution).map(([status, count]) => ({
    name: status.charAt(0).toUpperCase() + status.slice(1),
    value: count
  }));

  const regionalData = analyticsData.regional_performance.map(item => ({
    region: item.region,
    projects: item.projects,
    revenue: item.revenue
  }));

  return (
    <ProtectedRoute permissions={[PERMISSIONS.ANALYTICS_READ]}>
      <DashboardLayout>
        <div className="space-y-6">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-foreground">Analytics</h1>
              <p className="mt-2 text-sm text-gray-600 dark:text-muted-foreground">
                HHI Business Performance Overview
              </p>
            </div>
          </div>

          {/* Key Metrics */}
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
                  <p className="text-2xl font-bold text-gray-900 dark:text-foreground">{analyticsData.total_projects}</p>
                </div>
              </div>
            </div>

            <div className="bg-white dark:bg-card rounded-lg shadow-sm border border-gray-200 dark:border-border p-6">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <div className="w-8 h-8 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center">
                    <span className="text-green-600 dark:text-green-400 text-sm font-medium">🔨</span>
                  </div>
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-500 dark:text-muted-foreground">Active Projects</p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-foreground">{analyticsData.active_projects}</p>
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
                  <p className="text-sm font-medium text-gray-500 dark:text-muted-foreground">Monthly Revenue</p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-foreground">£{analyticsData.monthly_revenue.toLocaleString()}</p>
                </div>
              </div>
            </div>

            <div className="bg-white dark:bg-card rounded-lg shadow-sm border border-gray-200 dark:border-border p-6">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <div className="w-8 h-8 bg-yellow-100 dark:bg-yellow-900 rounded-full flex items-center justify-center">
                    <span className="text-yellow-600 dark:text-yellow-400 text-sm font-medium">📈</span>
                  </div>
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-500 dark:text-muted-foreground">Conversion Rate</p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-foreground">{analyticsData.conversion_rate}%</p>
                </div>
              </div>
            </div>
          </div>

          {/* Charts Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Revenue Trend */}
            <div className="bg-white dark:bg-card rounded-lg shadow-sm border border-gray-200 dark:border-border p-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-foreground mb-4">Revenue Trend</h3>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={revenueData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="revenue" stroke="#8884d8" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </div>

            {/* Service Type Performance */}
            <div className="bg-white dark:bg-card rounded-lg shadow-sm border border-gray-200 dark:border-border p-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-foreground mb-4">Service Type Performance</h3>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={serviceTypeData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="revenue" fill="#8884d8" />
                  <Bar dataKey="projects" fill="#82ca9d" />
                </BarChart>
              </ResponsiveContainer>
            </div>

            {/* Project Status Distribution */}
            <div className="bg-white dark:bg-card rounded-lg shadow-sm border border-gray-200 dark:border-border p-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-foreground mb-4">Project Status Distribution</h3>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={statusDistributionData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                                         label={({ name, percent }) => `${name} ${((percent || 0) * 100).toFixed(0)}%`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {statusDistributionData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>

            {/* Regional Performance */}
            <div className="bg-white dark:bg-card rounded-lg shadow-sm border border-gray-200 dark:border-border p-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-foreground mb-4">Regional Performance</h3>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={regionalData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="region" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="revenue" fill="#8884d8" />
                  <Bar dataKey="projects" fill="#82ca9d" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Customer Satisfaction */}
          <div className="bg-white dark:bg-card rounded-lg shadow-sm border border-gray-200 dark:border-border p-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-foreground mb-4">Customer Satisfaction Overview</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-gray-900 dark:text-foreground">
                  {analyticsData.customer_satisfaction.average.toFixed(1)}
                </div>
                <div className="text-sm text-gray-500 dark:text-muted-foreground">Average Rating</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-gray-900 dark:text-foreground">
                  {Object.keys(analyticsData.customer_satisfaction.distribution).length}
                </div>
                <div className="text-sm text-gray-500 dark:text-muted-foreground">Rating Categories</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-gray-900 dark:text-foreground">
                  {Math.max(...Object.values(analyticsData.customer_satisfaction.distribution))}
                </div>
                <div className="text-sm text-gray-500 dark:text-muted-foreground">Most Common Rating</div>
              </div>
            </div>
          </div>
        </div>
      </DashboardLayout>
    </ProtectedRoute>
  );
} 