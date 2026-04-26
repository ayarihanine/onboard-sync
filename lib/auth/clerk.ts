import { clerkClient } from '@clerk/nextjs/server';

export async function getClerkClient() {
  return await clerkClient();
}

export function getOrganizationId(headers: Headers): string | null {
  const organizationId = headers.get('x-org-id');
  return organizationId;
}
