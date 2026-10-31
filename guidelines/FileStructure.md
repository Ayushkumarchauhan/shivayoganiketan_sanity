# Shiva Yoga Niketan — Project File Structure & Content Reference

> **Purpose:** A complete map of every file in the project so you can find and update any piece of text, image, or data without guessing. Organised from "most likely to edit" to "rarely touched."

---

## Quick-Navigation Index

| I want to change… | Go to… |
|---|---|
| Nav links / Footer links | `ZenShared.tsx` → `NAV_LINKS`, `PAGES_DROPDOWN`, `SITEMAP_*` |
| Footer phone / email / social | `ZenShared.tsx` → `Footer` component |
| Homepage hero text & hero image | `YogaLandingPage.tsx` → `HeroSection` |
| Homepage "Next Retreat" callout | `YogaLandingPage.tsx` → `NextRetreatSection` |
| Homepage "What's Included" cards | `YogaLandingPage.tsx` → `WHATS_INCLUDED_ITEMS` |
| Homepage stats (450+, 12, 98%) | `YogaLandingPage.tsx` → `STATS` |
| Homepage upcoming retreats strip | `YogaLandingPage.tsx` → `RETREATS` |
| Homepage instructor cards | `YogaLandingPage.tsx` → `INSTRUCTORS` |
| Homepage review quotes | `YogaLandingPage.tsx` → `REVIEWS` |
| All retreats (listing + detail) | `RetreatsPage.tsx` → `RETREATS` · `RetreatDetailPage.tsx` → `ALL_RETREATS` |
| All programs (listing + detail) | `ProgramsPage.tsx` → JSX inline · `ProgramDetailPage.tsx` |
| All teachers (listing + profile) | `TeachersPage.tsx` → `TEACHERS` · `TeacherProfilePage.tsx` → `TEACHERS` |
| Blog post listing | `BlogPage.tsx` → `BLOG_POSTS` |
| Pricing tables | `PricesPage.tsx` → `PRICING_CARDS` |
| Appointment booking options | `AppointmentPage.tsx` → `BOOKING_OPTIONS` |
| About page story / team / specialties | `AboutPage.tsx` → `SPECIALTIES` + inline JSX |
| Fonts | `src/styles/fonts.css` |
| Global colours / tokens | `src/styles/theme.css` |
| Page routing | `src/app/routes.tsx` |

---

## Top-Level Directory Layout

```
/
├── guidelines/                   ← Project docs (this file lives here)
│   ├── Guidelines.md
│   ├── ZenRetreat_VS_Code_Guide.md
│   └── FileStructure.md          ← YOU ARE HERE
│
├── src/
│   ├── app/
│   │   ├── App.tsx               ← Root entry point (just mounts RouterProvider)
│   │   ├── routes.tsx            ← All route definitions + Root layout + ScrollToTop
│   │   └── components/           ← Every page and shared component
│   │
│   ├── imports/                  ← All Figma-exported assets (images + SVG paths)
│   └── styles/                   ← Global CSS (fonts, theme tokens, Tailwind)
│
├── package.json
├── vite.config.ts
└── postcss.config.mjs
```

---

## `src/app/` — Application Code

### `App.tsx`
**What it does:** Single line — renders `<RouterProvider router={router} />`.  
**When to edit:** Almost never. Only if the router setup itself changes.

---

### `routes.tsx`
**What it does:** Declares every URL route, the shared `Root` layout (Navbar + Footer rendered once), and the `ScrollToTop` component that resets scroll position on every navigation.

**Key pieces:**

| Symbol | Purpose |
|---|---|
| `Root()` | Wraps every page. Contains `<Navbar />`, `<ScrollToTop />`, and `<Footer />`. |
| `ScrollToTop()` | Watches `pathname`; calls `window.scrollTo` on every route change. |
| `PageLoader` | The spinning lotus shown while a lazy chunk loads. |
| `createBrowserRouter([...])` | Route table — add new pages here. |

**To add a new page:**
1. Create `src/app/components/MyNewPage.tsx`
2. Add a `lazy` entry to the router array, e.g.:
```tsx
{
  path: "my-page",
  lazy: async () => {
    const { default: Component } = await import("./components/MyNewPage");
    return { Component };
  },
},
```

---

## `src/app/components/` — Page Files

### `ZenShared.tsx` ← **Most-edited shared file**

Contains every UI primitive used across all pages, the Navbar, and the Footer.

#### Navbar content

```
Line ~102   NAV_LINKS          Top navigation items (Home, Retreats, Programs, Pages, Contacts)
Line ~110   PAGES_DROPDOWN     Items inside the "Pages" dropdown (About, Teachers, Prices, Blog)
```

**To add a top-level nav link:** push a new object into `NAV_LINKS`.  
**To add a dropdown item:** push a new object into `PAGES_DROPDOWN`.

#### Footer content

```
Line ~502   SITEMAP_EXPLORE    "Explore" column links
Line ~510   SITEMAP_RETREATS   "Retreats" column links (update when you add/rename retreats)
Line ~519   SITEMAP_PROGRAMS   "Programs" column links
Line ~542   Newsletter tagline text ("Enjoy 10% off your first retreat…")
Line ~575   Footer tagline     ("Ancient wisdom. Modern stillness…")
Line ~578   Phone number       href="tel:+11234567890" and display text
Line ~581   Email address      href="mailto:info@shivayoganiketan.com"
Line ~587   Social media URLs  Facebook / Twitter / Instagram href values
```

---

### `YogaLandingPage.tsx` — Homepage (`/`)

#### Images imported at the top of the file

| Variable | Description |
|---|---|
| `imgFrame1000007866` | Hero background photo |
| `imgFrame1000007867` | Hero texture overlay |
| `imgVector` | Lotus icon in the Welcome section |
| `imgHome2` | "Next Retreat" left-side landscape photo |
| `imgP2044 – imgP2047` | "What's Included" four card images |
| `imgScreenshot20250724At1547072` | "About / Unique" section flower photo |
| `imgP2048 – imgP2052` | Upcoming Retreats card images (5 cards) |
| `imgRectangle1,3,4` | Instructor portrait photos (Angela, Marco, Lucia) |
| `imgQuote3 – imgQuote9` | Reviewer avatar photos in testimonials |
| `imgRectangle40277/78` | Video thumbnail images |
| `imgRectangle40317/11/16/15/13/14/18` | Gallery grid images |
| `imgHome3, imgHome4` | Bottom CTA section photos |

#### Data arrays (text content lives here)

```tsx
// ~Line 154
const WHATS_INCLUDED_ITEMS = [
  { img, title: "Daily Yoga Classes",         desc: "Grounding practices…" },
  { img, title: "Daily Meditation Classes",   desc: "Guided practices…"   },
  { img, title: "Sustainable Stays",          desc: "Eco-friendly spaces…" },
  { img, title: "Organic, plant-based meals", desc: "Plant-powered…"      },
];

// ~Line 161
const STATS = [
  { number: "450+", label: "Hearts Reconnected Through Retreats", cta: "Explore Retreats"  },
  { number: "12",   label: "Sacred Locations\nAcross the Globe",  cta: "Explore Locations" },
  { number: "98%",  label: "Of Guests Return or Recommend Us",    cta: "Explore Reviews"   },
];

// ~Line 167  — Upcoming Retreats auto-scroll strip
const RETREATS = [
  { title, slug, img, date, location, type },
  ...  // 5 entries total
];

// ~Line 175
const INSTRUCTORS = [
  { name: "Angela Carbone", role: "Yoga Teacher & Therapist",       img },
  { name: "Marco Sereni",   role: "Meditation Guide & Breathwork",  img },
  { name: "Lucia Mori",     role: "Holistic Wellness Practitioner", img },
];

// ~Line 181
const REVIEWS = [
  { quote: "...", author: "Emily R., Roots of Stillness – Tuscany", img },
  // 7 reviews total
];
```

#### Inline section text (not in arrays)

| Section | Approximate line | Text to change |
|---|---|---|
| Hero heading | ~65 | "Awaken Your" / "Inner Stillness" |
| Hero sub-text | ~75 | "Join us for a transformative journey…" |
| Hero CTA buttons | ~81 | "Explore Retreats" / "Book Your Spot" |
| Welcome badge | ~100 | "Welcome to Shiva Yoga Niketan" |
| Welcome quote | ~103 | "A sanctuary to restore balance…" |
| Next Retreat title | ~129 | "Whispers of Stillness" / "Amalfi Coast" |
| Next Retreat date | ~135 | "Sept 18–24 / Limited spots available" |
| Next Retreat body | ~138 | "Awaken to the gentle embrace…" |
| About section | ~296 | "What Makes Our Retreats Unique" |
| About body | ~301 | "At Shiva Yoga Niketan, we offer…" |

---

### `RetreatsPage.tsx` — Retreats Listing (`/retreats`)

#### Images

```
src/imports/Retreats/
  a099ce92356fc316ba16f3fc444ca1729270e256.png  ← Hero right-side photo
  a24954574820dcbc43a9603f27576a448cf9090e.png  ← Card 1  (Roots of Stillness)
  9a4d4b09f152b08b42b16f7a0cd461a5d8c76672.png  ← Card 2  (Sacred Flow)
  83fcf079f8e0ea22da37d50cd0ca91a1f7373663.png  ← Card 3  (Awaken in the Wild)
  a0f4cc2d049d73c3a71ff37da79366310541ce2d.png  ← Card 4  (Paths of Awakening)
  a32adc7199562f9582987609d390753c06a25c8e.png  ← Card 5  (Winter of Presence)
  3b94e82cf065436918cd36fc21aa65510f1f6882.png  ← Card 6  (The Inner Horizon)
  35e46892457e99c63e18e383f342a45b912e12f7.png  ← Shared texture overlay
```

#### Data array

```tsx
// ~Line 24
const RETREATS: Retreat[] = [
  { slug, name, date, location, category, img },
  // 6 retreats total
];
```

**Fields:** `slug` must match the URL and match the slug in `RetreatDetailPage.tsx`. `name` appears on the card. `date` / `location` / `category` appear as tags.

---

### `RetreatDetailPage.tsx` — Retreat Detail (`/retreats/:slug`)

#### Images

```
src/imports/OpenRetreat/
  a24954574820dcbc43a9603f27576a448cf9090e.png  ← Default hero portrait
  9797dc07b5741d58c752edc81d0509f3ef8134fd.png  ← Map / location image
  c15541e4c8dda55da9f2b8872a758c446473bf58.png  ← Booking sidebar photo
  35e46892457e99c63e18e383f342a45b912e12f7.png  ← Texture overlay

src/imports/Retreats/   (same images reused for per-retreat hero)
```

#### Data array

```tsx
// ~Line 35
const ALL_RETREATS: RetreatData[] = [
  {
    slug:      "roots-of-stillness",
    name:      "Roots of Stillness",
    badge:     "Yoga & Meditation",    ← category pill
    tagline:   "Join volunteers…",     ← subtitle under heading
    date:      "September 18–24, 2025",
    time:      "12:00 PM",
    location:  "Tuscany, Italy",
    heroImg:   imgCard1,               ← which image to show as hero
    prevTitle / prevSlug,              ← previous retreat navigation
    nextTitle / nextSlug,              ← next retreat navigation
  },
  // 6 entries total — one per retreat
];
```

**To add a new retreat:** add an entry here AND in `RetreatsPage.tsx → RETREATS`, then add a card image import at the top of both files.

---

### `ProgramsPage.tsx` — Programs Listing (`/programs`)

#### Images

```tsx
// Top of file (figma:asset imports)
imgHeroPhoto   ← Right side of hero banner
imgP2044       ← Morning Ritual Flow card photo
imgP2045       ← Deep Rest Yin Yoga card photo
imgP2046       ← Sound Healing & Nada Yoga card photo
imgP2047       ← Mindful Eating & Ayurveda card photo
imgP2048       ← Nature Walks & Forest Bathing card photo
imgDiscountPhoto ← Bottom CTA / discount section photo
```

#### Program cards (inline JSX, ~Line 277)

Each `<PhotoProgramCard>` and `<FlippedProgramCard>` is written inline in the `ProgramsPage` return JSX (not a data array). Each card has:

| Prop | What it controls |
|---|---|
| `title` | Card heading (also shown on hover panel) |
| `description` | Text shown only on hover |
| `slug` | Must match the URL slug in `ProgramDetailPage.tsx` |
| `image` | Card background photo |
| `icon` | Which SVG icon appears in the card corner |

Available icon components: `<YogaIcon />`, `<BowlIcon />`, `<MeditationIcon />`, `<NatureIcon />`

**Discount section text (~Line 213):** "Get a special 50% discount and unleash your health." — update this to your actual offer.

---

### `ProgramDetailPage.tsx` — Program Detail (`/programs/:slug`)

Contains per-program data (schedule, description, included items). Search for the slug string (e.g. `"morning-ritual-flow"`) to find the matching data block.

---

### `TeachersPage.tsx` — Teachers Listing (`/teachers`)

#### Images

```tsx
// Top of file (figma:asset imports)
imgHeroPhoto   ← Right side of hero banner
imgTeacher1    ← Angela Carbone portrait
imgTeacher2    ← Meghan Conner portrait
imgTeacher3    ← Sofia Renner portrait
imgTeacher4    ← Lena Hart portrait
imgTeacher5    ← Maya Tran portrait
imgTeacher6    ← Priya Sharma portrait
imgApptPhoto   ← Appointment form section photo
```

#### Data array

```tsx
// ~Line 209
const TEACHERS = [
  { name: "Angela Carbone", title: "Yoga Teacher & Therapist", photo: imgTeacher1, mask: imgImage,  slug: "angela-carbone" },
  { name: "Meghan Conner",  title: "Yoga Teacher & Therapist", photo: imgTeacher2, mask: imgImage2, slug: "meghan-conner"  },
  { name: "Sofia Renner",   title: "Yoga Teacher & Therapist", photo: imgTeacher3, mask: imgImage4, slug: "sofia-renner"   },
  { name: "Lena Hart",      title: "Yoga Teacher & Therapist", photo: imgTeacher4, mask: imgImage,  slug: "lena-hart"      },
  { name: "Maya Tran",      title: "Yoga Teacher & Therapist", photo: imgTeacher5, mask: imgImage2, slug: "maya-tran"      },
  { name: "Priya Sharma",   title: "Yoga Teacher & Therapist", photo: imgTeacher6, mask: imgImage4, slug: "priya-sharma"   },
];
```

**`mask`** controls the decorative shape clipped over the portrait. Three shapes exist: `imgImage`, `imgImage2`, `imgImage4` (imported from `svg-ewnsb`).

---

### `TeacherProfilePage.tsx` — Teacher Profile (`/teachers/:slug`)

Contains a `TEACHERS` array with **full per-teacher detail**. Every field listed below maps to something visible on the profile page:

```tsx
const TEACHERS = [
  {
    slug,                   // URL segment
    name,                   // Full name heading
    firstName,              // Used in "Meet {firstName}" heading
    title,                  // Role subtitle
    photo,                  // Portrait image
    phone,                  // Phone displayed on sidebar
    office,                 // Office/fax line
    email,                  // Email displayed on sidebar
    bio1,                   // First biography paragraph
    bio2,                   // Second biography paragraph
    education,              // Education line
    cert,                   // Certification line
    expertise,              // Expertise line
    experience,             // Years of experience
    shifts: [               // Weekly schedule table
      { day: "Monday", time: "09:00 – 14:00" },
      ...
    ],
    art1Title, art1Tag, art1Img,   // First related article card
    art2Title, art2Tag, art2Img,   // Second related article card
  },
  // One entry per teacher (6 total, must match TeachersPage slugs)
];
```

**To add a new teacher:** add an entry here, an entry in `TeachersPage.tsx → TEACHERS`, and import the new photo at the top of both files.

---

### `BlogPage.tsx` — Blog Listing (`/blog`)

#### Images

```
src/imports/BlogPage-1/
  ac5af484696a8d0236f4d11a6725dd0cea7b6a22.png  ← Post 1 thumbnail
  d769b327ef05e84cee6f6220f9ec17456ba9a23e.png  ← Post 2 thumbnail
  46e862f9e79af9d2fcaee7901f3ad03fdef1edfb.png  ← Post 3 thumbnail
  5b1794010c9f8273dcef646874434b8573cf05d6.png  ← Post 4 thumbnail
  b38757ae45fd678253f59c2199712f7950bf09cc.png  ← Post 5 thumbnail
  62237846ca56f9bf3898094200d27ba5c09b1356.png  ← Post 6 thumbnail
  13f0bb4cfb7aca8c506c9d8c09ba46521a8e1e3f.png  ← Post 7 thumbnail
  79ba35a80b10e01726e258879fda054b2c72b190.png  ← Post 8 thumbnail
  f7c58b14b442ee6e972f067fcb1bf401f84236d2.png  ← Post 9 thumbnail
```

#### Data array

```tsx
// ~Line 28
const BLOG_POSTS: BlogPost[] = [
  { id: 1, img, category: "Health",         title: "Wound Care Plays a Major Role…",          slug },
  { id: 2, img, category: "Injury",         title: "Three Years Post Injury…",                slug },
  { id: 3, img, category: "Success Stories",title: "A Life Devoted to Helping Others…",        slug },
  // 9 posts total
];
```

---

### `BlogPostPage.tsx` — Blog Post Detail (`/blog/:slug`)

Images are in `src/imports/OpenPost1-1/` and `src/imports/OpenPost2/`. The page is currently a single shared layout — individual post content would need to be added as a data array keyed by slug (similar to how `RetreatDetailPage` works).

---

### `AboutPage.tsx` — About Us (`/about`)

#### Images

```tsx
// Top of file (figma:asset imports)
imgHeroLeft   ← Left side of hero banner
imgAbout      ← "Our Story" main photo
imgStory1/2/3 ← Three small story grid photos
imgTeacher1/2/3 ← Team section portraits (Angela, Meghan, Sofia)
imgRetreat1–5   ← "Areas of Speciality" carousel card images
imgQuote1/2/3   ← Testimonial reviewer avatars
```

#### Data arrays

```tsx
// ~Line 101  — Areas of Speciality carousel (auto-scroll strip)
const SPECIALTIES = [
  { image, title: "Roots of Stillness", slug, date, location, type },
  // 5 entries — mirrors the Retreats listing
];
```

Team member cards and testimonial quotes are written inline in the JSX (search for the name or quote text to find and edit them).

---

### `PricesPage.tsx` — Fees & Registration (`/prices`)

#### Images

```
src/imports/Prices/
  34253944d4ac1c867752643f53df2692c15eda61.png  ← Hero right photo
  a24954574820dcbc43a9603f27576a448cf9090e.png  ← Featured program card 1
  9a4d4b09f152b08b42b16f7a0cd461a5d8c76672.png  ← Featured program card 2
  83fcf079f8e0ea22da37d50cd0ca91a1f7373663.png  ← Featured program card 3
  35e46892457e99c63e18e383f342a45b912e12f7.png  ← Texture overlay
```

#### Pricing data

```tsx
// ~Line 33
const PRICING_CARDS: PricingCard[] = [
  {
    id:          "3-day-reset",
    title:       "3-Day Reset",
    description: "A gentle weekend to unplug and begin again.",
    highlighted: true,          // ← true = sage-green featured card style
    detailSlug:  "3-day-reset",
    sections: [
      {
        roomType: "Single Room",
        rows: [
          { label: "3 Days",                regular: "$420", earlyBook: "" },
          { label: "3 Days (Early Booking)", regular: "$380", earlyBook: "" },
        ],
      },
      { roomType: "Shared Room", rows: [...] },
    ],
  },
  // Additional packages follow the same structure
];
```

---

### `AppointmentPage.tsx` — Appointment Booking (`/appointment`)

#### Images

```
src/imports/Appointment/
  129f6466e4879c13790b55a883d9d282b7232681.png  ← Left yoga photo
  35e46892457e99c63e18e383f342a45b912e12f7.png  ← Texture overlay
```

#### Booking dropdown options

```tsx
// ~Line 9
const BOOKING_OPTIONS = {
  retreat: [
    "Roots of Stillness",
    "Sacred Flow",
    "Awaken in the Wild",
    "Paths of Awakening",
    "Winter of Presence",
    "The Inner Horizon",
  ],
  program: [
    "Hatha Yoga Foundation",
    "Pranayama & Breathwork",
    "Meditation Immersion",
    "Yoga Nidra & Deep Relaxation",
    "Ayurvedic Wellness",
    "Ashtanga Intensive",
  ],
};
```

Keep these lists in sync with real retreat/program names.

---

### `ContactPage.tsx` — Contact Us (`/contact`)

#### Images

```tsx
// Top of file (figma:asset imports)
imgHeroBg         ← Background texture
imgHeroOverlay    ← Decorative overlay on hero right
imgHeroPerson     ← Person with yoga mat (hero right)
imgMap            ← Location map image
imgAppleValley    ← Apple Valley location card
imgWhiteBearLake  ← White Bear Lake location card
imgMeditationWoman ← Bottom CTA photo
```

Location addresses, phone numbers, and map embed URL are written inline in the JSX — search for `"Apple Valley"` or `"White Bear Lake"` to find them.

---

## `src/imports/` — Figma-Exported Assets

This folder holds **every image and SVG path set** that came from the original Figma design. Files are organised into subfolders by page.

```
src/imports/
│
├── logo-dark.png                 ← Site logo (used in Navbar + Footer)
│
├── BlogPage-1/                   ← Blog listing thumbnails
├── OpenPost1-1/                  ← Blog post detail images
├── OpenPost2/                    ← Blog post detail images (alternate)
├── OpenRetreat/                  ← Retreat detail page images
├── Retreats/                     ← Retreat listing card images
├── Prices/                       ← Prices page images
├── Appointment/                  ← Appointment page images
│
├── svg-qtx3rc5tzi.ts             ← Shared SVG paths (used in ZenShared + Homepage)
├── svg-fmjhwjhc9q.ts             ← Social icon paths (TeachersPage)
├── svg-1w945ax3ss.ts             ← Flower / zen icon paths (AboutPage)
├── svg-cgj6lsvvva.ts             ← Program icon paths (ProgramsPage)
├── svg-5su6po4af3.ts             ← Contact page icon paths
├── svg-wqhud5k8ta.ts             ← TeacherProfilePage icon paths
├── svg-ewnsb.tsx                 ← Portrait mask shapes (TeachersPage, AboutPage)
├── svg-1xkxq.tsx                 ← Portrait mask shapes (AboutPage)
│
├── Home1YogaMeditationRetreat.tsx ← Original Figma frame (reference only)
├── AboutUs.tsx                   ← Original Figma frame (reference only)
├── Programs.tsx                  ← Original Figma frame (reference only)
└── (other original Figma frames) ← Reference only — not rendered directly
```

### Two ways images are imported

**1. `figma:asset/` scheme** (virtual module — Vite resolves at build time)

Used by most page files. The hash in the filename is the Figma asset ID.

```tsx
import imgHero from "figma:asset/35e46892457e99c63e18e383f342a45b912e12f7.png";
//                   ^^^^^^^^^^^^  ← always this prefix, never a path
```

**2. Relative `../../imports/…` path** (real file on disk)

Used by pages that import from subfolders under `src/imports/`.

```tsx
import imgCard1 from "../../imports/Retreats/a24954574820dcbc43a9603f27576a448cf9090e.png";
```

### How to swap an image

**Option A — replace the file on disk** (easiest)  
For files imported with the relative path method, drop a new `.png` or `.jpg` into the same folder with the exact same filename, and the build will pick it up automatically.

**Option B — import a new file and update the variable**  
1. Add the new image to the appropriate subfolder under `src/imports/`.
2. Change the `import` line at the top of the component to point at the new file.
3. The variable name stays the same, so no JSX changes needed.

**Option C — replace a `figma:asset/` image**  
These files are virtual (resolved by a Vite plugin). The only way to change them is to change the import line to point at a new asset hash, or switch to a relative path import instead:
```tsx
// Before (figma:asset)
import imgHero from "figma:asset/35e46892457e99c63e18e383f342a45b912e12f7.png";

// After (relative path to a file you placed in src/imports/)
import imgHero from "../../imports/my-new-hero.jpg";
```

---

## `src/styles/` — Global CSS

| File | Purpose |
|---|---|
| `fonts.css` | `@import` rules for all Google Fonts (Marcellus, Playfair Display, Lato, Urbanist, Neuton, Tenor Sans). **Add new font imports here only.** |
| `theme.css` | CSS custom properties (colours, spacing tokens). Edit here to change the site-wide palette. |
| `tailwind.css` | Tailwind v4 base import — do not edit. |
| `index.css` | Ties all style sheets together — do not edit. |

### Colour tokens (theme.css)

| Variable | Value | Used for |
|---|---|---|
| Primary text | `#151515` | Body copy, headings |
| Dark teal | `#074240` | Active/hover accents, italic headings |
| Sage green | `#c3dbc5` | Buttons, hover panels, badges |
| Warm cream | `#f8f3ed` | Page background |
| Muted text | `#434a4a` | Body paragraphs |
| Light grey | `#8b8a82` | Placeholders, subtitles |
| Lavender | `#FAE1FB` | Icon pill backgrounds |

---

## Slug Cross-Reference

Slugs tie listings to detail pages. Keep every column in sync.

| Retreat name | Slug | Used in |
|---|---|---|
| Roots of Stillness | `roots-of-stillness` | RetreatsPage, RetreatDetailPage, Footer, AboutPage, YogaLandingPage |
| Sacred Flow | `sacred-flow` | same files |
| Awaken in the Wild | `awaken-in-the-wild` | same files |
| Paths of Awakening | `paths-of-awakening` | same files |
| Winter of Presence | `winter-of-presence` | same files |
| The Inner Horizon | `the-inner-horizon` | same files |

| Teacher name | Slug | Used in |
|---|---|---|
| Angela Carbone | `angela-carbone` | TeachersPage, TeacherProfilePage, AboutPage |
| Meghan Conner | `meghan-conner` | same files |
| Sofia Renner | `sofia-renner` | same files |
| Lena Hart | `lena-hart` | same files |
| Maya Tran | `maya-tran` | same files |
| Priya Sharma | `priya-sharma` | same files |

| Program name | Slug | Used in |
|---|---|---|
| Morning Ritual Flow | `morning-ritual-flow` | ProgramsPage, ProgramDetailPage |
| Deep Rest Yin Yoga | `deep-rest-yin-yoga` | same files |
| Inner Fire Breathwork | `inner-fire-breathwork` | same files |
| Sound Healing & Nada Yoga | `sound-healing-nada-yoga` | same files |
| Mindful Eating & Ayurveda | `mindful-eating-ayurveda` | same files |
| Nature Walks & Forest Bathing | `nature-walks-forest-bathing` | same files |

---

## Shared UI Component Reference (ZenShared.tsx)

These components are imported into every page. Changing them changes the look everywhere.

| Component | Purpose |
|---|---|
| `<Navbar />` | Top navigation bar (sticky, with dropdown + mobile offcanvas) |
| `<Footer />` | Sitemap + newsletter + social links |
| `<SectionBadge text="…" />` | Leaf icon + small uppercase label |
| `<GreenButton label="…" />` | Sage-green filled pill button |
| `<OutlinedButton label="…" />` | Bordered pill button |
| `<ArrowCircleButton label="…" />` | Button with circular arrow (pink circle) |
| `<StarRating />` | Five sage-green stars |
| `<LeafIcon />` | Single leaf SVG |
| `<LogoSymbol />` | SVG lotus mark (used standalone) |

---

## Checklist: Common Edits

### Add / edit / remove a Program, Retreat, Teacher or Blog post
> ✅ **Since 2026-10-31 these are edited in the Sanity dashboard, not in code.**
> See `Editing_Content_in_Sanity.md`. Navbar, footer, homepage, About, Prices, the
> Application form and the sitemap all update automatically.
>
> The arrays still in the page files (`ALL_PROGRAMS`, `ALL_RETREATS`, `TEACHERS`,
> `BLOG_POSTS`, …) are **fallbacks only**. They're shown if Sanity is empty or
> unreachable, and are the source for `studio/seed/build-seed.mjs`.

### Change phone/email sitewide
- [ ] `SiteExtras.tsx → SITE` (phone, phoneDisplay, email, address). The footer, sticky bar, retreat pages and structured data read from it.
- [ ] `ZenShared.tsx → Footer` (around line 578–582)
- [ ] `ContactPage.tsx` inline JSX

### Change the logo
- [ ] Replace `src/imports/logo-dark.png` with your new logo file (keep the filename)
- [ ] No code changes needed


---

## Content management (added 2026-10-31)

```
studio/                         ← Sanity Studio (editing dashboard) — separate app, NOT bundled with the site
├── sanity.config.ts            ← dashboard menu (Programs · Retreats · Teachers · Blog posts)
├── sanity.cli.ts               ← project ntvvkd3p / dataset production / host shivayoganiketan
├── schemaTypes/                ← the content forms
│   ├── program.ts  retreat.ts  teacher.ts  post.ts
│   └── objects/shared.ts       ← slug, display order, image+alt, SEO, schedule/fee/date rows
└── seed/
    ├── build-seed.mjs          ← builds content.ndjson from the site's built-in arrays
    ├── content.ndjson          ← initial content (4 programs, 8 retreats, 10 teachers, 9 posts)
    └── import.mjs              ← uploads it with a temporary Editor token

src/app/cms/                    ← website side
├── config.ts                   ← projectId, dataset, timeout, enabled switch
├── client.ts                   ← read-only GROQ fetch (published content, CDN)
├── content.ts                  ← single query + mapping into page shapes (CmsData)
├── image.ts                    ← Sanity image CDN URLs (WebP, resize, hotspot)
├── RichText.tsx                ← Portable Text in the site's article styles
└── useCms.ts                   ← hook used by pages (reads the root route loader)

scripts/generate-sitemap.mjs    ← rebuilds public/sitemap.xml from Sanity (runs in `pnpm build`)
```
