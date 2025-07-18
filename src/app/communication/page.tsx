'use client';

import { useState, useEffect } from 'react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Mail, 
  MessageSquare, 
  Smartphone, 
  Send,
  Edit,
  Plus,
  Eye,
  Copy,
  Check
} from 'lucide-react';

interface EmailTemplate {
  id: string;
  name: string;
  subject: string;
  body: string;
  type: 'welcome' | 'quotation' | 'reminder' | 'completion' | 'invoice' | 'follow_up';
  language: 'en' | 'pl';
  variables: string[];
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

interface SMSTemplate {
  id: string;
  name: string;
  content: string;
  type: 'welcome' | 'quotation' | 'reminder' | 'completion';
  language: 'en' | 'pl';
  variables: string[];
  isActive: boolean;
}

interface WhatsAppTemplate {
  id: string;
  name: string;
  content: string;
  type: 'welcome' | 'quotation' | 'reminder' | 'completion';
  language: 'en' | 'pl';
  variables: string[];
  isActive: boolean;
}

const templateTypeColors = {
  welcome: 'bg-green-100 text-green-800',
  quotation: 'bg-blue-100 text-blue-800',
  reminder: 'bg-orange-100 text-orange-800',
  completion: 'bg-purple-100 text-purple-800',
  invoice: 'bg-red-100 text-red-800',
  follow_up: 'bg-yellow-100 text-yellow-800'
};

const languageColors = {
  en: 'bg-blue-100 text-blue-800',
  pl: 'bg-red-100 text-red-800'
};

export default function CommunicationPage() {
  const [emailTemplates, setEmailTemplates] = useState<EmailTemplate[]>([]);
  const [smsTemplates, setSMSTemplates] = useState<SMSTemplate[]>([]);
  const [whatsappTemplates, setWhatsAppTemplates] = useState<WhatsAppTemplate[]>([]);

  const [copiedTemplate, setCopiedTemplate] = useState<string | null>(null);

  useEffect(() => {
    fetchTemplates();
  }, []);

  const fetchTemplates = async () => {
    try {
      const response = await fetch('/api/communication');
      if (response.ok) {
        const data = await response.json();
        setEmailTemplates(data.data.email || []);
        setSMSTemplates(data.data.sms || []);
        setWhatsAppTemplates(data.data.whatsapp || []);
      }
    } catch (error) {
      console.error('Error fetching templates:', error);
    }
  };

  const copyTemplate = (template: EmailTemplate | SMSTemplate | WhatsAppTemplate, type: string) => {
    const content = 'subject' in template ? template.subject : template.content;
    navigator.clipboard.writeText(content);
    setCopiedTemplate(`${type}-${template.id}`);
    setTimeout(() => setCopiedTemplate(null), 2000);
  };

  const getTemplateTypeColor = (type: string) => {
    return templateTypeColors[type as keyof typeof templateTypeColors] || 'bg-gray-100 text-gray-800';
  };

  const getLanguageColor = (language: string) => {
    return languageColors[language as keyof typeof languageColors] || 'bg-gray-100 text-gray-800';
  };

  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString('en-GB', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold">Communication Management</h1>
            <p className="text-muted-foreground">
              Manage email, SMS, and WhatsApp templates for customer communication
            </p>
          </div>
          <div className="flex gap-2">
            <Button>
              <Plus className="w-4 h-4 mr-2" />
              New Template
            </Button>
          </div>
        </div>

      {/* Tabs */}
      <Tabs defaultValue="email" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="email" className="flex items-center gap-2">
            <Mail className="w-4 h-4" />
            Email Templates
          </TabsTrigger>
          <TabsTrigger value="sms" className="flex items-center gap-2">
            <MessageSquare className="w-4 h-4" />
            SMS Templates
          </TabsTrigger>
          <TabsTrigger value="whatsapp" className="flex items-center gap-2">
            <Smartphone className="w-4 h-4" />
            WhatsApp Templates
          </TabsTrigger>
        </TabsList>

        {/* Email Templates */}
        <TabsContent value="email" className="space-y-4">
          <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
            {emailTemplates.map((template) => (
              <Card key={template.id} className="hover:shadow-md transition-shadow">
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <CardTitle className="text-lg">{template.name}</CardTitle>
                      <div className="flex gap-2 mt-2">
                        <Badge className={getTemplateTypeColor(template.type)}>
                          {template.type}
                        </Badge>
                        <Badge className={getLanguageColor(template.language)}>
                          {template.language.toUpperCase()}
                        </Badge>
                        {template.isActive && (
                          <Badge className="bg-green-100 text-green-800">
                            Active
                          </Badge>
                        )}
                      </div>
                    </div>
                    <div className="flex gap-1">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => copyTemplate(template, 'email')}
                      >
                        {copiedTemplate === `email-${template.id}` ? (
                          <Check className="w-4 h-4 text-green-600" />
                        ) : (
                          <Copy className="w-4 h-4" />
                        )}
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Eye className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Edit className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="space-y-2">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Subject:</p>
                      <p className="text-sm">{template.subject}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-600">Variables:</p>
                      <div className="flex flex-wrap gap-1 mt-1">
                        {template.variables.map((variable) => (
                          <Badge key={variable} variant="outline" className="text-xs">
                            {variable}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    <div className="flex justify-between text-xs text-gray-500">
                      <span>Created: {formatDate(template.createdAt)}</span>
                      <span>Updated: {formatDate(template.updatedAt)}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* SMS Templates */}
        <TabsContent value="sms" className="space-y-4">
          <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
            {smsTemplates.map((template) => (
              <Card key={template.id} className="hover:shadow-md transition-shadow">
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <CardTitle className="text-lg">{template.name}</CardTitle>
                      <div className="flex gap-2 mt-2">
                        <Badge className={getTemplateTypeColor(template.type)}>
                          {template.type}
                        </Badge>
                        <Badge className={getLanguageColor(template.language)}>
                          {template.language.toUpperCase()}
                        </Badge>
                        {template.isActive && (
                          <Badge className="bg-green-100 text-green-800">
                            Active
                          </Badge>
                        )}
                      </div>
                    </div>
                    <div className="flex gap-1">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => copyTemplate(template, 'sms')}
                      >
                        {copiedTemplate === `sms-${template.id}` ? (
                          <Check className="w-4 h-4 text-green-600" />
                        ) : (
                          <Copy className="w-4 h-4" />
                        )}
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Eye className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Edit className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="space-y-2">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Content:</p>
                      <p className="text-sm">{template.content}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-600">Variables:</p>
                      <div className="flex flex-wrap gap-1 mt-1">
                        {template.variables.map((variable) => (
                          <Badge key={variable} variant="outline" className="text-xs">
                            {variable}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* WhatsApp Templates */}
        <TabsContent value="whatsapp" className="space-y-4">
          <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
            {whatsappTemplates.map((template) => (
              <Card key={template.id} className="hover:shadow-md transition-shadow">
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <CardTitle className="text-lg">{template.name}</CardTitle>
                      <div className="flex gap-2 mt-2">
                        <Badge className={getTemplateTypeColor(template.type)}>
                          {template.type}
                        </Badge>
                        <Badge className={getLanguageColor(template.language)}>
                          {template.language.toUpperCase()}
                        </Badge>
                        {template.isActive && (
                          <Badge className="bg-green-100 text-green-800">
                            Active
                          </Badge>
                        )}
                      </div>
                    </div>
                    <div className="flex gap-1">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => copyTemplate(template, 'whatsapp')}
                      >
                        {copiedTemplate === `whatsapp-${template.id}` ? (
                          <Check className="w-4 h-4 text-green-600" />
                        ) : (
                          <Copy className="w-4 h-4" />
                        )}
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Eye className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Edit className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="space-y-2">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Content:</p>
                      <p className="text-sm whitespace-pre-line">{template.content}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-600">Variables:</p>
                      <div className="flex flex-wrap gap-1 mt-1">
                        {template.variables.map((variable) => (
                          <Badge key={variable} variant="outline" className="text-xs">
                            {variable}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>

      {/* Statistics */}
      <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Mail className="w-4 h-4 text-blue-600" />
              <div>
                <p className="text-sm font-medium">Email Templates</p>
                <p className="text-2xl font-bold">{emailTemplates.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <MessageSquare className="w-4 h-4 text-green-600" />
              <div>
                <p className="text-sm font-medium">SMS Templates</p>
                <p className="text-2xl font-bold">{smsTemplates.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Smartphone className="w-4 h-4 text-purple-600" />
              <div>
                <p className="text-sm font-medium">WhatsApp Templates</p>
                <p className="text-2xl font-bold">{whatsappTemplates.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Send className="w-4 h-4 text-orange-600" />
              <div>
                <p className="text-sm font-medium">Total Templates</p>
                <p className="text-2xl font-bold">
                  {emailTemplates.length + smsTemplates.length + whatsappTemplates.length}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
    </DashboardLayout>
  );
} 