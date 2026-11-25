import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { isLocale, dict } from '@/lib/i18n';
import { extra } from '@/lib/l/extra';
import { brands, brandProducts, volRange } from '@/lib/brands';
import { PageHead, Crumbs } from '@/components/ui';
import { meta } from '@/lib/seo';
type P = { params: Promise<{ locale: string }> };
export async function generateMetadata({ params }: P): Promise<Metadata> { const { locale } = await params; if (!isLocale(locale)) return {}; const x = extra[locale]; return meta(locale, '/brands', `${x.brands_t} | MugoX Industrial`, x.brands_p); }
export default async function Page({ params }: P) { const { locale } = await params; if (!isLocale(locale)) notFound(); const t = dict[locale]; const x = extra[locale];
  return (<><PageHead eyebrow="MugoX Industrial" title={x.brands_t} text={x.brands_p} /><div className="w sec tight"><Crumbs items={[{ name: t.home, href: `/${locale}` }, { name: x.brands_t }]} />
    <div className="grid g3">{brands.map(b => { const v = volRange(brandProducts(b.name)); return <Link key={b.slug} className="card pad" href={`/${locale}/brands/${b.slug}`}><div className="ico" /><h3>{b.name}</h3><p>{v.min}–{v.max} ml · {brandProducts(b.name).length}</p><span className="l">{t.explore} →</span></Link>; })}</div></div></>); }
