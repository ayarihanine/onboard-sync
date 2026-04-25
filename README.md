# OnboardSync AI

Automated client onboarding & document workflow platform built with Next.js, TypeScript, and modern web technologies.

## Features

- **Multi-tenant Architecture**: Organizations can manage their own clients and onboarding flows
- **Customizable Onboarding Flows**: Create reusable templates with steps for intake forms, document uploads, signatures, and payments
- **Document Management**: Upload, process, and validate client documents
- **Electronic Signatures**: Integration with SignWell for secure document signing
- **Payment Processing**: Stripe integration for handling payments during onboarding
- **AI-Powered Automation**: Leverage AI for workflow automation and insights
- **Real-time Dashboard**: Monitor client progress, active flows, and completion rates
- **Role-based Access**: Different permissions for organization members
- **Webhook Support**: Handle external integrations via webhooks
- **Email Notifications**: Automated emails using Resend

## Tech Stack

- **Frontend**: Next.js 15, React 19, TypeScript
- **Styling**: Tailwind CSS, Radix UI components
- **Authentication**: Clerk
- **Database**: PostgreSQL with Drizzle ORM
- **Payments**: Stripe
- **Signatures**: SignWell
- **Workflows**: Inngest
- **Email**: Resend
- **Storage**: AWS S3
- **Analytics**: PostHog
- **Error Tracking**: Sentry
- **Deployment**: Vercel

## Getting Started

### Prerequisites

- Node.js 18+
- PostgreSQL database (or Neon/Supabase)
- Clerk account for authentication
- Stripe account for payments
- SignWell account for signatures
- AWS S3 bucket for file storage
- Resend account for emails

### Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd onboard-sync
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables:
   Create a `.env.local` file with the following variables:
   ```env
   # Database
   DATABASE_URL=postgresql://...

   # Clerk
   NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=...
   CLERK_SECRET_KEY=...
   NEXT_PUBLIC_CLERK_SIGN_IN_URL=/login
   NEXT_PUBLIC_CLERK_SIGN_UP_URL=/signup
   NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/dashboard
   NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/dashboard

   # Stripe
   STRIPE_PUBLISHABLE_KEY=...
   STRIPE_SECRET_KEY=...
   STRIPE_WEBHOOK_SECRET=...

   # SignWell
   SIGNWELL_API_KEY=...

   # AWS S3
   AWS_ACCESS_KEY_ID=...
   AWS_SECRET_ACCESS_KEY=...
   AWS_S3_BUCKET_NAME=...

   # Resend
   RESEND_API_KEY=...

   # Inngest
   INNGEST_SIGNING_KEY=...
   INNGEST_EVENT_KEY=...

   # PostHog
   NEXT_PUBLIC_POSTHOG_KEY=...
   NEXT_PUBLIC_POSTHOG_HOST=...

   # Sentry
   SENTRY_DSN=...
   ```

4. Set up the database:
   ```bash
   npm run db:push
   npm run db:migrate
   ```

5. Run the development server:
   ```bash
   npm run dev
   ```

   Open [http://localhost:3000](http://localhost:3000) in your browser.

## Database Schema

The application uses PostgreSQL with the following main entities:

- **Organizations**: Multi-tenant structure
- **Users**: Organization members with roles
- **Onboarding Flows**: Reusable templates with steps
- **Clients**: Individuals going through onboarding
- **Documents**: Files uploaded during onboarding
- **Signatures**: Electronic signature requests
- **Payments**: Stripe payment records

## Usage

### Creating an Organization

1. Sign up for an account
2. Create your organization profile
3. Set up subscription (Stripe integration)

### Building Onboarding Flows

1. Navigate to the Flows section
2. Create a new flow or use a template
3. Add steps: intake forms, document uploads, signatures, payments
4. Configure AI automation rules

### Managing Clients

1. Add clients to your organization
2. Assign them to onboarding flows
3. Monitor progress in the dashboard
4. Handle document reviews and signatures

## Deployment

The application is configured for deployment on Vercel:

1. Connect your repository to Vercel
2. Set environment variables in Vercel dashboard
3. Deploy automatically on push to main branch

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Run tests and linting
5. Submit a pull request

## License

This project is private and proprietary.# onboard-sync
