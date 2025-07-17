'use client';

import { useState } from 'react';
import React from 'react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { ProtectedRoute } from '@/components/auth/ProtectedRoute';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { PERMISSIONS } from '@/lib/auth';
import { mockCustomers, mockProjects, mockUsers, mockAnalytics } from '@/lib/mock-data';
import { getBranchColor } from '@/lib/colors';
import * as Dialog from '@radix-ui/react-dialog';
import { X } from 'lucide-react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import ChartDataLabels from 'chartjs-plugin-datalabels';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ChartDataLabels
);

interface ReportData {
  id: string;
  title: string;
  type: 'financial' | 'project' | 'customer' | 'employee' | 'branch' | 'custom';
  generatedAt: string;
  data: any;
}

export default function ReportsPage() {
  const [generatedReports, setGeneratedReports] = useState<ReportData[]>([]);
  const [isGenerating, setIsGenerating] = useState<string | null>(null);
  const [selectedReport, setSelectedReport] = useState<ReportData | null>(null);



  const getBranchChartColor = (branchName: string) => {
    const branchChartColors: Record<string, string> = {
      'Belfast': '#3B82F6', // blue
      'Newtownabbey': '#10B981', // green
      'Lisburn': '#F59E0B', // yellow/orange
      'Bangor': '#EF4444', // red
      'Coleraine': '#8B5CF6' // purple
    };
    
    return branchChartColors[branchName] || '#6b7280'; // gray-500
  };

  const generateReport = async (reportType: string, title: string) => {
    setIsGenerating(reportType);
    
    // Symulacja generowania raportu
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    let reportData: any = {};
    
    switch (reportType) {
      case 'monthly-revenue':
        reportData = generateMonthlyRevenueReport();
        break;
      case 'project-status':
        reportData = generateProjectStatusReport();
        break;
      case 'customer-analytics':
        reportData = generateCustomerAnalyticsReport();
        break;
      case 'employee-performance':
        reportData = generateEmployeePerformanceReport();
        break;
      case 'branch-comparison':
        reportData = generateBranchComparisonReport();
        break;
      case 'quarterly-performance':
        reportData = generateQuarterlyPerformanceReport();
        break;
      case 'project-profitability':
        reportData = generateProjectProfitabilityReport();
        break;
      case 'timeline-analysis':
        reportData = generateTimelineAnalysisReport();
        break;
      case 'customer-satisfaction':
        reportData = generateCustomerSatisfactionReport();
        break;
      case 'employee-rankings':
        reportData = generateEmployeeRankingsReport();
        break;
      case 'branch-kpis':
        reportData = generateBranchKPIsReport();
        break;
      default:
        reportData = { message: 'Report type not implemented' };
    }
    
    const newReport: ReportData = {
      id: `report-${Date.now()}`,
      title,
      type: getReportType(reportType),
      generatedAt: new Date().toISOString(),
      data: reportData
    };
    
    setGeneratedReports(prev => [newReport, ...prev]);
    setSelectedReport(newReport); // Automatycznie otwórz wygenerowany raport
    setIsGenerating(null);
  };

  const getReportType = (reportType: string): ReportData['type'] => {
    if (reportType.includes('revenue') || reportType.includes('profitability') || reportType.includes('quarterly')) return 'financial';
    if (reportType.includes('project') || reportType.includes('timeline')) return 'project';
    if (reportType.includes('customer') || reportType.includes('satisfaction')) return 'customer';
    if (reportType.includes('employee') || reportType.includes('rankings')) return 'employee';
    if (reportType.includes('branch') || reportType.includes('kpis')) return 'branch';
    return 'custom';
  };

  // Funkcje generowania raportów
  const generateMonthlyRevenueReport = () => {
    const totalRevenue = mockProjects.reduce((sum, project) => sum + project.value, 0);
    const completedProjects = mockProjects.filter(p => p.status === 'Installation Completed');
    const completedRevenue = completedProjects.reduce((sum, project) => sum + project.value, 0);
    
    return {
      totalRevenue: `£${totalRevenue.toLocaleString()}`,
      completedRevenue: `£${completedRevenue.toLocaleString()}`,
      pendingRevenue: `£${(totalRevenue - completedRevenue).toLocaleString()}`,
      totalProjects: mockProjects.length,
      completedProjects: completedProjects.length,
      averageProjectValue: `£${Math.round(totalRevenue / mockProjects.length).toLocaleString()}`,
      monthlyBreakdown: mockAnalytics.history.slice(-6).map(h => ({
        month: h.month,
        revenue: `£${h.revenue.toLocaleString()}`,
        projects: h.completed_projects
      }))
    };
  };

  const generateProjectStatusReport = () => {
    const statusCounts = mockProjects.reduce((acc, project) => {
      acc[project.status] = (acc[project.status] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);
    
    const categoryBreakdown = mockProjects.reduce((acc, project) => {
      acc[project.category] = (acc[project.category] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);
    
    return {
      statusBreakdown: Object.entries(statusCounts).map(([status, count]) => ({
        status,
        count,
        percentage: Math.round((count / mockProjects.length) * 100)
      })),
      categoryBreakdown: Object.entries(categoryBreakdown).map(([category, count]) => ({
        category,
        count,
        percentage: Math.round((count / mockProjects.length) * 100)
      })),
      totalProjects: mockProjects.length,
      averageValue: `£${Math.round(mockProjects.reduce((sum, p) => sum + p.value, 0) / mockProjects.length).toLocaleString()}`
    };
  };

  const generateCustomerAnalyticsReport = () => {
    const totalCustomers = mockCustomers.length;
    const activeCustomers = mockCustomers.filter(c => c.status === 'active').length;
    const residentialCustomers = mockCustomers.filter(c => c.customerType === 'residential').length;
    const commercialCustomers = mockCustomers.filter(c => c.customerType === 'commercial').length;
    
    const branchBreakdown = mockCustomers.reduce((acc, customer) => {
      acc[customer.branch] = (acc[customer.branch] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);
    
    return {
      totalCustomers,
      activeCustomers,
      inactiveCustomers: totalCustomers - activeCustomers,
      residentialCustomers,
      commercialCustomers,
      averageRating: (mockCustomers.reduce((sum, c) => sum + c.rating, 0) / totalCustomers).toFixed(1),
      totalValue: `£${mockCustomers.reduce((sum, c) => sum + c.totalValue, 0).toLocaleString()}`,
      branchBreakdown: Object.entries(branchBreakdown).map(([branch, count]) => ({
        branch,
        count,
        percentage: Math.round((count / totalCustomers) * 100)
      }))
    };
  };

  const generateEmployeePerformanceReport = () => {
    const employees = mockUsers.filter(u => u.userType !== 'subcontractor');
    const subcontractors = mockUsers.filter(u => u.userType === 'subcontractor');
    
    return {
      totalEmployees: employees.length,
      totalSubcontractors: subcontractors.length,
      topPerformers: employees
        .filter(e => e.rating)
        .sort((a, b) => (b.rating || 0) - (a.rating || 0))
        .slice(0, 5)
        .map(e => ({
          name: e.name,
          rating: e.rating,
          projectsCompleted: e.projectsCompleted,
          averageTime: e.averageTime,
          branch: e.branch
        })),
      branchManagers: employees.filter(e => e.userType === 'branch_manager').map(e => ({
        name: e.name,
        branch: e.branch,
        rating: e.rating,
        projectsCompleted: e.projectsCompleted
      })),
      averageRating: (employees.reduce((sum, e) => sum + (e.rating || 0), 0) / employees.length).toFixed(1)
    };
  };

  const generateBranchComparisonReport = () => {
    const branches = ['Belfast', 'Newtownabbey', 'Lisburn', 'Bangor', 'Coleraine'];
    
    return branches.map(branch => {
      const branchProjects = mockProjects.filter(p => p.branch === branch);
      const branchCustomers = mockCustomers.filter(c => c.branch === branch);
      const branchEmployees = mockUsers.filter(u => u.branch === branch);
      
      return {
        branch,
        projects: branchProjects.length,
        customers: branchCustomers.length,
        employees: branchEmployees.length,
        revenue: `£${branchProjects.reduce((sum, p) => sum + p.value, 0).toLocaleString()}`,
        averageProjectValue: branchProjects.length > 0 
          ? `£${Math.round(branchProjects.reduce((sum, p) => sum + p.value, 0) / branchProjects.length).toLocaleString()}`
          : '£0'
      };
    });
  };

  const generateQuarterlyPerformanceReport = () => {
    const quarters = [
      { name: 'Q1 2024', months: ['Jan', 'Feb', 'Mar'] },
      { name: 'Q2 2024', months: ['Apr', 'May', 'Jun'] },
      { name: 'Q3 2024', months: ['Jul', 'Aug', 'Sep'] },
      { name: 'Q4 2024', months: ['Oct', 'Nov', 'Dec'] }
    ];
    
    return quarters.map(quarter => {
      const quarterData = mockAnalytics.history.filter(h => quarter.months.includes(h.month));
      const totalRevenue = quarterData.reduce((sum, h) => sum + h.revenue, 0);
      const totalProjects = quarterData.reduce((sum, h) => sum + h.completed_projects, 0);
      
      return {
        quarter: quarter.name,
        revenue: `£${totalRevenue.toLocaleString()}`,
        projects: totalProjects,
        averageConversion: quarterData.length > 0 
          ? `${(quarterData.reduce((sum, h) => sum + h.conversion_rate, 0) / quarterData.length).toFixed(1)}%`
          : '0%'
      };
    });
  };

  const generateProjectProfitabilityReport = () => {
    const completedProjects = mockProjects.filter(p => p.status === 'Installation Completed');
    const categoryProfitability = completedProjects.reduce((acc, project) => {
      if (!acc[project.category]) {
        acc[project.category] = { totalValue: 0, count: 0 };
      }
      acc[project.category].totalValue += project.value;
      acc[project.category].count += 1;
      return acc;
    }, {} as Record<string, { totalValue: number; count: number }>);
    
    return {
      totalCompletedValue: `£${completedProjects.reduce((sum, p) => sum + p.value, 0).toLocaleString()}`,
      averageProjectValue: `£${Math.round(completedProjects.reduce((sum, p) => sum + p.value, 0) / completedProjects.length).toLocaleString()}`,
      categoryBreakdown: Object.entries(categoryProfitability).map(([category, data]) => ({
        category,
        totalValue: `£${data.totalValue.toLocaleString()}`,
        count: data.count,
        averageValue: `£${Math.round(data.totalValue / data.count).toLocaleString()}`
      }))
    };
  };

  const generateTimelineAnalysisReport = () => {
    const projectsWithTimeline = mockProjects.filter(p => p.timeline && p.timeline.length > 0);
    
    const timelineStats = projectsWithTimeline.map(project => {
      const timeline = project.timeline!;
      const contactDate = timeline.find(t => t.type === 'phone_call')?.date;
      const measurementDate = timeline.find(t => t.type === 'measurement')?.date;
      const completionDate = timeline.find(t => t.type === 'installation_completed')?.date;
      
      let duration = null;
      if (contactDate && completionDate) {
        const start = new Date(contactDate);
        const end = new Date(completionDate);
        duration = Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24));
      }
      
      return {
        projectId: project.id,
        title: project.title,
        duration: duration ? `${duration} days` : 'N/A',
        timelineEvents: timeline.length,
        status: project.status
      };
    });
    
    return {
      totalProjectsAnalyzed: timelineStats.length,
      averageDuration: timelineStats.filter(p => p.duration !== 'N/A').length > 0
        ? `${Math.round(timelineStats.filter(p => p.duration !== 'N/A').reduce((sum, p) => sum + parseInt(p.duration!.split(' ')[0]), 0) / timelineStats.filter(p => p.duration !== 'N/A').length)} days`
        : 'N/A',
      projectsByDuration: timelineStats
    };
  };

  const generateCustomerSatisfactionReport = () => {
    const customersWithRating = mockCustomers.filter(c => c.rating > 0);
    const averageRating = customersWithRating.reduce((sum, c) => sum + c.rating, 0) / customersWithRating.length;
    
    const ratingDistribution = customersWithRating.reduce((acc, customer) => {
      const rating = Math.floor(customer.rating);
      acc[rating] = (acc[rating] || 0) + 1;
      return acc;
    }, {} as Record<number, number>);
    
    return {
      averageRating: averageRating.toFixed(1),
      totalCustomersRated: customersWithRating.length,
      ratingDistribution: Object.entries(ratingDistribution).map(([rating, count]) => ({
        rating: `${rating} stars`,
        count,
        percentage: Math.round((count / customersWithRating.length) * 100)
      })),
      topRatedCustomers: customersWithRating
        .sort((a, b) => b.rating - a.rating)
        .slice(0, 5)
        .map(c => ({
          name: c.name,
          rating: c.rating,
          totalValue: `£${c.totalValue.toLocaleString()}`,
          branch: c.branch
        }))
    };
  };

  const generateEmployeeRankingsReport = () => {
    const employees = mockUsers.filter(u => u.userType !== 'subcontractor' && u.rating);
    
    return {
      topByRating: employees
        .sort((a, b) => (b.rating || 0) - (a.rating || 0))
        .slice(0, 5)
        .map(e => ({
          name: e.name,
          rating: e.rating,
          projectsCompleted: e.projectsCompleted,
          branch: e.branch
        })),
      topByProjects: employees
        .sort((a, b) => (b.projectsCompleted || 0) - (a.projectsCompleted || 0))
        .slice(0, 5)
        .map(e => ({
          name: e.name,
          projectsCompleted: e.projectsCompleted,
          rating: e.rating,
          branch: e.branch
        })),
      branchManagers: employees
        .filter(e => e.userType === 'branch_manager')
        .map(e => ({
          name: e.name,
          branch: e.branch,
          rating: e.rating,
          projectsCompleted: e.projectsCompleted
        }))
    };
  };

  const generateBranchKPIsReport = () => {
    const branches = ['Belfast', 'Newtownabbey', 'Lisburn', 'Bangor', 'Coleraine'];
    
    return branches.map(branch => {
      const branchProjects = mockProjects.filter(p => p.branch === branch);
      const branchCustomers = mockCustomers.filter(c => c.branch === branch);
      const branchEmployees = mockUsers.filter(u => u.branch === branch);
      const completedProjects = branchProjects.filter(p => p.status === 'Installation Completed');
      
      return {
        branch,
        totalProjects: branchProjects.length,
        completedProjects: completedProjects.length,
        completionRate: branchProjects.length > 0 
          ? `${Math.round((completedProjects.length / branchProjects.length) * 100)}%`
          : '0%',
        totalRevenue: `£${branchProjects.reduce((sum, p) => sum + p.value, 0).toLocaleString()}`,
        averageProjectValue: branchProjects.length > 0
          ? `£${Math.round(branchProjects.reduce((sum, p) => sum + p.value, 0) / branchProjects.length).toLocaleString()}`
          : '£0',
        customers: branchCustomers.length,
        employees: branchEmployees.length,
        averageCustomerRating: branchCustomers.length > 0
          ? (branchCustomers.reduce((sum, c) => sum + c.rating, 0) / branchCustomers.length).toFixed(1)
          : 'N/A'
      };
    });
  };

  const downloadReport = (report: ReportData) => {
    const dataStr = JSON.stringify(report.data, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${report.title.replace(/\s+/g, '_')}_${new Date(report.generatedAt).toISOString().split('T')[0]}.json`;
    link.click();
    URL.revokeObjectURL(url);
  };

  // Funkcja renderująca czytelny podgląd raportu
  const renderReportContent = (report: ReportData) => {
    if (!report) return null;

    const renderSummaryCards = (data: any) => {
      const summaryItems: React.ReactElement[] = [];
      
      // Dodaj kluczowe metryki jako karty
      Object.entries(data).forEach(([key, value]) => {
        if (typeof value === 'string' && (value.includes('£') || value.includes('%') || value.includes('days'))) {
          summaryItems.push(
            <div key={key} className="bg-blue-50 dark:bg-blue-950 p-4 rounded-lg">
              <h3 className="font-semibold text-blue-900 dark:text-blue-100 capitalize">
                {key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
              </h3>
              <p className="text-2xl font-bold text-blue-700 dark:text-blue-300">{String(value)}</p>
            </div>
          );
        }
      });
      
      return summaryItems.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
          {summaryItems}
        </div>
      ) : null;
    };

    const renderChart = (data: any, title: string) => {
      if (Array.isArray(data) && data.length > 0) {
        const labels = data.map((item: any) => Object.values(item)[0]);
        const values = data.map((item: any) => {
          const val = Object.values(item).find(v => typeof v === 'number');
          return val || 0;
        });
        
        // Check if this is a branch-related chart
        const isBranchChart = title.toLowerCase().includes('branch') || 
                             (data.length > 0 && Object.keys(data[0])[0].toLowerCase().includes('branch'));
        
        let backgroundColor, borderColor;
        
        if (isBranchChart) {
          // Use branch-specific colors
          backgroundColor = labels.map((label: any) => {
            const color = getBranchChartColor(String(label));
            return color + '80'; // Add 50% opacity
          });
          borderColor = labels.map((label: any) => getBranchChartColor(String(label)));
        } else {
          // Use default colors
          backgroundColor = [
            'rgba(59, 130, 246, 0.8)',
            'rgba(16, 185, 129, 0.8)',
            'rgba(245, 158, 11, 0.8)',
            'rgba(239, 68, 68, 0.8)',
            'rgba(139, 92, 246, 0.8)',
            'rgba(236, 72, 153, 0.8)',
            'rgba(14, 165, 233, 0.8)',
            'rgba(34, 197, 94, 0.8)',
          ];
          borderColor = [
            'rgba(59, 130, 246, 1)',
            'rgba(16, 185, 129, 1)',
            'rgba(245, 158, 11, 1)',
            'rgba(239, 68, 68, 1)',
            'rgba(139, 92, 246, 1)',
            'rgba(236, 72, 153, 1)',
            'rgba(14, 165, 233, 1)',
            'rgba(34, 197, 94, 1)',
          ];
        }
        
        const chartData = {
          labels,
          datasets: [
            {
              label: title,
              data: values,
              backgroundColor,
              borderColor,
              borderWidth: 2,
              borderRadius: 8,
            },
          ],
        };

        const options = {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: {
              display: false,
            },
            title: {
              display: true,
              text: title,
              font: {
                size: 16,
                weight: 'bold' as const,
              },
            },
            tooltip: {
              callbacks: {
                label: function(context: any) {
                  return `${context.dataset.label}: ${context.parsed.y}`;
                }
              }
            },
            datalabels: {
              display: true,
              color: '#000',
              anchor: 'end' as const,
              align: 'top' as const,
              offset: 4,
              font: {
                weight: 'bold' as const,
                size: 12
              },
              formatter: function(value: any) {
                return value;
              }
            }
          },
          scales: {
            y: {
              beginAtZero: true,
              grid: {
                color: 'rgba(0, 0, 0, 0.1)',
              },
            },
            x: {
              grid: {
                display: false,
              },
            },
          },
        };

        return (
          <div className="mb-8">
            <div className="h-80">
              <Bar data={chartData} options={options} />
            </div>
          </div>
        );
      }
      return null;
    };

    const renderTable = (data: any, title: string) => {
      if (Array.isArray(data) && data.length > 0) {
        const headers = Object.keys(data[0]);
        
        return (
          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-3">{title}</h3>
            <div className="overflow-x-auto">
              <table className="min-w-full border border-gray-300 dark:border-gray-600">
                <thead>
                  <tr className="bg-gray-50 dark:bg-gray-800">
                    {headers.map((header) => (
                      <th key={header} className="px-4 py-2 text-left font-semibold border-b">
                        {header.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {data.map((row: any, index: number) => (
                    <tr key={index} className="hover:bg-gray-50 dark:hover:bg-gray-800">
                      {headers.map((header) => {
                        const value = row[header];
                        const isBranch = header.toLowerCase().includes('branch');
                        
                        if (isBranch && typeof value === 'string') {
                          const branchColor = getBranchColor(value);
                          return (
                            <td key={header} className="px-4 py-2 border-b">
                              <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${branchColor.bg} ${branchColor.text} ${branchColor.border} border`}>
                                {value}
                              </span>
                            </td>
                          );
                        }
                        
                        return (
                          <td key={header} className="px-4 py-2 border-b">
                            {typeof value === 'object' 
                              ? JSON.stringify(value, null, 2)
                              : String(value)
                            }
                          </td>
                        );
                      })}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        );
      }
      return null;
    };

    const renderKeyValueList = (data: any, title: string) => {
      if (typeof data === 'object' && !Array.isArray(data)) {
        // Filtruj tylko proste wartości (nie obiekty/tablice)
        const simpleEntries = Object.entries(data).filter(([key, value]) => 
          typeof value !== 'object' || value === null
        );
        
        if (simpleEntries.length === 0) return null;
        
        return (
          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-3">{title}</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {simpleEntries.map(([key, value]) => (
                <div key={key} className="flex justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                  <span className="font-medium capitalize">
                    {key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
                  </span>
                  <span className="text-right">
                    {String(value)}
                  </span>
                </div>
              ))}
            </div>
          </div>
        );
      }
      return null;
    };

    // Renderowanie specyficzne dla typu raportu
    switch (report.type) {
      case 'financial':
        return (
          <div className="space-y-8">
            {renderSummaryCards(report.data)}
            
            {/* Monthly Revenue Chart */}
            {report.data.monthlyBreakdown && renderChart(
              report.data.monthlyBreakdown.map((item: any) => ({ 
                Month: item.month, 
                Revenue: parseInt(item.revenue.replace(/[£,]/g, '')) 
              })), 
              'Monthly Revenue Trend'
            )}
            
            {/* Monthly Projects Chart */}
            {report.data.monthlyBreakdown && renderChart(
              report.data.monthlyBreakdown.map((item: any) => ({ 
                Month: item.month, 
                Projects: item.projects
              })), 
              'Monthly Projects Count'
            )}
            
            {report.data.monthlyBreakdown && renderTable(
              report.data.monthlyBreakdown.map((item: any) => ({
                Month: item.month,
                Revenue: item.revenue,
                Projects: item.projects
              })),
              'Monthly Details'
            )}
            {renderKeyValueList(report.data, 'Financial Summary')}
          </div>
        );

      case 'project':
        return (
          <div className="space-y-8">
            {renderSummaryCards(report.data)}
            
            {/* Project Status Chart */}
            {report.data.statusBreakdown && renderChart(
              report.data.statusBreakdown.map((item: any) => ({ 
                Status: item.status, 
                Count: item.count 
              })), 
              'Project Status Distribution'
            )}
            
            {/* Project Categories Chart */}
            {report.data.categoryBreakdown && renderChart(
              report.data.categoryBreakdown.map((item: any) => ({ 
                Category: item.category, 
                Count: item.count 
              })), 
              'Project Categories'
            )}
            
            {/* Project Value by Category Chart */}
            {report.data.categoryBreakdown && report.data.categoryBreakdown[0]?.totalValue && renderChart(
              report.data.categoryBreakdown.map((item: any) => ({ 
                Category: item.category, 
                Value: parseInt(item.totalValue.replace(/[£,]/g, ''))
              })), 
              'Project Value by Category'
            )}
            
            {report.data.categoryBreakdown && renderTable(
              report.data.categoryBreakdown.map((item: any) => ({
                Category: item.category,
                Count: item.count,
                Percentage: `${item.percentage}%`
              })),
              'Category Details'
            )}
            
            {/* Special rendering for Project Profitability Report */}
            {report.data.categoryBreakdown && report.data.categoryBreakdown[0]?.totalValue && renderTable(
              report.data.categoryBreakdown.map((item: any) => ({
                Category: item.category,
                TotalValue: item.totalValue,
                Count: item.count,
                AverageValue: item.averageValue
              })),
              'Profitability by Category'
            )}
            {renderKeyValueList(report.data, 'Project Metrics')}
          </div>
        );

      case 'customer':
        return (
          <div className="space-y-8">
            {renderSummaryCards(report.data)}
            
            {/* Customers by Branch Chart */}
            {report.data.branchBreakdown && renderChart(
              report.data.branchBreakdown.map((item: any) => ({ 
                Branch: item.branch, 
                Customers: item.count 
              })), 
              'Customers by Branch'
            )}
            
            {/* Customer Rating Distribution Chart */}
            {report.data.ratingDistribution && renderChart(
              report.data.ratingDistribution.map((item: any) => ({ 
                Rating: item.rating, 
                Count: item.count 
              })), 
              'Customer Rating Distribution'
            )}
            
            {report.data.branchBreakdown && renderTable(
              report.data.branchBreakdown.map((item: any) => ({
                Branch: item.branch,
                Count: item.count,
                Percentage: `${item.percentage}%`
              })),
              'Branch Details'
            )}
            
            {report.data.ratingDistribution && renderTable(
              report.data.ratingDistribution.map((item: any) => ({
                Rating: item.rating,
                Count: item.count,
                Percentage: `${item.percentage}%`
              })),
              'Rating Details'
            )}
            
            {report.data.topRatedCustomers && renderTable(
              report.data.topRatedCustomers.map((item: any) => ({
                Name: item.name,
                Rating: `${item.rating} ⭐`,
                Value: item.totalValue,
                Branch: item.branch
              })), 
              'Top Rated Customers'
            )}
            {renderKeyValueList(report.data, 'Customer Analysis')}
          </div>
        );

      case 'employee':
        return (
          <div className="space-y-6">
            {renderSummaryCards(report.data)}
            {report.data.topPerformers && renderTable(
              report.data.topPerformers.map((item: any) => ({
                Name: item.name,
                Rating: `${item.rating} ⭐`,
                Projects: item.projectsCompleted,
                AverageTime: item.averageTime,
                Branch: item.branch
              })), 
              'Top Performers'
            )}
            {report.data.topByRating && renderTable(
              report.data.topByRating.map((item: any) => ({
                Name: item.name,
                Rating: `${item.rating} ⭐`,
                Projects: item.projectsCompleted,
                Branch: item.branch
              })), 
              'Top by Rating'
            )}
            {report.data.topByProjects && renderTable(
              report.data.topByProjects.map((item: any) => ({
                Name: item.name,
                Projects: item.projectsCompleted,
                Rating: `${item.rating} ⭐`,
                Branch: item.branch
              })), 
              'Top by Projects'
            )}
            {report.data.branchManagers && renderTable(
              report.data.branchManagers.map((item: any) => ({
                Name: item.name,
                Branch: item.branch,
                Rating: `${item.rating} ⭐`,
                Projects: item.projectsCompleted
              })), 
              'Branch Managers'
            )}
            {renderKeyValueList(report.data, 'Employee Summary')}
          </div>
        );

      case 'branch':
        return (
          <div className="space-y-8">
            {/* Projects by Branch Chart */}
            {Array.isArray(report.data) && renderChart(
              report.data.map((item: any) => ({ 
                Branch: item.branch, 
                Projects: item.projects || item.totalProjects || 0
              })), 
              'Projects by Branch'
            )}
            
            {/* Revenue by Branch Chart */}
            {Array.isArray(report.data) && renderChart(
              report.data.map((item: any) => ({ 
                Branch: item.branch, 
                Revenue: parseInt((item.revenue || '£0').replace(/[£,]/g, ''))
              })), 
              'Revenue by Branch'
            )}
            
            {/* Customers by Branch Chart */}
            {Array.isArray(report.data) && renderChart(
              report.data.map((item: any) => ({ 
                Branch: item.branch, 
                Customers: item.customers || 0
              })), 
              'Customers by Branch'
            )}
            
            {renderTable(report.data.map((item: any) => ({
              Branch: item.branch,
              Projects: item.projects || item.totalProjects || 0,
              Customers: item.customers || 0,
              Employees: item.employees || 0,
              Revenue: item.revenue || '£0',
              AverageValue: item.averageProjectValue || '£0'
            })), 'Branch Performance')}
          </div>
        );

      default:
        // Domyślne renderowanie dla innych typów
        if (Array.isArray(report.data)) {
          return renderTable(report.data, 'Report Data');
        } else if (typeof report.data === 'object') {
          return renderKeyValueList(report.data, 'Report Summary');
        } else {
          return <pre className="whitespace-pre-wrap bg-gray-50 dark:bg-gray-800 p-4 rounded">{String(report.data)}</pre>;
        }
    }
  };

  return (
    <ProtectedRoute permissions={[PERMISSIONS.ANALYTICS_READ]}>
      <DashboardLayout>
        <div className="space-y-6">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-foreground">Reports</h1>
              <p className="mt-2 text-sm text-gray-600 dark:text-muted-foreground">
                Generate and download HHI business reports based on real data
              </p>
            </div>
            {selectedReport && (
              <Button 
                variant="outline" 
                onClick={() => setSelectedReport(null)}
              >
                <X size={16} className="mr-2" />
                Back to List
              </Button>
            )}
          </div>

          {/* Selected Report View - Show first if selected */}
          {selectedReport && (
            <Card>
              <div className="flex items-center justify-between">
                <h3 className="flex items-center text-lg font-semibold">
                  <span className="text-lg mr-3">
                    {selectedReport.type === 'financial' && '💰'}
                    {selectedReport.type === 'project' && '🔨'}
                    {selectedReport.type === 'customer' && '👥'}
                    {selectedReport.type === 'employee' && '👤'}
                    {selectedReport.type === 'branch' && '🏢'}
                    {selectedReport.type === 'custom' && '⚙️'}
                  </span>
                  {selectedReport.title}
                </h3>
                <div className="flex gap-2">
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => downloadReport(selectedReport)}
                  >
                    Download
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => setSelectedReport(null)}
                  >
                    <X size={16} className="mr-2" />
                    Close
                  </Button>
                </div>
              </div>
              <p className="text-sm text-gray-500 dark:text-muted-foreground">
                Generated {new Date(selectedReport.generatedAt).toLocaleString()}
              </p>
              <div className="max-w-7xl mx-auto">
                {renderReportContent(selectedReport)}
              </div>
            </Card>
          )}

          {/* Reports Grid - Show only if no report is selected */}
          {!selectedReport && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Financial Reports */}
            <Card>
              <div className="p-6 pb-0">
                <div className="flex items-center">
                  <span className="text-green-600 dark:text-green-400 text-lg mr-2">💰</span>
                  <h3 className="text-lg font-semibold">Financial Reports</h3>
                </div>
              </div>
              <div className="p-6 pt-4 space-y-3">
                <Button 
                  variant="outline" 
                  className="w-full justify-start"
                  onClick={() => generateReport('monthly-revenue', 'Monthly Revenue Report')}
                  disabled={isGenerating === 'monthly-revenue'}
                >
                  {isGenerating === 'monthly-revenue' ? 'Generating...' : '📊 Monthly Revenue Report'}
                </Button>
                <Button 
                  variant="outline" 
                  className="w-full justify-start"
                  onClick={() => generateReport('quarterly-performance', 'Quarterly Performance Report')}
                  disabled={isGenerating === 'quarterly-performance'}
                >
                  {isGenerating === 'quarterly-performance' ? 'Generating...' : '📈 Quarterly Performance'}
                </Button>
                <Button 
                  variant="outline" 
                  className="w-full justify-start"
                  onClick={() => generateReport('project-profitability', 'Project Profitability Report')}
                  disabled={isGenerating === 'project-profitability'}
                >
                  {isGenerating === 'project-profitability' ? 'Generating...' : '💳 Project Profitability'}
                </Button>
              </div>
            </Card>

            {/* Project Reports */}
            <Card>
              <div className="p-6 pb-0">
                <div className="flex items-center">
                  <span className="text-blue-600 dark:text-blue-400 text-lg mr-2">🔨</span>
                  <h3 className="text-lg font-semibold">Project Reports</h3>
                </div>
              </div>
              <div className="p-6 pt-4 space-y-3">
                <Button 
                  variant="outline" 
                  className="w-full justify-start"
                  onClick={() => generateReport('project-status', 'Project Status Summary')}
                  disabled={isGenerating === 'project-status'}
                >
                  {isGenerating === 'project-status' ? 'Generating...' : '📋 Project Status Summary'}
                </Button>
                <Button 
                  variant="outline" 
                  className="w-full justify-start"
                  onClick={() => generateReport('timeline-analysis', 'Timeline Analysis')}
                  disabled={isGenerating === 'timeline-analysis'}
                >
                  {isGenerating === 'timeline-analysis' ? 'Generating...' : '⏱️ Timeline Analysis'}
                </Button>
                <Button 
                  variant="outline" 
                  className="w-full justify-start"
                  onClick={() => generateReport('project-profitability', 'Performance Metrics')}
                  disabled={isGenerating === 'project-profitability'}
                >
                  {isGenerating === 'project-profitability' ? 'Generating...' : '🎯 Performance Metrics'}
                </Button>
              </div>
            </Card>

            {/* Customer Reports */}
            <Card>
              <div className="p-6 pb-0">
                <div className="flex items-center">
                  <span className="text-purple-600 dark:text-purple-400 text-lg mr-2">👥</span>
                  <h3 className="text-lg font-semibold">Customer Reports</h3>
                </div>
              </div>
              <div className="p-6 pt-4 space-y-3">
                <Button 
                  variant="outline" 
                  className="w-full justify-start"
                  onClick={() => generateReport('customer-analytics', 'Customer Analytics')}
                  disabled={isGenerating === 'customer-analytics'}
                >
                  {isGenerating === 'customer-analytics' ? 'Generating...' : '📊 Customer Analytics'}
                </Button>
                <Button 
                  variant="outline" 
                  className="w-full justify-start"
                  onClick={() => generateReport('customer-satisfaction', 'Satisfaction Survey')}
                  disabled={isGenerating === 'customer-satisfaction'}
                >
                  {isGenerating === 'customer-satisfaction' ? 'Generating...' : '⭐ Satisfaction Survey'}
                </Button>
                <Button 
                  variant="outline" 
                  className="w-full justify-start"
                  onClick={() => generateReport('customer-analytics', 'Customer Lifetime Value')}
                  disabled={isGenerating === 'customer-analytics'}
                >
                  {isGenerating === 'customer-analytics' ? 'Generating...' : '📈 Customer Lifetime Value'}
                </Button>
              </div>
            </Card>

            {/* Employee Reports */}
            <Card>
              <div className="p-6 pb-0">
                <div className="flex items-center">
                  <span className="text-orange-600 dark:text-orange-400 text-lg mr-2">👤</span>
                  <h3 className="text-lg font-semibold">Employee Reports</h3>
                </div>
              </div>
              <div className="p-6 pt-4 space-y-3">
                <Button 
                  variant="outline" 
                  className="w-full justify-start"
                  onClick={() => generateReport('employee-rankings', 'Performance Rankings')}
                  disabled={isGenerating === 'employee-rankings'}
                >
                  {isGenerating === 'employee-rankings' ? 'Generating...' : '🏆 Performance Rankings'}
                </Button>
                <Button 
                  variant="outline" 
                  className="w-full justify-start"
                  onClick={() => generateReport('employee-performance', 'Time Tracking')}
                  disabled={isGenerating === 'employee-performance'}
                >
                  {isGenerating === 'employee-performance' ? 'Generating...' : '⏰ Time Tracking'}
                </Button>
                <Button 
                  variant="outline" 
                  className="w-full justify-start"
                  onClick={() => generateReport('employee-performance', 'Productivity Analysis')}
                  disabled={isGenerating === 'employee-performance'}
                >
                  {isGenerating === 'employee-performance' ? 'Generating...' : '📊 Productivity Analysis'}
                </Button>
              </div>
            </Card>

            {/* Branch Reports */}
            <Card>
              <div className="p-6 pb-0">
                <div className="flex items-center">
                  <span className="text-yellow-600 dark:text-yellow-400 text-lg mr-2">🏢</span>
                  <h3 className="text-lg font-semibold">Branch Reports</h3>
                </div>
              </div>
              <div className="p-6 pt-4 space-y-3">
                <Button 
                  variant="outline" 
                  className="w-full justify-start"
                  onClick={() => generateReport('branch-comparison', 'Branch Comparison')}
                  disabled={isGenerating === 'branch-comparison'}
                >
                  {isGenerating === 'branch-comparison' ? 'Generating...' : '📊 Branch Comparison'}
                </Button>
                <Button 
                  variant="outline" 
                  className="w-full justify-start"
                  onClick={() => generateReport('branch-comparison', 'Regional Performance')}
                  disabled={isGenerating === 'branch-comparison'}
                >
                  {isGenerating === 'branch-comparison' ? 'Generating...' : '📈 Regional Performance'}
                </Button>
                <Button 
                  variant="outline" 
                  className="w-full justify-start"
                  onClick={() => generateReport('branch-kpis', 'Branch KPIs')}
                  disabled={isGenerating === 'branch-kpis'}
                >
                  {isGenerating === 'branch-kpis' ? 'Generating...' : '🎯 Branch KPIs'}
                </Button>
              </div>
            </Card>

            {/* Custom Reports */}
            <Card>
              <div className="p-6 pb-0">
                <div className="flex items-center">
                  <span className="text-gray-600 dark:text-gray-400 text-lg mr-2">⚙️</span>
                  <h3 className="text-lg font-semibold">Custom Reports</h3>
                </div>
              </div>
              <div className="p-6 pt-4 space-y-3">
                <Button variant="outline" className="w-full justify-start">
                  📝 Report Builder
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  📅 Scheduled Reports
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  💾 Saved Templates
                </Button>
              </div>
            </Card>
          </div>
          )}

          {/* Generated Reports - Show only if no report is selected */}
          {!selectedReport && generatedReports.length > 0 && (
            <Card>
              <div className="flex items-center">
                <h3 className="text-lg font-semibold">Generated Reports</h3>
              </div>
              <div className="space-y-4">
                {generatedReports.map((report) => (
                  <div key={report.id} className="flex items-center justify-between p-4 bg-gray-50 dark:bg-muted rounded-lg">
                    <div className="flex items-center">
                      <span className="text-lg mr-3">
                        {report.type === 'financial' && '💰'}
                        {report.type === 'project' && '🔨'}
                        {report.type === 'customer' && '👥'}
                        {report.type === 'employee' && '👤'}
                        {report.type === 'branch' && '🏢'}
                        {report.type === 'custom' && '⚙️'}
                      </span>
                      <div>
                        <p className="font-medium text-gray-900 dark:text-foreground">{report.title}</p>
                        <p className="text-sm text-gray-500 dark:text-muted-foreground">
                          Generated {new Date(report.generatedAt).toLocaleString()}
                        </p>
                        <Badge variant="outline" className="mt-1">
                          {report.type.charAt(0).toUpperCase() + report.type.slice(1)}
                        </Badge>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => downloadReport(report)}
                      >
                        Download
                      </Button>
                      <Button 
                        variant="secondary" 
                        size="sm"
                        onClick={() => setSelectedReport(report)}
                      >
                        Preview
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          )}
        </div>
      </DashboardLayout>
    </ProtectedRoute>
  );
} 