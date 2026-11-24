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
export async function generateMetadata({ params }: P): Promise<Metadata> { const { locale } = await params; if (!isLocale(locale)) return {}; const t = dict[locale]; return meta(locale, '/terms', `${t.term_t} | MugoX Industrial`, t.term_t); }
export default async function Page({ params }: P) { const { locale } = await params; if (!isLocale(locale)) notFound(); const t = dict[locale]; const b = `/${locale}`; void b; const c = getC(locale);
  return (<><PageHead eyebrow="MugoX Industrial" title={t.term_t} text={t.term_t} /><div className="w sec tight"><Crumbs items={[{ name: t.home, href: b }, { name: t.term_t }]} /><div className="prose">{c.terms.map((x, i) => <p key={i}>{x}</p>)}</div></div></>); }
