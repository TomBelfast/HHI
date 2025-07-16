// src/libs/ProjectService.ts
import { db } from '@/libs/DB';
import { projects, projectActivities } from '@/models/DashboardSchema';
import { eq, and, desc } from 'drizzle-orm';

export interface CreateProjectData {
  organizationId: string;
  clientName: string;
  clientEmail: string;
  clientPhone?: string;
  clientAddress?: string;
  serviceType: string;
  projectValue?: number;
  assignedInstallerId?: string;
  branchLocation?: string;
  contractFileName?: string;
}

export class ProjectService {
  
  async getProjectsByOrganization(organizationId: string) {
    return await db
      .select()
      .from(projects)
      .where(and(
        eq(projects.organizationId, organizationId),
        eq(projects.isActive, true)
      ))
      .orderBy(desc(projects.createdAt));
  }

  async getProjectsByInstaller(installerId: string) {
    return await db
      .select()
      .from(projects)
      .where(and(
        eq(projects.assignedInstallerId, installerId),
        eq(projects.isActive, true)
      ))
      .orderBy(desc(projects.createdAt));
  }

  async getProjectsByBranch(organizationId: string, branchLocation: string) {
    return await db
      .select()
      .from(projects)
      .where(and(
        eq(projects.organizationId, organizationId),
        eq(projects.branchLocation, branchLocation),
        eq(projects.isActive, true)
      ))
      .orderBy(desc(projects.createdAt));
  }

  async getProjectsByStage(organizationId: string, stage: number) {
    return await db
      .select()
      .from(projects)
      .where(and(
        eq(projects.organizationId, organizationId),
        eq(projects.currentStage, stage),
        eq(projects.isActive, true)
      ))
      .orderBy(desc(projects.createdAt));
  }

  async searchProjects(organizationId: string) {
    return await db
      .select()
      .from(projects)
      .where(and(
        eq(projects.organizationId, organizationId),
        eq(projects.isActive, true)
        // Note: For proper search, you'd want to use SQL LIKE or full-text search
        // This is simplified for demo
      ))
      .orderBy(desc(projects.createdAt));
  }

  async getProjectById(projectId: string) {
    const [project] = await db
      .select()
      .from(projects)
      .where(eq(projects.id, projectId));

    return project;
  }

  async createProject(data: CreateProjectData) {
    const [newProject] = await db
      .insert(projects)
      .values({
        ...data,
        projectValue: data.projectValue ? data.projectValue.toString() : null,
        currentStage: 1, // Start at "Client to Measure"
      })
      .returning();

    return newProject;
  }

  async updateProject(projectId: string, data: Partial<CreateProjectData>) {
    const [updatedProject] = await db
      .update(projects)
      .set({ 
        ...data,
        projectValue: data.projectValue ? data.projectValue.toString() : null,
        updatedAt: new Date()
      })
      .where(eq(projects.id, projectId))
      .returning();

    return updatedProject;
  }

  async updateProjectStage(
    projectId: string, 
    newStage: number, 
    userId: string,
    metadata?: any
  ) {
    // Get current project
    const [project] = await db
      .select()
      .from(projects)
      .where(eq(projects.id, projectId));

    if (!project) throw new Error('Project not found');

    const oldStage = project.currentStage;

    // Update project stage
    const [updatedProject] = await db
      .update(projects)
      .set({ 
        currentStage: newStage,
        updatedAt: new Date()
      })
      .where(eq(projects.id, projectId))
      .returning();

    // Log activity
    await db.insert(projectActivities).values({
      projectId,
      userId,
      action: 'stage_changed',
      description: `Project moved from stage ${oldStage} to stage ${newStage}`,
      fromStage: oldStage,
      toStage: newStage,
      metadata
    });

    return { 
      success: true, 
      oldStage, 
      newStage, 
      project: updatedProject 
    };
  }

  async getProjectActivities(projectId: string) {
    return await db
      .select()
      .from(projectActivities)
      .where(eq(projectActivities.projectId, projectId))
      .orderBy(desc(projectActivities.createdAt));
  }

  async findProjectByFileName(fileName: string, organizationId: string) {
    // Parse filename to extract client info
    // Expected format: "ClientName_ServiceType.pdf" or "FirstName_LastName_ServiceType.pdf"
    const nameWithoutExt = fileName.replace(/\.[^/.]+$/, "");
    const parts = nameWithoutExt.split('_');
    
    if (parts.length < 2) return null;

    let clientName: string;
    let serviceType: string;

    if (parts.length === 3) {
      // Format: FirstName_LastName_ServiceType
      clientName = `${parts[0] || ''} ${parts[1] || ''}`;
      serviceType = parts[2] || '';
    } else {
      // Format: ClientName_ServiceType (assuming single name)
      clientName = parts[0] || '';
      serviceType = parts[1] || '';
    }

    // Search for project with matching client name and service type
    const allProjects = await this.getProjectsByOrganization(organizationId);
    
    return allProjects.find(project => 
      project.clientName.toLowerCase().replace(/\s+/g, '_') === clientName.toLowerCase() &&
      project.serviceType.toLowerCase() === serviceType.toLowerCase()
    );
  }

  async calculateKPIs(organizationId: string) {
    const allProjects = await this.getProjectsByOrganization(organizationId);
    const now = new Date();
    const weekStart = new Date(now.setDate(now.getDate() - now.getDay()));
    const weekEnd = new Date(weekStart.getTime() + 6 * 24 * 60 * 60 * 1000);
    const monthStart = new Date(now.getFullYear(), now.getMonth(), 1);

    return {
      activeProjects: allProjects.filter(p => (p.currentStage || 0) < 12).length,
      weeklyInstallations: allProjects.filter(p => {
        if (!p.installationDate) return false;
        const installDate = new Date(p.installationDate);
        return installDate >= weekStart && installDate <= weekEnd;
      }).length,
      pendingMeasurements: allProjects.filter(p => (p.currentStage || 0) === 1).length,
      overdueActions: await this.calculateOverdueProjects(allProjects),
      monthlyRevenue: allProjects
        .filter(p => {
          if ((p.currentStage || 0) < 10 || !p.completionDate) return false;
          const completionDate = new Date(p.completionDate);
          return completionDate >= monthStart;
        })
        .reduce((sum, p) => sum + Number(p.projectValue || 0), 0),
      completionRate: allProjects.length > 0 
        ? Math.round((allProjects.filter(p => (p.currentStage || 0) === 12).length / allProjects.length) * 100)
        : 0,
    };
  }

  private async calculateOverdueProjects(projects: any[]): Promise<number> {
    const now = new Date();
    let overdueCount = 0;

    for (const project of projects) {
      const daysSinceUpdate = Math.floor(
        (now.getTime() - new Date(project.updatedAt).getTime()) / (1000 * 60 * 60 * 24)
      );

      // Define overdue logic based on stage
      const overdueThresholds: Record<number, number> = {
        1: 7,  // Measurement should be scheduled within a week
        2: 3,  // Quote should be prepared within 3 days
        3: 5,  // Quote should be approved within 5 days
        4: 7,  // Contract should be signed within a week
        5: 2,  // Materials should be ordered within 2 days
        6: 1,  // Installation should be scheduled within 1 day of material arrival
        7: 2,  // Client should confirm within 2 days
        8: 0,  // Reminder is automatic
        9: 0,  // Invoice is automatic
        10: 7, // Feedback should be collected within a week
        11: 3, // Project should be completed within 3 days of feedback
      };

      const threshold = overdueThresholds[project.currentStage];
      if (threshold && daysSinceUpdate > threshold) {
        overdueCount++;
      }
    }

    return overdueCount;
  }
}
