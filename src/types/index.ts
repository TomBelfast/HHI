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