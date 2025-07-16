'use client';

import { useEffect, useState } from 'react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { MetricCard } from '@/components/ui/MetricCard';
import { ProjectCard } from '@/components/ui/ProjectCard';
import { DataTable } from '@/components/ui/DataTable';
import { apiService } from '@/lib/api';
import { Customer, Project } from '@/lib/mock-data';

export default function DashboardPage() {
  const [dashboardData, setDashboardData] = useState<{
    totalCustomers: number;
    totalProjects: number;
    activeProjects: number;
    totalRevenue: number;
    recentProjects: Project[];
    topCustomers: Customer[];
  } | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadDashboardData = async () => {
      try {
        const response = await apiService.getDashboardSummary();
        setDashboardData(response.data);
      } catch (error) {
        console.error('Error loading dashboard data:', error);
      } finally {
        setLoading(false);
      }
    };

    loadDashboardData();
  }, []);

  if (loading) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center h-64">
          <div className="text-lg">Loading data...</div>
        </div>
      </DashboardLayout>
    );
  }

  if (!dashboardData) {
    return (
      <DashboardLayout>
        <div className="text-center text-red-600">
          Error loading data
        </div>
      </DashboardLayout>
    );
  }

  const metrics = [
    {
      title: "Total Customers",
      value: dashboardData.totalCustomers,
      change: "+12%",
      trend: "up" as const,
      icon: "👥"
    },
    {
      title: "Active Projects",
      value: dashboardData.activeProjects,
      change: "+5%",
      trend: "up" as const,
      icon: "🔨"
    },
    {
      title: "Total Projects",
      value: dashboardData.totalProjects,
      change: "+8%",
      trend: "up" as const,
      icon: "📋"
    },
    {
      title: "Revenue (£)",
      value: `£${dashboardData.totalRevenue.toLocaleString()}`,
      change: "+15%",
      trend: "up" as const,
      icon: "💰"
    }
  ];

  const recentProjectsColumns = [
    { key: 'title', label: 'Project' },
    { key: 'customerId', label: 'Customer' },
    { key: 'status', label: 'Status' },
    { key: 'value', label: 'Value' },
    { key: 'branch', label: 'Branch' }
  ];

  const topCustomersColumns = [
    { key: 'name', label: 'Name' },
    { key: 'email', label: 'Email' },
    { key: 'totalProjects', label: 'Projects' },
    { key: 'totalValue', label: 'Value' },
    { key: 'rating', label: 'Rating' }
  ];

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-foreground">Dashboard</h1>
            <p className="mt-2 text-sm text-gray-600 dark:text-muted-foreground">
              HHI Business Overview - All Branches
            </p>
          </div>
          <div className="mt-4 sm:mt-0">
            <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
              System Online
            </span>
          </div>
        </div>

        {/* Metrics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {metrics.map((metric, index) => (
            <MetricCard
              key={index}
              title={metric.title}
              value={metric.value}
              change={metric.change}
              trend={metric.trend}
              icon={metric.icon}
            />
          ))}
        </div>

        {/* Recent Projects & Top Customers */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Recent Projects */}
          <div className="bg-white dark:bg-card rounded-lg shadow-sm border border-gray-200 dark:border-border">
            <div className="p-6">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-card-foreground mb-4">
                Recent Projects
              </h3>
              <div className="space-y-4">
                {dashboardData.recentProjects.map((project) => (
                  <ProjectCard
                    key={project.id}
                    project={project}
                    customer={dashboardData.topCustomers.find(c => 
                      project.customerId === c.id
                    )}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Top Customers */}
          <div className="bg-white dark:bg-card rounded-lg shadow-sm border border-gray-200 dark:border-border">
            <div className="p-6">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-card-foreground mb-4">
                Top Customers
              </h3>
              <DataTable
                data={dashboardData.topCustomers}
                columns={topCustomersColumns}
                itemsPerPage={5}
                showPagination={false}
              />
            </div>
          </div>
        </div>

        {/* All Projects Table */}
        <div className="bg-white dark:bg-card rounded-lg shadow-sm border border-gray-200 dark:border-border">
          <div className="p-6">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-card-foreground mb-4">
              All Projects
            </h3>
            <DataTable
              data={dashboardData.recentProjects}
              columns={recentProjectsColumns}
              itemsPerPage={10}
              showPagination={true}
            />
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
