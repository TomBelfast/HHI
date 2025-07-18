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
    icon: '👤',
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
    name: 'ROI Analysis', 
    href: '/roi-analysis', 
    icon: '��',
    permissions: [] // Tymczasowo dostępne dla wszystkich
  },
  { 
    name: 'Settings', 
    href: '/settings', 
    icon: '⚙️',
    permissions: [PERMISSIONS.SETTINGS_READ],
    userTypes: ['admin']
  },
];

interface SidebarProps {
  onClose?: () => void;
}

export function Sidebar({ onClose }: SidebarProps) {
  const pathname = usePathname();
  const { user } = useAuth();

  // Debug log
  console.log('Sidebar - Current user:', user);
  console.log('Sidebar - User type:', user?.userType);
  console.log('Sidebar - User permissions:', user?.permissions);
  console.log('Sidebar - Is authenticated:', !!user);

  const handleLinkClick = () => {
    // Close sidebar on mobile when link is clicked
    if (onClose) {
      onClose();
    }
  };

  return (
    <div className="h-full w-64 bg-white dark:bg-sidebar shadow-lg flex flex-col">
      <div className="flex h-full flex-col">
        {/* Logo */}
        <div className="flex h-16 items-center justify-between px-6 border-b border-gray-200 dark:border-sidebar-border">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <h1 className="text-xl font-bold text-primary">HHI CRM</h1>
            </div>
          </div>
          {onClose && (
            <button
              onClick={onClose}
              className="lg:hidden p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 dark:text-muted-foreground dark:hover:bg-muted transition-colors"
              aria-label="Close sidebar"
            >
              <span className="sr-only">Close sidebar</span>
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          )}
        </div>

        {/* Navigation */}
        <nav className="flex-1 space-y-1 px-4 py-4">
          {navigation.map((item) => {
            const isActive = pathname === item.href;
            
            // Check if user has required permissions and user type
            const hasPermissions = item.permissions.length === 0 || 
              item.permissions.some(permission => user?.permissions?.includes(permission));
            
            const hasUserType = !item.userTypes || 
              (user && item.userTypes.includes(user.userType as string));
            
            const shouldShow = hasPermissions && hasUserType;
            
            if (!shouldShow) {
              return null;
            }
            
            return (
              <Link
                key={item.name}
                href={item.href}
                onClick={handleLinkClick}
                className={`group flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                  isActive
                    ? 'bg-primary text-primary-foreground'
                    : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900 dark:text-sidebar-foreground dark:hover:bg-sidebar-accent dark:hover:text-sidebar-accent-foreground'
                }`}
              >
                <span className="mr-3 text-lg">{item.icon}</span>
                {item.name}
              </Link>
            );
          })}
        </nav>

        {/* Footer */}
        <div className="flex-shrink-0 border-t border-gray-200 dark:border-sidebar-border p-4">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <div className="h-8 w-8 rounded-full bg-primary flex items-center justify-center">
                <span className="text-sm font-medium text-primary-foreground">
                  {user ? user.name.charAt(0) + user.name.split(' ')[1]?.charAt(0) : 'U'}
                </span>
              </div>
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-700 dark:text-sidebar-foreground">
                {user?.name || 'User'}
              </p>
              <p className="text-xs text-gray-500 dark:text-muted-foreground">
                {user ? user.userType : 'Unknown Role'}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 