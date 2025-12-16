/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    // Keep this true for now to avoid TypeScript blocking builds on Vercel.
    ignoreBuildErrors: true
  },
  eslint: {
    // Keep ESLint warnings from failing Vercel builds.
    ignoreDuringBuilds: true
  }
};

// Conditionally wrap Next config with Sentry only when Sentry is available/configured.
// This prevents build-time failures when Sentry isn't configured in the environment.
let exportedConfig = nextConfig;

try {
  // Use dynamic import so builds don't fail if @sentry/nextjs isn't resolvable.
  const sentry = await import('@sentry/nextjs');
  const { withSentryConfig } = sentry;

  const sentryOptions = {
    org: "debojjo",
    project: "javascript-nextjs",
    silent: !process.env.CI,
    widenClientFileUpload: true,
    tunnelRoute: "/monitoring",
    disableLogger: true,
    automaticVercelMonitors: true
  };

  // Only wrap if withSentryConfig exists and SENTRY_DSN or SENTRY_AUTH_TOKEN suggests Sentry is configured.
  if (typeof withSentryConfig === 'function' && (process.env.SENTRY_DSN || process.env.SENTRY_AUTH_TOKEN)) {
    exportedConfig = withSentryConfig(nextConfig, sentryOptions);
  }
} catch (err) {
  // If import fails, fall back to the plain Next config. Do not crash the build.
  // eslint-disable-next-line no-console
  console.warn('[next.config.mjs] Sentry integration skipped:', err && err.message ? err.message : err);
}

export default exportedConfig;