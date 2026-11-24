import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { isLocale, dict } from '@/lib/i18n';
import { getC } from '@/lib/loc';
import { PageHead, Crumbs } from '@/components/ui';
import RFQForm from '@/components/RFQForm';
import { meta, waLink, EMAIL } from '@/lib/seo';
void [Link, RFQForm, waLink, EMAIL];
type P = { params: Promise<{ locale: string }> };
export async function generateMetadata({ params }: P): Promise<Metadata> { const { locale } = await params; if (!isLocale(locale)) return {}; const t = dict[locale]; return meta(locale, '/industries', `${t.n_industries} | MugoX Industrial`, t.indp_p); }
export default async function Page({ params }: P) { const { locale } = await params; if (!isLocale(locale)) notFound(); const t = dict[locale]; const b = `/${locale}`; void b; const c = getC(locale);
  return (<><PageHead eyebrow="MugoX Industrial" title={t.n_industries} text={t.indp_p} /><div className="w sec tight"><Crumbs items={[{ name: t.home, href: b }, { name: t.n_industries }]} /><div className="grid g3">{c.ind.map((d, i) => <div className="card pad" key={i}><div className="ico" /><h3>{[t.i1, t.i2, t.i3, t.i4, t.i5, t.i6, t.i7][i]}</h3><p>{d}</p></div>)}</div></div></>); }
