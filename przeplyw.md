# HHI System - Kompletny Przepływ Powiadomień i Integracja z Kalendarzem

## Przegląd Systemu

System HHI (Home & Hardware Ireland) to zaawansowany CRM z automatycznym workflow'em, powiadomieniami w czasie rzeczywistym, integracją z Microsoft Calendar i **Microsoft OneDrive/SharePoint**. System obsługuje **kompletny cykl życia projektu** od pierwszego kontaktu z klientem do finalizacji i wystawienia faktury, z automatycznym zarządzaniem dokumentami.

---

## 1. Kompletny Cykl Życia Projektu - Przepływ Powiadomień

### **ETAP 1: Inicjalny Kontakt**
```
[Klient dzwoni] 
    ↓
[Osoba w biurze odbiera telefon]
    ↓
[Wyszukuje/dodaje klienta w systemie]
    ↓
[Wchodzi na zakładkę "Add Communication"]
    ↓
[Wprowadza streszczenie rozmowy]
    ↓
[Wybierze departament (np. Kitchens, Bathrooms)]
    ↓
[Zatwierdza → automatyczne powiadomienia]
    ↓
[System tworzy folder "Leads" w OneDrive/SharePoint]
```

**Powiadomienia w tym etapie:**
- ✅ **Sekretarka** → otrzymuje potwierdzenie dodania komunikacji
- ✅ **Departament** → otrzymuje powiadomienie o nowym kliencie
- ✅ **Manager oddziału** → otrzymuje informację o nowym leadzie
- ✅ **Administrator** → otrzymuje powiadomienie o nowym projekcie
- ✅ **Klient** → otrzymuje email/SMS z potwierdzeniem kontaktu
- ✅ **OneDrive/SharePoint** → automatyczne utworzenie folderu projektu

### **ETAP 2: Kwalifikacja i Wycena**
```
[Departament analizuje potrzeby klienta]
    ↓
[Ustala zakres prac]
    ↓
[Przygotowuje wycenę]
    ↓
[Wysyła wycenę klientowi]
    ↓
[Klient akceptuje/odrzuca/negocjuje]
    ↓
[System przenosi dokumenty do folderu "Quotations"]
```

**Powiadomienia w tym etapie:**
- ✅ **Klient** → otrzymuje wycenę email + SMS
- ✅ **Sekretarka** → powiadomienie o wysłaniu wyceny
- ✅ **Manager** → powiadomienie o statusie wyceny
- ✅ **Departament** → powiadomienie o reakcji klienta
- ✅ **OneDrive/SharePoint** → automatyczne przeniesienie do folderu "Quotations"

### **ETAP 3: Planowanie i Harmonogram**
```
[Klient akceptuje wycenę]
    ↓
[System automatycznie tworzy projekt]
    ↓
[Planowanie wizyt pomiarowych]
    ↓
[Ustalenie harmonogramu prac]
    ↓
[Przydzielenie zespołu]
    ↓
[System przenosi dokumenty do folderu "Active Projects"]
```

**Powiadomienia w tym etapie:**
- ✅ **Klient** → otrzymuje link do kalendarza + potwierdzenie projektu
- ✅ **Zespół pomiarowy** → powiadomienie o nowym projekcie
- ✅ **Manager** → powiadomienie o rozpoczęciu projektu
- ✅ **Sekretarka** → powiadomienie o statusie projektu
- ✅ **OneDrive/SharePoint** → automatyczne przeniesienie do folderu "Active Projects"

### **ETAP 4: Wizyta Pomiarowa**
```
[Wizyta u klienta]
    ↓
[Pomiary i dokumentacja]
    ↓
[Aktualizacja specyfikacji]
    ↓
[Finalizacja projektu]
    ↓
[Zatwierdzenie przez klienta]
    ↓
[System przenosi dokumenty do folderu "Measurements"]
```

**Powiadomienia w tym etapie:**
- ✅ **Klient** → przypomnienie o wizycie (24h przed)
- ✅ **Zespół** → przypomnienie o wizycie
- ✅ **Manager** → powiadomienie o rozpoczęciu wizyty
- ✅ **Sekretarka** → powiadomienie o zakończeniu wizyty
- ✅ **Klient** → podsumowanie wizyty + następne kroki
- ✅ **OneDrive/SharePoint** → automatyczne przeniesienie do folderu "Measurements"

### **ETAP 5: Produkcja i Montaż**
```
[Zamówienie materiałów]
    ↓
[Produkcja elementów]
    ↓
[Planowanie montażu]
    ↓
[Montaż u klienta]
    ↓
[Kontrola jakości]
    ↓
[System przenosi dokumenty do folderu "Production"]
```

**Powiadomienia w tym etapie:**
- ✅ **Klient** → powiadomienie o rozpoczęciu produkcji
- ✅ **Zespół montażowy** → powiadomienie o nowym zadaniu
- ✅ **Manager** → powiadomienie o statusie produkcji
- ✅ **Klient** → powiadomienie o terminie montażu
- ✅ **Zespół** → przypomnienie o montażu
- ✅ **OneDrive/SharePoint** → automatyczne przeniesienie do folderu "Production"

### **ETAP 6: Finalizacja i Faktura**
```
[Zakończenie montażu]
    ↓
[Kontrola jakości]
    ↓
[Odbior techniczny]
    ↓
[Wystawienie faktury]
    ↓
[Rozliczenie]
    ↓
[System przenosi dokumenty do folderu "Completed"]
```

**Powiadomienia w tym etapie:**
- ✅ **Klient** → powiadomienie o zakończeniu prac
- ✅ **Manager** → powiadomienie o zakończeniu projektu
- ✅ **Sekretarka** → powiadomienie o potrzebie wystawienia faktury
- ✅ **Klient** → faktura email + SMS
- ✅ **Administrator** → powiadomienie o zakończeniu projektu
- ✅ **OneDrive/SharePoint** → automatyczne przeniesienie do folderu "Completed"

---

## 2. Integracja z Microsoft OneDrive/SharePoint

### **Struktura Folderów w OneDrive/SharePoint**
```
HHI Projects/
├── Leads/                    # Nowe leady
│   ├── CUST-001/
│   ├── CUST-002/
│   └── ...
├── Quotations/              # Wyceny
│   ├── CUST-001/
│   ├── CUST-002/
│   └── ...
├── Active Projects/         # Aktywne projekty
│   ├── CUST-001/
│   ├── CUST-002/
│   └── ...
├── Measurements/            # Pomiary
│   ├── CUST-001/
│   ├── CUST-002/
│   └── ...
├── Production/              # Produkcja
│   ├── CUST-001/
│   ├── CUST-002/
│   └── ...
└── Completed/               # Zakończone projekty
    ├── CUST-001/
    ├── CUST-002/
    └── ...
```

### **Typy Dokumentów**
```typescript
enum DocumentType {
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
```

### **Struktura Dokumentu w Systemie**
```typescript
interface OneDriveDocument {
  id: string;
  oneDriveId: string;
  name: string;
  type: DocumentType;
  projectId: string;
  customerId: string;
  department: Department;
  currentFolder: string;
  previousFolder?: string;
  createdBy: string;
  createdAt: Date;
  lastModified: Date;
  size: number;
  mimeType: string;
  permissions: {
    userId: string;
    role: 'owner' | 'writer' | 'reader';
    email: string;
  }[];
  status: 'active' | 'archived' | 'deleted';
  tags: string[];
  metadata: {
    version: string;
    description?: string;
    customFields?: Record<string, any>;
  };
}
```

### **Automatyczne Workflow Dokumentów**
```typescript
const documentWorkflow = {
  // Po dodaniu nowego klienta
  onCustomerCreated: [
    'createGoogleDriveFolder',
    'setFolderPermissions',
    'notifyTeamMembers'
  ],
  
  // Po zmianie statusu projektu
  onProjectStatusChanged: [
    'moveDocumentsToNewFolder',
    'updateDocumentMetadata',
    'notifyDocumentOwners',
    'syncPermissions'
  ],
  
  // Po dodaniu nowego dokumentu
  onDocumentAdded: [
    'indexDocument',
    'setPermissions',
    'notifyRelevantUsers',
    'updateProjectTimeline'
  ],
  
  // Po przeniesieniu dokumentu ręcznie
  onDocumentMoved: [
    'detectStatusChange',
    'updateProjectStatus',
    'notifyStatusChange',
    'triggerWorkflow'
  ]
};
```

### **API Google Drive Integration**
```typescript
interface GoogleDriveAPI {
  // Zarządzanie folderami
  createFolder(name: string, parentId?: string): Promise<string>;
  moveFolder(folderId: string, newParentId: string): Promise<void>;
  deleteFolder(folderId: string): Promise<void>;
  
  // Zarządzanie dokumentami
  uploadFile(file: File, folderId: string): Promise<string>;
  moveFile(fileId: string, newFolderId: string): Promise<void>;
  deleteFile(fileId: string): Promise<void>;
  
  // Uprawnienia
  setPermissions(fileId: string, permissions: Permission[]): Promise<void>;
  getPermissions(fileId: string): Promise<Permission[]>;
  
  // Monitoring zmian
  watchChanges(resourceId: string, callback: (change: Change) => void): Promise<void>;
  stopWatching(channelId: string): Promise<void>;
}
```

### **Webhook dla Zmian w Google Drive**
```typescript
interface GoogleDriveWebhook {
  // Zmiana lokalizacji dokumentu
  onDocumentMoved: {
    fileId: string;
    oldFolderId: string;
    newFolderId: string;
    timestamp: Date;
    user: string;
  };
  
  // Dodanie nowego dokumentu
  onDocumentAdded: {
    fileId: string;
    folderId: string;
    fileName: string;
    timestamp: Date;
    user: string;
  };
  
  // Usunięcie dokumentu
  onDocumentDeleted: {
    fileId: string;
    folderId: string;
    timestamp: Date;
    user: string;
  };
  
  // Zmiana uprawnień
  onPermissionsChanged: {
    fileId: string;
    permissions: Permission[];
    timestamp: Date;
    user: string;
  };
}
```

---

## 3. Struktura Powiadomień w Systemie

### **Typy Powiadomień**
```typescript
enum NotificationType {
  // Etap 1: Inicjalny kontakt
  NEW_LEAD = 'new_lead',
  COMMUNICATION_ADDED = 'communication_added',
  DEPARTMENT_ASSIGNED = 'department_assigned',
  
  // Etap 2: Kwalifikacja i wycena
  QUOTE_PREPARED = 'quote_prepared',
  QUOTE_SENT = 'quote_sent',
  QUOTE_RESPONSE = 'quote_response',
  
  // Etap 3: Planowanie
  PROJECT_CREATED = 'project_created',
  MEASUREMENT_SCHEDULED = 'measurement_scheduled',
  TEAM_ASSIGNED = 'team_assigned',
  
  // Etap 4: Wizyta pomiarowa
  MEASUREMENT_REMINDER = 'measurement_reminder',
  MEASUREMENT_STARTED = 'measurement_started',
  MEASUREMENT_COMPLETED = 'measurement_completed',
  
  // Etap 5: Produkcja i montaż
  PRODUCTION_STARTED = 'production_started',
  INSTALLATION_SCHEDULED = 'installation_scheduled',
  INSTALLATION_REMINDER = 'installation_reminder',
  
  // Etap 6: Finalizacja
  PROJECT_COMPLETED = 'project_completed',
  INVOICE_READY = 'invoice_ready',
  PAYMENT_RECEIVED = 'payment_received',
  
  // Microsoft OneDrive/SharePoint
  DOCUMENT_ADDED = 'document_added',
  DOCUMENT_MOVED = 'document_moved',
  DOCUMENT_DELETED = 'document_deleted',
  FOLDER_CREATED = 'folder_created',
  PERMISSIONS_CHANGED = 'permissions_changed'
}
```

### **Kanały Powiadomień**
```typescript
enum NotificationChannel {
  POPUP = 'popup',           // Powiadomienia w aplikacji
  EMAIL = 'email',           // Email
  SMS = 'sms',              // SMS
  WHATSAPP = 'whatsapp',    // WhatsApp
  CALENDAR = 'calendar',    // Microsoft Calendar
  ONEDRIVE_SHAREPOINT = 'onedrive_sharepoint' // Microsoft OneDrive/SharePoint notifications
}
```

### **Struktura Powiadomienia**
```typescript
interface Notification {
  id: string;
  type: NotificationType;
  channel: NotificationChannel;
  recipient: {
    userId?: string;
    email?: string;
    phone?: string;
    role: UserRole;
  };
  projectId?: string;
  customerId?: string;
  documentId?: string;
  title: string;
  message: string;
  data: {
    projectStage?: ProjectStage;
    customerName?: string;
    department?: Department;
    scheduledDate?: Date;
    quoteAmount?: number;
    documentName?: string;
    folderPath?: string;
    // ... inne dane kontekstowe
  };
  priority: 'low' | 'medium' | 'high' | 'urgent';
  status: 'pending' | 'sent' | 'delivered' | 'read' | 'failed';
  createdAt: Date;
  sentAt?: Date;
  readAt?: Date;
}
```

---

## 4. Integracja z Microsoft Outlook i Komunikacja z Klientami

### **4.1 Integracja z Microsoft Outlook**
```typescript
interface OutlookService {
  // Wysyłanie emaili
  sendEmail(to: string[], subject: string, body: string, attachments?: Attachment[]): Promise<string>;
  sendTemplateEmail(templateId: string, to: string[], data: EmailData): Promise<string>;
  
  // Zarządzanie szablonami
  createEmailTemplate(template: EmailTemplate): Promise<string>;
  updateEmailTemplate(templateId: string, updates: Partial<EmailTemplate>): Promise<void>;
  getEmailTemplates(): Promise<EmailTemplate[]>;
  
  // Historia komunikacji
  getEmailHistory(customerId: string): Promise<EmailMessage[]>;
  getEmailThread(threadId: string): Promise<EmailMessage[]>;
  
  // Automatyczne odpowiedzi
  setAutoReply(rules: AutoReplyRule[]): Promise<void>;
  getAutoReplies(): Promise<AutoReplyRule[]>;
}

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

interface EmailData {
  customerName: string;
  projectId?: string;
  quoteAmount?: number;
  scheduledDate?: Date;
  completionDate?: Date;
  invoiceNumber?: string;
  customFields?: Record<string, any>;
}

interface Attachment {
  name: string;
  content: string; // base64
  contentType: string;
}
```

### **4.2 Szablony Wiadomości**

#### **Email Szablony**
```typescript
const emailTemplates = {
  // Powitalny email po pierwszym kontakcie
  welcome: {
    en: {
      subject: "Welcome to HHI - Your Home & Hardware Ireland Project",
      body: `
Dear {{customerName}},

Thank you for choosing Home & Hardware Ireland for your project. We're excited to work with you!

Your project details:
- Project ID: {{projectId}}
- Department: {{department}}
- Initial Contact: {{contactDate}}

Our team will be in touch within 24 hours to discuss your requirements in detail.

Best regards,
The HHI Team
      `
    },
    pl: {
      subject: "Witamy w HHI - Twój projekt Home & Hardware Ireland",
      body: `
Szanowny {{customerName}},

Dziękujemy za wybór Home & Hardware Ireland dla Twojego projektu. Cieszymy się, że będziemy z Tobą współpracować!

Szczegóły projektu:
- ID Projektu: {{projectId}}
- Dział: {{department}}
- Data kontaktu: {{contactDate}}

Nasz zespół skontaktuje się z Tobą w ciągu 24 godzin, aby omówić szczegóły wymagań.

Pozdrawiamy,
Zespół HHI
      `
    }
  },

  // Wycena
  quotation: {
    en: {
      subject: "Your HHI Project Quotation - {{projectId}}",
      body: `
Dear {{customerName}},

We're pleased to provide you with a detailed quotation for your project.

Project Details:
- Project ID: {{projectId}}
- Total Amount: £{{quoteAmount}}
- Validity: 30 days

Please review the attached quotation and let us know if you have any questions.

To proceed with the project, please confirm your acceptance.

Best regards,
The HHI Team
      `
    },
    pl: {
      subject: "Wycena projektu HHI - {{projectId}}",
      body: `
Szanowny {{customerName}},

Z przyjemnością przedstawiamy szczegółową wycenę dla Twojego projektu.

Szczegóły projektu:
- ID Projektu: {{projectId}}
- Kwota całkowita: £{{quoteAmount}}
- Ważność: 30 dni

Prosimy o przejrzenie załączonej wyceny i informację o ewentualnych pytaniach.

Aby kontynuować projekt, prosimy o potwierdzenie akceptacji.

Pozdrawiamy,
Zespół HHI
      `
    }
  },

  // Przypomnienie o wizycie
  measurement_reminder: {
    en: {
      subject: "Reminder: HHI Measurement Visit Tomorrow",
      body: `
Dear {{customerName}},

This is a friendly reminder about your scheduled measurement visit tomorrow.

Visit Details:
- Date: {{scheduledDate}}
- Time: {{scheduledTime}}
- Address: {{address}}
- Team Member: {{teamMember}}

Please ensure someone is available to provide access to the property.

If you need to reschedule, please contact us immediately.

Best regards,
The HHI Team
      `
    },
    pl: {
      subject: "Przypomnienie: Wizyta pomiarowa HHI jutro",
      body: `
Szanowny {{customerName}},

To przyjazne przypomnienie o zaplanowanej wizycie pomiarowej jutro.

Szczegóły wizyty:
- Data: {{scheduledDate}}
- Godzina: {{scheduledTime}}
- Adres: {{address}}
- Członek zespołu: {{teamMember}}

Prosimy o zapewnienie, że ktoś będzie dostępny, aby umożliwić dostęp do nieruchomości.

Jeśli potrzebujesz przełożyć termin, prosimy o natychmiastowy kontakt.

Pozdrawiamy,
Zespół HHI
      `
    }
  },

  // Zakończenie projektu
  completion: {
    en: {
      subject: "Project Completed Successfully - {{projectId}}",
      body: `
Dear {{customerName}},

Great news! Your project has been completed successfully.

Project Details:
- Project ID: {{projectId}}
- Completion Date: {{completionDate}}
- Final Amount: £{{finalAmount}}

We hope you're delighted with the results. Your invoice will be sent separately.

Thank you for choosing HHI!

Best regards,
The HHI Team
      `
    },
    pl: {
      subject: "Projekt zakończony pomyślnie - {{projectId}}",
      body: `
Szanowny {{customerName}},

Świetne wieści! Twój projekt został pomyślnie zakończony.

Szczegóły projektu:
- ID Projektu: {{projectId}}
- Data zakończenia: {{completionDate}}
- Kwota końcowa: £{{finalAmount}}

Mamy nadzieję, że jesteś zadowolony z rezultatów. Faktura zostanie wysłana osobno.

Dziękujemy za wybór HHI!

Pozdrawiamy,
Zespół HHI
      `
    }
  }
};
```

#### **SMS Szablony**
```typescript
const smsTemplates = {
  welcome: {
    en: "Welcome to HHI! Your project {{projectId}} is being processed. We'll contact you within 24h.",
    pl: "Witamy w HHI! Twój projekt {{projectId}} jest przetwarzany. Skontaktujemy się w ciągu 24h."
  },
  
  quotation_sent: {
    en: "Your HHI quotation for project {{projectId}} has been sent to your email. Amount: £{{quoteAmount}}",
    pl: "Wycena HHI dla projektu {{projectId}} została wysłana na email. Kwota: £{{quoteAmount}}"
  },
  
  measurement_reminder: {
    en: "Reminder: HHI measurement visit tomorrow at {{scheduledTime}}. Please ensure access.",
    pl: "Przypomnienie: Wizyta pomiarowa HHI jutro o {{scheduledTime}}. Prosimy o zapewnienie dostępu."
  },
  
  project_started: {
    en: "Great news! Your HHI project {{projectId}} has started. We'll keep you updated.",
    pl: "Świetne wieści! Twój projekt HHI {{projectId}} rozpoczął się. Będziemy Cię informować."
  },
  
  completion: {
    en: "Congratulations! Your HHI project {{projectId}} is complete. Invoice will be sent shortly.",
    pl: "Gratulacje! Twój projekt HHI {{projectId}} jest zakończony. Faktura zostanie wysłana wkrótce."
  }
};
```

#### **WhatsApp Szablony**
```typescript
const whatsappTemplates = {
  welcome: {
    en: `🎉 Welcome to HHI!
    
Your project {{projectId}} is now in our system.
    
We'll contact you within 24 hours to discuss your requirements.
    
Thank you for choosing Home & Hardware Ireland!`,
    
    pl: `🎉 Witamy w HHI!
    
Twój projekt {{projectId}} jest teraz w naszym systemie.
    
Skontaktujemy się w ciągu 24 godzin, aby omówić Twoje wymagania.
    
Dziękujemy za wybór Home & Hardware Ireland!`
  },
  
  quotation: {
    en: `📋 Your HHI Quotation
    
Project: {{projectId}}
Amount: £{{quoteAmount}}
    
Please check your email for detailed quotation.
    
To proceed, please confirm your acceptance.`,
    
    pl: `📋 Twoja wycena HHI
    
Projekt: {{projectId}}
Kwota: £{{quoteAmount}}
    
Prosimy sprawdzić email dla szczegółowej wyceny.
    
Aby kontynuować, prosimy o potwierdzenie akceptacji.`
  },
  
  measurement_reminder: {
    en: `⏰ Measurement Visit Reminder
    
Tomorrow at {{scheduledTime}}
Address: {{address}}
    
Please ensure someone is available for access.
    
Need to reschedule? Contact us immediately.`,
    
    pl: `⏰ Przypomnienie o wizycie pomiarowej
    
Jutro o {{scheduledTime}}
Adres: {{address}}
    
Prosimy o zapewnienie, że ktoś będzie dostępny.
    
Potrzebujesz przełożyć? Skontaktuj się natychmiast.`
  }
};
```

### **4.3 Automatyczne Workflow Komunikacji**
```typescript
const communicationWorkflow = {
  // Po dodaniu nowego klienta
  onCustomerCreated: [
    'sendWelcomeEmail',
    'sendWelcomeSMS',
    'sendWelcomeWhatsApp',
    'createOutlookContact',
    'scheduleFollowUpCall'
  ],
  
  // Po przygotowaniu wyceny
  onQuotationPrepared: [
    'sendQuotationEmail',
    'sendQuotationSMS',
    'scheduleQuotationFollowUp'
  ],
  
  // Po akceptacji wyceny
  onQuotationAccepted: [
    'sendAcceptanceEmail',
    'sendAcceptanceSMS',
    'scheduleMeasurementVisit',
    'updateProjectStatus'
  ],
  
  // 24h przed wizytą pomiarową
  onMeasurementReminder: [
    'sendMeasurementReminderEmail',
    'sendMeasurementReminderSMS',
    'sendMeasurementReminderWhatsApp'
  ],
  
  // Po zakończeniu projektu
  onProjectCompleted: [
    'sendCompletionEmail',
    'sendCompletionSMS',
    'sendCompletionWhatsApp',
    'sendInvoice',
    'scheduleFeedbackCall'
  ]
};
```

---

## 5. Integracja z Microsoft Calendar

### **Workflow Kalendarza**
```
[Klient akceptuje wycenę]
    ↓
[System sprawdza dostępność zespołu]
    ↓
[Automatyczne tworzenie wydarzeń]
    ↓
[Wysyłanie zaproszeń]
    ↓
[Śledzenie potwierdzeń]
    ↓
[Automatyczne przypomnienia]
```

### **Typy Wydarzeń w Kalendarzu**
```typescript
enum CalendarEventType {
  MEASUREMENT_VISIT = 'measurement_visit',
  INSTALLATION = 'installation',
  FOLLOW_UP = 'follow_up',
  PROJECT_REVIEW = 'project_review',
  CUSTOMER_MEETING = 'customer_meeting'
}
```

### **Struktura Wydarzenia**
```typescript
interface CalendarEvent {
  id: string;
  type: CalendarEventType;
  title: string;
  description: string;
  startDate: Date;
  endDate: Date;
  location: string;
  attendees: {
    email: string;
    name: string;
    role: string;
  }[];
  projectId: string;
  customerId: string;
  department: Department;
  bufferBefore: number; // minuty
  bufferAfter: number;  // minuty
  microsoftEventId?: string;
  status: 'scheduled' | 'confirmed' | 'cancelled' | 'completed';
}
```

---

## 5. Struktura Bazy Danych

### **Tabela Komunikacji**
```sql
communications (
  id, customer_id, user_id, department_id,
  communication_type, summary, notes,
  follow_up_required, follow_up_date,
  project_stage, created_at, updated_at
)
```

### **Tabela Powiadomień**
```sql
notifications (
  id, type, channel, recipient_id, recipient_email,
  recipient_phone, project_id, customer_id,
  title, message, data_json, priority, status,
  created_at, sent_at, read_at
)
```

### **Tabela Projektów**
```sql
projects (
  id, customer_id, department_id, manager_id,
  status, stage, quote_amount, start_date,
  estimated_completion, actual_completion,
  google_drive_folder_id, created_at, updated_at
)
```

### **Tabela Dokumentów Google Drive**
```sql
google_drive_documents (
  id, google_drive_id, name, type, project_id,
  customer_id, department_id, current_folder,
  previous_folder, created_by, created_at,
  last_modified, size, mime_type, permissions_json,
  status, tags_json, metadata_json
)
```

### **Tabela Wizyt**
```sql
visits (
  id, project_id, customer_id, team_id,
  visit_type, scheduled_date, actual_date,
  duration, status, notes, created_at
)
```

### **Tabela Dostępności**
```sql
availability (
  id, user_id, date, start_time, end_time,
  is_available, buffer_before, buffer_after,
  created_at
)
```

---

## 6. Interfejs Użytkownika

### **Dashboard z Powiadomieniami**
- **Panel powiadomień** w czasie rzeczywistym
- **Status projektów** z kolorowym kodowaniem
- **Kalendarz wizyt** z integracją Microsoft
- **Lista zadań** z priorytetami
- **Dokumenty Google Drive** z statusem

### **Panel Komunikacji**
- **Historia komunikacji** z klientem
- **Szablonowe wiadomości** dla każdego etapu
- **Automatyczne powiadomienia** z możliwością edycji
- **Status dostarczenia** powiadomień

### **Panel Dokumentów Google Drive**
- **Drzewo folderów** z statusem projektów
- **Wyszukiwanie dokumentów** po typie i statusie
- **Historia zmian** lokalizacji dokumentów
- **Zarządzanie uprawnieniami** użytkowników
- **Automatyczne przenoszenie** dokumentów

### **Kalendarz Wizyt**
- **Widok zespołu** z dostępnością
- **Automatyczne buforowanie** między wizytami
- **Integracja z Microsoft Calendar**
- **Powiadomienia o konfliktach**

---

## 7. Automatyzacja Workflow

### **Reguły Automatyczne**
```typescript
const workflowRules = {
  // Po dodaniu komunikacji
  onCommunicationAdded: [
    'notifyDepartment',
    'notifyManager', 
    'notifyAdmin',
    'sendCustomerConfirmation',
    'createGoogleDriveFolder'
  ],
  
  // Po akceptacji wyceny
  onQuoteAccepted: [
    'createProject',
    'scheduleMeasurement',
    'notifyTeam',
    'sendCustomerWelcome',
    'moveDocumentsToActiveProjects'
  ],
  
  // Przed wizytą pomiarową
  beforeMeasurement: [
    'sendReminder24h',
    'sendReminder1h',
    'notifyTeam'
  ],
  
  // Po zakończeniu wizyty
  afterMeasurement: [
    'updateProjectStage',
    'scheduleFollowUp',
    'notifyManager',
    'sendCustomerSummary',
    'moveDocumentsToMeasurements'
  ],
  
  // Po zakończeniu projektu
  onProjectCompleted: [
    'generateInvoice',
    'notifyAdmin',
    'sendCustomerCompletion',
    'scheduleReview',
    'moveDocumentsToCompleted'
  ],
  
  // Po zmianie lokalizacji dokumentu w Google Drive
  onDocumentMoved: [
    'detectStatusChange',
    'updateProjectStatus',
    'notifyStatusChange',
    'triggerWorkflow'
  ]
};
```

---

## 8. Raportowanie i Analityka

### **Metryki Śledzone**
- **Czas odpowiedzi** na komunikację
- **Wskaźnik konwersji** lead → projekt
- **Średni czas realizacji** projektu
- **Satysfakcja klienta** na każdym etapie
- **Wydajność zespołu** i dostępność
- **Status dokumentów** w Google Drive
- **Czas przenoszenia** dokumentów między folderami

### **Dashboardy**
- **Manager** → przegląd wszystkich projektów
- **Zespół** → zadania i harmonogram
- **Sekretarka** → komunikacja i powiadomienia
- **Administrator** → metryki i raporty
- **Google Drive** → status dokumentów i folderów

---

## 9. Bezpieczeństwo i Prywatność

### **Zabezpieczenia**
- **Szyfrowanie** wszystkich danych
- **Autoryzacja** na poziomie roli
- **Audyt** wszystkich działań
- **Backup** automatyczny
- **Google Drive API** z ograniczonymi uprawnieniami

### **Zgodność z RODO**
- **Zgody klienta** na komunikację
- **Możliwość wycofania** zgód
- **Usuwanie danych** na żądanie
- **Przezroczystość** przetwarzania
- **Kontrola dostępu** do dokumentów

---

## 10. Implementacja Techniczna

### **Backend (Node.js + TypeScript)**
- **API REST** dla wszystkich operacji
- **WebSocket** dla powiadomień w czasie rzeczywistym
- **Queue system** dla powiadomień
- **Microsoft Graph API** integracja
- **Google Drive API** integracja
- **Webhook handlers** dla Google Drive

### **Frontend (Next.js + React)**
- **Real-time updates** z WebSocket
- **Progressive Web App** funkcjonalność
- **Offline support** dla podstawowych funkcji
- **Responsive design** dla wszystkich urządzeń
- **Google Drive picker** dla dokumentów

### **Integracje Zewnętrzne**
- **Microsoft Graph API** (Calendar, Email)
- **Google Drive API** (Documents, Folders)
- **SMS Gateway** (Twilio/MessageBird)
- **WhatsApp Business API**
- **Email Service** (SendGrid/AWS SES)

---

## 11. Plan Wdrożenia

### **Faza 1: Podstawowy CRM**
- Struktura bazy danych
- Podstawowe powiadomienia
- Panel komunikacji

### **Faza 2: Workflow i Automatyzacja**
- Automatyczne powiadomienia
- Workflow projektów
- Integracja kalendarza

### **Faza 3: Google Drive Integration**
- Google Drive API setup
- Automatyczne zarządzanie folderami
- Monitoring zmian dokumentów

### **Faza 4: Zaawansowane Funkcje**
- Multi-channel notifications
- Analityka i raporty
- AI-powered insights

### **Faza 5: Optymalizacja**
- Predictive analytics
- Advanced automation
- Performance optimization 