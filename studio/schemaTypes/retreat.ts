import { defineArrayMember, defineField, defineType } from "sanity";
import { CalendarIcon } from "@sanity/icons/Calendar";
import { imageField, orderField, slugField } from "./objects/shared";

// A retreat = one page at /retreats/<slug>, plus its card on /retreats,
// About, Prices and the homepage booking form.
export default defineType({
  name: "retreat",
  title: "Retreat",
  type: "document",
  icon: CalendarIcon,
  groups: [
    { name: "basics", title: "Basics", default: true },
    { name: "content", title: "Page content" },
    { name: "venue", title: "Venue" },
    { name: "seo", title: "SEO" },
  ],
  fields: [
    defineField({ name: "name", title: "Retreat name", type: "string", group: "basics", validation: (r) => r.required() }),
    { ...slugField("name"), group: "basics" },
    { ...orderField, group: "basics" },
    defineField({ name: "category", title: "Category", type: "string", group: "basics", description: "e.g. Yoga & Meditation" }),
    defineField({ name: "tagline", title: "Tagline", type: "text", rows: 2, group: "basics", description: "One sentence shown in the page header." }),
    defineField({ name: "dateLabel", title: "Dates (as shown)", type: "string", group: "basics", description: "e.g. September 18–24, 2026 — or “Year-round”", validation: (r) => r.required() }),
    defineField({ name: "startDate", title: "Start date", type: "date", group: "basics", description: "Optional, but recommended — used for Google event results and sorting." }),
    defineField({ name: "endDate", title: "End date", type: "date", group: "basics" }),
    defineField({ name: "time", title: "Daily time", type: "string", group: "basics", description: "e.g. 7:00 am – 6:00 pm" }),
    defineField({ name: "location", title: "Location", type: "string", group: "basics", description: "e.g. Rishikesh, India", validation: (r) => r.required() }),
    defineField({ name: "price", title: "Price", type: "string", group: "basics", description: "e.g. USD 650 — or “On request”" }),
    { ...imageField("heroImage", "Main photo", "Portrait or landscape, at least 1200 px wide."), group: "basics" },
    defineField({ name: "featured", title: "Show on homepage / About", type: "boolean", group: "basics", initialValue: true }),

    defineField({
      name: "description", title: "Description", type: "array", group: "content",
      description: "Main text of the retreat page. Leave empty to show a standard description.",
      of: [defineArrayMember({ type: "block", styles: [{ title: "Normal", value: "normal" }, { title: "Heading", value: "h3" }], lists: [{ title: "Bullets", value: "bullet" }] })],
    }),
    defineField({ name: "organizer", title: "Organiser name", type: "string", group: "content", description: "Leave empty to show “Shiva Yoga Niketan”." }),

    defineField({ name: "venueName", title: "Venue name", type: "string", group: "venue" }),
    defineField({ name: "venueAddress", title: "Venue address", type: "text", rows: 3, group: "venue", description: "Leave empty to show “Full venue address is shared on booking.”" }),

    defineField({ name: "seo", title: "SEO", type: "seo", group: "seo" }),
  ],
  orderings: [{ title: "Display order", name: "orderAsc", by: [{ field: "order", direction: "asc" }] }],
  preview: { select: { title: "name", subtitle: "dateLabel", media: "heroImage" } },
});
