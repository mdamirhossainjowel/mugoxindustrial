import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { isLocale, dict } from '@/lib/i18n';
import { getC } from '@/lib/loc';
import { PageHead, Crumbs } from '@/components/ui';
import { meta } from '@/lib/seo';
type P = { params: Promise<{ locale: string }> };
export async function generateMetadata({ params }: P): Promise<Metadata> { const { locale } = await params; if (!isLocale(locale)) return {}; const t = dict[locale]; return meta(locale, '/resources', `${t.res_t} | MugoX Industrial`, t.res_p); }
export default async function Page({ params }: P) { const { locale } = await params; if (!isLocale(locale)) notFound(); const t = dict[locale]; const b = `/${locale}`;
  return (<><PageHead eyebrow="MugoX Industrial" title={t.res_t} text={t.res_p} /><div className="w sec tight"><Crumbs items={[{ name: t.home, href: b }, { name: t.res_t }]} /><div className="grid g3">{getC(locale).articles.map(a => <article className="card pad" key={a.slug}><h3><Link href={`${b}/resources/${a.slug}`}>{a.title}</Link></h3><p>{a.intro}</p><Link className="l" href={`${b}/resources/${a.slug}`}>{t.read} →</Link></article>)}</div></div></>); }
