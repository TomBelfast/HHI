'use client';

import { useState } from 'react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

export default function ReportsPage() {
  const [selectedReport, setSelectedReport] = useState<string>('');

  const reports = [
    {
      id: 'monthly-performance',
      title: 'Monthly Report',
      description: 'Overview of all branches performance in current month',
      icon: '📊',
      category: 'Performance',
      lastGenerated: '2024-12-15',
      status: 'Available'
    },
    {
      id: 'customer-satisfaction',
      title: 'Customer Satisfaction',
      description: 'Analysis of customer ratings and feedback by branches',
      icon: '⭐',
      category: 'Customers',
      lastGenerated: '2024-12-14',
      status: 'Available'
    },
    {
      id: 'project-pipeline',
      title: 'Project Pipeline',
      description: 'Overview of projects in different implementation phases',
      icon: '🔨',
      category: 'Projects',
      lastGenerated: '2024-12-13',
      status: 'Available'
    },
    {
      id: 'financial-summary',
      title: 'Financial Summary',
      description: 'Report on revenue, costs and profitability',
      icon: '💰',
      category: 'Finance',
      lastGenerated: '2024-12-12',
      status: 'Available'
    },
    {
      id: 'branch-comparison',
      title: 'Branch Comparison',
      description: 'Detailed comparison of branch performance',
      icon: '🏢',
      category: 'Performance',
      lastGenerated: '2024-12-11',
      status: 'Available'
    },
    {
      id: 'contractor-performance',
      title: 'Contractor Performance',
      description: 'Analysis of contractor work and ratings',
      icon: '👷',
      category: 'Resources',
      lastGenerated: '2024-12-10',
      status: 'Available'
    }
  ];

  const categories = ['All', 'Performance', 'Customers', 'Projects', 'Finance', 'Resources'];

  const handleGenerateReport = (reportId: string) => {
    setSelectedReport(reportId);
    // In real application this would be report generation logic
    console.log(`Generating report: ${reportId}`);
  };

  const handleDownloadReport = (reportId: string) => {
    // In real application this would be report download logic
    console.log(`Downloading report: ${reportId}`);
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Reports</h1>
            <p className="mt-2 text-sm text-gray-600">
              Generate and download detailed HHI reports
            </p>
          </div>
          <div className="mt-4 sm:mt-0">
            <Button variant="default">
              + New Report
            </Button>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                  <span className="text-blue-600 text-sm font-medium">📊</span>
                </div>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">Available Reports</p>
                <p className="text-2xl font-bold text-gray-900">{reports.length}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                  <span className="text-green-600 text-sm font-medium">✅</span>
                </div>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">Recently Generated</p>
                <p className="text-2xl font-bold text-gray-900">6</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="w-8 h-8 bg-yellow-100 rounded-full flex items-center justify-center">
                  <span className="text-yellow-600 text-sm font-medium">📈</span>
                </div>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">Categories</p>
                <p className="text-2xl font-bold text-gray-900">{categories.length - 1}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                  <span className="text-purple-600 text-sm font-medium">⚡</span>
                </div>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">Average Generation Time</p>
                <p className="text-2xl font-bold text-gray-900">2.5s</p>
              </div>
            </div>
          </div>
        </div>

        {/* Reports Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {reports.map((report) => (
            <Card key={report.id} className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center">
                  <span className="text-2xl mr-3">{report.icon}</span>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900">
                      {report.title}
                    </h3>
                    <Badge variant="secondary" className="mt-1">
                      {report.category}
                    </Badge>
                  </div>
                </div>
              </div>
              
              <p className="text-sm text-gray-600 mb-4">
                {report.description}
              </p>
              
              <div className="flex items-center justify-between mb-4">
                <div className="text-xs text-gray-500">
                  Last generated: {report.lastGenerated}
                </div>
                <Badge variant="default">
                  {report.status}
                </Badge>
              </div>
              
              <div className="flex space-x-2">
                <Button 
                  variant="default" 
                  size="sm"
                  onClick={() => handleGenerateReport(report.id)}
                  className="flex-1"
                >
                  Generate
                </Button>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => handleDownloadReport(report.id)}
                >
                  📥
                </Button>
              </div>
            </Card>
          ))}
        </div>

        {/* Report Generation Status */}
        {selectedReport && (
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">
              Report Generation Status
            </h3>
            <div className="flex items-center space-x-4">
              <div className="flex-shrink-0">
                <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                  <span className="text-green-600 text-sm font-medium">✅</span>
                </div>
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-900">
                  Report "{reports.find(r => r.id === selectedReport)?.title}" has been generated
                </p>
                <p className="text-sm text-gray-500">
                  Ready for download in PDF format
                </p>
              </div>
              <Button variant="default" size="sm">
                Download PDF
              </Button>
            </div>
          </div>
        )}

        {/* Report Templates */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h3 className="text-xl font-semibold text-gray-900 mb-4">
            Report Templates
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="border border-gray-200 rounded-lg p-4">
              <h4 className="font-medium text-gray-900 mb-2">Monthly Report</h4>
              <p className="text-sm text-gray-600 mb-3">
                Standard monthly report with performance metrics
              </p>
              <Button variant="outline" size="sm">
                Use Template
              </Button>
            </div>
            <div className="border border-gray-200 rounded-lg p-4">
              <h4 className="font-medium text-gray-900 mb-2">Quarterly Report</h4>
              <p className="text-sm text-gray-600 mb-3">
                Detailed quarterly report with trend analysis
              </p>
              <Button variant="outline" size="sm">
                Use Template
              </Button>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
} 