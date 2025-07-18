// Microsoft OneDrive/SharePoint Service
// Integracja z Microsoft Graph API dla zarządzania dokumentami

export interface Document {
  id: string;
  oneDriveId: string;
  name: string;
  type: DocumentType;
  projectId?: string;
  customerId?: string;
  department?: Department;
  currentFolder: string;
  previousFolder?: string;
  createdBy: string;
  createdAt: Date;
  lastModified: Date;
  size: number;
  mimeType: string;
  permissions: Permission[];
  status: 'active' | 'archived' | 'deleted';
  tags: string[];
  metadata: DocumentMetadata;
}

export interface Permission {
  userId: string;
  role: 'owner' | 'write' | 'read';
  email: string;
}

export interface DocumentMetadata {
  version: string;
  description?: string;
  customFields?: Record<string, any>;
}

export interface DocumentFilters {
  type?: DocumentType;
  customerId?: string;
  projectId?: string;
  department?: Department;
  dateFrom?: Date;
  dateTo?: Date;
  tags?: string[];
}

export interface ClientAssignment {
  documentId: string;
  customerId: string;
  projectId?: string;
  confidence: number;
  assignedBy: 'auto' | 'manual';
  assignedAt: Date;
}

export interface DocumentVersion {
  version: string;
  modifiedBy: string;
  modifiedAt: Date;
  size: number;
  changeDescription?: string;
}

export interface CalendarEvent {
  id?: string;
  subject: string;
  start: Date;
  end: Date;
  location?: string;
  attendees: string[];
  description?: string;
  isOnlineMeeting?: boolean;
  onlineMeetingUrl?: string;
}

export interface TimeSlot {
  start: Date;
  end: Date;
  available: boolean;
  bufferBefore?: number;
  bufferAfter?: number;
}

export enum DocumentType {
  // Etap 1: Inicjalny kontakt
  INITIAL_CONTACT = 'initial_contact',
  CUSTOMER_INFORMATION = 'customer_information',
  
  // Etap 2: Kwalifikacja i wycena
  QUOTATION = 'quotation',
  CONTRACT = 'contract',
  SPECIFICATIONS = 'specifications',
  
  // Etap 3: Planowanie
  PROJECT_PLAN = 'project_plan',
  SCHEDULE = 'schedule',
  TEAM_ASSIGNMENT = 'team_assignment',
  
  // Etap 4: Wizyta pomiarowa
  MEASUREMENT_REPORT = 'measurement_report',
  PHOTOS = 'photos',
  TECHNICAL_DRAWINGS = 'technical_drawings',
  
  // Etap 5: Produkcja i montaż
  MATERIAL_ORDER = 'material_order',
  PRODUCTION_SCHEDULE = 'production_schedule',
  INSTALLATION_REPORT = 'installation_report',
  
  // Etap 6: Finalizacja
  COMPLETION_CERTIFICATE = 'completion_certificate',
  INVOICE = 'invoice',
  WARRANTY_DOCUMENT = 'warranty_document'
}

export enum Department {
  KITCHENS = 'kitchens',
  BATHROOMS = 'bathrooms',
  BEDROOMS = 'bedrooms',
  LIVING_ROOMS = 'living_rooms',
  OFFICE = 'office',
  GENERAL = 'general'
}

class MicrosoftDriveService {
  private accessToken: string | null = null;
  private baseUrl = 'https://graph.microsoft.com/v1.0';

  // Mock data dla demonstracji
  private mockDocuments: Document[] = [
    {
      id: '1',
      oneDriveId: 'mock-onedrive-id-1',
      name: 'Contract_Belfast_Construction_2024.pdf',
      type: DocumentType.CONTRACT,
      projectId: 'PROJ-001',
      customerId: 'CUST-001',
      department: Department.KITCHENS,
      currentFolder: 'Active Projects/CUST-001',
      createdBy: 'john.doe@hhi.com',
      createdAt: new Date('2024-01-15'),
      lastModified: new Date('2024-01-20'),
      size: 2048576,
      mimeType: 'application/pdf',
      permissions: [
        { userId: '1', role: 'owner', email: 'john.doe@hhi.com' },
        { userId: '2', role: 'write', email: 'jane.smith@hhi.com' }
      ],
      status: 'active',
      tags: ['contract', 'kitchen', 'belfast'],
      metadata: {
        version: '1.0',
        description: 'Kitchen renovation contract for Belfast Construction Ltd',
        customFields: {
          contractValue: 25000,
          startDate: '2024-02-01',
          completionDate: '2024-04-30'
        }
      }
    },
    {
      id: '2',
      oneDriveId: 'mock-onedrive-id-2',
      name: 'Invoice_CUST-001_2024_001.pdf',
      type: DocumentType.INVOICE,
      projectId: 'PROJ-001',
      customerId: 'CUST-001',
      department: Department.KITCHENS,
      currentFolder: 'Completed/CUST-001',
      createdBy: 'finance@hhi.com',
      createdAt: new Date('2024-01-25'),
      lastModified: new Date('2024-01-25'),
      size: 512000,
      mimeType: 'application/pdf',
      permissions: [
        { userId: '3', role: 'owner', email: 'finance@hhi.com' }
      ],
      status: 'active',
      tags: ['invoice', 'completed'],
      metadata: {
        version: '1.0',
        description: 'Final invoice for kitchen renovation project',
        customFields: {
          invoiceNumber: 'INV-2024-001',
          amount: 25000,
          dueDate: '2024-02-25'
        }
      }
    },
    {
      id: '3',
      oneDriveId: 'mock-onedrive-id-3',
      name: 'Measurement_Report_Derry_Manufacturing.pdf',
      type: DocumentType.MEASUREMENT_REPORT,
      projectId: 'PROJ-002',
      customerId: 'CUST-002',
      department: Department.BATHROOMS,
      currentFolder: 'Measurements/CUST-002',
      createdBy: 'mike.measure@hhi.com',
      createdAt: new Date('2024-01-30'),
      lastModified: new Date('2024-01-30'),
      size: 1536000,
      mimeType: 'application/pdf',
      permissions: [
        { userId: '4', role: 'owner', email: 'mike.measure@hhi.com' },
        { userId: '5', role: 'write', email: 'design@hhi.com' }
      ],
      status: 'active',
      tags: ['measurement', 'bathroom', 'derry'],
      metadata: {
        version: '1.0',
        description: 'Detailed measurement report for bathroom renovation',
        customFields: {
          roomDimensions: '3.2m x 2.8m',
          ceilingHeight: '2.4m',
          windowCount: 1
        }
      }
    }
  ];

  // Autoryzacja z Microsoft Graph API
  async authenticate(clientId: string, clientSecret: string, tenantId: string): Promise<void> {
    try {
      // W rzeczywistej implementacji: token exchange z Microsoft
      const response = await fetch(`https://login.microsoftonline.com/${tenantId}/oauth2/v2.0/token`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams({
          client_id: clientId,
          client_secret: clientSecret,
          scope: 'https://graph.microsoft.com/.default',
          grant_type: 'client_credentials',
        }),
      });

      if (response.ok) {
        const data = await response.json();
        this.accessToken = data.access_token;
      } else {
        console.error('Microsoft authentication failed');
        // Fallback do mock token dla demonstracji
        this.accessToken = 'mock-access-token';
      }
    } catch (error) {
      console.error('Microsoft authentication error:', error);
      // Fallback do mock token dla demonstracji
      this.accessToken = 'mock-access-token';
    }
  }

  // Tworzenie folderu klienta
  async createClientFolder(clientId: string, clientName: string): Promise<string> {
    try {
      // W rzeczywistej implementacji: Microsoft Graph API call
      const folderName = `${clientId}_${clientName.replace(/\s+/g, '_')}`;
      const response = await fetch(`${this.baseUrl}/me/drive/root:/HHI_Client_Documents/${folderName}:/children`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${this.accessToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: folderName,
          folder: {},
          '@microsoft.graph.conflictBehavior': 'rename'
        }),
      });

      if (response.ok) {
        const data = await response.json();
        return data.id;
      } else {
        console.error('Failed to create client folder');
        return `mock-folder-id-${clientId}`;
      }
    } catch (error) {
      console.error('Error creating client folder:', error);
      return `mock-folder-id-${clientId}`;
    }
  }

  // Przenoszenie dokumentu
  async moveDocument(documentId: string, targetFolderId: string): Promise<void> {
    try {
      // W rzeczywistej implementacji: Microsoft Graph API call
      const response = await fetch(`${this.baseUrl}/me/drive/items/${documentId}/move`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${this.accessToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          parentReference: {
            id: targetFolderId
          }
        }),
      });

      if (!response.ok) {
        console.error('Failed to move document');
      }
    } catch (error) {
      console.error('Error moving document:', error);
    }
  }

  // Usuwanie dokumentu
  async deleteDocument(documentId: string): Promise<void> {
    try {
      // W rzeczywistej implementacji: Microsoft Graph API call
      const response = await fetch(`${this.baseUrl}/me/drive/items/${documentId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${this.accessToken}`,
        },
      });

      if (!response.ok) {
        console.error('Failed to delete document');
      }
    } catch (error) {
      console.error('Error deleting document:', error);
    }
  }

  // Wyszukiwanie dokumentów
  async searchDocuments(query: string, filters: DocumentFilters): Promise<Document[]> {
    try {
      // W rzeczywistej implementacji: Microsoft Graph API search
      let searchQuery = `"${query}"`;
      
      if (filters.type) {
        searchQuery += ` AND fileType:${filters.type}`;
      }
      
      const response = await fetch(`${this.baseUrl}/me/drive/search(q='${encodeURIComponent(searchQuery)}')`, {
        headers: {
          'Authorization': `Bearer ${this.accessToken}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        return this.transformMicrosoftItems(data.value);
      } else {
        console.error('Failed to search documents');
        return this.filterMockDocuments(query, filters);
      }
    } catch (error) {
      console.error('Error searching documents:', error);
      return this.filterMockDocuments(query, filters);
    }
  }

  // Pobieranie dokumentów klienta
  async getDocumentsByClient(clientId: string): Promise<Document[]> {
    try {
      // W rzeczywistej implementacji: Microsoft Graph API call
      const response = await fetch(`${this.baseUrl}/me/drive/root:/HHI_Client_Documents/${clientId}:/children`, {
        headers: {
          'Authorization': `Bearer ${this.accessToken}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        return this.transformMicrosoftItems(data.value);
      } else {
        console.error('Failed to get client documents');
        return this.mockDocuments.filter(doc => doc.customerId === clientId);
      }
    } catch (error) {
      console.error('Error getting client documents:', error);
      return this.mockDocuments.filter(doc => doc.customerId === clientId);
    }
  }

  // Pobieranie dokumentów według typu
  async getDocumentsByType(type: DocumentType): Promise<Document[]> {
    try {
      // W rzeczywistej implementacji: Microsoft Graph API call
      const response = await fetch(`${this.baseUrl}/me/drive/search(q='fileType:${type}')`, {
        headers: {
          'Authorization': `Bearer ${this.accessToken}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        return this.transformMicrosoftItems(data.value);
      } else {
        console.error('Failed to get documents by type');
        return this.mockDocuments.filter(doc => doc.type === type);
      }
    } catch (error) {
      console.error('Error getting documents by type:', error);
      return this.mockDocuments.filter(doc => doc.type === type);
    }
  }

  // Automatyczne przypisanie dokumentu
  async autoAssignDocument(documentId: string): Promise<ClientAssignment> {
    try {
      // W rzeczywistej implementacji: AI/ML analysis
      const document = this.mockDocuments.find(doc => doc.id === documentId);
      
      if (document) {
        // Analiza nazwy pliku i treści dla automatycznego przypisania
        const customerMatch = document.name.match(/CUST-(\d+)/);
        const customerId = customerMatch ? `CUST-${customerMatch[1]}` : null;
        
        return {
          documentId,
          customerId: customerId || 'unknown',
          projectId: document.projectId,
          confidence: customerId ? 0.9 : 0.3,
          assignedBy: 'auto',
          assignedAt: new Date()
        };
      }
      
      return {
        documentId,
        customerId: 'unknown',
        confidence: 0.1,
        assignedBy: 'auto',
        assignedAt: new Date()
      };
    } catch (error) {
      console.error('Error auto-assigning document:', error);
      return {
        documentId,
        customerId: 'unknown',
        confidence: 0.0,
        assignedBy: 'auto',
        assignedAt: new Date()
      };
    }
  }

  // Wykrywanie typu dokumentu
  detectDocumentType(fileName: string, content?: string): DocumentType {
    const lowerFileName = fileName.toLowerCase();
    
    if (lowerFileName.includes('contract') || lowerFileName.includes('umowa')) {
      return DocumentType.CONTRACT;
    } else if (lowerFileName.includes('invoice') || lowerFileName.includes('faktura')) {
      return DocumentType.INVOICE;
    } else if (lowerFileName.includes('quotation') || lowerFileName.includes('wycena')) {
      return DocumentType.QUOTATION;
    } else if (lowerFileName.includes('measurement') || lowerFileName.includes('pomiar')) {
      return DocumentType.MEASUREMENT_REPORT;
    } else if (lowerFileName.includes('proposal') || lowerFileName.includes('oferta')) {
      return DocumentType.SPECIFICATIONS;
    }
    
    return DocumentType.CUSTOMER_INFORMATION;
  }

  // Synchronizacja metadanych
  async syncDocumentMetadata(documentId: string, metadata: DocumentMetadata): Promise<void> {
    try {
      // W rzeczywistej implementacji: Microsoft Graph API call
      const response = await fetch(`${this.baseUrl}/me/drive/items/${documentId}`, {
        method: 'PATCH',
        headers: {
          'Authorization': `Bearer ${this.accessToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          description: metadata.description,
          '@microsoft.graph.conflictBehavior': 'replace'
        }),
      });

      if (!response.ok) {
        console.error('Failed to sync document metadata');
      }
    } catch (error) {
      console.error('Error syncing document metadata:', error);
    }
  }

  // Pobieranie historii dokumentu
  async getDocumentHistory(documentId: string): Promise<DocumentVersion[]> {
    try {
      // W rzeczywistej implementacji: Microsoft Graph API call
      const response = await fetch(`${this.baseUrl}/me/drive/items/${documentId}/versions`, {
        headers: {
          'Authorization': `Bearer ${this.accessToken}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        return data.value.map((version: any) => ({
          version: version.id,
          modifiedBy: version.lastModifiedBy?.user?.displayName || 'Unknown',
          modifiedAt: new Date(version.lastModifiedDateTime),
          size: version.size,
          changeDescription: version.description
        }));
      } else {
        console.error('Failed to get document history');
        return [];
      }
    } catch (error) {
      console.error('Error getting document history:', error);
      return [];
    }
  }

  // Microsoft Calendar integration
  async createCalendarEvent(event: CalendarEvent): Promise<string> {
    try {
      // W rzeczywistej implementacji: Microsoft Graph API call
      const response = await fetch(`${this.baseUrl}/me/events`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${this.accessToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          subject: event.subject,
          start: {
            dateTime: event.start.toISOString(),
            timeZone: 'Europe/London'
          },
          end: {
            dateTime: event.end.toISOString(),
            timeZone: 'Europe/London'
          },
          location: event.location ? {
            displayName: event.location
          } : undefined,
          attendees: event.attendees.map(email => ({
            emailAddress: { address: email },
            type: 'required'
          })),
          body: {
            contentType: 'HTML',
            content: event.description || ''
          },
          isOnlineMeeting: event.isOnlineMeeting,
          onlineMeetingProvider: event.isOnlineMeeting ? 'teamsForBusiness' : undefined
        }),
      });

      if (response.ok) {
        const data = await response.json();
        return data.id;
      } else {
        console.error('Failed to create calendar event');
        return 'mock-event-id';
      }
    } catch (error) {
      console.error('Error creating calendar event:', error);
      return 'mock-event-id';
    }
  }

  // Pobieranie dostępnych slotów czasowych
  async getAvailableSlots(startDate: Date, endDate: Date): Promise<TimeSlot[]> {
    try {
      // W rzeczywistej implementacji: Microsoft Graph API call
      const response = await fetch(`${this.baseUrl}/me/calendarView?startDateTime=${startDate.toISOString()}&endDateTime=${endDate.toISOString()}`, {
        headers: {
          'Authorization': `Bearer ${this.accessToken}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        // Analiza zajętych slotów i generowanie dostępnych
        return this.generateAvailableSlots(startDate, endDate, data.value);
      } else {
        console.error('Failed to get available slots');
        return this.generateMockAvailableSlots(startDate, endDate);
      }
    } catch (error) {
      console.error('Error getting available slots:', error);
      return this.generateMockAvailableSlots(startDate, endDate);
    }
  }

  // Aktualizacja wydarzenia kalendarza
  async updateEvent(eventId: string, updates: Partial<CalendarEvent>): Promise<void> {
    try {
      // W rzeczywistej implementacji: Microsoft Graph API call
      const response = await fetch(`${this.baseUrl}/me/events/${eventId}`, {
        method: 'PATCH',
        headers: {
          'Authorization': `Bearer ${this.accessToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updates),
      });

      if (!response.ok) {
        console.error('Failed to update calendar event');
      }
    } catch (error) {
      console.error('Error updating calendar event:', error);
    }
  }

  // Helper methods
  private transformMicrosoftItems(items: any[]): Document[] {
    return items.map(item => ({
      id: item.id,
      oneDriveId: item.id,
      name: item.name,
      type: this.detectDocumentType(item.name),
      currentFolder: item.parentReference?.path || '/',
      createdBy: item.createdBy?.user?.displayName || 'Unknown',
      createdAt: new Date(item.createdDateTime),
      lastModified: new Date(item.lastModifiedDateTime),
      size: item.size,
      mimeType: item.file?.mimeType || 'application/octet-stream',
      permissions: [], // Would need separate API call
      status: 'active',
      tags: [],
      metadata: {
        version: '1.0',
        description: item.description || ''
      }
    }));
  }

  private filterMockDocuments(query: string, filters: DocumentFilters): Document[] {
    let filtered = this.mockDocuments;

    if (query) {
      filtered = filtered.filter(doc => 
        doc.name.toLowerCase().includes(query.toLowerCase()) ||
        doc.metadata.description?.toLowerCase().includes(query.toLowerCase())
      );
    }

    if (filters.type) {
      filtered = filtered.filter(doc => doc.type === filters.type);
    }

    if (filters.customerId) {
      filtered = filtered.filter(doc => doc.customerId === filters.customerId);
    }

    if (filters.projectId) {
      filtered = filtered.filter(doc => doc.projectId === filters.projectId);
    }

    if (filters.department) {
      filtered = filtered.filter(doc => doc.department === filters.department);
    }

    return filtered;
  }

  private generateAvailableSlots(startDate: Date, endDate: Date, existingEvents: any[]): TimeSlot[] {
    const slots: TimeSlot[] = [];
    const slotDuration = 60; // 60 minutes
    const bufferTime = 15; // 15 minutes buffer

    for (let current = new Date(startDate); current < endDate; current.setMinutes(current.getMinutes() + slotDuration)) {
      const slotEnd = new Date(current.getTime() + slotDuration * 60000);
      
      // Check if slot conflicts with existing events
      const hasConflict = existingEvents.some(event => {
        const eventStart = new Date(event.start.dateTime);
        const eventEnd = new Date(event.end.dateTime);
        return current < eventEnd && slotEnd > eventStart;
      });

      if (!hasConflict) {
        slots.push({
          start: new Date(current),
          end: slotEnd,
          available: true,
          bufferBefore: bufferTime,
          bufferAfter: bufferTime
        });
      }
    }

    return slots;
  }

  private generateMockAvailableSlots(startDate: Date, endDate: Date): TimeSlot[] {
    const slots: TimeSlot[] = [];
    const slotDuration = 60;

    for (let current = new Date(startDate); current < endDate; current.setMinutes(current.getMinutes() + slotDuration)) {
      const slotEnd = new Date(current.getTime() + slotDuration * 60000);
      
      // Mock: 80% of slots are available
      const isAvailable = Math.random() > 0.2;
      
      slots.push({
        start: new Date(current),
        end: slotEnd,
        available: isAvailable,
        bufferBefore: 15,
        bufferAfter: 15
      });
    }

    return slots;
  }
}

export const microsoftDriveService = new MicrosoftDriveService(); 