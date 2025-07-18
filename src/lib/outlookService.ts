// Microsoft Outlook Service
// Integracja z Microsoft Graph API dla komunikacji email i zarządzania szablonami

export interface EmailTemplate {
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

export interface EmailData {
  customerName: string;
  projectId?: string;
  quoteAmount?: number;
  scheduledDate?: Date;
  completionDate?: Date;
  invoiceNumber?: string;
  department?: string;
  contactDate?: string;
  customFields?: Record<string, unknown>;
}

export interface Attachment {
  name: string;
  content: string; // base64
  contentType: string;
}

export interface EmailMessage {
  id: string;
  subject: string;
  body: string;
  from: string;
  to: string[];
  sentDateTime: Date;
  receivedDateTime: Date;
  hasAttachments: boolean;
  threadId: string;
  customerId?: string;
  projectId?: string;
}

export interface AutoReplyRule {
  id: string;
  name: string;
  conditions: {
    from?: string;
    subject?: string;
    keywords?: string[];
  };
  response: {
    subject: string;
    body: string;
    isActive: boolean;
  };
  isActive: boolean;
}

export interface SMSTemplate {
  id: string;
  name: string;
  content: string;
  type: 'welcome' | 'quotation' | 'reminder' | 'completion';
  language: 'en' | 'pl';
  variables: string[];
  isActive: boolean;
}

export interface WhatsAppTemplate {
  id: string;
  name: string;
  content: string;
  type: 'welcome' | 'quotation' | 'reminder' | 'completion';
  language: 'en' | 'pl';
  variables: string[];
  isActive: boolean;
}

class OutlookService {
  private accessToken: string | null = null;
  private baseUrl = 'https://graph.microsoft.com/v1.0';

  // Mock data dla demonstracji
  private mockEmailTemplates: EmailTemplate[] = [
    {
      id: '1',
      name: 'Welcome Email',
      subject: 'Welcome to HHI - Your Home & Hardware Ireland Project',
      body: `Dear {{customerName}},

Thank you for choosing Home & Hardware Ireland for your project. We're excited to work with you!

Your project details:
- Project ID: {{projectId}}
- Department: {{department}}
- Initial Contact: {{contactDate}}

Our team will be in touch within 24 hours to discuss your requirements in detail.

Best regards,
The HHI Team`,
      type: 'welcome',
      language: 'en',
      variables: ['customerName', 'projectId', 'department', 'contactDate'],
      isActive: true,
      createdAt: new Date('2024-01-01'),
      updatedAt: new Date('2024-01-01')
    },
    {
      id: '2',
      name: 'Quotation Email',
      subject: 'Your HHI Project Quotation - {{projectId}}',
      body: `Dear {{customerName}},

We're pleased to provide you with a detailed quotation for your project.

Project Details:
- Project ID: {{projectId}}
- Total Amount: £{{quoteAmount}}
- Validity: 30 days

Please review the attached quotation and let us know if you have any questions.

To proceed with the project, please confirm your acceptance.

Best regards,
The HHI Team`,
      type: 'quotation',
      language: 'en',
      variables: ['customerName', 'projectId', 'quoteAmount'],
      isActive: true,
      createdAt: new Date('2024-01-01'),
      updatedAt: new Date('2024-01-01')
    }
  ];

  private mockSMSTemplates: SMSTemplate[] = [
    {
      id: '1',
      name: 'Welcome SMS',
      content: 'Welcome to HHI! Your project {{projectId}} is being processed. We\'ll contact you within 24h.',
      type: 'welcome',
      language: 'en',
      variables: ['projectId'],
      isActive: true
    },
    {
      id: '2',
      name: 'Quotation SMS',
      content: 'Your HHI quotation for project {{projectId}} has been sent to your email. Amount: £{{quoteAmount}}',
      type: 'quotation',
      language: 'en',
      variables: ['projectId', 'quoteAmount'],
      isActive: true
    }
  ];

  private mockWhatsAppTemplates: WhatsAppTemplate[] = [
    {
      id: '1',
      name: 'Welcome WhatsApp',
      content: `🎉 Welcome to HHI!

Your project {{projectId}} is now in our system.

We'll contact you within 24 hours to discuss your requirements.

Thank you for choosing Home & Hardware Ireland!`,
      type: 'welcome',
      language: 'en',
      variables: ['projectId'],
      isActive: true
    },
    {
      id: '2',
      name: 'Quotation WhatsApp',
      content: `📋 Your HHI Quotation

Project: {{projectId}}
Amount: £{{quoteAmount}}

Please check your email for detailed quotation.

To proceed, please confirm your acceptance.`,
      type: 'quotation',
      language: 'en',
      variables: ['projectId', 'quoteAmount'],
      isActive: true
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

  // Wysyłanie emaila
  async sendEmail(to: string[], subject: string, body: string, attachments?: Attachment[]): Promise<string> {
    try {
      // W rzeczywistej implementacji: Microsoft Graph API call
      const response = await fetch(`${this.baseUrl}/me/sendMail`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${this.accessToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: {
            subject: subject,
            body: {
              contentType: 'HTML',
              content: body
            },
            toRecipients: to.map(email => ({
              emailAddress: {
                address: email
              }
            })),
            attachments: attachments?.map(att => ({
              '@odata.type': '#microsoft.graph.fileAttachment',
              name: att.name,
              contentBytes: att.content,
              contentType: att.contentType
            })) || []
          }
        }),
      });

      if (response.ok) {
        const data = await response.json();
        return data.id;
      } else {
        console.error('Failed to send email');
        return 'mock-email-id';
      }
    } catch (error) {
      console.error('Error sending email:', error);
      return 'mock-email-id';
    }
  }

  // Wysyłanie emaila z szablonu
  async sendTemplateEmail(templateId: string, to: string[], data: EmailData): Promise<string> {
    try {
      const template = this.mockEmailTemplates.find(t => t.id === templateId);
      if (!template) {
        throw new Error('Template not found');
      }

      // Podstawienie zmiennych w szablonie
      let subject = template.subject;
      let body = template.body;

      Object.entries(data).forEach(([key, value]) => {
        const placeholder = `{{${key}}}`;
        if (value !== undefined) {
          subject = subject.replace(new RegExp(placeholder, 'g'), String(value));
          body = body.replace(new RegExp(placeholder, 'g'), String(value));
        }
      });

      return await this.sendEmail(to, subject, body);
    } catch (error) {
      console.error('Error sending template email:', error);
      return 'mock-email-id';
    }
  }

  // Tworzenie szablonu email
  async createEmailTemplate(template: EmailTemplate): Promise<string> {
    try {
      // W rzeczywistej implementacji: zapis do bazy danych
      const newTemplate = {
        ...template,
        id: `template-${Date.now()}`,
        createdAt: new Date(),
        updatedAt: new Date()
      };
      
      this.mockEmailTemplates.push(newTemplate);
      return newTemplate.id;
    } catch (error) {
      console.error('Error creating email template:', error);
      return 'mock-template-id';
    }
  }

  // Aktualizacja szablonu email
  async updateEmailTemplate(templateId: string, updates: Partial<EmailTemplate>): Promise<void> {
    try {
      const templateIndex = this.mockEmailTemplates.findIndex(t => t.id === templateId);
      if (templateIndex !== -1) {
        this.mockEmailTemplates[templateIndex] = {
          ...this.mockEmailTemplates[templateIndex],
          ...updates,
          updatedAt: new Date()
        };
      }
    } catch (error) {
      console.error('Error updating email template:', error);
    }
  }

  // Pobieranie szablonów email
  async getEmailTemplates(): Promise<EmailTemplate[]> {
    try {
      return this.mockEmailTemplates;
    } catch (error) {
      console.error('Error getting email templates:', error);
      return [];
    }
  }

  // Historia emaili klienta
  async getEmailHistory(customerId: string): Promise<EmailMessage[]> {
    try {
      // W rzeczywistej implementacji: Microsoft Graph API call
      const response = await fetch(`${this.baseUrl}/me/messages?$filter=toRecipients/any(r:contains(r/emailAddress/address,'${customerId}'))`, {
        headers: {
          'Authorization': `Bearer ${this.accessToken}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        return data.value.map((msg: any) => ({
          id: msg.id,
          subject: msg.subject,
          body: msg.body.content,
          from: msg.from.emailAddress.address,
          to: msg.toRecipients.map((r: any) => r.emailAddress.address),
          sentDateTime: new Date(msg.sentDateTime),
          receivedDateTime: new Date(msg.receivedDateTime),
          hasAttachments: msg.hasAttachments,
          threadId: msg.conversationId,
          customerId: customerId
        }));
      } else {
        console.error('Failed to get email history');
        return [];
      }
    } catch (error) {
      console.error('Error getting email history:', error);
      return [];
    }
  }

  // Pobieranie wątku email
  async getEmailThread(threadId: string): Promise<EmailMessage[]> {
    try {
      // W rzeczywistej implementacji: Microsoft Graph API call
      const response = await fetch(`${this.baseUrl}/me/messages?$filter=conversationId eq '${threadId}'`, {
        headers: {
          'Authorization': `Bearer ${this.accessToken}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        return data.value.map((msg: any) => ({
          id: msg.id,
          subject: msg.subject,
          body: msg.body.content,
          from: msg.from.emailAddress.address,
          to: msg.toRecipients.map((r: any) => r.emailAddress.address),
          sentDateTime: new Date(msg.sentDateTime),
          receivedDateTime: new Date(msg.receivedDateTime),
          hasAttachments: msg.hasAttachments,
          threadId: msg.conversationId
        }));
      } else {
        console.error('Failed to get email thread');
        return [];
      }
    } catch (error) {
      console.error('Error getting email thread:', error);
      return [];
    }
  }

  // Ustawienie automatycznych odpowiedzi
  async setAutoReply(rules: AutoReplyRule[]): Promise<void> {
    try {
      // W rzeczywistej implementacji: Microsoft Graph API call
      console.log('Setting auto reply rules:', rules);
    } catch (error) {
      console.error('Error setting auto reply:', error);
    }
  }

  // Pobieranie automatycznych odpowiedzi
  async getAutoReplies(): Promise<AutoReplyRule[]> {
    try {
      // W rzeczywistej implementacji: Microsoft Graph API call
      return [];
    } catch (error) {
      console.error('Error getting auto replies:', error);
      return [];
    }
  }

  // Wysyłanie SMS (mock - w rzeczywistości integracja z dostawcą SMS)
  async sendSMS(to: string, templateId: string, data: Record<string, unknown>): Promise<string> {
    try {
      const template = this.mockSMSTemplates.find(t => t.id === templateId);
      if (!template) {
        throw new Error('SMS template not found');
      }

      let content = template.content;
      Object.entries(data).forEach(([key, value]) => {
        const placeholder = `{{${key}}}`;
        if (value !== undefined) {
          content = content.replace(new RegExp(placeholder, 'g'), String(value));
        }
      });

      // Mock wysyłanie SMS
      console.log(`Sending SMS to ${to}: ${content}`);
      return `sms-${Date.now()}`;
    } catch (error) {
      console.error('Error sending SMS:', error);
      return 'mock-sms-id';
    }
  }

  // Wysyłanie WhatsApp (mock - w rzeczywistości integracja z WhatsApp Business API)
  async sendWhatsApp(to: string, templateId: string, data: Record<string, unknown>): Promise<string> {
    try {
      const template = this.mockWhatsAppTemplates.find(t => t.id === templateId);
      if (!template) {
        throw new Error('WhatsApp template not found');
      }

      let content = template.content;
      Object.entries(data).forEach(([key, value]) => {
        const placeholder = `{{${key}}}`;
        if (value !== undefined) {
          content = content.replace(new RegExp(placeholder, 'g'), String(value));
        }
      });

      // Mock wysyłanie WhatsApp
      console.log(`Sending WhatsApp to ${to}: ${content}`);
      return `whatsapp-${Date.now()}`;
    } catch (error) {
      console.error('Error sending WhatsApp:', error);
      return 'mock-whatsapp-id';
    }
  }

  // Pobieranie szablonów SMS
  async getSMSTemplates(): Promise<SMSTemplate[]> {
    try {
      return this.mockSMSTemplates;
    } catch (error) {
      console.error('Error getting SMS templates:', error);
      return [];
    }
  }

  // Pobieranie szablonów WhatsApp
  async getWhatsAppTemplates(): Promise<WhatsAppTemplate[]> {
    try {
      return this.mockWhatsAppTemplates;
    } catch (error) {
      console.error('Error getting WhatsApp templates:', error);
      return [];
    }
  }

  // Automatyczne workflow komunikacji
  async sendWelcomeCommunication(customerId: string, customerName: string, projectId: string, email: string, phone: string): Promise<void> {
    try {
      // Wysyłanie powitalnego emaila
      await this.sendTemplateEmail('1', [email], {
        customerName,
        projectId,
        department: 'General',
        contactDate: new Date().toLocaleDateString()
      });

      // Wysyłanie powitalnego SMS
      await this.sendSMS(phone, '1', { projectId });

      // Wysyłanie powitalnego WhatsApp
      await this.sendWhatsApp(phone, '1', { projectId });

      console.log(`Welcome communication sent to ${customerName} for project ${projectId}`);
    } catch (error) {
      console.error('Error sending welcome communication:', error);
    }
  }

  async sendQuotationCommunication(customerId: string, customerName: string, projectId: string, quoteAmount: number, email: string, phone: string): Promise<void> {
    try {
      // Wysyłanie emaila z wyceną
      await this.sendTemplateEmail('2', [email], {
        customerName,
        projectId,
        quoteAmount
      });

      // Wysyłanie SMS z wyceną
      await this.sendSMS(phone, '2', { projectId, quoteAmount });

      // Wysyłanie WhatsApp z wyceną
      await this.sendWhatsApp(phone, '2', { projectId, quoteAmount });

      console.log(`Quotation communication sent to ${customerName} for project ${projectId}`);
    } catch (error) {
      console.error('Error sending quotation communication:', error);
    }
  }
}

export const outlookService = new OutlookService(); 