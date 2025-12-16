import * as Sentry from "@sentry/nextjs";

Sentry.init({
  dsn: "https://64f4ddea1bdf6cd5ae2a48158f429d87@o4510216658681856.ingest.de.sentry.io/4510216669036624",
  // Guard the optional replay integration in case the runtime doesn't expose it.
  integrations: [
    ...(typeof (Sentry as any).replayIntegration === 'function' ? [(Sentry as any).replayIntegration()] : []),
  ],
  // Session Replay
  replaysSessionSampleRate: 0.1, // This sets the sample rate at 10%. You may want to change it to 100% while in development and then sample at a lower rate in production.
  replaysOnErrorSampleRate: 1.0, // If you're not already sampling the entire session, change the sample rate to 100% when sampling sessions where errors occur.
});