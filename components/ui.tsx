import Image from 'next/image';
import Link from 'next/link';
import type { Locale, Dict } from '@/lib/i18n';
import type { Product } from '@/lib/data';
import { lp, getC } from '@/lib/loc';
export function Img({ src, alt, sizes = '(max-width:700px) 100vw, 400px', priority = false, ph = 'Product photo available on request' }: { src?: string; alt: string; sizes?: string; priority?: boolean; ph?: string }) {
  if (!src) return <div className="ph" role="img" aria-label={alt}>{ph}</div>;
  return <Image src={`/images/${src}.webp`} alt={alt} fill sizes={sizes} priority={priority} style={{ objectFit: 'cover' }} />;
}
export function Card({ p: p0, l, t }: { p: Product; l: Locale; t: Dict }) {
  const p = lp(p0, l); const ph = getC(l).ph;
  return (<article className="card"><Link href={`/${l}/products/${p.cat}/${p.slug}`} className="im" aria-label={p.name}><Img src={p.img} alt={p.name} ph={ph} /></Link>
    <div className="b">{p.soon && <span className="badge">{t.soon_b}</span>}<h3><Link href={`/${l}/products/${p.cat}/${p.slug}`}>{p.name}</Link></h3><p>{p.summary}</p>
      <div className="row"><Link className="l" href={`/${l}/products/${p.cat}/${p.slug}`}>{t.viewd} →</Link><Link className="l" data-quote="1" href={`/${l}/quote?product=${p.slug}`}>{t.reqq}</Link></div></div></article>);
}
export function JsonLd({ data }: { data: unknown }) { return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />; }
export function Crumbs({ items }: { items: { name: string; href?: string }[] }) {
  return (<nav className="crumbs" aria-label="Breadcrumb"><ol>{items.map((c, i) => <li key={i}>{c.href ? <Link href={c.href}>{c.name}</Link> : <span aria-current="page">{c.name}</span>}</li>)}</ol></nav>);
}
export function PageHead({ eyebrow, title, text }: { eyebrow?: string; title: string; text?: string }) {
  return (<section className="phead"><div className="w">{eyebrow && <span className="eyebrow">{eyebrow}</span>}<h1>{title}</h1>{text && <p className="lead">{text}</p>}</div></section>);
}
