'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { apiService } from '@/lib/api';
import { Project, Customer, User } from '@/lib/mock-data';
import { getProjectStatusColor } from '@/lib/colors';

export default function NewProjectPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [workers, setWorkers] = useState<User[]>([]);
  const [formData, setFormData] = useState({
    customerId: '',
    title: '',
    category: '',
    status: 'Contact Received',
    branch: '',
    assignedWorker: '',
    value: '',
    description: '',
    address: '',
    subcontractor: '',
    showStatusDropdown: false // Added for status dropdown
  });

  const categories = [
    'Bathrooms',
    'Kitchens', 
    'Windows & Doors',
    'HD Decking',
    'PVC Fascia Soffit & Guttering'
  ];

  const branches = ['Belfast', 'Newtownabbey', 'Lisburn', 'Bangor', 'Coleraine'];
  const statuses = [
    'Contact Received',
    'Quote Sent',
    'Contract Signed', 
    'Materials Received',
    'Installation Scheduled',
    'Installation Completed',
    'Repair Completed',
    'Invoice Sent',
    'Awaiting Payment',
    'Paid',
    'Awaiting Review'
  ];



  useEffect(() => {
    loadFormData();
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Element;
      if (!target.closest('.status-dropdown')) {
        setFormData(prev => ({ ...prev, showStatusDropdown: false }));
      }
    };

    if (formData.showStatusDropdown) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [formData.showStatusDropdown]);

  const loadFormData = async () => {
    try {
      const [customersRes, usersRes] = await Promise.all([
        apiService.getCustomers(1, 100),
        apiService.getUsers(1, 100)
      ]);
      setCustomers(customersRes.data);
      setWorkers(usersRes.data.filter(u => u.role === 'branch_worker'));
    } catch (error) {
      console.error('Error loading form data:', error);
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.customerId || !formData.title || !formData.category || !formData.branch) {
      alert('Please fill in all required fields');
      return;
    }

    try {
      setLoading(true);
      
      const newProject: Omit<Project, 'id'> = {
        customerId: formData.customerId,
        title: formData.title,
        category: formData.category,
        status: formData.status,
        branch: formData.branch,
        assignedWorker: formData.assignedWorker,
        value: parseFloat(formData.value) || 0,
        createdDate: new Date().toISOString(),
        description: formData.description,
        address: formData.address,
        subcontractor: formData.subcontractor || undefined,
        timeline: [{
          date: new Date().toISOString(),
          status: formData.status,
          note: 'Project created',
          type: 'other'
        }]
      };

      const response = await apiService.createProject(newProject);
      
      // Redirect to the new project
      router.push(`/projects/${response.data.id}`);
    } catch (error) {
      console.error('Error creating project:', error);
      alert('Error creating project. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Button 
                variant="ghost" 
                onClick={() => router.back()}
                className="text-gray-600"
              >
                ← Back
              </Button>
              <span className="text-gray-400">/</span>
              <span className="text-gray-600">New Project</span>
            </div>
            <h1 className="text-3xl font-bold text-gray-900">Create New Project</h1>
            <p className="mt-2 text-sm text-gray-600">
              Add a new project to the HHI system
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Basic Information */}
            <Card>
              <div className="p-6 pb-0">
                <div className="text-lg font-semibold mb-2">Basic Information</div>
              </div>
              <div className="p-6 pt-4 space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Customer *
                  </label>
                  <select
                    value={formData.customerId}
                    onChange={(e) => handleInputChange('customerId', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary"
                    required
                  >
                    <option value="">Select customer</option>
                    {customers.map(customer => (
                      <option key={customer.id} value={customer.id}>
                        {customer.name} - {customer.email}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Project Title *
                  </label>
                  <Input
                    type="text"
                    value={formData.title}
                    onChange={(e) => handleInputChange('title', e.target.value)}
                    placeholder="Enter project title"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Category *
                  </label>
                  <select
                    value={formData.category}
                    onChange={(e) => handleInputChange('category', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary"
                    required
                  >
                    <option value="">Select category</option>
                    {categories.map(category => (
                      <option key={category} value={category}>{category}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Description
                  </label>
                  <textarea
                    value={formData.description}
                    onChange={(e) => handleInputChange('description', e.target.value)}
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary"
                    placeholder="Describe the project requirements..."
                  />
                </div>
              </div>
            </Card>

            {/* Project Details */}
            <Card>
              <div className="p-6 pb-0">
                <div className="text-lg font-semibold mb-2">Project Details</div>
              </div>
              <div className="p-6 pt-4 space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Status
                  </label>
                  <div className="relative status-dropdown">
                    <button
                      type="button"
                      onClick={() => setFormData(prev => ({ ...prev, showStatusDropdown: !prev.showStatusDropdown }))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary text-left flex items-center justify-between"
                    >
                      <div className="flex items-center gap-2">
                        {formData.status && (
                                            <Badge 
                    variant="outline"
                    className={getProjectStatusColor(formData.status)}
                  >
                    {formData.status}
                  </Badge>
                        )}
                        {!formData.status && (
                          <span className="text-gray-500">Select status</span>
                        )}
                      </div>
                      <svg className="h-4 w-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </button>
                    
                    {formData.showStatusDropdown && (
                      <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-auto">
                        {statuses.map(status => (
                          <button
                            key={status}
                            type="button"
                            onClick={() => {
                              handleInputChange('status', status);
                              setFormData(prev => ({ ...prev, showStatusDropdown: false }));
                            }}
                            className="w-full px-3 py-2 text-left hover:bg-gray-50 flex items-center gap-2"
                          >
                                                    <Badge 
                          variant="outline"
                          className={getProjectStatusColor(status)}
                        >
                          {status}
                        </Badge>
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Branch *
                  </label>
                  <select
                    value={formData.branch}
                    onChange={(e) => handleInputChange('branch', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary"
                    required
                  >
                    <option value="">Select branch</option>
                    {branches.map(branch => (
                      <option key={branch} value={branch}>{branch}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Assigned Worker
                  </label>
                  <select
                    value={formData.assignedWorker}
                    onChange={(e) => handleInputChange('assignedWorker', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary"
                  >
                    <option value="">Select worker</option>
                    {workers.map(worker => (
                      <option key={worker.id} value={worker.name}>
                        {worker.name} - {worker.role}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Project Value (£)
                  </label>
                  <Input
                    type="number"
                    value={formData.value}
                    onChange={(e) => handleInputChange('value', e.target.value)}
                    placeholder="0.00"
                    min="0"
                    step="0.01"
                  />
                </div>
              </div>
            </Card>

            {/* Location Information */}
            <Card className="mt-6">
              <div className="p-6 pb-0">
                <div className="text-lg font-semibold mb-2">Location Information</div>
              </div>
              <div className="p-6 pt-4 space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Project Address
                  </label>
                  <textarea
                    value={formData.address}
                    onChange={(e) => handleInputChange('address', e.target.value)}
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary"
                    placeholder="Enter project address..."
                  />
                </div>
              </div>
            </Card>

            {/* Additional Information */}
            <Card className="mt-6">
              <div className="p-6 pb-0">
                <div className="text-lg font-semibold mb-2">Additional Information</div>
              </div>
              <div className="p-6 pt-4 space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Subcontractor
                  </label>
                  <Input
                    type="text"
                    value={formData.subcontractor}
                    onChange={(e) => handleInputChange('subcontractor', e.target.value)}
                    placeholder="Enter subcontractor name (optional)"
                  />
                </div>
              </div>
            </Card>
          </div>

          {/* Form Actions */}
          <div className="mt-6 flex justify-end gap-4">
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
            >
              {loading ? 'Creating...' : 'Create Project'}
            </Button>
          </div>
        </form>
      </div>
    </DashboardLayout>
  );
} 