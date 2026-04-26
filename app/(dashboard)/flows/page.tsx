import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Plus, GitBranch, ArrowRight } from 'lucide-react';
import { getFlows } from '@/lib/mock-data';
import Link from 'next/link';

export default function FlowsPage() {
  const flows = getFlows();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Onboarding Flows</h2>
          <p className="text-muted-foreground">
            Create and manage your client onboarding workflows
          </p>
        </div>
        <Button asChild>
          <Link href="/flows/new">
            <Plus className="mr-2 h-4 w-4" />
            Create Flow
          </Link>
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {flows.map((flow) => (
          <Card key={flow.id} className="transition-shadow hover:shadow-md">
            <CardHeader className="space-y-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-base">{flow.name}</CardTitle>
                <span className="rounded-full bg-secondary px-2 py-1 text-xs text-muted-foreground">
                  {flow.isTemplate ? 'Template' : 'Custom'}
                </span>
              </div>
              <CardDescription>{flow.description}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-3 text-sm">
                <div className="rounded-md bg-secondary/40 p-3">
                  <p className="text-muted-foreground">Steps</p>
                  <p className="font-semibold">{flow.steps.length}</p>
                </div>
                <div className="rounded-md bg-secondary/40 p-3">
                  <p className="text-muted-foreground">Active clients</p>
                  <p className="font-semibold">{flow.activeClients}</p>
                </div>
                <div className="rounded-md bg-secondary/40 p-3">
                  <p className="text-muted-foreground">Completion rate</p>
                  <p className="font-semibold">{flow.completionRate}%</p>
                </div>
                <div className="rounded-md bg-secondary/40 p-3">
                  <p className="text-muted-foreground">Avg. duration</p>
                  <p className="font-semibold">{flow.averageCompletionDays} days</p>
                </div>
              </div>

              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <GitBranch className="h-4 w-4" />
                <span>{flow.steps[0]?.title}</span>
              </div>

              <Button asChild variant="outline" className="w-full">
                <Link href={`/flows/${flow.id}`}>
                  Open flow
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
