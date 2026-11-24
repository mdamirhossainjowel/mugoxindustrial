import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { isLocale, dict, locales } from '@/lib/i18n';
import { catList, products, getProduct, relatedOf } from '@/lib/data';
import { Img, Card, Crumbs, JsonLd } from '@/components/ui';
import { lp, getC } from '@/lib/loc';
import { TrackView } from '@/components/Analytics';
import { meta, urlFor, waLink, SITE } from '@/lib/seo';
type P = { params: Promise<{ locale: string; category: string; product: string }> };
export const dynamicParams = false;
export function generateStaticParams() { return locales.flatMap(locale => products.map(p => ({ locale, category: p.cat, product: p.slug }))); }
export async function generateMetadata({ params }: P): Promise<Metadata> { const { locale, category, product } = await params; const p0 = getProduct(product); if (!isLocale(locale) || !p0 || p0.cat !== category) return {}; const p = lp(p0, locale); const t = dict[locale]; const c = catList.find(x => x.slug === p.cat)!;
  return meta(locale, `/products/${p.cat}/${p.slug}`, `${p.name} | ${t[c.key]} | MugoX`, p.summary + ' ' + p.desc.slice(0, 110), p.img ? `/images/${p.img}.webp` : '/og.png'); }
export default async function Page({ params }: P) { const { locale, category, product } = await params; const p0 = getProduct(product); if (!isLocale(locale) || !p0 || p0.cat !== category) notFound(); const p = lp(p0, locale); const ph = getC(locale).ph; const t = dict[locale]; const c = catList.find(x => x.slug === p.cat)!; const rel = relatedOf(p0); const b = `/${locale}`;
  const url = urlFor(locale, `/products/${p.cat}/${p.slug}`);
  return (<div className="w sec tight"><TrackView name={p.name} cat={p.cat} /><Crumbs items={[{ name: t.home, href: b }, { name: t.n_products, href: `${b}/products` }, { name: t[c.key], href: `${b}/products/${c.slug}` }, { name: p.name }]} />
    <div className="pd"><div><div className="pimg"><Img src={p.img} alt={p.name} sizes="(max-width:900px) 100vw, 560px" priority ph={ph} /></div>{p.gallery && p.gallery.length > 1 && <div className="thumbs">{p.gallery.slice(1).map(g => <div className="tb" key={g}><Img src={g} alt={p.name} sizes="200px" ph={ph} /></div>)}</div>}</div>
      <div className="pinfo">{p.soon && <span className="badge">{t.soon_b}</span>}<h1>{p.name}</h1><p className="lead">{p.desc}</p>
        <div className="hc"><Link className="btn p" data-quote="1" href={`${b}/quote?product=${p.slug}`}>{t.reqq}</Link><a className="btn wa" href={waLink(`Hello MugoX Industrial, I am interested in: ${p.name}`)} target="_blank" rel="noopener noreferrer">{t.wa_btn}</a></div></div></div>
    <section className="blk"><h2>{t.specs}</h2><table className="spec"><tbody>{p.specs.map(([k, v]) => <tr key={k}><th scope="row">{k}</th><td>{v}</td></tr>)}</tbody></table>
      {p.table && <div className="scroll"><table className="spec grid2"><thead><tr>{p.table.head.map(h => <th key={h}>{h}</th>)}</tr></thead><tbody>{p.table.rows.map((r, i) => <tr key={i}>{r.map((x, j) => <td key={j}>{x}</td>)}</tr>)}</tbody></table></div>}</section>
    {p.equip.length > 0 && <section className="blk"><h2>{t.equip}</h2><div className="ind">{p.equip.map(x => <span key={x}>{x}</span>)}</div></section>}
    {p.apps.length > 0 && <section className="blk"><h2>{t.apps}</h2><div className="ind">{p.apps.map(x => <span key={x}>{x}</span>)}</div></section>}
    {p.config.length > 0 && <section className="blk"><h2>{t.config}</h2><div className="ind">{p.config.map(x => <span key={x}>{x}</span>)}</div></section>}
    {rel.length > 0 && <section className="blk"><h2>{t.related}</h2><div className="grid g3">{rel.map(r => <Card key={r.slug} p={r} l={locale} t={t} />)}</div></section>}
    <div className="stickyq"><Link className="btn p" data-quote="1" href={`${b}/quote?product=${p.slug}`}>{t.reqq}</Link></div>
    <JsonLd data={{ '@context': 'https://schema.org', '@graph': [{ '@type': 'BreadcrumbList', itemListElement: [{ '@type': 'ListItem', position: 1, name: t.home, item: urlFor(locale) }, { '@type': 'ListItem', position: 2, name: t.n_products, item: urlFor(locale, '/products') }, { '@type': 'ListItem', position: 3, name: t[c.key], item: urlFor(locale, `/products/${c.slug}`) }, { '@type': 'ListItem', position: 4, name: p.name, item: url }] },
      ...(p.soon ? [] : [{ '@type': 'Product', name: p.name, description: p.desc, url, category: t[c.key], brand: { '@type': 'Brand', name: 'MugoX Industrial' }, ...(p.img ? { image: `${SITE}/images/${p.img}.webp` } : {}) }])] }} /></div>); }
