import { 
  mockCustomers, 
  mockProjects, 
  mockUsers, 
  mockAnalytics,
  type Customer,
  type Project,
  type User,
  type Analytics
} from './mock-data';

// API Response types
export interface ApiResponse<T> {
  data: T;
  success: boolean;
  message?: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
  success: boolean;
}

// Filter and sort types
export interface FilterOptions {
  search?: string;
  branch?: string;
  status?: string;
  category?: string;
  dateFrom?: string;
  dateTo?: string;
}

export interface SortOptions {
  field: string;
  direction: 'asc' | 'desc';
}

// API Service class
export class ApiService {
  private static instance: ApiService;
  
  static getInstance(): ApiService {
    if (!ApiService.instance) {
      ApiService.instance = new ApiService();
    }
    return ApiService.instance;
  }

  // Generic pagination helper
  private paginate<T>(data: T[], page: number = 1, limit: number = 10): PaginatedResponse<T> {
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    const paginatedData = data.slice(startIndex, endIndex);
    
    return {
      data: paginatedData,
      pagination: {
        page,
        limit,
        total: data.length,
        totalPages: Math.ceil(data.length / limit)
      },
      success: true
    };
  }

  // Generic filter helper
  private filter<T>(data: T[], filters: FilterOptions, searchFields: string[]): T[] {
    return data.filter(item => {
      // Search filter
      if (filters.search) {
        const searchLower = filters.search.toLowerCase();
        const hasMatch = searchFields.some(field => {
          const value = (item as any)[field];
          return value && value.toString().toLowerCase().includes(searchLower);
        });
        if (!hasMatch) return false;
      }

      // Branch filter
      if (filters.branch && (item as any).branch !== filters.branch) {
        return false;
      }

      // Status filter
      if (filters.status && (item as any).status !== filters.status) {
        return false;
      }

      // Category filter
      if (filters.category && (item as any).category !== filters.category) {
        return false;
      }

      // Date range filter
      if (filters.dateFrom || filters.dateTo) {
        const itemDate = new Date((item as any).createdDate || (item as any).registrationDate);
        if (filters.dateFrom && itemDate < new Date(filters.dateFrom)) {
          return false;
        }
        if (filters.dateTo && itemDate > new Date(filters.dateTo)) {
          return false;
        }
      }

      return true;
    });
  }

  // Generic sort helper
  private sort<T>(data: T[], sortOptions?: SortOptions): T[] {
    if (!sortOptions) return data;

    return [...data].sort((a, b) => {
      const aValue = (a as any)[sortOptions.field];
      const bValue = (b as any)[sortOptions.field];

      if (aValue === bValue) return 0;
      
      const comparison = aValue < bValue ? -1 : 1;
      return sortOptions.direction === 'desc' ? -comparison : comparison;
    });
  }

  // Customers API
  async getCustomers(
    page: number = 1,
    limit: number = 10,
    filters: FilterOptions = {},
    sort?: SortOptions
  ): Promise<PaginatedResponse<Customer>> {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 300));

    let filteredData = this.filter(mockCustomers, filters, ['name', 'email', 'phone', 'address']);
    
    if (sort) {
      filteredData = this.sort(filteredData, sort);
    }

    return this.paginate(filteredData, page, limit);
  }

  async getCustomer(id: string): Promise<ApiResponse<Customer>> {
    await new Promise(resolve => setTimeout(resolve, 200));

    const customer = mockCustomers.find(c => c.id === id);
    if (!customer) {
      throw new Error('Customer not found');
    }

    return {
      data: customer,
      success: true
    };
  }

  async createCustomer(customerData: Omit<Customer, 'id'>): Promise<ApiResponse<Customer>> {
    await new Promise(resolve => setTimeout(resolve, 500));

    const newCustomer: Customer = {
      ...customerData,
      id: `CUST-${String(mockCustomers.length + 1).padStart(3, '0')}`
    };

    // In a real app, this would save to database
    mockCustomers.push(newCustomer);

    return {
      data: newCustomer,
      success: true,
      message: 'Customer created successfully'
    };
  }

  async updateCustomer(id: string, updates: Partial<Customer>): Promise<ApiResponse<Customer>> {
    await new Promise(resolve => setTimeout(resolve, 400));

    const index = mockCustomers.findIndex(c => c.id === id);
    if (index === -1) {
      throw new Error('Customer not found');
    }

    mockCustomers[index] = { ...mockCustomers[index], ...updates };

    return {
      data: mockCustomers[index],
      success: true,
      message: 'Customer updated successfully'
    };
  }

  async deleteCustomer(id: string): Promise<ApiResponse<void>> {
    await new Promise(resolve => setTimeout(resolve, 300));

    const index = mockCustomers.findIndex(c => c.id === id);
    if (index === -1) {
      throw new Error('Customer not found');
    }

    mockCustomers.splice(index, 1);

    return {
      data: undefined,
      success: true,
      message: 'Customer deleted successfully'
    };
  }

  // Projects API
  async getProjects(
    page: number = 1,
    limit: number = 10,
    filters: FilterOptions = {},
    sort?: SortOptions
  ): Promise<PaginatedResponse<Project>> {
    await new Promise(resolve => setTimeout(resolve, 300));

    let filteredData = this.filter(mockProjects, filters, ['title', 'description', 'address', 'assignedWorker']);
    
    if (sort) {
      filteredData = this.sort(filteredData, sort);
    }

    return this.paginate(filteredData, page, limit);
  }

  async getProject(id: string): Promise<ApiResponse<Project>> {
    await new Promise(resolve => setTimeout(resolve, 200));

    const project = mockProjects.find(p => p.id === id);
    if (!project) {
      throw new Error('Project not found');
    }

    return {
      data: project,
      success: true
    };
  }

  async createProject(projectData: Omit<Project, 'id'>): Promise<ApiResponse<Project>> {
    await new Promise(resolve => setTimeout(resolve, 500));

    const newProject: Project = {
      ...projectData,
      id: `PROJ-${String(mockProjects.length + 1).padStart(3, '0')}`
    };

    mockProjects.push(newProject);

    return {
      data: newProject,
      success: true,
      message: 'Project created successfully'
    };
  }

  async updateProject(id: string, updates: Partial<Project>): Promise<ApiResponse<Project>> {
    await new Promise(resolve => setTimeout(resolve, 400));

    const index = mockProjects.findIndex(p => p.id === id);
    if (index === -1) {
      throw new Error('Project not found');
    }

    mockProjects[index] = { ...mockProjects[index], ...updates };

    return {
      data: mockProjects[index],
      success: true,
      message: 'Project updated successfully'
    };
  }

  async deleteProject(id: string): Promise<ApiResponse<void>> {
    await new Promise(resolve => setTimeout(resolve, 300));

    const index = mockProjects.findIndex(p => p.id === id);
    if (index === -1) {
      throw new Error('Project not found');
    }

    mockProjects.splice(index, 1);

    return {
      data: undefined,
      success: true,
      message: 'Project deleted successfully'
    };
  }

  // Users API
  async getUsers(
    page: number = 1,
    limit: number = 10,
    filters: FilterOptions = {},
    sort?: SortOptions
  ): Promise<PaginatedResponse<User>> {
    await new Promise(resolve => setTimeout(resolve, 300));

    let filteredData = this.filter(mockUsers, filters, ['name', 'email', 'role', 'branch']);
    
    if (sort) {
      filteredData = this.sort(filteredData, sort);
    }

    return this.paginate(filteredData, page, limit);
  }

  async getUser(id: string): Promise<ApiResponse<User>> {
    await new Promise(resolve => setTimeout(resolve, 200));

    const user = mockUsers.find(u => u.id === id);
    if (!user) {
      throw new Error('User not found');
    }

    return {
      data: user,
      success: true
    };
  }

  // Analytics API
  async getAnalytics(): Promise<ApiResponse<Analytics>> {
    await new Promise(resolve => setTimeout(resolve, 200));

    return {
      data: mockAnalytics,
      success: true
    };
  }

  // Dashboard summary
  async getDashboardSummary(): Promise<ApiResponse<{
    totalCustomers: number;
    totalProjects: number;
    activeProjects: number;
    totalRevenue: number;
    recentProjects: Project[];
    topCustomers: Customer[];
  }>> {
    await new Promise(resolve => setTimeout(resolve, 300));

    const activeProjects = mockProjects.filter(p => 
      !['Installation Completed', 'Repair Completed'].includes(p.status)
    );

    const totalRevenue = mockProjects.reduce((sum, p) => sum + p.value, 0);

    const recentProjects = mockProjects
      .sort((a, b) => new Date(b.createdDate).getTime() - new Date(a.createdDate).getTime())
      .slice(0, 5);

    const topCustomers = mockCustomers
      .sort((a, b) => b.totalValue - a.totalValue)
      .slice(0, 5);

    return {
      data: {
        totalCustomers: mockCustomers.length,
        totalProjects: mockProjects.length,
        activeProjects: activeProjects.length,
        totalRevenue,
        recentProjects,
        topCustomers
      },
      success: true
    };
  }
}

// Export singleton instance
export const apiService = ApiService.getInstance(); 