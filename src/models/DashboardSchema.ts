// src/models/DashboardSchema.ts
import { pgTable, uuid, text, integer, decimal, timestamp, boolean, json, serial } from 'drizzle-orm/pg-core';

// Project Management Tables
export const projects = pgTable('projects', {
  id: uuid('id').defaultRandom().primaryKey(),
  organizationId: text('organization_id').notNull(), // Clerk organization
  clientName: text('client_name').notNull(),
  clientEmail: text('client_email').notNull(),
  clientPhone: text('client_phone'),
  clientAddress: text('client_address'),
  serviceType: text('service_type').notNull(), // 'kitchen' | 'bathroom' | 'other'
  projectValue: decimal('project_value', { precision: 10, scale: 2 }),
  currentStage: integer('current_stage').default(1), // 1-12
  contractFileName: text('contract_file_name'),
  onedriveFilePath: text('onedrive_file_path'),
  onedriveFileId: text('onedrive_file_id'),
  assignedInstallerId: text('assigned_installer_id'),
  branchLocation: text('branch_location'), // 'london' | 'manchester' | 'birmingham'
  measurementDate: timestamp('measurement_date'),
  quoteDate: timestamp('quote_date'),
  contractSignedDate: timestamp('contract_signed_date'),
  materialOrderDate: timestamp('material_order_date'),
  materialArrivalDate: timestamp('material_arrival_date'),
  installationDate: timestamp('installation_date'),
  completionDate: timestamp('completion_date'),
  isActive: boolean('is_active').default(true),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
});

// Project Stages Configuration
export const projectStages = pgTable('project_stages', {
  id: serial('id').primaryKey(),
  stageNumber: integer('stage_number').notNull().unique(),
  stageName: text('stage_name').notNull(),
  folderName: text('folder_name').notNull(),
  emailTemplateId: uuid('email_template_id'),
  autoAdvance: boolean('auto_advance').default(false),
  reminderDays: integer('reminder_days'),
  isActive: boolean('is_active').default(true),
});

// Email Templates
export const emailTemplates = pgTable('email_templates', {
  id: uuid('id').defaultRandom().primaryKey(),
  organizationId: text('organization_id').notNull(),
  templateName: text('template_name').notNull(),
  stageId: integer('stage_id').references(() => projectStages.id),
  subject: text('subject').notNull(),
  body: text('body').notNull(),
  variables: json('variables').$type<string[]>(), // ['CLIENT_NAME', 'INSTALLATION_DATE']
  isDefault: boolean('is_default').default(false),
  isActive: boolean('is_active').default(true),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
});

// Notification Logs
export const notifications = pgTable('notifications', {
  id: uuid('id').defaultRandom().primaryKey(),
  projectId: uuid('project_id').references(() => projects.id),
  templateId: uuid('template_id').references(() => emailTemplates.id),
  recipientEmail: text('recipient_email').notNull(),
  recipientName: text('recipient_name'),
  subject: text('subject').notNull(),
  body: text('body').notNull(),
  status: text('status').notNull(), // 'sent' | 'failed' | 'pending' | 'delivered' | 'opened'
  sentAt: timestamp('sent_at'),
  deliveredAt: timestamp('delivered_at'),
  openedAt: timestamp('opened_at'),
  clickedAt: timestamp('clicked_at'),
  errorMessage: text('error_message'),
  providerMessageId: text('provider_message_id'),
  metadata: json('metadata'),
});

// OneDrive Integration
export const onedriveIntegration = pgTable('onedrive_integration', {
  id: uuid('id').defaultRandom().primaryKey(),
  organizationId: text('organization_id').notNull(),
  accessToken: text('access_token'),
  refreshToken: text('refresh_token'),
  tokenExpiresAt: timestamp('token_expires_at'),
  driveId: text('drive_id'),
  rootFolderId: text('root_folder_id'),
  webhookSubscriptionId: text('webhook_subscription_id'),
  lastSyncAt: timestamp('last_sync_at'),
  isActive: boolean('is_active').default(true),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
});

// Project Activity Log
export const projectActivities = pgTable('project_activities', {
  id: uuid('id').defaultRandom().primaryKey(),
  projectId: uuid('project_id').references(() => projects.id),
  userId: text('user_id').notNull(), // Clerk user ID
  action: text('action').notNull(), // 'stage_changed' | 'file_moved' | 'email_sent' | 'note_added'
  description: text('description').notNull(),
  fromStage: integer('from_stage'),
  toStage: integer('to_stage'),
  metadata: json('metadata'),
  createdAt: timestamp('created_at').defaultNow(),
});

// User Preferences
export const userPreferences = pgTable('user_preferences', {
  id: uuid('id').defaultRandom().primaryKey(),
  userId: text('user_id').notNull().unique(), // Clerk user ID
  organizationId: text('organization_id').notNull(),
  dashboardView: text('dashboard_view').default('kanban'), // 'kanban' | 'list' | 'calendar'
  emailNotifications: boolean('email_notifications').default(true),
  showCompletedProjects: boolean('show_completed_projects').default(false),
  defaultProjectsPerPage: integer('default_projects_per_page').default(25),
  timezone: text('timezone').default('UTC'),
  preferences: json('preferences'),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
});
