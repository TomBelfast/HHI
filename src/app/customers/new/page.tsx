'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { ProtectedRoute } from '@/components/auth/ProtectedRoute';
import { PermissionGate } from '@/components/auth/PermissionGate';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Label } from '@/components/ui/Label';
import { Textarea } from '@/components/ui/Textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/Select';
import { Card } from '@/components/ui/Card';
import { apiService } from '@/lib/api';
import { Customer } from '@/lib/mock-data';
import { PERMISSIONS } from '@/lib/auth';
import { ArrowLeft, Save, UserPlus } from 'lucide-react';

export default function NewCustomerPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    town: '',
    postcode: '',
    branch: '',
    customerType: 'residential' as 'residential' | 'commercial' | 'prospect',
    status: 'active' as 'active' | 'prospect' | 'not accepted' | 'completed' | 'suspended',
    preferredContact: 'email' as 'email' | 'phone' | 'sms',
    communicationFrequency: 'monthly' as 'weekly' | 'monthly' | 'quarterly',
    specialRequirements: '',
    companyName: '',
    vatNumber: '',
    businessType: ''
  });

  const branches = ['Belfast', 'Newtownabbey', 'Lisburn', 'Bangor', 'Coleraine'];

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const customerData: Omit<Customer, 'id'> = {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        address: `${formData.address}, ${formData.town}`,
        postcode: formData.postcode,
        branch: formData.branch,
        registrationDate: new Date().toISOString(),
        totalProjects: 0,
        totalValue: 0,
        rating: 0,
        customerType: formData.customerType,
        status: formData.status,
        preferences: {
          preferredContact: formData.preferredContact,
          communicationFrequency: formData.communicationFrequency,
          specialRequirements: formData.specialRequirements || undefined
        },
        companyInfo: formData.customerType === 'commercial' ? {
          companyName: formData.companyName || undefined,
          vatNumber: formData.vatNumber || undefined,
          businessType: formData.businessType || undefined
        } : undefined
      };

      await apiService.createCustomer(customerData);
      router.push('/customers');
    } catch (error) {
      console.error('Error creating customer:', error);
      alert('Failed to create customer. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <ProtectedRoute permissions={[PERMISSIONS.CUSTOMERS_WRITE]}>
      <DashboardLayout>
        <div className="space-y-6">
          {/* Header */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => router.back()}
                className="flex items-center space-x-2"
              >
                <ArrowLeft className="h-4 w-4" />
                <span>Back</span>
              </Button>
              <div>
                <h1 className="text-3xl font-bold text-gray-900 dark:text-foreground">Add New Customer</h1>
                <p className="mt-2 text-sm text-gray-600 dark:text-muted-foreground">
                  Create a new customer record in the HHI system
                </p>
              </div>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Basic Information */}
              <Card>
                <div className="p-6 pb-0">
                  <div className="flex items-center space-x-2 mb-2">
                    <UserPlus className="h-5 w-5" />
                    <span className="text-lg font-semibold">Basic Information</span>
                  </div>
                  <p className="text-sm text-gray-600 dark:text-muted-foreground">
                    Essential customer details
                  </p>
                </div>
                <div className="p-6 pt-4 space-y-4">
                  <div>
                    <Label htmlFor="name">Full Name *</Label>
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) => handleInputChange('name', e.target.value)}
                      placeholder="John Doe"
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="email">Email Address *</Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      placeholder="john.doe@example.com"
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="phone">Phone Number *</Label>
                    <Input
                      id="phone"
                      value={formData.phone}
                      onChange={(e) => handleInputChange('phone', e.target.value)}
                      placeholder="+44 123 456 7890"
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="address">Address *</Label>
                    <Textarea
                      id="address"
                      value={formData.address}
                      onChange={(e) => handleInputChange('address', e.target.value)}
                      placeholder="123 Main Street"
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="town">Town *</Label>
                    <Input
                      id="town"
                      value={formData.town}
                      onChange={(e) => handleInputChange('town', e.target.value)}
                      placeholder="Belfast"
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="postcode">Postcode *</Label>
                    <Input
                      id="postcode"
                      value={formData.postcode}
                      onChange={(e) => handleInputChange('postcode', e.target.value)}
                      placeholder="BT1 1AA"
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="branch">Branch *</Label>
                    <Select value={formData.branch} onValueChange={(value: string) => handleInputChange('branch', value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a branch" />
                      </SelectTrigger>
                      <SelectContent>
                        {branches.map(branch => (
                          <SelectItem key={branch} value={branch}>{branch}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </Card>

              {/* Customer Type & Status */}
              <Card>
                <div className="p-6 pb-0">
                  <div className="text-lg font-semibold mb-2">Customer Classification</div>
                  <p className="text-sm text-gray-600 dark:text-muted-foreground">
                    Customer type and status information
                  </p>
                </div>
                <div className="p-6 pt-4 space-y-4">
                  <div>
                    <Label htmlFor="customerType">Customer Type *</Label>
                    <Select value={formData.customerType} onValueChange={(value: 'residential' | 'commercial' | 'prospect') => handleInputChange('customerType', value)}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="residential">Residential</SelectItem>
                        <SelectItem value="commercial">Commercial</SelectItem>
                        <SelectItem value="prospect">Prospect</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="status">Status *</Label>
                    <Select value={formData.status} onValueChange={(value: 'active' | 'prospect' | 'not accepted' | 'completed' | 'suspended') => handleInputChange('status', value)}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="active">Active</SelectItem>
                        <SelectItem value="prospect">Prospect</SelectItem>
                        <SelectItem value="not accepted">Not Accepted</SelectItem>
                        <SelectItem value="completed">Completed</SelectItem>
                        <SelectItem value="suspended">Suspended</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="preferredContact">Preferred Contact Method</Label>
                    <Select value={formData.preferredContact} onValueChange={(value: 'email' | 'phone' | 'sms') => handleInputChange('preferredContact', value)}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="email">Email</SelectItem>
                        <SelectItem value="phone">Phone</SelectItem>
                        <SelectItem value="sms">SMS</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="communicationFrequency">Communication Frequency</Label>
                    <Select value={formData.communicationFrequency} onValueChange={(value: 'weekly' | 'monthly' | 'quarterly') => handleInputChange('communicationFrequency', value)}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="weekly">Weekly</SelectItem>
                        <SelectItem value="monthly">Monthly</SelectItem>
                        <SelectItem value="quarterly">Quarterly</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="specialRequirements">Special Requirements</Label>
                    <Textarea
                      id="specialRequirements"
                      value={formData.specialRequirements}
                      onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => handleInputChange('specialRequirements', e.target.value)}
                      placeholder="Any special requirements or notes..."
                    />
                  </div>
                </div>
              </Card>
            </div>

            {/* Company Information (for commercial customers) */}
            {formData.customerType === 'commercial' && (
              <Card>
                <div className="p-6 pb-0">
                  <div className="text-lg font-semibold mb-2">Company Information</div>
                  <p className="text-sm text-gray-600 dark:text-muted-foreground">
                    Business details for commercial customers
                  </p>
                </div>
                <div className="p-6 pt-4 space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="companyName">Company Name</Label>
                      <Input
                        id="companyName"
                        value={formData.companyName}
                        onChange={(e) => handleInputChange('companyName', e.target.value)}
                        placeholder="Company Ltd."
                      />
                    </div>

                    <div>
                      <Label htmlFor="vatNumber">VAT Number</Label>
                      <Input
                        id="vatNumber"
                        value={formData.vatNumber}
                        onChange={(e) => handleInputChange('vatNumber', e.target.value)}
                        placeholder="GB123456789"
                      />
                    </div>

                    <div>
                      <Label htmlFor="businessType">Business Type</Label>
                      <Input
                        id="businessType"
                        value={formData.businessType}
                        onChange={(e) => handleInputChange('businessType', e.target.value)}
                        placeholder="Retail, Manufacturing, etc."
                      />
                    </div>
                  </div>
                </div>
              </Card>
            )}

            {/* Submit Button */}
            <div className="flex justify-end space-x-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => router.back()}
                disabled={loading}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={loading}
                className="flex items-center space-x-2"
              >
                <Save className="h-4 w-4" />
                <span>{loading ? 'Creating...' : 'Create Customer'}</span>
              </Button>
            </div>
          </form>
        </div>
      </DashboardLayout>
    </ProtectedRoute>
  );
} 