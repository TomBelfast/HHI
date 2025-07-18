'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';

interface HeaderProps {
  onMenuClick?: () => void;
}

export function Header({ onMenuClick }: HeaderProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [isDark, setIsDark] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const { user, logout } = useAuth();
  const router = useRouter();

  useEffect(() => {
    // Sprawdź preferencje z localStorage lub systemowe
    const saved = localStorage.getItem('theme');
    if (saved === 'dark' || (!saved && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
      setIsDark(true);
      document.documentElement.classList.add('dark');
    } else {
      setIsDark(false);
      document.documentElement.classList.remove('dark');
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = !isDark;
    setIsDark(newTheme);
    localStorage.setItem('theme', newTheme ? 'dark' : 'light');
    
    if (newTheme) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };

  const handleLogout = async () => {
    try {
      await logout();
      router.push('/login');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

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
    <header className="bg-white shadow-sm border-b border-gray-200 dark:bg-background dark:border-border">
      <div className="flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Mobile menu button */}
        <button 
          className="lg:hidden p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 dark:hover:bg-muted dark:text-muted-foreground transition-colors"
          onClick={onMenuClick}
          aria-label="Open sidebar menu"
        >
          <span className="sr-only">Open sidebar</span>
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>

        {/* Search */}
        <div className="flex-1 max-w-lg mx-4">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <span className="text-gray-400 dark:text-muted-foreground">🔍</span>
            </div>
            <input
              type="text"
              placeholder="Search customers, projects..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-primary focus:border-primary sm:text-sm dark:bg-card dark:text-foreground dark:border-border dark:placeholder-muted-foreground"
            />
          </div>
        </div>

        {/* Right side */}
        <div className="flex items-center space-x-4">
          {/* Dark mode toggle */}
          <button
            className="p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 dark:hover:bg-muted dark:text-muted-foreground"
            onClick={toggleTheme}
            aria-label="Toggle dark mode"
          >
            {isDark ? '☀️' : '🌙'}
          </button>

          {/* Notifications */}
          <button className="p-2 text-gray-400 hover:text-gray-500 hover:bg-gray-100 rounded-md relative dark:hover:bg-muted dark:text-muted-foreground">
            <span className="text-lg">🔔</span>
            <span className="absolute top-0 right-0 block h-2 w-2 rounded-full bg-red-400 ring-2 ring-white dark:ring-background"></span>
          </button>

          {/* Profile dropdown */}
          <div className="relative">
            <button 
              className="flex items-center space-x-2 p-2 text-gray-400 hover:text-gray-500 hover:bg-gray-100 rounded-md dark:hover:bg-muted dark:text-muted-foreground"
              onClick={() => setShowProfileMenu(!showProfileMenu)}
            >
              <div className="h-8 w-8 rounded-full bg-primary flex items-center justify-center">
                <span className="text-sm font-medium text-primary-foreground">
                  {user ? getInitials(user.name) : 'U'}
                </span>
              </div>
              <div className="hidden md:block text-left">
                <div className="text-sm font-medium text-gray-700 dark:text-foreground">
                  {user?.name || 'User'}
                </div>
                <div className="text-xs text-gray-500 dark:text-muted-foreground">
                  {user ? getRoleDisplayName(user.userType) : 'Unknown'}
                </div>
              </div>
            </button>

            {/* Profile dropdown menu */}
            {showProfileMenu && (
              <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-card rounded-md shadow-lg py-1 z-50 border border-gray-200 dark:border-border">
                <div className="px-4 py-2 border-b border-gray-200 dark:border-border">
                  <div className="text-sm font-medium text-gray-900 dark:text-foreground">
                    {user?.name}
                  </div>
                  <div className="text-sm text-gray-500 dark:text-muted-foreground">
                    {user?.email}
                  </div>
                  <div className="text-xs text-gray-400 dark:text-muted-foreground mt-1">
                    {user ? getRoleDisplayName(user.userType) : 'Unknown Role'}
                  </div>
                </div>
                
                <button
                  className="block w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-foreground hover:bg-gray-100 dark:hover:bg-muted"
                  onClick={() => {
                    setShowProfileMenu(false);
                    // TODO: Navigate to profile page
                  }}
                >
                  Profile Settings
                </button>
                
                <button
                  className="block w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-foreground hover:bg-gray-100 dark:hover:bg-muted"
                  onClick={() => {
                    setShowProfileMenu(false);
                    // TODO: Navigate to preferences page
                  }}
                >
                  Preferences
                </button>
                
                <div className="border-t border-gray-200 dark:border-border">
                  <button
                    className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100 dark:hover:bg-muted"
                    onClick={handleLogout}
                  >
                    Sign Out
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Click outside to close dropdown */}
      {showProfileMenu && (
        <div 
          className="fixed inset-0 z-40" 
          onClick={() => setShowProfileMenu(false)}
        />
      )}
    </header>
  );
} 