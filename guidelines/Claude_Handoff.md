# Shiva Yoga Niketan — AI Assistant Handoff Document

> **Read this entire document before making any changes.**
> It contains everything you need to understand the codebase, locate any content,
> and make changes safely without breaking anything.

---

## 1. WHAT THIS PROJECT IS

A multi-page yoga retreat website for **Shiva Yoga Niketan** built with:

- **React 18 + TypeScript**
- **Tailwind CSS v4** (no `tailwind.config.js` — configuration is in `src/styles/theme.css`)
- **React Router v7** (Data mode — `createBrowserRouter` + `<RouterProvider>`)
- **Vite 6** as the build tool
- All pages are **lazy-loaded** route chunks

The project was originally designed in Figma and exported. It runs locally with `npm run dev` and builds with `npm run build`.

---

## 2. DIRECTORY STRUCTURE

```
project-root/
├── src/
│   ├── app/
│   │   ├── App.tsx                    ← Entry point. Only renders <RouterProvider>.
│   │   ├── routes.tsx                 ← ALL routes defined here. Root layout lives here too.
│   │   └── components/
│   │       ├── ZenShared.tsx          ← Navbar, Footer, and all shared UI primitives
│   │       ├── YogaLandingPage.tsx    ← Homepage  /
│   │       ├── AboutPage.tsx          ← /about
│   │       ├── ContactPage.tsx        ← /contact
│   │       ├── TeachersPage.tsx       ← /teachers
│   │       ├── TeacherProfilePage.tsx ← /teachers/:slug
│   │       ├── ProgramsPage.tsx       ← /programs
│   │       ├── ProgramDetailPage.tsx  ← /programs/:slug
│   │       ├── RetreatsPage.tsx       ← /retreats
│   │       ├── RetreatDetailPage.tsx  ← /retreats/:slug
│   │       ├── BlogPage.tsx           ← /blog
│   │       ├── BlogPostPage.tsx       ← /blog/:slug
│   │       ├── PricesPage.tsx         ← /prices
│   │       └── AppointmentPage.tsx    ← /appointment
│   ├── imports/                       ← Figma-exported raw assets (images + SVG path data)
│   │   ├── logo-dark.png              ← Site logo used in Navbar and Footer
│   │   ├── Retreats/                  ← Images used by RetreatsPage + RetreatDetailPage
│   │   ├── OpenRetreat/               ← Images used inside retreat detail pages
│   │   ├── BlogPage-1/                ← Blog listing card thumbnails
│   │   ├── OpenPost1-1/               ← Blog post body images
│   │   ├── OpenPost2/                 ← Blog post body images (variant 2)
│   │   ├── Prices/                    ← Prices page images
│   │   ├── Appointment/               ← Appointment page images
│   │   └── svg-*.ts / svg-*.tsx       ← Auto-generated SVG path data. DO NOT EDIT.
│   ├── assets/                        ← Created on export. Contains all figma:asset/ images.
│   └── styles/
│       ├── fonts.css                  ← Google Font @import rules. Add new fonts here ONLY.
│       ├── theme.css                  ← CSS custom properties and base element styles
│       ├── tailwind.css               ← Tailwind v4 base import. DO NOT EDIT.
│       └── index.css                  ← Ties all styles together. DO NOT EDIT.
├── vite.config.ts                     ← Contains figmaAssetPlugin (critical — see §4)
├── package.json
└── guidelines/                        ← Project documentation
```

---

## 3. ROUTING ARCHITECTURE

**All routes are declared in `/src/app/routes.tsx`.**

The `Root` component wraps every page and renders `<Navbar />` and `<Footer />` once. The `<Navbar />` is placed **outside** the `overflow-x-hidden` wrapper intentionally — moving it inside will break sticky positioning.

```tsx
// Root layout structure (do not change this structure)
<div className="min-h-screen bg-[#f8f3ed]">
  <ScrollToTop />
  <Navbar /> {/* sticky — must stay outside overflow wrapper */}
  <div className="overflow-x-hidden">
    {isLoading ? <PageLoader /> : <Outlet />}
    <Footer />
  </div>
</div>
```

**Adding a new page:**

1. Create `/src/app/components/NewPage.tsx` with `export default function NewPage() {...}`
2. Add a lazy route in `routes.tsx`:

```tsx
{
  path: "new-page",
  lazy: async () => {
    const { default: Component } = await import("./components/NewPage");
    return { Component };
  },
},
```

3. Optionally add to `NAV_LINKS` or `PAGES_DROPDOWN` in `ZenShared.tsx`.

**Navigating between pages** — always use `<Link to="/path">` from `react-router`, never `<a href>`.

---

## 4. THE FIGMA:ASSET IMAGE SYSTEM (CRITICAL)

### How it works

Inside Figma Make, images are imported with a virtual module prefix:

```tsx
import imgHero from "figma:asset/35e46892457e99c63e18e383f342a45b912e12f7.png";
```

This is **not a real file path**. It is resolved by Figma Make's private Vite plugin.

When the project is exported to run in VS Code:

- All `figma:asset/` images are placed as real files inside **`src/assets/`**
- The import statements in the component files still say `figma:asset/...`
- A custom Vite plugin in `vite.config.ts` (`figmaAssetPlugin`) intercepts these imports and redirects them to `src/assets/<filename>` automatically

**You do not need to change any import statement.** The plugin handles it transparently.

### Two types of image imports in the codebase

**Type 1 — `figma:asset/` (virtual)**

```tsx
import imgHero from "figma:asset/35e46892457e99c63e18e383f342a45b912e12f7.png";
```

Files are in `src/assets/` after export. The vite plugin resolves them.

**Type 2 — Relative path (real files)**

```tsx
import imgCard1 from "../../imports/Retreats/a24954574820dcbc43a9603f27576a448cf9090e.png";
```

Files are physically in `src/imports/` subfolders. These always work without any plugin.

### How to replace an image with a new one

1. Place your new image file in `src/assets/images/` (create this subfolder if needed)
2. Find the `import` line at the top of the component file
3. Change the import path. The variable name stays the same.

```tsx
// Before — figma:asset virtual import
import imgHero from "figma:asset/06f0a13392788d643753bbb1d9e702d1e87811f6.png";

// After — real local file (path relative from src/app/components/ to src/assets/)
import imgHero from "../../assets/images/my-new-hero.jpg";
```

The `../../` prefix is always needed because component files live at
`src/app/components/` and assets are at `src/assets/` — two levels up, then down.

---

## 5. DESIGN SYSTEM

### Colours

| Role            | Hex       | Where used                           |
| --------------- | --------- | ------------------------------------ |
| Sage green      | `#c3dbc5` | Buttons, hover panels, card overlays |
| Dark teal       | `#074240` | Active nav, italic headings, accents |
| Off-white cream | `#f8f3ed` | Page background                      |
| Almost-black    | `#151515` | Primary headings and text            |
| Dark grey       | `#434a4a` | Body paragraphs                      |
| Muted grey      | `#8b8a82` | Placeholders, sub-labels             |
| Lavender        | `#FAE1FB` | Icon pill backgrounds, arrow circles |

### Typography

Fonts are loaded from Google Fonts in `src/styles/fonts.css`. They are referenced in Tailwind like this:

```tsx
// Serif display heading
className = "font-['Marcellus:Regular',sans-serif]";

// Italic decorative (logo, accent headings)
className = "font-['Playfair_Display:Italic',sans-serif]";

// Body text
className = "font-['Lato:Regular',sans-serif]";

// Button / UI labels
className = "font-['Lato:Medium',sans-serif]";

// Small caps labels / badges
className = "font-['Lato:SemiBold',sans-serif]";
```

**Rule:** Do not use Tailwind `text-*` size classes. Always use inline pixel sizes:
`text-[16px]`, `text-[32px]`, etc.

### Responsive breakpoints

```
(no prefix)  → Mobile 375–390px
sm:          → 640px+  (tablet)
lg:          → 1024px+ (desktop)
xl:          → 1280px+ (wide desktop / 1440px)
```

Pattern used throughout:

```tsx
className =
  "text-[28px] sm:text-[42px] lg:text-[60px] xl:text-[80px]";
```

### Spacing pattern

Sections use this padding rhythm:

```tsx
className = "py-12 sm:py-16 lg:py-[80px]"; // standard section
className = "py-16 sm:py-20 lg:py-[120px]"; // hero-adjacent section
className = "px-4 sm:px-6 lg:px-10"; // horizontal page padding
```

### Card hover interaction (universal pattern)

Every card across the site uses this same hover pattern:

- A sage-green (`#c3dbc5`) panel sits at `translate-y-full` (hidden below)
- On `.group:hover` it slides up to `translate-y-0`
- Content inside the panel fades in with staggered `delay-[Xms]` and `opacity-0 → opacity-100`
- The `imgTexture` overlay (35e4689…png) sits inside the panel at 50% opacity for depth

```tsx
// Card hover overlay — this exact structure repeats on every card
<div className="group relative ...">
  {/* Default visible state */}
  <div className="... group-hover:opacity-0 transition-opacity duration-300">
    {/* title, tags, icon */}
  </div>

  {/* Hover panel slides up */}
  <div className="absolute inset-0 bg-[#c3dbc5] translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out">
    <img src={imgTexture} className="absolute ... opacity-50" />
    {/* content with staggered delays */}
    <div className="opacity-0 -translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500 delay-150">
      {/* icon */}
    </div>
    <div className="opacity-0 group-hover:opacity-100 ... delay-[175ms]">
      {/* title */}
    </div>
    <div className="opacity-0 translate-y-3 group-hover:opacity-100 ... delay-200">
      {/* body */}
    </div>
    <Link className="opacity-0 translate-y-4 group-hover:opacity-100 ... delay-[225ms]">
      View Details
    </Link>
  </div>
</div>
```

---

## 6. SHARED COMPONENTS (`ZenShared.tsx`)

Import from here in any page file:

```tsx
import {
  Navbar,
  Footer,
  SectionBadge,
  GreenButton,
  OutlinedButton,
  ArrowCircleButton,
  StarRating,
  LeafIcon,
  LogoSymbol,
} from "./ZenShared";
```

| Component                           | Props                             | What it renders                                      |
| ----------------------------------- | --------------------------------- | ---------------------------------------------------- |
| `<Navbar />`                        | none                              | Full sticky nav bar with dropdown + mobile offcanvas |
| `<Footer />`                        | none                              | Full footer with sitemap + newsletter                |
| `<SectionBadge text="..." />`       | `text`, `light?: boolean`         | Leaf icon + small uppercase label                    |
| `<GreenButton label="..." />`       | `label`, `sm?: boolean`           | Sage-green filled pill button                        |
| `<OutlinedButton label="..." />`    | `label`                           | Border pill button with arrow                        |
| `<ArrowCircleButton label="..." />` | `label`, `bg?: string`            | White pill with lavender arrow circle                |
| `<StarRating />`                    | none                              | Five sage-green stars SVG                            |
| `<LeafIcon />`                      | `size?: number`, `color?: string` | Leaf SVG                                             |
| `<LogoSymbol />`                    | `size?: number`, `color?: string` | Brand lotus mark SVG                                 |

### Navbar navigation data (in ZenShared.tsx, ~line 102)

```tsx
const NAV_LINKS = [
  { label: "Home", to: "/", hasDropdown: false },
  { label: "Retreats", to: "/retreats", hasDropdown: false },
  { label: "Programs", to: "/programs", hasDropdown: false },
  { label: "Pages", to: "#", hasDropdown: true }, // triggers dropdown
  { label: "Contacts", to: "/contact", hasDropdown: false },
];

const PAGES_DROPDOWN = [
  { label: "About Us", to: "/about" },
  { label: "Our Teachers", to: "/teachers" },
  { label: "Fees & Registration", to: "/prices" },
  { label: "Blog", to: "/blog" },
];
```

### Footer navigation data (in ZenShared.tsx, ~line 502)

```tsx
const SITEMAP_EXPLORE = [ ... ];   // "Explore" column
const SITEMAP_RETREATS = [ ... ];  // "Retreats" column — keep in sync with retreat slugs
const SITEMAP_PROGRAMS = [ ... ];  // "Programs" column
```

Footer contact info (phone, email, social URLs) is inline JSX around line 578–607.

---

## 7. PAGE-BY-PAGE CONTENT REFERENCE

### 7a. Homepage — `YogaLandingPage.tsx`

All static data is in **module-level constants** (between the imports and the first function):

```tsx
const WHATS_INCLUDED_ITEMS = [...]  // 4 items: title, desc, img, borderRadius
const STATS = [...]                 // 3 items: number, label, cta
const RETREATS = [...]              // 5 upcoming retreat cards: title, slug, img, date, location, type
const INSTRUCTORS = [...]           // 3 items: name, role, img
const REVIEWS = [...]               // 7 review quotes: quote, author, img
const VIDEO_THUMBS = [...]          // 2 video thumbnails
const GALLERY_ROW1 = [...]          // 3 gallery images
const GALLERY_ROW2 = [...]          // 4 gallery images
const CONDITIONS = [...]            // 5 accordion items: id, label, desc
```

Inline text in JSX functions (search for the text string to find location):

- **Hero:** "Awaken Your" / "Inner Stillness" / sub-text / button labels → `HeroSection()`
- **Welcome:** "Welcome to Shiva Yoga Niketan" badge + quote → `WelcomeSection()`
- **Next Retreat:** title / date / description / CTAs → `NextRetreatSection()`
- **About:** "What Makes Our Retreats Unique" + body → `AboutSection()`

---

### 7b. Retreats Listing — `RetreatsPage.tsx`

```tsx
// ~Line 24
const RETREATS: Retreat[] = [
  {
    slug: "roots-of-stillness", // URL segment — must match RetreatDetailPage
    name: "Roots of Stillness", // card heading
    date: "September 18–24, 2025",
    location: "Tuscany, Italy",
    category: "Yoga & Meditation",
    img: imgCard1, // card background photo
  },
  // 6 entries total
];
```

Images imported at top: `imgCard1` through `imgCard6` (relative paths from `src/imports/Retreats/`).

---

### 7c. Retreat Detail — `RetreatDetailPage.tsx`

```tsx
// ~Line 35
const ALL_RETREATS: RetreatData[] = [
  {
    slug: "roots-of-stillness",
    name: "Roots of Stillness",
    badge: "Yoga & Meditation", // category pill on hero
    tagline: "Join volunteers…", // subtitle under the heading
    date: "September 18–24, 2025",
    time: "12:00 PM",
    location: "Tuscany, Italy",
    heroImg: imgCard1, // hero background image
    prevTitle: undefined, // previous retreat for bottom navigation
    prevSlug: undefined,
    nextTitle: "Sacred Flow",
    nextSlug: "sacred-flow",
  },
  // 6 entries total — one per retreat, in navigation order
];
```

**Critical:** `slug` must match exactly across `RetreatsPage.tsx`, `RetreatDetailPage.tsx`, `ZenShared.tsx → SITEMAP_RETREATS`, `YogaLandingPage.tsx → RETREATS`, `AboutPage.tsx → SPECIALTIES`, and `AppointmentPage.tsx → BOOKING_OPTIONS`.

---

### 7d. Programs Listing — `ProgramsPage.tsx`

Programs are **not a data array** — they are written as inline JSX `<PhotoProgramCard>` and `<FlippedProgramCard>` components inside the `ProgramsPage` return. To edit:

- Find the card by its `title` prop in the JSX (~line 277 onwards)
- Change `title`, `description`, `image`, or `slug` props directly
- `icon` prop accepts: `<YogaIcon />`, `<BowlIcon />`, `<MeditationIcon />`, `<NatureIcon />`

```tsx
<PhotoProgramCard
  title="Morning Ritual Flow"
  image={imgP2044}
  icon={<YogaIcon />}
  description="Begin each day with intentional movement..."
  slug="morning-ritual-flow"
/>
```

---

### 7e. Program Detail — `ProgramDetailPage.tsx`

```tsx
// ~Line 51
const ALL_PROGRAMS: ProgramData[] = [
  {
    slug: "morning-ritual-flow",
    title: "Morning Ritual Flow",
    badge: "Yoga & Movement",
    tagline:
      "Short one-line description shown under the heading",
    heroImg: imgP2044,
    introTitle: "Section heading for the intro block",
    introPara1: "First body paragraph...",
    introPara2: "Second body paragraph...",
    topicsHeading: "What You Will Experience",
    topics: [
      {
        title: "Sun Salutations",
        body: "Description of this topic...",
      },
      // 4 topics — shown as an accordion
    ],
    teachers: [
      {
        name: "Angela Carbone",
        title: "Yoga Teacher & Therapist",
        photo: imgTeacher1,
        slug: "angela-carbone",
      },
      // 2–3 teachers — pulled from the shared teacher photos
    ],
  },
  // 6 programs total
];
```

---

### 7f. Teachers Listing — `TeachersPage.tsx`

```tsx
// ~Line 209
const TEACHERS = [
  {
    name: "Angela Carbone",
    title: "Yoga Teacher & Therapist",
    photo: imgTeacher1,
    mask: imgImage,
    slug: "angela-carbone",
  },
  {
    name: "Meghan Conner",
    title: "Yoga Teacher & Therapist",
    photo: imgTeacher2,
    mask: imgImage2,
    slug: "meghan-conner",
  },
  {
    name: "Sofia Renner",
    title: "Yoga Teacher & Therapist",
    photo: imgTeacher3,
    mask: imgImage4,
    slug: "sofia-renner",
  },
  {
    name: "Lena Hart",
    title: "Yoga Teacher & Therapist",
    photo: imgTeacher4,
    mask: imgImage,
    slug: "lena-hart",
  },
  {
    name: "Maya Tran",
    title: "Yoga Teacher & Therapist",
    photo: imgTeacher5,
    mask: imgImage2,
    slug: "maya-tran",
  },
  {
    name: "Priya Sharma",
    title: "Yoga Teacher & Therapist",
    photo: imgTeacher6,
    mask: imgImage4,
    slug: "priya-sharma",
  },
];
```

`mask` controls the decorative shape clipped over the portrait photo.
Only three masks exist: `imgImage`, `imgImage2`, `imgImage4` (imported from `../../imports/svg-ewnsb`).

---

### 7g. Teacher Profile — `TeacherProfilePage.tsx`

This file contains a **separate** `TEACHERS` array with full per-teacher detail (~line 18).
The `slug` must match the slug in `TeachersPage.tsx`.

```tsx
const TEACHERS = [
  {
    slug: "angela-carbone",
    name: "Angela Carbone",
    firstName: "Angela", // used in "Meet Angela" heading
    title: "Yoga Teacher & Therapist",
    photo: imgTeacher1,
    phone: "+(012) 3456-789",
    office: "+(012) 3456-789",
    email: "angela@shivayoganiketan.com",
    bio1: "First biography paragraph...",
    bio2: "Second biography paragraph...",
    education: "University of Virginia, M.D. of Medicine",
    cert: "National Commission on Certification...",
    expertise: "Vinyasa Flow & Therapeutic Yoga",
    experience: "25 years of experience",
    shifts: [
      { day: "Monday", time: "09:00 – 14:00" },
      { day: "Wednesday", time: "10:00 – 15:00" },
      // up to 6 shifts
    ],
    art1Title: "Yoga Breathwork for Stress and Anxiety Relief",
    art1Tag: "Wellness",
    art1Img: imgArticle1,
    art2Title:
      "Three Years Post Injury: Persistence and Progress",
    art2Tag: "Recovery",
    art2Img: imgArticle2,
  },
  // 6 teachers total
];
```

---

### 7h. Blog Listing — `BlogPage.tsx`

```tsx
// ~Line 28
const BLOG_POSTS: BlogPost[] = [
  {
    id: 1,
    img: img1,
    category: "Health",
    title: "Wound Care Plays a Major Role...",
    slug: "wound-care-rehab-recovery-1",
  },
  // 9 posts total
];
```

Images `img1` through `img9` are imported from `../../imports/BlogPage-1/`.
The `slug` must match the slug used in `BlogPostPage.tsx → BLOG_POSTS`.

---

### 7i. Blog Post — `BlogPostPage.tsx`

Two arrays here:

- `BLOG_POSTS` — mirrors BlogPage.tsx but with added `author`, `date`, `readTime` fields. **Both arrays must be kept in sync** (same slugs, same titles).
- `RELATED_POSTS` — three hardcoded related article cards shown at bottom of every post.

Body text is in module-level constants: `BODY_TEXT_1`, `BODY_TEXT_2`, `BODY_TEXT_3`, `PULLQUOTE`.

> Note: Currently all blog posts share the same layout template and body text. If you want per-post content, expand `BLOG_POSTS` in this file with per-post `body` fields and render them conditionally.

---

### 7j. Prices — `PricesPage.tsx`

```tsx
// ~Line 33
const PRICING_CARDS: PricingCard[] = [
  {
    id:          "3-day-reset",
    title:       "3-Day Reset",
    description: "A gentle weekend to unplug and begin again.",
    highlighted: true,           // true = sage-green featured card; false = white card
    detailSlug:  "3-day-reset",
    sections: [
      {
        roomType: "Single Room",
        rows: [
          { label: "3 Days",                 regular: "$420", earlyBook: "" },
          { label: "3 Days (Early Booking)", regular: "$380", earlyBook: "" },
        ],
      },
      {
        roomType: "Shared Room",
        rows: [ ... ],
      },
    ],
  },
  // Additional packages follow the same shape
];
```

---

### 7k. Appointment — `AppointmentPage.tsx`

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

Keep this in sync with actual retreat and program names.

---

### 7l. About — `AboutPage.tsx`

```tsx
// ~Line 101 — "Areas of Speciality" scrolling strip
const SPECIALTIES = [
  {
    image: imgRetreat1,
    title: "Roots of Stillness",
    slug: "roots-of-stillness",
    date: "September 18–24, 2025",
    location: "Tuscany, Italy",
    type: "Yoga & Meditation",
  },
  {
    image: imgRetreat2,
    title: "Sacred Flow",
    slug: "sacred-flow",
    date: "October 10–17, 2025",
    location: "Bali, Indonesia",
    type: "Intuitive Movement",
  },
  {
    image: imgRetreat3,
    title: "Awaken in the Wild",
    slug: "awaken-in-the-wild",
    date: "January 5–12, 2026",
    location: "Costa Rica",
    type: "Meditation & Clean Eating",
  },
  {
    image: imgRetreat4,
    title: "Winter of Presence",
    slug: "winter-of-presence",
    date: "December 12–16, 2025",
    location: "Lapland, Finland",
    type: "Yin Yoga & Mindfulness",
  },
  {
    image: imgRetreat5,
    title: "The Inner Horizon",
    slug: "the-inner-horizon",
    date: "November 2–7, 2025",
    location: "Sedona, USA",
    type: "Spiritual Exploration",
  },
];
```

Team member cards and testimonials are inline JSX — search for the teacher name or quote text.

---

## 8. SVG PATH FILES — DO NOT EDIT

Files like `svg-qtx3rc5tzi.ts` in `src/imports/` export objects of SVG `d=` path strings.
They are auto-generated from the Figma design. **Never modify them.** Reference them like:

```tsx
import svgPaths from "../../imports/svg-qtx3rc5tzi";
// ...
<path d={svgPaths.p187b1f00} fill="#C3DBC5" />;
```

If you need a new icon, use `lucide-react` (already installed) or an inline SVG.

---

## 9. SLUG REFERENCE TABLE

Slugs connect listing pages to detail pages. If you rename anything, update every column.

### Retreats

| Name               | Slug                 | Files to update                                                                                |
| ------------------ | -------------------- | ---------------------------------------------------------------------------------------------- |
| Roots of Stillness | `roots-of-stillness` | RetreatsPage, RetreatDetailPage, YogaLandingPage, AboutPage, AppointmentPage, ZenShared Footer |
| Sacred Flow        | `sacred-flow`        | same 6 files                                                                                   |
| Awaken in the Wild | `awaken-in-the-wild` | same 6 files                                                                                   |
| Paths of Awakening | `paths-of-awakening` | same 6 files                                                                                   |
| Winter of Presence | `winter-of-presence` | same 6 files                                                                                   |
| The Inner Horizon  | `the-inner-horizon`  | same 6 files                                                                                   |

### Teachers

| Name           | Slug             | Files to update                                                |
| -------------- | ---------------- | -------------------------------------------------------------- |
| Angela Carbone | `angela-carbone` | TeachersPage, TeacherProfilePage, AboutPage, ProgramDetailPage |
| Meghan Conner  | `meghan-conner`  | same 4 files                                                   |
| Sofia Renner   | `sofia-renner`   | same 4 files                                                   |
| Lena Hart      | `lena-hart`      | same 4 files                                                   |
| Maya Tran      | `maya-tran`      | same 4 files                                                   |
| Priya Sharma   | `priya-sharma`   | same 4 files                                                   |

### Programs

| Name                          | Slug                          | Files to update                                   |
| ----------------------------- | ----------------------------- | ------------------------------------------------- |
| Morning Ritual Flow           | `morning-ritual-flow`         | ProgramsPage, ProgramDetailPage, ZenShared Footer |
| Deep Rest Yin Yoga            | `deep-rest-yin-yoga`          | same 3 files                                      |
| Inner Fire Breathwork         | `inner-fire-breathwork`       | same 3 files                                      |
| Sound Healing & Nada Yoga     | `sound-healing-nada-yoga`     | same 3 files                                      |
| Mindful Eating & Ayurveda     | `mindful-eating-ayurveda`     | same 3 files                                      |
| Nature Walks & Forest Bathing | `nature-walks-forest-bathing` | same 3 files                                      |

---

## 10. COMMON TASKS — EXACT STEPS

### Change text on any page

1. Identify which page the text is on → find the component file from the route table
2. Use VS Code search (Ctrl/Cmd + F) to find the exact string
3. Edit it and save

### Change a card's image

1. Place the new image in `src/assets/images/`
2. Find the `import img...` line at the top of the component file
3. Change only the path. Keep the variable name the same.

### Add a new retreat

1. Add card image to `src/assets/images/`
2. Import it and add an entry to `RetreatsPage.tsx → RETREATS`
3. Import it and add an entry to `RetreatDetailPage.tsx → ALL_RETREATS`
   - Set `prevTitle/prevSlug` and `nextTitle/nextSlug` to connect it to neighbours
4. Add to `YogaLandingPage.tsx → RETREATS` (homepage strip)
5. Add to `AboutPage.tsx → SPECIALTIES` (about page carousel)
6. Add the name string to `AppointmentPage.tsx → BOOKING_OPTIONS.retreat`
7. Add a `{ label, to }` entry to `ZenShared.tsx → SITEMAP_RETREATS`

### Add a new teacher

1. Add portrait image to `src/assets/images/`, import at top of both teacher files
2. Add a short entry to `TeachersPage.tsx → TEACHERS`
3. Add a full detail entry to `TeacherProfilePage.tsx → TEACHERS`
4. Add a `<TeamCard>` call to `AboutPage.tsx` team section

### Add a new program

1. Add image to `src/assets/images/`
2. Add a `<PhotoProgramCard>` or `<FlippedProgramCard>` in `ProgramsPage.tsx` JSX
3. Add a full entry to `ProgramDetailPage.tsx → ALL_PROGRAMS`
4. Add to `ZenShared.tsx → SITEMAP_PROGRAMS`
5. Add name string to `AppointmentPage.tsx → BOOKING_OPTIONS.program`

### Change phone number or email sitewide

- `ZenShared.tsx → Footer` (~line 578): `href="tel:..."` and display text
- `ContactPage.tsx`: search for the number/email in the JSX

### Change the logo

Replace `src/imports/logo-dark.png` with your new logo file, keeping the exact filename.
No code changes needed.

---

## 11. RULES — WHAT NOT TO DO

| DO NOT                                                                            | Why                                                                                    |
| --------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------- |
| Edit files in `src/imports/svg-*.ts`                                              | Auto-generated. Changes will be overwritten and break SVG rendering.                   |
| Edit `src/styles/tailwind.css` or `src/styles/index.css`                          | System files.                                                                          |
| Add `overflow-x-hidden` or `overflow-hidden` to the element wrapping `<Navbar />` | Breaks sticky positioning — Navbar stops sticking.                                     |
| Create a `tailwind.config.js`                                                     | Project uses Tailwind v4 which configures via CSS, not JS config.                      |
| Use `<a href="/path">` for internal links                                         | Use `<Link to="/path">` from `react-router` instead.                                   |
| Nest a new page component inside another component                                | Each page must be a standalone `export default function` at the top level of its file. |
| Add font imports anywhere except `src/styles/fonts.css`                           | Only that file is loaded first; fonts in other CSS files may flash.                    |
| Use Tailwind font-size classes like `text-xl`, `text-2xl`                         | The project uses explicit pixel sizes: `text-[18px]`, `text-[32px]`, etc.              |
| Use Tailwind font-weight classes like `font-bold`, `font-semibold`                | Weight is encoded in the font family string, e.g. `font-['Lato:SemiBold',sans-serif]`. |

---

## 12. USEFUL VS CODE SHORTCUTS FOR THIS PROJECT

| Action                          | Shortcut                                             |
| ------------------------------- | ---------------------------------------------------- |
| Search text in current file     | Ctrl/Cmd + F                                         |
| Search text across all files    | Ctrl/Cmd + Shift + F                                 |
| Find all `figma:asset/` imports | Global search: `figma:asset/`                        |
| Find a data array by content    | Global search: the name or slug value                |
| Go to definition of a component | Ctrl/Cmd + click the component name                  |
| Format a file                   | Shift + Alt + F (Windows) / Shift + Option + F (Mac) |

---

## 13. ENVIRONMENT COMMANDS

```bash
# Install all dependencies (run once after export)
npm install

# Start local dev server at http://localhost:5173
npm run dev

# Build for production (outputs to /dist)
npm run build

# Push changes live (after editing)
git add .
git commit -m "describe your change"
git push
```

---

_This document covers the complete project as of May 2026._
_When you make structural changes (new pages, renamed slugs, new data fields),
update this document so future AI sessions start with accurate context._