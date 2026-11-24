import type { Metadata } from 'next';
import { locales, ogLocale, type Locale } from './i18n';
export const SITE = (process.env.NEXT_PUBLIC_SITE_URL || 'https://mugox-industrial.vercel.app').replace(/\/$/, '');
export const EMAIL = 'mymugox@gmail.com';
export const WA = '8619038107246';
export const waLink = (t: string) => `https://wa.me/${WA}?text=${encodeURIComponent(t)}`;
export const urlFor = (l: Locale, p = '') => `${SITE}/${l}${p}`;
export function meta(l: Locale, path: string, title: string, description: string, image = '/og.png'): Metadata {
  const languages: Record<string, string> = Object.fromEntries(locales.map(x => [x, urlFor(x, path)]));
  languages['x-default'] = urlFor('en', path);
  return { metadataBase: new URL(SITE), title, description, alternates: { canonical: urlFor(l, path), languages },
    openGraph: { title, description, url: urlFor(l, path), siteName: 'MugoX Industrial', type: 'website', locale: ogLocale[l], images: [{ url: image, width: 1200, height: 630 }] },
    twitter: { card: 'summary_large_image', title, description, images: [image] } };
}
