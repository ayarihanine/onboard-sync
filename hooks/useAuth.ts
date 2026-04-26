'use client';

import { useAuth as useClerkAuth, useUser } from '@clerk/nextjs';
import { getClerkPublishableKey } from '@/lib/auth/config';

export function useAuth() {
  const publishableKey = getClerkPublishableKey();
  const isConfigured =
    typeof publishableKey === 'string' &&
    !publishableKey.includes('placeholder') &&
    !publishableKey.includes('xxxxxxxx') &&
    (publishableKey.startsWith('pk_test_') ||
      publishableKey.startsWith('pk_live_'));

  if (!isConfigured) {
    return {
      userId: null,
      sessionId: null,
      getToken: async () => null,
      isLoaded: true,
      user: null,
    };
  }

  const { userId, sessionId, getToken, isLoaded } = useClerkAuth();
  const { user, isLoaded: isUserLoaded } = useUser();

  return {
    userId,
    sessionId,
    getToken,
    isLoaded: isLoaded && isUserLoaded,
    user,
  };
}
