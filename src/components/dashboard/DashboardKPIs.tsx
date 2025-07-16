// src/components/dashboard/DashboardKPIs.tsx
'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  TrendingUp, 
  Clock, 
  CheckCircle, 
  AlertTriangle, 
  DollarSign, 
  Target 
} from 'lucide-react';

interface KPIData {
  activeProjects: number;
  weeklyInstallations: number;
  pendingMeasurements: number;
  overdueActions: number;
  monthlyRevenue: number;
  completionRate: number;
}

interface DashboardKPIsProps {
  data: KPIData;
  userRole?: 'installer' | 'branch_manager' | 'company_manager';
  branchName?: string;
}

interface KPICard {
  title: string;
  value: string | number;
  description: string;
  icon: React.ComponentType<any>;
  color: string;
  trend?: string;
}

export function DashboardKPIs({ data, userRole = 'company_manager', branchName }: DashboardKPIsProps) {
  const formatCurrency = (value: number): string => {
    return `£${value.toLocaleString()}`;
  };

  const kpis: KPICard[] = [
    {
      title: 'Active Projects',
      value: data.activeProjects,
      description: 'Projects in progress',
      icon: TrendingUp,
      color: 'bg-blue-500',
      trend: '+2.5%'
    },
    {
      title: 'Weekly Installations',
      value: data.weeklyInstallations,
      description: 'This week',
      icon: CheckCircle,
      color: 'bg-green-500',
      trend: '+12%'
    },
    {
      title: 'Pending Measurements',
      value: data.pendingMeasurements,
      description: 'Awaiting survey',
      icon: Clock,
      color: 'bg-yellow-500'
    },
    {
      title: 'Overdue Actions',
      value: data.overdueActions,
      description: 'Need attention',
      icon: AlertTriangle,
      color: data.overdueActions > 0 ? 'bg-red-500' : 'bg-gray-500'
    },
    {
      title: 'Monthly Revenue',
      value: formatCurrency(data.monthlyRevenue),
      description: 'This month',
      icon: DollarSign,
      color: 'bg-emerald-500',
      trend: '+8.2%'
    },
    {
      title: 'Completion Rate',
      value: `${data.completionRate}%`,
      description: 'Overall success',
      icon: Target,
      color: 'bg-purple-500'
    }
  ];

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-gray-900">
          📊 Key Performance Indicators
          {branchName && userRole === 'branch_manager' && (
            <span className="text-base font-normal text-gray-600 ml-2">
              - {branchName} Branch
            </span>
          )}
        </h2>
        
        <div className="text-sm text-gray-500">
          Last updated: {new Date().toLocaleTimeString()}
        </div>
      </div>

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
        {kpis.map((kpi, index) => {
          const IconComponent = kpi.icon;
          return (
            <Card key={index} className="hover:shadow-md transition-shadow duration-200">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-gray-600">
                  {kpi.title}
                </CardTitle>
                <div className={`p-2 rounded-full ${kpi.color}`}>
                  <IconComponent className="h-4 w-4 text-white" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-gray-900 mb-1">
                  {kpi.value}
                </div>
                <div className="flex items-center justify-between">
                  <p className="text-xs text-gray-500">
                    {kpi.description}
                  </p>
                  {kpi.trend && (
                    <Badge variant="secondary" className="text-xs">
                      {kpi.trend}
                    </Badge>
                  )}
                </div>

                {/* Alert badge for critical metrics */}
                {kpi.title.includes('Overdue') && typeof kpi.value === 'number' && kpi.value > 0 && (
                  <div className="mt-2">
                    <Badge variant="destructive" className="text-xs">
                      Needs attention
                    </Badge>
                  </div>
                )}
                
                {/* Progress bar for completion rate */}
                {kpi.title.includes('Completion Rate') && (
                  <div className="mt-2">
                    <div className="w-full bg-gray-200 rounded-full h-1.5">
                      <div 
                        className="bg-purple-500 h-1.5 rounded-full transition-all duration-300"
                        style={{ width: `${Math.min(100, Math.max(0, data.completionRate))}%` }}
                      ></div>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Role-specific insights */}
      {userRole === 'installer' && (
        <Card className="bg-blue-50 border-blue-200">
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <CheckCircle className="h-5 w-5 text-blue-600" />
              <span className="text-sm font-medium text-blue-900">
                You have {data.activeProjects} active projects assigned to you.
              </span>
            </div>
          </CardContent>
        </Card>
      )}

      {userRole === 'branch_manager' && (
        <Card className="bg-green-50 border-green-200">
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-green-600" />
              <span className="text-sm font-medium text-green-900">
                {branchName} branch performance is {data.completionRate > 75 ? 'excellent' : data.completionRate > 50 ? 'good' : 'needs improvement'} 
                with {data.completionRate}% completion rate.
              </span>
            </div>
          </CardContent>
        </Card>
      )}

      {userRole === 'company_manager' && data.overdueActions > 0 && (
        <Card className="bg-red-50 border-red-200">
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-red-600" />
              <span className="text-sm font-medium text-red-900">
                {data.overdueActions} project{data.overdueActions !== 1 ? 's' : ''} require immediate attention.
              </span>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}