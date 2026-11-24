import Link from 'next/link';
import type { Locale, Dict } from '@/lib/i18n';
import { catList } from '@/lib/data';
import { EMAIL, WA, waLink } from '@/lib/seo';
export default function Footer({ l, t }: { l: Locale; t: Dict }) {
  return (<><footer className="ft"><div className="w fg"><div><b className="fb">MugoX Industrial</b><p>{t.foot_tag}</p><p><a href={`mailto:${EMAIL}`}>{EMAIL}</a><br /><a href={waLink('Hello MugoX Industrial')} target="_blank" rel="noopener noreferrer">WhatsApp +{WA.replace(/^(\d{2})(\d{3})(\d{4})(\d{4})$/, '$1 $2 $3 $4')}</a></p></div>
    <div><b>{t.n_products}</b>{catList.map(c => <Link key={c.slug} href={`/${l}/products/${c.slug}`}>{t[c.key]}</Link>)}</div>
    <div><b>MugoX</b><Link href={`/${l}/about`}>{t.n_about}</Link><Link href={`/${l}/solutions`}>{t.n_solutions}</Link><Link href={`/${l}/industries`}>{t.n_industries}</Link><Link href={`/${l}/resources`}>{t.n_resources}</Link><Link href={`/${l}/contact`}>{t.n_contact}</Link><Link href={`/${l}/privacy`}>{t.privacy}</Link><Link href={`/${l}/terms`}>{t.terms}</Link></div></div>
    <div className="w copy">© {new Date().getFullYear()} MugoX Industrial. {t.rights}</div></footer>
    <a className="fab" href={waLink('Hello MugoX Industrial, I would like to discuss a PET packaging requirement.')} target="_blank" rel="noopener noreferrer">WhatsApp</a></>);
}
