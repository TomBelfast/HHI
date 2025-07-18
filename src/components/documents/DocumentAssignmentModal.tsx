'use client';

import { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Label } from '@/components/ui/label';
import { 
  Search, 
  User, 
  FileText, 
  Check,
  X
} from 'lucide-react';

interface Customer {
  id: string;
  name: string;
  email: string;
  phone: string;
  department: string;
  status: string;
}

interface DocumentAssignmentModalProps {
  isOpen: boolean;
  onClose: () => void;
  document: {
    id: string;
    name: string;
    type: string;
    currentFolder: string;
  } | null;
  onAssign: (documentId: string, customerId: string) => Promise<void>;
}

// Mock customers data
const mockCustomers: Customer[] = [
  {
    id: 'CUST-001',
    name: 'John Smith',
    email: 'john.smith@email.com',
    phone: '+44 28 1234 5678',
    department: 'Kitchens',
    status: 'active'
  },
  {
    id: 'CUST-002',
    name: 'Mary O\'Connor',
    email: 'mary.oconnor@email.com',
    phone: '+44 28 2345 6789',
    department: 'Bathrooms',
    status: 'active'
  },
  {
    id: 'CUST-003',
    name: 'Patrick Murphy',
    email: 'patrick.murphy@email.com',
    phone: '+44 28 3456 7890',
    department: 'Composite Doors',
    status: 'active'
  }
];

export default function DocumentAssignmentModal({
  isOpen,
  onClose,
  document,
  onAssign
}: DocumentAssignmentModalProps) {
  const [customers, setCustomers] = useState<Customer[]>(mockCustomers);
  const [filteredCustomers, setFilteredCustomers] = useState<Customer[]>(mockCustomers);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  // Filtrowanie klientów
  useEffect(() => {
    if (searchQuery) {
      const filtered = customers.filter(customer =>
        customer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        customer.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
        customer.email.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredCustomers(filtered);
    } else {
      setFilteredCustomers(customers);
    }
  }, [customers, searchQuery]);

  const handleAssign = async () => {
    if (!selectedCustomer || !document) return;

    setIsLoading(true);
    try {
      await onAssign(document.id, selectedCustomer.id);
      onClose();
      setSelectedCustomer(null);
      setSearchQuery('');
    } catch (error) {
      console.error('Error assigning document:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCustomerSelect = (customer: Customer) => {
    setSelectedCustomer(customer);
  };

  const handleClose = () => {
    setSelectedCustomer(null);
    setSearchQuery('');
    onClose();
  };

  if (!document) return null;

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <FileText className="w-5 h-5" />
            Assign Document to Customer (Microsoft OneDrive/SharePoint)
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Document Info */}
          <div className="p-4 bg-gray-50 rounded-lg">
            <h3 className="font-medium mb-2">Document Details</h3>
            <div className="space-y-1 text-sm">
              <p><strong>Name:</strong> {document.name}</p>
              <p><strong>Type:</strong> {document.type}</p>
              <p><strong>Current Location:</strong> {document.currentFolder}</p>
            </div>
          </div>

          {/* Customer Search */}
          <div className="space-y-4">
            <div>
              <Label htmlFor="customer-search">Search Customers</Label>
              <div className="relative mt-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  id="customer-search"
                  placeholder="Search by name, ID, or email..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>

            {/* Customer List */}
            <div className="space-y-2 max-h-60 overflow-y-auto">
              {filteredCustomers.map((customer) => (
                <div
                  key={customer.id}
                  className={`p-3 border rounded-lg cursor-pointer transition-colors ${
                    selectedCustomer?.id === customer.id
                      ? 'border-blue-500 bg-blue-50'
                      : 'hover:bg-gray-50'
                  }`}
                  onClick={() => handleCustomerSelect(customer)}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="flex-shrink-0">
                        <User className="w-8 h-8 text-gray-400" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <h4 className="font-medium">{customer.name}</h4>
                          <Badge variant="outline">{customer.id}</Badge>
                        </div>
                        <div className="text-sm text-gray-600 space-y-1">
                          <p>{customer.email}</p>
                          <p>{customer.phone}</p>
                          <Badge className="text-xs">{customer.department}</Badge>
                        </div>
                      </div>
                    </div>
                    {selectedCustomer?.id === customer.id && (
                      <Check className="w-5 h-5 text-blue-500" />
                    )}
                  </div>
                </div>
              ))}
            </div>

            {filteredCustomers.length === 0 && (
              <div className="text-center py-4 text-gray-500">
                <User className="w-8 h-8 mx-auto mb-2 opacity-50" />
                <p>No customers found matching your search</p>
              </div>
            )}
          </div>

          {/* Selected Customer Summary */}
          {selectedCustomer && (
            <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <h3 className="font-medium mb-2 text-blue-900">Selected Customer</h3>
              <div className="space-y-1 text-sm text-blue-800">
                <p><strong>Name:</strong> {selectedCustomer.name}</p>
                <p><strong>ID:</strong> {selectedCustomer.id}</p>
                <p><strong>Department:</strong> {selectedCustomer.department}</p>
                <p><strong>Email:</strong> {selectedCustomer.email}</p>
              </div>
            </div>
          )}

          {/* Actions */}
          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={handleClose}>
              <X className="w-4 h-4 mr-2" />
              Cancel
            </Button>
            <Button
              onClick={handleAssign}
              disabled={!selectedCustomer || isLoading}
            >
              <Check className="w-4 h-4 mr-2" />
              {isLoading ? 'Assigning...' : 'Assign Document'}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
} 