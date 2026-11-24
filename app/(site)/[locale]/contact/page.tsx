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
export async function generateMetadata({ params }: P): Promise<Metadata> { const { locale } = await params; if (!isLocale(locale)) return {}; const t = dict[locale]; return meta(locale, '/contact', `${t.con_t} | MugoX Industrial`, t.con_p); }
export default async function Page({ params }: P) { const { locale } = await params; if (!isLocale(locale)) notFound(); const t = dict[locale]; const b = `/${locale}`; void b;
  return (<><PageHead eyebrow="MugoX Industrial" title={t.con_t} text={t.con_p} /><div className="w sec tight"><Crumbs items={[{ name: t.home, href: b }, { name: t.con_t }]} /><div className="grid g2"><div className="card pad"><h3>Email</h3><p><a href={`mailto:${EMAIL}`}>{EMAIL}</a></p><h3>WhatsApp</h3><p><a href={waLink("Hello MugoX Industrial")} target="_blank" rel="noopener noreferrer">+86 190 3810 7246</a></p><div className="hc"><Link className="btn p" data-quote="1" href={`${b}/quote`}>{t.n_quote}</Link><a className="btn wa" href={waLink("Hello MugoX Industrial")} target="_blank" rel="noopener noreferrer">{t.wa_btn}</a></div></div><div className="card pad"><h3>{t.n_products}</h3><p>{t.cats_p}</p><Link className="btn s" href={`${b}/products`}>{t.h_c1}</Link></div></div></div></>); }
