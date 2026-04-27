'use client';

import { useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { AlertCircle, RefreshCcw } from 'lucide-react';

export default function DashboardError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error('Dashboard Error:', error);
  }, [error]);

  return (
    <div className="flex min-h-[400px] flex-col items-center justify-center rounded-lg border border-dashed p-8 text-center">
      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-destructive/10 text-destructive">
        <AlertCircle className="h-6 w-6" />
      </div>
      <h2 className="mt-4 text-xl font-semibold">Something went wrong!</h2>
      <p className="mt-2 max-w-md text-sm text-muted-foreground">
        We encountered an error while loading this section of the dashboard. This has been logged, and we're looking into it.
      </p>
      <div className="mt-6 flex gap-4">
        <Button onClick={() => reset()} variant="default">
          <RefreshCcw className="mr-2 h-4 w-4" />
          Try again
        </Button>
        <Button onClick={() => (window.location.href = '/dashboard')} variant="outline">
          Return to Dashboard
        </Button>
      </div>
      {process.env.NODE_ENV === 'development' && (
        <div className="mt-8 w-full max-w-2xl overflow-auto rounded-md bg-slate-950 p-4 text-left text-xs font-mono text-slate-50">
          <p className="mb-2 font-bold text-red-400">Error Details:</p>
          <pre>{error.message}</pre>
          {error.stack && <pre className="mt-2 opacity-50">{error.stack}</pre>}
        </div>
      )}
    </div>
  );
}
