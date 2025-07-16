'use client';

import { useState } from 'react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { MessageCircle, Send, Clock, Check, CheckCheck, Paperclip, Smile } from 'lucide-react';

// Mock data for WhatsApp simulation
const mockCustomers = [
  { id: 1, name: 'John Smith', phone: '+44 20 7123 4567', avatar: 'JS', status: 'online' },
  { id: 2, name: 'Sarah Johnson', phone: '+44 20 7123 4568', avatar: 'SJ', status: 'offline' },
  { id: 3, name: 'Michael Brown', phone: '+44 20 7123 4569', avatar: 'MB', status: 'online' },
];

const mockMessageTemplates = [
  {
    id: 1,
    name: 'Quote Request',
    content: 'Hi {{customer_name}}, thank you for your interest in our services. I\'ll prepare a detailed quote for your {{project_type}} project and send it within 24 hours.',
    category: 'Sales'
  },
  {
    id: 2,
    name: 'Appointment Confirmation',
    content: 'Hi {{customer_name}}, your appointment for {{date}} at {{time}} has been confirmed. We\'ll see you at {{location}}.',
    category: 'Scheduling'
  },
  {
    id: 3,
    name: 'Project Update',
    content: 'Hi {{customer_name}}, I wanted to update you on your project progress. {{update_details}}. We\'re on track to complete by {{completion_date}}.',
    category: 'Project Management'
  },
  {
    id: 4,
    name: 'Follow-up',
    content: 'Hi {{customer_name}}, I hope you\'re doing well. I wanted to follow up on our recent discussion about {{topic}}. When would be a good time to continue?',
    category: 'Follow-up'
  }
];

const mockConversations = {
  1: [
    {
      id: 1,
      sender: 'customer',
      content: 'Hi, I\'m interested in getting a quote for office renovation',
      timestamp: '2024-01-15T10:30:00',
      status: 'read'
    },
    {
      id: 2,
      sender: 'agent',
      content: 'Hi John, thank you for your interest! I\'ll prepare a detailed quote for your office renovation project and send it within 24 hours.',
      timestamp: '2024-01-15T10:32:00',
      status: 'read'
    },
    {
      id: 3,
      sender: 'customer',
      content: 'Perfect, thank you!',
      timestamp: '2024-01-15T10:33:00',
      status: 'read'
    }
  ],
  2: [
    {
      id: 1,
      sender: 'customer',
      content: 'When can you schedule the installation?',
      timestamp: '2024-01-15T14:15:00',
      status: 'read'
    }
  ],
  3: [
    {
      id: 1,
      sender: 'agent',
      content: 'Hi Michael, your appointment for tomorrow at 2 PM has been confirmed. We\'ll see you at your office.',
      timestamp: '2024-01-15T16:00:00',
      status: 'delivered'
    }
  ]
};

export default function WhatsAppIntegrationPage() {
  const [selectedCustomer, setSelectedCustomer] = useState<number | null>(1);
  const [newMessage, setNewMessage] = useState('');
  const [selectedTemplate, setSelectedTemplate] = useState<string>('');
  const [showTemplates, setShowTemplates] = useState(false);

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'sent':
        return <Check className="w-4 h-4 text-gray-400" />;
      case 'delivered':
        return <CheckCheck className="w-4 h-4 text-gray-400" />;
      case 'read':
        return <CheckCheck className="w-4 h-4 text-blue-500" />;
      default:
        return <Clock className="w-4 h-4 text-gray-400" />;
    }
  };

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      // In a real app, this would send the message
      setNewMessage('');
    }
  };

  const handleTemplateSelect = (templateId: string) => {
    const template = mockMessageTemplates.find(t => t.id.toString() === templateId);
    if (template) {
      setNewMessage(template.content);
      setSelectedTemplate(templateId);
    }
  };

  const currentCustomer = mockCustomers.find(c => c.id === selectedCustomer);
  const currentConversation = selectedCustomer ? mockConversations[selectedCustomer as keyof typeof mockConversations] || [] : [];

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">WhatsApp Integration</h1>
            <p className="text-gray-600 mt-2">
              Manage customer communications through WhatsApp
            </p>
          </div>
          <div className="flex items-center space-x-4">
            <Badge className="bg-green-100 text-green-800">Connected</Badge>
            <Button variant="outline">Configure Settings</Button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 h-[600px]">
          {/* Customer List */}
          <Card className="lg:col-span-1">
            <div className="p-4">
              <div className="space-y-1">
                {mockCustomers.map((customer) => (
                  <div
                    key={customer.id}
                    className={`p-3 cursor-pointer hover:bg-gray-50 border-l-4 transition-colors ${
                      selectedCustomer === customer.id ? 'border-blue-500 bg-blue-50' : 'border-transparent'
                    }`}
                    onClick={() => setSelectedCustomer(customer.id)}
                  >
                    <div className="flex items-center space-x-3">
                      <Avatar className="w-10 h-10">
                        <AvatarFallback>{customer.avatar}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-sm truncate">{customer.name}</p>
                        <p className="text-xs text-gray-500 truncate">{customer.phone}</p>
                      </div>
                      <div className={`w-2 h-2 rounded-full ${
                        customer.status === 'online' ? 'bg-green-500' : 'bg-gray-300'
                      }`} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Card>

          {/* Chat Interface */}
          <Card className="lg:col-span-3 flex flex-col">
            <div className="p-4 border-b">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <Avatar className="w-10 h-10">
                    <AvatarFallback>{currentCustomer?.avatar}</AvatarFallback>
                  </Avatar>
                  <div>
                    <h2 className="text-lg">{currentCustomer?.name}</h2>
                    <p className="text-sm text-gray-500">{currentCustomer?.phone}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setShowTemplates(!showTemplates)}
                  >
                    Templates
                  </Button>
                </div>
              </div>
            </div>

            <div className="flex-1 p-4 flex flex-col">
              {/* Messages */}
              <div className="flex-1 p-4 space-y-4 overflow-y-auto">
                {currentConversation.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${message.sender === 'agent' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                        message.sender === 'agent'
                          ? 'bg-blue-500 text-white'
                          : 'bg-gray-100 text-gray-900'
                      }`}
                    >
                      <p className="text-sm">{message.content}</p>
                      <div className="flex items-center justify-end space-x-1 mt-1">
                        <span className="text-xs opacity-70">
                          {new Date(message.timestamp).toLocaleTimeString([], { 
                            hour: '2-digit', 
                            minute: '2-digit' 
                          })}
                        </span>
                        {message.sender === 'agent' && getStatusIcon(message.status)}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Message Input */}
              <div className="border-t p-4">
                <div className="flex items-end space-x-2">
                  <div className="flex-1">
                    <Input
                      placeholder="Type a message..."
                      value={newMessage}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => setNewMessage(e.target.value)}
                      className="min-h-[60px] resize-none"
                      onKeyPress={(e: React.KeyboardEvent) => {
                        if (e.key === 'Enter' && !e.shiftKey) {
                          e.preventDefault();
                          handleSendMessage();
                        }
                      }}
                    />
                  </div>
                  <div className="flex items-center space-x-2">
                    <Button variant="outline" size="sm">
                      <Paperclip className="w-4 h-4" />
                    </Button>
                    <Button variant="outline" size="sm">
                      <Smile className="w-4 h-4" />
                    </Button>
                    <Button onClick={handleSendMessage} disabled={!newMessage.trim()}>
                      <Send className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </div>

        {/* Message Templates */}
        {showTemplates && (
          <Card>
            <div className="p-4">
              <h3 className="font-medium mb-2">Message Templates</h3>
              <p className="text-sm text-gray-600">
                Pre-defined message templates for common scenarios
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                {mockMessageTemplates.map((template) => (
                  <div
                    key={template.id}
                    className="p-4 border rounded-lg hover:bg-gray-50 cursor-pointer"
                    onClick={() => handleTemplateSelect(template.id.toString())}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-medium">{template.name}</h4>
                      <Badge variant="outline">{template.category}</Badge>
                    </div>
                    <p className="text-sm text-gray-600 line-clamp-3">{template.content}</p>
                  </div>
                ))}
              </div>
            </div>
          </Card>
        )}
      </div>
    </DashboardLayout>
  );
} 