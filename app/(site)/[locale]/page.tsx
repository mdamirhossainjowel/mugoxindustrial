import Link from 'next/link';
import type { Metadata } from 'next';
import { isLocale, dict, locales, type Locale } from '@/lib/i18n';
import { notFound } from 'next/navigation';
import { catList, products } from '@/lib/data';
import { Img, Card } from '@/components/ui';
import { meta, waLink } from '@/lib/seo';
type P = { params: Promise<{ locale: string }> };
export async function generateMetadata({ params }: P): Promise<Metadata> { const { locale } = await params; if (!isLocale(locale)) return {}; const t = dict[locale]; return meta(locale, '', t.meta_title, t.meta_desc); }
export default async function Home({ params }: P) {
  const { locale } = await params; if (!isLocale(locale)) notFound(); const l: Locale = locale; const t = dict[l]; const b = `/${l}`;
  const why = [t.w1, t.w2, t.w3, t.w4, t.w5, t.w6], eng = [t.e1, t.e2, t.e3, t.e4, t.e5, t.e6], ind = [t.i1, t.i2, t.i3, t.i4, t.i5, t.i6, t.i7];
  return (<>
    <section className="hero"><div className="w hg"><div><span className="eyebrow">MugoX Industrial</span><h1>{t.h_title}</h1><p>{t.h_text}</p>
      <div className="hc"><Link className="btn p" href={`${b}/products`}>{t.h_c1}</Link><Link className="btn s" data-quote="1" href={`${b}/quote`}>{t.h_c2}</Link></div><span className="tag">{t.tagline}</span></div>
      <div className="hi"><div className="hb big"><Img src="hero1" alt="Multi-cavity PET preform mould" sizes="(max-width:900px) 100vw, 40vw" priority /></div><div className="hb"><Img src="hero2" alt="PET preform mould assembly" sizes="25vw" /></div><div className="hb"><Img src="hero3" alt="Cold half preform mould plate" sizes="25vw" /></div></div></div></section>
    <section className="sec"><div className="w"><span className="eyebrow">{t.cats_t}</span><h2>{t.cats_t}</h2><p className="lead">{t.cats_p}</p>
      <div className="grid g3 mt">{catList.map(c => (<article className="card" key={c.slug}><Link href={`${b}/products/${c.slug}`} className="im" aria-label={t[c.key]}>{c.img ? <Img src={c.img} alt={t[c.key]} /> : <div className="ph dark">{t.soon_b}</div>}</Link>
        <div className="b">{c.slug === 'compression-cap-machine' && <span className="badge">{t.soon_b}</span>}<h3><Link href={`${b}/products/${c.slug}`}>{t[c.key]}</Link></h3><p>{t[c.dk]}</p><Link className="l" href={`${b}/products/${c.slug}`}>{t.explore} →</Link></div></article>))}</div></div></section>
    <section className="sec alt"><div className="w"><h2>{t.why_t}</h2><div className="grid g3 mt">{why.map((x, i) => <div className="card pad" key={i}><div className="ico" />{x}</div>)}</div></div></section>
    <section className="sec"><div className="w"><h2>{t.eng_t}</h2><div className="grid g3 mt">{eng.map((x, i) => <div className="card pad" key={i}><div className="ico" />{x}</div>)}</div></div></section>
    <section className="sec alt"><div className="w"><h2>{t.feat_t}</h2><div className="grid g3 mt">{products.filter(p => p.featured).slice(0, 6).map(p => <Card key={p.slug} p={p} l={l} t={t} />)}</div></div></section>
    <section className="sec"><div className="w"><h2>{t.ind_t}</h2><div className="ind mt">{ind.map((x, i) => <span key={i}>{x}</span>)}</div></div></section>
    <section className="sec alt"><div className="w cta"><h2>{t.glob_t}</h2><Link className="btn s" data-quote="1" href={`${b}/quote`}>{t.glob_c}</Link></div></section>
    <section className="sec"><div className="w"><div className="soon"><div><span className="badge">{t.soon_b}</span><h2>{t.soon_t}</h2><p>{t.soon_p}</p><div className="hc"><Link className="btn p" data-quote="1" href={`${b}/quote?cat=compression-cap-machine`}>{t.soon_c}</Link><a className="btn wa" href={waLink('Hello MugoX Industrial, please keep me updated on the Compression Cap Machine.')} target="_blank" rel="noopener noreferrer">{t.wa_btn}</a></div></div><div className="ph dark">{t.soon_b}</div></div></div></section>
    <section className="sec"><div className="w cta"><h2>{t.final_t}</h2><div className="hc c"><Link className="btn s" data-quote="1" href={`${b}/quote`}>{t.n_quote}</Link><a className="btn wa" href={waLink('Hello MugoX Industrial, I would like to discuss a PET packaging requirement.')} target="_blank" rel="noopener noreferrer">{t.wa_btn}</a></div></div></section></>);
}
