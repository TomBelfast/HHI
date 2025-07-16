// src/components/dashboard/ProjectPipeline.tsx
'use client';

import { useState, useEffect } from 'react';
import { DragDropContext, Droppable, Draggable, DropResult } from '@hello-pangea/dnd';
import { Card, CardHeader, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { 
  Calendar, 
  MapPin,
  Clock
} from 'lucide-react';

interface Project {
  id: string;
  clientName: string;
  clientEmail: string;
  clientPhone?: string;
  clientAddress?: string;
  serviceType: string;
  projectValue?: number;
  currentStage: number;
  installationDate?: Date;
  branchLocation: string;
  assignedInstallerId?: string;
  contractFileName?: string;
  createdAt: Date;
  updatedAt: Date;
}

interface ProjectPipelineProps {
  projects: Project[];
  onStageChange: (projectId: string, newStage: number) => Promise<void>;
}

const STAGES = [
  { id: 1, name: 'To Measure', color: 'bg-blue-100 text-blue-800', shortName: 'Measure' },
  { id: 2, name: 'Measured', color: 'bg-yellow-100 text-yellow-800', shortName: 'Measured' },
  { id: 3, name: 'Quoted', color: 'bg-purple-100 text-purple-800', shortName: 'Quoted' },
  { id: 4, name: 'Contract', color: 'bg-orange-100 text-orange-800', shortName: 'Contract' },
  { id: 5, name: 'Ordered', color: 'bg-indigo-100 text-indigo-800', shortName: 'Ordered' },
  { id: 6, name: 'Arrived', color: 'bg-pink-100 text-pink-800', shortName: 'Arrived' },
  { id: 7, name: 'Scheduled', color: 'bg-cyan-100 text-cyan-800', shortName: 'Scheduled' },
  { id: 8, name: 'Confirmed', color: 'bg-teal-100 text-teal-800', shortName: 'Confirmed' },
  { id: 9, name: 'Reminder', color: 'bg-amber-100 text-amber-800', shortName: 'Reminder' },
  { id: 10, name: 'Invoiced', color: 'bg-lime-100 text-lime-800', shortName: 'Invoiced' },
  { id: 11, name: 'Feedback', color: 'bg-emerald-100 text-emerald-800', shortName: 'Feedback' },
  { id: 12, name: 'Complete', color: 'bg-green-100 text-green-800', shortName: 'Complete' },
];

export function ProjectPipeline({ 
  projects, 
  onStageChange
}: ProjectPipelineProps) {
  const [projectsByStage, setProjectsByStage] = useState<Record<number, Project[]>>({});

  useEffect(() => {
    const grouped = projects.reduce((acc, project) => {
      if (!acc[project.currentStage]) {
        acc[project.currentStage] = [];
      }
      acc[project.currentStage]!.push(project);
      return acc;
    }, {} as Record<number, Project[]>);

    setProjectsByStage(grouped);
  }, [projects]);

  const handleDragEnd = async (result: DropResult) => {
    const { destination, source, draggableId } = result;

    if (!destination) return;

    const sourceStage = parseInt(source.droppableId);
    const destStage = parseInt(destination.droppableId);

    if (sourceStage === destStage) return;

    try {
      await onStageChange(draggableId, destStage);
    } catch (error) {
      console.error('Failed to update stage:', error);
      alert('Failed to update project stage. Please try again.');
    }
  };

  const formatCurrency = (value?: number): string => {
    if (!value) return '';
    return `£${value.toLocaleString()}`;
  };

  const formatDate = (date?: Date): string => {
    if (!date) return '';
    return new Date(date).toLocaleDateString('en-GB', {
      day: 'numeric',
      month: 'short'
    });
  };

  return (
    <div className="w-full">
      <DragDropContext onDragEnd={handleDragEnd}>
        <div className="grid grid-cols-1 lg:grid-cols-4 xl:grid-cols-6 gap-4 overflow-x-auto pb-4">
          {STAGES.map((stage) => (
            <div key={stage.id} className="min-w-[300px]">
              <div className="mb-3 flex items-center justify-between">
                <Badge className={`${stage.color} px-3 py-1 text-sm font-medium`}>
                  {stage.shortName}
                </Badge>
                <span className="text-sm text-gray-500 font-medium">
                  {projectsByStage[stage.id]?.length || 0}
                </span>
              </div>
              
              <Droppable droppableId={stage.id.toString()}>
                {(provided, snapshot) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                    className={`min-h-[400px] p-3 rounded-lg border-2 border-dashed transition-all duration-200 ${
                      snapshot.isDraggingOver 
                        ? 'border-blue-400 bg-blue-50 shadow-md' 
                        : 'border-gray-200 bg-gray-50'
                    }`}
                  >
                    {projectsByStage[stage.id]?.map((project, index) => (
                      <Draggable 
                        key={project.id} 
                        draggableId={project.id} 
                        index={index}
                      >
                        {(provided, snapshot) => (
                          <Card
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            className={`mb-3 cursor-grab active:cursor-grabbing transition-all duration-200 hover:shadow-md ${
                              snapshot.isDragging 
                                ? 'shadow-lg rotate-2 z-50' 
                                : 'shadow-sm'
                            }`}
                          >
                            <CardHeader className="pb-2">
                              <div className="flex items-start justify-between">
                                <div className="flex items-center gap-2 flex-1 min-w-0">
                                  <Avatar className="w-8 h-8 flex-shrink-0">
                                    <AvatarFallback className="text-xs font-medium bg-blue-100 text-blue-700">
                                      {project.clientName.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2)}
                                    </AvatarFallback>
                                  </Avatar>
                                  <div className="min-w-0 flex-1">
                                    <h4 className="font-medium text-sm truncate">
                                      {project.clientName}
                                    </h4>
                                    <p className="text-xs text-gray-500 truncate">
                                      {project.clientEmail}
                                    </p>
                                  </div>
                                </div>
                              </div>
                            </CardHeader>
                            
                            <CardContent className="pt-0">
                              <div className="space-y-2">
                                <div className="flex items-center justify-between">
                                  <Badge 
                                    variant="outline" 
                                    className="text-xs"
                                  >
                                    {project.serviceType}
                                  </Badge>
                                  {project.projectValue && (
                                    <span className="text-sm font-medium text-green-700">
                                      {formatCurrency(project.projectValue)}
                                    </span>
                                  )}
                                </div>

                                {project.clientAddress && (
                                  <div className="flex items-center gap-1 text-xs text-gray-600">
                                    <MapPin className="w-3 h-3 flex-shrink-0" />
                                    <span className="truncate">{project.clientAddress}</span>
                                  </div>
                                )}
                                
                                {project.installationDate && (
                                  <div className="flex items-center gap-1 text-xs text-gray-600">
                                    <Calendar className="w-3 h-3" />
                                    <span>{formatDate(project.installationDate)}</span>
                                  </div>
                                )}
                                
                                <div className="flex items-center justify-between mt-3 pt-2 border-t border-gray-100">
                                  <Badge 
                                    variant="secondary" 
                                    className="text-xs capitalize"
                                  >
                                    {project.branchLocation}
                                  </Badge>
                                  
                                  <div className="flex items-center gap-1 text-xs text-gray-500">
                                    <Clock className="w-3 h-3" />
                                    <span>{formatDate(project.updatedAt)}</span>
                                  </div>
                                </div>
                              </div>
                            </CardContent>
                          </Card>
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                    
                    {/* Empty state */}
                    {(!projectsByStage[stage.id] || projectsByStage[stage.id]?.length === 0) && (
                      <div className="flex items-center justify-center h-32 text-gray-400">
                        <div className="text-center">
                          <div className="text-2xl mb-2">📋</div>
                          <p className="text-sm">No projects</p>
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </Droppable>
            </div>
          ))}
        </div>
      </DragDropContext>
    </div>
  );
}
