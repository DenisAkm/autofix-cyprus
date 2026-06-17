# AutoFix Cyprus — landing page (v2)

A rebuilt, premium single-page site for AutoFix Cyprus (accident repair, insurance
claims, car pickup & delivery). Same brand colour as the original, more refined design,
bilingual **EN / RU**, and every issue from the audit fixed.

## Stack

- **React 18** + **Vite 6**
- **Tailwind CSS v4** (`@tailwindcss/vite`) with a custom premium design system (`src/index.css`)
- **Outfit** typeface (kept from the original)
- Lightweight custom **i18n** (no dependency) — `src/i18n/`
- Zero UI libraries — all icons are inline SVG (`src/components/ui.jsx`)

## Run

```bash
npm install
npm run dev        # local dev server
npm run build      # production build → dist/
npm run preview    # preview the production build
```

## What changed vs. the original site

| Audit finding (original) | Fix here |
|---|---|
| **All routes except `/` returned HTTP 404** (deep links / refresh / shared links broke; killed SEO) | Rebuilt as a **single page with smooth-scroll anchors** (no broken routes). Added `_redirects`, `netlify.toml`, `vercel.json` SPA fallbacks as a safety net for any host. |
| Template filler copy ("Achieve your goals faster with personalized strategies…") | Replaced with real, on-domain copy. |
| Fake-looking testimonials (Jordan Lee, Avery Johnson) | Cypriot names only, with city + rating. |
| Typos: "We response within 1 hours", "gurantee" | Corrected throughout. |
| Stray placeholders: "Cyprus Auto Assist", `+357 99 123456`, `support@example.com` | Removed; single source of truth in `src/lib/config.js`. |
| WhatsApp buried / styled blue | **Green floating WhatsApp button**, a **mobile sticky [Call][WhatsApp] bar**, hero CTA, FAQ & contact. |
| Language switcher was decorative (English only) | **Working EN / RU switcher**, persisted to `localStorage`, auto-detects browser language. |
| No physical contact context | Contact block with phone, email, hours, 24/7 note, area, socials. |
| Form on a separate (404-ing) route | **Inline request form** with validation + photo preview that opens a **pre-filled WhatsApp** message (no backend dependency to lose leads). |
| No OG/Twitter tags, no JSON-LD, weak `<title>`, no robots/sitemap | Full meta + Open Graph + Twitter Card + `AutoRepair` JSON-LD in `index.html`; `robots.txt` + `sitemap.xml`. |
| Single 464 KB JS bundle | ~213 KB JS (≈65 KB gzip). |
| Two near-duplicate "why us" sections | Consolidated: 4 trust features + one differentiated "why choose" split. |
| Favicon MIME mismatch | Proper SVG favicon. |

## Motion & interaction (v2.1 — premium/dynamics pass)

After a dedicated design review, the following motion was added (all dependency-free,
all gated behind `prefers-reduced-motion`):

- **Count-up stats** — numbers animate 0→value when scrolled into view (`useCountUp`).
- **Interactive hero** — 3D mouse-tilt on the car card, independently floating glass chips, a slowly-panning gradient headline, and a grain overlay.
- **Marquees** — infinite insurer-logo strip and a dual-row, edge-faded testimonials marquee (pause on hover).
- **Scroll cues** — reading-progress bar in the navbar + scroll-spy active-link highlighting.
- **Richer entrance choreography** — `Reveal` now supports `up | scale | left | right | blur` variants with expo-out easing.
- **Micro-interactions** — magnetic primary CTA, 3D tilt + glow on service cards, cinematic hover on work images, animated "draw-in" connector line in How-It-Works, polished FAQ accordion, grain/ambient glow on dark sections.

Hooks live in `src/components/ui.jsx` (`useCountUp`, `useTilt`, `useMagnetic`, `Reveal`);
keyframes/utilities in `src/index.css`.

## Editing content

- **Contact details / WhatsApp / cities** → `src/lib/config.js`
- **All text (EN + RU)** → `src/i18n/translations.js`
- **Images** → `public/img/` (royalty-free photos under the Unsplash License; swap for the
  client's real work photos when available)
- **Insurer logos** → `src/components/Insurance.jsx` (monochrome placeholders — drop in real partner logos)

## Deploying

Output is a static `dist/`. On any static host, ensure the **SPA fallback** rule is active
(included for Netlify/Vercel; for Cloudflare Pages the `public/_redirects` file is picked up
automatically). Update the absolute URLs in `index.html` / `sitemap.xml` if the domain changes.

> Note: the original used an API backend at `autofix-cyprus-backend.onrender.com`. This version
> routes leads through WhatsApp so they never depend on a (cold-starting) backend. If you want a
> server-side form submission too, wire `RequestForm.submit()` to your endpoint alongside the
> WhatsApp hand-off.
