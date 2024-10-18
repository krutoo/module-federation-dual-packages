import * as Sentry from '@sentry/browser';

Sentry.init({
  dsn: import.meta.env.SENTRY_DSN,
  release: import.meta.env.SENTRY_RELEASE,
  environment: import.meta.env.SENTRY_ENVIRONMENT,
  integrations: [Sentry.browserTracingIntegration()],
  tracesSampleRate: 1.0,
  replaysSessionSampleRate: 0.1,
  replaysOnErrorSampleRate: 1.0,
});
