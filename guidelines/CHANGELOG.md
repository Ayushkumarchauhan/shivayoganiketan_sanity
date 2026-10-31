# Changelog — Shiva Yoga Niketan Website

This document records every change made to the project so it is easy to track after export
in VS Code. **It must be updated every time a new change is made from here on.**

Format: newest entries at the top. Each entry lists the request, what was done, which files
were touched, and any follow-up notes.

---

## Conventions & standing rules (read first)

- **All content, dates, and fees are edited in code** (not hardcoded in a CMS), so they can be
  changed easily in VS Code after export. Look for the relevant `const` arrays at the top of each
  page component.
- **Images** (except the logo) are text placeholders via `placeholder("name")` and are meant to be
  swapped with `.webp` files — see `Replacing_Images.md`.
- **Design tokens are fixed** — no new brand colors or fonts. Palette: cream `#f8f3ed`,
  sage/green `#c3dbc5`, deep teal `#074240` (hover `#0a5552`), ink `#151515`, grey `#434a4a`,
  muted `#8b8a82`, border `#e8e0d8`. Fonts: Marcellus (headings), Lato (body/UI),
  Playfair Display Italic (accent). The only non-brand values are documented semantic form-state
  colors: `ERROR_COLOR = "#b23b2e"` (validation) and `SUCCESS_COLOR = "#074240"` (reuses brand teal).
- **Build verification:** do **not** run `vite build` (it falsely fails on the missing
  `index.html` entry). Verify with the esbuild bundle script: `node /tmp/build.mjs` run from
  `/workspaces/default/code` — a clean result prints `BUNDLE OK, warnings: 0`.
- Shared design-system components live in `src/app/components/ZenShared.tsx`
  (`Navbar`, `Footer`, `SectionBadge`, `StarRating`, `SelectMenu`, buttons, etc.) and
  `src/app/components/SiteExtras.tsx` (SEO/UX chrome — see below).

---

## [2026-10-31] Sanity CMS for Programs, Retreats, Teachers & Blog

**Request:** "I want it easy to add, delete or edit Programs, Retreats, Teachers and Blogs." The
owner chose Sanity (project `ntvvkd3p`, dataset `production`), with roles for admin and manager.

### Architecture
- **Studio (editing dashboard):** new `/studio` folder, a separate app (Sanity v6, React 19) to be
  hosted at `shivayoganiketan.sanity.studio`.
  - Content types: `program`, `retreat`, `teacher`, `post`.
  - Field tabs (Card & basics, Page content, Schedule, Fees & dates, Practical info, SEO), helpful
    descriptions and validation on every field.
  - Image fields with alt text and hotspot. Programs pick teachers through references.
  - Blog "Article" editor with custom blocks matching the current article design: Photo, Quote,
    Highlight box, Accordion, Photo + text card.
  - Menus are sorted by **Display order**.
  - Verified with `sanity build` ✔ and `sanity schema validate` (**0 errors, 0 warnings**), built in
    `/tmp` so no Studio dependencies sit in the project.
- **Website CMS layer (`src/app/cms/`):**
  - `config.ts`: project settings, a 3.5 s timeout and an `enabled` kill-switch.
  - `client.ts`: tiny read-only GROQ client (plain `fetch` to the CDN, published content only, no SDK).
  - `image.ts`: Sanity CDN URL builder (auto WebP/AVIF, resize, hotspot crop).
  - `content.ts`: **one** query for all four types, mapped into the exact shapes the pages already
    use. A list is `null` when it's empty in Sanity or Sanity is unreachable.
  - `RichText.tsx`: Portable Text rendered with the site's existing article styles.
  - `useCms.ts`: the hook pages use.
  - New dependency: `@portabletext/react@^3` (React 18 compatible).
- **Loading:** the root route now has a `loader` (`routes.tsx`, `id: "root"`) that fetches content
  once per visit before the first render (no flicker), with `shouldRevalidate: false`.
  `createBrowserRouter` moved to `App.tsx`; `routes.tsx` now exports `routes`.
- **Fallback:** every page keeps its built-in array (now `export`ed) and uses it whenever that list
  is empty in Sanity or Sanity is down, so the site never shows empty sections.

### Pages wired to Sanity
- **Programs:** `ProgramsPage` (data-driven grid; every 4th card keeps the sage "flipped" style),
  `ProgramDetailPage` (all sections, teacher references, SEO overrides), navbar Programs menu, footer
  list, homepage upcoming cards (`featured`), and the Appointment form's course + date lists (dates
  pooled from all programs).
- **Retreats:**
  - `RetreatsPage` and `RetreatDetailPage`. The detail page adds price, rich-text description,
    organiser and venue fields. Prev/next follow Display order. Event schema uses the real start and
    end dates when set.
  - About carousel, Prices carousel and footer list.
  - Homepage cards and both booking dropdowns.
- **Teachers:** `TeachersPage` (`listed` flag), `TeacherProfilePage` (bio paragraphs, contact details
  that fall back to the school's, journal cards that link to the 2 newest posts), About team (first 3
  listed) and homepage instructors (first 3 listed).
- **Blog:** `BlogPage` and `BlogPostPage` (cover image, rich-text article, author bio, related posts
  with same category first, BlogPosting schema with the real date and image). In CMS mode an empty
  article shows only the summary; the sample layout is used only for built-in fallback posts.
- **Sitemap page** (`/sitemap`): detail links follow Sanity.

### Seed + import
- `studio/seed/build-seed.mjs` builds `studio/seed/content.ndjson` from the pages' built-in arrays
  (bundled with esbuild, nothing retyped): 4 programs, 8 retreats (including the two real 7- and
  15-day Rishikesh retreats from the homepage), 10 teachers (the 4 real ones listed), and 9 posts
  whose articles use each editor block type.
- `studio/seed/import.mjs` imports it via the Sanity HTTP API with a temporary Editor token
  (`createOrReplace`; safe to re-run).

### SEO
- `scripts/generate-sitemap.mjs` rebuilds `public/sitemap.xml` from Sanity. It now runs inside
  `pnpm build` (`"build": "node scripts/generate-sitemap.mjs && vite build"`). It never fails the
  build; if Sanity is unreachable it keeps the existing entries.
- Per-item **SEO tab** (Google title/description) overrides the generated meta on all four detail
  page types.

### Verification
- `BUNDLE OK, warnings: 0`.
- New SSR smoke test (`/tmp/smoke`): every sitemap URL plus 404 cases rendered server-side. Without
  Sanity: **45/45 OK**. With seeded Sanity content: **47/47 OK**, including CMS-only pages.
- CORS checked: the production domain is allowed; the Figma preview and `localhost` are still to add.

### Files touched
New: `studio/**`, `src/app/cms/{config,client,image,content,useCms}.ts`, `src/app/cms/RichText.tsx`,
`scripts/generate-sitemap.mjs`, `guidelines/Editing_Content_in_Sanity.md`.
Updated: `routes.tsx`, `App.tsx`, `ProgramsPage`, `ProgramDetailPage`, `RetreatsPage`,
`RetreatDetailPage`, `TeachersPage`, `TeacherProfilePage`, `BlogPage`, `BlogPostPage`,
`YogaLandingPage`, `AboutPage`, `PricesPage`, `AppointmentPage`, `SitemapPage`, `ZenShared.tsx`,
`package.json`, `public/sitemap.xml`, `guidelines/{Guidelines,Manual_Launch_Tasks,CHANGELOG}.md`.

### Pending (owner): see `Manual_Launch_Tasks.md` → S1–S7.

---

## [2026-10-31] Footer-flash fix + smooth scrolling

**Request:** "When I click on any page the footer loads first and then the page. Is that something to
fix? Also I would like to see smooth scroll behaviour while interacting with the website."

### Root cause of the footer flash
`ScrollToTop` reset the scroll in a `useEffect`, which runs **after** the browser paints. So the new
page was first drawn at the *old* scroll position (usually down by the footer, since many links live
there) and then jumped to the top. The fix is to reset the scroll in `useLayoutEffect`, which runs
**before paint**, so the new page always appears at the top.

### Changes
- **New `src/app/components/SmoothScroll.tsx`** (`ScrollManager`, `getLenis`, `scrollToY`):
  - **Smooth inertial wheel/trackpad scrolling** with [Lenis](https://lenis.darkroom.engineering)
    (`lenis` npm package, about 4 KB gz). Turned on only for mouse/trackpad (`pointer: fine`).
    Phones keep their native momentum scroll. Off for `prefers-reduced-motion`, and it switches
    on or off live if those settings change.
    - Feel is set by `LERP = 0.1` (lower is silkier, higher is snappier). The sticky-navbar offset
      for anchors is `NAV_OFFSET = -96`.
  - **Pre-paint route scroll reset.** A new page jumps to the top instantly before paint; the
    footer flash is gone.
  - **Back/Forward restores your exact position** on each page. Positions are saved per history
    entry in `sessionStorage`, and `history.scrollRestoration = "manual"`.
  - **`#hash` links glide** to their section, clear of the sticky navbar, and move keyboard focus
    there. Used by the legal-page table of contents and the skip link. Clicking a link to the
    page you're already on glides back to the top.
- **`routes.tsx`:** `ScrollToTop` was removed and replaced by `<ScrollManager />`.
- **`theme.css`:** added the Lenis base rules and native `scroll-behavior: smooth` for touch/no-JS.
  It is disabled while Lenis runs so the two don't conflict. The reduced-motion block still wins.
- **`ZenShared.tsx`:**
  - `data-lenis-prevent` on the dropdown listbox and the mobile-menu scroll area, so they scroll
    natively.
  - Lenis is paused (`stop()`/`start()`) while the mobile menu or search overlay is open, so the
    page behind doesn't scroll.
- **`package.json`:** `lenis ^1.3.27` added.

> **Rule for future work:** any new box with its own scrollbar (modal body, long dropdown, chat
> widget) needs the `data-lenis-prevent` attribute, or the page will scroll instead of the box.

**Files touched:** `SmoothScroll.tsx` (new), `routes.tsx`, `ZenShared.tsx`, `src/styles/theme.css`,
`package.json`, `guidelines/CHANGELOG.md`, `guidelines/Manual_Launch_Tasks.md`.

**Build:** `BUNDLE OK, warnings: 0`.

---

## [2026-10-31] Page-loading performance pass

**Request:** "Have you taken care of the page loading for best performance?"

**Baseline measured (minified + gzipped):** the first load is about 60 KB of JS (shared vendor chunk
32.9 KB plus page chunk plus app shell). Every page is already its own lazy chunk, and the largest is
ProgramDetail at 15.8 KB gz. Fonts were already trimmed to the weights in use with `display=swap`.
Analytics is consent-gated. So the JS payload was fine; the gaps were in *how* things load.

### Changes
- **`routes.tsx` rewritten:**
  - **Route prefetching.** A single `pages` importer map is shared by the router and a new
    `usePrefetch()`.
    - *Intent prefetch:* hovering, touching or keyboard-focusing any internal link downloads that
      page's chunk early.
    - *Idle warm-up:* 2.5 s after load, in idle time, it fetches Programs, Program detail,
      Appointment, Contact, Retreats and About.
    - It is skipped on Data Saver and 2G connections.
  - **No more blank flash on navigation.** The full-content spinner used to replace the page during
    every route change. Now the current page stays visible and a 3 px teal progress bar shows only
    if loading takes over 150 ms, so prefetched navigations show nothing. The spinner is kept only as
    the first-load `HydrateFallback`.
  - The route table is condensed to one line per route with `lazy("key")`.
- **`App.tsx`:** the Google Fonts preconnect now runs at module load, before first render. It used to
  run in a `useEffect` after paint.
- **LCP (largest image) hints:**
  - New `LCP` helper in `imagePlaceholder.ts`, which spreads `fetchpriority="high"`.
  - Applied to the main hero image on Home, About, Prices, Programs, Program detail, Retreats,
    Retreat detail, Teachers, Teacher profile and Blog post (both hero variants).
  - Hero images on those pages changed from `loading="lazy"` to `loading="eager"`. Lazy loading an
    above-the-fold image delays LCP.
- **Carousels (Home + About):** the `requestAnimationFrame` auto-scroll pauses when off-screen
  (`IntersectionObserver`) and is disabled for `prefers-reduced-motion`.

### Files touched
`src/app/routes.tsx`, `src/app/App.tsx`, `src/app/components/imagePlaceholder.ts`, `AboutPage.tsx`,
`YogaLandingPage.tsx`, `PricesPage.tsx`, `ProgramsPage.tsx`, `ProgramDetailPage.tsx`,
`RetreatsPage.tsx`, `RetreatDetailPage.tsx`, `TeachersPage.tsx`, `TeacherProfilePage.tsx`,
`BlogPostPage.tsx`, `guidelines/Manual_Launch_Tasks.md`, `guidelines/Replacing_Images.md`.

### Note: audit fixes re-applied
While doing this pass I found that the **code** changes from *"SEO + developer launch audit fixes"*
(next entry) were missing, because the project had been restored to an earlier version. With the
owner's approval they were **re-applied in full** on top of this performance work. The route-level
`SkipLink` and `#main-content` now live in the new `routes.tsx`.

**Build:** `BUNDLE OK, warnings: 0`.

---

## [2026-10-31] SEO + developer launch audit fixes

> ✅ **Status: re-applied on 2026-10-31** (after a version restore had removed it). Re-applied on top of the performance pass and verified with `BUNDLE OK, warnings: 0`. Everything below is present in the code.

**Request:** "Do the fixes that you possibly can, act as an experienced SEO analyst and developer.
List the changes to be done manually, as a document in the guidelines folder, and keep it updated."

### New document
- **`guidelines/Manual_Launch_Tasks.md`**: prioritised (P0–P3) checklist of tasks only the owner can
  do (API keys, real content, images, Google accounts, hosting). **Update it with every future change
  that adds a manual step.**

### SEO
- **H1s:** the homepage hero is now a real `<h1>` (no visual change, plus an `sr-only` keyword suffix
  "Yoga Teacher Training & Retreats in Rishikesh, India"). The About hero is an `<h1>`, and its copy
  changed from "Why We are the Best Clinic?" to "Why Study *Yoga* With Us?".
- **Template medical copy removed:** "World-class rehabilitation solutions…" in the Prices, Programs
  and Retreats heroes was replaced with yoga copy. The Prices H1 "Prices Page" became "Course Fees &
  Pricing". The healthcare bio on blog author cards was rewritten.
- **Soft 404s fixed:** unknown `/programs/:slug`, `/retreats/:slug`, `/blog/:slug` and `/teachers/:slug`
  used to silently show the first item (duplicate content). They now render the 404 page with `noindex`.
- **Real per-page titles and descriptions** for detail pages, using the new `usePageMeta()` instead of
  slug-derived text (e.g. the blog title instead of "Wound Care Rehab Recovery 1").
- **`RouteHead` upgraded:** `meta robots` (index or noindex), canonical only on indexable pages,
  `<html lang="en">`, theme-color, apple-touch-icon, `og:locale`, `og:image` dimensions, optional
  Google Search Console verification tag. The site-wide JSON-LD is now an `@graph` of
  LocalBusiness (with geo, opening hours, map, `sameAs`) and WebSite.
- **Structured data:** BreadcrumbList (all routes), FAQPage (auto from `FaqSection`), Course
  (program pages), Event (retreat pages, dates parsed from the label), BlogPosting (blog posts) and
  Person (teacher pages).
- **`noindex`:** `/thank-you` and every 404.
- **`public/sitemap.xml`** rewritten: 16 → **41 URLs**, adding all programs, 6 retreats (including the
  missing *Paths of Awakening*), 10 teachers and 9 blog posts, with `lastmod`, `changefreq` and `priority`.
- **`public/robots.txt`:** comments added. Utility pages are kept out of search with `noindex`, not
  `Disallow`.
- **Sitemap page and footer:** *Paths of Awakening* added. The sitemap page now lists teachers and
  blog posts.
- **NAP consistency:** the footer phone was fake (`1-123-456-7890`). The footer now reads phone, email
  and a new `<address>` from `SITE`. Teacher phones `+(012) 3456-789` were replaced.

### Forms (all were dead before)
- New `submitForm()` helper in `SiteExtras.tsx` sends through **Web3Forms** (`SITE.web3formsKey`).
  With the placeholder key it runs in DEMO mode (shows success, logs a console warning). Each submit
  also fires the GA4 `generate_lead` event.
- New `Honeypot` (spam trap) and `FormError` (inline send error) components.
- Wired up: Contact (→ `/thank-you`), Application (`AppointmentPage`), homepage "Book Your Spot"
  (now has names, autocomplete and validation, → `/thank-you`), retreat-detail booking (was not a
  `<form>` at all; → `/thank-you`), program "Request a Callback", blog "Leave a Reply", and the
  **footer newsletter** (new `NewsletterForm` in `ZenShared.tsx`, with a label and status message).
  Every submit button shows a "Sending…" state.

### UX, content and accessibility
- **Dead buttons** became real links: Meet the Team, More Reviews (×2), Book an Appointment (×2),
  Book Now, Open Profile (×3), Learn More, Find Out More, Read More (×2).
- **Blog share buttons** now work: Facebook and X share dialogs, native share, and copy link.
- **Retreat detail:** three Lorem-ipsum paragraphs replaced with real copy. Organizer and venue blocks
  used "Emma Thompson", `example.com` and a New York address; they now show `SITE` details, the
  retreat's location, and a Google Maps link. Date and time come from the retreat data.
- **Teacher profiles:** the 4 real teachers on `/teachers` (Raj Singh, Gokul Bisht, Shashank Badoni,
  Gopal) had no profile data, so their links showed Angela Carbone. Profiles were added; credentials
  are marked "to be confirmed". The About page team cards now show the real teachers.
- **Sticky mobile CTA:** WhatsApp button added (`SITE.whatsapp`).
- **Skip-to-content link** and a `#main-content` target in `routes.tsx`.
- **Visible keyboard focus ring** (teal) and **`prefers-reduced-motion`** support in `theme.css`. The
  auto-scrolling carousels on Home and About pause for users who prefer reduced motion.

### `SITE` constants added (`SiteExtras.tsx`)
`googleSiteVerification`, `whatsapp`, `phoneDisplay`, `geo`, `openingHours`, `social{}`,
`web3formsKey`, plus the helper `isRealProfile()`.

### Files touched
`SiteExtras.tsx`, `ZenShared.tsx`, `routes.tsx`, `YogaLandingPage.tsx`, `AboutPage.tsx`,
`ContactPage.tsx`, `AppointmentPage.tsx`, `BlogPostPage.tsx`, `ProgramDetailPage.tsx`,
`ProgramsPage.tsx`, `PricesPage.tsx`, `RetreatsPage.tsx`, `RetreatDetailPage.tsx`,
`TeacherProfilePage.tsx`, `TeachersPage.tsx`, `NotFoundPage.tsx`, `SitemapPage.tsx`,
`src/styles/theme.css`, `public/sitemap.xml`, `public/robots.txt`, `guidelines/Manual_Launch_Tasks.md` (new),
`guidelines/Guidelines.md`.

**Build:** `/tmp/build.mjs` had been deleted and was recreated (an esbuild bundle of
`src/app/App.tsx`). Result: `BUNDLE OK, warnings: 0`.

---

## [2026-09-17] Pre-launch SEO + UX checklist

**Request:** Implement a complete pre-launch SEO + UX checklist using the existing design system
(no new styles, colors, or fonts; reuse components and existing mobile breakpoints).

### Pages created
| Page | Route | Purpose |
|------|-------|---------|
| Custom 404 | `*` (catch-all) | LeafIcon illustration + "404", H1 "Page not found", "Back to Home" button, internal links row. |
| Thank You | `/thank-you` | Post-submit confirmation — Check icon, "we'll reply within one business day", return-home button. |
| Privacy Policy | `/privacy` | 6 sections via shared `LegalLayout` (sticky TOC sidebar + numbered sections). |
| Terms & Conditions | `/terms` | 7 sections (bookings, payments, cancellations, conduct, liability, contact) via `LegalLayout`. |
| Sitemap | `/sitemap` | All pages grouped (Main / Programs / Retreats / Journal / Legal) as link cards; linked from footer. |

### Components created (`src/app/components/SiteExtras.tsx`)
- **`RouteHead`** — per-route SEO: unique 50–60 char titles + 120–160 char descriptions for every
  route, canonical URL, OpenGraph + Twitter tags, an SVG-data-URI favicon, and a JSON-LD
  `LocalBusiness` schema (real Rishikesh address). Also fires GA4 page-views.
- **`Breadcrumbs`** — auto-generated from the URL; hidden on the homepage.
- **`StickyMobileCTA`** — mobile-only fixed bottom bar (Call + "Book Your Place"); hidden on `/appointment`.
- **`CookieBanner`** — consent stored in `localStorage` (`syn-cookie-consent`); analytics only loads after Accept.
- **`FaqSection`** — accordion using existing card styling.
- **`PrimaryButton`** — teal/green variants with a `loading` spinner state.
- **`TextField`** — input/textarea with `error` (red border + AlertCircle) and `success` (teal + Check) states.
- **`SITE`** constants (name, url, phone `+91-7455855666`, email, address, mapQuery, ogImage, `gaMeasurementId`) + `loadAnalytics()` (GA4, gated behind consent).
- **`LegalLayout`** (`src/app/components/LegalLayout.tsx`) — reusable legal-page template with sticky TOC.

### Components updated
- **`ContactPage.tsx`** — added `Breadcrumbs`, a response-time promise banner, a reviews section
  (StarRating cards), a team photo section, and 5 FAQs. "Get Directions" and the address now link to
  real Google Maps directions/search. The form uses `TextField` (validation error states) and
  `PrimaryButton` (loading state), and navigates to `/thank-you` on submit.
- **`ZenShared.tsx` (Footer)** — Privacy / Terms & Conditions / Sitemap links added to the copyright bar.
- **`routes.tsx`** — added routes `thank-you`, `privacy`, `terms`, `sitemap`, plus the `*` catch-all
  404; mounted `RouteHead`, `StickyMobileCTA`, and `CookieBanner` globally in `Root`; added bottom
  padding on mobile so the sticky bar never covers content.
- **`public/robots.txt`** and **`public/sitemap.xml`** created.

### Deploy-dependent placeholders (swap on export)
- GA4 ID is `G-XXXXXXXXXX` (analytics stays off until a real ID is set).
- OG/social image points at `SITE.ogImage`; favicon is an inline SVG — replace with hosted assets.
- `robots.txt` / `sitemap.xml` serving at the domain root depends on the host after export.

**Build:** `BUNDLE OK, warnings: 0`.

---

## [Earlier] Social icon sizing fix

**Request:** "I see inconsistent icon size... There is one social icon section in footer as well. Fix it."

- Diagnosed root cause: exported SVG social paths sat inside oversized viewBoxes (46×46 / 42×42),
  so glyphs rendered tiny/misplaced at any small size.
- Replaced all exported-path social icons with `lucide-react` components at `size={18}`:
  `Facebook` / `Twitter` / `Linkedin` on **TeachersPage** (`SocialPill`), and
  `Facebook` / `Twitter` / `Instagram` in the **Footer** (`ZenShared.tsx`).
- Respected the "only modify the selected element" constraint — summarized the needed footer change
  in plain terms and got user confirmation before editing outside the selection.

---

## [Earlier] Teachers page content

**Request:** "Update the Teachers page with the content given below, correct the english on the paragraph."

- Replaced `TeachersPage.tsx` content with real Shiva Yoga Niketan content and corrected all grammar
  and encoding artifacts (`â€œ`, `â€™`, etc.).
- Added founder section for **Yogi Bhupesh** (5 corrected intro paragraphs, 4 teaching topics, sticky
  photo card with "Founder & Owner" badge and tagline "Unleashing the power within").
- Hero heading "Professional Yoga Teachers in Rishikesh, India" + italic Playfair quote + uppercase
  disciplines line.
- Replaced `TEACHERS` with 4 real teachers: Raj Singh (Hatha & Ashtanga), Gokul Bisht
  (Anatomy & Physiology), Shashank Badoni (Eclectic Philosopher · Guest Faculty), Gopal (Hatha Yoga Master).

---

## [Earlier] Appointment page = Application Form

**Request:** "I want the Book now and Register Now to Open up Appointment page and the contents should
be of the Popup that we created."

- Converted the ProgramDetailPage "Register Now" / "Book Now" CTAs into links to `/appointment`,
  passing `?course=` and `?date=` query params.
- Rewrote **`AppointmentPage.tsx`** to contain the full Application Form (previously a Radix modal):
  Name, Email, Gender, Course, three batch-date selectors, Address, Mobile, DOB, Occupation, Country,
  Message, required T&C checkbox, and a success state ("Application Received"). It pre-fills course/date
  from the URL query params.
- Removed the old modal, its state, and helper components from **`ProgramDetailPage.tsx`**;
  restored `courseNames` used by `CallbackForm`.
- Registration fee kept editable in code (`REGISTRATION_FEE = "USD 200"`).

---

## [Project start] Initial Figma export / baseline

The project began as a **multi-page yoga-retreat website for Shiva Yoga Niketan**, designed in
Figma and exported to run in VS Code. This is the baseline that all later entries build on.

### Stack
- React 18 + TypeScript, Tailwind CSS v4 (configured in `src/styles/theme.css`, no `tailwind.config.js`).
- React Router v7 (Data mode — `createBrowserRouter` + `<RouterProvider>`), Vite 6.
- All pages lazy-loaded as route chunks; `Root` layout renders `Navbar` + `Footer` once.
- A custom `figmaAssetPlugin` in `vite.config.ts` resolves `figma:asset/…` imports to `src/assets/`.

### Pages shipped in the baseline
| Page | Route |
|------|-------|
| Homepage | `/` (`YogaLandingPage.tsx`) |
| About | `/about` (`AboutPage.tsx`) |
| Contact | `/contact` (`ContactPage.tsx`) |
| Teachers listing | `/teachers` (`TeachersPage.tsx`) |
| Teacher profile | `/teachers/:slug` (`TeacherProfilePage.tsx`) |
| Programs listing | `/programs` (`ProgramsPage.tsx`) |
| Program detail | `/programs/:slug` (`ProgramDetailPage.tsx`) |
| Retreats listing | `/retreats` (`RetreatsPage.tsx`) |
| Retreat detail | `/retreats/:slug` (`RetreatDetailPage.tsx`) |
| Blog listing | `/blog` (`BlogPage.tsx`) |
| Blog post | `/blog/:slug` (`BlogPostPage.tsx`) |
| Prices | `/prices` (`PricesPage.tsx`) |
| Appointment | `/appointment` (`AppointmentPage.tsx`) |

### Shared system in the baseline
- `ZenShared.tsx` — `Navbar`, `Footer`, `SectionBadge`, `GreenButton`, `OutlinedButton`,
  `ArrowCircleButton`, `StarRating`, `LeafIcon`, `LogoSymbol`, plus `NAV_LINKS` / `PAGES_DROPDOWN`
  and the footer sitemap arrays.
- Established design system: palette (sage `#c3dbc5`, teal `#074240`, cream `#f8f3ed`, ink `#151515`,
  grey `#434a4a`, muted `#8b8a82`, lavender `#FAE1FB`), typography (Marcellus / Playfair Italic /
  Lato) via `fonts.css`, explicit pixel font sizes, the universal card-hover slide-up pattern, and
  the responsive breakpoint rhythm.
- Content lives in module-level `const` arrays per page; slugs connect listing↔detail pages (see the
  slug reference table in `Claude_Handoff.md`).

> Full architecture, per-page content locations, slug tables, and "do not touch" rules are documented
> in `Claude_Handoff.md` and `FileStructure.md`. This entry summarizes the starting point; every entry
> above it records a change made after this baseline.

---

<!-- Add new entries above this line, newest first. -->
