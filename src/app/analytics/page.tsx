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

  // Branch color mapping
  const branchColors = {
    'Belfast': '#3B82F6',      // Blue
    'Newtownabbey': '#10B981', // Green
    'Lisburn': '#F59E0B',      // Yellow/Orange
    'Bangor': '#EF4444',       // Red
    'Coleraine': '#8B5CF6',    // Purple
    'Derry': '#06B6D4',        // Cyan
    'Newry': '#F97316',        // Orange
    'Other': '#6B7280'         // Gray
  };

  const getBranchColor = (branchName: string) => {
    return branchColors[branchName as keyof typeof branchColors] || branchColors['Other'];
  };

  const getBranchBgColor = (branchName: string) => {
    const color = getBranchColor(branchName);
    // Convert hex to rgba for background
    const r = parseInt(color.slice(1, 3), 16);
    const g = parseInt(color.slice(3, 5), 16);
    const b = parseInt(color.slice(5, 7), 16);
    return `rgba(${r}, ${g}, ${b}, 0.1)`;
  };

  const getBranchTextColor = (branchName: string) => {
    return getBranchColor(branchName);
  };

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

          {/* Branch Comparison Table */}
          <div className="bg-white dark:bg-card rounded-lg shadow-sm border border-gray-200 dark:border-border p-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-foreground mb-4">Branch Performance Comparison</h3>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                <thead className="bg-gray-50 dark:bg-gray-800">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                      Branch
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                      Projects
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                      Revenue (£)
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                      Avg Project Duration (days)
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                      Response Time (days)
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                      Contract Time (days)
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                      Performance Score
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white dark:bg-gray-900 divide-y divide-gray-200 dark:divide-gray-700">
                  {analyticsData.branch_performance_metrics?.map((branch, index) => {
                    // Find corresponding regional data for revenue
                    const regionalData = analyticsData.regional_performance.find(r => r.region === branch.branch);
                    const revenue = regionalData?.revenue || 0;
                    
                    // Calculate performance score (0-100) based on multiple factors
                    const maxProjects = Math.max(...(analyticsData.branch_performance_metrics?.map(b => b.projects_count) || [0]));
                    const maxRevenue = Math.max(...(analyticsData.regional_performance?.map(r => r.revenue) || [0]));
                    const minDuration = Math.min(...(analyticsData.branch_performance_metrics?.map(b => b.avg_project_duration || 999) || [999]));
                    const minResponse = Math.min(...(analyticsData.branch_performance_metrics?.map(b => b.avg_days_phone_to_measurement || 999) || [999]));
                    
                    const projectScore = (branch.projects_count / maxProjects) * 25;
                    const revenueScore = (revenue / maxRevenue) * 25;
                    const durationScore = ((minDuration / (branch.avg_project_duration || 999)) * 25);
                    const responseScore = ((minResponse / (branch.avg_days_phone_to_measurement || 999)) * 25);
                    
                    const performanceScore = Math.round(projectScore + revenueScore + durationScore + responseScore);
                    
                    return (
                      <tr key={branch.branch} className={index % 2 === 0 ? 'bg-gray-50 dark:bg-gray-800' : 'bg-white dark:bg-gray-900'}>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="flex-shrink-0 h-8 w-8">
                              <div 
                                className="h-8 w-8 rounded-full flex items-center justify-center"
                                style={{ 
                                  backgroundColor: getBranchBgColor(branch.branch),
                                  color: getBranchColor(branch.branch)
                                }}
                              >
                                <span className="text-sm font-medium">
                                  {branch.branch.charAt(0)}
                                </span>
                              </div>
                            </div>
                            <div className="ml-4">
                              <div className="text-sm font-medium text-gray-900 dark:text-foreground">
                                {branch.branch}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-foreground">
                          {branch.projects_count}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-foreground">
                          £{revenue.toLocaleString()}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-foreground">
                          {branch.avg_project_duration || 'N/A'}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-foreground">
                          {branch.avg_days_phone_to_measurement || 'N/A'}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-foreground">
                          {branch.avg_days_contact_to_contract || 'N/A'}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="flex-shrink-0">
                              <div className="w-16 bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                                <div 
                                  className={`h-2 rounded-full ${
                                    performanceScore >= 80 ? 'bg-green-500' :
                                    performanceScore >= 60 ? 'bg-yellow-500' :
                                    'bg-red-500'
                                  }`}
                                  style={{ width: `${performanceScore}%` }}
                                ></div>
                              </div>
                            </div>
                            <div className="ml-2 text-sm text-gray-900 dark:text-foreground">
                              {performanceScore}/100
                            </div>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
            
            {/* Summary Stats */}
            <div className="mt-6 grid grid-cols-1 md:grid-cols-4 gap-4 pt-4 border-t border-gray-200 dark:border-gray-700">
              <div className="text-center">
                <div className="text-lg font-semibold text-gray-900 dark:text-foreground">
                  {analyticsData.branch_performance_metrics?.length || 0}
                </div>
                <div className="text-sm text-gray-500 dark:text-muted-foreground">Total Branches</div>
              </div>
              <div className="text-center">
                <div className="text-lg font-semibold text-gray-900 dark:text-foreground">
                  {analyticsData.branch_performance_metrics?.reduce((sum, branch) => sum + branch.projects_count, 0) || 0}
                </div>
                <div className="text-sm text-gray-500 dark:text-muted-foreground">Total Projects</div>
              </div>
              <div className="text-center">
                <div className="text-lg font-semibold text-gray-900 dark:text-foreground">
                  £{(analyticsData.regional_performance?.reduce((sum, region) => sum + region.revenue, 0) || 0).toLocaleString()}
                </div>
                <div className="text-sm text-gray-500 dark:text-muted-foreground">Total Revenue</div>
              </div>
              <div className="text-center">
                <div className="text-lg font-semibold text-gray-900 dark:text-foreground">
                  {Math.round(
                    (analyticsData.branch_performance_metrics?.reduce((sum, branch) => sum + (branch.avg_project_duration || 0), 0) || 0) / 
                    (analyticsData.branch_performance_metrics?.filter(b => b.avg_project_duration).length || 1)
                  )}
                </div>
                <div className="text-sm text-gray-500 dark:text-muted-foreground">Avg Duration</div>
              </div>
            </div>
          </div>

          {/* Detailed Branch Analytics */}
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-foreground">Detailed Branch Analytics</h2>
            
            {analyticsData.detailed_branch_analytics?.map((branchData) => (
              <div key={branchData.branch} className="bg-white dark:bg-card rounded-lg shadow-sm border border-gray-200 dark:border-border p-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-foreground">{branchData.branch} Branch</h3>
                  <div className="flex items-center space-x-2">
                    <div 
                      className="w-3 h-3 rounded-full"
                      style={{ backgroundColor: getBranchColor(branchData.branch) }}
                    ></div>
                    <span className="text-sm text-gray-500 dark:text-muted-foreground">Active</span>
                  </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-5 gap-6">
                  {/* Operational Metrics */}
                  <div className="space-y-4">
                    <h4 className="text-lg font-medium text-gray-900 dark:text-foreground flex items-center">
                      <span className="mr-2">🔧</span>
                      Operational
                    </h4>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-500 dark:text-muted-foreground">Active Projects</span>
                        <span className="text-sm font-medium text-gray-900 dark:text-foreground">{branchData.operational.active_projects}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-500 dark:text-muted-foreground">Avg Duration</span>
                        <span className="text-sm font-medium text-gray-900 dark:text-foreground">{branchData.operational.avg_project_duration} days</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-500 dark:text-muted-foreground">Resource Utilization</span>
                        <span className="text-sm font-medium text-gray-900 dark:text-foreground">{branchData.operational.resource_utilization}%</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-500 dark:text-muted-foreground">On-time Delivery</span>
                        <span className="text-sm font-medium text-gray-900 dark:text-foreground">{branchData.operational.on_time_delivery_rate}%</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-500 dark:text-muted-foreground">Complaints</span>
                        <span className="text-sm font-medium text-gray-900 dark:text-foreground">{branchData.operational.complaints_count}</span>
                      </div>
                    </div>
                  </div>

                  {/* Financial Metrics */}
                  <div className="space-y-4">
                    <h4 className="text-lg font-medium text-gray-900 dark:text-foreground flex items-center">
                      <span className="mr-2">💰</span>
                      Financial
                    </h4>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-500 dark:text-muted-foreground">Revenue</span>
                        <span className="text-sm font-medium text-gray-900 dark:text-foreground">£{branchData.financial.revenue.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-500 dark:text-muted-foreground">Gross Margin</span>
                        <span className="text-sm font-medium text-gray-900 dark:text-foreground">{branchData.financial.gross_margin}%</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-500 dark:text-muted-foreground">Net Margin</span>
                        <span className="text-sm font-medium text-gray-900 dark:text-foreground">{branchData.financial.net_margin}%</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-500 dark:text-muted-foreground">Operational Costs</span>
                        <span className="text-sm font-medium text-gray-900 dark:text-foreground">£{branchData.financial.operational_costs.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-500 dark:text-muted-foreground">Revenue/Employee</span>
                        <span className="text-sm font-medium text-gray-900 dark:text-foreground">£{branchData.financial.revenue_per_employee.toLocaleString()}</span>
                      </div>
                    </div>
                  </div>

                  {/* HR Metrics */}
                  <div className="space-y-4">
                    <h4 className="text-lg font-medium text-gray-900 dark:text-foreground flex items-center">
                      <span className="mr-2">👥</span>
                      HR
                    </h4>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-500 dark:text-muted-foreground">Employees</span>
                        <span className="text-sm font-medium text-gray-900 dark:text-foreground">{branchData.hr.employee_count}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-500 dark:text-muted-foreground">Avg Tenure</span>
                        <span className="text-sm font-medium text-gray-900 dark:text-foreground">{branchData.hr.avg_tenure} years</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-500 dark:text-muted-foreground">Turnover Rate</span>
                        <span className="text-sm font-medium text-gray-900 dark:text-foreground">{branchData.hr.turnover_rate}%</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-500 dark:text-muted-foreground">Productivity/Employee</span>
                        <span className="text-sm font-medium text-gray-900 dark:text-foreground">{branchData.hr.productivity_per_employee} projects</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-500 dark:text-muted-foreground">Overtime Hours</span>
                        <span className="text-sm font-medium text-gray-900 dark:text-foreground">{branchData.hr.overtime_hours}h</span>
                      </div>
                    </div>
                  </div>

                  {/* Quality Metrics */}
                  <div className="space-y-4">
                    <h4 className="text-lg font-medium text-gray-900 dark:text-foreground flex items-center">
                      <span className="mr-2">🎯</span>
                      Quality
                    </h4>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-500 dark:text-muted-foreground">Customer Satisfaction</span>
                        <span className="text-sm font-medium text-gray-900 dark:text-foreground">{branchData.quality.customer_satisfaction}/5</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-500 dark:text-muted-foreground">Complaints Rate</span>
                        <span className="text-sm font-medium text-gray-900 dark:text-foreground">{branchData.quality.complaints_rate}%</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-500 dark:text-muted-foreground">Repeat Orders</span>
                        <span className="text-sm font-medium text-gray-900 dark:text-foreground">{branchData.quality.repeat_orders_rate}%</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-500 dark:text-muted-foreground">Response Time</span>
                        <span className="text-sm font-medium text-gray-900 dark:text-foreground">{branchData.quality.response_time} days</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-500 dark:text-muted-foreground">Audit Score</span>
                        <span className="text-sm font-medium text-gray-900 dark:text-foreground">{branchData.quality.quality_audit_score}/100</span>
                      </div>
                    </div>
                  </div>

                  {/* Growth Metrics */}
                  <div className="space-y-4">
                    <h4 className="text-lg font-medium text-gray-900 dark:text-foreground flex items-center">
                      <span className="mr-2">📈</span>
                      Growth
                    </h4>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-500 dark:text-muted-foreground">New Contracts</span>
                        <span className="text-sm font-medium text-gray-900 dark:text-foreground">{branchData.growth.new_contracts}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-500 dark:text-muted-foreground">Market Share Growth</span>
                        <span className="text-sm font-medium text-gray-900 dark:text-foreground">{branchData.growth.market_share_growth}%</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-500 dark:text-muted-foreground">New Customers</span>
                        <span className="text-sm font-medium text-gray-900 dark:text-foreground">{branchData.growth.new_customers}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-500 dark:text-muted-foreground">Expansion Projects</span>
                        <span className="text-sm font-medium text-gray-900 dark:text-foreground">{branchData.growth.expansion_projects}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-500 dark:text-muted-foreground">ROI</span>
                        <span className="text-sm font-medium text-gray-900 dark:text-foreground">{branchData.financial.roi}%</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Performance Indicators */}
                <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
                  <h5 className="text-md font-medium text-gray-900 dark:text-foreground mb-4">Performance Indicators</h5>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="text-center p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                      <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                        {branchData.operational.on_time_delivery_rate}%
                      </div>
                      <div className="text-sm text-gray-500 dark:text-muted-foreground">On-time Delivery</div>
                    </div>
                    <div className="text-center p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                      <div className="text-2xl font-bold text-green-600 dark:text-green-400">
                        {branchData.quality.customer_satisfaction}/5
                      </div>
                      <div className="text-sm text-gray-500 dark:text-muted-foreground">Customer Satisfaction</div>
                    </div>
                    <div className="text-center p-3 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                      <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">
                        {branchData.financial.net_margin}%
                      </div>
                      <div className="text-sm text-gray-500 dark:text-muted-foreground">Net Margin</div>
                    </div>
                    <div className="text-center p-3 bg-orange-50 dark:bg-orange-900/20 rounded-lg">
                      <div className="text-2xl font-bold text-orange-600 dark:text-orange-400">
                        {branchData.growth.market_share_growth}%
                      </div>
                      <div className="text-sm text-gray-500 dark:text-muted-foreground">Market Growth</div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Branch Comparison Charts */}
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-foreground">Branch Comparison Charts</h2>
            
            {/* Operational Metrics Comparison */}
            <div className="space-y-6">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-foreground flex items-center">
                <span className="mr-2">🔧</span>
                Operational Metrics
              </h3>
              <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                <div className="bg-white dark:bg-card rounded-lg shadow-sm border border-gray-200 dark:border-border p-6">
                  <h4 className="text-xl font-semibold text-gray-900 dark:text-foreground mb-4">Active Projects</h4>
                  <ResponsiveContainer width="100%" height={250}>
                    <BarChart data={analyticsData.detailed_branch_analytics?.map(branch => ({
                      branch: branch.branch,
                      value: branch.operational.active_projects
                    }))}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="branch" />
                      <YAxis />
                      <Tooltip />
                      <Bar dataKey="value">
                        {analyticsData.detailed_branch_analytics?.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={getBranchColor(entry.branch)} />
                        ))}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </div>

                <div className="bg-white dark:bg-card rounded-lg shadow-sm border border-gray-200 dark:border-border p-6">
                  <h4 className="text-xl font-semibold text-gray-900 dark:text-foreground mb-4">Avg Duration (days)</h4>
                  <ResponsiveContainer width="100%" height={250}>
                    <BarChart data={analyticsData.detailed_branch_analytics?.map(branch => ({
                      branch: branch.branch,
                      value: branch.operational.avg_project_duration
                    }))}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="branch" />
                      <YAxis />
                      <Tooltip />
                      <Bar dataKey="value">
                        {analyticsData.detailed_branch_analytics?.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={getBranchColor(entry.branch)} />
                        ))}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </div>

                <div className="bg-white dark:bg-card rounded-lg shadow-sm border border-gray-200 dark:border-border p-6">
                  <h4 className="text-xl font-semibold text-gray-900 dark:text-foreground mb-4">Resource Utilization (%)</h4>
                  <ResponsiveContainer width="100%" height={250}>
                    <BarChart data={analyticsData.detailed_branch_analytics?.map(branch => ({
                      branch: branch.branch,
                      value: branch.operational.resource_utilization
                    }))}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="branch" />
                      <YAxis domain={[0, 100]} />
                      <Tooltip formatter={(value) => [`${value}%`, 'Utilization']} />
                      <Bar dataKey="value">
                        {analyticsData.detailed_branch_analytics?.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={getBranchColor(entry.branch)} />
                        ))}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </div>

                <div className="bg-white dark:bg-card rounded-lg shadow-sm border border-gray-200 dark:border-border p-6">
                  <h4 className="text-xl font-semibold text-gray-900 dark:text-foreground mb-4">On-time Delivery (%)</h4>
                  <ResponsiveContainer width="100%" height={250}>
                    <BarChart data={analyticsData.detailed_branch_analytics?.map(branch => ({
                      branch: branch.branch,
                      value: branch.operational.on_time_delivery_rate
                    }))}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="branch" />
                      <YAxis domain={[0, 100]} />
                      <Tooltip formatter={(value) => [`${value}%`, 'On-time']} />
                      <Bar dataKey="value">
                        {analyticsData.detailed_branch_analytics?.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={getBranchColor(entry.branch)} />
                        ))}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </div>

                <div className="bg-white dark:bg-card rounded-lg shadow-sm border border-gray-200 dark:border-border p-6">
                  <h4 className="text-xl font-semibold text-gray-900 dark:text-foreground mb-4">Complaints Count</h4>
                  <ResponsiveContainer width="100%" height={250}>
                    <BarChart data={analyticsData.detailed_branch_analytics?.map(branch => ({
                      branch: branch.branch,
                      value: branch.operational.complaints_count
                    }))}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="branch" />
                      <YAxis />
                      <Tooltip />
                      <Bar dataKey="value">
                        {analyticsData.detailed_branch_analytics?.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={getBranchColor(entry.branch)} />
                        ))}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </div>

                <div className="bg-white dark:bg-card rounded-lg shadow-sm border border-gray-200 dark:border-border p-6">
                  <h4 className="text-xl font-semibold text-gray-900 dark:text-foreground mb-4">Returns Count</h4>
                  <ResponsiveContainer width="100%" height={250}>
                    <BarChart data={analyticsData.detailed_branch_analytics?.map(branch => ({
                      branch: branch.branch,
                      value: branch.operational.returns_count
                    }))}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="branch" />
                      <YAxis />
                      <Tooltip />
                      <Bar dataKey="value">
                        {analyticsData.detailed_branch_analytics?.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={getBranchColor(entry.branch)} />
                        ))}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>

            {/* Financial Metrics Comparison */}
            <div className="space-y-6">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-foreground flex items-center">
                <span className="mr-2">💰</span>
                Financial Metrics
              </h3>
              <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                <div className="bg-white dark:bg-card rounded-lg shadow-sm border border-gray-200 dark:border-border p-6">
                  <h4 className="text-xl font-semibold text-gray-900 dark:text-foreground mb-4">Revenue (£)</h4>
                  <ResponsiveContainer width="100%" height={250}>
                    <BarChart data={analyticsData.detailed_branch_analytics?.map(branch => ({
                      branch: branch.branch,
                      value: branch.financial.revenue
                    }))}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="branch" />
                      <YAxis />
                      <Tooltip formatter={(value) => [`£${value.toLocaleString()}`, 'Revenue']} />
                      <Bar dataKey="value">
                        {analyticsData.detailed_branch_analytics?.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={getBranchColor(entry.branch)} />
                        ))}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </div>

                <div className="bg-white dark:bg-card rounded-lg shadow-sm border border-gray-200 dark:border-border p-6">
                  <h4 className="text-xl font-semibold text-gray-900 dark:text-foreground mb-4">Gross Margin (%)</h4>
                  <ResponsiveContainer width="100%" height={250}>
                    <BarChart data={analyticsData.detailed_branch_analytics?.map(branch => ({
                      branch: branch.branch,
                      value: branch.financial.gross_margin
                    }))}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="branch" />
                      <YAxis domain={[0, 50]} />
                      <Tooltip formatter={(value) => [`${value}%`, 'Gross Margin']} />
                      <Bar dataKey="value">
                        {analyticsData.detailed_branch_analytics?.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={getBranchColor(entry.branch)} />
                        ))}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </div>

                <div className="bg-white dark:bg-card rounded-lg shadow-sm border border-gray-200 dark:border-border p-6">
                  <h4 className="text-xl font-semibold text-gray-900 dark:text-foreground mb-4">Net Margin (%)</h4>
                  <ResponsiveContainer width="100%" height={250}>
                    <BarChart data={analyticsData.detailed_branch_analytics?.map(branch => ({
                      branch: branch.branch,
                      value: branch.financial.net_margin
                    }))}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="branch" />
                      <YAxis domain={[0, 30]} />
                      <Tooltip formatter={(value) => [`${value}%`, 'Net Margin']} />
                      <Bar dataKey="value">
                        {analyticsData.detailed_branch_analytics?.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={getBranchColor(entry.branch)} />
                        ))}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </div>

                <div className="bg-white dark:bg-card rounded-lg shadow-sm border border-gray-200 dark:border-border p-6">
                  <h4 className="text-xl font-semibold text-gray-900 dark:text-foreground mb-4">Operational Costs (£)</h4>
                  <ResponsiveContainer width="100%" height={250}>
                    <BarChart data={analyticsData.detailed_branch_analytics?.map(branch => ({
                      branch: branch.branch,
                      value: branch.financial.operational_costs
                    }))}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="branch" />
                      <YAxis />
                      <Tooltip formatter={(value) => [`£${value.toLocaleString()}`, 'Costs']} />
                      <Bar dataKey="value">
                        {analyticsData.detailed_branch_analytics?.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={getBranchColor(entry.branch)} />
                        ))}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </div>

                <div className="bg-white dark:bg-card rounded-lg shadow-sm border border-gray-200 dark:border-border p-6">
                  <h4 className="text-xl font-semibold text-gray-900 dark:text-foreground mb-4">Revenue/Employee (£)</h4>
                  <ResponsiveContainer width="100%" height={250}>
                    <BarChart data={analyticsData.detailed_branch_analytics?.map(branch => ({
                      branch: branch.branch,
                      value: branch.financial.revenue_per_employee
                    }))}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="branch" />
                      <YAxis />
                      <Tooltip formatter={(value) => [`£${value.toLocaleString()}`, 'Revenue/Employee']} />
                      <Bar dataKey="value">
                        {analyticsData.detailed_branch_analytics?.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={getBranchColor(entry.branch)} />
                        ))}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </div>

                <div className="bg-white dark:bg-card rounded-lg shadow-sm border border-gray-200 dark:border-border p-6">
                  <h4 className="text-xl font-semibold text-gray-900 dark:text-foreground mb-4">ROI (%)</h4>
                  <ResponsiveContainer width="100%" height={250}>
                    <BarChart data={analyticsData.detailed_branch_analytics?.map(branch => ({
                      branch: branch.branch,
                      value: branch.financial.roi
                    }))}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="branch" />
                      <YAxis domain={[0, 25]} />
                      <Tooltip formatter={(value) => [`${value}%`, 'ROI']} />
                      <Bar dataKey="value">
                        {analyticsData.detailed_branch_analytics?.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={getBranchColor(entry.branch)} />
                        ))}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>

            {/* HR Metrics Comparison */}
            <div className="space-y-6">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-foreground flex items-center">
                <span className="mr-2">👥</span>
                HR Metrics
              </h3>
              <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                <div className="bg-white dark:bg-card rounded-lg shadow-sm border border-gray-200 dark:border-border p-6">
                  <h4 className="text-xl font-semibold text-gray-900 dark:text-foreground mb-4">Employee Count</h4>
                  <ResponsiveContainer width="100%" height={250}>
                    <BarChart data={analyticsData.detailed_branch_analytics?.map(branch => ({
                      branch: branch.branch,
                      value: branch.hr.employee_count
                    }))}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="branch" />
                      <YAxis />
                      <Tooltip />
                      <Bar dataKey="value">
                        {analyticsData.detailed_branch_analytics?.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={getBranchColor(entry.branch)} />
                        ))}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </div>

                <div className="bg-white dark:bg-card rounded-lg shadow-sm border border-gray-200 dark:border-border p-6">
                  <h4 className="text-xl font-semibold text-gray-900 dark:text-foreground mb-4">Avg Tenure (years)</h4>
                  <ResponsiveContainer width="100%" height={250}>
                    <BarChart data={analyticsData.detailed_branch_analytics?.map(branch => ({
                      branch: branch.branch,
                      value: branch.hr.avg_tenure
                    }))}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="branch" />
                      <YAxis domain={[0, 5]} />
                      <Tooltip formatter={(value) => [`${value} years`, 'Tenure']} />
                      <Bar dataKey="value">
                        {analyticsData.detailed_branch_analytics?.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={getBranchColor(entry.branch)} />
                        ))}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </div>

                <div className="bg-white dark:bg-card rounded-lg shadow-sm border border-gray-200 dark:border-border p-6">
                  <h4 className="text-xl font-semibold text-gray-900 dark:text-foreground mb-4">Turnover Rate (%)</h4>
                  <ResponsiveContainer width="100%" height={250}>
                    <BarChart data={analyticsData.detailed_branch_analytics?.map(branch => ({
                      branch: branch.branch,
                      value: branch.hr.turnover_rate
                    }))}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="branch" />
                      <YAxis domain={[0, 15]} />
                      <Tooltip formatter={(value) => [`${value}%`, 'Turnover']} />
                      <Bar dataKey="value">
                        {analyticsData.detailed_branch_analytics?.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={getBranchColor(entry.branch)} />
                        ))}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </div>

                <div className="bg-white dark:bg-card rounded-lg shadow-sm border border-gray-200 dark:border-border p-6">
                  <h4 className="text-xl font-semibold text-gray-900 dark:text-foreground mb-4">Productivity/Employee (projects)</h4>
                  <ResponsiveContainer width="100%" height={250}>
                    <BarChart data={analyticsData.detailed_branch_analytics?.map(branch => ({
                      branch: branch.branch,
                      value: branch.hr.productivity_per_employee
                    }))}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="branch" />
                      <YAxis />
                      <Tooltip formatter={(value) => [`${value} projects`, 'Productivity']} />
                      <Bar dataKey="value">
                        {analyticsData.detailed_branch_analytics?.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={getBranchColor(entry.branch)} />
                        ))}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </div>

                <div className="bg-white dark:bg-card rounded-lg shadow-sm border border-gray-200 dark:border-border p-6">
                  <h4 className="text-xl font-semibold text-gray-900 dark:text-foreground mb-4">Overtime Hours</h4>
                  <ResponsiveContainer width="100%" height={250}>
                    <BarChart data={analyticsData.detailed_branch_analytics?.map(branch => ({
                      branch: branch.branch,
                      value: branch.hr.overtime_hours
                    }))}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="branch" />
                      <YAxis />
                      <Tooltip formatter={(value) => [`${value}h`, 'Overtime']} />
                      <Bar dataKey="value">
                        {analyticsData.detailed_branch_analytics?.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={getBranchColor(entry.branch)} />
                        ))}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>

            {/* Quality Metrics Comparison */}
            <div className="space-y-6">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-foreground flex items-center">
                <span className="mr-2">🎯</span>
                Quality Metrics
              </h3>
              <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                <div className="bg-white dark:bg-card rounded-lg shadow-sm border border-gray-200 dark:border-border p-6">
                  <h4 className="text-xl font-semibold text-gray-900 dark:text-foreground mb-4">Customer Satisfaction (/5)</h4>
                  <ResponsiveContainer width="100%" height={250}>
                    <BarChart data={analyticsData.detailed_branch_analytics?.map(branch => ({
                      branch: branch.branch,
                      value: branch.quality.customer_satisfaction
                    }))}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="branch" />
                      <YAxis domain={[0, 5]} />
                      <Tooltip formatter={(value) => [`${value}/5`, 'Satisfaction']} />
                      <Bar dataKey="value">
                        {analyticsData.detailed_branch_analytics?.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={getBranchColor(entry.branch)} />
                        ))}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </div>

                <div className="bg-white dark:bg-card rounded-lg shadow-sm border border-gray-200 dark:border-border p-6">
                  <h4 className="text-xl font-semibold text-gray-900 dark:text-foreground mb-4">Complaints Rate (%)</h4>
                  <ResponsiveContainer width="100%" height={250}>
                    <BarChart data={analyticsData.detailed_branch_analytics?.map(branch => ({
                      branch: branch.branch,
                      value: branch.quality.complaints_rate
                    }))}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="branch" />
                      <YAxis domain={[0, 5]} />
                      <Tooltip formatter={(value) => [`${value}%`, 'Complaints']} />
                      <Bar dataKey="value">
                        {analyticsData.detailed_branch_analytics?.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={getBranchColor(entry.branch)} />
                        ))}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </div>

                <div className="bg-white dark:bg-card rounded-lg shadow-sm border border-gray-200 dark:border-border p-6">
                  <h4 className="text-xl font-semibold text-gray-900 dark:text-foreground mb-4">Repeat Orders (%)</h4>
                  <ResponsiveContainer width="100%" height={250}>
                    <BarChart data={analyticsData.detailed_branch_analytics?.map(branch => ({
                      branch: branch.branch,
                      value: branch.quality.repeat_orders_rate
                    }))}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="branch" />
                      <YAxis domain={[0, 20]} />
                      <Tooltip formatter={(value) => [`${value}%`, 'Repeat Orders']} />
                      <Bar dataKey="value">
                        {analyticsData.detailed_branch_analytics?.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={getBranchColor(entry.branch)} />
                        ))}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </div>

                <div className="bg-white dark:bg-card rounded-lg shadow-sm border border-gray-200 dark:border-border p-6">
                  <h4 className="text-xl font-semibold text-gray-900 dark:text-foreground mb-4">Response Time (days)</h4>
                  <ResponsiveContainer width="100%" height={250}>
                    <BarChart data={analyticsData.detailed_branch_analytics?.map(branch => ({
                      branch: branch.branch,
                      value: branch.quality.response_time
                    }))}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="branch" />
                      <YAxis domain={[0, 5]} />
                      <Tooltip formatter={(value) => [`${value} days`, 'Response Time']} />
                      <Bar dataKey="value">
                        {analyticsData.detailed_branch_analytics?.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={getBranchColor(entry.branch)} />
                        ))}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </div>

                <div className="bg-white dark:bg-card rounded-lg shadow-sm border border-gray-200 dark:border-border p-6">
                  <h4 className="text-xl font-semibold text-gray-900 dark:text-foreground mb-4">Audit Score (/100)</h4>
                  <ResponsiveContainer width="100%" height={250}>
                    <BarChart data={analyticsData.detailed_branch_analytics?.map(branch => ({
                      branch: branch.branch,
                      value: branch.quality.quality_audit_score
                    }))}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="branch" />
                      <YAxis domain={[0, 100]} />
                      <Tooltip formatter={(value) => [`${value}/100`, 'Audit Score']} />
                      <Bar dataKey="value">
                        {analyticsData.detailed_branch_analytics?.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={getBranchColor(entry.branch)} />
                        ))}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>

            {/* Growth Metrics Comparison */}
            <div className="space-y-6">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-foreground flex items-center">
                <span className="mr-2">📈</span>
                Growth Metrics
              </h3>
              <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                <div className="bg-white dark:bg-card rounded-lg shadow-sm border border-gray-200 dark:border-border p-6">
                  <h4 className="text-xl font-semibold text-gray-900 dark:text-foreground mb-4">New Contracts</h4>
                  <ResponsiveContainer width="100%" height={250}>
                    <BarChart data={analyticsData.detailed_branch_analytics?.map(branch => ({
                      branch: branch.branch,
                      value: branch.growth.new_contracts
                    }))}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="branch" />
                      <YAxis />
                      <Tooltip />
                      <Bar dataKey="value">
                        {analyticsData.detailed_branch_analytics?.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={getBranchColor(entry.branch)} />
                        ))}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </div>

                <div className="bg-white dark:bg-card rounded-lg shadow-sm border border-gray-200 dark:border-border p-6">
                  <h4 className="text-xl font-semibold text-gray-900 dark:text-foreground mb-4">Market Share Growth (%)</h4>
                  <ResponsiveContainer width="100%" height={250}>
                    <BarChart data={analyticsData.detailed_branch_analytics?.map(branch => ({
                      branch: branch.branch,
                      value: branch.growth.market_share_growth
                    }))}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="branch" />
                      <YAxis domain={[0, 5]} />
                      <Tooltip formatter={(value) => [`${value}%`, 'Market Growth']} />
                      <Bar dataKey="value">
                        {analyticsData.detailed_branch_analytics?.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={getBranchColor(entry.branch)} />
                        ))}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </div>

                <div className="bg-white dark:bg-card rounded-lg shadow-sm border border-gray-200 dark:border-border p-6">
                  <h4 className="text-xl font-semibold text-gray-900 dark:text-foreground mb-4">New Customers</h4>
                  <ResponsiveContainer width="100%" height={250}>
                    <BarChart data={analyticsData.detailed_branch_analytics?.map(branch => ({
                      branch: branch.branch,
                      value: branch.growth.new_customers
                    }))}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="branch" />
                      <YAxis />
                      <Tooltip />
                      <Bar dataKey="value">
                        {analyticsData.detailed_branch_analytics?.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={getBranchColor(entry.branch)} />
                        ))}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </div>

                <div className="bg-white dark:bg-card rounded-lg shadow-sm border border-gray-200 dark:border-border p-6">
                  <h4 className="text-xl font-semibold text-gray-900 dark:text-foreground mb-4">Expansion Projects</h4>
                  <ResponsiveContainer width="100%" height={250}>
                    <BarChart data={analyticsData.detailed_branch_analytics?.map(branch => ({
                      branch: branch.branch,
                      value: branch.growth.expansion_projects
                    }))}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="branch" />
                      <YAxis />
                      <Tooltip />
                      <Bar dataKey="value">
                        {analyticsData.detailed_branch_analytics?.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={getBranchColor(entry.branch)} />
                        ))}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>
          </div>
        </div>
      </DashboardLayout>
    </ProtectedRoute>
  );
} 