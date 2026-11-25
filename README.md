# MugoX Industrial website (Next.js)

Static, no database. 8 languages (en, zh, bn, es, it, pl, fr, ar with RTL), light/dark/system theme, RFQ via WhatsApp or email draft, GA4 and AdSense (both off until configured and consented), sitemap, robots, hreflang, JSON-LD.

## Run locally
    npm install
    npm run dev        # http://localhost:3000
    npm run build && npm start

## Deploy on Vercel
1. Push this folder to GitHub (or run `npx vercel` in the folder) and import it in Vercel (Next.js is auto-detected).
2. Project > Settings > Domains: add `trade.mymugox.com`, mark it as the production domain.
   DNS at your registrar: CNAME `trade` -> `cname.vercel-dns.com` (or the value Vercel shows). Wait until Vercel shows "Valid Configuration".
   Do not add a redirect from trade.mymugox.com to the vercel.app URL. Optional: redirect `*.vercel.app` to the custom domain.
3. Optional environment variables (Settings > Environment Variables, Production):
   - NEXT_PUBLIC_GA_ID = G-XXXXXXXXXX
   - NEXT_PUBLIC_ADSENSE_CLIENT = ca-pub-XXXXXXXXXXXXXXXX
   - NEXT_PUBLIC_ADSENSE_SLOT = 1234567890
4. Search Console: add `https://trade.mymugox.com` as a property and submit `https://trade.mymugox.com/sitemap.xml`.

## SEO configuration
- Production domain is fixed in `lib/seo.ts` (SITE = https://trade.mymugox.com). It is not read from env or VERCEL_URL, so preview URLs never appear in canonicals, hreflang, sitemap or JSON-LD.
- Preview/development deployments serve `robots: Disallow /` and an `X-Robots-Tag: noindex` header (see app/robots.ts, next.config.mjs).
- Sitemap: /sitemap.xml (512 URLs, 8 languages, with hreflang alternates).

## Where to edit
- lib/i18n.ts: all UI translations
- lib/data.ts: products and specifications
- lib/l/en.ts: English page content and articles; lib/l/<lang>.ts: translations of products, pages and articles
- public/images: product photos, public/logo.png: logo
- Contact details: lib/seo.ts (EMAIL, WA)

## Features added (all free, no third party)
Brand pages (/brands), FAQ with FAQPage schema, glossary with DefinedTermSet schema, product compare (/compare, up to 3), image gallery with zoom, print/save-as-PDF button with print stylesheet, copy-message button on the quote form, checklist "what to send", scroll reveal animations (respect reduced motion), WebSite SearchAction (/products?q=), localized 404, PWA manifest, security headers.
