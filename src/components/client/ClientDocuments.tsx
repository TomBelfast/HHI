'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { 
  FileText,
  Download,
  Printer,
  Calendar,
  User,
  Eye,
  X
} from 'lucide-react';

interface ClientDocument {
  id: string;
  type: 'quotation' | 'contract' | 'project_docs' | 'materials_list' | 'invoice';
  title: string;
  clientName: string;
  documentNumber: string;
  issueDate: Date;
  dueDate?: Date;
  status: 'draft' | 'sent' | 'approved' | 'paid' | 'overdue';
  amount?: number;
  currency?: string;
  description: string;
  content: string;
}

const documentTypeColors = {
  quotation: 'bg-blue-100 text-blue-800',
  contract: 'bg-green-100 text-green-800',
  project_docs: 'bg-purple-100 text-purple-800',
  materials_list: 'bg-orange-100 text-orange-800',
  invoice: 'bg-red-100 text-red-800'
};

const statusColors = {
  draft: 'bg-gray-100 text-gray-800',
  sent: 'bg-blue-100 text-blue-800',
  approved: 'bg-green-100 text-green-800',
  paid: 'bg-green-100 text-green-800',
  overdue: 'bg-red-100 text-red-800'
};

interface ClientDocumentsProps {
  clientId: string;
  clientName: string;
}

export default function ClientDocuments({ clientName }: ClientDocumentsProps) {
  const [selectedDocument, setSelectedDocument] = useState<ClientDocument | null>(null);

  // Sample data for Mr. James Murphy
  const clientDocuments: ClientDocument[] = [
    {
      id: '1',
      type: 'quotation',
      title: 'Full Roofline Replacement - Quotation',
      clientName: 'Mr. James Murphy',
      documentNumber: 'QT-2024-010',
      issueDate: new Date('2024-12-05'),
      dueDate: new Date('2025-01-05'),
      status: 'approved',
      amount: 4200,
      currency: 'GBP',
      description: 'Complete roofline replacement including fascia, soffit, and guttering',
      content: `Dear Mr. James Murphy,

We are pleased to provide you with a detailed quotation for your full roofline replacement project.

PROJECT SCOPE:
- Complete fascia board replacement
- Soffit installation and ventilation
- Guttering system replacement
- Downpipe installation
- All materials in white UPVC
- Professional installation by Roofline Specialists NI

TOTAL COST: £4,200 GBP
VALIDITY: 30 days from issue date

Please review and let us know if you have any questions.`
    },
    {
      id: '2',
      type: 'contract',
      title: 'Roofline Replacement Contract',
      clientName: 'Mr. James Murphy',
      documentNumber: 'CT-2024-010',
      issueDate: new Date('2024-12-07'),
      status: 'approved',
      amount: 4200,
      currency: 'GBP',
      description: 'Service agreement for full roofline replacement project',
      content: `SERVICE AGREEMENT

This contract is entered into between HHI Construction and Mr. James Murphy for the full roofline replacement project.

TERMS AND CONDITIONS:
1. Project duration: 2-3 days
2. Payment schedule: 50% upfront, 50% upon completion
3. Warranty: 10 years on all UPVC materials
4. Change orders: Must be approved in writing
5. Installation date: December 18, 2024

Total Contract Value: £4,200 GBP`
    },
    {
      id: '3',
      type: 'project_docs',
      title: 'Roofline Installation Plan',
      clientName: 'Mr. James Murphy',
      documentNumber: 'PD-2024-010',
      issueDate: new Date('2024-12-10'),
      status: 'sent',
      description: 'Detailed installation timeline and specifications',
      content: `ROOFLINE INSTALLATION PLAN

DAY 1: Preparation and Removal
- Site preparation and safety setup
- Removal of existing fascia and soffit
- Assessment of underlying structure
- Installation of new fascia boards

DAY 2: Installation
- Soffit installation with ventilation
- Guttering system installation
- Downpipe connection
- Quality inspection

DAY 3: Completion
- Final adjustments and testing
- Cleanup and site restoration
- Final inspection and handover

Project Manager: David McKay
Subcontractor: Roofline Specialists NI
Contact: david.mckay@hhi.com`
    },
    {
      id: '4',
      type: 'materials_list',
      title: 'Roofline Materials Specification',
      clientName: 'Mr. James Murphy',
      documentNumber: 'ML-2024-010',
      issueDate: new Date('2024-12-08'),
      status: 'sent',
      description: 'Complete list of materials and specifications for roofline project',
      content: `ROOFLINE MATERIALS SPECIFICATION

FASCIA BOARDS:
- White UPVC fascia boards (150mm depth)
- Heavy-duty brackets and fixings
- Ventilated soffit boards
- Corner pieces and end caps

GUTTERING SYSTEM:
- White UPVC guttering (112mm round)
- Gutter brackets and clips
- Downpipes (68mm round)
- Rainwater outlets and connectors

ACCESSORIES:
- Soffit vents for ventilation
- Gutter guards (optional)
- Sealant and adhesive
- Fixings and screws

SPECIFICATIONS:
- All materials: White UPVC
- Gutter capacity: 68mm downpipe
- Warranty: 10 years on materials
- Installation: Professional team`
    },
    {
      id: '5',
      type: 'invoice',
      title: 'Roofline Replacement Invoice',
      clientName: 'Mr. James Murphy',
      documentNumber: 'INV-2024-010',
      issueDate: new Date('2024-12-20'),
      dueDate: new Date('2025-01-20'),
      status: 'sent',
      amount: 2100,
      currency: 'GBP',
      description: 'Final payment for completed roofline replacement project',
      content: `INVOICE

Bill To: Mr. James Murphy
91 Causeway Road, Coleraine BT51 3AA

Description: Full Roofline Replacement - Final Payment
Amount: £2,100 GBP
Due Date: January 20, 2025

Payment Terms: Net 30 days
Payment Methods: Bank Transfer, Cheque, Card

Please include invoice number INV-2024-010 with payment.`
    }
  ];

  const getDocumentTypeColor = (type: string) => {
    return documentTypeColors[type as keyof typeof documentTypeColors] || 'bg-gray-100 text-gray-800';
  };

  const getStatusColor = (status: string) => {
    return statusColors[status as keyof typeof statusColors] || 'bg-gray-100 text-gray-800';
  };

  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString('en-GB', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  };

  const formatCurrency = (amount: number, currency: string) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currency
    }).format(amount);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold">Client Documents</h2>
          <p className="text-sm text-gray-600">Documents for {clientName}</p>
        </div>
        <Button>
          <FileText className="w-4 h-4 mr-2" />
          New Document
        </Button>
      </div>

      {/* Documents Grid */}
      <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        {clientDocuments.map((document) => (
          <Card key={document.id} className="hover:shadow-md transition-shadow">
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <CardTitle className="text-lg">{document.title}</CardTitle>
                  <div className="flex gap-2 mt-2">
                    <Badge className={getDocumentTypeColor(document.type)}>
                      {document.type.replace('_', ' ')}
                    </Badge>
                    <Badge className={getStatusColor(document.status)}>
                      {document.status}
                    </Badge>
                    {document.amount && (
                      <Badge className="bg-green-100 text-green-800">
                        {formatCurrency(document.amount, document.currency || 'USD')}
                      </Badge>
                    )}
                  </div>
                </div>
                <div className="flex gap-1">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setSelectedDocument(document)}
                  >
                    <Eye className="w-4 h-4" />
                  </Button>
                  <Button variant="ghost" size="sm">
                    <Download className="w-4 h-4" />
                  </Button>
                  <Button variant="ghost" size="sm">
                    <Printer className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <User className="w-4 h-4" />
                  <span>{document.clientName}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <FileText className="w-4 h-4" />
                  <span>{document.documentNumber}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Calendar className="w-4 h-4" />
                  <span>Issued: {formatDate(document.issueDate)}</span>
                </div>
                {document.dueDate && (
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Calendar className="w-4 h-4" />
                    <span>Due: {formatDate(document.dueDate)}</span>
                  </div>
                )}
                <div>
                  <p className="text-sm font-medium text-gray-600">Description:</p>
                  <p className="text-sm">{document.description}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Document Preview Modal */}
      {selectedDocument && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h2 className="text-xl font-bold">{selectedDocument.title}</h2>
                  <p className="text-sm text-gray-600">{selectedDocument.documentNumber}</p>
                </div>
                <Button
                  variant="ghost"
                  onClick={() => setSelectedDocument(null)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>
              
              <div className="space-y-4">
                <div className="flex gap-4 text-sm">
                  <div>
                    <span className="font-medium">Client:</span> {selectedDocument.clientName}
                  </div>
                  <div>
                    <span className="font-medium">Status:</span>
                    <Badge className={`ml-2 ${getStatusColor(selectedDocument.status)}`}>
                      {selectedDocument.status}
                    </Badge>
                  </div>
                  <div>
                    <span className="font-medium">Issue Date:</span> {formatDate(selectedDocument.issueDate)}
                  </div>
                  {selectedDocument.dueDate && (
                    <div>
                      <span className="font-medium">Due Date:</span> {formatDate(selectedDocument.dueDate)}
                    </div>
                  )}
                  {selectedDocument.amount && (
                    <div>
                      <span className="font-medium">Amount:</span> {formatCurrency(selectedDocument.amount, selectedDocument.currency || 'USD')}
                    </div>
                  )}
                </div>
                
                <div className="border-t pt-4">
                  <h3 className="font-medium mb-2">Document Content:</h3>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <pre className="whitespace-pre-wrap text-sm font-mono">{selectedDocument.content}</pre>
                  </div>
                </div>
              </div>
              
              <div className="flex gap-2 mt-6">
                <Button>
                  <Download className="w-4 h-4 mr-2" />
                  Download PDF
                </Button>
                <Button variant="outline">
                  <Printer className="w-4 h-4 mr-2" />
                  Print
                </Button>
                <Button variant="outline" onClick={() => setSelectedDocument(null)}>
                  Close
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
} 