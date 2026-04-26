import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Plus, ArrowRight } from 'lucide-react';
import { getClients } from '@/lib/mock-data';
import { formatStatusLabel, getStatusClasses } from '@/lib/ui';
import Link from 'next/link';

export default function ClientsPage() {
  const clients = getClients();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Clients</h2>
          <p className="text-muted-foreground">
            Manage your clients and track their onboarding progress
          </p>
        </div>
        <Button asChild>
          <Link href="/clients/new">
            <Plus className="mr-2 h-4 w-4" />
            Add Client
          </Link>
        </Button>
      </div>

      <div className="grid gap-4">
        {clients.map((client) => (
          <Card key={client.id}>
            <CardContent className="flex flex-col gap-4 p-6 md:flex-row md:items-center md:justify-between">
              <div className="space-y-2">
                <div className="flex flex-wrap items-center gap-2">
                  <CardTitle className="text-lg">{client.company}</CardTitle>
                  <span
                    className={`rounded-full border px-2 py-1 text-xs capitalize ${getStatusClasses(client.status)}`}
                  >
                    {formatStatusLabel(client.status)}
                  </span>
                </div>
                <p className="text-sm text-muted-foreground">
                  {client.firstName} {client.lastName} · {client.email}
                </p>
                <p className="text-sm text-muted-foreground">
                  {client.flowName} · {client.currentStepTitle} · {client.dueLabel}
                </p>
              </div>

              <div className="flex items-center gap-4">
                <div className="min-w-28">
                  <p className="text-sm font-medium">{client.progress}% complete</p>
                  <div className="mt-2 h-2 rounded-full bg-secondary">
                    <div
                      className="h-2 rounded-full bg-primary"
                      style={{ width: `${client.progress}%` }}
                    />
                  </div>
                </div>
                <Button asChild variant="outline">
                  <Link href={`/clients/${client.id}`}>
                    View
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
