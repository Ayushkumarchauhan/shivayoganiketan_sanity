# Replacing Placeholder Images with Your Own (.webp)

Every photo and illustration on the site has been replaced with a **labeled
placeholder**. Each placeholder is a small inline SVG that draws a box printing
the image's name. This lets you export the code and drop in your own optimised
`.webp` images at your own pace — the layout, sizing, and `object-cover` /
`object-contain` behaviour all stay exactly the same when you swap.

> The **logo is NOT a placeholder.** It still loads the real file
> `src/imports/logo-dark.png` and is used as-is in the navbar and footer.

---

## How the placeholders work

The helper lives at `src/app/components/imagePlaceholder.ts`:

```ts
export function placeholder(name: string, width?, height?): string
```

It returns a `data:image/svg+xml` string, so it can be used **anywhere a real
image URL is expected** — `<img src={...} />`, CSS `background-image`, etc.

In each page file, what used to be an image import:

```ts
import imgHeroBg from "figma:asset/35e4….png";
```

has become a placeholder assignment (same variable name):

```ts
const imgHeroBg = placeholder("imgHeroBg");
```

Everything that uses `imgHeroBg` downstream keeps working unchanged.

---

## Replacing ONE image — 3 steps

1. **Add your file** to `src/assets/` — e.g. `src/assets/hero-bg.webp`.
   (Create the `assets` folder if it doesn't exist.)

2. **Open the page file** that owns the image (see the checklist below) and
   **delete the placeholder line**, replacing it with a real import at the top
   of the file. Keep the **same variable name**:

   ```ts
   // remove:
   const imgHeroBg = placeholder("imgHeroBg");

   // add near the other imports at the top:
   import imgHeroBg from "../../assets/hero-bg.webp";
   ```

   > Path note: page files live in `src/app/components/`, so `src/assets/…`
   > is reached with `../../assets/…`.

3. **Save.** That's it — the image now renders in place of the placeholder.

When a file has **no placeholders left**, also delete its now-unused line
`import { placeholder } from "./imagePlaceholder";`.

---

## Tips

- **`.webp` is recommended** for photos (smaller files, wide browser support).
  `.avif` works too. Keep logos/icons as `.svg` or `.png`.
- **Match the aspect ratio** of the region so nothing looks stretched. Most
  images use `object-cover`, so a slightly-off ratio just crops gently.
- The `name` passed to `placeholder("…")` is only the label drawn on the box —
  you can rename it freely, it changes nothing else.
- Some names repeat across pages (e.g. `imgTeacher1`) because the same person /
  texture appeared in several places. Each page is independent — replace it in
  every file where it appears if you want it everywhere.

---

## Full checklist — every placeholder by file

Replace each one with your own image (or leave as a placeholder until ready).

### `src/app/components/ZenShared.tsx`
- `imgFooterBg` — footer background texture

### `src/app/components/YogaLandingPage.tsx` (home page)
- `imgFrame1000007866`, `imgFrame1000007867` — hero visuals
- `imgVector`, `imgVector1` — decorative accents
- `imgHome2`, `imgHome3`, `imgHome4` — home section photos
- `imgP2044`, `imgP2045`, `imgP2046`, `imgP2047`, `imgP2048`, `imgP2049`, `imgP2050`, `imgP2051`, `imgP2052` — program / gallery cards
- `imgScreenshot20250724At1547072` — feature screenshot
- `imgRectangle1`, `imgRectangle3`, `imgRectangle4`, `imgRectangle40277`, `imgRectangle40278`, `imgRectangle40311`, `imgRectangle40313`, `imgRectangle40314`, `imgRectangle40315`, `imgRectangle40316`, `imgRectangle40317`, `imgRectangle40318` — teacher / gallery tiles
- `imgFrame1000007885` — section image
- `imgQuote3`, `imgQuote4`, `imgQuote5`, `imgQuote6`, `imgQuote7`, `imgQuote8`, `imgQuote9` — testimonial avatars

### `src/app/components/AboutPage.tsx`
- `imgFrame` — background texture
- `imgHeroLeft`, `imgAbout` — hero & about photos
- `imgStory1`, `imgStory2`, `imgStory3` — story section
- `imgTeacher1`, `imgTeacher2`, `imgTeacher3` — teacher photos
- `imgRetreat1`–`imgRetreat5` — retreat photos
- `imgQuote1`, `imgQuote2`, `imgQuote3` — testimonial avatars

### `src/app/components/ProgramsPage.tsx`
- `imgHeroBg` — hero background
- `imgHeroPhoto` — hero photo
- `imgP2044`, `imgP2045`, `imgP2046` — program card images
- `imgDiscountPhoto` — discount banner photo

### `src/app/components/ProgramDetailPage.tsx`
- `imgP2044`, `imgP2045`, `imgP2046`, `imgP2047` — program hero images
- `imgTexture` — hero texture overlay
- `imgTeacher1`–`imgTeacher6` — teacher photos

### `src/app/components/TeachersPage.tsx`
- `imgHeroBg` — hero background
- `imgHeroPhoto` — hero photo
- `imgTeacher1`–`imgTeacher6` — teacher photos
- `imgApptPhoto` — appointment CTA photo

### `src/app/components/TeacherProfilePage.tsx`
- `imgTexture` — texture overlay
- `imgArticle1`, `imgArticle2` — related article images
- `imgTeacher1`–`imgTeacher6` — teacher photos

### `src/app/components/ContactPage.tsx`
- `imgHeroBg`, `imgHeroOverlay`, `imgHeroPerson` — hero visuals
- `imgMap` — map image
- `imgAppleValley`, `imgWhiteBearLake` — location photos
- `imgMeditationWoman` — contact section photo

### `src/app/components/RetreatsPage.tsx`
- `imgCard1`–`imgCard8` — retreat listing cards

### `src/app/components/RetreatDetailPage.tsx`
- `imgTexture` — hero texture overlay
- `imgHeroPortrait` — hero portrait
- `imgMap` — location map
- `imgBooking` — booking section photo
- `imgCard1`–`imgCard6` — related retreat cards

### `src/app/components/PricesPage.tsx`
- 5 pricing-section images (`imgPrices1`… as named in the file)

### `src/app/components/AppointmentPage.tsx`
- `imgYoga` — form-side photo
- `imgTexture` — background texture

### `src/app/components/BlogPage.tsx`
- 9 blog listing card images (as named in the file)

### `src/app/components/BlogPostPage.tsx`
- 15 article images (hero, inline, related — as named in the file)


---

## Performance rules when swapping images (added 2026-10-31)
- **Hero images** (top of each page) have `loading="eager"` and `{...LCP}` (`fetchpriority="high"`).
  **Keep both** when you replace the `src`. Every other image stays `loading="lazy"`.
- Add the real pixel `width` and `height` to each `<img>` to avoid layout shift.
- Hero ≤ 1920 px wide and < 200 KB; other images ≤ 1200 px and < 120 KB (WebP, quality ~75–80).
- See `Manual_Launch_Tasks.md` → task #14 for the full checklist.
