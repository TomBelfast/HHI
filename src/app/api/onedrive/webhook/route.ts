// src/app/api/onedrive/webhook/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { OneDriveService } from '@/libs/OneDriveService';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Handle Microsoft Graph validation
    if (body.validationToken) {
      console.log('Webhook validation received');
      return new Response(body.validationToken, { 
        status: 200,
        headers: { 'Content-Type': 'text/plain' }
      });
    }

    // Process webhook notifications
    const notifications = body.value || [];
    console.log(`Processing ${notifications.length} webhook notifications`);
    
    for (const notification of notifications) {
      await handleFileMovement(notification);
    }

    return NextResponse.json({ success: true, processed: notifications.length });

  } catch (error) {
    console.error('Webhook error:', error);
    return NextResponse.json(
      { error: 'Webhook processing failed', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}

export async function GET() {
  // Health check endpoint
  return NextResponse.json({ 
    status: 'active', 
    timestamp: new Date().toISOString(),
    webhook: 'onedrive-file-movement'
  });
}

async function handleFileMovement(notification: any) {
  try {
    console.log('Processing notification:', notification);
    
    const { resource, changeType } = notification;
    
    // Validate webhook
    if (!OneDriveService.validateWebhook(notification)) {
      console.log('Invalid webhook notification, skipping');
      return;
    }
    
    if (changeType !== 'updated') {
      console.log(`Ignoring change type: ${changeType}`);
      return;
    }

    // Extract resource information
    const resourceInfo = OneDriveService.extractResourceInfo(resource);
    if (!resourceInfo) {
      console.log('Could not extract resource info from:', resource);
      return;
    }

    // For demo purposes, we'll simulate the file movement handling
    console.log('File movement detected:', resourceInfo);
    
    // In a real implementation, you would:
    // 1. Get access token for the organization
    // 2. Use OneDriveService to get file details
    // 3. Determine which project this file belongs to
    // 4. Update project stage
    // 5. Send notification email

  } catch (error) {
    console.error('Error handling file movement:', error);
  }
}
