import type { MetadataRoute } from 'next';
import { SITE } from '@/lib/seo';
// Only the production deployment is crawlable. Preview/development builds disallow everything and publish no sitemap.
export default function robots(): MetadataRoute.Robots {
  const env = process.env.VERCEL_ENV;
  if (env && env !== 'production') return { rules: { userAgent: '*', disallow: '/' } };
  return { rules: { userAgent: '*', allow: '/' }, sitemap: `${SITE}/sitemap.xml`, host: SITE };
}
