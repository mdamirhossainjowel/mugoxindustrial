import type { Locale } from './i18n';
import type { Product } from './data';
import type { Content, Pack } from './l/types';
import { en } from './l/en';
import { packs } from './l/index';
export const NK = ['hot','cold','blow','single','twin','linear','shell','pf-neck-ring','pf-mould-core','pf-lock-ring','pf-cavity','pf-gate-insert','pf-cooling-tube','pf-valve-stem','pf-cavity-flange','mold-locking-axis','blow-nozzle','stretch-rod','bottle-accessories','bottle-preform-grippers','filling-nozzle','filling-nozzle-parts','switcher','capper-choke','spindle-nose','rinser-gripper','mould-frames-and-holders','pet-preform-mould-hot-runner-cold-half','preform-hot-runner-components','compression-cap-mould','compression-cap-machine','shock-absorbers','quick-release-couplings','custom-adaptation-parts'];
export const DK = ['hot','cold','blow','single','twin','linear','shell','pf-neck-ring','pf-mould-core','pf-lock-ring','pf-cavity','pf-gate-insert','pf-cooling-tube','pf-valve-stem','pf-cavity-flange','spare-blow','spare-fill','mould-frames-and-holders','pet-preform-mould-hot-runner-cold-half','preform-hot-runner-components','compression-cap-mould','compression-cap-machine','shock-absorbers','quick-release-couplings','custom-adaptation-parts'];
export const TERMS = ['Equipment','Bottle volume','Material','Rated service life','10 million cycles','Frame','Supports','Material options','Holder types','Cavities','Neck finish','Mould frame material','Preform applications','Part','Compatible equipment','Neck sizes','Closure types','Status','Machine type','Supply','Function','Thread sizes','Buffer stroke','Working temperature','Bore diameter','Max. working pressure','Media','Scope','Components','Forged high-strength steel','Cast high-strength iron','Preform mould component','As listed for preform moulds','Coming soon','Made to drawing or sample','Blow moulding machine','Filling machine','Impact buffering for mould frame movement','10 mm or 15 mm','4 to 220 °C','Oil, water, air','Stainless steel (S136) cavity, A6061 base','CSD, Hot Filling, Aseptic, Flat Water','Water, juice, carbonated drinks, edible oil, medicine','Cylinder, Nozzle, Nozzle Seat, Heater, Heat Insulation Cap, Thermocouple','Neck finish conversion, volume change, preform weight change, bottle optimisation, cross-machine conversion parts','Bottled water','Carbonated soft drinks (CSD)','Hot filling','Aseptic packaging','Edible oil','Other liquid packaging','Juice','Carbonated beverages','Edible oils','Medicines','Water','PET preform injection','Mould frame opening and closing','PET rotary blow moulding machines','High pressure, hydraulic and pneumatic lines','Equipment adaptation projects','Hydraulic, water and pneumatic lines','Confirmed per project','Machine model confirmed per enquiry','Blow moulding machine maintenance and conversion','Filling machine maintenance and conversion','Flat water','Carbonated soft drinks','Cold filling','Blow mould','Single cavity','Twin cavity','Linear multi-cavity','Mould shell','Mould frame','Mould holder','Custom adaptation','{n} cavities','Standard replacement','4 part numbers','Straight male','90° male','Straight female','90° female','Part No.','Thread size','Buffer stroke (mm)','Type','L (mm)','Other listed equipment','SIPA / customised'];
const TI = new Map(TERMS.map((s, i) => [s, i]));
export function lp(p: Product, l: Locale): Product {
  const pk: Pack | undefined = packs[l]; if (l === 'en' || !pk) return p;
  const T = (s: string) => { const i = TI.get(s); return i !== undefined && pk.t[i] ? pk.t[i] : s; };
  const brand = p.equip[0] || ''; let key = p.slug;
  if (p.slug.startsWith('blow-mould-')) key = /hot-fill/.test(p.slug) ? 'hot' : /cold-fill/.test(p.slug) ? 'cold' : /single/.test(p.slug) ? 'single' : /twin/.test(p.slug) ? 'twin' : /linear/.test(p.slug) ? 'linear' : 'blow';
  else if (p.slug.startsWith('mould-shells-')) key = 'shell';
  else if (p.slug.startsWith('preform-mould-')) key = p.slug.replace('preform-mould-', 'pf-');
  const vol = (p.specs.find(s => s[0] === 'Bottle volume')?.[1] || '').replace(' to ', '–');
  const fill = (s: string, n: string) => s.replace('{b}', brand).replace('{v}', vol).replace('{n}', n);
  const ni = NK.indexOf(key); const name = ni >= 0 && pk.n[ni] ? fill(pk.n[ni], '') : p.name;
  const dk = ni >= 15 && ni <= 25 ? (ni <= 19 ? 'spare-blow' : 'spare-fill') : key; const di = DK.indexOf(dk);
  const desc = di >= 0 && pk.d[di] ? fill(pk.d[di], name) : p.desc;
  const summary = desc.split(/(?<=[.。!؟])\s*/)[0] || desc;
  return { ...p, name, desc, summary, equip: p.equip.map(T), specs: p.specs.map(([k, v]) => [T(k), k === 'Bottle volume' ? vol : T(v)] as [string, string]),
    apps: p.apps.map(T), config: p.config.map(c => { const m = c.match(/^(\d+) cavities$/); return m ? T('{n} cavities').replace('{n}', m[1]) : T(c); }),
    table: p.table && { head: p.table.head.map(T), rows: p.table.rows.map(r => [T(r[0]), ...r.slice(1)]) } };
}
export function getC(l: Locale): Content {
  const c = packs[l]?.c; if (!c || l === 'en') return en;
  return { ...en, ...c, catLong: { ...en.catLong, ...c.catLong }, articles: en.articles.map((a, i) => ({ ...a, ...(c.articles?.[i] || {}) })) };
}
