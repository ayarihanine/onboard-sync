import {
  pgTable,
  uuid,
  varchar,
  text,
  timestamp,
  boolean,
  integer,
  jsonb,
  pgEnum,
} from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';

export const subscriptionTierEnum = pgEnum('subscription_tier', [
  'free',
  'starter',
  'pro',
  'agency',
]);

export const subscriptionStatusEnum = pgEnum('subscription_status', [
  'active',
  'canceled',
  'past_due',
  'trialing',
  'none',
]);

export const stepStatusEnum = pgEnum('step_status', [
  'pending',
  'in_progress',
  'completed',
  'blocked',
  'skipped',
]);

export const documentStatusEnum = pgEnum('document_status', [
  'pending',
  'uploaded',
  'processing',
  'validated',
  'rejected',
  'signed',
]);

export const organizations = pgTable('organizations', {
  id: uuid('id').defaultRandom().primaryKey(),
  clerkId: varchar('clerk_id', { length: 128 }).notNull().unique(),
  name: varchar('name', { length: 256 }).notNull(),
  slug: varchar('slug', { length: 128 }).unique(),
  logoUrl: text('logo_url'),
  subscriptionTier: subscriptionTierEnum('subscription_tier').default('free'),
  subscriptionStatus: subscriptionStatusEnum('subscription_status').default('none'),
  stripeCustomerId: varchar('stripe_customer_id', { length: 128 }),
  stripeSubscriptionId: varchar('stripe_subscription_id', { length: 128 }),
  settings: jsonb('settings').$type<{
    autoReminders: boolean;
    reminderIntervalHours: number;
    defaultAiModel: string;
  }>().default({ autoReminders: true, reminderIntervalHours: 48, defaultAiModel: 'claude-3.5-sonnet' }),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

export const users = pgTable('users', {
  id: uuid('id').defaultRandom().primaryKey(),
  clerkId: varchar('clerk_id', { length: 128 }).notNull().unique(),
  email: varchar('email', { length: 256 }).notNull(),
  firstName: varchar('first_name', { length: 128 }),
  lastName: varchar('last_name', { length: 128 }),
  organizationId: uuid('organization_id').references(() => organizations.id, { onDelete: 'cascade' }),
  role: varchar('role', { length: 32 }).default('member'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

export const onboardingFlows = pgTable('onboarding_flows', {
  id: uuid('id').defaultRandom().primaryKey(),
  organizationId: uuid('organization_id').notNull().references(() => organizations.id, { onDelete: 'cascade' }),
  name: varchar('name', { length: 256 }).notNull(),
  description: text('description'),
  steps: jsonb('steps').$type<{
    id: string;
    title: string;
    description: string;
    type: 'intake' | 'document' | 'signature' | 'payment';
    required: boolean;
    order: number;
  }[]>().notNull().default([]),
  isTemplate: boolean('is_template').default(false),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

export const clients = pgTable('clients', {
  id: uuid('id').defaultRandom().primaryKey(),
  organizationId: uuid('organization_id').notNull().references(() => organizations.id, { onDelete: 'cascade' }),
  email: varchar('email', { length: 256 }).notNull(),
  firstName: varchar('first_name', { length: 128 }).notNull(),
  lastName: varchar('last_name', { length: 128 }).notNull(),
  company: varchar('company', { length: 256 }),
  phone: varchar('phone', { length: 32 }),
  customFields: jsonb('custom_fields').$type<Record<string, string>>().default({}),
  onboardingFlowId: uuid('onboarding_flow_id').references(() => onboardingFlows.id),
  status: varchar('status', { length: 32 }).default('pending'),
  currentStepIndex: integer('current_step_index').default(0),
  completedAt: timestamp('completed_at'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

export const flowSteps = pgTable('flow_steps', {
  id: uuid('id').defaultRandom().primaryKey(),
  clientId: uuid('client_id').notNull().references(() => clients.id, { onDelete: 'cascade' }),
  flowStepId: varchar('flow_step_id', { length: 64 }).notNull(),
  title: varchar('title', { length: 256 }).notNull(),
  description: text('description'),
  stepType: varchar('step_type', { length: 32 }).notNull(),
  status: stepStatusEnum('step_status').default('pending'),
  order: integer('order').notNull(),
  data: jsonb('data').$type<Record<string, unknown>>().default({}),
  completedAt: timestamp('completed_at'),
  dueAt: timestamp('due_at'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

export const documents = pgTable('documents', {
  id: uuid('id').defaultRandom().primaryKey(),
  clientId: uuid('client_id').notNull().references(() => clients.id, { onDelete: 'cascade' }),
  flowStepId: uuid('flow_step_id').references(() => flowSteps.id, { onDelete: 'set null' }),
  name: varchar('name', { length: 256 }).notNull(),
  fileName: varchar('file_name', { length: 256 }).notNull(),
  fileType: varchar('file_type', { length: 128 }).notNull(),
  fileSize: integer('file_size').notNull(),
  storageKey: varchar('storage_key', { length: 512 }).notNull(),
  storageUrl: text('storage_url'),
  status: documentStatusEnum('document_status').default('pending'),
  aiValidationResult: jsonb('ai_validation_result').$type<{
    missing: string[];
    invalid: string[];
    suggestions: string[];
    status: 'complete' | 'partial' | 'blocked';
  }>(),
  signwellEnvelopeId: varchar('signwell_envelope_id', { length: 128 }),
  signwellStatus: varchar('signwell_status', { length: 32 }),
  signedAt: timestamp('signed_at'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

export const auditLogs = pgTable('audit_logs', {
  id: uuid('id').defaultRandom().primaryKey(),
  organizationId: uuid('organization_id').notNull().references(() => organizations.id, { onDelete: 'cascade' }),
  userId: uuid('user_id').references(() => users.id, { onDelete: 'set null' }),
  clientId: uuid('client_id').references(() => clients.id, { onDelete: 'set null' }),
  action: varchar('action', { length: 128 }).notNull(),
  entityType: varchar('entity_type', { length: 64 }).notNull(),
  entityId: uuid('entity_id'),
  metadata: jsonb('metadata').$type<Record<string, unknown>>().default({}),
  ipAddress: varchar('ip_address', { length: 45 }),
  userAgent: text('user_agent'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

export const organizationsRelations = relations(organizations, ({ many }) => ({
  users: many(users),
  onboardingFlows: many(onboardingFlows),
  clients: many(clients),
  auditLogs: many(auditLogs),
}));

export const usersRelations = relations(users, ({ one }) => ({
  organization: one(organizations, {
    fields: [users.organizationId],
    references: [organizations.id],
  }),
}));

export const onboardingFlowsRelations = relations(onboardingFlows, ({ one, many }) => ({
  organization: one(organizations, {
    fields: [onboardingFlows.organizationId],
    references: [organizations.id],
  }),
  clients: many(clients),
}));

export const clientsRelations = relations(clients, ({ one, many }) => ({
  organization: one(organizations, {
    fields: [clients.organizationId],
    references: [organizations.id],
  }),
  onboardingFlow: one(onboardingFlows, {
    fields: [clients.onboardingFlowId],
    references: [onboardingFlows.id],
  }),
  flowSteps: many(flowSteps),
  documents: many(documents),
}));

export const flowStepsRelations = relations(flowSteps, ({ one, many }) => ({
  client: one(clients, {
    fields: [flowSteps.clientId],
    references: [clients.id],
  }),
  documents: many(documents),
}));

export const documentsRelations = relations(documents, ({ one }) => ({
  client: one(clients, {
    fields: [documents.clientId],
    references: [clients.id],
  }),
  flowStep: one(flowSteps, {
    fields: [documents.flowStepId],
    references: [flowSteps.id],
  }),
}));

export const auditLogsRelations = relations(auditLogs, ({ one }) => ({
  organization: one(organizations, {
    fields: [auditLogs.organizationId],
    references: [organizations.id],
  }),
  user: one(users, {
    fields: [auditLogs.userId],
    references: [users.id],
  }),
  client: one(clients, {
    fields: [auditLogs.clientId],
    references: [clients.id],
  }),
}));

export type Organization = typeof organizations.$inferSelect;
export type NewOrganization = typeof organizations.$inferInsert;
export type User = typeof users.$inferSelect;
export type NewUser = typeof users.$inferInsert;
export type OnboardingFlow = typeof onboardingFlows.$inferSelect;
export type NewOnboardingFlow = typeof onboardingFlows.$inferInsert;
export type Client = typeof clients.$inferSelect;
export type NewClient = typeof clients.$inferInsert;
export type FlowStep = typeof flowSteps.$inferSelect;
export type NewFlowStep = typeof flowSteps.$inferInsert;
export type Document = typeof documents.$inferSelect;
export type NewDocument = typeof documents.$inferInsert;
export type AuditLog = typeof auditLogs.$inferSelect;
export type NewAuditLog = typeof auditLogs.$inferInsert;
