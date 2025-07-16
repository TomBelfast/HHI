'use client';

import { Project, Customer } from '@/lib/mock-data';

interface ProjectCardProps {
  project: Project;
  customer?: Customer;
}

export function ProjectCard({ project, customer }: ProjectCardProps) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Installation Completed':
      case 'Repair Completed':
        return 'bg-green-100 text-green-800';
      case 'Quote Sent':
        return 'bg-yellow-100 text-yellow-800';
      case 'Materials Received':
        return 'bg-blue-100 text-blue-800';
      case 'Installation Scheduled':
        return 'bg-purple-100 text-purple-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
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
              <span className="text-xs text-gray-500">
                {project.branch}
              </span>
              <span className="text-xs font-medium text-gray-900">
                £{project.value.toLocaleString()}
              </span>
            </div>
            
            <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(project.status)}`}>
              {project.status}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
} 