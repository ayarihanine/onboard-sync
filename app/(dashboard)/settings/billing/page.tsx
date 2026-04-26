import Link from 'next/link';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

export default function BillingPage() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Billing</h2>
        <p className="text-muted-foreground">
          Subscription management is not wired up yet. This page prevents broken navigation and marks the intended billing surface.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Plan Management</CardTitle>
          <CardDescription>
            Stripe checkout, plan upgrades, and invoice history still need to be connected.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4 md:grid-cols-3">
            {[
              { name: 'Free', detail: '5 clients, core workflow tracking' },
              { name: 'Starter', detail: 'Expanded client volume and reminders' },
              { name: 'Pro', detail: 'Automation, analytics, and e-signatures' },
            ].map((plan) => (
              <div key={plan.name} className="rounded-lg border p-4">
                <p className="font-medium">{plan.name}</p>
                <p className="mt-2 text-sm text-muted-foreground">{plan.detail}</p>
              </div>
            ))}
          </div>

          <div className="flex gap-3">
            <Button disabled>Upgrade Plan</Button>
            <Button asChild variant="outline">
              <Link href="/settings">Back to Settings</Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
