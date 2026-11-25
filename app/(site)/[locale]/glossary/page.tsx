import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { isLocale, dict } from '@/lib/i18n';
import { extra } from '@/lib/l/extra';
import { PageHead, Crumbs, JsonLd } from '@/components/ui';
import { meta, urlFor } from '@/lib/seo';
type P = { params: Promise<{ locale: string }> };
export async function generateMetadata({ params }: P): Promise<Metadata> { const { locale } = await params; if (!isLocale(locale)) return {}; const x = extra[locale]; return meta(locale, '/glossary', `${x.gl_t} | MugoX Industrial`, x.gl_p); }
export default async function Page({ params }: P) { const { locale } = await params; if (!isLocale(locale)) notFound(); const t = dict[locale]; const x = extra[locale];
  return (<><PageHead eyebrow="MugoX Industrial" title={x.gl_t} text={x.gl_p} /><div className="w sec tight"><Crumbs items={[{ name: t.home, href: `/${locale}` }, { name: x.gl_t }]} />
    <dl className="gl">{x.gl.map(([k, d]) => <div key={k} className="card pad"><dt><h3>{k}</h3></dt><dd>{d}</dd></div>)}</dl></div>
    <JsonLd data={{ '@context': 'https://schema.org', '@type': 'DefinedTermSet', name: x.gl_t, url: urlFor(locale, '/glossary'), hasDefinedTerm: x.gl.map(([k, d]) => ({ '@type': 'DefinedTerm', name: k, description: d })) }} /></>); }
