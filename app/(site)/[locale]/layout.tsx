import '../../globals.css';
import { notFound } from 'next/navigation';
import { locales, isLocale, dict, dirOf } from '@/lib/i18n';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Analytics from '@/components/Analytics';
import { JsonLd } from '@/components/ui';
import { SITE, EMAIL, WA } from '@/lib/seo';
import { getC } from '@/lib/loc';
export const dynamicParams = false;
export function generateStaticParams() { return locales.map(locale => ({ locale })); }
const themeInit = `try{var t=localStorage.getItem('mx-theme');if(t==='light'||t==='dark')document.documentElement.setAttribute('data-theme',t)}catch(e){}`;
export default async function Layout({ children, params }: { children: React.ReactNode; params: Promise<{ locale: string }> }) {
  const { locale } = await params; if (!isLocale(locale)) notFound(); const t = dict[locale];
  const font = locale === 'ar' ? 'Noto+Sans+Arabic:wght@400;600' : locale === 'bn' ? 'Noto+Sans+Bengali:wght@400;600' : 'Inter:wght@400;500;600';
  return (<html lang={locale} dir={dirOf(locale)}><head><script dangerouslySetInnerHTML={{ __html: themeInit }} />
    <link rel="preconnect" href="https://fonts.googleapis.com" /><link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
    <link rel="stylesheet" href={`https://fonts.googleapis.com/css2?family=Sora:wght@600;700&family=${font}&display=swap`} /></head>
    <body><a className="skip" href="#main">{getC(locale).skip}</a><Header l={locale} t={t} /><main id="main">{children}</main><Footer l={locale} t={t} /><Analytics t={t} />
      <JsonLd data={{ '@context': 'https://schema.org', '@type': 'Organization', name: 'MugoX Industrial', url: SITE, logo: SITE + '/logo.png', email: EMAIL, telephone: '+' + WA, contactPoint: { '@type': 'ContactPoint', contactType: 'sales', email: EMAIL, telephone: '+' + WA, availableLanguage: ['English','Chinese','Bengali','Spanish','Italian','Polish','French','Arabic'] } }} /></body></html>);
}
