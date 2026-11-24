import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { isLocale, dict } from '@/lib/i18n';
import { products } from '@/lib/data';
import { lp, getC } from '@/lib/loc';
import Catalogue from '@/components/Catalogue';
import { PageHead, Crumbs, JsonLd } from '@/components/ui';
import { meta, urlFor } from '@/lib/seo';
type P = { params: Promise<{ locale: string }> };
export async function generateMetadata({ params }: P): Promise<Metadata> { const { locale } = await params; if (!isLocale(locale)) return {}; const t = dict[locale]; return meta(locale, '/products', `${t.n_products} | MugoX Industrial`, t.cats_p); }
export default async function Page({ params }: P) { const { locale } = await params; if (!isLocale(locale)) notFound(); const t = dict[locale];
  return (<><PageHead eyebrow="MugoX Industrial" title={t.n_products} text={t.cats_p} /><div className="w sec tight"><Crumbs items={[{ name: t.home, href: `/${locale}` }, { name: t.n_products }]} /><Catalogue items={products.map(p => lp(p, locale))} l={locale} t={t} ph={getC(locale).ph} /></div>
    <JsonLd data={{ '@context': 'https://schema.org', '@type': 'BreadcrumbList', itemListElement: [{ '@type': 'ListItem', position: 1, name: t.home, item: urlFor(locale) }, { '@type': 'ListItem', position: 2, name: t.n_products, item: urlFor(locale, '/products') }] }} /></>); }
