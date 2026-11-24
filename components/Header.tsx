'use client';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { locales, localeNames, type Locale, type Dict } from '@/lib/i18n';
import { catList } from '@/lib/data';
export default function Header({ l, t }: { l: Locale; t: Dict }) {
  const path = usePathname() || `/${l}`; const router = useRouter(); const [theme, setTheme] = useState('system');
  useEffect(() => { try { setTheme(localStorage.getItem('mx-theme') || 'system'); } catch {} }, []);
  const setT = (v: string) => { setTheme(v); try { localStorage.setItem('mx-theme', v); } catch {} if (v === 'system') document.documentElement.removeAttribute('data-theme'); else document.documentElement.setAttribute('data-theme', v); };
  const setL = (n: string) => { try { localStorage.setItem('mx-lang', n); } catch {} (window as any).gtag?.('event', 'language_change', { language: n }); router.push(path.replace(/^\/[a-z]{2}(?=\/|$)/, '/' + n)); };
  const base = `/${l}`;
  return (<header className="hd"><div className="w nav">
    <Link href={base} className="brand" aria-label="MugoX Industrial"><Image src="/logo.png" alt="" width={56} height={40} priority /><span className="bt"><b>MugoX</b><small>INDUSTRIAL</small></span></Link>
    <nav className="dn" aria-label="Main">
      <div className="mm"><Link href={`${base}/products`}>{t.n_products}</Link><div className="mega">{catList.map(c => <Link key={c.slug} href={`${base}/products/${c.slug}`}><b>{t[c.key]}</b><span>{t[c.dk]}</span></Link>)}</div></div>
      <Link href={`${base}/solutions`}>{t.n_solutions}</Link><Link href={`${base}/industries`}>{t.n_industries}</Link><Link href={`${base}/about`}>{t.n_about}</Link><Link href={`${base}/resources`}>{t.n_resources}</Link><Link href={`${base}/contact`}>{t.n_contact}</Link></nav>
    <div className="tools">
      <select aria-label={t.lang} value={l} onChange={e => setL(e.target.value)}>{locales.map(x => <option key={x} value={x}>{localeNames[x]}</option>)}</select>
      <select aria-label={t.theme} value={theme} onChange={e => setT(e.target.value)}><option value="system">{t.sys}</option><option value="light">{t.light}</option><option value="dark">{t.dark}</option></select>
      <Link className="btn p qb" data-quote="1" href={`${base}/quote`}>{t.n_quote}</Link>
      <details className="mob"><summary aria-label="Menu">☰</summary><div className="mp">
        <Link href={`${base}/products`}>{t.n_products}</Link>{catList.map(c => <Link key={c.slug} className="sub" href={`${base}/products/${c.slug}`}>{t[c.key]}</Link>)}
        <Link href={`${base}/solutions`}>{t.n_solutions}</Link><Link href={`${base}/industries`}>{t.n_industries}</Link><Link href={`${base}/about`}>{t.n_about}</Link><Link href={`${base}/resources`}>{t.n_resources}</Link><Link href={`${base}/contact`}>{t.n_contact}</Link><Link data-quote="1" href={`${base}/quote`}>{t.n_quote}</Link></div></details>
    </div></div></header>);
}
