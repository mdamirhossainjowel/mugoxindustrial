'use client';
import Script from 'next/script';
import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import type { Dict } from '@/lib/i18n';
const GA = process.env.NEXT_PUBLIC_GA_ID; const AD = process.env.NEXT_PUBLIC_ADSENSE_CLIENT;
export default function Analytics({ t }: { t: Dict }) {
  const [c, setC] = useState<string | null>('pending'); const path = usePathname();
  useEffect(() => { try { setC(localStorage.getItem('mx-consent')); } catch { setC(null); } }, []);
  useEffect(() => { if (c === 'yes' && GA) (window as any).gtag?.('event', 'page_view', { page_path: path, page_location: location.href }); }, [path, c]);
  useEffect(() => { if (c !== 'yes' || !GA) return; const h = (e: MouseEvent) => { const a = (e.target as HTMLElement).closest('a,[data-quote]') as HTMLAnchorElement | null; if (!a) return; const href = a.getAttribute('href') || ''; const g = (window as any).gtag; if (!g) return;
    if (href.includes('wa.me')) g('event', 'whatsapp_click', { link_url: href }); else if (href.startsWith('mailto:')) g('event', 'email_click'); else if (a.dataset.quote) g('event', 'quote_click', { link_url: href }); }; document.addEventListener('click', h); return () => document.removeEventListener('click', h); }, [c]);
  const choose = (v: string) => { try { localStorage.setItem('mx-consent', v); } catch {} setC(v); };
  if (!GA && !AD) return null;
  return (<>{c === 'yes' && GA && (<><Script src={`https://www.googletagmanager.com/gtag/js?id=${GA}`} strategy="afterInteractive" /><Script id="ga" strategy="afterInteractive">{`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments)}window.gtag=gtag;gtag('js',new Date());gtag('config','${GA}',{send_page_view:false});`}</Script></>)}
    {c === 'yes' && AD && <Script async src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${AD}`} crossOrigin="anonymous" strategy="afterInteractive" />}
    {c === null && <div className="consent" role="dialog" aria-label="Cookies"><span>{t.cookie_t}</span><button className="btn p" onClick={() => choose('yes')}>{t.cookie_a}</button><button className="btn s" onClick={() => choose('no')}>{t.cookie_d}</button></div>}</>);
}
export function TrackView({ name, cat }: { name: string; cat: string }) { useEffect(() => { (window as any).gtag?.('event', 'view_item', { item_name: name, item_category: cat }); }, [name, cat]); return null; }
export function AdSlot({ slot }: { slot?: string }) {
  const [ok, setOk] = useState(false);
  useEffect(() => { if (!AD || !slot) return; try { if (localStorage.getItem('mx-consent') === 'yes') { setOk(true); setTimeout(() => { try { ((window as any).adsbygoogle = (window as any).adsbygoogle || []).push({}); } catch {} }, 300); } } catch {} }, [slot]);
  if (!AD || !slot || !ok) return null;
  return <aside className="ad" aria-label="Advertisement"><ins className="adsbygoogle" style={{ display: 'block' }} data-ad-client={AD} data-ad-slot={slot} data-ad-format="auto" data-full-width-responsive="true" /></aside>;
}
