# Manual Launch Tasks — Shiva Yoga Niketan

> **What this is:** the list of things that **only you** can do: real business details, accounts,
> hosting and content decisions. Everything that could be done in code is already done (see
> `CHANGELOG.md`).
>
> **Keep this file updated.** Whenever a change adds a new manual step, add it here. When you finish
> an item, tick it `[x]` and add the date. Don't delete it — the history helps the next person.

Last reviewed: **2026-10-31** (Sanity CMS tasks S0–S7 added)

Most settings live in **one object**: `SITE` at the top of `src/app/components/SiteExtras.tsx`.

---

## 🟣 Sanity CMS setup (in progress)

Content for Programs, Retreats, Teachers and Blog is now managed in Sanity.
Editing guide: `Editing_Content_in_Sanity.md`.

- [x] **S0. Create the Sanity project.** Project ID `ntvvkd3p`, dataset `production` (public). *Done.*
- [ ] **S1. CORS origins:** sanity.io/manage → project → **API → CORS origins**. Already allowed: `https://www.shivayoganiketan.com` ✅. Still to add (leave "Allow credentials" **unticked**):
  - [ ] your **Figma Make preview** address (copy it from the preview's address bar). Without it, the preview shows the built-in content instead of Sanity.
  - [ ] `http://localhost:5173` (only needed for VS Code work after export)
  - [ ] `https://shivayoganiketan.com` (non-www), if that address will also be used
- [ ] **S2. Deploy the editing dashboard** to `https://shivayoganiketan.sanity.studio`. Either:
  - **(a)** create a temporary token (API → Tokens → *Add API token*, permission **Deploy Studio**) and paste it in the chat so the developer can deploy it, then **delete the token** afterwards; or
  - **(b)** on a computer with Node 22+: `cd studio && npm install && npx sanity login && npx sanity deploy`.
- [ ] **S3. Import the current content** (4 programs, 8 retreats, 10 teachers, 9 posts) so the dashboard isn't empty. Either:
  - **(a)** create a temporary token with **Editor** permission and paste it in the chat; the developer runs `studio/seed/import.mjs`. **Delete the token** afterwards; or
  - **(b)** `cd studio && npx sanity dataset import seed/content.ndjson production`.
  > Until this is done, the website keeps showing its built-in content, so nothing breaks in the meantime.
- [ ] **S4. Invite your manager:** Members → Invite → role **Editor**.
- [ ] **S5. Clean-up after import, in the dashboard:**
  - [ ] Replace the sample **retreats** (Tuscany, Bali, Costa Rica, Lapland, Sedona), or untick "Show on homepage / About" / unpublish them.
  - [ ] Replace or unpublish the 9 sample **blog posts** (medical/COVID text).
  - [ ] Update **course dates** (all from 2022) on each Program. The Application form follows automatically.
  - [ ] Fix **teacher credentials** marked "to be confirmed"; review the 6 template teachers (untick "Show on the Teachers page", or delete them and remove them from programs).
  - [ ] Upload real **photos** (with alt text and hotspot) for every item. This replaces most of the placeholder work in `Replacing_Images.md`.
- [ ] **S6. (Optional) Auto-rebuild on publish:** if your host pre-renders the site or you want the sitemap refreshed instantly, add a Sanity **webhook** (API → Webhooks) pointing at your host's "build hook" URL (Netlify/Vercel give you one).
- [ ] **S7. Prices page pricing cards** link to retreat pages that don't exist (`/retreats/3-day-reset` etc.). Decide what they should link to (a real retreat, or `/appointment`).

---

## 🔴 P0 — Blockers (do before going live)

### 1. Turn on form delivery (all forms are in DEMO mode)
Every form (Contact, Application, homepage booking, retreat booking, program callback, blog comment,
footer newsletter) goes through `submitForm()` and is delivered by **Web3Forms** (free, no backend).
- [ ] Go to https://web3forms.com, enter `info@shivayoganiketan.com`, copy the **Access Key**.
- [ ] Paste it into `SITE.web3formsKey` in `SiteExtras.tsx`.
- [ ] Submit every form once and confirm each email arrives (the subject shows which form sent it).
- Until this is done, forms validate and show success but **send nothing** (the browser console shows
  `DEMO MODE`).
- *Want submissions stored in a database or a CRM instead? Ask for a Supabase / Zoho integration.*

### 2. Replace leftover template content (bad for SEO and trust)
> ✅ Programs, Retreats, Teachers and Blog are now edited in **Sanity**, not code (see S5 above). Only the testimonials row below still needs a code edit.
| Where | What's wrong | File |
|---|---|---|
| Retreats (6) | Locations are **Tuscany, Bali, Costa Rica, Lapland, Sedona**, not India. Dates are 2025/26 template dates. Cost `$150` on the detail page is a placeholder. | `RetreatDetailPage.tsx` (`ALL_RETREATS`), `RetreatsPage.tsx`, `AboutPage.tsx`, `PricesPage.tsx`, `YogaLandingPage.tsx` (booking dropdown + cards) |
| Retreat taglines | e.g. "Join volunteers to prepare and serve meals to families in need" | `RetreatDetailPage.tsx` |
| Blog posts (9) | Titles and slugs from a medical template ("Wound Care…", "9 Best Electric **Toothbrushes**…", "Three Years Post Injury"). The body talks about **SARS-CoV-2**. Authors "Anna Rue" / "Jeremy Adelman". | `BlogPage.tsx`, `BlogPostPage.tsx` (`BLOG_POSTS`, `BODY_TEXT_*`) |
| Course dates | **All upcoming dates are in 2022** (expired). | `ProgramDetailPage.tsx` (`dates`), `AppointmentPage.tsx` (`COURSE_DATES`), `PricesPage.tsx` |
| Teacher profiles | 4 real teachers (Raj Singh, Gokul Bisht, Shashank Badoni, Gopal) now have profile pages. Their **education, certification and shift times say "to be confirmed"** or use template values. 6 template teachers (Angela Carbone, Meghan Conner, Sofia Renner, Lena Hart, Maya Tran, Priya Sharma) are still linked from the Program pages and have medical bios ("M.D. of Medicine", "Physician Assistants"). | `TeacherProfilePage.tsx` (`TEACHERS`), `ProgramDetailPage.tsx` (`teachers:` per program) |
| Homepage testimonials / reviews | Check that names and quotes are real, or remove them. Fake reviews break Google's policies. | `YogaLandingPage.tsx`, `ContactPage.tsx`, `AboutPage.tsx` |

> **When you change a blog/retreat/teacher slug**, also update `public/sitemap.xml`, the sitemap
> page (`SitemapPage.tsx`) and the footer lists (`SITEMAP_RETREATS` in `ZenShared.tsx`).

### 3. Real images
- [ ] Swap every `placeholder("…")` for a real `.webp`. Follow `Replacing_Images.md`.
- [ ] Give each **meaningful** image a descriptive `alt` (e.g. `alt="Students practising Hatha yoga on the rooftop shala in Tapovan, Rishikesh"`). Decorative textures can keep `alt=""`.
- [ ] Keep each image under ~200 KB; hero images 1600–2000 px wide.

### 4. Social-share image (Open Graph)
- [ ] Create a **1200 × 630 px** JPG (logo + photo + "Yoga Teacher Training in Rishikesh").
- [ ] Save it as `public/og-cover.jpg` (path is already set in `SITE.ogImage`).
- [ ] Test it with https://www.opengraph.xyz and the Facebook Sharing Debugger.

### 5. Confirm NAP (Name / Address / Phone): must match Google exactly
- [ ] Check `SITE.street`, `postal`, `phone`, `phoneDisplay`, `email`, `whatsapp`.
- [ ] Set `SITE.geo` to your exact map pin (right-click your location on Google Maps → copy the coordinates).
- [ ] Set `SITE.openingHours` (schema.org format, e.g. `"Mo-Sa 06:00-19:00"`).
- The footer, sticky mobile bar, retreat pages and structured data all read from `SITE`.

---

## 🟠 P1 — Accounts & search setup (launch week)

### 6. Google Analytics 4
- [ ] Create a GA4 property → copy the Measurement ID (`G-…`) → paste into `SITE.gaMeasurementId`.
- Analytics only loads after the visitor clicks **Accept** on the cookie banner.
- Form submissions fire a `generate_lead` event. Mark it as a **Key event (conversion)** in GA4.

### 7. Google Search Console
- [ ] Add the property `https://www.shivayoganiketan.com`.
- [ ] Verify with the **HTML tag** method → paste only the `content="…"` value into `SITE.googleSiteVerification`
      (or verify through DNS at your domain registrar, which is more reliable).
- [ ] Submit `https://www.shivayoganiketan.com/sitemap.xml`.
- [ ] After launch, check *Pages* for errors and use *URL Inspection → Request indexing* on the homepage and the 4 program pages.
- [ ] Also submit the sitemap in **Bing Webmaster Tools** (you can import it from Search Console).

### 8. Google Business Profile (the biggest win for local SEO)
- [ ] Claim or verify "Shiva Yoga Niketan" on Google Business Profile, using exactly the same NAP as `SITE`.
- [ ] Category: *Yoga studio* (secondary: *Yoga retreat center*, *Meditation center*).
- [ ] Add photos, opening hours and the website URL, and ask past students for reviews.
- [ ] List the school on Yoga Alliance, BookYogaRetreats, TripAdvisor and Facebook using the same NAP.

### 9. Social profiles
- [ ] Put your real profile URLs in `SITE.social` (`facebook`, `instagram`, `twitter`, `youtube`).
  These are used by the footer icons **and** the `sameAs` field in structured data.
  Generic placeholders like `https://facebook.com` are skipped in structured data automatically.
- [ ] Don't have one of them (e.g. X/Twitter)? Remove its `<a>` block from the footer in `ZenShared.tsx`.

### 10. Validate structured data
After deploying, run these pages through https://search.google.com/test/rich-results:
- [ ] `/` (LocalBusiness + WebSite)
- [ ] `/contact` (FAQPage + BreadcrumbList)
- [ ] `/programs/200-hrs-hatha-yoga-teacher-training` (Course)
- [ ] `/retreats/roots-of-stillness` (Event: needs real dates and location first)
- [ ] `/blog/<any>` (BlogPosting)

---

## 🟡 P2 — Hosting / deployment (when you export from Figma Make)

### 11. Add `index.html` with static SEO defaults
When you export, Vite needs an `index.html` in the project root. Put defaults in it so that crawlers
and link-preview bots that don't run JavaScript (WhatsApp, LinkedIn, Facebook) still see good tags:
```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>Shiva Yoga Niketan — Yoga Teacher Training in Rishikesh</title>
    <meta name="description" content="Yoga Alliance–accredited 200-hour teacher training, beginner courses and retreats in Rishikesh, India. Learn Hatha, Vinyasa and Kundalini yoga." />
    <meta property="og:type" content="website" />
    <meta property="og:title" content="Shiva Yoga Niketan — Yoga Teacher Training in Rishikesh" />
    <meta property="og:description" content="200-hour Hatha, Vinyasa and Kundalini yoga teacher training and retreats in Rishikesh, India." />
    <meta property="og:image" content="https://www.shivayoganiketan.com/og-cover.jpg" />
    <meta name="twitter:card" content="summary_large_image" />
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <!-- Load fonts here (non-blocking) and remove the @import from src/styles/fonts.css -->
    <link rel="preload" as="style" href="https://fonts.googleapis.com/css2?family=Marcellus&family=Lato:wght@400;700&family=Playfair+Display:ital,wght@1,400;1,500&display=swap" />
    <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Marcellus&family=Lato:wght@400;700&family=Playfair+Display:ital,wght@1,400;1,500&display=swap" />
  </head>
  <body>
    <div id="root"></div>
    <!-- Point this at your entry file: a small main.tsx that renders <App /> from src/app/App.tsx -->
    <script type="module" src="/src/main.tsx"></script>
  </body>
</html>
```
(`RouteHead` still overrides these per page once the app loads.)

### 12. SPA fallback + redirects on the host
- [ ] Make unknown paths serve `index.html` so deep links like `/programs/…` work:
  Netlify `_redirects` → `/*  /index.html  200` · Vercel → `rewrites` to `/` · Apache → `.htaccess` rewrite.
- [ ] Force **HTTPS** and pick **one** host (`www.` or not): 301-redirect the other one. `SITE.url` uses `www`.
- [ ] Moving from an old site? 301-redirect every old URL to its new page (keeps rankings).

### 13. Consider pre-rendering (optional but recommended)
This is a client-side React app: Google renders JavaScript, but slower. For the best SEO, pre-render
the routes (e.g. `vite-plugin-prerender`, or host on Netlify/Vercel with pre-rendering).
- Note: the custom 404 page shows correctly but the server still returns **HTTP 200**. Pre-rendering
  or a host-level 404 rule fixes that. (It's already `noindex`, so Google won't list it.)

### 14. Performance: images (the biggest remaining factor)
Code-side loading is already optimised: lazy page chunks, prefetching, hero `fetchpriority`,
eager heroes, lazy below-the-fold images, consent-gated analytics. What's left depends on the real images:
- [ ] **Hero images:** max ~1920 px wide, WebP at quality ~75–80, **under 200 KB**. Other photos: ≤ 1200 px, under 120 KB.
- [ ] **Add `width` and `height`** (the image's real pixel size) to every `<img>` you swap in. This prevents layout shift (CLS) while images load.
- [ ] **Keep `{...LCP}` on only the one main hero image per page** (it's already placed; keep it when you swap the src).
- [ ] Optional: serve responsive sizes with `srcSet` (e.g. 768 / 1280 / 1920 px versions).
- [ ] In `index.html` (task #11), preload the **homepage** hero:
      `<link rel="preload" as="image" href="/assets/hero-bg.webp" fetchpriority="high">`.

### 14b. Performance check after real images are in
- [ ] Run PageSpeed Insights (https://pagespeed.web.dev) on `/`, `/programs/200-hrs-hatha-yoga-teacher-training` and `/contact`, in **mobile** mode.
      Targets: **LCP < 2.5 s, CLS < 0.1, INP < 200 ms**, Performance score ≥ 90.
- [ ] Host on a CDN with **Brotli/gzip** and long cache headers for `/assets/*` (`Cache-Control: public, max-age=31536000, immutable`). Netlify, Vercel and Cloudflare Pages do this by default.
- [ ] Remove unused npm packages before the production build (`@mui/*`, `@emotion/*`, unused `@radix-ui/*`). This makes installs faster and keeps the build lean.

---

## 🟢 P3 — Growth & nice-to-have

- [ ] **Payments / deposits:** add Razorpay (India) or Stripe for the USD 200 registration fee.
- [ ] **Currency:** decide whether to show INR alongside USD on `/prices`.
- [ ] **Search:** the navbar search overlay is visual only and doesn't search yet. Either remove it or ask for a site search.
- [ ] **Blog strategy:** publish 2–4 genuine articles a month targeting searches such as "200 hour yoga teacher training Rishikesh", "best time to do YTT in India" or "Hatha vs Vinyasa TTC".
- [ ] **Legal review:** have the Privacy Policy and Terms checked for GDPR (EU students) and India's DPDP Act 2023.
- [ ] **Accessibility audit:** run axe DevTools or Lighthouse once real content and images are in.
- [ ] **Smooth-scroll feel (optional):** try the site with a mouse wheel and a trackpad. If it feels too floaty or too stiff, change `LERP` at the top of `src/app/components/SmoothScroll.tsx` (0.08 is silkier, 0.15 is snappier). To turn it off completely, delete `<ScrollManager />`'s Lenis block or set `LERP = 1`.
- [ ] **hreflang / translations:** only needed if you add other languages.

---

## ✅ Done in code (for reference, no action needed)
See `CHANGELOG.md` → *[2026-10-31] SEO + developer launch audit fixes*.
