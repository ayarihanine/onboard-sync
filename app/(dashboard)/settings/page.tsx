'use client';

import { useAuth as useClerkAuth, useUser } from '@clerk/nextjs';
import { getClerkPublishableKey } from '@/lib/auth/config';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export default function SettingsPage() {
  const publishableKey = getClerkPublishableKey();
  const isClerkReady =
    typeof publishableKey === 'string' &&
    !publishableKey.includes('placeholder') &&
    !publishableKey.includes('xxxxxxxx') &&
    (publishableKey.startsWith('pk_test_') ||
      publishableKey.startsWith('pk_live_'));

  if (!isClerkReady) {
    return (
      <div className="space-y-6">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Settings</h2>
          <p className="text-muted-foreground">
            Configure Clerk in <code>.env</code> to unlock account settings.
          </p>
        </div>
      </div>
    );
  }

  return <ConfiguredSettingsPage />;
}

function ConfiguredSettingsPage() {
  const { isLoaded } = useClerkAuth();
  const { user } = useUser();

  if (!isLoaded) {
    return (
      <div className="space-y-6">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Settings</h2>
          <p className="text-muted-foreground">
            Manage your account and organization settings
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Settings</h2>
        <p className="text-muted-foreground">
          Manage your account and organization settings
        </p>
      </div>

      <div className="grid gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Account</CardTitle>
            <CardDescription>
              Your personal account information
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center gap-4">
              <div className="flex flex-col">
                <span className="text-sm font-medium">Email</span>
                <span className="text-sm text-muted-foreground">
                  {user?.emailAddresses[0]?.emailAddress || 'Not set'}
                </span>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex flex-col">
                <span className="text-sm font-medium">Name</span>
                <span className="text-sm text-muted-foreground">
                  {user?.firstName} {user?.lastName}
                </span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Billing</CardTitle>
            <CardDescription>
              Manage your subscription and billing
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="rounded-md bg-secondary p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Free Plan</p>
                  <p className="text-sm text-muted-foreground">
                    Up to 5 clients, basic features
                  </p>
                </div>
                <a
                  href="/settings/billing"
                  className="text-sm font-medium text-primary hover:underline"
                >
                  Upgrade
                </a>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
