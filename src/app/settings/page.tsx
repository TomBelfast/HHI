'use client';

import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { ProtectedRoute } from '@/components/auth/ProtectedRoute';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { PERMISSIONS } from '@/lib/auth';

export default function SettingsPage() {
  return (
    <ProtectedRoute permissions={[PERMISSIONS.SETTINGS_READ]} userType="admin">
      <DashboardLayout>
        <div className="space-y-6">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-foreground">Settings</h1>
              <p className="mt-2 text-sm text-gray-600 dark:text-muted-foreground">
                Configure HHI CRM system settings
              </p>
            </div>
          </div>

          {/* Settings Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* General Settings */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <span className="mr-2">⚙️</span>
                  General Settings
                </CardTitle>
                <CardDescription>
                  Basic system configuration and preferences
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-foreground mb-2">
                    Company Name
                  </label>
                  <Input defaultValue="HHI Northern Ireland" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-foreground mb-2">
                    Default Currency
                  </label>
                  <select className="w-full px-3 py-2 border border-gray-300 dark:border-border rounded-md focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary dark:bg-card dark:text-foreground">
                    <option value="GBP">GBP (£)</option>
                    <option value="EUR">EUR (€)</option>
                    <option value="USD">USD ($)</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-foreground mb-2">
                    Time Zone
                  </label>
                  <select className="w-full px-3 py-2 border border-gray-300 dark:border-border rounded-md focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary dark:bg-card dark:text-foreground">
                    <option value="Europe/London">Europe/London (GMT)</option>
                    <option value="Europe/Dublin">Europe/Dublin (GMT)</option>
                    <option value="UTC">UTC</option>
                  </select>
                </div>
                <Button className="w-full">Save General Settings</Button>
              </CardContent>
            </Card>

            {/* User Management */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <span className="mr-2">👤</span>
                  User Management
                </CardTitle>
                <CardDescription>
                  Manage user accounts and permissions
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-foreground mb-2">
                    Default User Role
                  </label>
                  <select className="w-full px-3 py-2 border border-gray-300 dark:border-border rounded-md focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary dark:bg-card dark:text-foreground">
                    <option value="branch_worker">Branch Worker</option>
                    <option value="branch_manager">Branch Manager</option>
                    <option value="subcontractor">Subcontractor</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-foreground mb-2">
                    Session Timeout (hours)
                  </label>
                  <Input type="number" defaultValue="24" min="1" max="168" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-foreground mb-2">
                    Password Policy
                  </label>
                  <select className="w-full px-3 py-2 border border-gray-300 dark:border-border rounded-md focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary dark:bg-card dark:text-foreground">
                    <option value="standard">Standard (8+ chars)</option>
                    <option value="strong">Strong (12+ chars, special chars)</option>
                    <option value="enterprise">Enterprise (16+ chars, complex)</option>
                  </select>
                </div>
                <Button className="w-full">Save User Settings</Button>
              </CardContent>
            </Card>

            {/* Email Settings */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <span className="mr-2">📧</span>
                  Email Settings
                </CardTitle>
                <CardDescription>
                  Configure email notifications and SMTP settings
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-foreground mb-2">
                    SMTP Server
                  </label>
                  <Input defaultValue="smtp.gmail.com" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-foreground mb-2">
                    SMTP Port
                  </label>
                  <Input type="number" defaultValue="587" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-foreground mb-2">
                    From Email
                  </label>
                  <Input defaultValue="noreply@hhi-ni.com" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-foreground mb-2">
                    Email Notifications
                  </label>
                  <div className="space-y-2">
                    <label className="flex items-center">
                      <input type="checkbox" defaultChecked className="mr-2" />
                      New project notifications
                    </label>
                    <label className="flex items-center">
                      <input type="checkbox" defaultChecked className="mr-2" />
                      Status change alerts
                    </label>
                    <label className="flex items-center">
                      <input type="checkbox" className="mr-2" />
                      Daily summary reports
                    </label>
                  </div>
                </div>
                <Button className="w-full">Save Email Settings</Button>
              </CardContent>
            </Card>

            {/* Security Settings */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <span className="mr-2">🔒</span>
                  Security Settings
                </CardTitle>
                <CardDescription>
                  Configure security and authentication settings
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-foreground mb-2">
                    Two-Factor Authentication
                  </label>
                  <select className="w-full px-3 py-2 border border-gray-300 dark:border-border rounded-md focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary dark:bg-card dark:text-foreground">
                    <option value="disabled">Disabled</option>
                    <option value="optional">Optional</option>
                    <option value="required">Required for all users</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-foreground mb-2">
                    Failed Login Attempts
                  </label>
                  <Input type="number" defaultValue="5" min="1" max="10" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-foreground mb-2">
                    Account Lockout Duration (minutes)
                  </label>
                  <Input type="number" defaultValue="30" min="5" max="1440" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-foreground mb-2">
                    Security Features
                  </label>
                  <div className="space-y-2">
                    <label className="flex items-center">
                      <input type="checkbox" defaultChecked className="mr-2" />
                      IP whitelist
                    </label>
                    <label className="flex items-center">
                      <input type="checkbox" defaultChecked className="mr-2" />
                      Session logging
                    </label>
                    <label className="flex items-center">
                      <input type="checkbox" className="mr-2" />
                      Force HTTPS
                    </label>
                  </div>
                </div>
                <Button className="w-full">Save Security Settings</Button>
              </CardContent>
            </Card>

            {/* Backup & Maintenance */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <span className="mr-2">💾</span>
                  Backup & Maintenance
                </CardTitle>
                <CardDescription>
                  Configure backup schedules and system maintenance
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-foreground mb-2">
                    Auto Backup Schedule
                  </label>
                  <select className="w-full px-3 py-2 border border-gray-300 dark:border-border rounded-md focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary dark:bg-card dark:text-foreground">
                    <option value="daily">Daily</option>
                    <option value="weekly">Weekly</option>
                    <option value="monthly">Monthly</option>
                    <option value="disabled">Disabled</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-foreground mb-2">
                    Backup Retention (days)
                  </label>
                  <Input type="number" defaultValue="30" min="1" max="365" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-foreground mb-2">
                    Maintenance Window
                  </label>
                  <select className="w-full px-3 py-2 border border-gray-300 dark:border-border rounded-md focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary dark:bg-card dark:text-foreground">
                    <option value="sunday-2am">Sunday 2:00 AM</option>
                    <option value="saturday-3am">Saturday 3:00 AM</option>
                    <option value="custom">Custom</option>
                  </select>
                </div>
                <div className="flex space-x-2">
                  <Button variant="outline" className="flex-1">Create Backup</Button>
                  <Button variant="outline" className="flex-1">Restore</Button>
                </div>
              </CardContent>
            </Card>

            {/* Integration Settings */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <span className="mr-2">🔗</span>
                  Integrations
                </CardTitle>
                <CardDescription>
                  Configure third-party integrations and APIs
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-foreground mb-2">
                    Payment Gateway
                  </label>
                  <select className="w-full px-3 py-2 border border-gray-300 dark:border-border rounded-md focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary dark:bg-card dark:text-foreground">
                    <option value="stripe">Stripe</option>
                    <option value="paypal">PayPal</option>
                    <option value="square">Square</option>
                    <option value="disabled">Disabled</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-foreground mb-2">
                    SMS Gateway
                  </label>
                  <select className="w-full px-3 py-2 border border-gray-300 dark:border-border rounded-md focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary dark:bg-card dark:text-foreground">
                    <option value="twilio">Twilio</option>
                    <option value="nexmo">Nexmo</option>
                    <option value="disabled">Disabled</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-foreground mb-2">
                    Calendar Integration
                  </label>
                  <select className="w-full px-3 py-2 border border-gray-300 dark:border-border rounded-md focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary dark:bg-card dark:text-foreground">
                    <option value="google">Google Calendar</option>
                    <option value="outlook">Outlook Calendar</option>
                    <option value="disabled">Disabled</option>
                  </select>
                </div>
                <Button className="w-full">Save Integration Settings</Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </DashboardLayout>
    </ProtectedRoute>
  );
} 