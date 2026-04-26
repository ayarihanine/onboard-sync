import { SignUp } from '@clerk/nextjs';

export default function SignupPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <SignUp
        path="/signup"
        appearance={{
          elements: {
            rootBox: 'w-full max-w-md',
            card: 'shadow-lg border-0',
          },
        }}
        signInUrl="/login"
        fallbackRedirectUrl="/dashboard"
      />
    </div>
  );
}
