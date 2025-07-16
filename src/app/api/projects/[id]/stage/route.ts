// src/app/api/projects/[id]/stage/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { ProjectService } from '@/libs/ProjectService';
import { EmailService } from '@/libs/EmailService';

export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    // For demo purposes - skip auth
    const userId = 'demo-user';

    const { newStage, metadata, sendNotification = true } = await request.json();
    
    if (!newStage || newStage < 1 || newStage > 12) {
      return NextResponse.json(
        { error: 'Invalid stage number. Must be between 1 and 12.' },
        { status: 400 }
      );
    }

    const projectService = new ProjectService();
    
    // Check if project exists
    const project = await projectService.getProjectById(params.id);
    if (!project) {
      return NextResponse.json(
        { error: 'Project not found' },
        { status: 404 }
      );
    }

    // Update project stage
    const result = await projectService.updateProjectStage(
      params.id,
      newStage,
      userId,
      {
        ...metadata,
        updatedBy: userId,
        updatedAt: new Date().toISOString(),
        method: 'manual_update'
      }
    );

    // Send notification email if requested
    let emailResult = null;
    if (sendNotification) {
      const emailService = new EmailService();
      emailResult = await emailService.sendProjectNotification(params.id, newStage);
    }

    return NextResponse.json({
      success: true,
      project: result.project,
      stageChange: {
        from: result.oldStage,
        to: result.newStage
      },
      email: emailResult ? {
        sent: emailResult.success,
        messageId: emailResult.messageId,
        error: emailResult.error
      } : null
    });

  } catch (error) {
    console.error('Error updating project stage:', error);
    return NextResponse.json(
      { error: 'Failed to update project stage', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}
