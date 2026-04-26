export function getStatusClasses(status: string) {
  switch (status) {
    case 'completed':
    case 'validated':
    case 'signed':
      return 'bg-emerald-50 text-emerald-700 border-emerald-200';
    case 'in_progress':
    case 'processing':
    case 'uploaded':
      return 'bg-blue-50 text-blue-700 border-blue-200';
    case 'blocked':
    case 'rejected':
      return 'bg-rose-50 text-rose-700 border-rose-200';
    default:
      return 'bg-slate-50 text-slate-700 border-slate-200';
  }
}

export function formatStatusLabel(status: string) {
  return status.replace(/_/g, ' ');
}
