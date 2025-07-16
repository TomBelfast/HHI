'use client';

import { useTranslations } from 'next-intl';
import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { RefreshCw } from 'lucide-react';

interface Project {
  id: string;
  clientName: string;
  clientEmail: string;
  clientPhone?: string;
  clientAddress?: string;
  serviceType: string;
  projectValue?: number;
  currentStage: number;
  installationDate?: Date;
  branchLocation: string;
  assignedInstallerId?: string;
  contractFileName?: string;
  createdAt: Date;
  updatedAt: Date;
}

interface KPIData {
  activeProjects: number;
  weeklyInstallations: number;
  pendingMeasurements: number;
  overdueActions: number;
  monthlyRevenue: number;
  completionRate: number;
}

const DashboardIndexPage = () => {
  const t = useTranslations('Dashboard');
  const [projects, setProjects] = useState<Project[]>([]);
  const [kpiData, setKpiData] = useState<KPIData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      
      // Mock data for HHI projects in Northern Ireland
      const mockProjects: Project[] = [
        {
          id: '1',
          clientName: 'John Mitchell',
          clientEmail: 'john.mitchell@example.com',
          clientPhone: '+44 28 9023 4567',
          clientAddress: 'Belfast City Centre',
          serviceType: 'Central Heating Installation',
          projectValue: 3500,
          currentStage: 8,
          installationDate: new Date('2024-01-15'),
          branchLocation: 'belfast',
          assignedInstallerId: 'INST001',
          contractFileName: 'contract_001.pdf',
          createdAt: new Date('2024-01-10'),
          updatedAt: new Date('2024-01-20')
        },
        {
          id: '2',
          clientName: 'Sarah Thompson',
          clientEmail: 'sarah.thompson@example.com',
          clientPhone: '+44 28 9267 8901',
          clientAddress: 'Lisburn Road',
          serviceType: 'Boiler Replacement',
          projectValue: 2800,
          currentStage: 3,
          installationDate: new Date('2024-01-25'),
          branchLocation: 'lisburn',
          assignedInstallerId: 'INST002',
          contractFileName: 'contract_002.pdf',
          createdAt: new Date('2024-01-18'),
          updatedAt: new Date('2024-01-22')
        },
        {
          id: '3',
          clientName: 'Michael O\'Brien',
          clientEmail: 'michael.obrien@example.com',
          clientPhone: '+44 28 9145 6789',
          clientAddress: 'Bangor Marina',
          serviceType: 'Radiator Installation',
          projectValue: 1800,
          currentStage: 12,
          installationDate: new Date('2024-01-12'),
          branchLocation: 'bangor',
          assignedInstallerId: 'INST003',
          contractFileName: 'contract_003.pdf',
          createdAt: new Date('2024-01-08'),
          updatedAt: new Date('2024-01-15')
        },
        {
          id: '4',
          clientName: 'Emma Wilson',
          clientEmail: 'emma.wilson@example.com',
          clientPhone: '+44 28 9084 5678',
          clientAddress: 'Newtownabbey Shopping Centre',
          serviceType: 'Full System Upgrade',
          projectValue: 4200,
          currentStage: 6,
          installationDate: new Date('2024-02-01'),
          branchLocation: 'newtownabbey',
          assignedInstallerId: 'INST004',
          contractFileName: 'contract_004.pdf',
          createdAt: new Date('2024-01-28'),
          updatedAt: new Date('2024-02-03')
        },
        {
          id: '5',
          clientName: 'David Campbell',
          clientEmail: 'david.campbell@example.com',
          clientPhone: '+44 28 7034 5678',
          clientAddress: 'Coleraine University Area',
          serviceType: 'Underfloor Heating',
          projectValue: 5500,
          currentStage: 1,
          installationDate: new Date('2024-02-10'),
          branchLocation: 'coleraine',
          assignedInstallerId: 'INST005',
          contractFileName: 'contract_005.pdf',
          createdAt: new Date('2024-02-05'),
          updatedAt: new Date('2024-02-06')
        },
        {
          id: '6',
          clientName: 'Lisa Murphy',
          clientEmail: 'lisa.murphy@example.com',
          clientPhone: '+44 28 9032 1234',
          clientAddress: 'Titanic Quarter',
          serviceType: 'Smart Thermostat Installation',
          projectValue: 800,
          currentStage: 10,
          installationDate: new Date('2024-01-30'),
          branchLocation: 'belfast',
          assignedInstallerId: 'INST006',
          contractFileName: 'contract_006.pdf',
          createdAt: new Date('2024-01-25'),
          updatedAt: new Date('2024-02-01')
        },
        {
          id: '7',
          clientName: 'Robert Taylor',
          clientEmail: 'robert.taylor@example.com',
          clientPhone: '+44 28 9266 7890',
          clientAddress: 'Hillsborough Castle Road',
          serviceType: 'Combi Boiler Installation',
          projectValue: 3200,
          currentStage: 4,
          installationDate: new Date('2024-02-15'),
          branchLocation: 'lisburn',
          assignedInstallerId: 'INST007',
          contractFileName: 'contract_007.pdf',
          createdAt: new Date('2024-02-08'),
          updatedAt: new Date('2024-02-12')
        },
        {
          id: '8',
          clientName: 'Anna Clarke',
          clientEmail: 'anna.clarke@example.com',
          clientPhone: '+44 28 9127 8901',
          clientAddress: 'Pickie Fun Park Area',
          serviceType: 'Power Flushing',
          projectValue: 400,
          currentStage: 11,
          installationDate: new Date('2024-01-20'),
          branchLocation: 'bangor',
          assignedInstallerId: 'INST008',
          contractFileName: 'contract_008.pdf',
          createdAt: new Date('2024-01-15'),
          updatedAt: new Date('2024-01-25')
        },
        {
          id: '9',
          clientName: 'Kevin Stewart',
          clientEmail: 'kevin.stewart@example.com',
          clientPhone: '+44 28 9083 4567',
          clientAddress: 'Valley Park',
          serviceType: 'Gas Safety Check',
          projectValue: 150,
          currentStage: 12,
          installationDate: new Date('2024-01-18'),
          branchLocation: 'newtownabbey',
          assignedInstallerId: 'INST009',
          contractFileName: 'contract_009.pdf',
          createdAt: new Date('2024-01-16'),
          updatedAt: new Date('2024-01-20')
        },
        {
          id: '10',
          clientName: 'Catherine Brown',
          clientEmail: 'catherine.brown@example.com',
          clientPhone: '+44 28 7032 5678',
          clientAddress: 'Riverside Park',
          serviceType: 'Heating System Maintenance',
          projectValue: 250,
          currentStage: 5,
          installationDate: new Date('2024-02-12'),
          branchLocation: 'coleraine',
          assignedInstallerId: 'INST010',
          contractFileName: 'contract_010.pdf',
          createdAt: new Date('2024-02-10'),
          updatedAt: new Date('2024-02-13')
        },
        {
          id: '11',
          clientName: 'James McDonald',
          clientEmail: 'james.mcdonald@example.com',
          clientPhone: '+44 28 9024 3456',
          clientAddress: 'Stranmillis',
          serviceType: 'Cylinder Replacement',
          projectValue: 1200,
          currentStage: 2,
          installationDate: new Date('2024-02-18'),
          branchLocation: 'belfast',
          assignedInstallerId: 'INST011',
          contractFileName: 'contract_011.pdf',
          createdAt: new Date('2024-02-15'),
          updatedAt: new Date('2024-02-16')
        },
        {
          id: '12',
          clientName: 'Helen White',
          clientEmail: 'helen.white@example.com',
          clientPhone: '+44 28 9260 7890',
          clientAddress: 'Sprucefield',
          serviceType: 'Pipe Installation',
          projectValue: 650,
          currentStage: 7,
          installationDate: new Date('2024-02-08'),
          branchLocation: 'lisburn',
          assignedInstallerId: 'INST012',
          contractFileName: 'contract_012.pdf',
          createdAt: new Date('2024-02-05'),
          updatedAt: new Date('2024-02-10')
        },
        {
          id: '13',
          clientName: 'Paul Johnson',
          clientEmail: 'paul.johnson@example.com',
          clientPhone: '+44 28 9146 7890',
          clientAddress: 'Groomsport',
          serviceType: 'Boiler Service',
          projectValue: 200,
          currentStage: 9,
          installationDate: new Date('2024-01-28'),
          branchLocation: 'bangor',
          assignedInstallerId: 'INST013',
          contractFileName: 'contract_013.pdf',
          createdAt: new Date('2024-01-25'),
          updatedAt: new Date('2024-01-30')
        },
        {
          id: '14',
          clientName: 'Mary Robinson',
          clientEmail: 'mary.robinson@example.com',
          clientPhone: '+44 28 9085 6789',
          clientAddress: 'Glengormley',
          serviceType: 'Emergency Repair',
          projectValue: 180,
          currentStage: 12,
          installationDate: new Date('2024-01-22'),
          branchLocation: 'newtownabbey',
          assignedInstallerId: 'INST014',
          contractFileName: 'contract_014.pdf',
          createdAt: new Date('2024-01-20'),
          updatedAt: new Date('2024-01-25')
        },
        {
          id: '15',
          clientName: 'Thomas Anderson',
          clientEmail: 'thomas.anderson@example.com',
          clientPhone: '+44 28 7035 4567',
          clientAddress: 'Portstewart',
          serviceType: 'Central Heating Installation',
          projectValue: 4800,
          currentStage: 3,
          installationDate: new Date('2024-02-20'),
          branchLocation: 'coleraine',
          assignedInstallerId: 'INST015',
          contractFileName: 'contract_015.pdf',
          createdAt: new Date('2024-02-18'),
          updatedAt: new Date('2024-02-19')
        }
      ];
      
      setProjects(mockProjects);
      
      // Calculate KPIs
      const kpis = calculateKPIs(mockProjects);
      setKpiData(kpis);

    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  const calculateKPIs = (projectList: Project[]): KPIData => {
    const now = new Date();
    const weekStart = new Date(now.setDate(now.getDate() - now.getDay()));
    const weekEnd = new Date(weekStart.getTime() + 6 * 24 * 60 * 60 * 1000);

    return {
      activeProjects: projectList.filter(p => p.currentStage < 12).length,
      weeklyInstallations: projectList.filter(p => {
        if (!p.installationDate) return false;
        const installDate = new Date(p.installationDate);
        return installDate >= weekStart && installDate <= weekEnd;
      }).length,
      pendingMeasurements: projectList.filter(p => p.currentStage === 1).length,
      overdueActions: projectList.filter(p => {
        const daysSinceUpdate = Math.floor(
          (now.getTime() - new Date(p.updatedAt).getTime()) / (1000 * 60 * 60 * 24)
        );
        return daysSinceUpdate > 7;
      }).length,
      monthlyRevenue: projectList
        .filter(p => p.currentStage >= 10)
        .reduce((sum, p) => sum + (p.projectValue || 0), 0),
      completionRate: projectList.length > 0 
        ? Math.round((projectList.filter(p => p.currentStage === 12).length / projectList.length) * 100)
        : 0,
    };
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="flex items-center gap-2">
          <RefreshCw className="w-8 h-8 animate-spin text-gray-400" />
          <span className="text-gray-600">Loading dashboard...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-900">
          {t('title') || 'HHI Project Dashboard'}
        </h1>
        <p className="text-gray-600">
          {t('welcome') || 'Welcome back! Here\'s your project overview.'}
        </p>
      </div>

      {/* KPI Cards */}
      {kpiData && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Projects</CardTitle>
              <div className="h-4 w-4 bg-blue-500 rounded" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{kpiData.activeProjects}</div>
              <p className="text-xs text-muted-foreground">Projects in progress</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Weekly Installations</CardTitle>
              <div className="h-4 w-4 bg-green-500 rounded" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{kpiData.weeklyInstallations}</div>
              <p className="text-xs text-muted-foreground">This week</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Pending Measurements</CardTitle>
              <div className="h-4 w-4 bg-yellow-500 rounded" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{kpiData.pendingMeasurements}</div>
              <p className="text-xs text-muted-foreground">Awaiting survey</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Overdue Actions</CardTitle>
              <div className={`h-4 w-4 rounded ${kpiData.overdueActions > 0 ? 'bg-red-500' : 'bg-gray-500'}`} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{kpiData.overdueActions}</div>
              <p className="text-xs text-muted-foreground">Need attention</p>
              {kpiData.overdueActions > 0 && (
                <Badge variant="destructive" className="text-xs mt-2">
                  Needs attention
                </Badge>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Monthly Revenue</CardTitle>
              <div className="h-4 w-4 bg-emerald-500 rounded" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">£{kpiData.monthlyRevenue.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground">This month</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Completion Rate</CardTitle>
              <div className="h-4 w-4 bg-purple-500 rounded" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{kpiData.completionRate}%</div>
              <p className="text-xs text-muted-foreground">Overall success</p>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Projects List */}
      <Card>
        <CardHeader>
          <CardTitle>{t('recent_projects') || 'Recent Projects'}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {projects.slice(0, 5).map((project) => (
              <div key={project.id} className="flex items-center justify-between p-4 border rounded-lg">
                <div>
                  <h3 className="font-semibold">{project.clientName}</h3>
                  <p className="text-sm text-gray-600">{project.serviceType} - {project.branchLocation}</p>
                </div>
                <div className="text-right">
                  <div className="text-sm font-medium">Stage {project.currentStage}</div>
                  <div className="text-sm text-gray-600">
                    £{project.projectValue?.toLocaleString() || '0'}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Branch Summary */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        {['belfast', 'lisburn', 'bangor', 'newtownabbey', 'coleraine'].map((branch) => {
          const branchProjects = projects.filter(p => p.branchLocation === branch);
          return (
            <Card key={branch}>
              <CardHeader>
                <CardTitle className="text-sm font-medium capitalize">
                  {branch}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{branchProjects.length}</div>
                <p className="text-xs text-muted-foreground">
                  Active projects
                </p>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
};

export default DashboardIndexPage;