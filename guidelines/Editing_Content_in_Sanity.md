# Editing Website Content in Sanity

> For **you (admin)** and **your manager (editor)**. No coding needed.
> Keep this file updated whenever the content forms change (see `CHANGELOG.md`).

**Dashboard:** https://shivayoganiketan.sanity.studio (available once it's deployed, see `Manual_Launch_Tasks.md` → S2)
**Project:** `ntvvkd3p` · **Dataset:** `production`

---

## What you can edit here

| In Sanity | Where it shows on the website |
|---|---|
| **Programs** | `/programs` cards, each program page, the navbar "Programs" menu, footer, homepage "upcoming" cards, and the course and date lists in the **Application form** |
| **Retreats** | `/retreats` cards, each retreat page, the About and Prices carousels, homepage cards, footer, and the booking-form dropdowns |
| **Teachers** | `/teachers` cards, each profile page, About "team" cards, homepage instructors, and the teacher cards on program pages |
| **Blog posts** | `/blog`, each article page, "Related posts", and the "From the journal" cards on teacher profiles |

Everything else (homepage text, About story, contact details, prices table, legal pages) is still edited in the code. Ask if you'd like any of it moved into Sanity too.

---

## The everyday workflow

1. Log in → pick **Programs / Retreats / Teachers / Blog posts** in the left menu.
2. Click an item to edit it, or the **pencil / "+ Create"** button to add a new one.
3. Changes save automatically as a **draft**. Drafts are **never** shown on the website.
4. Press **Publish** (bottom right). The website shows the change on the next page load, usually within **1 minute** because of the image/content CDN cache.
5. Made a mistake? The **⋯ → History** menu lets you restore any earlier version.

**To remove something:** open it → **⋯ → Unpublish** (hides it and keeps it), or **Delete** (gone; can be restored from History for a while).

**To re-order:** change **Display order**. Lower numbers come first. Leave gaps (10, 20, 30…) so you can slot new items in between.

---

## Field tips

### Every type
- **Web address (slug):** click **Generate** after typing the title. ⚠️ Don't change it once published, because old links and Google results would break. If you must change it, tell the developer so a redirect can be added.
- **Photos:** upload any size; Sanity resizes and compresses them automatically. After uploading, **click the photo → drag the circle (hotspot)** onto the most important part (e.g. a face) so crops look right on phones.
- **Alternative text:** always describe the photo in a sentence. It helps Google and visually-impaired visitors.
- **SEO tab (optional):** a custom Google title (50–60 characters) and description (120–160). Leave empty and they're generated for you.

### Programs
- **Card & basics:** name, short card description, main photo, "Show on homepage".
- **Fees & dates → Upcoming course dates:** ⚠️ remove dates once they've passed. These dates also fill the Application form's date list automatically.
- **Page content → Teachers:** pick teachers from the list; their cards appear on the program page.

### Retreats
- **Dates (as shown):** free text, e.g. `March 3–9, 2027` or `Year-round`.
- **Start/End date:** optional but recommended. They let Google show your retreat as an **event** in search results.
- **Show on homepage / About:** untick to keep a retreat on `/retreats` only.
- **Description:** leave empty to show the standard retreat text.

### Teachers
- **Show on the Teachers page:** untick for guest or past teachers. They keep their profile page (and can still be picked on programs) but don't appear in the main list. The **first 3 ticked** teachers also appear on the homepage and About page.
- **Phone / Email:** leave empty to show the school's main contact details.

### Blog posts
- **Article:** type normally. Use the **Insert** menu (or the "+" between blocks) to add:
  - **Photo** (Wide, or Tall / portrait) with an optional caption
  - **Quote** (white card with attribution)
  - **Highlight box** (green)
  - **Accordion** (expandable questions/sections)
  - **Photo + text card** (with a button, e.g. "Book now" → `/appointment`)
- **Reading time** is calculated automatically.
- Posts are sorted **newest first** by **Publish date**.

---

## Roles

| Person | Role in Sanity | Can do |
|---|---|---|
| You | **Administrator** | Everything, including inviting people, API tokens, CORS and billing |
| Manager | **Editor** | Create, edit, publish and delete content. **Cannot** change project settings |

**Invite your manager:** sanity.io/manage → *Shiva Yoga Niketan* → **Members → Invite members** → their email → role **Editor**.

---

## If something looks wrong

| Problem | Fix |
|---|---|
| My change isn't on the website | Did you press **Publish**? Then wait ~1 minute and hard-refresh (Ctrl/Cmd + Shift + R). |
| A whole section went back to the old sample content | That list is **empty** in Sanity (e.g. everything was unpublished). Publish at least one item again. |
| The website shows old content everywhere | Sanity may be unreachable, so the site falls back to its built-in content. Check https://www.sanity-status.com. |
| I need to switch Sanity off temporarily | Developer: set `enabled: false` in `src/app/cms/config.ts`. |
| Website can't load content in the Figma preview | Add the preview address under **API → CORS origins** (see `Manual_Launch_Tasks.md` → S1). |

---

## For developers
- Studio code: `/studio` (separate app, Sanity v6). Content forms: `studio/schemaTypes/`.
- Website side: `src/app/cms/`. `content.ts` holds the single GROQ query and the mapping into page shapes, `RichText.tsx` renders Portable Text in the site's styles, and `useCms()` is the hook every page uses.
- Content loads **once per visit** in the root route `loader` (`routes.tsx`). Each list falls back to the page's built-in array if it's empty in Sanity.
- `pnpm build` regenerates `public/sitemap.xml` from Sanity first (`scripts/generate-sitemap.mjs`).
- Adding a field: add it to the schema → add it to the mapping in `cms/content.ts` → use it in the page → redeploy the Studio (`cd studio && npx sanity deploy`).
