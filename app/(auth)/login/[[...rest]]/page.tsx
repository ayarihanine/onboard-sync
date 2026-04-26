import { SignIn } from '@clerk/nextjs';

export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <SignIn
        path="/login"
        appearance={{
          elements: {
            rootBox: 'w-full max-w-md',
            card: 'shadow-lg border-0',
          },
        }}
        signUpUrl="/signup"
        fallbackRedirectUrl="/dashboard"
      />
    </div>
  );
}
