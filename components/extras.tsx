'use client';
import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { extra, type X } from '@/lib/l/extra';
import { locales, type Locale } from '@/lib/i18n';
const KEY = 'mx-compare';
const read = (): string[] => { try { return JSON.parse(localStorage.getItem(KEY) || '[]'); } catch { return []; } };
const write = (a: string[]) => { try { localStorage.setItem(KEY, JSON.stringify(a)); } catch {} window.dispatchEvent(new Event('mx-compare')); };
export function useCompare() { const [ids, setIds] = useState<string[]>([]); useEffect(() => { const f = () => setIds(read()); f(); window.addEventListener('mx-compare', f); return () => window.removeEventListener('mx-compare', f); }, []); return ids; }
export function CompareButton({ slug, add, inn }: { slug: string; add: string; inn: string }) {
  const ids = useCompare(); const on = ids.includes(slug);
  return <button type="button" className={'chip cmpb' + (on ? ' on' : '')} aria-pressed={on} onClick={() => { const a = read(); write(on ? a.filter(x => x !== slug) : [...a.filter(x => x !== slug), slug].slice(-3)); }}>{on ? '✓ ' + inn : '+ ' + add}</button>;
}
export function CompareBar({ l }: { l: Locale }) { const ids = useCompare(); const x = extra[l]; if (!ids.length) return null; return <Link className="cmpbar btn p" href={`/${l}/compare`}>{x.cmp_go.replace('{n}', String(ids.length))}</Link>; }
type Mini = { slug: string; cat: string; name: string; img?: string; specs: [string, string][]; equip: string[] };
export function CompareView({ items, x, l, eq }: { items: Mini[]; x: X; l: Locale; eq: string }) {
  const ids = useCompare(); const sel = ids.map(i => items.find(p => p.slug === i)).filter(Boolean) as Mini[];
  if (!sel.length) return <p>{x.cmp_empty}</p>;
  const labels = Array.from(new Set(sel.flatMap(p => p.specs.map(s => s[0]))));
  return (<div><div className="scroll"><table className="spec grid2 cmp"><thead><tr><th>{x.cmp_attr}</th>{sel.map(p => <th key={p.slug}>{p.img && <div className="cmpimg"><Image src={`/images/${p.img}.webp`} alt={p.name} fill sizes="200px" style={{ objectFit: 'cover' }} /></div>}<Link href={`/${l}/products/${p.cat}/${p.slug}`}>{p.name}</Link></th>)}</tr></thead>
    <tbody>{labels.map(k => <tr key={k}><th scope="row">{k}</th>{sel.map(p => <td key={p.slug}>{p.specs.find(s => s[0] === k)?.[1] || '-'}</td>)}</tr>)}<tr><th scope="row">{eq}</th>{sel.map(p => <td key={p.slug}>{p.equip.join(', ') || '-'}</td>)}</tr></tbody></table></div>
    <p><button className="btn s" onClick={() => write([])}>{x.cmp_clear}</button></p></div>);
}
export function Gallery({ images, alt, ph, zoom, close }: { images: string[]; alt: string; ph: string; zoom: string; close: string }) {
  const [i, setI] = useState(0); const d = useRef<HTMLDialogElement>(null);
  if (!images.length) return <div className="pimg"><div className="ph" role="img" aria-label={alt}>{ph}</div></div>;
  const src = `/images/${images[i]}.webp`;
  return (<div><button type="button" className="pimg zoomable" aria-label={zoom} onClick={() => d.current?.showModal()}><Image src={src} alt={alt} fill sizes="(max-width:900px) 100vw, 560px" priority style={{ objectFit: 'cover' }} /></button>
    {images.length > 1 && <div className="thumbs">{images.map((g, n) => <button type="button" key={g} className={'tb' + (n === i ? ' act' : '')} aria-label={`${alt} ${n + 1}`} onClick={() => setI(n)}><Image src={`/images/${g}.webp`} alt="" fill sizes="200px" style={{ objectFit: 'cover' }} /></button>)}</div>}
    <dialog ref={d} className="lb" onClick={e => { if (e.target === d.current) d.current?.close(); }}><button type="button" className="btn s lbx" onClick={() => d.current?.close()}>{close}</button><div className="lbi"><Image src={src} alt={alt} fill sizes="90vw" style={{ objectFit: 'contain' }} /></div></dialog></div>);
}
export function PrintButton({ label }: { label: string }) { return <button type="button" className="chip noprint" onClick={() => { (window as any).gtag?.('event', 'print_page'); window.print(); }}>{label}</button>; }
export function Reveal() {
  const path = usePathname();
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches || !('IntersectionObserver' in window)) return;
    const els = Array.from(document.querySelectorAll<HTMLElement>('.card, .sec h2, .blk, .soon, .cta')).filter(e => e.getBoundingClientRect().top > window.innerHeight * 0.9);
    const io = new IntersectionObserver(es => es.forEach(en => { if (en.isIntersecting) { en.target.classList.add('in'); io.unobserve(en.target); } }), { rootMargin: '0px 0px -8% 0px' });
    els.forEach(e => { e.classList.add('rv'); io.observe(e); }); return () => io.disconnect();
  }, [path]);
  return null;
}
export function NotFoundView() {
  const p = usePathname() || '/en'; const seg = p.split('/')[1]; const l = ((locales as readonly string[]).includes(seg) ? seg : 'en') as Locale; const x = extra[l];
  return <div className="w sec tight"><h1>{x.nf_t}</h1><p className="lead">{x.nf_p}</p><p><Link className="btn p" href={`/${l}`}>{x.nf_b}</Link></p></div>;
}
