import Link from 'next/link';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

export default function NewClientPage() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Add Client</h2>
        <p className="text-muted-foreground">
          Client creation is staged next. This placeholder keeps the dashboard flow usable while the data layer is wired up.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Client Intake Setup</CardTitle>
          <CardDescription>
            Capture the client record first, then attach an onboarding flow once your workflow templates are ready.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="first-name">First name</Label>
              <Input id="first-name" placeholder="Jordan" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="last-name">Last name</Label>
              <Input id="last-name" placeholder="Lee" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" placeholder="jordan@client.com" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="company">Company</Label>
              <Input id="company" placeholder="Acme Inc." />
            </div>
          </div>

          <div className="rounded-md border bg-secondary/30 p-4 text-sm text-muted-foreground">
            Flow assignment, persistence, and invitation delivery still need backend wiring. This scaffold keeps the UX shape in place without exposing broken actions.
          </div>

          <div className="flex gap-3">
            <Button disabled>Create Client</Button>
            <Button asChild variant="outline">
              <Link href="/flows">Review Flows</Link>
            </Button>
            <Button asChild variant="ghost">
              <Link href="/clients">Back to Clients</Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
