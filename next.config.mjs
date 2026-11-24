const preview = process.env.VERCEL_ENV && process.env.VERCEL_ENV !== 'production';
const nextConfig = {
  images: { formats: ['image/avif', 'image/webp'] }, poweredByHeader: false,
  async headers() { return preview ? [{ source: '/:path*', headers: [{ key: 'X-Robots-Tag', value: 'noindex, nofollow' }] }] : []; },
};
export default nextConfig;
