'use client';
import { useMemo, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import type { Dict, Locale } from '@/lib/i18n';
import { catList, type Product } from '@/lib/data';
export default function Catalogue({ items, l, t }: { items: Product[]; l: Locale; t: Dict }) {
  const [q, setQ] = useState(''); const [c, setC] = useState('all'); const [e, setE] = useState('all');
  const equips = useMemo(() => Array.from(new Set(items.flatMap(p => p.equip).filter(x => /^[A-Z]/.test(x) && x.length < 18))).sort(), [items]);
  const list = items.filter(p => (c === 'all' || p.cat === c) && (e === 'all' || p.equip.includes(e)) && (p.name + ' ' + p.summary + ' ' + p.equip.join(' ')).toLowerCase().includes(q.toLowerCase()));
  return (<div><div className="filters"><input type="search" placeholder={t.search} aria-label={t.search} value={q} onChange={x => setQ(x.target.value)} />
    <select aria-label={t.n_products} value={c} onChange={x => setC(x.target.value)}><option value="all">{t.all}</option>{catList.map(k => <option key={k.slug} value={k.slug}>{t[k.key]}</option>)}</select>
    <select aria-label={t.equip} value={e} onChange={x => setE(x.target.value)}><option value="all">{t.equip}: {t.all}</option>{equips.map(x => <option key={x}>{x}</option>)}</select></div>
    {list.length === 0 ? <p>{t.none}</p> : <div className="grid g3">{list.map(p => (<article className="card" key={p.slug}><Link href={`/${l}/products/${p.cat}/${p.slug}`} className="im" aria-label={p.name}>{p.img ? <Image src={`/images/${p.img}.webp`} alt={p.name} fill sizes="(max-width:700px) 100vw, 380px" style={{ objectFit: 'cover' }} loading="lazy" /> : <div className="ph">{t.soon_b}</div>}</Link>
      <div className="b"><h3><Link href={`/${l}/products/${p.cat}/${p.slug}`}>{p.name}</Link></h3><p>{p.summary}</p><div className="row"><Link className="l" href={`/${l}/products/${p.cat}/${p.slug}`}>{t.viewd} →</Link><Link className="l" data-quote="1" href={`/${l}/quote?product=${p.slug}`}>{t.reqq}</Link></div></div></article>))}</div>}</div>);
}
