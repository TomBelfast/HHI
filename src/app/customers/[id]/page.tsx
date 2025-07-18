'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Customer, Project } from '@/lib/mock-data';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { ArrowLeft, Mail, Phone, MapPin, Calendar, Building, Plus } from 'lucide-react';
import { getBranchColor, getCustomerStatusColor, getProjectStatusColor, getDepartmentColor, getCommunicationTypeColor } from '@/lib/colors';
import { AddCommunicationModal } from '@/components/customers/AddCommunicationModal';
import ClientDocuments from '@/components/client/ClientDocuments';

export default function CustomerDetailsPage() {
  const params = useParams();
  const router = useRouter();
  const [customer, setCustomer] = useState<Customer | null>(null);
  const [customerProjects, setCustomerProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [showAddCommunication, setShowAddCommunication] = useState(false);

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

  const handleAddCommunication = (communication: any) => {
    if (customer) {
      const updatedCustomer = {
        ...customer,
        communicationHistory: [
          ...(customer.communicationHistory || []),
          communication
        ]
      };
      setCustomer(updatedCustomer);
    }
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
          <h1 className="text-3xl font-bold text-gray-900 dark:text-foreground">{customer.name}</h1>
          <p className="text-gray-600 dark:text-muted-foreground">Customer Details</p>
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
                  <Badge 
                    variant="outline"
                    className={getCustomerStatusColor(customer.status)}
                  >
                    {customer.status.charAt(0).toUpperCase() + customer.status.slice(1)}
                  </Badge>
                </div>
                
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-gray-700 dark:text-foreground">Department:</span>
                  <Badge variant="outline" className={getDepartmentColor(customer.department)}>
                    {customer.department}
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
                      className="border rounded-lg p-4 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors cursor-pointer"
                      onClick={() => router.push(`/projects/${project.id}`)}
                    >
                                             <div className="flex items-start justify-between mb-2">
                         <div>
                           <h3 className="text-sm font-semibold text-gray-900 dark:text-foreground">{project.title}</h3>
                           <p className="text-sm text-gray-600 dark:text-muted-foreground">{project.description}</p>
                         </div>
                         <Badge 
                           variant="outline"
                           className={getProjectStatusColor(project.status)}
                         >
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
                          <Badge 
                            variant="outline"
                            className={getBranchColor(project.branch)}
                          >
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

            {/* Communication History */}
      <div className="mt-8">
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <Phone className="h-5 w-5" />
                Communication History ({customer.communicationHistory?.length || 0})
              </CardTitle>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowAddCommunication(true)}
                className="flex items-center gap-2"
              >
                <Plus className="h-4 w-4" />
                Add Communication
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            {customer.communicationHistory && customer.communicationHistory.length > 0 ? (
              <div className="space-y-4">
                {customer.communicationHistory.map((communication, index) => (
                  <div key={index} className="border rounded-lg p-4">
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <Badge variant="outline" className={getCommunicationTypeColor(communication.type)}>
                          {communication.type.charAt(0).toUpperCase() + communication.type.slice(1)}
                        </Badge>
                        <span className="text-sm text-gray-500 dark:text-muted-foreground">
                          {formatDate(communication.date)}
                        </span>
                      </div>
                    </div>
                    <p className="text-sm text-gray-900 dark:text-foreground mb-2">
                      {communication.summary}
                    </p>
                    {communication.outcome && (
                      <p className="text-sm text-gray-600 dark:text-muted-foreground">
                        <strong>Outcome:</strong> {communication.outcome}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8 text-gray-500">
                <p>No communication history found.</p>
                <p className="text-sm mt-2">Click "Add Communication" to start tracking interactions.</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Client Documents */}
      <div className="mt-8">
        <Card>
          <CardContent className="p-6">
            <ClientDocuments 
              clientId={customer.id} 
              clientName={customer.name} 
            />
          </CardContent>
        </Card>
      </div>

      {/* Add Communication Modal */}
      <AddCommunicationModal
        isOpen={showAddCommunication}
        onClose={() => setShowAddCommunication(false)}
        onAdd={handleAddCommunication}
      />
      </div>
    );
} 