// Customer types
export interface Customer {
  id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  postcode: string;
  branch: string;
  registrationDate: string;
  totalProjects: number;
  totalValue: number;
  rating: number;
  // Additional fields for comprehensive customer management
  customerType: 'residential' | 'commercial' | 'prospect';
  status: 'active' | 'inactive' | 'prospect';
  preferences?: {
    preferredContact: 'email' | 'phone' | 'sms';
    communicationFrequency: 'weekly' | 'monthly' | 'quarterly';
    specialRequirements?: string;
  };
  communicationHistory?: {
    date: string;
    type: 'email' | 'phone' | 'site_visit' | 'quote_sent';
    summary: string;
    outcome?: string;
  }[];
  companyInfo?: {
    companyName?: string;
    vatNumber?: string;
    businessType?: string;
  };
}

// Project types
export interface Project {
  id: string;
  customerId: string;
  title: string;
  category: string;
  status: string;
  branch: string;
  assignedWorker: string;
  subcontractor?: string;
  value: number;
  createdDate: string;
  measurementDate?: string;
  quoteSentDate?: string;
  contractSignedDate?: string;
  installationDate?: string;
  completionDate?: string;
  description: string;
  address: string;
  timeline?: TimelineEvent[];
  complaints?: Complaint[];
}

// Timeline event
export interface TimelineEvent {
  date: string;
  status: string;
  note: string;
}

// Complaint types
export interface Complaint {
  id: string;
  status: string;
  issue: string;
  submittedDate: string;
  resolvedDate?: string;
  resolution?: string;
  customerRating?: number;
}

// User types
export interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  branch?: string;
  phone?: string;
  specialization?: string;
  rating?: number;
  projectsCompleted?: number;
  permissions?: string[];
  // Additional fields for comprehensive user management
  status: 'active' | 'inactive' | 'suspended';
  userType: 'admin' | 'branch_manager' | 'branch_worker' | 'subcontractor';
  createdAt: string;
  lastLogin?: string;
  avatar?: string;
  preferences?: {
    theme: 'light' | 'dark' | 'auto';
    notifications: {
      email: boolean;
      sms: boolean;
      push: boolean;
    };
    language: 'en' | 'pl';
  };
  security?: {
    twoFactorEnabled: boolean;
    lastPasswordChange: string;
    failedLoginAttempts: number;
  };
  activity?: {
    lastActivity: string;
    totalLogins: number;
    averageSessionTime: string;
  };
  completedJobs?: number;
  averageTime?: string;
  branches?: string[];
}

// Analytics types
export interface Analytics {
  companyOverview: {
    totalProjects: number;
    activeProjects: number;
    completedThisMonth: number;
    monthlyRevenue: number;
    conversionRate: number;
    averageProjectValue: number;
  };
  branchPerformance: BranchPerformance[];
  categoryBreakdown: CategoryBreakdown[];
}

export interface BranchPerformance {
  branch: string;
  projects: number;
  revenue: number;
  conversion: number;
  averageResponseTime: string;
  customerSatisfaction: number;
}

export interface CategoryBreakdown {
  category: string;
  projects: number;
  percentage: number;
  avgValue: number;
} 