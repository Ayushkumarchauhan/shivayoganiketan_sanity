import { defineField, defineType } from "sanity";

// ── Re-usable field helpers ───────────────────────────────────────────────────

/** "Display order" — lower numbers appear first on the website. */
export const orderField = defineField({
  name: "order",
  title: "Display order",
  type: "number",
  description: "Lower numbers show first on the website (e.g. 1, 2, 3…). Leave gaps (10, 20, 30) so you can slot new items in between.",
  initialValue: 100,
  validation: (r) => r.integer().min(0),
});

/** URL slug generated from a source field. */
export const slugField = (source: string) =>
  defineField({
    name: "slug",
    title: "Web address (slug)",
    type: "slug",
    description: "The end of the page address, e.g. /programs/your-slug. Click “Generate”. ⚠️ Changing it later breaks old links — avoid once published.",
    options: { source, maxLength: 96 },
    validation: (r) => r.required(),
  });

/** Image with required alt text (accessibility + SEO). */
export const imageField = (name: string, title: string, description?: string) =>
  defineField({
    name,
    title,
    type: "image",
    description,
    options: { hotspot: true },
    fields: [
      defineField({
        name: "alt",
        title: "Alternative text",
        type: "string",
        description: "Describe the photo for Google and screen readers, e.g. “Students practising Hatha yoga by the Ganges”.",
      }),
    ],
  });

// ── SEO object (optional overrides) ───────────────────────────────────────────
export const seo = defineType({
  name: "seo",
  title: "SEO (optional)",
  type: "object",
  options: { collapsible: true, collapsed: true },
  fields: [
    defineField({
      name: "metaTitle",
      title: "Google title",
      type: "string",
      description: "Shown as the blue link in Google. Best 50–60 characters. Leave empty to use the page title automatically.",
      validation: (r) => r.max(70).warning("Over 70 characters — Google will cut it off."),
    }),
    defineField({
      name: "metaDescription",
      title: "Google description",
      type: "text",
      rows: 3,
      description: "Shown under the link in Google. Best 120–160 characters.",
      validation: (r) => r.max(170).warning("Over 170 characters — Google will cut it off."),
    }),
  ],
});

// ── Small row types ───────────────────────────────────────────────────────────
export const scheduleRow = defineType({
  name: "scheduleRow",
  title: "Schedule row",
  type: "object",
  fields: [
    defineField({ name: "time", title: "Time", type: "string", description: "e.g. 06:00am – 07:00am", validation: (r) => r.required() }),
    defineField({ name: "activity", title: "Activity", type: "string", validation: (r) => r.required() }),
  ],
  preview: { select: { title: "time", subtitle: "activity" } },
});

export const priceRow = defineType({
  name: "priceRow",
  title: "Fee",
  type: "object",
  fields: [
    defineField({ name: "label", title: "Label", type: "string", description: "e.g. Regular Course Price", validation: (r) => r.required() }),
    defineField({ name: "price", title: "Price", type: "string", description: "e.g. USD 1450", validation: (r) => r.required() }),
  ],
  preview: { select: { title: "label", subtitle: "price" } },
});

export const courseDate = defineType({
  name: "courseDate",
  title: "Course date",
  type: "object",
  fields: [
    defineField({ name: "period", title: "Dates", type: "string", description: "e.g. 7th January 2027 – 3rd February 2027", validation: (r) => r.required() }),
    defineField({ name: "price", title: "Price", type: "string", description: "e.g. USD 1450" }),
  ],
  preview: { select: { title: "period", subtitle: "price" } },
});

export const titledText = defineType({
  name: "titledText",
  title: "Topic",
  type: "object",
  fields: [
    defineField({ name: "title", title: "Title", type: "string", validation: (r) => r.required() }),
    defineField({ name: "body", title: "Text", type: "text", rows: 4 }),
  ],
  preview: { select: { title: "title", subtitle: "body" } },
});

export const shift = defineType({
  name: "shift",
  title: "Class time",
  type: "object",
  fields: [
    defineField({ name: "day", title: "Day", type: "string", options: { list: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"] } }),
    defineField({ name: "time", title: "Time", type: "string", description: "e.g. 09:00 – 14:00" }),
  ],
  preview: { select: { title: "day", subtitle: "time" } },
});
