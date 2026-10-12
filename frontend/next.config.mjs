const isDevelopment = process.env.NODE_ENV === 'development';
const isStaticExport = process.env.RUMAHFLOW_STATIC_EXPORT === '1';
const backendBase = (
  process.env.PHP_API_BASE_URL ||
  process.env.PHP_API_ORIGIN ||
  (isDevelopment ? 'http://127.0.0.1:8088' : 'https://api.buildmanagement.id/rumahflow')
).replace(/\/+$/, '');

if (!isStaticExport) {
  const upstream = new URL(backendBase);
  if (!['http:', 'https:'].includes(upstream.protocol) || upstream.username || upstream.password || upstream.search || upstream.hash) {
    throw new Error('PHP_API_BASE_URL must be an HTTP(S) base URL without credentials, query, or fragment.');
  }
}

const config = {
  ...(isStaticExport ? { output: 'export' } : {}),
  trailingSlash: true,
  // Keep POST/upload API calls on their original path without a redirect hop.
  skipTrailingSlashRedirect: true,
  images: { unoptimized: true },
  poweredByHeader: false,
  reactStrictMode: true,
  ...(!isStaticExport ? {
    async rewrites() {
      // The browser stays on the frontend origin. PHP must issue host-only
      // session cookies with Path=/ and return public image URLs as /api/… .
      return [{ source: '/api/:path*', destination: backendBase + '/api/:path*' }];
    }
  } : {})
};
export default config;
