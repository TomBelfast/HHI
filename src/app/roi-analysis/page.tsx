'use client';

import { useState, useEffect } from 'react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useAuth } from '@/contexts/AuthContext';
import { 
  TrendingUp, 
  DollarSign, 
  Users, 
  Clock, 
  CheckCircle, 
  AlertTriangle,
  BarChart3,
  PieChart,
  LineChart,
  Target,
  ArrowUpRight,
  ArrowDownRight,
  Calculator,
  ChartBar,
  TrendingDown
} from 'lucide-react';

interface ROIData {
  year: number;
  costs: number;
  savings: number;
  additionalRevenue: number;
  netBenefit: number;
  roi: number;
}

interface MetricData {
  metric: string;
  before: number;
  after: number;
  improvement: number;
  unit: string;
}

export default function ROIAnalysisPage() {
  const { user, isAuthenticated } = useAuth();
  const [activeTab, setActiveTab] = useState('overview');

  // Check if user is admin
  const isAdmin = user?.userType === 'admin';

  const roiData: ROIData[] = [
    { year: 1, costs: 93000, savings: 182500, additionalRevenue: 300000, netBenefit: 389500, roi: 419 },
    { year: 2, costs: 15000, savings: 182500, additionalRevenue: 300000, netBenefit: 467500, roi: 3117 },
    { year: 3, costs: 15000, savings: 182500, additionalRevenue: 300000, netBenefit: 467500, roi: 3117 }
  ];

  const operationalMetrics: MetricData[] = [
    { metric: 'Quote Time', before: 72, after: 4, improvement: -94, unit: 'hours' },
    { metric: 'Document Errors', before: 15, after: 3, improvement: -80, unit: '%' },
    { metric: 'Response Time', before: 48, after: 4, improvement: -92, unit: 'hours' },
    { metric: 'Delayed Projects', before: 30, after: 10, improvement: -67, unit: '%' },
    { metric: 'Customer Satisfaction', before: 75, after: 90, improvement: 20, unit: '%' },
    { metric: 'Customer Acquisition Cost', before: 2500, after: 1750, improvement: -30, unit: 'GBP' },
    { metric: 'Customer Retention', before: 70, after: 85, improvement: 21, unit: '%' },
    { metric: 'Employee Efficiency', before: 65, after: 85, improvement: 31, unit: '%' }
  ];

  const financialBreakdown = [
    { category: 'Development', cost: 52500, color: 'bg-blue-500' },
    { category: 'Infrastructure', cost: 10000, color: 'bg-green-500' },
    { category: 'Training', cost: 6500, color: 'bg-yellow-500' },
    { category: 'Migration', cost: 4000, color: 'bg-purple-500' },
    { category: 'Testing', cost: 5000, color: 'bg-red-500' },
    { category: 'Operational (Year 1)', cost: 15000, color: 'bg-indigo-500' }
  ];

  const savingsBreakdown = [
    { category: 'Process Automation', savings: 52500, color: 'bg-green-500' },
    { category: 'Project Optimization', savings: 40000, color: 'bg-blue-500' },
    { category: 'Customer Communication', savings: 30000, color: 'bg-yellow-500' },
    { category: 'Error Reduction', savings: 35000, color: 'bg-purple-500' },
    { category: 'Resource Optimization', savings: 25000, color: 'bg-red-500' }
  ];

  const revenueBreakdown = [
    { category: 'Conversion Growth', revenue: 175000, color: 'bg-green-500' },
    { category: 'Repeat Orders', revenue: 125000, color: 'bg-blue-500' }
  ];

  if (!isAuthenticated) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <AlertTriangle className="w-16 h-16 text-red-500 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-gray-900">Authentication Required</h2>
            <p className="text-gray-600">Please log in to access this page.</p>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  if (!isAdmin) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <AlertTriangle className="w-16 h-16 text-red-500 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-gray-900">Access Denied</h2>
            <p className="text-gray-600">This page is only available to administrators.</p>
            <p className="text-sm text-gray-500 mt-2">Current role: {user?.userType || 'Unknown'}</p>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold">ROI Analysis Dashboard</h1>
            <p className="text-muted-foreground">
              Comprehensive analysis of HHI Management System benefits for 1M GBP/month revenue company
            </p>
          </div>
          <Badge className="bg-green-100 text-green-800">
            <CheckCircle className="w-4 h-4 mr-1" />
            Admin Access
          </Badge>
        </div>

        {/* Key Metrics Cards */}
        <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <TrendingUp className="w-4 h-4 text-green-600" />
                <div>
                  <p className="text-sm font-medium">Year 1 ROI</p>
                  <p className="text-2xl font-bold text-green-600">419%</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <DollarSign className="w-4 h-4 text-blue-600" />
                <div>
                  <p className="text-sm font-medium">Net Benefit (Year 1)</p>
                  <p className="text-2xl font-bold text-blue-600">£389,500</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <Users className="w-4 h-4 text-purple-600" />
                <div>
                  <p className="text-sm font-medium">Customer Satisfaction</p>
                  <p className="text-2xl font-bold text-purple-600">+20%</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <Clock className="w-4 h-4 text-orange-600" />
                <div>
                  <p className="text-sm font-medium">Time Savings</p>
                  <p className="text-2xl font-bold text-orange-600">-85%</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview" className="flex items-center gap-2">
              <BarChart3 className="w-4 h-4" />
              Overview
            </TabsTrigger>
            <TabsTrigger value="financial" className="flex items-center gap-2">
              <DollarSign className="w-4 h-4" />
              Financial
            </TabsTrigger>
            <TabsTrigger value="metrics" className="flex items-center gap-2">
              <Target className="w-4 h-4" />
              Metrics
            </TabsTrigger>
            <TabsTrigger value="timeline" className="flex items-center gap-2">
              <LineChart className="w-4 h-4" />
              Timeline
            </TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            <div className="grid gap-6 grid-cols-1 lg:grid-cols-2">
              {/* ROI Chart */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <TrendingUp className="w-5 h-5" />
                    3-Year ROI Projection
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {roiData.map((data) => (
                      <div key={data.year} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div>
                          <p className="font-medium">Year {data.year}</p>
                          <p className="text-sm text-gray-600">ROI: {data.roi}%</p>
                        </div>
                        <div className="text-right">
                          <p className="font-bold text-green-600">£{data.netBenefit.toLocaleString()}</p>
                          <p className="text-sm text-gray-600">Net Benefit</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Key Benefits */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <CheckCircle className="w-5 h-5" />
                    Key Benefits Summary
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span>Operational Savings</span>
                      <Badge className="bg-green-100 text-green-800">£182,500/year</Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Additional Revenue</span>
                      <Badge className="bg-blue-100 text-blue-800">£300,000/year</Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Implementation Cost</span>
                      <Badge className="bg-red-100 text-red-800">£93,000</Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Customer Satisfaction</span>
                      <Badge className="bg-purple-100 text-purple-800">+20%</Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Error Reduction</span>
                      <Badge className="bg-orange-100 text-orange-800">-80%</Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Financial Tab */}
          <TabsContent value="financial" className="space-y-6">
            <div className="grid gap-6 grid-cols-1 lg:grid-cols-3">
              {/* Implementation Costs */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Calculator className="w-5 h-5" />
                    Implementation Costs
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {financialBreakdown.map((item) => (
                      <div key={item.category} className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <div className={`w-3 h-3 rounded-full ${item.color}`}></div>
                          <span className="text-sm">{item.category}</span>
                        </div>
                        <span className="font-medium">£{item.cost.toLocaleString()}</span>
                      </div>
                    ))}
                    <div className="border-t pt-3">
                      <div className="flex items-center justify-between font-bold">
                        <span>Total</span>
                        <span>£93,000</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Annual Savings */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <TrendingUp className="w-5 h-5" />
                    Annual Savings
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {savingsBreakdown.map((item) => (
                      <div key={item.category} className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <div className={`w-3 h-3 rounded-full ${item.color}`}></div>
                          <span className="text-sm">{item.category}</span>
                        </div>
                        <span className="font-medium text-green-600">£{item.savings.toLocaleString()}</span>
                      </div>
                    ))}
                    <div className="border-t pt-3">
                      <div className="flex items-center justify-between font-bold text-green-600">
                        <span>Total</span>
                        <span>£182,500</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Additional Revenue */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <DollarSign className="w-5 h-5" />
                    Additional Revenue
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {revenueBreakdown.map((item) => (
                      <div key={item.category} className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <div className={`w-3 h-3 rounded-full ${item.color}`}></div>
                          <span className="text-sm">{item.category}</span>
                        </div>
                        <span className="font-medium text-blue-600">£{item.revenue.toLocaleString()}</span>
                      </div>
                    ))}
                    <div className="border-t pt-3">
                      <div className="flex items-center justify-between font-bold text-blue-600">
                        <span>Total</span>
                        <span>£300,000</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Metrics Tab */}
          <TabsContent value="metrics" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="w-5 h-5" />
                  Operational Metrics Comparison
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left p-3">Metric</th>
                        <th className="text-center p-3">Before</th>
                        <th className="text-center p-3">After</th>
                        <th className="text-center p-3">Improvement</th>
                      </tr>
                    </thead>
                    <tbody>
                      {operationalMetrics.map((metric) => (
                        <tr key={metric.metric} className="border-b hover:bg-gray-50">
                          <td className="p-3 font-medium">{metric.metric}</td>
                          <td className="p-3 text-center">{metric.before}{metric.unit}</td>
                          <td className="p-3 text-center">{metric.after}{metric.unit}</td>
                          <td className="p-3 text-center">
                            <Badge className={metric.improvement > 0 ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}>
                              {metric.improvement > 0 ? (
                                <ArrowUpRight className="w-3 h-3 mr-1" />
                              ) : (
                                <ArrowDownRight className="w-3 h-3 mr-1" />
                              )}
                              {Math.abs(metric.improvement)}%
                            </Badge>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Timeline Tab */}
          <TabsContent value="timeline" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <LineChart className="w-5 h-5" />
                  Implementation Timeline & ROI
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {/* Timeline */}
                  <div className="space-y-4">
                    <h3 className="font-semibold">Implementation Phases</h3>
                    <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
                      <div className="p-4 border rounded-lg">
                        <div className="font-medium text-blue-600">Phase 1 (Months 1-2)</div>
                        <div className="text-sm text-gray-600 mt-1">Analysis & Design</div>
                        <div className="text-xs text-gray-500 mt-2">Requirements analysis, architecture design, infrastructure setup</div>
                      </div>
                      <div className="p-4 border rounded-lg">
                        <div className="font-medium text-green-600">Phase 2 (Months 3-4)</div>
                        <div className="text-sm text-gray-600 mt-1">Core Development</div>
                        <div className="text-xs text-gray-500 mt-2">Customer management, document generation, basic dashboard</div>
                      </div>
                      <div className="p-4 border rounded-lg">
                        <div className="font-medium text-purple-600">Phase 3 (Months 5-6)</div>
                        <div className="text-sm text-gray-600 mt-1">Advanced Features</div>
                        <div className="text-xs text-gray-500 mt-2">Project management, communication system, analytics</div>
                      </div>
                      <div className="p-4 border rounded-lg">
                        <div className="font-medium text-orange-600">Phase 4 (Months 7-12)</div>
                        <div className="text-sm text-gray-600 mt-1">Deployment & Optimization</div>
                        <div className="text-xs text-gray-500 mt-2">Testing, training, go-live, optimization</div>
                      </div>
                    </div>
                  </div>

                  {/* ROI Timeline */}
                  <div className="space-y-4">
                    <h3 className="font-semibold">ROI Timeline</h3>
                    <div className="space-y-3">
                      {roiData.map((data) => (
                        <div key={data.year} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                          <div>
                            <div className="font-medium">Year {data.year}</div>
                            <div className="text-sm text-gray-600">
                              Costs: £{data.costs.toLocaleString()} | 
                              Savings: £{data.savings.toLocaleString()} | 
                              Revenue: £{data.additionalRevenue.toLocaleString()}
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="text-lg font-bold text-green-600">ROI: {data.roi}%</div>
                            <div className="text-sm text-gray-600">Net: £{data.netBenefit.toLocaleString()}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Recommendations */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CheckCircle className="w-5 h-5" />
              Recommendations
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
              <div className="p-4 border rounded-lg">
                <h4 className="font-medium text-green-600 mb-2">Immediate Actions</h4>
                <ul className="text-sm space-y-1">
                  <li>• Approve implementation budget</li>
                  <li>• Assemble project team</li>
                  <li>• Select technology provider</li>
                  <li>• Prepare communication plan</li>
                </ul>
              </div>
              <div className="p-4 border rounded-lg">
                <h4 className="font-medium text-blue-600 mb-2">Short-term (3-6 months)</h4>
                <ul className="text-sm space-y-1">
                  <li>• Develop and test system</li>
                  <li>• Train employees</li>
                  <li>• Migrate data</li>
                  <li>• Launch pilot program</li>
                </ul>
              </div>
              <div className="p-4 border rounded-lg">
                <h4 className="font-medium text-purple-600 mb-2">Long-term (6-12 months)</h4>
                <ul className="text-sm space-y-1">
                  <li>• Monitor and optimize</li>
                  <li>• Expand functionality</li>
                  <li>• Integrate additional systems</li>
                  <li>• Analyze ROI and plan growth</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
} 