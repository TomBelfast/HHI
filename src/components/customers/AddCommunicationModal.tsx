'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Label } from '@/components/ui/Label';
import { Textarea } from '@/components/ui/Textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/Select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Plus, X } from 'lucide-react';

interface CommunicationEntry {
  date: string;
  type: 'email' | 'phone' | 'site_visit' | 'quote_sent';
  summary: string;
  outcome?: string;
}

interface AddCommunicationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (communication: CommunicationEntry) => void;
}

export function AddCommunicationModal({ isOpen, onClose, onAdd }: AddCommunicationModalProps) {
  const [formData, setFormData] = useState({
    date: new Date().toISOString().split('T')[0],
    type: 'phone' as 'email' | 'phone' | 'site_visit' | 'quote_sent',
    summary: '',
    outcome: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const communication: CommunicationEntry = {
      date: formData.date,
      type: formData.type,
      summary: formData.summary,
      outcome: formData.outcome || undefined
    };

    onAdd(communication);
    
    // Reset form
    setFormData({
      date: new Date().toISOString().split('T')[0],
      type: 'phone',
      summary: '',
      outcome: ''
    });
    
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <Card className="w-full max-w-md mx-4">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <Plus className="h-5 w-5" />
              Add Communication
            </CardTitle>
            <Button
              variant="ghost"
              size="sm"
              onClick={onClose}
              className="h-8 w-8 p-0"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="date">Date *</Label>
              <Input
                id="date"
                type="date"
                value={formData.date}
                onChange={(e) => setFormData(prev => ({ ...prev, date: e.target.value }))}
                required
              />
            </div>

            <div>
              <Label htmlFor="type">Type *</Label>
              <Select value={formData.type} onValueChange={(value: 'email' | 'phone' | 'site_visit' | 'quote_sent') => setFormData(prev => ({ ...prev, type: value }))}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="email">Email</SelectItem>
                  <SelectItem value="phone">Phone</SelectItem>
                  <SelectItem value="site_visit">Site Visit</SelectItem>
                  <SelectItem value="quote_sent">Quote Sent</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="summary">Summary *</Label>
              <Textarea
                id="summary"
                value={formData.summary}
                onChange={(e) => setFormData(prev => ({ ...prev, summary: e.target.value }))}
                placeholder="Brief description of the communication..."
                required
              />
            </div>

            <div>
              <Label htmlFor="outcome">Outcome (Optional)</Label>
              <Textarea
                id="outcome"
                value={formData.outcome}
                onChange={(e) => setFormData(prev => ({ ...prev, outcome: e.target.value }))}
                placeholder="Result or outcome of the communication..."
              />
            </div>

            <div className="flex justify-end space-x-2 pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={onClose}
              >
                Cancel
              </Button>
              <Button type="submit">
                Add Communication
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
} 