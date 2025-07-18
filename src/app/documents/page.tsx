'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { 
  Search, 
  FolderOpen, 
  FileText, 
  Link, 
  Upload,
  Filter,
  RefreshCw,
  Eye,
  Download
} from 'lucide-react';
import { getDepartmentColor } from '@/lib/colors';

interface OneDriveDocument {
  id: string;
  oneDriveId: string;
  name: string;
  type: DocumentType;
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

enum DocumentType {
  QUOTATION = 'quotation',
  CONTRACT = 'contract',
  MEASUREMENT_REPORT = 'measurement_report',
  INVOICE = 'invoice',
  TECHNICAL_DRAWING = 'technical_drawing',
  PHOTO = 'photo',
  OTHER = 'other'
}

const documentTypeLabels = {
  [DocumentType.QUOTATION]: 'Quotation',
  [DocumentType.CONTRACT]: 'Contract',
  [DocumentType.MEASUREMENT_REPORT]: 'Measurement Report',
  [DocumentType.INVOICE]: 'Invoice',
  [DocumentType.TECHNICAL_DRAWING]: 'Technical Drawing',
  [DocumentType.PHOTO]: 'Photo',
  [DocumentType.OTHER]: 'Other'
};

const documentTypeColors = {
  [DocumentType.QUOTATION]: 'bg-blue-100 text-blue-800',
  [DocumentType.CONTRACT]: 'bg-green-100 text-green-800',
  [DocumentType.MEASUREMENT_REPORT]: 'bg-purple-100 text-purple-800',
  [DocumentType.INVOICE]: 'bg-orange-100 text-orange-800',
  [DocumentType.TECHNICAL_DRAWING]: 'bg-red-100 text-red-800',
  [DocumentType.PHOTO]: 'bg-pink-100 text-pink-800',
  [DocumentType.OTHER]: 'bg-gray-100 text-gray-800'
};

// Mock data - w rzeczywistości będzie z Microsoft OneDrive/SharePoint API
const mockDocuments: OneDriveDocument[] = [
  {
    id: '1',
    oneDriveId: '1ABC123',
    name: 'CUST-001_QUOTATION_20241217.pdf',
    type: DocumentType.QUOTATION,
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
    type: DocumentType.MEASUREMENT_REPORT,
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
    type: DocumentType.OTHER,
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

export default function DocumentsPage() {
  const [documents, setDocuments] = useState<OneDriveDocument[]>(mockDocuments);
  const [filteredDocuments, setFilteredDocuments] = useState<OneDriveDocument[]>(mockDocuments);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedType, setSelectedType] = useState<string>('all');
  const [selectedStatus, setSelectedStatus] = useState<string>('all');
  const [selectedDepartment, setSelectedDepartment] = useState<string>('all');
  const [isLoading, setIsLoading] = useState(false);

  // Filtrowanie dokumentów
  useEffect(() => {
    let filtered = documents;

    if (searchQuery) {
      filtered = filtered.filter(doc => 
        doc.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        doc.customerId?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        doc.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
      );
    }

    if (selectedType !== 'all') {
      filtered = filtered.filter(doc => doc.type === selectedType);
    }

    if (selectedStatus !== 'all') {
      filtered = filtered.filter(doc => doc.status === selectedStatus);
    }

    if (selectedDepartment !== 'all') {
      filtered = filtered.filter(doc => doc.department === selectedDepartment);
    }

    setFilteredDocuments(filtered);
  }, [documents, searchQuery, selectedType, selectedStatus, selectedDepartment]);

  const handleAssignDocument = async (documentId: string, customerId: string) => {
    setIsLoading(true);
    try {
      // Tutaj będzie API call do przypisania dokumentu
      console.log(`Assigning document ${documentId} to customer ${customerId}`);
      
      // Mock update
      setDocuments(prev => prev.map(doc => 
        doc.id === documentId 
          ? { ...doc, customerId, status: 'assigned' as const }
          : doc
      ));
    } catch (error) {
      console.error('Error assigning document:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSyncOneDrive = async () => {
    setIsLoading(true);
    try {
      // Tutaj będzie API call do synchronizacji z Microsoft OneDrive/SharePoint
      console.log('Syncing with Microsoft OneDrive/SharePoint...');
      await new Promise(resolve => setTimeout(resolve, 2000)); // Mock delay
    } catch (error) {
      console.error('Error syncing with Microsoft OneDrive/SharePoint:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const getDocumentTypeColor = (type: DocumentType) => {
    return documentTypeColors[type] || 'bg-gray-100 text-gray-800';
  };

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Documents Management</h1>
        <div className="flex gap-2">
          <Button 
            onClick={handleSyncOneDrive}
            disabled={isLoading}
            variant="outline"
          >
            <RefreshCw className={`w-4 h-4 mr-2 ${isLoading ? 'animate-spin' : ''}`} />
            Sync Google Drive
          </Button>
          <Button>
            <Upload className="w-4 h-4 mr-2" />
            Upload Document
          </Button>
        </div>
      </div>

      {/* Search and Filters */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Search className="w-5 h-5" />
            Search & Filters
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex gap-4">
            <div className="flex-1">
              <Input
                placeholder="Search documents by name, customer ID, or tags..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full"
              />
            </div>
            <Button variant="outline">
              <Filter className="w-4 h-4 mr-2" />
              Advanced
            </Button>
          </div>
          
          <div className="flex gap-4">
            <select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              className="px-3 py-2 border rounded-md"
            >
              <option value="all">All Types</option>
              {Object.entries(documentTypeLabels).map(([key, label]) => (
                <option key={key} value={key}>{label}</option>
              ))}
            </select>

            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="px-3 py-2 border rounded-md"
            >
              <option value="all">All Status</option>
              <option value="assigned">Assigned</option>
              <option value="unassigned">Unassigned</option>
              <option value="archived">Archived</option>
            </select>

            <select
              value={selectedDepartment}
              onChange={(e) => setSelectedDepartment(e.target.value)}
              className="px-3 py-2 border rounded-md"
            >
              <option value="all">All Departments</option>
              <option value="Kitchens">Kitchens</option>
              <option value="Bathrooms">Bathrooms</option>
              <option value="Composite Doors">Composite Doors</option>
              <option value="PVC Windows & Doors">PVC Windows & Doors</option>
            </select>
          </div>
        </CardContent>
      </Card>

      {/* Documents List */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span>Documents ({filteredDocuments.length})</span>
            <Badge variant="secondary">
              {filteredDocuments.filter(d => d.status === 'unassigned').length} unassigned
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {filteredDocuments.map((document) => (
              <div
                key={document.id}
                className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-center gap-4 flex-1">
                  <div className="flex-shrink-0">
                    <FileText className="w-8 h-8 text-blue-500" />
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-medium truncate">{document.name}</h3>
                      <Badge className={getDocumentTypeColor(document.type)}>
                        {documentTypeLabels[document.type]}
                      </Badge>
                      {document.status === 'unassigned' && (
                        <Badge variant="destructive">Unassigned</Badge>
                      )}
                    </div>
                    
                    <div className="flex items-center gap-4 text-sm text-gray-600">
                      <span>Size: {formatFileSize(document.size)}</span>
                      <span>Modified: {document.lastModified.toLocaleDateString()}</span>
                      <span>By: {document.createdBy}</span>
                      {document.customerId && (
                        <span>Customer: {document.customerId}</span>
                      )}
                      {document.department && (
                        <Badge className={getDepartmentColor(document.department)}>
                          {document.department}
                        </Badge>
                      )}
                    </div>
                    
                    {document.tags.length > 0 && (
                      <div className="flex gap-1 mt-2">
                        {document.tags.map((tag, index) => (
                          <Badge key={index} variant="outline" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
                
                <div className="flex items-center gap-2">
                  <Button size="sm" variant="outline">
                    <Eye className="w-4 h-4" />
                  </Button>
                  <Button size="sm" variant="outline">
                    <Download className="w-4 h-4" />
                  </Button>
                  <Button size="sm" variant="outline">
                    <Link className="w-4 h-4" />
                  </Button>
                  {document.status === 'unassigned' && (
                    <Button 
                      size="sm"
                      onClick={() => handleAssignDocument(document.id, 'CUST-001')}
                      disabled={isLoading}
                    >
                      Assign
                    </Button>
                  )}
                </div>
              </div>
            ))}
            
            {filteredDocuments.length === 0 && (
              <div className="text-center py-8 text-gray-500">
                <FolderOpen className="w-12 h-12 mx-auto mb-4 opacity-50" />
                <p>No documents found matching your criteria</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
} 