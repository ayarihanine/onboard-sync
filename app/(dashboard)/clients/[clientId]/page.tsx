import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { getClientById, getFlowById } from '@/lib/mock-data';
import { formatStatusLabel, getStatusClasses } from '@/lib/ui';

interface ClientDetailPageProps {
  params: Promise<{ clientId: string }>;
}

export default async function ClientDetailPage({ params }: ClientDetailPageProps) {
  const { clientId } = await params;
  const client = getClientById(clientId);

  if (!client) {
    notFound();
  }

  const flow = getFlowById(client.flowId);

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-3xl font-bold tracking-tight">{client.company}</h2>
            <span className={`rounded-full border px-2 py-1 text-xs capitalize ${getStatusClasses(client.status)}`}>
              {formatStatusLabel(client.status)}
            </span>
          </div>
          <p className="text-muted-foreground">
            {client.firstName} {client.lastName} · {client.email}
          </p>
        </div>
        <div className="flex gap-3">
          <Button asChild>
            <Link href={`/onboarding/${client.flowId}/overview`}>Open onboarding</Link>
          </Button>
          <Button asChild variant="outline">
            <Link href="/clients">Back to clients</Link>
          </Button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>Progress</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">{client.progress}%</p>
            <div className="mt-3 h-2 rounded-full bg-secondary">
              <div className="h-2 rounded-full bg-primary" style={{ width: `${client.progress}%` }} />
            </div>
            <p className="mt-3 text-sm text-muted-foreground">{client.currentStepTitle}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Assigned flow</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <p className="font-medium">{client.flowName}</p>
            <p className="text-sm text-muted-foreground">{flow?.steps.length ?? 0} configured steps</p>
            <Link href={`/flows/${client.flowId}`} className="text-sm font-medium text-primary hover:underline">
              View template
            </Link>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Timeline</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="font-medium">{client.dueLabel}</p>
            <p className="mt-2 text-sm text-muted-foreground">
              Track blocker status, missing documents, and approval handoffs from one place.
            </p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Documents</CardTitle>
          <CardDescription>Current file state for this client onboarding.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          {client.documents.map((document) => (
            <div key={document.id} className="flex items-center justify-between rounded-lg border p-4">
              <p className="font-medium">{document.name}</p>
              <span className={`rounded-full border px-2 py-1 text-xs capitalize ${getStatusClasses(document.status)}`}>
                {formatStatusLabel(document.status)}
              </span>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
