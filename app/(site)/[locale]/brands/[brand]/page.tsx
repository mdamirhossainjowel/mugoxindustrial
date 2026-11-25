import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { isLocale, dict, locales } from '@/lib/i18n';
import { extra } from '@/lib/l/extra';
import { getC } from '@/lib/loc';
import { brands, brandProducts, volRange } from '@/lib/brands';
import { Card, PageHead, Crumbs, JsonLd } from '@/components/ui';
import { FAQ, Checklist } from '@/components/FAQ';
import { meta, urlFor, waLink } from '@/lib/seo';
type P = { params: Promise<{ locale: string; brand: string }> };
export const dynamicParams = false;
export function generateStaticParams() { return locales.flatMap(locale => brands.map(b => ({ locale, brand: b.slug }))); }
const txt = (s: string, b: string, v: { min: number; max: number }) => s.replace(/\{b\}/g, b).replace('{min}', String(v.min)).replace('{max}', String(v.max));
export async function generateMetadata({ params }: P): Promise<Metadata> { const { locale, brand } = await params; const b = brands.find(x => x.slug === brand); if (!isLocale(locale) || !b) return {}; const x = extra[locale]; const v = volRange(brandProducts(b.name)); return meta(locale, `/brands/${b.slug}`, `${txt(x.brand_h, b.name, v)} | MugoX`, txt(x.brand_p, b.name, v)); }
export default async function Page({ params }: P) { const { locale, brand } = await params; const b = brands.find(x => x.slug === brand); if (!isLocale(locale) || !b) notFound(); const t = dict[locale]; const x = extra[locale]; const list = brandProducts(b.name); const v = volRange(list);
  return (<><PageHead eyebrow={x.brands_t} title={txt(x.brand_h, b.name, v)} text={txt(x.brand_p, b.name, v)} /><div className="w sec tight"><Crumbs items={[{ name: t.home, href: `/${locale}` }, { name: x.brands_t, href: `/${locale}/brands` }, { name: b.name }]} />
    <div className="grid g3">{list.map(p => <Card key={p.slug} p={p} l={locale} t={t} />)}</div>
    <div className="grid g2 mt"><Checklist x={x} /><div className="cta"><h2>{t.final_t}</h2><div className="hc c"><Link className="btn s" data-quote="1" href={`/${locale}/quote?cat=pet-blow-moulds`}>{t.n_quote}</Link><a className="btn wa" href={waLink(`Hello MugoX Industrial, I am looking for ${b.name} blow moulds.`)} target="_blank" rel="noopener noreferrer">{t.wa_btn}</a></div></div></div>
    <FAQ x={x} /><p className="note">{getC(locale).terms[3]}</p></div>
    <JsonLd data={{ '@context': 'https://schema.org', '@type': 'ItemList', name: txt(x.brand_h, b.name, v), itemListElement: list.map((p, i) => ({ '@type': 'ListItem', position: i + 1, url: urlFor(locale, `/products/${p.cat}/${p.slug}`) })) }} /></>); }
