import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { isLocale, dict } from '@/lib/i18n';
import { extra } from '@/lib/l/extra';
import { products } from '@/lib/data';
import { lp } from '@/lib/loc';
import { PageHead, Crumbs } from '@/components/ui';
import { CompareView } from '@/components/extras';
import { meta } from '@/lib/seo';
type P = { params: Promise<{ locale: string }> };
export async function generateMetadata({ params }: P): Promise<Metadata> { const { locale } = await params; if (!isLocale(locale)) return {}; const m = meta(locale, '/compare', `${extra[locale].cmp_t} | MugoX Industrial`, extra[locale].cmp_empty); return { ...m, robots: { index: false, follow: true } }; }
export default async function Page({ params }: P) { const { locale } = await params; if (!isLocale(locale)) notFound(); const t = dict[locale]; const x = extra[locale];
  const items = products.filter(p => !p.soon).map(p => { const q = lp(p, locale); return { slug: q.slug, cat: q.cat, name: q.name, img: q.img, specs: q.specs, equip: q.equip }; });
  return (<><PageHead eyebrow="MugoX Industrial" title={x.cmp_t} /><div className="w sec tight"><Crumbs items={[{ name: t.home, href: `/${locale}` }, { name: x.cmp_t }]} /><CompareView items={items} x={x} l={locale} eq={t.equip} /></div></>); }
