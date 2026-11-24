import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { isLocale, dict, locales } from '@/lib/i18n';
import { getC } from '@/lib/loc';
import { en } from '@/lib/l/en';
import { Crumbs, JsonLd } from '@/components/ui';
import { AdSlot } from '@/components/Analytics';
import { meta, urlFor, SITE } from '@/lib/seo';
type P = { params: Promise<{ locale: string; slug: string }> };
export const dynamicParams = false;
export function generateStaticParams() { return locales.flatMap(locale => en.articles.map(a => ({ locale, slug: a.slug }))); }
export async function generateMetadata({ params }: P): Promise<Metadata> { const { locale, slug } = await params; if (!isLocale(locale)) return {}; const a = getC(locale).articles.find(x => x.slug === slug); if (!a) return {}; return meta(locale, `/resources/${slug}`, `${a.title} | MugoX Industrial`, a.intro); }
export default async function Page({ params }: P) { const { locale, slug } = await params; if (!isLocale(locale)) notFound(); const a = getC(locale).articles.find(x => x.slug === slug); if (!a) notFound(); const t = dict[locale]; const b = `/${locale}`;
  return (<div className="w sec tight"><Crumbs items={[{ name: t.home, href: b }, { name: t.res_t, href: `${b}/resources` }, { name: a.title }]} /><article className="prose"><h1>{a.title}</h1><p className="lead">{a.intro}</p>{a.body.slice(0, 1).map((x, i) => <p key={i}>{x}</p>)}<AdSlot slot={process.env.NEXT_PUBLIC_ADSENSE_SLOT} />{a.body.slice(1).map((x, i) => <p key={i}>{x}</p>)}<p><Link className="btn p" data-quote="1" href={`${b}/quote`}>{t.n_quote}</Link></p></article>
    <JsonLd data={{ '@context': 'https://schema.org', '@type': 'Article', headline: a.title, description: a.intro, datePublished: a.date, mainEntityOfPage: urlFor(locale, `/resources/${a.slug}`), publisher: { '@type': 'Organization', name: 'MugoX Industrial', logo: { '@type': 'ImageObject', url: SITE + '/logo.png' } } }} /></div>); }
