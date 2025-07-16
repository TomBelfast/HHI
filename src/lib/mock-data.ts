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
}

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
    rating: 4.8
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
    rating: 4.6
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
    rating: 4.9
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
    rating: 4.7
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
    rating: 4.4
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
    rating: 4.5
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
    rating: 4.8
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
    rating: 4.6
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
    rating: 4.3
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
    rating: 4.7
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
      {"date": "2024-11-20", "status": "Contact Received", "note": "Customer called about bathroom renovation"},
      {"date": "2024-11-22", "status": "Measurement Completed", "note": "Site survey completed by surveyor"},
      {"date": "2024-11-25", "status": "Quote Sent", "note": "Detailed quote emailed to customer"},
      {"date": "2024-11-28", "status": "Contract Signed", "note": "Contract signed digitally"},
      {"date": "2024-12-15", "status": "Installation Started", "note": "Premier Bathroom Solutions began work"},
      {"date": "2024-12-18", "status": "Installation Completed", "note": "Work completed, photos uploaded"}
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
      {"date": "2024-12-01", "status": "Contact Received", "note": "Customer enquiry via website"},
      {"date": "2024-12-03", "status": "Measurement Completed", "note": "Kitchen measured and designed"},
      {"date": "2024-12-06", "status": "Quote Sent", "note": "Comprehensive quote sent - awaiting response"}
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
    permissions: ["all"]
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
    projectsCompleted: 156
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
    projectsCompleted: 89
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
    averageTime: "3.2 days"
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
    averageTime: "1.8 days"
  }
];

// Mock Analytics (from PRD)
export const mockAnalytics: Analytics = {
  companyOverview: {
    totalProjects: 127,
    activeProjects: 45,
    completedThisMonth: 23,
    monthlyRevenue: 245000,
    conversionRate: 28.5,
    averageProjectValue: 8750
  },
  branchPerformance: [
    {
      branch: "Belfast",
      projects: 45,
      revenue: 128000,
      conversion: 31.2,
      averageResponseTime: "1.2h",
      customerSatisfaction: 4.6
    },
    {
      branch: "Newtownabbey", 
      projects: 28,
      revenue: 52000,
      conversion: 27.8,
      averageResponseTime: "1.8h",
      customerSatisfaction: 4.4
    },
    {
      branch: "Lisburn",
      projects: 24,
      revenue: 48000, 
      conversion: 29.1,
      averageResponseTime: "1.5h",
      customerSatisfaction: 4.5
    },
    {
      branch: "Bangor",
      projects: 18,
      revenue: 34000,
      conversion: 25.4,
      averageResponseTime: "2.1h", 
      customerSatisfaction: 4.3
    },
    {
      branch: "Coleraine",
      projects: 12,
      revenue: 22000,
      conversion: 26.7,
      averageResponseTime: "1.9h",
      customerSatisfaction: 4.2
    }
  ],
  categoryBreakdown: [
    {category: "Bathrooms", projects: 67, percentage: 35, avgValue: 8500},
    {category: "Kitchens", projects: 43, percentage: 28, avgValue: 12200},
    {category: "Windows & Doors", projects: 28, percentage: 22, avgValue: 5800},
    {category: "HD Decking", projects: 18, percentage: 10, avgValue: 4200},
    {category: "PVC Fascia Soffit & Guttering", projects: 8, percentage: 5, avgValue: 3400}
  ]
}; 