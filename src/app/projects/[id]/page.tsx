'use client';

import { useEffect, useState, useCallback } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { Button } from '@/components/ui/Button';

import { Badge } from '@/components/ui/Badge';
import { Card } from '@/components/ui/Card';
import { apiService } from '@/lib/api';
import { Project, Customer, User, TimelineEvent } from '@/lib/mock-data';
import { getProjectStatusColor } from '@/lib/colors';

export default function ProjectDetailPage() {
  const params = useParams();
  const router = useRouter();
  const projectId = params.id as string;
  
  const [project, setProject] = useState<Project | null>(null);
  const [customer, setCustomer] = useState<Customer | null>(null);
  const [assignedWorker, setAssignedWorker] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);
  const [newStatus, setNewStatus] = useState('');
  const [newNote, setNewNote] = useState('');

  const statuses = [
    'Quote Sent',
    'Approved',
    'In Progress',
    'Installation Completed',
    'Materials Received',
    'Installation Scheduled',
    'Repair Completed',
    'Invoice Sent',
    'Awaiting Payment',
    'Paid',
    'Awaiting Review'
  ];

  const loadProjectData = useCallback(async () => {
    try {
      setLoading(true);
      const [projectRes, customersRes, usersRes] = await Promise.all([
        apiService.getProject(projectId),
        apiService.getCustomers(1, 100),
        apiService.getUsers(1, 100)
      ]);

      setProject(projectRes.data);
      
      const customer = customersRes.data.find(c => c.id === projectRes.data.customerId);
      setCustomer(customer || null);
      
      const worker = usersRes.data.find(u => u.name === projectRes.data.assignedWorker);
      setAssignedWorker(worker || null);
    } catch (error) {
      console.error('Error loading project data:', error);
    } finally {
      setLoading(false);
    }
  }, [projectId]);

  useEffect(() => {
    loadProjectData();
  }, [loadProjectData]);

  const updateProjectStatus = async () => {
    if (!newStatus || !project) return;

    try {
      const timelineEvent: TimelineEvent = {
        date: new Date().toISOString(),
        status: newStatus,
        note: newNote || `Status updated to ${newStatus}`,
        type: 'other'
      };

      const updatedProject = {
        ...project,
        status: newStatus,
        timeline: [...(project.timeline || []), timelineEvent]
      };

      await apiService.updateProject(projectId, updatedProject);
      setProject(updatedProject);
      setNewStatus('');
      setNewNote('');
    } catch (error) {
      console.error('Error updating project status:', error);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('pl-PL', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'Bathrooms': return '🚿';
      case 'Kitchens': return '🍳';
      case 'Windows & Doors': return '🪟';
      case 'HD Decking': return '🪵';
      case 'PVC Fascia Soffit & Guttering': return '🏠';
      default: return '🔨';
    }
  };

  if (loading) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center h-64">
          <div className="text-lg">Loading project details...</div>
        </div>
      </DashboardLayout>
    );
  }

  if (!project) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center h-64">
          <div className="text-lg text-red-600">Project not found</div>
        </div>
      </DashboardLayout>
    );
  }

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
              <span className="text-gray-600">Project Details</span>
            </div>
            <h1 className="text-3xl font-bold text-gray-900">{project.title}</h1>
            <p className="mt-2 text-sm text-gray-600">
              {getCategoryIcon(project.category)} {project.category} • {project.branch}
            </p>
          </div>
          <div className="mt-4 sm:mt-0 flex gap-2">
            <Button variant="outline" onClick={() => setEditing(!editing)}>
              {editing ? 'Cancel Edit' : 'Edit Project'}
            </Button>
            <Button variant="primary">
              Export Details
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Project Info */}
          <div className="lg:col-span-2 space-y-6">
            {/* Project Overview */}
            <Card>
              <div className="p-6">
                <h2 className="text-xl font-bold text-gray-900 mb-4">Project Overview</h2>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-gray-500">Status</label>
                    <div className="mt-1">
                                      <Badge 
                  variant="outline"
                  className={getProjectStatusColor(project.status)}
                >
                  {project.status}
                </Badge>
                    </div>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-500">Value</label>
                    <div className="mt-1 text-lg font-semibold">
                      £{project.value.toLocaleString()}
                    </div>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-500">Created Date</label>
                    <div className="mt-1">{formatDate(project.createdDate)}</div>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-500">Branch</label>
                    <div className="mt-1">{project.branch}</div>
                  </div>
                </div>
                
                <div className="mt-6">
                  <label className="text-sm font-medium text-gray-500">Description</label>
                  <div className="mt-1 text-gray-900">{project.description}</div>
                </div>
                
                <div className="mt-6">
                  <label className="text-sm font-medium text-gray-500">Address</label>
                  <div className="mt-1 text-gray-900">{project.address}</div>
                </div>
              </div>
            </Card>

            {/* Timeline */}
            <Card>
              <div className="p-6">
                <h2 className="text-xl font-bold text-gray-900 mb-4">Project Timeline</h2>
                <div className="space-y-4">
                  {project.timeline && project.timeline.length > 0 ? (
                    project.timeline.map((event, index) => (
                      <div key={index} className="flex items-start gap-4">
                        <div className="flex-shrink-0 w-3 h-3 bg-blue-500 rounded-full mt-2"></div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <span className="font-medium text-gray-900">{event.status}</span>
                            <span className="text-sm text-gray-500">{formatDate(event.date)}</span>
                          </div>
                          <p className="text-gray-600">{event.note}</p>
                        </div>
                      </div>
                    ))
                  ) : (
                    <p className="text-gray-500">No timeline events yet.</p>
                  )}
                </div>
              </div>
            </Card>

            {/* Status Update */}
            <Card>
              <div className="p-6">
                <h2 className="text-xl font-bold text-gray-900 mb-4">Update Status</h2>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      New Status
                    </label>
                    <select
                      value={newStatus}
                      onChange={(e) => setNewStatus(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary"
                    >
                      <option value="">Select status</option>
                      {statuses.map(status => (
                        <option key={status} value={status}>{status}</option>
                      ))}
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Note (optional)
                    </label>
                    <textarea
                      value={newNote}
                      onChange={(e) => setNewNote(e.target.value)}
                      rows={3}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary"
                      placeholder="Add a note about this status update..."
                    />
                  </div>
                  
                  <Button 
                    onClick={updateProjectStatus}
                    disabled={!newStatus}
                    className="w-full"
                  >
                    Update Status
                  </Button>
                </div>
              </div>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Customer Info */}
            <Card>
              <div className="p-6">
                <h2 className="text-xl font-bold text-gray-900 mb-4">Customer Information</h2>
                <div className="space-y-3">
                  {customer ? (
                    <>
                      <div>
                        <label className="text-sm font-medium text-gray-500">Name</label>
                        <div className="mt-1 font-medium">{customer.name}</div>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-gray-500">Email</label>
                        <div className="mt-1">{customer.email}</div>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-gray-500">Phone</label>
                        <div className="mt-1">{customer.phone}</div>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-gray-500">Total Projects</label>
                        <div className="mt-1">{customer.totalProjects}</div>
                      </div>
                      <Button variant="outline" className="w-full">
                        View Customer Profile
                      </Button>
                    </>
                  ) : (
                    <p className="text-gray-500">Customer information not available</p>
                  )}
                </div>
              </div>
            </Card>

            {/* Assigned Worker */}
            <Card>
              <div className="p-6">
                <h2 className="text-xl font-bold text-gray-900 mb-4">Assigned Worker</h2>
                <div className="space-y-3">
                  {assignedWorker ? (
                    <>
                      <div>
                        <label className="text-sm font-medium text-gray-500">Name</label>
                        <div className="mt-1 font-medium">{assignedWorker.name}</div>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-gray-500">Role</label>
                        <div className="mt-1">{assignedWorker.role}</div>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-gray-500">Email</label>
                        <div className="mt-1">{assignedWorker.email}</div>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-gray-500">Phone</label>
                        <div className="mt-1">{assignedWorker.phone}</div>
                      </div>
                      <Button variant="outline" className="w-full">
                        Contact Worker
                      </Button>
                    </>
                  ) : (
                    <p className="text-gray-500">Worker information not available</p>
                  )}
                </div>
              </div>
            </Card>

            {/* Key Dates */}
            <Card>
              <div className="p-6">
                <h2 className="text-xl font-bold text-gray-900 mb-4">Key Dates</h2>
                <div className="space-y-3">
                  {project.measurementDate && (
                    <div>
                      <label className="text-sm font-medium text-gray-500">Measurement Date</label>
                      <div className="mt-1">{formatDate(project.measurementDate)}</div>
                    </div>
                  )}
                  {project.quoteSentDate && (
                    <div>
                      <label className="text-sm font-medium text-gray-500">Quote Sent</label>
                      <div className="mt-1">{formatDate(project.quoteSentDate)}</div>
                    </div>
                  )}
                  {project.contractSignedDate && (
                    <div>
                      <label className="text-sm font-medium text-gray-500">Contract Signed</label>
                      <div className="mt-1">{formatDate(project.contractSignedDate)}</div>
                    </div>
                  )}
                  {project.installationDate && (
                    <div>
                      <label className="text-sm font-medium text-gray-500">Installation Date</label>
                      <div className="mt-1">{formatDate(project.installationDate)}</div>
                    </div>
                  )}
                  {project.completionDate && (
                    <div>
                      <label className="text-sm font-medium text-gray-500">Completion Date</label>
                      <div className="mt-1">{formatDate(project.completionDate)}</div>
                    </div>
                  )}
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
} 