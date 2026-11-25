const preview = process.env.VERCEL_ENV && process.env.VERCEL_ENV !== 'production';
const security = [
  { key: 'X-Content-Type-Options', value: 'nosniff' }, { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
  { key: 'X-Frame-Options', value: 'SAMEORIGIN' }, { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()' },
  { key: 'Strict-Transport-Security', value: 'max-age=63072000; includeSubDomains; preload' } ];
const nextConfig = {
  images: { formats: ['image/avif', 'image/webp'] }, poweredByHeader: false,
  async headers() { return [{ source: '/:path*', headers: preview ? [...security, { key: 'X-Robots-Tag', value: 'noindex, nofollow' }] : security }]; },
};
export default nextConfig;
