export type FlowTemplateStep = {
  id: string;
  title: string;
  description: string;
  type: 'intake' | 'document' | 'signature' | 'payment';
  required: boolean;
  order: number;
};

export type MockFlow = {
  id: string;
  name: string;
  description: string;
  isTemplate: boolean;
  activeClients: number;
  completionRate: number;
  averageCompletionDays: number;
  steps: FlowTemplateStep[];
};

export type MockClientDocument = {
  id: string;
  name: string;
  status: 'pending' | 'uploaded' | 'processing' | 'validated' | 'rejected' | 'signed';
};

export type MockClient = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  company: string;
  flowId: string;
  flowName: string;
  status: 'pending' | 'in_progress' | 'completed' | 'blocked';
  progress: number;
  currentStepTitle: string;
  dueLabel: string;
  documents: MockClientDocument[];
};

export type MockActivity = {
  id: string;
  title: string;
  detail: string;
  timeLabel: string;
  kind: 'success' | 'warning' | 'info';
};

const flows: MockFlow[] = [
  {
    id: 'welcome-flow',
    name: 'Welcome Flow',
    description: 'Default onboarding flow for new SMB clients with basic compliance checks.',
    isTemplate: true,
    activeClients: 2,
    completionRate: 82,
    averageCompletionDays: 5,
    steps: [
      {
        id: 'intake',
        title: 'Intake questionnaire',
        description: 'Collect contact details, business profile, and onboarding goals.',
        type: 'intake',
        required: true,
        order: 1,
      },
      {
        id: 'docs',
        title: 'Document upload',
        description: 'Gather tax records, incorporation files, and ID verification.',
        type: 'document',
        required: true,
        order: 2,
      },
      {
        id: 'review',
        title: 'Compliance review',
        description: 'Validate submitted files and confirm any missing information.',
        type: 'document',
        required: true,
        order: 3,
      },
      {
        id: 'signature',
        title: 'Service agreement',
        description: 'Send the engagement letter and capture signatures.',
        type: 'signature',
        required: true,
        order: 4,
      },
    ],
  },
  {
    id: 'enterprise-rollout',
    name: 'Enterprise Rollout',
    description: 'Longer onboarding for procurement-heavy customers with stakeholder approvals.',
    isTemplate: true,
    activeClients: 1,
    completionRate: 64,
    averageCompletionDays: 11,
    steps: [
      {
        id: 'kickoff',
        title: 'Kickoff alignment',
        description: 'Confirm stakeholders, implementation owner, and rollout milestones.',
        type: 'intake',
        required: true,
        order: 1,
      },
      {
        id: 'security',
        title: 'Security questionnaire',
        description: 'Complete procurement and vendor security documentation.',
        type: 'document',
        required: true,
        order: 2,
      },
      {
        id: 'msa',
        title: 'MSA signature',
        description: 'Send MSA and legal approvals for signature.',
        type: 'signature',
        required: true,
        order: 3,
      },
      {
        id: 'billing',
        title: 'Billing activation',
        description: 'Collect billing contacts and payment approval.',
        type: 'payment',
        required: false,
        order: 4,
      },
    ],
  },
  {
    id: 'partner-activation',
    name: 'Partner Activation',
    description: 'Faster activation flow for agency and channel partners.',
    isTemplate: true,
    activeClients: 1,
    completionRate: 91,
    averageCompletionDays: 3,
    steps: [
      {
        id: 'partner-profile',
        title: 'Partner profile',
        description: 'Capture partner capabilities, market focus, and contacts.',
        type: 'intake',
        required: true,
        order: 1,
      },
      {
        id: 'brand-assets',
        title: 'Brand assets',
        description: 'Upload logo pack, messaging, and co-selling assets.',
        type: 'document',
        required: false,
        order: 2,
      },
      {
        id: 'agreement',
        title: 'Partner agreement',
        description: 'Finalize contract signature and launch checklist.',
        type: 'signature',
        required: true,
        order: 3,
      },
    ],
  },
];

const clients: MockClient[] = [
  {
    id: 'acme-industries',
    firstName: 'Jordan',
    lastName: 'Lee',
    email: 'jordan@acme-industries.com',
    company: 'Acme Industries',
    flowId: 'enterprise-rollout',
    flowName: 'Enterprise Rollout',
    status: 'in_progress',
    progress: 50,
    currentStepTitle: 'MSA signature',
    dueLabel: 'Due in 2 days',
    documents: [
      { id: 'acme-security', name: 'Security questionnaire', status: 'validated' },
      { id: 'acme-msa', name: 'MSA draft', status: 'uploaded' },
    ],
  },
  {
    id: 'northstar-agency',
    firstName: 'Priya',
    lastName: 'Shah',
    email: 'priya@northstar.agency',
    company: 'Northstar Agency',
    flowId: 'partner-activation',
    flowName: 'Partner Activation',
    status: 'completed',
    progress: 100,
    currentStepTitle: 'Completed',
    dueLabel: 'Completed yesterday',
    documents: [
      { id: 'northstar-brand', name: 'Brand assets zip', status: 'validated' },
      { id: 'northstar-agreement', name: 'Partner agreement', status: 'signed' },
    ],
  },
  {
    id: 'summit-finance',
    firstName: 'Ethan',
    lastName: 'Cole',
    email: 'ethan@summit-finance.io',
    company: 'Summit Finance',
    flowId: 'welcome-flow',
    flowName: 'Welcome Flow',
    status: 'pending',
    progress: 25,
    currentStepTitle: 'Document upload',
    dueLabel: 'Waiting on client',
    documents: [
      { id: 'summit-w9', name: 'W-9', status: 'pending' },
      { id: 'summit-incorp', name: 'Certificate of incorporation', status: 'pending' },
    ],
  },
  {
    id: 'bright-path-health',
    firstName: 'Maya',
    lastName: 'Torres',
    email: 'maya@brightpath.health',
    company: 'Bright Path Health',
    flowId: 'welcome-flow',
    flowName: 'Welcome Flow',
    status: 'blocked',
    progress: 65,
    currentStepTitle: 'Compliance review',
    dueLabel: 'Blocked by missing ID verification',
    documents: [
      { id: 'bright-tax', name: 'Tax registration', status: 'validated' },
      { id: 'bright-id', name: 'Director ID verification', status: 'rejected' },
    ],
  },
];

const activities: MockActivity[] = [
  {
    id: 'activity-1',
    title: 'Northstar Agency completed onboarding',
    detail: 'Partner agreement signed and activation handoff sent to sales.',
    timeLabel: '14 minutes ago',
    kind: 'success',
  },
  {
    id: 'activity-2',
    title: 'Acme Industries uploaded the MSA draft',
    detail: 'Legal review can begin as soon as counter-signature routing is configured.',
    timeLabel: '1 hour ago',
    kind: 'info',
  },
  {
    id: 'activity-3',
    title: 'Bright Path Health requires follow-up',
    detail: 'Director ID verification was rejected because the scan is expired.',
    timeLabel: '3 hours ago',
    kind: 'warning',
  },
];

export function getFlows() {
  return flows;
}

export function getClients() {
  return clients;
}

export function getActivities() {
  return activities;
}

export function getFlowById(flowId: string) {
  return flows.find((flow) => flow.id === flowId);
}

export function getClientById(clientId: string) {
  return clients.find((client) => client.id === clientId);
}

export function getClientsForFlow(flowId: string) {
  return clients.filter((client) => client.flowId === flowId);
}

export function getDashboardSnapshot() {
  const totalClients = clients.length;
  const activeFlows = flows.length;
  const completedClients = clients.filter((client) => client.status === 'completed').length;
  const inProgressClients = clients.filter((client) => client.status === 'in_progress').length;

  return {
    totalClients,
    activeFlows,
    completedClients,
    inProgressClients,
  };
}
