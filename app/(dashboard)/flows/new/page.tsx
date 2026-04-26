import Link from 'next/link';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

export default function NewFlowPage() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Create Flow</h2>
        <p className="text-muted-foreground">
          Flow creation UI is not finished yet. This page provides a valid route and the next obvious navigation path.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Flow Builder</CardTitle>
          <CardDescription>
            Define a reusable onboarding template before assigning it to clients.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="flow-name">Flow name</Label>
            <Input id="flow-name" placeholder="Enterprise onboarding" />
          </div>

          <div className="space-y-3 rounded-md border p-4">
            <div>
              <p className="font-medium">Suggested steps</p>
              <p className="text-sm text-muted-foreground">
                Start with a simple default sequence, then expand it once persistence is connected.
              </p>
            </div>
            <div className="grid gap-2 text-sm text-muted-foreground">
              <div className="rounded bg-secondary/40 px-3 py-2">1. Intake questionnaire</div>
              <div className="rounded bg-secondary/40 px-3 py-2">2. Document collection</div>
              <div className="rounded bg-secondary/40 px-3 py-2">3. Validation review</div>
              <div className="rounded bg-secondary/40 px-3 py-2">4. Signature request</div>
            </div>
          </div>

          <div className="flex gap-3">
            <Button disabled>Create Flow</Button>
            <Button asChild variant="outline">
              <Link href="/flows">Back to Flows</Link>
            </Button>
            <Button asChild variant="ghost">
              <Link href="/dashboard">Go to Dashboard</Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
