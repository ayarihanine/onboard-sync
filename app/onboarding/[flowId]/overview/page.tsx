import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { getClientsForFlow, getFlowById } from '@/lib/mock-data';
import { formatStatusLabel, getStatusClasses } from '@/lib/ui';

interface OnboardingOverviewPageProps {
  params: Promise<{ flowId: string }>;
}

export default async function OnboardingOverviewPage({
  params,
}: OnboardingOverviewPageProps) {
  const { flowId } = await params;
  const flow = getFlowById(flowId);

  if (!flow) {
    notFound();
  }

  const clients = getClientsForFlow(flow.id);

  return (
    <div className="min-h-screen bg-gray-50 px-6 py-10">
      <div className="mx-auto max-w-3xl space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Onboarding Overview</h1>
          <p className="text-muted-foreground">
            {flow.name} is ready for a full client-facing onboarding experience.
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>{flow.steps.length} steps configured</CardTitle>
            <CardDescription>
              This overview summarizes the active clients currently assigned to the flow and the template steps they will move through.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-3 md:grid-cols-3">
              <div className="rounded-lg border p-4">
                <p className="text-sm font-medium">Active clients</p>
                <p className="mt-2 text-sm text-muted-foreground">{clients.length}</p>
              </div>
              <div className="rounded-lg border p-4">
                <p className="text-sm font-medium">Completion rate</p>
                <p className="mt-2 text-sm text-muted-foreground">{flow.completionRate}%</p>
              </div>
              <div className="rounded-lg border p-4">
                <p className="text-sm font-medium">Average duration</p>
                <p className="mt-2 text-sm text-muted-foreground">{flow.averageCompletionDays} days</p>
              </div>
            </div>

            <div className="space-y-3">
              <p className="text-sm font-semibold">Template steps</p>
              {flow.steps.map((step) => (
                <div key={step.id} className="rounded-lg border p-4">
                  <div className="flex items-center justify-between gap-3">
                    <p className="font-medium">
                      {step.order}. {step.title}
                    </p>
                    <span className="rounded-full bg-secondary px-2 py-1 text-xs capitalize text-muted-foreground">
                      {step.type}
                    </span>
                  </div>
                  <p className="mt-2 text-sm text-muted-foreground">{step.description}</p>
                </div>
              ))}
            </div>

            <div className="space-y-3">
              <p className="text-sm font-semibold">Assigned clients</p>
              {clients.map((client) => (
                <Link
                  key={client.id}
                  href={`/clients/${client.id}`}
                  className="flex items-center justify-between rounded-lg border p-4 transition-colors hover:bg-secondary/30"
                >
                  <div>
                    <p className="font-medium">{client.company}</p>
                    <p className="text-sm text-muted-foreground">{client.currentStepTitle}</p>
                  </div>
                  <span className={`rounded-full border px-2 py-1 text-xs capitalize ${getStatusClasses(client.status)}`}>
                    {formatStatusLabel(client.status)}
                  </span>
                </Link>
              ))}
            </div>

            <div className="flex gap-3">
              <Button asChild>
                <Link href={`/flows/${flow.id}`}>View flow details</Link>
              </Button>
              <Button asChild variant="outline">
                <Link href="/dashboard">Back to Dashboard</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
