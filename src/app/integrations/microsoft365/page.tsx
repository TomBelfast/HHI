'use client';

import { useState } from 'react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Switch } from '@/components/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Calendar, Users, Mail, CheckCircle, XCircle, Clock, AlertCircle } from 'lucide-react';

// Mock data for Microsoft 365 integration
const mockCalendarEvents = [
  {
    id: 1,
    title: 'Project Review Meeting',
    start: '2024-01-15T10:00:00',
    end: '2024-01-15T11:00:00',
    location: 'Conference Room A',
    attendees: ['john.doe@company.com', 'jane.smith@company.com'],
    syncStatus: 'synced'
  },
  {
    id: 2,
    title: 'Customer Consultation',
    start: '2024-01-15T14:00:00',
    end: '2024-01-15T15:00:00',
    location: 'Office',
    attendees: ['customer@example.com'],
    syncStatus: 'pending'
  },
  {
    id: 3,
    title: 'Team Standup',
    start: '2024-01-16T09:00:00',
    end: '2024-01-16T09:30:00',
    location: 'Virtual',
    attendees: ['team@company.com'],
    syncStatus: 'conflict'
  }
];

const mockContacts = [
  {
    id: 1,
    name: 'John Smith',
    email: 'john.smith@company.com',
    phone: '+44 20 7123 4567',
    company: 'Tech Solutions Ltd',
    syncStatus: 'synced',
    lastSync: '2024-01-15T08:30:00'
  },
  {
    id: 2,
    name: 'Sarah Johnson',
    email: 'sarah.johnson@company.com',
    phone: '+44 20 7123 4568',
    company: 'Digital Innovations',
    syncStatus: 'pending',
    lastSync: '2024-01-15T07:15:00'
  },
  {
    id: 3,
    name: 'Michael Brown',
    email: 'michael.brown@company.com',
    phone: '+44 20 7123 4569',
    company: 'Creative Agency',
    syncStatus: 'error',
    lastSync: '2024-01-14T16:45:00'
  }
];

const mockEmails = [
  {
    id: 1,
    subject: 'Project Update - Phase 1 Complete',
    from: 'project.manager@company.com',
    to: 'client@example.com',
    date: '2024-01-15T09:30:00',
    status: 'sent',
    template: 'Project Update'
  },
  {
    id: 2,
    subject: 'Quote Request - Office Renovation',
    from: 'sales@company.com',
    to: 'prospect@example.com',
    date: '2024-01-15T11:15:00',
    status: 'draft',
    template: 'Quote Request'
  },
  {
    id: 3,
    subject: 'Meeting Confirmation',
    from: 'admin@company.com',
    to: 'customer@example.com',
    date: '2024-01-15T14:00:00',
    status: 'scheduled',
    template: 'Meeting Confirmation'
  }
];

export default function Microsoft365IntegrationPage() {
  const [calendarSync, setCalendarSync] = useState(true);
  const [contactSync, setContactSync] = useState(true);
  const [emailSync, setEmailSync] = useState(false);

  const getSyncStatusIcon = (status: string) => {
    switch (status) {
      case 'synced':
        return <CheckCircle className="w-4 h-4 text-green-500" />;
      case 'pending':
        return <Clock className="w-4 h-4 text-yellow-500" />;
      case 'error':
        return <XCircle className="w-4 h-4 text-red-500" />;
      case 'conflict':
        return <AlertCircle className="w-4 h-4 text-orange-500" />;
      default:
        return <Clock className="w-4 h-4 text-gray-500" />;
    }
  };

  const getSyncStatusBadge = (status: string) => {
    switch (status) {
      case 'synced':
        return <Badge className="bg-green-100 text-green-800">Synced</Badge>;
      case 'pending':
        return <Badge className="bg-yellow-100 text-yellow-800">Pending</Badge>;
      case 'error':
        return <Badge className="bg-red-100 text-red-800">Error</Badge>;
      case 'conflict':
        return <Badge className="bg-orange-100 text-orange-800">Conflict</Badge>;
      default:
        return <Badge className="bg-gray-100 text-gray-800">Unknown</Badge>;
    }
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Microsoft 365 Integration</h1>
            <p className="text-gray-600 mt-2">
              Preview and manage your Microsoft 365 integration settings
            </p>
          </div>
          <div className="flex items-center space-x-4">
            <Badge className="bg-blue-100 text-blue-800">Preview Mode</Badge>
            <Button variant="outline">Configure Integration</Button>
          </div>
        </div>

        {/* Connection Status */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              <span>Connection Status</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center space-x-3">
                  <Calendar className="w-5 h-5 text-blue-600" />
                  <div>
                    <p className="font-medium">Calendar Sync</p>
                    <p className="text-sm text-gray-500">Last sync: 2 minutes ago</p>
                  </div>
                </div>
                <Switch checked={calendarSync} onCheckedChange={setCalendarSync} />
              </div>
              <div className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center space-x-3">
                  <Users className="w-5 h-5 text-green-600" />
                  <div>
                    <p className="font-medium">Contact Sync</p>
                    <p className="text-sm text-gray-500">Last sync: 5 minutes ago</p>
                  </div>
                </div>
                <Switch checked={contactSync} onCheckedChange={setContactSync} />
              </div>
              <div className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center space-x-3">
                  <Mail className="w-5 h-5 text-purple-600" />
                  <div>
                    <p className="font-medium">Email Integration</p>
                    <p className="text-sm text-gray-500">Last sync: Never</p>
                  </div>
                </div>
                <Switch checked={emailSync} onCheckedChange={setEmailSync} />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Integration Tabs */}
        <Tabs defaultValue="calendar" className="space-y-4">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="calendar" className="flex items-center space-x-2">
              <Calendar className="w-4 h-4" />
              <span>Calendar Sync</span>
            </TabsTrigger>
            <TabsTrigger value="contacts" className="flex items-center space-x-2">
              <Users className="w-4 h-4" />
              <span>Contact Management</span>
            </TabsTrigger>
            <TabsTrigger value="email" className="flex items-center space-x-2">
              <Mail className="w-4 h-4" />
              <span>Email Integration</span>
            </TabsTrigger>
          </TabsList>

          {/* Calendar Sync Tab */}
          <TabsContent value="calendar" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Synchronized Events</CardTitle>
                <p className="text-sm text-gray-600">
                  View and manage calendar events synchronized between HHI and Outlook
                </p>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {mockCalendarEvents.map((event) => (
                    <div key={event.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center space-x-4">
                        {getSyncStatusIcon(event.syncStatus)}
                        <div>
                          <h4 className="font-medium">{event.title}</h4>
                          <p className="text-sm text-gray-500">
                            {new Date(event.start).toLocaleString()} - {new Date(event.end).toLocaleTimeString()}
                          </p>
                          <p className="text-sm text-gray-500">{event.location}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        {getSyncStatusBadge(event.syncStatus)}
                        <Button variant="outline" size="sm">View Details</Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Contact Management Tab */}
          <TabsContent value="contacts" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Contact Synchronization</CardTitle>
                <p className="text-sm text-gray-600">
                  Manage contacts synchronized between HHI CRM and Outlook
                </p>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {mockContacts.map((contact) => (
                    <div key={contact.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center space-x-4">
                        {getSyncStatusIcon(contact.syncStatus)}
                        <div>
                          <h4 className="font-medium">{contact.name}</h4>
                          <p className="text-sm text-gray-500">{contact.email}</p>
                          <p className="text-sm text-gray-500">{contact.company}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        {getSyncStatusBadge(contact.syncStatus)}
                        <p className="text-xs text-gray-500">
                          Last sync: {new Date(contact.lastSync).toLocaleString()}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Email Integration Tab */}
          <TabsContent value="email" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Email Templates & Automation</CardTitle>
                <p className="text-sm text-gray-600">
                  Manage email templates and automated communications
                </p>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {mockEmails.map((email) => (
                    <div key={email.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center space-x-4">
                        <Mail className="w-4 h-4 text-blue-500" />
                        <div>
                          <h4 className="font-medium">{email.subject}</h4>
                          <p className="text-sm text-gray-500">From: {email.from}</p>
                          <p className="text-sm text-gray-500">To: {email.to}</p>
                          <p className="text-sm text-gray-500">Template: {email.template}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Badge className="bg-blue-100 text-blue-800">{email.status}</Badge>
                        <p className="text-xs text-gray-500">
                          {new Date(email.date).toLocaleString()}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
} 