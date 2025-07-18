

// Auth types
export interface LoginCredentials {
  email: string;
  password: string;
}

export interface AuthUser {
  id: string;
  name: string;
  email: string;
  role: string;
  userType: 'admin' | 'branch_manager' | 'branch_worker' | 'subcontractor';
  branch?: string;
  permissions: string[];
  avatar?: string;
}

export interface AuthState {
  user: AuthUser | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}

// Mock user credentials for demo
const MOCK_CREDENTIALS = {
  'admin@hhi-ni.com': { password: 'admin123', userType: 'admin' },
  'lindsay.murphy@hhi-ni.com': { password: 'manager123', userType: 'branch_manager' },
  'alan.mckenna@hhi-ni.com': { password: 'worker123', userType: 'branch_worker' },
  'info@premierbathrooms.com': { password: 'contractor123', userType: 'subcontractor' },
  'donna.mccartney@hhi-ni.com': { password: 'manager456', userType: 'branch_manager' }
};

// Permission definitions
export const PERMISSIONS = {
  // Customer permissions
  CUSTOMERS_READ: 'customers:read',
  CUSTOMERS_WRITE: 'customers:write',
  CUSTOMERS_DELETE: 'customers:delete',
  
  // Project permissions
  PROJECTS_READ: 'projects:read',
  PROJECTS_WRITE: 'projects:write',
  PROJECTS_DELETE: 'projects:delete',
  
  // User permissions
  USERS_READ: 'users:read',
  USERS_WRITE: 'users:write',
  USERS_DELETE: 'users:delete',
  
  // Analytics permissions
  ANALYTICS_READ: 'analytics:read',
  ANALYTICS_WRITE: 'analytics:write',
  
  // Settings permissions
  SETTINGS_READ: 'settings:read',
  SETTINGS_WRITE: 'settings:write',
  
  // Admin permissions
  ADMIN_ALL: 'admin:all',
  
  // Permission management
  PERMISSIONS_READ: 'permissions:read',
  PERMISSIONS_WRITE: 'permissions:write',
  PERMISSIONS_MANAGE_OWN_BRANCH: 'permissions:manage_own_branch'
};

// Role-based permission mapping
export const ROLE_PERMISSIONS = {
  admin: [
    PERMISSIONS.CUSTOMERS_READ, PERMISSIONS.CUSTOMERS_WRITE, PERMISSIONS.CUSTOMERS_DELETE,
    PERMISSIONS.PROJECTS_READ, PERMISSIONS.PROJECTS_WRITE, PERMISSIONS.PROJECTS_DELETE,
    PERMISSIONS.USERS_READ, PERMISSIONS.USERS_WRITE, PERMISSIONS.USERS_DELETE,
    PERMISSIONS.ANALYTICS_READ, PERMISSIONS.ANALYTICS_WRITE,
    PERMISSIONS.SETTINGS_READ, PERMISSIONS.SETTINGS_WRITE,
    PERMISSIONS.PERMISSIONS_READ, PERMISSIONS.PERMISSIONS_WRITE,
    PERMISSIONS.ADMIN_ALL
  ],
  branch_manager: [
    PERMISSIONS.CUSTOMERS_READ, PERMISSIONS.CUSTOMERS_WRITE,
    PERMISSIONS.PROJECTS_READ, PERMISSIONS.PROJECTS_WRITE,
    PERMISSIONS.USERS_READ, PERMISSIONS.USERS_WRITE,
    PERMISSIONS.ANALYTICS_READ,
    PERMISSIONS.PERMISSIONS_READ, PERMISSIONS.PERMISSIONS_MANAGE_OWN_BRANCH
  ],
  branch_worker: [
    PERMISSIONS.CUSTOMERS_READ, PERMISSIONS.CUSTOMERS_WRITE,
    PERMISSIONS.PROJECTS_READ, PERMISSIONS.PROJECTS_WRITE
  ],
  subcontractor: [
    PERMISSIONS.PROJECTS_READ
  ]
};

// Auth service class
export class AuthService {
  private static instance: AuthService;
  private currentUser: AuthUser | null = null;
  private sessionTimeout: NodeJS.Timeout | null = null;
  
  static getInstance(): AuthService {
    if (!AuthService.instance) {
      AuthService.instance = new AuthService();
    }
    return AuthService.instance;
  }

  // Mock login function
  async login(credentials: LoginCredentials): Promise<AuthUser> {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 800));

    const mockCredential = MOCK_CREDENTIALS[credentials.email as keyof typeof MOCK_CREDENTIALS];
    
    if (!mockCredential || mockCredential.password !== credentials.password) {
      throw new Error('Invalid email or password');
    }

    // Find user in mock data
    const { mockUsers } = await import('./mock-data');
    const user = mockUsers.find(u => u.email === credentials.email);
    
    if (!user) {
      throw new Error('User not found');
    }

    // Create auth user with permissions
    const authUser: AuthUser = {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      userType: user.userType,
      branch: user.branch,
      permissions: ROLE_PERMISSIONS[user.userType] || [],
      avatar: user.avatar
    };

    // Store in session
    this.currentUser = authUser;
    this.saveToStorage(authUser);
    this.startSessionTimeout();

    return authUser;
  }

  // Logout function
  async logout(): Promise<void> {
    await new Promise(resolve => setTimeout(resolve, 300));
    
    this.currentUser = null;
    this.clearStorage();
    this.clearSessionTimeout();
  }

  // Get current user
  getCurrentUser(): AuthUser | null {
    if (!this.currentUser) {
      this.currentUser = this.loadFromStorage();
    }
    return this.currentUser;
  }

  // Check if user is authenticated
  isAuthenticated(): boolean {
    return this.getCurrentUser() !== null;
  }

  // Check if user has permission
  hasPermission(permission: string): boolean {
    const user = this.getCurrentUser();
    if (!user) return false;
    
    return user.permissions.includes(permission) || user.permissions.includes(PERMISSIONS.ADMIN_ALL);
  }

  // Check if user has any of the permissions
  hasAnyPermission(permissions: string[]): boolean {
    return permissions.some(permission => this.hasPermission(permission));
  }

  // Check if user has all permissions
  hasAllPermissions(permissions: string[]): boolean {
    return permissions.every(permission => this.hasPermission(permission));
  }

  // Get user's role
  getUserRole(): string | null {
    const user = this.getCurrentUser();
    return user?.userType || null;
  }

  // Private methods for session management
  private saveToStorage(user: AuthUser): void {
    if (typeof window !== 'undefined') {
      localStorage.setItem('hhi_auth_user', JSON.stringify(user));
      localStorage.setItem('hhi_auth_timestamp', Date.now().toString());
    }
  }

  private loadFromStorage(): AuthUser | null {
    if (typeof window === 'undefined') return null;
    
    try {
      const userStr = localStorage.getItem('hhi_auth_user');
      const timestamp = localStorage.getItem('hhi_auth_timestamp');
      
      if (!userStr || !timestamp) return null;
      
      // Check if session is expired (24 hours)
      const sessionAge = Date.now() - parseInt(timestamp);
      if (sessionAge > 24 * 60 * 60 * 1000) {
        this.clearStorage();
        return null;
      }
      
      return JSON.parse(userStr);
    } catch (error) {
      console.error('Error loading auth from storage:', error);
      return null;
    }
  }

  private clearStorage(): void {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('hhi_auth_user');
      localStorage.removeItem('hhi_auth_timestamp');
    }
  }

  private startSessionTimeout(): void {
    // Set session timeout to 24 hours
    this.sessionTimeout = setTimeout(() => {
      this.logout();
    }, 24 * 60 * 60 * 1000);
  }

  private clearSessionTimeout(): void {
    if (this.sessionTimeout) {
      clearTimeout(this.sessionTimeout);
      this.sessionTimeout = null;
    }
  }
}

// Export singleton instance
export const authService = AuthService.getInstance(); 