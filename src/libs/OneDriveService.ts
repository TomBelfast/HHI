// src/libs/OneDriveService.ts
import { Client } from '@microsoft/microsoft-graph-client';
import { AuthenticationProvider } from '@microsoft/microsoft-graph-client';

export interface OneDriveFile {
  id: string;
  name: string;
  size: number;
  webUrl: string;
  parentReference: {
    id: string;
    name: string;
    path: string;
  };
  lastModifiedDateTime: string;
  createdDateTime: string;
}

export class OneDriveService {
  private graphClient: Client;
  
  constructor(accessToken: string) {
    const authProvider: AuthenticationProvider = {
      getAccessToken: async () => accessToken
    };
    
    this.graphClient = Client.initWithMiddleware({ authProvider });
  }

  async setupFolderWatcher(driveId: string, rootFolderId: string): Promise<any> {
    try {
      const subscription = await this.graphClient
        .api('/subscriptions')
        .post({
          changeType: 'updated',
          notificationUrl: `${process.env.WEBHOOK_URL}`,
          resource: `/drives/${driveId}/items/${rootFolderId}`,
          expirationDateTime: new Date(Date.now() + 4230 * 60 * 1000).toISOString(), // 3 days
          clientState: 'hhi-dashboard-webhook'
        });

      return subscription;
    } catch (error) {
      console.error('Error setting up folder watcher:', error);
      throw error;
    }
  }

  async getFolderContents(driveId: string, folderId: string): Promise<OneDriveFile[]> {
    try {
      const response = await this.graphClient
        .api(`/drives/${driveId}/items/${folderId}/children`)
        .get();

      return response.value.map((item: any) => ({
        id: item.id,
        name: item.name,
        size: item.size || 0,
        webUrl: item.webUrl,
        parentReference: item.parentReference,
        lastModifiedDateTime: item.lastModifiedDateTime,
        createdDateTime: item.createdDateTime,
      }));
    } catch (error) {
      console.error('Error getting folder contents:', error);
      throw error;
    }
  }

  async getFileDetails(driveId: string, fileId: string): Promise<OneDriveFile> {
    try {
      const file = await this.graphClient
        .api(`/drives/${driveId}/items/${fileId}`)
        .get();

      return {
        id: file.id,
        name: file.name,
        size: file.size || 0,
        webUrl: file.webUrl,
        parentReference: file.parentReference,
        lastModifiedDateTime: file.lastModifiedDateTime,
        createdDateTime: file.createdDateTime,
      };
    } catch (error) {
      console.error('Error getting file details:', error);
      throw error;
    }
  }

  // Helper method to extract project info from filename
  parseFileName(fileName: string): { clientName: string; serviceType: string } | null {
    // Expected format: "ClientName_ServiceType.pdf" or "FirstName_LastName_ServiceType.pdf"
    // Example: "Sarah_Johnson_Kitchen.pdf" or "David_Wilson_Bathroom.pdf"
    const nameWithoutExt = fileName.replace(/\.[^/.]+$/, "");
    const parts = nameWithoutExt.split('_');
    
    if (parts.length >= 3) {
      return {
        clientName: `${parts[0] || 'unknown'} ${parts[1] || ''}`,
        serviceType: parts[2]?.toLowerCase() || 'unknown'
      };
    } else if (parts.length === 2) {
      return {
        clientName: parts[0] || 'unknown',
        serviceType: parts[1]?.toLowerCase() || 'unknown'
      };
    }
    
    return null;
  }

  // Map folder names to stage numbers
  getStageFromFolderName(folderName: string): number | null {
    const stageMap: Record<string, number> = {
      '01_Client_to_Measure': 1,
      '02_Measurement_Complete': 2,
      '03_Quote_Complete': 3,
      '04_Contract_for_Approval': 4,
      '05_Material_Ordered': 5,
      '06_Material_Arrived': 6,
      '07_Installation_Scheduled': 7,
      '08_Client_Confirmed_Date': 8,
      '09_Pre_Installation_Reminder': 9,
      '10_Invoice_Sent': 10,
      '11_Feedback_Requested': 11,
      '12_Project_Complete': 12
    };

    return stageMap[folderName] || null;
  }

  // Extract resource identifiers from webhook notification
  static extractResourceInfo(resource: string): { driveId: string; fileId: string } | null {
    // Resource format: /drives/{drive-id}/items/{item-id}
    const match = resource.match(/\/drives\/([^\/]+)\/items\/([^\/]+)/);
    
    if (match) {
      return {
        driveId: match[1] || '',
        fileId: match[2] || ''
      };
    }

    return null;
  }

  // Validate webhook notification
  static validateWebhook(notification: any): boolean {
    return (
      notification.changeType &&
      notification.resource &&
      notification.clientState === 'hhi-dashboard-webhook'
    );
  }
}
