import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { isLocale, dict } from '@/lib/i18n';
import { aboutBody, solutions, process, indDetails, privacy, terms } from '@/lib/content';
import { PageHead, Crumbs } from '@/components/ui';
import RFQForm from '@/components/RFQForm';
import { meta, waLink, EMAIL } from '@/lib/seo';
void [aboutBody, solutions, process, indDetails, privacy, terms, Link, RFQForm, waLink, EMAIL];
type P = { params: Promise<{ locale: string }> };
export async function generateMetadata({ params }: P): Promise<Metadata> { const { locale } = await params; if (!isLocale(locale)) return {}; const t = dict[locale]; return meta(locale, '/privacy', `${t.priv_t} | MugoX Industrial`, t.priv_t); }
export default async function Page({ params }: P) { const { locale } = await params; if (!isLocale(locale)) notFound(); const t = dict[locale]; const b = `/${locale}`; void b;
  return (<><PageHead eyebrow="MugoX Industrial" title={t.priv_t} text={t.priv_t} /><div className="w sec tight"><Crumbs items={[{ name: t.home, href: b }, { name: t.priv_t }]} /><div className="prose">{privacy.map((x, i) => <p key={i}>{x}</p>)}</div></div></>); }
