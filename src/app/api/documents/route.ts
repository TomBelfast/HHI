import { NextRequest, NextResponse } from 'next/server';

// Mock Microsoft OneDrive/SharePoint API - w rzeczywistości będzie integracja z Microsoft Graph API
interface OneDriveDocument {
  id: string;
  oneDriveId: string;
  name: string;
  type: string;
  projectId?: string;
  customerId?: string;
  department?: string;
  currentFolder: string;
  createdBy: string;
  createdAt: Date;
  lastModified: Date;
  size: number;
  mimeType: string;
  status: 'assigned' | 'unassigned' | 'archived';
  tags: string[];
}

// Mock data
const mockDocuments: OneDriveDocument[] = [
  {
    id: '1',
    oneDriveId: '1ABC123',
    name: 'CUST-001_QUOTATION_20241217.pdf',
    type: 'quotation',
    customerId: 'CUST-001',
    department: 'Kitchens',
    currentFolder: 'HHI Projects/Quotations/CUST-001',
    createdBy: 'John Smith',
    createdAt: new Date('2024-12-17'),
    lastModified: new Date('2024-12-17'),
    size: 2048576,
    mimeType: 'application/pdf',
    status: 'assigned',
    tags: ['kitchen', 'quote', 'approved']
  },
  {
    id: '2',
    oneDriveId: '2DEF456',
    name: 'CUST-002_MEASUREMENT_REPORT_20241218.pdf',
    type: 'measurement_report',
    customerId: 'CUST-002',
    department: 'Bathrooms',
    currentFolder: 'HHI Projects/Measurements/CUST-002',
    createdBy: 'Sarah Johnson',
    createdAt: new Date('2024-12-18'),
    lastModified: new Date('2024-12-18'),
    size: 1048576,
    mimeType: 'application/pdf',
    status: 'assigned',
    tags: ['bathroom', 'measurement', 'completed']
  },
  {
    id: '3',
    oneDriveId: '3GHI789',
    name: 'unassigned_document.pdf',
    type: 'other',
    currentFolder: 'HHI Projects/Unassigned',
    createdBy: 'Unknown',
    createdAt: new Date('2024-12-19'),
    lastModified: new Date('2024-12-19'),
    size: 512000,
    mimeType: 'application/pdf',
    status: 'unassigned',
    tags: []
  }
];

// GET - pobierz wszystkie dokumenty
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const customerId = searchParams.get('customerId');
    const type = searchParams.get('type');
    const status = searchParams.get('status');
    const department = searchParams.get('department');
    const search = searchParams.get('search');

    let filteredDocuments = [...mockDocuments];

    // Filtrowanie po customerId
    if (customerId) {
      filteredDocuments = filteredDocuments.filter(doc => doc.customerId === customerId);
    }

    // Filtrowanie po typie
    if (type && type !== 'all') {
      filteredDocuments = filteredDocuments.filter(doc => doc.type === type);
    }

    // Filtrowanie po statusie
    if (status && status !== 'all') {
      filteredDocuments = filteredDocuments.filter(doc => doc.status === status);
    }

    // Filtrowanie po departamencie
    if (department && department !== 'all') {
      filteredDocuments = filteredDocuments.filter(doc => doc.department === department);
    }

    // Wyszukiwanie
    if (search) {
      filteredDocuments = filteredDocuments.filter(doc =>
        doc.name.toLowerCase().includes(search.toLowerCase()) ||
        doc.customerId?.toLowerCase().includes(search.toLowerCase()) ||
        doc.tags.some(tag => tag.toLowerCase().includes(search.toLowerCase()))
      );
    }

    return NextResponse.json({
      success: true,
      data: filteredDocuments,
      total: filteredDocuments.length
    });
  } catch (error) {
    console.error('Error fetching documents:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch documents' },
      { status: 500 }
    );
  }
}

// POST - przypisz dokument do klienta
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { documentId, customerId, department } = body;

    if (!documentId || !customerId) {
      return NextResponse.json(
        { success: false, error: 'Document ID and Customer ID are required' },
        { status: 400 }
      );
    }

    // Znajdź dokument
    const documentIndex = mockDocuments.findIndex(doc => doc.id === documentId);
    if (documentIndex === -1) {
      return NextResponse.json(
        { success: false, error: 'Document not found' },
        { status: 404 }
      );
    }

    // Zaktualizuj dokument
    mockDocuments[documentIndex] = {
      ...mockDocuments[documentIndex],
      customerId,
      department,
      status: 'assigned' as const,
      lastModified: new Date()
    };

    // Tutaj będzie logika przeniesienia dokumentu w OneDrive/SharePoint
    console.log(`Moving document ${documentId} to customer ${customerId} folder`);

    return NextResponse.json({
      success: true,
      data: mockDocuments[documentIndex],
      message: 'Document assigned successfully'
    });
  } catch (error) {
    console.error('Error assigning document:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to assign document' },
      { status: 500 }
    );
  }
}

// PUT - zaktualizuj dokument
export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const { documentId, updates } = body;

    if (!documentId) {
      return NextResponse.json(
        { success: false, error: 'Document ID is required' },
        { status: 400 }
      );
    }

    const documentIndex = mockDocuments.findIndex(doc => doc.id === documentId);
    if (documentIndex === -1) {
      return NextResponse.json(
        { success: false, error: 'Document not found' },
        { status: 404 }
      );
    }

    // Zaktualizuj dokument
    mockDocuments[documentIndex] = {
      ...mockDocuments[documentIndex],
      ...updates,
      lastModified: new Date()
    };

    return NextResponse.json({
      success: true,
      data: mockDocuments[documentIndex],
      message: 'Document updated successfully'
    });
  } catch (error) {
    console.error('Error updating document:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to update document' },
      { status: 500 }
    );
  }
}

// DELETE - usuń dokument
export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const documentId = searchParams.get('id');

    if (!documentId) {
      return NextResponse.json(
        { success: false, error: 'Document ID is required' },
        { status: 400 }
      );
    }

    const documentIndex = mockDocuments.findIndex(doc => doc.id === documentId);
    if (documentIndex === -1) {
      return NextResponse.json(
        { success: false, error: 'Document not found' },
        { status: 404 }
      );
    }

    // Usuń dokument (w rzeczywistości będzie archiwizacja)
    mockDocuments[documentIndex].status = 'archived';

    return NextResponse.json({
      success: true,
      message: 'Document archived successfully'
    });
  } catch (error) {
    console.error('Error archiving document:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to archive document' },
      { status: 500 }
    );
  }
} 