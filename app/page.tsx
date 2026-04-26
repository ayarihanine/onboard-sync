import Link from 'next/link';

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold">OnboardSync AI</h1>
        <p className="text-muted-foreground">
          Automated client onboarding & document workflow
        </p>
        <div className="flex gap-4 justify-center pt-4">
          <Link
            href="/login"
            className="px-4 py-2 bg-primary text-primary-foreground rounded-md"
          >
            Sign In
          </Link>
          <Link
            href="/signup"
            className="px-4 py-2 border rounded-md"
          >
            Sign Up
          </Link>
        </div>
      </div>
    </div>
  );
}