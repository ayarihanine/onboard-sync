'use client';

import { useEffect } from 'react';
import { useClerk } from '@clerk/nextjs';
import { getClerkPublishableKey } from '@/lib/auth/config';

export default function LogoutPage() {
  const publishableKey = getClerkPublishableKey();
  const isClerkReady =
    typeof publishableKey === 'string' &&
    !publishableKey.includes('placeholder') &&
    !publishableKey.includes('xxxxxxxx') &&
    (publishableKey.startsWith('pk_test_') ||
      publishableKey.startsWith('pk_live_'));

  if (!isClerkReady) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-50">
        <p className="text-sm text-muted-foreground">
          Clerk is not configured. Nothing to sign out.
        </p>
      </div>
    );
  }

  return <ConfiguredLogoutPage />;
}

function ConfiguredLogoutPage() {
  const { signOut } = useClerk();

  useEffect(() => {
    void signOut({ redirectUrl: '/login' });
  }, [signOut]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50">
      <p className="text-sm text-muted-foreground">Signing you out...</p>
    </div>
  );
}
