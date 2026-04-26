import { Organization, User, OnboardingFlow, Client, FlowStep, Document } from '@/lib/db/schema';

export interface AuthUser {
  id: string;
  email: string;
  firstName: string | null;
  lastName: string | null;
  organizationId: string | null;
  organization: Organization | null;
}

export interface FlowWithClient extends OnboardingFlow {
  clients: ClientWithSteps[];
}

export interface ClientWithSteps extends Client {
  flowSteps: FlowStep[];
  documents: Document[];
}

export interface StepWithDocuments extends FlowStep {
  documents: Document[];
}

export type SubscriptionTier = 'free' | 'starter' | 'pro' | 'agency';
export type StepStatus = 'pending' | 'in_progress' | 'completed' | 'blocked' | 'skipped';
export type DocumentStatus = 'pending' | 'uploaded' | 'processing' | 'validated' | 'rejected' | 'signed';

export interface ValidationResult {
  missing: string[];
  invalid: string[];
  suggestions: string[];
  status: 'complete' | 'partial' | 'blocked';
}

export interface PresignedUpload {
  uploadUrl: string;
  fileUrl: string;
  storageKey: string;
  expiresAt: Date;
}

export interface AuditAction {
  action: string;
  entityType: string;
  entityId?: string;
  metadata?: Record<string, unknown>;
}