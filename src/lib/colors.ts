// Centralne funkcje kolorów dla całej aplikacji HHI
// Zapewniają spójność kolorów tagów w całej aplikacji

// Branch color mapping - spójne w całej aplikacji
export const getBranchColor = (branchName: string) => {
  const branchColors: Record<string, string> = {
    'Belfast': 'bg-blue-100 text-blue-800 border-blue-200',
    'Newtownabbey': 'bg-green-100 text-green-800 border-green-200',
    'Lisburn': 'bg-yellow-100 text-yellow-800 border-yellow-200',
    'Bangor': 'bg-red-100 text-red-800 border-red-200',
    'Coleraine': 'bg-purple-100 text-purple-800 border-purple-200'
  };
  
  return branchColors[branchName] || 'bg-gray-100 text-gray-800 border-gray-200';
};

// Project status color mapping - spójne w całej aplikacji
export const getProjectStatusColor = (status: string) => {
  switch (status) {
    case 'Quote Sent':
      return 'bg-yellow-100 text-yellow-800 border-yellow-200';
    case 'Approved':
      return 'bg-blue-100 text-blue-800 border-blue-200';
    case 'In Progress':
      return 'bg-orange-100 text-orange-800 border-orange-200';
    case 'Installation Completed':
      return 'bg-green-100 text-green-800 border-green-200';
    case 'Materials Received':
      return 'bg-purple-100 text-purple-800 border-purple-200';
    case 'Installation Scheduled':
      return 'bg-indigo-100 text-indigo-800 border-indigo-200';
    case 'Repair Completed':
      return 'bg-green-100 text-green-800 border-green-200';
    case 'Invoice Sent':
      return 'bg-cyan-100 text-cyan-800 border-cyan-200';
    case 'Awaiting Payment':
      return 'bg-amber-100 text-amber-800 border-amber-200';
    case 'Paid':
      return 'bg-emerald-100 text-emerald-800 border-emerald-200';
    case 'Awaiting Review':
      return 'bg-rose-100 text-rose-800 border-rose-200';
    default:
      return 'bg-gray-100 text-gray-800 border-gray-200';
  }
};

// User status color mapping - spójne w całej aplikacji
export const getUserStatusColor = (status: string) => {
  switch (status.toLowerCase()) {
    case 'active':
      return 'bg-green-100 text-green-800 border-green-200';
    case 'inactive':
      return 'bg-red-100 text-red-800 border-red-200';
    case 'suspended':
      return 'bg-gray-100 text-gray-800 border-gray-200';
    default:
      return 'bg-gray-100 text-gray-800 border-gray-200';
  }
};

// Customer status color mapping - spójne w całej aplikacji
export const getCustomerStatusColor = (status: string) => {
  switch (status.toLowerCase()) {
    case 'active':
      return 'bg-green-100 text-green-800 border-green-200';
    case 'inactive':
      return 'bg-red-100 text-red-800 border-red-200';
    case 'not accepted':
      return 'bg-red-100 text-red-800 border-red-200';
    case 'prospect':
      return 'bg-yellow-100 text-yellow-800 border-yellow-200';
    case 'suspended':
      return 'bg-gray-100 text-gray-800 border-gray-200';
    case 'completed':
      return 'bg-blue-100 text-blue-800 border-blue-200';
    default:
      return 'bg-gray-100 text-gray-800 border-gray-200';
  }
};

// User role color mapping - spójne w całej aplikacji
export const getRoleColor = (role: string) => {
  switch (role) {
    case 'System Administrator':
      return 'bg-red-100 text-red-800 border-red-200';
    case 'Branch Manager':
      return 'bg-blue-100 text-blue-800 border-blue-200';
    case 'Branch Worker':
      return 'bg-green-100 text-green-800 border-green-200';
    case 'Subcontractor':
      return 'bg-purple-100 text-purple-800 border-purple-200';
    default:
      return 'bg-gray-100 text-gray-800 border-gray-200';
  }
};

// Department color mapping - spójne w całej aplikacji
export const getDepartmentColor = (department: string) => {
  switch (department) {
    case 'Bathrooms Department':
      return 'bg-blue-100 text-blue-800 border-blue-200';
    case 'Kitchens Department':
      return 'bg-green-100 text-green-800 border-green-200';
    case 'Composite Doors Department':
      return 'bg-yellow-100 text-yellow-800 border-yellow-200';
    case 'PVC Windows & Doors Department':
      return 'bg-purple-100 text-purple-800 border-purple-200';
    case 'PVC Cover Sills Department':
      return 'bg-pink-100 text-pink-800 border-pink-200';
    case 'PVC Fascia Soffit & Guttering Department':
      return 'bg-indigo-100 text-indigo-800 border-indigo-200';
    case 'HD Decking Department':
      return 'bg-red-100 text-red-800 border-red-200';
    default:
      return 'bg-gray-100 text-gray-800 border-gray-200';
  }
};

// Communication type color mapping - spójne w całej aplikacji
export const getCommunicationTypeColor = (type: string) => {
  switch (type.toLowerCase()) {
    case 'email':
      return 'bg-blue-100 text-blue-800 border-blue-200';
    case 'phone':
      return 'bg-green-100 text-green-800 border-green-200';
    case 'sms':
      return 'bg-purple-100 text-purple-800 border-purple-200';
    case 'meeting':
      return 'bg-orange-100 text-orange-800 border-orange-200';
    case 'site visit':
      return 'bg-indigo-100 text-indigo-800 border-indigo-200';
    case 'quote':
      return 'bg-yellow-100 text-yellow-800 border-yellow-200';
    case 'invoice':
      return 'bg-red-100 text-red-800 border-red-200';
    case 'follow-up':
      return 'bg-cyan-100 text-cyan-800 border-cyan-200';
    default:
      return 'bg-gray-100 text-gray-800 border-gray-200';
  }
};

// Branch colors for charts (HEX format) - spójne z Tailwind kolorami
export const getBranchChartColor = (branchName: string) => {
  const branchChartColors: Record<string, string> = {
    'Belfast': '#3B82F6',      // Blue
    'Newtownabbey': '#10B981', // Green
    'Lisburn': '#F59E0B',      // Yellow/Orange
    'Bangor': '#EF4444',       // Red
    'Coleraine': '#8B5CF6',    // Purple
    'Other': '#6B7280'         // Gray
  };
  
  return branchChartColors[branchName] || branchChartColors['Other'];
}; 