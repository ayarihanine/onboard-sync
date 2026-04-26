export function getClerkPublishableKey() {
  return process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY;
}

export function getClerkFrontendApi() {
  return process.env.NEXT_PUBLIC_CLERK_FRONTEND_API;
}

export function isClerkConfigured() {
  const key = getClerkPublishableKey();

  if (!key) {
    return false;
  }

  if (key.includes('placeholder') || key.includes('xxxxxxxx')) {
    return false;
  }

  return key.startsWith('pk_test_') || key.startsWith('pk_live_');
}
