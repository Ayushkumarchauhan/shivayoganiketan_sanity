import { defineArrayMember, defineField, defineType } from "sanity";
import { BookIcon } from "@sanity/icons/Book";
import { imageField, orderField, slugField } from "./objects/shared";

// A program = one course page at /programs/<slug>, plus its card on /programs,
// the homepage, the navbar "Programs" menu, the footer and the application form.
export default defineType({
  name: "program",
  title: "Program",
  type: "document",
  icon: BookIcon,
  groups: [
    { name: "card", title: "Card & basics", default: true },
    { name: "content", title: "Page content" },
    { name: "schedule", title: "Daily schedule" },
    { name: "fees", title: "Fees & dates" },
    { name: "practical", title: "Practical info" },
    { name: "seo", title: "SEO" },
  ],
  fields: [
    // ── Card & basics ──
    defineField({ name: "title", title: "Program name", type: "string", group: "card", validation: (r) => r.required() }),
    { ...slugField("title"), group: "card" },
    { ...orderField, group: "card" },
    defineField({ name: "badge", title: "Small label above the title", type: "string", group: "card", description: "e.g. Foundation & Fundamentals" }),
    defineField({ name: "tagline", title: "Tagline (hero)", type: "text", rows: 3, group: "card", description: "One or two sentences shown in the big header of the program page." }),
    defineField({ name: "cardSummary", title: "Short card description", type: "text", rows: 3, group: "card", description: "Shown on the Programs page and homepage cards. 1–2 sentences.", validation: (r) => r.max(220) }),
    defineField({ name: "duration", title: "Duration label", type: "string", group: "card", description: "e.g. 4-Week Course · 28 Days" }),
    defineField({ name: "accreditation", title: "Accreditation", type: "string", group: "card", description: "e.g. Yoga Alliance, USA" }),
    { ...imageField("heroImage", "Main photo", "Used in the page header and on cards. Landscape, at least 1600 px wide."), group: "card" },
    defineField({ name: "featured", title: "Show on homepage", type: "boolean", group: "card", initialValue: true }),

    // ── Page content ──
    defineField({ name: "introTitle", title: "Intro heading", type: "string", group: "content" }),
    defineField({ name: "introParas", title: "Intro paragraphs", type: "array", group: "content", of: [defineArrayMember({ type: "text", rows: 4 })] }),
    defineField({ name: "learnTitle", title: "“What you will learn” heading", type: "string", group: "content", initialValue: "What You Will Learn" }),
    defineField({ name: "learnPoints", title: "What you will learn — points", type: "array", group: "content", of: [defineArrayMember({ type: "text", rows: 3 })] }),
    defineField({ name: "topicsHeading", title: "Topics heading (accordion)", type: "string", group: "content" }),
    defineField({ name: "topics", title: "Topics (accordion)", type: "array", group: "content", of: [defineArrayMember({ type: "titledText" })] }),
    defineField({ name: "ethicsTitle", title: "Rules / ethics heading", type: "string", group: "content", initialValue: "Ethics and Behaviour" }),
    defineField({ name: "ethicsPoints", title: "Rules / ethics — points", type: "array", group: "content", of: [defineArrayMember({ type: "text", rows: 2 })] }),
    defineField({
      name: "teachers", title: "Teachers on this program", type: "array", group: "content",
      description: "Pick from your Teachers list. Their cards appear automatically.",
      of: [defineArrayMember({ type: "reference", to: [{ type: "teacher" }] })],
    }),

    // ── Daily schedule ──
    defineField({ name: "scheduleTitle", title: "Schedule heading", type: "string", group: "schedule", initialValue: "Daily Schedule" }),
    defineField({ name: "scheduleNote", title: "Note under the heading", type: "text", rows: 2, group: "schedule" }),
    defineField({ name: "schedule", title: "Schedule rows", type: "array", group: "schedule", of: [defineArrayMember({ type: "scheduleRow" })] }),

    // ── Fees & dates ──
    defineField({ name: "feesTitle", title: "Fees heading", type: "string", group: "fees", initialValue: "Fees & Registration" }),
    defineField({ name: "registrationFee", title: "Registration fee", type: "string", group: "fees", description: "e.g. USD 200" }),
    defineField({ name: "fees", title: "Fees", type: "array", group: "fees", of: [defineArrayMember({ type: "priceRow" })] }),
    defineField({ name: "feesNotes", title: "Fee notes", type: "array", group: "fees", of: [defineArrayMember({ type: "string" })] }),
    defineField({ name: "datesTitle", title: "Dates heading", type: "string", group: "fees", initialValue: "Upcoming Course Dates" }),
    defineField({
      name: "dates", title: "Upcoming course dates", type: "array", group: "fees",
      description: "Remove dates once they have passed. These also appear in the application form.",
      of: [defineArrayMember({ type: "courseDate" })],
    }),

    // ── Practical info ──
    defineField({ name: "includesTitle", title: "“Fee includes” heading", type: "string", group: "practical", initialValue: "Course Fee Includes" }),
    defineField({ name: "includes", title: "Fee includes — items", type: "array", group: "practical", of: [defineArrayMember({ type: "string" })] }),
    defineField({ name: "accommodationTitle", title: "Accommodation heading", type: "string", group: "practical", initialValue: "Accommodation" }),
    defineField({ name: "accommodation", title: "Accommodation text", type: "text", rows: 4, group: "practical" }),
    defineField({ name: "assistanceTitle", title: "Help / contact heading", type: "string", group: "practical" }),
    defineField({ name: "assistanceNote", title: "Help / contact text", type: "text", rows: 3, group: "practical" }),
    defineField({ name: "assistanceEmail", title: "Contact email", type: "string", group: "practical" }),
    defineField({ name: "assistanceWhatsapp", title: "Contact WhatsApp", type: "string", group: "practical" }),
    defineField({ name: "showCallbackForm", title: "Show “Request a callback” form", type: "boolean", group: "practical", initialValue: true }),

    // ── SEO ──
    defineField({ name: "seo", title: "SEO", type: "seo", group: "seo" }),
  ],
  orderings: [{ title: "Display order", name: "orderAsc", by: [{ field: "order", direction: "asc" }] }],
  preview: { select: { title: "title", subtitle: "duration", media: "heroImage" } },
});
