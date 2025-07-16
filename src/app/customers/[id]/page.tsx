'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Customer, Project } from '@/lib/mock-data';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { ArrowLeft, Mail, Phone, MapPin, Calendar, Building } from 'lucide-react';

export default function CustomerDetailsPage() {
  const params = useParams();
  const router = useRouter();
  const [customer, setCustomer] = useState<Customer | null>(null);
  const [customerProjects, setCustomerProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate API call to get customer details
    const fetchCustomerDetails = async () => {
      try {
        // Import mock data
        const { mockCustomers, mockProjects } = await import('@/lib/mock-data');
        
        const customerId = params.id as string;
        const foundCustomer = mockCustomers.find((c: Customer) => c.id === customerId);
        
        if (foundCustomer) {
          setCustomer(foundCustomer);
          // Find all projects for this customer
          const customerProjects = mockProjects.filter((p: Project) => p.customerId === customerId);
          setCustomerProjects(customerProjects);
        }
      } catch (error) {
        console.error('Error fetching customer details:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCustomerDetails();
  }, [params.id]);

  // Customer status color mapping
  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'active':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'not accepted':
        return 'bg-red-100 text-red-800 border-red-200';
      case 'prospect':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'suspended':
        return 'bg-gray-100 text-gray-800 border-gray-200';
      case 'completed':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  // Project status color mapping
  const getProjectStatusColor = (status: string) => {
    switch (status) {
      case 'Quote Sent':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'Approved':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'In Progress':
        return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'Installation Completed':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'Materials Received':
        return 'bg-purple-100 text-purple-800 border-purple-200';
      case 'Installation Scheduled':
        return 'bg-indigo-100 text-indigo-800 border-indigo-200';
      case 'Repair Completed':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'Invoice Sent':
        return 'bg-cyan-100 text-cyan-800 border-cyan-200';
      case 'Awaiting Payment':
        return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'Paid':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'Awaiting Review':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  // Branch color mapping
  const getBranchColor = (branchName: string) => {
    const branchColors: Record<string, { bg: string; text: string; border: string }> = {
      'Belfast': { bg: 'bg-red-100', text: 'text-red-800', border: 'border-red-200' },
      'Newtownabbey': { bg: 'bg-blue-100', text: 'text-blue-800', border: 'border-blue-200' },
      'Lisburn': { bg: 'bg-green-100', text: 'text-green-800', border: 'border-green-200' },
      'Bangor': { bg: 'bg-purple-100', text: 'text-purple-800', border: 'border-purple-200' },
      'Coleraine': { bg: 'bg-orange-100', text: 'text-orange-800', border: 'border-orange-200' }
    };
    
    return branchColors[branchName] || { bg: 'bg-gray-100', text: 'text-gray-800', border: 'border-gray-200' };
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-GB', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-GB', {
      style: 'currency',
      currency: 'GBP'
    }).format(amount);
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-center h-64">
          <div className="text-lg">Loading customer details...</div>
        </div>
      </div>
    );
  }

  if (!customer) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-center h-64">
          <div className="text-lg text-red-600">Customer not found</div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="flex items-center gap-4 mb-8">
        <Button
          variant="outline"
          size="sm"
          onClick={() => router.back()}
          className="flex items-center gap-2"
        >
          <ArrowLeft className="h-4 w-4" />
          Back
        </Button>
        <div>
          <h1 className="text-3xl font-bold text-gray-900">{customer.name}</h1>
          <p className="text-gray-600">Customer Details</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Customer Information */}
        <div className="lg:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Building className="h-5 w-5" />
                Customer Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="text-sm font-semibold text-gray-900 dark:text-foreground">{customer.name}</h3>
                <p className="text-sm text-gray-600 dark:text-muted-foreground">{customer.email}</p>
              </div>

              <div className="space-y-3">
                <div className="flex items-center gap-2 text-sm">
                  <Mail className="h-4 w-4 text-gray-500 dark:text-muted-foreground" />
                  <span className="text-gray-900 dark:text-foreground">{customer.email}</span>
                </div>
                
                <div className="flex items-center gap-2 text-sm">
                  <Phone className="h-4 w-4 text-gray-500 dark:text-muted-foreground" />
                  <span className="text-gray-900 dark:text-foreground">{customer.phone}</span>
                </div>
                
                <div className="flex items-center gap-2 text-sm">
                  <MapPin className="h-4 w-4 text-gray-500 dark:text-muted-foreground" />
                  <span className="text-gray-900 dark:text-foreground">{customer.address}</span>
                </div>
                
                <div className="flex items-center gap-2 text-sm">
                  <Calendar className="h-4 w-4 text-gray-500 dark:text-muted-foreground" />
                  <span className="text-gray-900 dark:text-foreground">Registered: {formatDate(customer.registrationDate)}</span>
                </div>
              </div>

              <div className="pt-4 border-t">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-gray-700 dark:text-foreground">Status:</span>
                  <Badge className={`${getStatusColor(customer.status)} border text-xs font-medium`}>
                    {customer.status.charAt(0).toUpperCase() + customer.status.slice(1)}
                  </Badge>
                </div>
                
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-gray-700 dark:text-foreground">Type:</span>
                  <Badge variant="outline" className="text-xs font-medium">
                    {customer.customerType.charAt(0).toUpperCase() + customer.customerType.slice(1)}
                  </Badge>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-700 dark:text-foreground">Rating:</span>
                  <div className="flex items-center gap-1">
                    <span className="text-sm font-medium text-gray-900 dark:text-foreground">{customer.rating}</span>
                    <span className="text-yellow-500">★</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Customer Projects */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Customer Projects ({customerProjects.length})</CardTitle>
            </CardHeader>
            <CardContent>
              {customerProjects.length === 0 ? (
                <div className="text-center py-8 text-gray-500">
                  <p>No projects found for this customer.</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {customerProjects.map((project) => (
                    <div
                      key={project.id}
                      className="border rounded-lg p-4 hover:bg-gray-50 transition-colors cursor-pointer"
                      onClick={() => router.push(`/projects/${project.id}`)}
                    >
                                             <div className="flex items-start justify-between mb-2">
                         <div>
                           <h3 className="text-sm font-semibold text-gray-900 dark:text-foreground">{project.title}</h3>
                           <p className="text-sm text-gray-600 dark:text-muted-foreground">{project.description}</p>
                         </div>
                         <Badge className={`${getProjectStatusColor(project.status)} border text-xs font-medium`}>
                           {project.status}
                         </Badge>
                       </div>
                       
                       <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                         <div>
                           <span className="text-sm text-gray-500 dark:text-muted-foreground">Value:</span>
                           <p className="text-sm font-medium text-gray-900 dark:text-foreground">{formatCurrency(project.value)}</p>
                         </div>
                         <div>
                           <span className="text-sm text-gray-500 dark:text-muted-foreground">Created:</span>
                           <p className="text-sm font-medium text-gray-900 dark:text-foreground">{formatDate(project.createdDate)}</p>
                         </div>
                         <div>
                           <span className="text-sm text-gray-500 dark:text-muted-foreground">Completion:</span>
                           <p className="text-sm font-medium text-gray-900 dark:text-foreground">{project.completionDate ? formatDate(project.completionDate) : 'Pending'}</p>
                         </div>
                        <div>
                          <span className="text-sm text-gray-500 dark:text-muted-foreground">Branch:</span>
                          <Badge className={`${getBranchColor(project.branch).bg} ${getBranchColor(project.branch).text} ${getBranchColor(project.branch).border} border text-xs font-medium`}>
                            {project.branch}
                          </Badge>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
} 