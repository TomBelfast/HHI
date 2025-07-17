'use client';

import { Project, Customer } from '@/lib/mock-data';
import { getBranchColor, getProjectStatusColor } from '@/lib/colors';

interface ProjectCardProps {
  project: Project;
  customer?: Customer;
}

export function ProjectCard({ project, customer }: ProjectCardProps) {

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
            
            <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getProjectStatusColor(project.status)} border`}>
              {project.status}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
} 