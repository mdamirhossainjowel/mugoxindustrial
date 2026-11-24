import type { MetadataRoute } from 'next';
import { locales } from '@/lib/i18n';
import { products, catList } from '@/lib/data';
import { articles } from '@/lib/content';
import { SITE } from '@/lib/seo';
export default function sitemap(): MetadataRoute.Sitemap {
  const paths = ['', '/products', '/solutions', '/industries', '/about', '/resources', '/contact', '/quote', '/privacy', '/terms', ...catList.map(c => `/products/${c.slug}`), ...products.map(p => `/products/${p.cat}/${p.slug}`), ...articles.map(a => `/resources/${a.slug}`)];
  return paths.flatMap(p => locales.map(l => ({ url: `${SITE}/${l}${p}`, lastModified: new Date(), changeFrequency: 'monthly' as const, priority: p === '' ? 1 : p.split('/').length > 3 ? 0.6 : 0.8,
    alternates: { languages: { ...Object.fromEntries(locales.map(x => [x, `${SITE}/${x}${p}`])), 'x-default': `${SITE}/en${p}` } } })));
}
