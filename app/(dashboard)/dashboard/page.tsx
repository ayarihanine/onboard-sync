import { Suspense } from 'react';
import Link from 'next/link';
import { currentUser } from '@clerk/nextjs/server';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { Users, GitBranch, FileCheck, Clock, Plus, UserPlus } from 'lucide-react';
import { getActivities, getClients, getDashboardSnapshot, getFlows } from '@/lib/mock-data';
import { cn } from '@/lib/utils/cn';
import { Button } from '@/components/ui/button';

async function WelcomeHeader() {
  const user = await currentUser();
  const firstName = user?.firstName || 'there';

  return (
    <div className="flex flex-col gap-1">
      <h2 className="text-3xl font-bold tracking-tight">Welcome back, {firstName}!</h2>
      <p className="text-muted-foreground">
        Here's what's happening with your client onboarding today.
      </p>
    </div>
  );
}

async function StatsCards() {
  const stats = getDashboardSnapshot();

  const statItems = [
    {
      title: 'Total Clients',
      value: stats.totalClients,
      description: 'Across all active tracks',
      icon: Users,
    },
    {
      title: 'Active Flows',
      value: stats.activeFlows,
      description: 'Reusable templates',
      icon: GitBranch,
    },
    {
      title: 'Completed',
      value: stats.completedClients,
      description: 'Fully onboarded',
      icon: FileCheck,
    },
    {
      title: 'In Progress',
      value: stats.inProgressClients,
      description: 'Moving through steps',
      icon: Clock,
    },
  ];

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {statItems.map((stat) => (
        <Card key={stat.title}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
            <stat.icon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stat.value}</div>
            <p className="text-xs text-muted-foreground">{stat.description}</p>
          </CardContent>
        </Card>
      ))}
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
    <Card className="col-span-full lg:col-span-4">
      <CardHeader>
        <CardTitle>Recent Activity</CardTitle>
        <CardDescription>Your latest onboarding actions</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {items.length > 0 ? (
          items.map((item) => (
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
          ))
        ) : (
          <div className="flex flex-col items-center justify-center py-8 text-center">
            <p className="text-sm text-muted-foreground">No recent activity found.</p>
          </div>
        )}
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
    <Card className="col-span-full lg:col-span-3">
      <CardHeader>
        <CardTitle>Quick Actions</CardTitle>
        <CardDescription>Common tasks and shortcuts</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-2 gap-2">
          <Button variant="outline" className="h-auto flex-col items-start gap-1 p-4" asChild>
            <Link href="/flows/new">
              <Plus className="h-4 w-4" />
              <span>New Flow</span>
            </Link>
          </Button>
          <Button variant="outline" className="h-auto flex-col items-start gap-1 p-4" asChild>
            <Link href="/clients/new">
              <UserPlus className="h-4 w-4" />
              <span>Add Client</span>
            </Link>
          </Button>
        </div>

        <div className="space-y-3">
          <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
            Active templates
          </p>
          {flows.length > 0 ? (
            flows.map((flow) => (
              <Link
                key={flow.id}
                href={`/flows/${flow.id}`}
                className="block rounded-md border p-3 text-sm transition-colors hover:bg-secondary/40"
              >
                <p className="font-medium">{flow.name}</p>
                <p className="text-xs text-muted-foreground">{flow.activeClients} active clients</p>
              </Link>
            ))
          ) : (
            <p className="text-xs text-muted-foreground italic">No active templates.</p>
          )}
        </div>

        <div className="space-y-3">
          <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
            Needs attention
          </p>
          {clients.length > 0 ? (
            clients.map((client) => (
              <Link
                key={client.id}
                href={`/clients/${client.id}`}
                className="block rounded-md border p-3 text-sm transition-colors hover:bg-secondary/40"
              >
                <p className="font-medium">{client.company}</p>
                <p className="text-xs text-muted-foreground">{client.currentStepTitle}</p>
              </Link>
            ))
          ) : (
            <p className="text-xs text-muted-foreground italic">All caught up!</p>
          )}
        </div>
      </CardContent>
    </Card>
  );
}

export default function DashboardPage() {
  return (
    <div className="space-y-8">
      <Suspense fallback={<Skeleton className="h-14 w-64" />}>
        <WelcomeHeader />
      </Suspense>

      <Suspense fallback={<StatsCardsSkeleton />}>
        <StatsCards />
      </Suspense>

      <div className="grid gap-6 lg:grid-cols-7">
        <RecentActivity />
        <QuickActions />
      </div>
    </div>
  );
}
