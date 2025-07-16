'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const navigation = [
  { name: 'Dashboard', href: '/', icon: '📊' },
  { name: 'Customers', href: '/customers', icon: '👥' },
  { name: 'Projects', href: '/projects', icon: '🔨' },
  { name: 'Users', href: '/users', icon: '👤' },
  { name: 'Analytics', href: '/analytics', icon: '📈' },
  { name: 'Reports', href: '/reports', icon: '📋' },
  { name: 'Settings', href: '/settings', icon: '⚙️' },
];

export function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const pathname = usePathname();

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
              <Link
                key={item.name}
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
            );
          })}
        </nav>

        {/* Footer */}
        <div className="flex-shrink-0 border-t border-gray-200 dark:border-sidebar-border p-4">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <div className="h-8 w-8 rounded-full bg-primary flex items-center justify-center">
                <span className="text-sm font-medium text-primary-foreground">A</span>
              </div>
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-700 dark:text-sidebar-foreground">Admin User</p>
              <p className="text-xs text-gray-500 dark:text-muted-foreground">admin@hhi-ni.com</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 