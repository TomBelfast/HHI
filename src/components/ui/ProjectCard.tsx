'use client';

import { Project, Customer } from '@/lib/mock-data';

interface ProjectCardProps {
  project: Project;
  customer?: Customer;
}

export function ProjectCard({ project, customer }: ProjectCardProps) {
  const getStatusColor = (status: string) => {
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

  // Branch color mapping - same as in analytics
  const getBranchColor = (branchName: string) => {
    const branchColors: Record<string, { bg: string; text: string; border: string }> = {
      'Belfast': { bg: 'bg-blue-100', text: 'text-blue-800', border: 'border-blue-200' },
      'Newtownabbey': { bg: 'bg-green-100', text: 'text-green-800', border: 'border-green-200' },
      'Lisburn': { bg: 'bg-yellow-100', text: 'text-yellow-800', border: 'border-yellow-200' },
      'Bangor': { bg: 'bg-red-100', text: 'text-red-800', border: 'border-red-200' },
      'Coleraine': { bg: 'bg-purple-100', text: 'text-purple-800', border: 'border-purple-200' }
    };
    
    return branchColors[branchName] || { bg: 'bg-gray-100', text: 'text-gray-800', border: 'border-gray-200' };
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'Bathrooms':
        return '🚿';
      case 'Kitchens':
        return '🍳';
      case 'Windows & Doors':
        return '🪟';
      case 'HD Decking':
        return '🪵';
      case 'PVC Fascia Soffit & Guttering':
        return '🏠';
      default:
        return '🔨';
    }
  };

  return (
          <div className="bg-white dark:bg-card rounded-lg border border-gray-200 dark:border-border p-4 hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <div className="flex items-center space-x-2 mb-2">
            <span className="text-lg">{getCategoryIcon(project.category)}</span>
            <h4 className="text-sm font-semibold text-gray-900 truncate">
              {project.title}
            </h4>
          </div>
          
          {customer && (
            <p className="text-xs text-gray-600 mb-2">
              Klient: {customer.name}
            </p>
          )}
          
          <p className="text-xs text-gray-500 mb-3 line-clamp-2">
            {project.description}
          </p>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${getBranchColor(project.branch).bg} ${getBranchColor(project.branch).text} ${getBranchColor(project.branch).border} border`}>
                {project.branch}
              </span>
              <span className="text-xs font-medium text-gray-900">
                £{project.value.toLocaleString()}
              </span>
            </div>
            
            <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(project.status)} border`}>
              {project.status}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
} 