import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { isLocale, dict, locales } from '@/lib/i18n';
import { catList, inCat } from '@/lib/data';
import { getC } from '@/lib/loc';
import { Card, PageHead, Crumbs, JsonLd } from '@/components/ui';
import { extra } from '@/lib/l/extra';
import { FAQ } from '@/components/FAQ';
import { meta, urlFor, waLink } from '@/lib/seo';
type P = { params: Promise<{ locale: string; category: string }> };
export const dynamicParams = false;
export function generateStaticParams() { return locales.flatMap(locale => catList.map(c => ({ locale, category: c.slug }))); }
export async function generateMetadata({ params }: P): Promise<Metadata> { const { locale, category } = await params; const c = catList.find(x => x.slug === category); if (!isLocale(locale) || !c) return {}; const t = dict[locale]; return meta(locale, `/products/${category}`, `${t[c.key]} | MugoX Industrial`, t[c.dk], c.img ? `/images/${c.img}.webp` : '/og.png'); }
export default async function Page({ params }: P) { const { locale, category } = await params; const c = catList.find(x => x.slug === category); if (!isLocale(locale) || !c) notFound(); const t = dict[locale]; const items = inCat(c.slug);
  return (<><PageHead eyebrow={t.n_products} title={t[c.key]} text={t[c.dk]} /><div className="w sec tight"><Crumbs items={[{ name: t.home, href: `/${locale}` }, { name: t.n_products, href: `/${locale}/products` }, { name: t[c.key] }]} />
    <div className="prose"><p>{getC(locale).catLong[c.slug]}</p></div>
    <div className="grid g3 mt">{items.map(p => <Card key={p.slug} p={p} l={locale} t={t} />)}</div>
    <FAQ x={extra[locale]} />
    <div className="cta mt"><h2>{t.final_t}</h2><div className="hc c"><Link className="btn s" data-quote="1" href={`/${locale}/quote?cat=${c.slug}`}>{t.n_quote}</Link><a className="btn wa" href={waLink(`Hello MugoX Industrial, I am interested in: ${c.slug}`)} target="_blank" rel="noopener noreferrer">{t.wa_btn}</a></div></div></div>
    <JsonLd data={{ '@context': 'https://schema.org', '@type': 'BreadcrumbList', itemListElement: [{ '@type': 'ListItem', position: 1, name: t.home, item: urlFor(locale) }, { '@type': 'ListItem', position: 2, name: t.n_products, item: urlFor(locale, '/products') }, { '@type': 'ListItem', position: 3, name: t[c.key], item: urlFor(locale, `/products/${c.slug}`) }] }} /></>); }
