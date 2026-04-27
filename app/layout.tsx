import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { ClerkProvider } from '@clerk/nextjs';
import {
  getClerkFrontendApi,
  getClerkPublishableKey,
  isClerkConfigured,
} from '@/lib/auth/config';
import '@/lib/env';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'OnboardSync AI - Automated Client Onboarding',
  description:
    'Streamline your client onboarding with automated workflows, AI-powered document validation, and e-signatures.',
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const publishableKey = getClerkPublishableKey();
  const frontendApi = getClerkFrontendApi();
  const clerkConfigured = isClerkConfigured();

  if (!clerkConfigured) {
    return (
      <html lang="en">
        <body className={inter.className}>
          <div className="flex min-h-screen flex-col items-center justify-center bg-gray-50 p-4 text-center">
            <div className="w-full max-w-md rounded-xl border bg-white p-8 shadow-sm">
              <div className="mb-4 flex justify-center">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-amber-100 text-amber-600">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="h-6 w-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z"
                    />
                  </svg>
                </div>
              </div>
              <h1 className="text-xl font-bold text-gray-900">Configuration Required</h1>
              <p className="mt-3 text-sm text-gray-600">
                OnboardSync depends on <strong>Clerk</strong> for authentication, but it hasn't been configured yet.
              </p>
              <div className="mt-6 rounded-lg bg-gray-50 p-4 text-left text-xs font-mono text-gray-700">
                <p className="mb-2 font-semibold text-gray-900">Missing Environment Variables:</p>
                <ul className="list-inside list-disc space-y-1">
                  <li>NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY</li>
                  <li>CLERK_SECRET_KEY</li>
                </ul>
              </div>
              <p className="mt-6 text-xs text-gray-500">
                Please update your <code>.env</code> file with valid keys from the Clerk Dashboard and restart the development server.
              </p>
            </div>
          </div>
        </body>
      </html>
    );
  }

  return (
    <ClerkProvider
      publishableKey={publishableKey}
      frontendApi={frontendApi}
      appearance={{
        elements: {
          formButtonPrimary: 'bg-primary hover:bg-primary/90',
          card: 'shadow-lg',
        },
      }}
      signInUrl="/login"
      signUpUrl="/signup"
      afterSignInUrl="/dashboard"
      afterSignUpUrl="/dashboard"
    >
      <html lang="en">
        <body className={inter.className}>{children}</body>
      </html>
    </ClerkProvider>
  );
}
