import type { X } from '@/lib/l/extra';
import { JsonLd } from './ui';
export function FAQ({ x }: { x: X }) {
  return (<section className="blk"><h2>{x.faq_t}</h2><div className="faq">{x.faq.map(([q, a]) => <details key={q}><summary>{q}</summary><p>{a}</p></details>)}</div>
    <JsonLd data={{ '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: x.faq.map(([q, a]) => ({ '@type': 'Question', name: q, acceptedAnswer: { '@type': 'Answer', text: a } })) }} /></section>);
}
export function Checklist({ x }: { x: X }) { return (<aside className="card pad"><h3>{x.chk_t}</h3><ul className="chk">{x.chk.map(c => <li key={c}>{c}</li>)}</ul></aside>); }
