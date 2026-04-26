import { redirect } from 'next/navigation';

interface OnboardingPageProps {
  params: Promise<{ flowId: string }>;
}

export default async function OnboardingPage({ params }: OnboardingPageProps) {
  const resolvedParams = await params;
  redirect(`/onboarding/${resolvedParams.flowId}/overview`);
}