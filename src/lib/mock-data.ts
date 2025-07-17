// Mock data based on HHI PRD specifications
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
  // Additional fields required by task #3.1
  customerType: 'residential' | 'commercial' | 'prospect';
  status: 'active' | 'not accepted' | 'prospect' | 'completed' | 'suspended';
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

export interface TimelineEvent {
  date: string;
  status: string;
  note: string;
  type?: 'phone_call' | 'measurement' | 'quote_sent' | 'contract_signed' | 'installation_started' | 'installation_completed' | 'complaint_submitted' | 'complaint_resolved' | 'other';
}

export interface Complaint {
  id: string;
  status: string;
  issue: string;
  submittedDate: string;
  resolvedDate?: string;
  resolution?: string;
  customerRating?: number;
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  branch?: string;
  phone: string;
  permissions?: string[];
  specialization?: string;
  rating?: number;
  projectsCompleted?: number;
  completedJobs?: number;
  averageTime?: string;
  branches?: string[];
  // Additional fields required by task #3.3
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
}

export interface Analytics {
  total_projects: number;
  active_projects: number;
  monthly_revenue: number;
  conversion_rate: number;
  history: {
    month: string;
    revenue: number;
    completed_projects: number;
    conversion_rate: number;
  }[];
  project_status_distribution: {
    quote: number;
    approved: number;
    in_progress: number;
    completed: number;
  };
  service_type_performance: {
    service_type: string;
    projects: number;
    revenue: number;
  }[];
  customer_satisfaction: {
    average: number;
    distribution: {
      [key: string]: number;
    };
  };
  regional_performance: {
    region: string;
    projects: number;
    revenue: number;
  }[];
  avg_days_phone_to_measurement?: number;
  avg_days_complaint_wait?: number;
  avg_days_contact_to_contract?: number;
  branch_performance_metrics?: {
    branch: string;
    projects_count: number;
    avg_days_phone_to_measurement: number | null;
    avg_days_complaint_wait: number | null;
    avg_days_contact_to_contract: number | null;
    avg_project_duration: number | null;
  }[];
  detailed_branch_analytics?: {
    branch: string;
    // Operational Metrics
    operational: {
      active_projects: number;
      avg_project_duration: number;
      resource_utilization: number; // percentage
      on_time_delivery_rate: number; // percentage
      complaints_count: number;
      returns_count: number;
    };
    // Financial Metrics
    financial: {
      revenue: number;
      gross_margin: number; // percentage
      net_margin: number; // percentage
      operational_costs: number;
      roi: number; // percentage
      revenue_per_employee: number;
    };
    // HR Metrics
    hr: {
      employee_count: number;
      avg_tenure: number; // years
      turnover_rate: number; // percentage
      productivity_per_employee: number;
      overtime_hours: number;
    };
    // Quality Metrics
    quality: {
      customer_satisfaction: number; // 1-5 scale
      complaints_rate: number; // percentage
      repeat_orders_rate: number; // percentage
      response_time: number; // days
      quality_audit_score: number; // 1-100
    };
    // Growth Metrics
    growth: {
      new_contracts: number;
      market_share_growth: number; // percentage
      new_customers: number;
      expansion_projects: number;
    };
  }[];
  employee_performance?: {
    top_by_projects: {
      name: string;
      total_projects: number;
      total_value: number;
      completed_projects: number;
      conversion_rate: number;
      avg_project_value: number;
      avg_project_duration: number | null;
      branch: string;
    }[];
    top_by_value: {
      name: string;
      total_projects: number;
      total_value: number;
      completed_projects: number;
      conversion_rate: number;
      avg_project_value: number;
      avg_project_duration: number | null;
      branch: string;
    }[];
    top_by_conversion: {
      name: string;
      total_projects: number;
      total_value: number;
      completed_projects: number;
      conversion_rate: number;
      avg_project_value: number;
      avg_project_duration: number | null;
      branch: string;
    }[];
    top_by_efficiency: {
      name: string;
      total_projects: number;
      total_value: number;
      completed_projects: number;
      conversion_rate: number;
      avg_project_value: number;
      avg_project_duration: number | null;
      branch: string;
    }[];
    all_employees: {
      name: string;
      total_projects: number;
      total_value: number;
      completed_projects: number;
      conversion_rate: number;
      avg_project_value: number;
      avg_project_duration: number | null;
      branch: string;
    }[];
  };
}

export interface Department {
  id: string;
  name: string;
  description: string;
  manager?: string;
  employeeCount: number;
  categories: string[];
  activeProjects: number;
  monthlyRevenue: number;
}

export interface Branch {
  name: string;
  address: string;
  phone: string;
  email: string;
  manager: string;
  departments: Department[];
  totalEmployees: number;
  totalProjects: number;
  totalRevenue: number;
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

// Branch departments data
export const branchDepartments: Branch[] = [
  {
    name: 'Belfast',
    address: '123 Belfast Street, Belfast, BT1 1AA',
    phone: '+44 28 9023 4567',
    email: 'belfast@hhi.co.uk',
    manager: 'Sarah O\'Connor',
    totalEmployees: 45,
    totalProjects: 156,
    totalRevenue: 2850000,
    departments: [
      {
        id: 'belfast-bathrooms',
        name: 'Bathrooms Department',
        description: 'Specialized in bathroom installations and renovations',
        manager: 'Michael Thompson',
        employeeCount: 12,
        categories: ['Bathrooms'],
        activeProjects: 23,
        monthlyRevenue: 450000
      },
      {
        id: 'belfast-kitchens',
        name: 'Kitchens Department',
        description: 'Kitchen design and installation services',
        manager: 'Emma Wilson',
        employeeCount: 10,
        categories: ['Kitchens'],
        activeProjects: 18,
        monthlyRevenue: 380000
      },
      {
        id: 'belfast-windows-doors',
        name: 'Windows & Doors Department',
        description: 'PVC windows, doors and composite door installations',
        manager: 'David Clarke',
        employeeCount: 8,
        categories: ['PVC Windows & Doors', 'Composite Doors'],
        activeProjects: 15,
        monthlyRevenue: 320000
      },
      {
        id: 'belfast-exterior',
        name: 'Exterior Solutions Department',
        description: 'Fascia, soffit, guttering and decking installations',
        manager: 'James Anderson',
        employeeCount: 7,
        categories: ['PVC Fascia Soffit & Guttering', 'HD Decking', 'PVC Cover Sills'],
        activeProjects: 12,
        monthlyRevenue: 280000
      }
    ]
  },
  {
    name: 'Newtownabbey',
    address: '456 Newtownabbey Road, Newtownabbey, BT36 5AB',
    phone: '+44 28 9085 1234',
    email: 'newtownabbey@hhi.co.uk',
    manager: 'Robert Mitchell',
    totalEmployees: 38,
    totalProjects: 134,
    totalRevenue: 2420000,
    departments: [
      {
        id: 'newtownabbey-bathrooms',
        name: 'Bathrooms Department',
        description: 'Bathroom installations and renovations',
        manager: 'Lisa Campbell',
        employeeCount: 10,
        categories: ['Bathrooms'],
        activeProjects: 19,
        monthlyRevenue: 380000
      },
      {
        id: 'newtownabbey-kitchens',
        name: 'Kitchens Department',
        description: 'Kitchen design and installation',
        manager: 'Andrew Brown',
        employeeCount: 8,
        categories: ['Kitchens'],
        activeProjects: 14,
        monthlyRevenue: 310000
      },
      {
        id: 'newtownabbey-windows-doors',
        name: 'Windows & Doors Department',
        description: 'PVC windows and composite doors',
        manager: 'Rachel Green',
        employeeCount: 7,
        categories: ['PVC Windows & Doors', 'Composite Doors'],
        activeProjects: 12,
        monthlyRevenue: 260000
      },
      {
        id: 'newtownabbey-exterior',
        name: 'Exterior Solutions Department',
        description: 'Fascia, soffit, guttering and decking',
        manager: 'Paul Murphy',
        employeeCount: 6,
        categories: ['PVC Fascia Soffit & Guttering', 'HD Decking', 'PVC Cover Sills'],
        activeProjects: 10,
        monthlyRevenue: 220000
      }
    ]
  },
  {
    name: 'Lisburn',
    address: '789 Lisburn Street, Lisburn, BT27 4CD',
    phone: '+44 28 9266 7890',
    email: 'lisburn@hhi.co.uk',
    manager: 'Jennifer White',
    totalEmployees: 32,
    totalProjects: 118,
    totalRevenue: 1980000,
    departments: [
      {
        id: 'lisburn-bathrooms',
        name: 'Bathrooms Department',
        description: 'Bathroom installations and renovations',
        manager: 'Kevin O\'Neill',
        employeeCount: 8,
        categories: ['Bathrooms'],
        activeProjects: 16,
        monthlyRevenue: 320000
      },
      {
        id: 'lisburn-kitchens',
        name: 'Kitchens Department',
        description: 'Kitchen design and installation',
        manager: 'Amanda Scott',
        employeeCount: 7,
        categories: ['Kitchens'],
        activeProjects: 13,
        monthlyRevenue: 280000
      },
      {
        id: 'lisburn-windows-doors',
        name: 'Windows & Doors Department',
        description: 'PVC windows and composite doors',
        manager: 'Steven Kelly',
        employeeCount: 6,
        categories: ['PVC Windows & Doors', 'Composite Doors'],
        activeProjects: 11,
        monthlyRevenue: 240000
      },
      {
        id: 'lisburn-exterior',
        name: 'Exterior Solutions Department',
        description: 'Fascia, soffit, guttering and decking',
        manager: 'Nicola Hughes',
        employeeCount: 5,
        categories: ['PVC Fascia Soffit & Guttering', 'HD Decking', 'PVC Cover Sills'],
        activeProjects: 9,
        monthlyRevenue: 200000
      }
    ]
  },
  {
    name: 'Bangor',
    address: '321 Bangor Avenue, Bangor, BT20 4EF',
    phone: '+44 28 9127 3456',
    email: 'bangor@hhi.co.uk',
    manager: 'Christopher Davis',
    totalEmployees: 28,
    totalProjects: 98,
    totalRevenue: 1650000,
    departments: [
      {
        id: 'bangor-bathrooms',
        name: 'Bathrooms Department',
        description: 'Bathroom installations and renovations',
        manager: 'Fiona Martin',
        employeeCount: 7,
        categories: ['Bathrooms'],
        activeProjects: 12,
        monthlyRevenue: 240000
      },
      {
        id: 'bangor-kitchens',
        name: 'Kitchens Department',
        description: 'Kitchen design and installation',
        manager: 'Gary Taylor',
        employeeCount: 6,
        categories: ['Kitchens'],
        activeProjects: 10,
        monthlyRevenue: 210000
      },
      {
        id: 'bangor-windows-doors',
        name: 'Windows & Doors Department',
        description: 'PVC windows and composite doors',
        manager: 'Helen Walsh',
        employeeCount: 5,
        categories: ['PVC Windows & Doors', 'Composite Doors'],
        activeProjects: 8,
        monthlyRevenue: 180000
      },
      {
        id: 'bangor-exterior',
        name: 'Exterior Solutions Department',
        description: 'Fascia, soffit, guttering and decking',
        manager: 'Mark Johnson',
        employeeCount: 4,
        categories: ['PVC Fascia Soffit & Guttering', 'HD Decking', 'PVC Cover Sills'],
        activeProjects: 7,
        monthlyRevenue: 150000
      }
    ]
  },
  {
    name: 'Coleraine',
    address: '654 Coleraine Road, Coleraine, BT52 1GH',
    phone: '+44 28 7034 5678',
    email: 'coleraine@hhi.co.uk',
    manager: 'Patricia Moore',
    totalEmployees: 25,
    totalProjects: 87,
    totalRevenue: 1420000,
    departments: [
      {
        id: 'coleraine-bathrooms',
        name: 'Bathrooms Department',
        description: 'Bathroom installations and renovations',
        manager: 'Daniel Lee',
        employeeCount: 6,
        categories: ['Bathrooms'],
        activeProjects: 10,
        monthlyRevenue: 200000
      },
      {
        id: 'coleraine-kitchens',
        name: 'Kitchens Department',
        description: 'Kitchen design and installation',
        manager: 'Catherine Reid',
        employeeCount: 5,
        categories: ['Kitchens'],
        activeProjects: 8,
        monthlyRevenue: 170000
      },
      {
        id: 'coleraine-windows-doors',
        name: 'Windows & Doors Department',
        description: 'PVC windows and composite doors',
        manager: 'Thomas Adams',
        employeeCount: 4,
        categories: ['PVC Windows & Doors', 'Composite Doors'],
        activeProjects: 7,
        monthlyRevenue: 150000
      },
      {
        id: 'coleraine-exterior',
        name: 'Exterior Solutions Department',
        description: 'Fascia, soffit, guttering and decking',
        manager: 'Louise Foster',
        employeeCount: 3,
        categories: ['PVC Fascia Soffit & Guttering', 'HD Decking', 'PVC Cover Sills'],
        activeProjects: 6,
        monthlyRevenue: 120000
      }
    ]
  }
];

// Mock Customers (from PRD)
export const mockCustomers: Customer[] = [
  {
    id: "CUST-001",
    name: "Mrs. Sarah Connor",
    email: "sarah.connor@email.com",
    phone: "07891 234567",
    address: "15 Stranmillis Road, Belfast BT5 6QR",
    postcode: "BT5 6QR",
    branch: "Belfast",
    registrationDate: "2024-11-15",
    totalProjects: 2,
    totalValue: 15800,
    rating: 4.8,
    customerType: 'residential',
    status: 'active',
    preferences: {
      preferredContact: 'email',
      communicationFrequency: 'monthly',
      specialRequirements: 'No specific requirements'
    },
    communicationHistory: [
      {date: "2024-11-15", type: "email", summary: "Initial contact via email"},
      {date: "2024-11-20", type: "phone", summary: "Customer called to discuss bathroom renovation"},
      {date: "2024-11-25", type: "email", summary: "Detailed quote sent via email"}
    ],
    companyInfo: {
      companyName: "Sarah Connor Ltd",
      vatNumber: "GB123456789",
      businessType: "Private"
    }
  },
  {
    id: "CUST-002", 
    name: "Mr. John Smith",
    email: "john.smith@gmail.com",
    phone: "07892 345678",
    address: "42 Ormonde Avenue, Newtownabbey BT36 5AT",
    postcode: "BT36 5AT",
    branch: "Newtownabbey",
    registrationDate: "2024-10-22",
    totalProjects: 1,
    totalValue: 8500,
    rating: 4.6,
    customerType: 'residential',
    status: 'active',
    preferences: {
      preferredContact: 'phone',
      communicationFrequency: 'quarterly',
      specialRequirements: 'No specific requirements'
    },
    communicationHistory: [
      {date: "2024-10-22", type: "email", summary: "Initial enquiry via website"},
      {date: "2024-10-25", type: "phone", summary: "Customer called to discuss kitchen installation"}
    ],
    companyInfo: {
      companyName: "John Smith & Sons",
      vatNumber: "GB987654321",
      businessType: "Private"
    }
  },
  {
    id: "CUST-003",
    name: "Mrs. Mary Johnson",
    email: "mary.j@hotmail.com", 
    phone: "07893 456789",
    address: "78 Enterprise Crescent, Lisburn BT28 2BP",
    postcode: "BT28 2BP",
    branch: "Lisburn",
    registrationDate: "2024-12-01",
    totalProjects: 1,
    totalValue: 12200,
    rating: 4.9,
    customerType: 'commercial',
    status: 'active',
    preferences: {
      preferredContact: 'email',
      communicationFrequency: 'monthly',
      specialRequirements: 'Fast turnaround'
    },
    communicationHistory: [
      {date: "2024-12-01", type: "email", summary: "Initial enquiry via email"},
      {date: "2024-12-05", type: "phone", summary: "Customer called to discuss composite door & windows"}
    ],
    companyInfo: {
      companyName: "Mary Johnson Ltd",
      vatNumber: "GB112233445",
      businessType: "Limited Company"
    }
  },
  {
    id: "CUST-004",
    name: "Mr. David Wilson",
    email: "d.wilson@yahoo.com",
    phone: "07894 567890", 
    address: "23 Balloo Drive, Bangor BT19 7QY",
    postcode: "BT19 7QY",
    branch: "Bangor",
    registrationDate: "2024-09-18",
    totalProjects: 3,
    totalValue: 22400,
    rating: 4.7,
    customerType: 'residential',
    status: 'not accepted',
    preferences: {
      preferredContact: 'sms',
      communicationFrequency: 'weekly',
      specialRequirements: 'Strict budget'
    },
    communicationHistory: [
      {date: "2024-09-18", type: "email", summary: "Initial enquiry via email"},
      {date: "2024-09-20", type: "phone", summary: "Customer called to discuss HD decking"},
      {date: "2024-09-25", type: "email", summary: "Detailed quote sent via email"}
    ],
    companyInfo: {
      companyName: "David Wilson & Co",
      vatNumber: "GB556677889",
      businessType: "Private"
    }
  },
  {
    id: "CUST-005",
    name: "Mrs. Emma Brown",
    email: "emma.brown@email.com",
    phone: "07895 678901",
    address: "56 Loughanhill Estate, Coleraine BT52 2NJ", 
    postcode: "BT52 2NJ",
    branch: "Coleraine",
    registrationDate: "2024-11-30",
    totalProjects: 1,
    totalValue: 6800,
    rating: 4.4,
    customerType: 'commercial',
    status: 'active',
    preferences: {
      preferredContact: 'email',
      communicationFrequency: 'monthly',
      specialRequirements: 'Quick installation'
    },
    communicationHistory: [
      {date: "2024-11-30", type: "email", summary: "Initial enquiry via email"},
      {date: "2024-12-02", type: "phone", summary: "Customer called to discuss PVC fascia & guttering"}
    ],
    companyInfo: {
      companyName: "Emma Brown Enterprises",
      vatNumber: "GB990011223",
      businessType: "Limited Liability Partnership"
    }
  },
  {
    id: "CUST-006",
    name: "Mr. Robert Taylor",
    email: "rob.taylor@gmail.com",
    phone: "07896 789012",
    address: "89 Antrim Road, Belfast BT1 1GR",
    postcode: "BT1 1GR", 
    branch: "Belfast",
    registrationDate: "2024-10-05",
    totalProjects: 2,
    totalValue: 18900,
    rating: 4.5,
    customerType: 'residential',
    status: 'active',
    preferences: {
      preferredContact: 'phone',
      communicationFrequency: 'quarterly',
      specialRequirements: 'No specific requirements'
    },
    communicationHistory: [
      {date: "2024-10-05", type: "email", summary: "Initial enquiry via email"},
      {date: "2024-10-10", type: "phone", summary: "Customer called to discuss bathroom refurbishment"}
    ],
    companyInfo: {
      companyName: "Robert Taylor & Sons",
      vatNumber: "GB123456789",
      businessType: "Private"
    }
  },
  {
    id: "CUST-007",
    name: "Mrs. Lisa Anderson",
    email: "lisa.anderson@outlook.com",
    phone: "07897 890123",
    address: "34 Glengormley Park, Newtownabbey BT36 7QR",
    postcode: "BT36 7QR",
    branch: "Newtownabbey", 
    registrationDate: "2024-08-12",
    totalProjects: 1,
    totalValue: 9750,
    rating: 4.8,
    customerType: 'commercial',
    status: 'active',
    preferences: {
      preferredContact: 'email',
      communicationFrequency: 'monthly',
      specialRequirements: 'Fast installation'
    },
    communicationHistory: [
      {date: "2024-08-12", type: "email", summary: "Initial enquiry via email"},
      {date: "2024-08-15", type: "phone", summary: "Customer called to discuss kitchen installation"}
    ],
    companyInfo: {
      companyName: "Lisa Anderson Ltd",
      vatNumber: "GB987654321",
      businessType: "Limited Company"
    }
  },
  {
    id: "CUST-008",
    name: "Mr. Michael O'Brien",
    email: "m.obrien@email.com",
    phone: "07898 901234",
    address: "67 Hillsborough Road, Lisburn BT27 1AA",
    postcode: "BT27 1AA",
    branch: "Lisburn",
    registrationDate: "2024-07-25",
    totalProjects: 2,
    totalValue: 16200,
    rating: 4.6,
    customerType: 'residential',
    status: 'not accepted',
    preferences: {
      preferredContact: 'sms',
      communicationFrequency: 'weekly',
      specialRequirements: 'Strict budget'
    },
    communicationHistory: [
      {date: "2024-07-25", type: "email", summary: "Initial enquiry via email"},
      {date: "2024-07-28", type: "phone", summary: "Customer called to discuss bathroom refurbishment"}
    ],
    companyInfo: {
      companyName: "Michael O'Brien & Co",
      vatNumber: "GB112233445",
      businessType: "Private"
    }
  },
  {
    id: "CUST-009", 
    name: "Mrs. Patricia Clarke",
    email: "pat.clarke@gmail.com",
    phone: "07899 012345",
    address: "12 Holywood Road, Bangor BT20 3AB",
    postcode: "BT20 3AB",
    branch: "Bangor",
    registrationDate: "2024-06-14",
    totalProjects: 1,
    totalValue: 7400,
    rating: 4.3,
    customerType: 'commercial',
    status: 'active',
    preferences: {
      preferredContact: 'email',
      communicationFrequency: 'monthly',
      specialRequirements: 'No specific requirements'
    },
    communicationHistory: [
      {date: "2024-06-14", type: "email", summary: "Initial enquiry via email"},
      {date: "2024-06-17", type: "phone", summary: "Customer called to discuss composite door & windows"}
    ],
    companyInfo: {
      companyName: "Patricia Clarke Ltd",
      vatNumber: "GB556677889",
      businessType: "Limited Liability Partnership"
    }
  },
  {
    id: "CUST-010",
    name: "Mr. James Murphy",
    email: "james.murphy@hotmail.com", 
    phone: "07890 123456",
    address: "91 Causeway Road, Coleraine BT51 3AA",
    postcode: "BT51 3AA",
    branch: "Coleraine",
    registrationDate: "2024-05-08",
    totalProjects: 2,
    totalValue: 13600,
    rating: 4.7,
    customerType: 'residential',
    status: 'completed',
    preferences: {
      preferredContact: 'phone',
      communicationFrequency: 'quarterly',
      specialRequirements: 'No specific requirements'
    },
    communicationHistory: [
      {date: "2024-05-08", type: "email", summary: "Initial enquiry via email"},
      {date: "2024-05-10", type: "phone", summary: "Customer called to discuss PVC fascia & guttering"}
    ],
    companyInfo: {
      companyName: "James Murphy & Sons",
      vatNumber: "GB990011223",
      businessType: "Private"
    }
  }
];

// Mock Projects (from PRD)
export const mockProjects: Project[] = [
  {
    id: "PROJ-001",
    customerId: "CUST-001",
    title: "Complete Bathroom Refurbishment",
    category: "Bathrooms",
    status: "Installation Completed",
    branch: "Belfast",
    assignedWorker: "Lindsay Murphy",
    subcontractor: "Premier Bathroom Solutions",
    value: 8500,
    createdDate: "2024-11-20",
    measurementDate: "2024-11-22",
    quoteSentDate: "2024-11-25",
    contractSignedDate: "2024-11-28",
    installationDate: "2024-12-15",
    completionDate: "2024-12-18",
    description: "Full ensuite renovation including walk-in shower, vanity unit, and tiling",
    address: "15 Stranmillis Road, Belfast",
    timeline: [
      {"date": "2024-11-20", "status": "Contact Received", "note": "Customer called about bathroom renovation", "type": "phone_call"},
      {"date": "2024-11-22", "status": "Measurement Completed", "note": "Site survey completed by surveyor", "type": "measurement"},
      {"date": "2024-11-25", "status": "Quote Sent", "note": "Detailed quote emailed to customer", "type": "quote_sent"},
      {"date": "2024-11-28", "status": "Contract Signed", "note": "Contract signed digitally", "type": "contract_signed"},
      {"date": "2024-12-15", "status": "Installation Started", "note": "Premier Bathroom Solutions began work", "type": "installation_started"},
      {"date": "2024-12-18", "status": "Installation Completed", "note": "Work completed, photos uploaded", "type": "installation_completed"}
    ]
  },
  {
    id: "PROJ-002",
    customerId: "CUST-002",
    title: "Kitchen Installation", 
    category: "Kitchens",
    status: "Quote Sent",
    branch: "Newtownabbey",
    assignedWorker: "Alan McKenna",
    value: 12200,
    createdDate: "2024-12-01",
    measurementDate: "2024-12-03",
    quoteSentDate: "2024-12-06",
    description: "Full kitchen refit with granite worktops and integrated appliances",
    address: "42 Ormonde Avenue, Newtownabbey",
    timeline: [
      {"date": "2024-12-01", "status": "Contact Received", "note": "Customer enquiry via website", "type": "phone_call"},
      {"date": "2024-12-03", "status": "Measurement Completed", "note": "Kitchen measured and designed", "type": "measurement"},
      {"date": "2024-12-06", "status": "Quote Sent", "note": "Comprehensive quote sent - awaiting response", "type": "quote_sent"}
    ]
  },
  {
    id: "PROJ-003",
    customerId: "CUST-003",
    title: "Composite Front Door & Windows",
    category: "Windows & Doors", 
    status: "Materials Received",
    branch: "Lisburn",
    assignedWorker: "Donna McCartney",
    subcontractor: "Superior Windows Ltd",
    value: 5800,
    createdDate: "2024-11-15",
    measurementDate: "2024-11-18",
    quoteSentDate: "2024-11-21",
    contractSignedDate: "2024-11-25",
    installationDate: "2024-12-20",
    description: "Anthracite grey composite door with matching UPVC windows",
    address: "78 Enterprise Crescent, Lisburn"
  },
  {
    id: "PROJ-004",
    customerId: "CUST-004",
    title: "HD Decking Installation",
    category: "HD Decking",
    status: "Repair Completed",
    branch: "Bangor", 
    assignedWorker: "Stephen Hamilton",
    subcontractor: "Coastal Decking Co",
    value: 4200,
    createdDate: "2024-10-10",
    completionDate: "2024-11-15",
    description: "25m² composite decking with built-in lighting",
    address: "23 Balloo Drive, Bangor",
    complaints: [
      {
        id: "COMP-001",
        status: "Case Closed",
        issue: "Loose decking board",
        submittedDate: "2024-11-20",
        resolvedDate: "2024-11-22",
        resolution: "Board re-secured with additional fixings",
        customerRating: 4.5
      }
    ],
    timeline: [
      {"date": "2024-10-10", "status": "Project Created", "note": "Project created in system", "type": "other"},
      {"date": "2024-11-15", "status": "Repair Completed", "note": "Decking repair completed", "type": "installation_completed"},
      {"date": "2024-11-20", "status": "Complaint Submitted", "note": "Loose decking board reported by customer", "type": "complaint_submitted"},
      {"date": "2024-11-22", "status": "Complaint Resolved", "note": "Board re-secured with additional fixings", "type": "complaint_resolved"}
    ]
  },
  {
    id: "PROJ-005",
    customerId: "CUST-005",
    title: "PVC Fascia & Guttering",
    category: "PVC Fascia Soffit & Guttering",
    status: "Installation Scheduled",
    branch: "Coleraine",
    assignedWorker: "David McKay",
    subcontractor: "Roofline Specialists NI",
    value: 3400,
    createdDate: "2024-11-28",
    installationDate: "2024-12-22",
    description: "Full roofline replacement in white UPVC",
    address: "56 Loughanhill Estate, Coleraine"
  },
  {
    id: "PROJ-006",
    customerId: "CUST-006",
    title: "Luxury Bathroom Suite",
    category: "Bathrooms",
    status: "In Progress",
    branch: "Belfast",
    assignedWorker: "Lindsay Murphy",
    subcontractor: "Premier Bathroom Solutions",
    value: 7200,
    createdDate: "2024-11-25",
    measurementDate: "2024-11-27",
    quoteSentDate: "2024-11-30",
    contractSignedDate: "2024-12-02",
    installationDate: "2024-12-10",
    description: "Premium bathroom with freestanding bath, walk-in shower, and heated towel rail",
    address: "89 Malone Road, Belfast",
    timeline: [
      {"date": "2024-11-25", "status": "Contact Received", "note": "Customer enquiry for luxury bathroom", "type": "phone_call"},
      {"date": "2024-11-27", "status": "Measurement Completed", "note": "Detailed site survey completed", "type": "measurement"},
      {"date": "2024-11-30", "status": "Quote Sent", "note": "Premium quote with luxury options", "type": "quote_sent"},
      {"date": "2024-12-02", "status": "Contract Signed", "note": "Contract signed with 50% deposit", "type": "contract_signed"},
      {"date": "2024-12-10", "status": "Installation Started", "note": "Work commenced on schedule", "type": "installation_started"}
    ]
  },
  {
    id: "PROJ-007",
    customerId: "CUST-007",
    title: "Modern Kitchen Extension",
    category: "Kitchens",
    status: "Approved",
    branch: "Newtownabbey",
    assignedWorker: "Alan McKenna",
    value: 15800,
    createdDate: "2024-11-18",
    measurementDate: "2024-11-20",
    quoteSentDate: "2024-11-23",
    contractSignedDate: "2024-11-26",
    description: "Kitchen extension with bi-fold doors, island unit, and premium appliances",
    address: "12 Shore Road, Newtownabbey",
    timeline: [
      {"date": "2024-11-18", "status": "Contact Received", "note": "Customer planning kitchen extension", "type": "phone_call"},
      {"date": "2024-11-20", "status": "Measurement Completed", "note": "Full site survey and planning", "type": "measurement"},
      {"date": "2024-11-23", "status": "Quote Sent", "note": "Comprehensive quote for extension project", "type": "quote_sent"},
      {"date": "2024-11-26", "status": "Contract Signed", "note": "Project approved and scheduled", "type": "contract_signed"}
    ]
  },
  {
    id: "PROJ-008",
    customerId: "CUST-008",
    title: "UPVC Window Replacement",
    category: "Windows & Doors",
    status: "Quote Sent",
    branch: "Lisburn",
    assignedWorker: "Donna McCartney",
    subcontractor: "Superior Windows Ltd",
    value: 4800,
    createdDate: "2024-12-05",
    measurementDate: "2024-12-07",
    quoteSentDate: "2024-12-10",
    description: "Replace 6 windows with A-rated UPVC double glazing",
    address: "34 Bow Street, Lisburn",
    timeline: [
      {"date": "2024-12-05", "status": "Contact Received", "note": "Customer enquired about window replacement"},
      {"date": "2024-12-07", "status": "Measurement Completed", "note": "All windows measured and assessed"},
      {"date": "2024-12-10", "status": "Quote Sent", "note": "Detailed quote with energy efficiency options"}
    ]
  },
  {
    id: "PROJ-009",
    customerId: "CUST-009",
    title: "Composite Decking & Patio",
    category: "HD Decking",
    status: "Installation Completed",
    branch: "Bangor",
    assignedWorker: "Stephen Hamilton",
    subcontractor: "Coastal Decking Co",
    value: 5600,
    createdDate: "2024-10-15",
    measurementDate: "2024-10-17",
    quoteSentDate: "2024-10-20",
    contractSignedDate: "2024-10-22",
    installationDate: "2024-11-05",
    completionDate: "2024-11-08",
    description: "35m² composite decking with stone patio area and outdoor lighting",
    address: "7 Marine Parade, Bangor",
    timeline: [
      {"date": "2024-10-15", "status": "Contact Received", "note": "Customer wanted garden transformation", "type": "phone_call"},
      {"date": "2024-10-17", "status": "Measurement Completed", "note": "Garden surveyed and design created", "type": "measurement"},
      {"date": "2024-10-20", "status": "Quote Sent", "note": "Comprehensive garden design quote", "type": "quote_sent"},
      {"date": "2024-10-22", "status": "Contract Signed", "note": "Project approved with deposit", "type": "contract_signed"},
      {"date": "2024-11-05", "status": "Installation Started", "note": "Work commenced on decking and patio", "type": "installation_started"},
      {"date": "2024-11-08", "status": "Installation Completed", "note": "Project completed successfully", "type": "installation_completed"}
    ]
  },
  {
    id: "PROJ-010",
    customerId: "CUST-010",
    title: "Full Roofline Replacement",
    category: "PVC Fascia Soffit & Guttering",
    status: "In Progress",
    branch: "Coleraine",
    assignedWorker: "David McKay",
    subcontractor: "Roofline Specialists NI",
    value: 4200,
    createdDate: "2024-11-30",
    measurementDate: "2024-12-02",
    quoteSentDate: "2024-12-05",
    contractSignedDate: "2024-12-07",
    installationDate: "2024-12-18",
    description: "Complete roofline replacement including fascia, soffit, and guttering",
    address: "23 Portstewart Road, Coleraine",
    timeline: [
      {"date": "2024-11-30", "status": "Contact Received", "note": "Customer reported roofline damage"},
      {"date": "2024-12-02", "status": "Measurement Completed", "note": "Full roofline assessment completed"},
      {"date": "2024-12-05", "status": "Quote Sent", "note": "Detailed quote for full replacement"},
      {"date": "2024-12-07", "status": "Contract Signed", "note": "Project approved and scheduled"},
      {"date": "2024-12-18", "status": "Installation Started", "note": "Work commenced on roofline"}
    ]
  },
  {
    id: "PROJ-011",
    customerId: "CUST-001",
    title: "Ensuite Bathroom Installation",
    category: "Bathrooms",
    status: "Quote Sent",
    branch: "Belfast",
    assignedWorker: "Lindsay Murphy",
    value: 6800,
    createdDate: "2024-12-08",
    measurementDate: "2024-12-10",
    quoteSentDate: "2024-12-12",
    description: "New ensuite bathroom with walk-in shower and modern fixtures",
    address: "15 Stranmillis Road, Belfast",
    timeline: [
      {"date": "2024-12-08", "status": "Contact Received", "note": "Customer wants additional ensuite"},
      {"date": "2024-12-10", "status": "Measurement Completed", "note": "Space assessed for ensuite"},
      {"date": "2024-12-12", "status": "Quote Sent", "note": "Detailed quote for ensuite installation"}
    ]
  },
  {
    id: "PROJ-012",
    customerId: "CUST-003",
    title: "Back Door & French Windows",
    category: "Windows & Doors",
    status: "Approved",
    branch: "Lisburn",
    assignedWorker: "Donna McCartney",
    subcontractor: "Superior Windows Ltd",
    value: 5200,
    createdDate: "2024-11-28",
    measurementDate: "2024-11-30",
    quoteSentDate: "2024-12-03",
    contractSignedDate: "2024-12-05",
    description: "Composite back door with matching French windows to garden",
    address: "78 Enterprise Crescent, Lisburn",
    timeline: [
      {"date": "2024-11-28", "status": "Contact Received", "note": "Customer wants garden access improvement"},
      {"date": "2024-11-30", "status": "Measurement Completed", "note": "Back entrance measured and designed"},
      {"date": "2024-12-03", "status": "Quote Sent", "note": "Quote for door and French windows"},
      {"date": "2024-12-05", "status": "Contract Signed", "note": "Project approved and scheduled"}
    ]
  },
  {
    id: "PROJ-013",
    customerId: "CUST-004",
    title: "Kitchen Island & Worktop",
    category: "Kitchens",
    status: "Installation Completed",
    branch: "Bangor",
    assignedWorker: "Stephen Hamilton",
    value: 3800,
    createdDate: "2024-10-20",
    measurementDate: "2024-10-22",
    quoteSentDate: "2024-10-25",
    contractSignedDate: "2024-10-27",
    installationDate: "2024-11-10",
    completionDate: "2024-11-12",
    description: "Kitchen island with granite worktop and breakfast bar",
    address: "23 Balloo Drive, Bangor",
    timeline: [
      {"date": "2024-10-20", "status": "Contact Received", "note": "Customer wanted kitchen island addition"},
      {"date": "2024-10-22", "status": "Measurement Completed", "note": "Kitchen space assessed for island"},
      {"date": "2024-10-25", "status": "Quote Sent", "note": "Quote for island and worktop"},
      {"date": "2024-10-27", "status": "Contract Signed", "note": "Project approved"},
      {"date": "2024-11-10", "status": "Installation Started", "note": "Island installation commenced"},
      {"date": "2024-11-12", "status": "Installation Completed", "note": "Island completed successfully"}
    ]
  },
  {
    id: "PROJ-014",
    customerId: "CUST-005",
    title: "Heating System Upgrade",
    category: "Heating",
    status: "In Progress",
    branch: "Coleraine",
    assignedWorker: "David McKay",
    value: 4500,
    createdDate: "2024-11-25",
    measurementDate: "2024-11-27",
    quoteSentDate: "2024-11-30",
    contractSignedDate: "2024-12-02",
    installationDate: "2024-12-15",
    description: "Upgrade to energy-efficient heating system with smart controls",
    address: "56 Loughanhill Estate, Coleraine",
    timeline: [
      {"date": "2024-11-25", "status": "Contact Received", "note": "Customer enquired about heating upgrade"},
      {"date": "2024-11-27", "status": "Measurement Completed", "note": "Current system assessed"},
      {"date": "2024-11-30", "status": "Quote Sent", "note": "Quote for heating system upgrade"},
      {"date": "2024-12-02", "status": "Contract Signed", "note": "Project approved and scheduled"},
      {"date": "2024-12-15", "status": "Installation Started", "note": "Heating upgrade commenced"}
    ]
  },
  {
    id: "PROJ-015",
    customerId: "CUST-006",
    title: "Garden Room & Decking",
    category: "HD Decking",
    status: "Quote Sent",
    branch: "Belfast",
    assignedWorker: "Lindsay Murphy",
    subcontractor: "Coastal Decking Co",
    value: 8900,
    createdDate: "2024-12-10",
    measurementDate: "2024-12-12",
    quoteSentDate: "2024-12-14",
    description: "Garden room with composite decking and outdoor kitchen area",
    address: "89 Malone Road, Belfast",
    timeline: [
      {"date": "2024-12-10", "status": "Contact Received", "note": "Customer wants garden room and decking"},
      {"date": "2024-12-12", "status": "Measurement Completed", "note": "Garden space assessed for room and decking"},
      {"date": "2024-12-14", "status": "Quote Sent", "note": "Comprehensive quote for garden transformation"}
    ]
  },
  {
    id: "PROJ-016",
    customerId: "CUST-001",
    title: "Bathroom Renovation",
    category: "Bathrooms",
    status: "Invoice Sent",
    branch: "Belfast",
    assignedWorker: "Lindsay Murphy",
    subcontractor: "Premier Bathroom Solutions",
    value: 6500,
    createdDate: "2024-11-15",
    measurementDate: "2024-11-18",
    quoteSentDate: "2024-11-20",
    contractSignedDate: "2024-11-25",
    installationDate: "2024-12-05",
    completionDate: "2024-12-08",
    description: "Complete bathroom renovation with walk-in shower",
    address: "15 Stranmillis Road, Belfast",
    timeline: [
      {"date": "2024-11-15", "status": "Contact Received", "note": "Customer enquiry for bathroom renovation"},
      {"date": "2024-11-18", "status": "Measurement Completed", "note": "Bathroom space measured"},
      {"date": "2024-11-20", "status": "Quote Sent", "note": "Detailed quote sent"},
      {"date": "2024-11-25", "status": "Contract Signed", "note": "Project approved"},
      {"date": "2024-12-05", "status": "Installation Started", "note": "Work commenced"},
      {"date": "2024-12-08", "status": "Installation Completed", "note": "Project completed"},
      {"date": "2024-12-10", "status": "Invoice Sent", "note": "Final invoice sent to customer"}
    ]
  },
  {
    id: "PROJ-017",
    customerId: "CUST-002",
    title: "Kitchen Extension",
    category: "Kitchens",
    status: "Awaiting Payment",
    branch: "Newtownabbey",
    assignedWorker: "Alan McKenna",
    value: 18500,
    createdDate: "2024-10-20",
    measurementDate: "2024-10-22",
    quoteSentDate: "2024-10-25",
    contractSignedDate: "2024-10-28",
    installationDate: "2024-11-15",
    completionDate: "2024-11-20",
    description: "Kitchen extension with bi-fold doors and island unit",
    address: "42 Ormonde Avenue, Newtownabbey",
    timeline: [
      {"date": "2024-10-20", "status": "Contact Received", "note": "Customer planning kitchen extension"},
      {"date": "2024-10-22", "status": "Measurement Completed", "note": "Site survey completed"},
      {"date": "2024-10-25", "status": "Quote Sent", "note": "Comprehensive quote sent"},
      {"date": "2024-10-28", "status": "Contract Signed", "note": "Project approved"},
      {"date": "2024-11-15", "status": "Installation Started", "note": "Extension work began"},
      {"date": "2024-11-20", "status": "Installation Completed", "note": "Project completed"},
      {"date": "2024-11-22", "status": "Invoice Sent", "note": "Final invoice sent"},
      {"date": "2024-11-25", "status": "Awaiting Payment", "note": "Payment reminder sent"}
    ]
  },
  {
    id: "PROJ-018",
    customerId: "CUST-003",
    title: "Window Replacement",
    category: "Windows & Doors",
    status: "Paid",
    branch: "Lisburn",
    assignedWorker: "Donna McCartney",
    subcontractor: "Superior Windows Ltd",
    value: 4200,
    createdDate: "2024-09-10",
    measurementDate: "2024-09-12",
    quoteSentDate: "2024-09-15",
    contractSignedDate: "2024-09-18",
    installationDate: "2024-10-05",
    completionDate: "2024-10-08",
    description: "Replace 4 windows with A-rated UPVC double glazing",
    address: "78 Enterprise Crescent, Lisburn",
    timeline: [
      {"date": "2024-09-10", "status": "Contact Received", "note": "Customer enquiry for window replacement"},
      {"date": "2024-09-12", "status": "Measurement Completed", "note": "Windows measured"},
      {"date": "2024-09-15", "status": "Quote Sent", "note": "Quote sent"},
      {"date": "2024-09-18", "status": "Contract Signed", "note": "Project approved"},
      {"date": "2024-10-05", "status": "Installation Started", "note": "Window replacement began"},
      {"date": "2024-10-08", "status": "Installation Completed", "note": "All windows installed"},
      {"date": "2024-10-10", "status": "Invoice Sent", "note": "Final invoice sent"},
      {"date": "2024-10-15", "status": "Paid", "note": "Payment received"}
    ]
  },
  {
    id: "PROJ-019",
    customerId: "CUST-004",
    title: "Decking Installation",
    category: "HD Decking",
    status: "Awaiting Review",
    branch: "Bangor",
    assignedWorker: "Stephen Hamilton",
    subcontractor: "Coastal Decking Co",
    value: 3200,
    createdDate: "2024-08-15",
    measurementDate: "2024-08-17",
    quoteSentDate: "2024-08-20",
    contractSignedDate: "2024-08-23",
    installationDate: "2024-09-10",
    completionDate: "2024-09-12",
    description: "20m² composite decking with built-in lighting",
    address: "23 Balloo Drive, Bangor",
    timeline: [
      {"date": "2024-08-15", "status": "Contact Received", "note": "Customer wants decking installation"},
      {"date": "2024-08-17", "status": "Measurement Completed", "note": "Garden space measured"},
      {"date": "2024-08-20", "status": "Quote Sent", "note": "Quote sent"},
      {"date": "2024-08-23", "status": "Contract Signed", "note": "Project approved"},
      {"date": "2024-09-10", "status": "Installation Started", "note": "Decking installation began"},
      {"date": "2024-09-12", "status": "Installation Completed", "note": "Decking completed"},
      {"date": "2024-09-14", "status": "Invoice Sent", "note": "Final invoice sent"},
      {"date": "2024-09-20", "status": "Paid", "note": "Payment received"},
      {"date": "2024-09-25", "status": "Awaiting Review", "note": "Follow-up email sent for review"}
    ]
  }
];

// Mock Users (from PRD)
export const mockUsers: User[] = [
  {
    id: "USER-001",
    name: "Admin User",
    email: "admin@hhi-ni.com",
    role: "System Administrator",
    branch: "Belfast",
    phone: "02890 402204",
    permissions: ["all"],
    status: 'active',
    userType: 'admin',
    createdAt: "2024-01-01",
    lastLogin: "2024-11-28",
    avatar: "https://via.placeholder.com/50",
    preferences: {
      theme: "light",
      notifications: {
        email: true,
        sms: false,
        push: true
      },
      language: "en"
    },
    security: {
      twoFactorEnabled: false,
      lastPasswordChange: "2024-01-01",
      failedLoginAttempts: 0
    },
    activity: {
      lastActivity: "2024-11-28",
      totalLogins: 100,
      averageSessionTime: "1.5h"
    }
  },
  {
    id: "USER-002", 
    name: "Lindsay Murphy",
    email: "lindsay.murphy@hhi-ni.com",
    role: "Branch Manager",
    branch: "Belfast",
    phone: "02890 402204",
    specialization: "Bathrooms",
    rating: 4.8,
    projectsCompleted: 156,
    completedJobs: 234,
    averageTime: "3.2 days",
    status: 'active',
    userType: 'branch_manager',
    createdAt: "2024-02-15",
    lastLogin: "2024-11-27",
    avatar: "https://via.placeholder.com/50",
    preferences: {
      theme: "dark",
      notifications: {
        email: true,
        sms: true,
        push: false
      },
      language: "pl"
    },
    security: {
      twoFactorEnabled: true,
      lastPasswordChange: "2024-11-27",
      failedLoginAttempts: 1
    },
    activity: {
      lastActivity: "2024-11-27",
      totalLogins: 50,
      averageSessionTime: "1.2h"
    }
  },
  {
    id: "USER-003",
    name: "Alan McKenna", 
    email: "alan.mckenna@hhi-ni.com",
    role: "Branch Worker",
    branch: "Newtownabbey", 
    phone: "02890 838343",
    specialization: "Kitchens",
    rating: 4.6,
    projectsCompleted: 89,
    completedJobs: 187,
    averageTime: "1.8 days",
    status: 'active',
    userType: 'branch_worker',
    createdAt: "2024-03-01",
    lastLogin: "2024-11-26",
    avatar: "https://via.placeholder.com/50",
    preferences: {
      theme: "auto",
      notifications: {
        email: true,
        sms: false,
        push: true
      },
      language: "en"
    },
    security: {
      twoFactorEnabled: false,
      lastPasswordChange: "2024-11-26",
      failedLoginAttempts: 0
    },
    activity: {
      lastActivity: "2024-11-26",
      totalLogins: 40,
      averageSessionTime: "1.5h"
    }
  },
  {
    id: "SUB-001",
    name: "Premier Bathroom Solutions",
    email: "info@premierbathrooms.com",
    role: "Subcontractor",
    phone: "07700 123456",
    specialization: "Bathrooms, Plumbing, Tiling",
    branches: ["Belfast", "Newtownabbey"],
    rating: 4.7,
    completedJobs: 234,
    averageTime: "3.2 days",
    status: 'active',
    userType: 'subcontractor',
    createdAt: "2024-04-10",
    lastLogin: "2024-11-25",
    avatar: "https://via.placeholder.com/50",
    preferences: {
      theme: "light",
      notifications: {
        email: true,
        sms: true,
        push: false
      },
      language: "en"
    },
    security: {
      twoFactorEnabled: true,
      lastPasswordChange: "2024-11-25",
      failedLoginAttempts: 0
    },
    activity: {
      lastActivity: "2024-11-25",
      totalLogins: 20,
      averageSessionTime: "1.2h"
    }
  },
  {
    id: "SUB-002",
    name: "Superior Windows Ltd",
    email: "jobs@superiorwindows.co.uk", 
    role: "Subcontractor",
    phone: "07700 234567",
    specialization: "Windows & Doors, UPVC, Composite",
    branches: ["Lisburn", "Belfast"],
    rating: 4.5,
    completedJobs: 187,
    averageTime: "1.8 days",
    status: 'active',
    userType: 'subcontractor',
    createdAt: "2024-05-20",
    lastLogin: "2024-11-24",
    avatar: "https://via.placeholder.com/50",
    preferences: {
      theme: "dark",
      notifications: {
        email: true,
        sms: false,
        push: true
      },
      language: "pl"
    },
    security: {
      twoFactorEnabled: false,
      lastPasswordChange: "2024-11-24",
      failedLoginAttempts: 0
    },
    activity: {
      lastActivity: "2024-11-24",
      totalLogins: 15,
      averageSessionTime: "1.5h"
    }
  },
  {
    id: "USER-004",
    name: "Donna McCartney",
    email: "donna.mccartney@hhi-ni.com",
    role: "Branch Manager",
    branch: "Lisburn",
    phone: "02892 123456",
    specialization: "Windows & Doors",
    rating: 4.7,
    projectsCompleted: 134,
    completedJobs: 201,
    averageTime: "2.1 days",
    status: 'active',
    userType: 'branch_manager',
    createdAt: "2024-02-20",
    lastLogin: "2024-11-28",
    avatar: "https://via.placeholder.com/50",
    preferences: {
      theme: "light",
      notifications: {
        email: true,
        sms: true,
        push: true
      },
      language: "en"
    },
    security: {
      twoFactorEnabled: true,
      lastPasswordChange: "2024-11-28",
      failedLoginAttempts: 0
    },
    activity: {
      lastActivity: "2024-11-28",
      totalLogins: 75,
      averageSessionTime: "1.8h"
    }
  },
  {
    id: "USER-005",
    name: "Stephen Hamilton",
    email: "stephen.hamilton@hhi-ni.com",
    role: "Branch Worker",
    branch: "Bangor",
    phone: "02891 234567",
    specialization: "HD Decking",
    rating: 4.4,
    projectsCompleted: 67,
    completedJobs: 98,
    averageTime: "2.5 days",
    status: 'active',
    userType: 'branch_worker',
    createdAt: "2024-03-15",
    lastLogin: "2024-11-27",
    avatar: "https://via.placeholder.com/50",
    preferences: {
      theme: "auto",
      notifications: {
        email: true,
        sms: false,
        push: false
      },
      language: "en"
    },
    security: {
      twoFactorEnabled: false,
      lastPasswordChange: "2024-11-27",
      failedLoginAttempts: 2
    },
    activity: {
      lastActivity: "2024-11-27",
      totalLogins: 35,
      averageSessionTime: "1.3h"
    }
  },
  {
    id: "USER-006",
    name: "David McKay",
    email: "david.mckay@hhi-ni.com",
    role: "Branch Worker",
    branch: "Coleraine",
    phone: "02870 345678",
    specialization: "PVC Fascia Soffit & Guttering",
    rating: 4.3,
    projectsCompleted: 45,
    completedJobs: 67,
    averageTime: "2.8 days",
    status: 'active',
    userType: 'branch_worker',
    createdAt: "2024-04-01",
    lastLogin: "2024-11-26",
    avatar: "https://via.placeholder.com/50",
    preferences: {
      theme: "dark",
      notifications: {
        email: false,
        sms: true,
        push: true
      },
      language: "pl"
    },
    security: {
      twoFactorEnabled: false,
      lastPasswordChange: "2024-11-26",
      failedLoginAttempts: 1
    },
    activity: {
      lastActivity: "2024-11-26",
      totalLogins: 28,
      averageSessionTime: "1.1h"
    }
  },
  {
    id: "SUB-003",
    name: "Coastal Decking Co",
    email: "info@coastaldecking.co.uk",
    role: "Subcontractor",
    phone: "07700 345678",
    specialization: "HD Decking, Composite Materials",
    branches: ["Bangor", "Coleraine"],
    rating: 4.6,
    completedJobs: 156,
    averageTime: "2.3 days",
    status: 'active',
    userType: 'subcontractor',
    createdAt: "2024-06-01",
    lastLogin: "2024-11-25",
    avatar: "https://via.placeholder.com/50",
    preferences: {
      theme: "light",
      notifications: {
        email: true,
        sms: true,
        push: false
      },
      language: "en"
    },
    security: {
      twoFactorEnabled: true,
      lastPasswordChange: "2024-11-25",
      failedLoginAttempts: 0
    },
    activity: {
      lastActivity: "2024-11-25",
      totalLogins: 12,
      averageSessionTime: "1.4h"
    }
  },
  {
    id: "SUB-004",
    name: "Roofline Specialists NI",
    email: "jobs@rooflinespecialists.co.uk",
    role: "Subcontractor",
    phone: "07700 456789",
    specialization: "PVC Fascia, Soffit, Guttering",
    branches: ["Coleraine", "Belfast"],
    rating: 4.4,
    completedJobs: 123,
    averageTime: "1.9 days",
    status: 'active',
    userType: 'subcontractor',
    createdAt: "2024-07-01",
    lastLogin: "2024-11-24",
    avatar: "https://via.placeholder.com/50",
    preferences: {
      theme: "dark",
      notifications: {
        email: true,
        sms: false,
        push: true
      },
      language: "en"
    },
    security: {
      twoFactorEnabled: false,
      lastPasswordChange: "2024-11-24",
      failedLoginAttempts: 0
    },
    activity: {
      lastActivity: "2024-11-24",
      totalLogins: 8,
      averageSessionTime: "1.6h"
    }
  }
];

// Mock Analytics (from PRD)
export const mockAnalytics: Analytics = {
  total_projects: 127,
  active_projects: 45,
  monthly_revenue: 245000,
  conversion_rate: 28.5,
  history: [
    { month: "2023-07", revenue: 180000, completed_projects: 8, conversion_rate: 22.1 },
    { month: "2023-08", revenue: 192000, completed_projects: 10, conversion_rate: 23.4 },
    { month: "2023-09", revenue: 205000, completed_projects: 11, conversion_rate: 24.0 },
    { month: "2023-10", revenue: 210000, completed_projects: 12, conversion_rate: 25.2 },
    { month: "2023-11", revenue: 220000, completed_projects: 13, conversion_rate: 26.0 },
    { month: "2023-12", revenue: 230000, completed_projects: 14, conversion_rate: 26.8 },
    { month: "2024-01", revenue: 235000, completed_projects: 13, conversion_rate: 27.0 },
    { month: "2024-02", revenue: 240000, completed_projects: 12, conversion_rate: 27.5 },
    { month: "2024-03", revenue: 242000, completed_projects: 11, conversion_rate: 27.8 },
    { month: "2024-04", revenue: 243000, completed_projects: 10, conversion_rate: 28.0 },
    { month: "2024-05", revenue: 244000, completed_projects: 9, conversion_rate: 28.2 },
    { month: "2024-06", revenue: 245000, completed_projects: 9, conversion_rate: 28.5 }
  ],
  project_status_distribution: {
    quote: 18,
    approved: 22,
    in_progress: 45,
    completed: 42
  },
  service_type_performance: [
    { service_type: "Bathroom Refurbishment", projects: 32, revenue: 110000 },
    { service_type: "Kitchen Installation", projects: 28, revenue: 95000 },
    { service_type: "Heating System Upgrade", projects: 21, revenue: 70000 },
    { service_type: "Windows & Doors", projects: 18, revenue: 42000 },
    { service_type: "Other", projects: 28, revenue: 28000 }
  ],
  customer_satisfaction: {
    average: 4.6,
    distribution: { "1": 2, "2": 4, "3": 12, "4": 41, "5": 68 }
  },
  regional_performance: [
    { region: "Belfast", projects: 38, revenue: 90000 },
    { region: "Derry", projects: 21, revenue: 48000 },
    { region: "Lisburn", projects: 17, revenue: 35000 },
    { region: "Newry", projects: 13, revenue: 25000 },
    { region: "Other", projects: 38, revenue: 47000 }
  ],
  avg_days_phone_to_measurement: 5,
  avg_days_complaint_wait: 10,
  avg_days_contact_to_contract: 15,
  branch_performance_metrics: [
    {
      branch: "Belfast",
      projects_count: 38,
      avg_days_phone_to_measurement: 5,
      avg_days_complaint_wait: 10,
      avg_days_contact_to_contract: 15,
      avg_project_duration: 20
    },
    {
      branch: "Newtownabbey",
      projects_count: 21,
      avg_days_phone_to_measurement: 7,
      avg_days_complaint_wait: 12,
      avg_days_contact_to_contract: 18,
      avg_project_duration: 25
    },
    {
      branch: "Lisburn",
      projects_count: 17,
      avg_days_phone_to_measurement: 6,
      avg_days_complaint_wait: 11,
      avg_days_contact_to_contract: 16,
      avg_project_duration: 22
    },
    {
      branch: "Bangor",
      projects_count: 13,
      avg_days_phone_to_measurement: 8,
      avg_days_complaint_wait: 13,
      avg_days_contact_to_contract: 20,
      avg_project_duration: 28
    },
    {
      branch: "Coleraine",
      projects_count: 30,
      avg_days_phone_to_measurement: 4,
      avg_days_complaint_wait: 8,
      avg_days_contact_to_contract: 12,
      avg_project_duration: 18
    }
  ],
  detailed_branch_analytics: [
    {
      branch: "Belfast",
      operational: {
        active_projects: 15,
        avg_project_duration: 22,
        resource_utilization: 85,
        on_time_delivery_rate: 92,
        complaints_count: 5,
        returns_count: 1
      },
      financial: {
        revenue: 85000,
        gross_margin: 30,
        net_margin: 20,
        operational_costs: 25000,
        roi: 15,
        revenue_per_employee: 5000
      },
      hr: {
        employee_count: 10,
        avg_tenure: 2.5,
        turnover_rate: 5,
        productivity_per_employee: 12,
        overtime_hours: 100
      },
      quality: {
        customer_satisfaction: 4.8,
        complaints_rate: 2,
        repeat_orders_rate: 10,
        response_time: 1.5,
        quality_audit_score: 95
      },
      growth: {
        new_contracts: 10,
        market_share_growth: 2,
        new_customers: 50,
        expansion_projects: 5
      }
    },
    {
      branch: "Newtownabbey",
      operational: {
        active_projects: 10,
        avg_project_duration: 20,
        resource_utilization: 75,
        on_time_delivery_rate: 90,
        complaints_count: 3,
        returns_count: 0
      },
      financial: {
        revenue: 45000,
        gross_margin: 25,
        net_margin: 15,
        operational_costs: 12000,
        roi: 10,
        revenue_per_employee: 4500
      },
      hr: {
        employee_count: 8,
        avg_tenure: 1.8,
        turnover_rate: 8,
        productivity_per_employee: 10,
        overtime_hours: 80
      },
      quality: {
        customer_satisfaction: 4.5,
        complaints_rate: 3,
        repeat_orders_rate: 8,
        response_time: 2,
        quality_audit_score: 90
      },
      growth: {
        new_contracts: 5,
        market_share_growth: 1,
        new_customers: 20,
        expansion_projects: 2
      }
    },
    {
      branch: "Lisburn",
      operational: {
        active_projects: 12,
        avg_project_duration: 25,
        resource_utilization: 80,
        on_time_delivery_rate: 95,
        complaints_count: 4,
        returns_count: 1
      },
      financial: {
        revenue: 50000,
        gross_margin: 28,
        net_margin: 18,
        operational_costs: 15000,
        roi: 12,
        revenue_per_employee: 4167
      },
      hr: {
        employee_count: 9,
        avg_tenure: 2,
        turnover_rate: 6,
        productivity_per_employee: 11,
        overtime_hours: 90
      },
      quality: {
        customer_satisfaction: 4.7,
        complaints_rate: 2,
        repeat_orders_rate: 10,
        response_time: 1.8,
        quality_audit_score: 92
      },
      growth: {
        new_contracts: 8,
        market_share_growth: 1.5,
        new_customers: 30,
        expansion_projects: 3
      }
    },
    {
      branch: "Bangor",
      operational: {
        active_projects: 10,
        avg_project_duration: 28,
        resource_utilization: 70,
        on_time_delivery_rate: 85,
        complaints_count: 6,
        returns_count: 2
      },
      financial: {
        revenue: 60000,
        gross_margin: 20,
        net_margin: 10,
        operational_costs: 18000,
        roi: 8,
        revenue_per_employee: 6000
      },
      hr: {
        employee_count: 12,
        avg_tenure: 2.2,
        turnover_rate: 7,
        productivity_per_employee: 10,
        overtime_hours: 120
      },
      quality: {
        customer_satisfaction: 4.4,
        complaints_rate: 3,
        repeat_orders_rate: 12,
        response_time: 2.5,
        quality_audit_score: 88
      },
      growth: {
        new_contracts: 7,
        market_share_growth: 1.2,
        new_customers: 40,
        expansion_projects: 4
      }
    },
    {
      branch: "Coleraine",
      operational: {
        active_projects: 10,
        avg_project_duration: 18,
        resource_utilization: 90,
        on_time_delivery_rate: 98,
        complaints_count: 2,
        returns_count: 0
      },
      financial: {
        revenue: 70000,
        gross_margin: 35,
        net_margin: 25,
        operational_costs: 10000,
        roi: 20,
        revenue_per_employee: 7000
      },
      hr: {
        employee_count: 15,
        avg_tenure: 2.8,
        turnover_rate: 4,
        productivity_per_employee: 15,
        overtime_hours: 150
      },
      quality: {
        customer_satisfaction: 4.9,
        complaints_rate: 1,
        repeat_orders_rate: 15,
        response_time: 1.2,
        quality_audit_score: 98
      },
      growth: {
        new_contracts: 12,
        market_share_growth: 2.5,
        new_customers: 60,
        expansion_projects: 6
      }
    }
  ],
  employee_performance: {
    top_by_projects: [
      { name: "Lindsay Murphy", total_projects: 156, total_value: 15800, completed_projects: 156, conversion_rate: 100, avg_project_value: 100, avg_project_duration: 20, branch: "Belfast" },
      { name: "Alan McKenna", total_projects: 89, total_value: 8500, completed_projects: 89, conversion_rate: 100, avg_project_value: 95, avg_project_duration: 18, branch: "Newtownabbey" },
      { name: "Donna McCartney", total_projects: 134, total_value: 12200, completed_projects: 134, conversion_rate: 100, avg_project_value: 90, avg_project_duration: 21, branch: "Lisburn" },
      { name: "Stephen Hamilton", total_projects: 67, total_value: 4200, completed_projects: 67, conversion_rate: 100, avg_project_value: 62, avg_project_duration: 25, branch: "Bangor" },
      { name: "David McKay", total_projects: 45, total_value: 3400, completed_projects: 45, conversion_rate: 100, avg_project_value: 75, avg_project_duration: 28, branch: "Coleraine" }
    ],
    top_by_value: [
      { name: "Lindsay Murphy", total_projects: 156, total_value: 15800, completed_projects: 156, conversion_rate: 100, avg_project_value: 100, avg_project_duration: 20, branch: "Belfast" },
      { name: "Alan McKenna", total_projects: 89, total_value: 8500, completed_projects: 89, conversion_rate: 100, avg_project_value: 95, avg_project_duration: 18, branch: "Newtownabbey" },
      { name: "Donna McCartney", total_projects: 134, total_value: 12200, completed_projects: 134, conversion_rate: 100, avg_project_value: 90, avg_project_duration: 21, branch: "Lisburn" },
      { name: "Stephen Hamilton", total_projects: 67, total_value: 4200, completed_projects: 67, conversion_rate: 100, avg_project_value: 62, avg_project_duration: 25, branch: "Bangor" },
      { name: "David McKay", total_projects: 45, total_value: 3400, completed_projects: 45, conversion_rate: 100, avg_project_value: 75, avg_project_duration: 28, branch: "Coleraine" }
    ],
    top_by_conversion: [
      { name: "Lindsay Murphy", total_projects: 156, total_value: 15800, completed_projects: 156, conversion_rate: 100, avg_project_value: 100, avg_project_duration: 20, branch: "Belfast" },
      { name: "Alan McKenna", total_projects: 89, total_value: 8500, completed_projects: 89, conversion_rate: 100, avg_project_value: 95, avg_project_duration: 18, branch: "Newtownabbey" },
      { name: "Donna McCartney", total_projects: 134, total_value: 12200, completed_projects: 134, conversion_rate: 100, avg_project_value: 90, avg_project_duration: 21, branch: "Lisburn" },
      { name: "Stephen Hamilton", total_projects: 67, total_value: 4200, completed_projects: 67, conversion_rate: 100, avg_project_value: 62, avg_project_duration: 25, branch: "Bangor" },
      { name: "David McKay", total_projects: 45, total_value: 3400, completed_projects: 45, conversion_rate: 100, avg_project_value: 75, avg_project_duration: 28, branch: "Coleraine" }
    ],
    top_by_efficiency: [
      { name: "Lindsay Murphy", total_projects: 156, total_value: 15800, completed_projects: 156, conversion_rate: 100, avg_project_value: 100, avg_project_duration: 20, branch: "Belfast" },
      { name: "Alan McKenna", total_projects: 89, total_value: 8500, completed_projects: 89, conversion_rate: 100, avg_project_value: 95, avg_project_duration: 18, branch: "Newtownabbey" },
      { name: "Donna McCartney", total_projects: 134, total_value: 12200, completed_projects: 134, conversion_rate: 100, avg_project_value: 90, avg_project_duration: 21, branch: "Lisburn" },
      { name: "Stephen Hamilton", total_projects: 67, total_value: 4200, completed_projects: 67, conversion_rate: 100, avg_project_value: 62, avg_project_duration: 25, branch: "Bangor" },
      { name: "David McKay", total_projects: 45, total_value: 3400, completed_projects: 45, conversion_rate: 100, avg_project_value: 75, avg_project_duration: 28, branch: "Coleraine" }
    ],
    all_employees: [
      { name: "Lindsay Murphy", total_projects: 156, total_value: 15800, completed_projects: 156, conversion_rate: 100, avg_project_value: 100, avg_project_duration: 20, branch: "Belfast" },
      { name: "Alan McKenna", total_projects: 89, total_value: 8500, completed_projects: 89, conversion_rate: 100, avg_project_value: 95, avg_project_duration: 18, branch: "Newtownabbey" },
      { name: "Donna McCartney", total_projects: 134, total_value: 12200, completed_projects: 134, conversion_rate: 100, avg_project_value: 90, avg_project_duration: 21, branch: "Lisburn" },
      { name: "Stephen Hamilton", total_projects: 67, total_value: 4200, completed_projects: 67, conversion_rate: 100, avg_project_value: 62, avg_project_duration: 25, branch: "Bangor" },
      { name: "David McKay", total_projects: 45, total_value: 3400, completed_projects: 45, conversion_rate: 100, avg_project_value: 75, avg_project_duration: 28, branch: "Coleraine" }
    ]
  }
}; 