'use client';
import { useEffect, useState } from 'react';
import type { Dict } from '@/lib/i18n';
import type { X } from '@/lib/l/extra';
import { catList, products } from '@/lib/data';
import { EMAIL, waLink } from '@/lib/seo';
const F = ['n','c','e','k','pc','mb','sp','q','m'] as const; type K = (typeof F)[number];
export default function RFQForm({ t, x }: { t: Dict; x: X }) {
  const [v, setV] = useState<Record<K, string>>({ n:'',c:'',e:'',k:'',pc:'',mb:'',sp:'',q:'',m:'' }); const [err, setErr] = useState<Partial<Record<K, string>>>({}); const [msg, setMsg] = useState('');
  useEffect(() => { const q = new URLSearchParams(window.location.search); const p = products.find(x => x.slug === q.get('product')); const c = q.get('cat'); if (p) setV(s => ({ ...s, pc: p.cat, sp: p.name })); else if (c) setV(s => ({ ...s, pc: c })); }, []);
  const set = (k: K) => (e: React.ChangeEvent<any>) => setV(s => ({ ...s, [k]: e.target.value }));
  const check = () => { const r: Partial<Record<K, string>> = {}; (['n','c','e','k','pc','sp'] as K[]).forEach(k => { if (!v[k].trim()) r[k] = t.f_req; }); if (!r.e && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.e)) r.e = t.f_err_email; setErr(r); return !Object.keys(r).length; };
  const cat = catList.find(c => c.slug === v.pc); const catName = cat ? t[cat.key] : v.pc;
  const text = () => `New inquiry via MugoX Industrial website\n\nFull Name: ${v.n}\nCompany: ${v.c}\nEmail: ${v.e}\nCountry: ${v.k}\nProduct Category: ${catName}\nMachine Brand: ${v.mb || '-'}\nSpecifications: ${v.sp}\nEstimated Quantity: ${v.q || '-'}\nMessage: ${v.m || '-'}`;
  const go = async (how: 'wa' | 'mail' | 'copy') => { if (!check()) { setMsg(''); return; }
    if (how === 'copy') { try { await navigator.clipboard.writeText(text()); setMsg(x.copied); } catch { setMsg(text()); } return; }
    if (how === 'wa') { window.open(waLink(text()), '_blank', 'noopener'); setMsg(t.f_okwa); (window as any).gtag?.('event', 'generate_lead', { method: 'whatsapp' }); }
    else { window.location.href = `mailto:${EMAIL}?subject=${encodeURIComponent('RFQ: ' + catName + ' - ' + v.c)}&body=${encodeURIComponent(text())}`; setMsg(t.f_okmail); (window as any).gtag?.('event', 'generate_lead', { method: 'email' }); } };
  const fld = (k: K, label: string, req = false, extra: any = {}) => (<div className={extra.full ? 'f' : ''}><label htmlFor={'f' + k}>{label}{req ? ' *' : ''}</label>
    {extra.area ? <textarea id={'f' + k} rows={3} value={v[k]} onChange={set(k)} aria-invalid={!!err[k]} /> : <input id={'f' + k} type={k === 'e' ? 'email' : 'text'} value={v[k]} onChange={set(k)} aria-invalid={!!err[k]} autoComplete={extra.ac} />}<div className="err" role="alert">{err[k]}</div></div>);
  return (<form className="rfq" noValidate onSubmit={e => e.preventDefault()}>
    {fld('n', t.f_n, true, { ac: 'name' })}{fld('c', t.f_c, true, { ac: 'organization' })}{fld('e', t.f_e, true, { ac: 'email' })}{fld('k', t.f_k, true, { ac: 'country-name' })}
    <div><label htmlFor="fpc">{t.f_pc} *</label><select id="fpc" value={v.pc} onChange={set('pc')} aria-invalid={!!err.pc}><option value="">{t.f_sel}</option>{catList.map(c => <option key={c.slug} value={c.slug}>{t[c.key]}</option>)}</select><div className="err" role="alert">{err.pc}</div></div>
    {fld('mb', t.f_mb)}{fld('sp', t.f_sp, true, { full: true, area: true })}{fld('q', t.f_q)}{fld('m', t.f_m)}
    <div className="f acts"><button type="button" className="btn wa" onClick={() => go('wa')}>{t.f_wa}</button><button type="button" className="btn s" onClick={() => go('mail')}>{t.f_mail}</button><button type="button" className="btn s" onClick={() => go('copy')}>{x.copy}</button></div>
    {msg && <div className="f msg" role="status">{msg}</div>}</form>);
}
