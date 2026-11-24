export type Article = { slug: string; date: string; title: string; intro: string; body: string[] };
export type Content = { catLong: Record<string, string>; about: string[]; solTitle: string; solutions: [string, string][]; steps: string[]; ind: string[]; articles: Article[]; privacy: string[]; terms: string[]; ph: string; skip: string };
export type PartialArticle = { title: string; intro: string; body: string[] };
export type Pack = { n: string[]; d: string[]; t: string[]; c: Omit<Content, 'articles'> & { articles: PartialArticle[] } };
