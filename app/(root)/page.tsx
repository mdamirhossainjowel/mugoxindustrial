'use client';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
const L = ['en','zh','bn','es','it','pl','fr','ar'];
export default function Root() {
  const r = useRouter();
  useEffect(() => { let t = ''; try { t = localStorage.getItem('mx-lang') || ''; } catch {} if (!L.includes(t)) { const n = (navigator.language || 'en').slice(0, 2).toLowerCase(); t = L.includes(n) ? n : 'en'; } r.replace('/' + t); }, [r]);
  return (<main style={{ padding: 40, fontFamily: 'sans-serif' }}><noscript><meta httpEquiv="refresh" content="0;url=/en" /></noscript><p>MugoX Industrial</p><ul>{L.map(l => <li key={l}><a href={'/' + l}>{l}</a></li>)}</ul></main>);
}
