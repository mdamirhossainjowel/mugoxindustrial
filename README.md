# MugoX Industrial website (Next.js)

Static, no database. 8 languages (en, zh, bn, es, it, pl, fr, ar with RTL), light/dark/system theme, RFQ via WhatsApp or email draft, GA4 and AdSense (both off until configured and consented), sitemap, robots, hreflang, JSON-LD.

## Run locally
    npm install
    npm run dev        # http://localhost:3000
    npm run build && npm start

## Deploy on Vercel
1. Push this folder to a GitHub repo (or run `npx vercel` in the folder).
2. Import the repo in Vercel. Framework: Next.js (auto-detected). No build settings needed.
3. Add environment variables (Project > Settings > Environment Variables):
   - NEXT_PUBLIC_SITE_URL = https://trade.mymugox.com   (used for canonical URLs, hreflang, sitemap)
   - NEXT_PUBLIC_GA_ID = G-XXXXXXXXXX                 (optional, GA4)
   - NEXT_PUBLIC_ADSENSE_CLIENT = ca-pub-XXXXXXXXXXXXXXXX   (optional)
   - NEXT_PUBLIC_ADSENSE_SLOT = 1234567890            (optional, ad unit id for article pages)
4. Redeploy, then submit https://your-domain.com/sitemap.xml in Google Search Console.

## Where to edit
- lib/i18n.ts: all UI translations
- lib/data.ts: products and specifications
- lib/content.ts: About, Solutions, Industries, articles, Privacy, Terms (English)
- public/images: product photos, public/logo.png: logo
- Contact details: lib/seo.ts (EMAIL, WA)
"# -mugoxindustrial" 
"# mugoxindustrial" 
"# mugoxindustrial" 
