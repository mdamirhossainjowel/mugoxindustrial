import type { MetadataRoute } from 'next';
import { locales } from '@/lib/i18n';
import { products, catList } from '@/lib/data';
import { en } from '@/lib/l/en';
import { brands } from '@/lib/brands';
import { SITE } from '@/lib/seo';
const BUILD = new Date('2026-11-24');
export default function sitemap(): MetadataRoute.Sitemap {
  const paths = ['', '/products', '/solutions', '/industries', '/about', '/resources', '/brands', '/glossary', '/contact', '/quote', '/privacy', '/terms', ...brands.map(b => `/brands/${b.slug}`), ...catList.map(c => `/products/${c.slug}`), ...products.map(p => `/products/${p.cat}/${p.slug}`), ...en.articles.map(a => `/resources/${a.slug}`)];
  return paths.flatMap(p => locales.map(l => ({ url: `${SITE}/${l}${p}`, lastModified: p.startsWith('/resources/') ? new Date(en.articles.find(a => p.endsWith(a.slug))?.date || BUILD) : BUILD, changeFrequency: 'monthly' as const, priority: p === '' ? 1 : p.split('/').length > 3 ? 0.6 : 0.8,
    alternates: { languages: { ...Object.fromEntries(locales.map(x => [x, `${SITE}/${x}${p}`])), 'x-default': `${SITE}/en${p}` } } })));
}
