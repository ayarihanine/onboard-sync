import { Suspense } from 'react';
import Link from 'next/link';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { Users, GitBranch, FileCheck, Clock } from 'lucide-react';
import { getActivities, getClients, getDashboardSnapshot, getFlows } from '@/lib/mock-data';
import { cn } from '@/lib/utils/cn';

async function StatsCards() {
  const stats = getDashboardSnapshot();

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Clients</CardTitle>
          <Users className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{stats.totalClients}</div>
          <p className="text-xs text-muted-foreground">Across all active onboarding tracks</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Active Flows</CardTitle>
          <GitBranch className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{stats.activeFlows}</div>
          <p className="text-xs text-muted-foreground">Reusable templates ready for assignment</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Completed</CardTitle>
          <FileCheck className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{stats.completedClients}</div>
          <p className="text-xs text-muted-foreground">Clients fully onboarded</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">In Progress</CardTitle>
          <Clock className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{stats.inProgressClients}</div>
          <p className="text-xs text-muted-foreground">Clients currently moving through steps</p>
        </CardContent>
      </Card>
    </div>
  );
}

function StatsCardsSkeleton() {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {[...Array(4)].map((_, i) => (
        <Card key={i}>
          <CardHeader className="pb-2">
            <Skeleton className="h-4 w-24" />
          </CardHeader>
          <CardContent>
            <Skeleton className="h-8 w-16" />
            <Skeleton className="mt-2 h-3 w-20" />
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

function RecentActivity() {
  const items = getActivities();

  return (
    <Card className="col-span-3">
      <CardHeader>
        <CardTitle>Recent Activity</CardTitle>
        <CardDescription>Your latest onboarding actions</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {items.map((item) => (
          <div key={item.id} className="flex items-start justify-between gap-4 rounded-lg border p-4">
            <div className="space-y-1">
              <p className="font-medium">{item.title}</p>
              <p className="text-sm text-muted-foreground">{item.detail}</p>
            </div>
            <span
              className={cn(
                'shrink-0 rounded-full px-2 py-1 text-xs capitalize',
                item.kind === 'success' && 'bg-emerald-50 text-emerald-700',
                item.kind === 'warning' && 'bg-amber-50 text-amber-700',
                item.kind === 'info' && 'bg-blue-50 text-blue-700'
              )}
            >
              {item.timeLabel}
            </span>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}

function QuickActions() {
  const flows = getFlows().slice(0, 2);
  const clients = getClients()
    .filter((client) => client.status !== 'completed')
    .slice(0, 2);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Quick Actions</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex flex-col gap-2">
          <Link
            href="/flows/new"
            className="rounded-md border bg-secondary p-3 text-sm font-medium transition-colors hover:bg-secondary/80"
          >
            Create New Flow
          </Link>
          <Link
            href="/clients/new"
            className="rounded-md border bg-secondary p-3 text-sm font-medium transition-colors hover:bg-secondary/80"
          >
            Add New Client
          </Link>
        </div>

        <div className="space-y-2">
          <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
            Active templates
          </p>
          {flows.map((flow) => (
            <Link
              key={flow.id}
              href={`/flows/${flow.id}`}
              className="block rounded-md border p-3 text-sm hover:bg-secondary/40"
            >
              <p className="font-medium">{flow.name}</p>
              <p className="text-muted-foreground">{flow.activeClients} active clients</p>
            </Link>
          ))}
        </div>

        <div className="space-y-2">
          <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
            Needs attention
          </p>
          {clients.map((client) => (
            <Link
              key={client.id}
              href={`/clients/${client.id}`}
              className="block rounded-md border p-3 text-sm hover:bg-secondary/40"
            >
              <p className="font-medium">{client.company}</p>
              <p className="text-muted-foreground">{client.currentStepTitle}</p>
            </Link>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
        <p className="text-muted-foreground">
          Overview of your client onboarding metrics
        </p>
      </div>
      <Suspense fallback={<StatsCardsSkeleton />}>
        <StatsCards />
      </Suspense>
      <div className="grid gap-4 md:grid-cols-7">
        <RecentActivity />
        <QuickActions />
      </div>
    </div>
  );
}
