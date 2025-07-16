'use client';

import { useState } from 'react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Badge } from '@/components/ui/Badge';
import { Card } from '@/components/ui/Card';

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState('general');
  const [saving, setSaving] = useState(false);

  const tabs = [
    { id: 'general', name: 'General', icon: '⚙️' },
    { id: 'branches', name: 'Branches', icon: '🏢' },
    { id: 'users', name: 'Users & Permissions', icon: '👥' },
    { id: 'notifications', name: 'Notifications', icon: '🔔' },
    { id: 'integrations', name: 'Integrations', icon: '🔗' },
    { id: 'backup', name: 'Backup & Security', icon: '🔒' }
  ];

  const handleSave = async () => {
    setSaving(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    setSaving(false);
  };

  const renderGeneralSettings = () => (
    <div className="space-y-6">
      <div className="bg-white dark:bg-card rounded-lg shadow-sm border border-gray-200 dark:border-border p-6">
        <h3 className="text-xl font-semibold text-gray-900 dark:text-foreground mb-4">Company Information</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-foreground mb-2">
              Company Name
            </label>
            <Input
              type="text"
              defaultValue="Home Improvements Northern Ireland"
              placeholder="Enter company name"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-foreground mb-2">
              Contact Email
            </label>
            <Input
              type="email"
              defaultValue="info@hhi-ni.com"
              placeholder="Enter contact email"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-foreground mb-2">
              Phone Number
            </label>
            <Input
              type="tel"
              defaultValue="02890 402204"
              placeholder="Enter phone number"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-foreground mb-2">
              Website
            </label>
            <Input
              type="url"
              defaultValue="https://hhi-ni.com"
              placeholder="Enter website URL"
            />
          </div>
        </div>
      </div>

      <div className="bg-white dark:bg-card rounded-lg shadow-sm border border-gray-200 dark:border-border p-6">
        <h3 className="text-xl font-semibold text-gray-900 dark:text-foreground mb-4">System Settings</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-foreground mb-2">
              Default Currency
            </label>
            <select className="w-full px-3 py-2 border border-gray-300 dark:border-border rounded-md focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary dark:bg-card dark:text-foreground">
              <option value="GBP">British Pound (£)</option>
              <option value="EUR">Euro (€)</option>
              <option value="USD">US Dollar ($)</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-foreground mb-2">
              Time Zone
            </label>
            <select className="w-full px-3 py-2 border border-gray-300 dark:border-border rounded-md focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary dark:bg-card dark:text-foreground">
              <option value="Europe/London">Europe/London (GMT)</option>
              <option value="Europe/Dublin">Europe/Dublin (GMT)</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-foreground mb-2">
              Date Format
            </label>
            <select className="w-full px-3 py-2 border border-gray-300 dark:border-border rounded-md focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary dark:bg-card dark:text-foreground">
              <option value="DD/MM/YYYY">DD/MM/YYYY</option>
              <option value="MM/DD/YYYY">MM/DD/YYYY</option>
              <option value="YYYY-MM-DD">YYYY-MM-DD</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-foreground mb-2">
              Language
            </label>
            <select className="w-full px-3 py-2 border border-gray-300 dark:border-border rounded-md focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary dark:bg-card dark:text-foreground">
              <option value="en">English</option>
              <option value="pl">Polish</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );

  const renderBranchesSettings = () => (
    <div className="space-y-6">
      <div className="bg-white dark:bg-card rounded-lg shadow-sm border border-gray-200 dark:border-border p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-semibold text-gray-900 dark:text-foreground">Branch Management</h3>
          <Button variant="primary" size="sm">
            + Add Branch
          </Button>
        </div>
        
        <div className="space-y-4">
          {['Belfast', 'Newtownabbey', 'Lisburn', 'Bangor', 'Coleraine'].map((branch, index) => (
            <div key={index} className="flex items-center justify-between p-4 border border-gray-200 dark:border-border rounded-lg">
              <div className="flex items-center">
                <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center mr-4">
                  <span className="text-blue-600 dark:text-blue-400 font-medium">{branch.charAt(0)}</span>
                </div>
                <div>
                  <h4 className="text-base font-medium text-gray-900 dark:text-foreground">{branch}</h4>
                  <p className="text-sm text-gray-500 dark:text-muted-foreground">Active Branch</p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <Badge variant="default">Active</Badge>
                <Button variant="outline" size="sm">Edit</Button>
                <Button variant="outline" size="sm">Manage</Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderUsersSettings = () => (
    <div className="space-y-6">
      <div className="bg-white dark:bg-card rounded-lg shadow-sm border border-gray-200 dark:border-border p-6">
        <h3 className="text-xl font-semibold text-gray-900 dark:text-foreground mb-4">User Roles & Permissions</h3>
        
        <div className="space-y-4">
          <div className="border border-gray-200 dark:border-border rounded-lg p-4">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="text-base font-medium text-gray-900 dark:text-foreground">System Administrator</h4>
                <p className="text-sm text-gray-500 dark:text-muted-foreground">Full system access and control</p>
              </div>
              <Badge className="bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200">Admin</Badge>
            </div>
          </div>
          
          <div className="border border-gray-200 dark:border-border rounded-lg p-4">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="text-base font-medium text-gray-900 dark:text-foreground">Branch Manager</h4>
                <p className="text-sm text-gray-500 dark:text-muted-foreground">Manage branch operations and staff</p>
              </div>
              <Badge className="bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200">Manager</Badge>
            </div>
          </div>
          
          <div className="border border-gray-200 dark:border-border rounded-lg p-4">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="text-base font-medium text-gray-900 dark:text-foreground">Branch Worker</h4>
                <p className="text-sm text-gray-500 dark:text-muted-foreground">Handle projects and customer interactions</p>
              </div>
              <Badge className="bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200">Worker</Badge>
            </div>
          </div>
          
          <div className="border border-gray-200 dark:border-border rounded-lg p-4">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="text-base font-medium text-gray-900 dark:text-foreground">Subcontractor</h4>
                <p className="text-sm text-gray-500 dark:text-muted-foreground">External contractor access</p>
              </div>
              <Badge className="bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-200">Contractor</Badge>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderNotificationsSettings = () => (
    <div className="space-y-6">
      <div className="bg-white dark:bg-card rounded-lg shadow-sm border border-gray-200 dark:border-border p-6">
        <h3 className="text-xl font-semibold text-gray-900 dark:text-foreground mb-4">Email Notifications</h3>
        
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="text-base font-medium text-gray-900 dark:text-foreground">New Project Notifications</h4>
              <p className="text-sm text-gray-500 dark:text-muted-foreground">Receive email when new projects are created</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" defaultChecked className="sr-only peer" />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
            </label>
          </div>
          
          <div className="flex items-center justify-between">
            <div>
              <h4 className="text-base font-medium text-gray-900 dark:text-foreground">Project Status Updates</h4>
              <p className="text-sm text-gray-500 dark:text-muted-foreground">Get notified when project status changes</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" defaultChecked className="sr-only peer" />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
            </label>
          </div>
          
          <div className="flex items-center justify-between">
            <div>
              <h4 className="text-base font-medium text-gray-900 dark:text-foreground">Customer Complaints</h4>
              <p className="text-sm text-gray-500 dark:text-muted-foreground">Immediate notification for customer complaints</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" defaultChecked className="sr-only peer" />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
            </label>
          </div>
          
          <div className="flex items-center justify-between">
            <div>
              <h4 className="text-base font-medium text-gray-900 dark:text-foreground">Weekly Reports</h4>
              <p className="text-sm text-gray-500 dark:text-muted-foreground">Receive weekly performance summaries</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" className="sr-only peer" />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
            </label>
          </div>
        </div>
      </div>
    </div>
  );

  const renderIntegrationsSettings = () => (
    <div className="space-y-6">
      <div className="bg-white dark:bg-card rounded-lg shadow-sm border border-gray-200 dark:border-border p-6">
        <h3 className="text-xl font-semibold text-gray-900 dark:text-foreground mb-4">Connected Services</h3>
        
        <div className="space-y-4">
          <div className="border border-gray-200 dark:border-border rounded-lg p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center mr-4">
                  <span className="text-blue-600 dark:text-blue-400 font-medium">M</span>
                </div>
                <div>
                  <h4 className="text-base font-medium text-gray-900 dark:text-foreground">Microsoft 365</h4>
                  <p className="text-sm text-gray-500 dark:text-muted-foreground">Email, calendar, and document integration</p>
                </div>
              </div>
              <Badge className="bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200">Connected</Badge>
            </div>
          </div>
          
          <div className="border border-gray-200 dark:border-border rounded-lg p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="w-10 h-10 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mr-4">
                  <span className="text-green-600 dark:text-green-400 font-medium">W</span>
                </div>
                <div>
                  <h4 className="text-base font-medium text-gray-900 dark:text-foreground">WhatsApp Business</h4>
                  <p className="text-sm text-gray-500 dark:text-muted-foreground">Customer communication platform</p>
                </div>
              </div>
              <Badge className="bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200">Connected</Badge>
            </div>
          </div>
          
          <div className="border border-gray-200 dark:border-border rounded-lg p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="w-10 h-10 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mr-4">
                  <span className="text-gray-600 dark:text-gray-400 font-medium">S</span>
                </div>
                <div>
                  <h4 className="text-base font-medium text-gray-900 dark:text-foreground">Sage Accounting</h4>
                  <p className="text-sm text-gray-500 dark:text-muted-foreground">Financial management integration</p>
                </div>
              </div>
              <Button variant="outline" size="sm">Connect</Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderBackupSettings = () => (
    <div className="space-y-6">
      <div className="bg-white dark:bg-card rounded-lg shadow-sm border border-gray-200 dark:border-border p-6">
        <h3 className="text-xl font-semibold text-gray-900 dark:text-foreground mb-4">Backup & Security</h3>
        
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="text-base font-medium text-gray-900 dark:text-foreground">Automatic Backups</h4>
              <p className="text-sm text-gray-500 dark:text-muted-foreground">Daily automated backups at 2:00 AM</p>
            </div>
            <Badge className="bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200">Enabled</Badge>
          </div>
          
          <div className="flex items-center justify-between">
            <div>
              <h4 className="text-base font-medium text-gray-900 dark:text-foreground">Last Backup</h4>
              <p className="text-sm text-gray-500 dark:text-muted-foreground">December 15, 2024 at 2:00 AM</p>
            </div>
            <Button variant="outline" size="sm">Backup Now</Button>
          </div>
          
          <div className="flex items-center justify-between">
            <div>
              <h4 className="text-base font-medium text-gray-900 dark:text-foreground">Two-Factor Authentication</h4>
              <p className="text-sm text-gray-500 dark:text-muted-foreground">Enhanced security for user accounts</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" className="sr-only peer" />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
            </label>
          </div>
          
          <div className="flex items-center justify-between">
            <div>
              <h4 className="text-base font-medium text-gray-900 dark:text-foreground">Data Retention</h4>
              <p className="text-sm text-gray-500 dark:text-muted-foreground">Keep data for 7 years (legal requirement)</p>
            </div>
            <Badge className="bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200">7 Years</Badge>
          </div>
        </div>
      </div>
    </div>
  );

  const renderTabContent = () => {
    switch (activeTab) {
      case 'general':
        return renderGeneralSettings();
      case 'branches':
        return renderBranchesSettings();
      case 'users':
        return renderUsersSettings();
      case 'notifications':
        return renderNotificationsSettings();
      case 'integrations':
        return renderIntegrationsSettings();
      case 'backup':
        return renderBackupSettings();
      default:
        return renderGeneralSettings();
    }
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-foreground">Settings</h1>
            <p className="mt-2 text-sm text-gray-600 dark:text-muted-foreground">
              Configure HHI system settings and preferences
            </p>
          </div>
          <div className="mt-4 sm:mt-0">
            <Button 
              variant="primary" 
              onClick={handleSave}
              disabled={saving}
            >
              {saving ? 'Saving...' : 'Save Changes'}
            </Button>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white dark:bg-card rounded-lg shadow-sm border border-gray-200 dark:border-border">
          <div className="border-b border-gray-200 dark:border-border">
            <nav className="flex space-x-8 px-6" aria-label="Tabs">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`py-4 px-1 border-b-2 font-medium text-sm flex items-center ${
                    activeTab === tab.id
                      ? 'border-primary text-primary'
                      : 'border-transparent text-gray-500 dark:text-muted-foreground hover:text-gray-700 dark:hover:text-foreground hover:border-gray-300 dark:hover:border-border'
                  }`}
                >
                  <span className="mr-2">{tab.icon}</span>
                  {tab.name}
                </button>
              ))}
            </nav>
          </div>
          
          <div className="p-6">
            {renderTabContent()}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
} 