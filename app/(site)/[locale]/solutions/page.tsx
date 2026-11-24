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
export async function generateMetadata({ params }: P): Promise<Metadata> { const { locale } = await params; if (!isLocale(locale)) return {}; const t = dict[locale]; return meta(locale, '/solutions', `${t.sol_t} | MugoX Industrial`, t.sol_p); }
export default async function Page({ params }: P) { const { locale } = await params; if (!isLocale(locale)) notFound(); const t = dict[locale]; const b = `/${locale}`; void b;
  return (<><PageHead eyebrow="MugoX Industrial" title={t.sol_t} text={t.sol_p} /><div className="w sec tight"><Crumbs items={[{ name: t.home, href: b }, { name: t.sol_t }]} /><div className="grid g3">{solutions.map(([h, d]) => <div className="card pad" key={h}><div className="ico" /><h3>{h}</h3><p>{d}</p></div>)}</div><h2 className="mt">Our process</h2><ol className="steps">{process.map(x => <li key={x}>{x}</li>)}</ol><p><Link className="btn p" data-quote="1" href={`${b}/quote?cat=industrial-components`}>{t.n_quote}</Link></p></div></>); }
