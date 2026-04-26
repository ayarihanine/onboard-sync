import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { getClientsForFlow, getFlowById } from '@/lib/mock-data';
import { formatStatusLabel, getStatusClasses } from '@/lib/ui';

interface FlowDetailPageProps {
  params: Promise<{ flowId: string }>;
}

export default async function FlowDetailPage({ params }: FlowDetailPageProps) {
  const { flowId } = await params;
  const flow = getFlowById(flowId);

  if (!flow) {
    notFound();
  }

  const clients = getClientsForFlow(flow.id);

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">{flow.name}</h2>
          <p className="text-muted-foreground">{flow.description}</p>
        </div>
        <div className="flex gap-3">
          <Button asChild>
            <Link href={`/onboarding/${flow.id}/overview`}>Open onboarding overview</Link>
          </Button>
          <Button asChild variant="outline">
            <Link href="/flows">Back to flows</Link>
          </Button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>Template metrics</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <p className="text-3xl font-bold">{flow.completionRate}%</p>
            <p className="text-sm text-muted-foreground">Completion rate across active clients</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Average duration</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <p className="text-3xl font-bold">{flow.averageCompletionDays}d</p>
            <p className="text-sm text-muted-foreground">Average time to move through the workflow</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Assigned clients</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <p className="text-3xl font-bold">{clients.length}</p>
            <p className="text-sm text-muted-foreground">Clients currently using this template</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Workflow steps</CardTitle>
          <CardDescription>Reusable sequence for this onboarding template.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
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
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Clients in this flow</CardTitle>
          <CardDescription>Current live accounts using this onboarding template.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
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
        </CardContent>
      </Card>
    </div>
  );
}
