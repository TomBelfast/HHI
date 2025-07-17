'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { PermissionGate } from '@/components/auth/PermissionGate';
import { PERMISSIONS } from '@/lib/auth';

const navigation = [
  { 
    name: 'Dashboard', 
    href: '/', 
    icon: '📊',
    permissions: [] // Available to all authenticated users
  },
  { 
    name: 'Customers', 
    href: '/customers', 
    icon: '👥',
    permissions: [PERMISSIONS.CUSTOMERS_READ]
  },
  { 
    name: 'Projects', 
    href: '/projects', 
    icon: '🔨',
    permissions: [PERMISSIONS.PROJECTS_READ]
  },
  { 
    name: 'Users', 
    href: '/users', 
    icon: '��',
    permissions: [PERMISSIONS.USERS_READ]
  },
  { 
    name: 'Add User', 
    href: '/users/new', 
    icon: '➕',
    permissions: [PERMISSIONS.USERS_WRITE],
    userTypes: ['admin', 'branch_manager']
  },
  { 
    name: 'Permissions', 
    href: '/users/permissions', 
    icon: '🔐',
    permissions: [PERMISSIONS.PERMISSIONS_READ],
    userTypes: ['admin', 'branch_manager']
  },
  { 
    name: 'Analytics', 
    href: '/analytics', 
    icon: '📈',
    permissions: [PERMISSIONS.ANALYTICS_READ]
  },
  { 
    name: 'Reports', 
    href: '/reports', 
    icon: '📋',
    permissions: [PERMISSIONS.ANALYTICS_READ]
  },
  { 
    name: 'Branches', 
    href: '/branches', 
    icon: '🏢',
    permissions: [PERMISSIONS.ANALYTICS_READ]
  },
  { 
    name: 'Settings', 
    href: '/settings', 
    icon: '⚙️',
    permissions: [PERMISSIONS.SETTINGS_READ],
    userTypes: ['admin']
  },
];

export function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const pathname = usePathname();
  const { user } = useAuth();

  // Debug log
  console.log('Sidebar - Current user:', user);
  console.log('Sidebar - User type:', user?.userType);
  console.log('Sidebar - User permissions:', user?.permissions);
  console.log('Sidebar - Is authenticated:', !!user);

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(word => word.charAt(0))
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  const getRoleDisplayName = (userType: string) => {
    switch (userType) {
      case 'admin':
        return 'Administrator';
      case 'branch_manager':
        return 'Branch Manager';
      case 'branch_worker':
        return 'Branch Worker';
      case 'subcontractor':
        return 'Subcontractor';
      default:
        return userType;
    }
  };

  return (
    <div className={`fixed inset-y-0 left-0 z-50 w-64 bg-white dark:bg-sidebar shadow-lg transform transition-transform duration-300 ease-in-out lg:translate-x-0 ${collapsed ? '-translate-x-full' : 'translate-x-0'}`}>
      <div className="flex h-full flex-col">
        {/* Logo */}
        <div className="flex h-16 items-center justify-between px-6 border-b border-gray-200 dark:border-sidebar-border">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <h1 className="text-xl font-bold text-primary">HHI CRM</h1>
            </div>
          </div>
          <button
            onClick={() => setCollapsed(!collapsed)}
            className="lg:hidden p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 dark:text-muted-foreground dark:hover:bg-muted"
          >
            <span className="sr-only">Close sidebar</span>
            ✕
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 space-y-1 px-4 py-4">
          {navigation.map((item) => {
            const isActive = pathname === item.href;
            
            return (
              <PermissionGate
                key={item.name}
                permissions={item.permissions}
                userType={item.userTypes as any}
              >
                <Link
                  href={item.href}
                  className={`group flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                    isActive
                      ? 'bg-primary text-primary-foreground'
                      : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900 dark:text-sidebar-foreground dark:hover:bg-sidebar-accent dark:hover:text-sidebar-accent-foreground'
                  }`}
                >
                  <span className="mr-3 text-lg">{item.icon}</span>
                  {item.name}
                </Link>
              </PermissionGate>
            );
          })}
        </nav>

        {/* Footer */}
        <div className="flex-shrink-0 border-t border-gray-200 dark:border-sidebar-border p-4">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <div className="h-8 w-8 rounded-full bg-primary flex items-center justify-center">
                <span className="text-sm font-medium text-primary-foreground">
                  {user ? getInitials(user.name) : 'U'}
                </span>
              </div>
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-700 dark:text-sidebar-foreground">
                {user?.name || 'User'}
              </p>
              <p className="text-xs text-gray-500 dark:text-muted-foreground">
                {user ? getRoleDisplayName(user.userType) : 'Unknown Role'}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 