// src/libs/EmailService.ts
import { Resend } from 'resend';
import { db } from '@/libs/DB';
import { notifications, projects } from '@/models/DashboardSchema';
import { eq } from 'drizzle-orm';

export interface EmailVariables {
  CLIENT_NAME: string;
  SERVICE_TYPE: string;
  PROJECT_ID: string;
  CLIENT_ADDRESS?: string;
  INSTALLATION_DATE?: string;
  INSTALLATION_TIME?: string;
  INSTALLER_NAME?: string;
  INSTALLER_PHONE?: string;
  PROJECT_VALUE?: string;
  BRANCH_LOCATION?: string;
  [key: string]: string | undefined;
}

export interface SendEmailResult {
  success: boolean;
  messageId?: string;
  error?: string;
  notificationId?: string;
}

export class EmailService {
  private resend: Resend;

  constructor() {
    this.resend = new Resend(process.env.RESEND_API_KEY);
  }

  async sendProjectNotification(
    projectId: string,
    stageId: number
  ): Promise<SendEmailResult> {
    try {
      // Get project details
      const [project] = await db
        .select()
        .from(projects)
        .where(eq(projects.id, projectId));

      if (!project) {
        throw new Error('Project not found');
      }
      
      // Mock implementation - send email using resend
      const emailResult = await this.resend.emails.send({
        from: 'noreply@company.com',
        to: [project.clientEmail],
        subject: `Project Update - Stage ${stageId}`,
        html: `<p>Dear ${project.clientName},</p><p>Your project has been updated to stage ${stageId}.</p>`
      });
      
      return {
        success: true,
        messageId: emailResult.data?.id || 'mock-id'
      };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error'
      };
    }
  }


  async getNotificationHistory(projectId: string) {
    return await db
      .select()
      .from(notifications)
      .where(eq(notifications.projectId, projectId))
      .orderBy(notifications.sentAt);
  }
}
