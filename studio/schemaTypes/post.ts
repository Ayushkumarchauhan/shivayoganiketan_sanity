import { defineArrayMember, defineField, defineType } from "sanity";
import { DocumentTextIcon } from "@sanity/icons/DocumentText";
import { ImageIcon } from "@sanity/icons/Image";
import { BlockquoteIcon } from "@sanity/icons/Blockquote";
import { SparklesIcon } from "@sanity/icons/Sparkles";
import { ListIcon } from "@sanity/icons/List";
import { LinkIcon } from "@sanity/icons/Link";
import { imageField, slugField } from "./objects/shared";

// A blog post = /blog/<slug>, plus its card on /blog and in "Related posts".
// The body editor offers the same building blocks as the current article design:
// paragraphs, headings, bullet lists, photos, quotes, highlight boxes, accordions
// and a photo + text "call to action" card.
export default defineType({
  name: "post",
  title: "Blog post",
  type: "document",
  icon: DocumentTextIcon,
  groups: [
    { name: "basics", title: "Basics", default: true },
    { name: "body", title: "Article" },
    { name: "seo", title: "SEO" },
  ],
  fields: [
    defineField({ name: "title", title: "Title", type: "string", group: "basics", validation: (r) => r.required().max(110) }),
    { ...slugField("title"), group: "basics" },
    defineField({ name: "category", title: "Category", type: "string", group: "basics", description: "e.g. Yoga, Meditation, Wellness", validation: (r) => r.required() }),
    defineField({ name: "publishedAt", title: "Publish date", type: "date", group: "basics", initialValue: () => new Date().toISOString().slice(0, 10), validation: (r) => r.required() }),
    defineField({ name: "author", title: "Author name", type: "string", group: "basics", validation: (r) => r.required() }),
    defineField({ name: "authorBio", title: "Author bio (short)", type: "text", rows: 3, group: "basics" }),
    defineField({ name: "excerpt", title: "Summary", type: "text", rows: 3, group: "basics", description: "1–2 sentences. Used for Google and social previews if SEO description is empty.", validation: (r) => r.max(200) }),
    { ...imageField("coverImage", "Cover photo", "Landscape, at least 1600 px wide."), group: "basics" },

    defineField({
      name: "body",
      title: "Article",
      type: "array",
      group: "body",
      description: "Use the “+” / “Insert” menu to add photos, quotes, highlight boxes, accordions and call-to-action cards. Reading time is calculated automatically.",
      of: [
        defineArrayMember({
          type: "block",
          styles: [
            { title: "Paragraph", value: "normal" },
            { title: "Heading", value: "h2" },
            { title: "Sub-heading", value: "h3" },
          ],
          lists: [{ title: "Bullet list", value: "bullet" }, { title: "Numbered list", value: "number" }],
          marks: {
            decorators: [{ title: "Bold", value: "strong" }, { title: "Italic", value: "em" }],
            annotations: [
              defineArrayMember({
                name: "link", title: "Link", type: "object", icon: LinkIcon,
                fields: [defineField({ name: "href", title: "Address", type: "url", description: "Full https://… address, or a site page like /programs", validation: (r) => r.uri({ allowRelative: true, scheme: ["http", "https", "mailto", "tel"] }) })],
              }),
            ],
          },
        }),
        defineArrayMember({
          name: "bodyImage", title: "Photo", type: "object", icon: ImageIcon,
          fields: [
            defineField({ name: "image", title: "Photo", type: "image", options: { hotspot: true }, validation: (r) => r.required() }),
            defineField({ name: "alt", title: "Alternative text", type: "string", description: "Describe the photo." }),
            defineField({ name: "caption", title: "Caption", type: "string" }),
            defineField({ name: "size", title: "Shape", type: "string", initialValue: "wide", options: { list: [{ title: "Wide", value: "wide" }, { title: "Tall / portrait", value: "portrait" }], layout: "radio", direction: "horizontal" } }),
          ],
          preview: { select: { title: "caption", subtitle: "alt", media: "image" }, prepare: ({ title, subtitle, media }) => ({ title: title || subtitle || "Photo", media }) },
        }),
        defineArrayMember({
          name: "pullQuote", title: "Quote", type: "object", icon: BlockquoteIcon,
          fields: [
            defineField({ name: "text", title: "Quote", type: "text", rows: 3, validation: (r) => r.required() }),
            defineField({ name: "attribution", title: "Who said it", type: "string" }),
          ],
          preview: { select: { title: "text", subtitle: "attribution" }, prepare: ({ title, subtitle }) => ({ title: `“${title}”`, subtitle }) },
        }),
        defineArrayMember({
          name: "highlight", title: "Highlight box (green)", type: "object", icon: SparklesIcon,
          fields: [defineField({ name: "text", title: "Text", type: "text", rows: 3, validation: (r) => r.required() })],
          preview: { select: { title: "text" }, prepare: ({ title }) => ({ title, subtitle: "Highlight box" }) },
        }),
        defineArrayMember({
          name: "accordion", title: "Accordion (expandable list)", type: "object", icon: ListIcon,
          fields: [
            defineField({ name: "heading", title: "Heading", type: "string" }),
            defineField({ name: "items", title: "Items", type: "array", of: [defineArrayMember({ type: "titledText" })], validation: (r) => r.min(1) }),
          ],
          preview: { select: { title: "heading", items: "items" }, prepare: ({ title, items }) => ({ title: title || "Accordion", subtitle: `${items?.length ?? 0} items` }) },
        }),
        defineArrayMember({
          name: "ctaCard", title: "Photo + text card", type: "object", icon: LinkIcon,
          fields: [
            defineField({ name: "image", title: "Photo", type: "image", options: { hotspot: true } }),
            defineField({ name: "title", title: "Title", type: "string", validation: (r) => r.required() }),
            defineField({ name: "text", title: "Text", type: "text", rows: 3 }),
            defineField({ name: "buttonLabel", title: "Button label", type: "string", initialValue: "Learn more" }),
            defineField({ name: "buttonLink", title: "Button link", type: "string", description: "A site page like /programs or a full https:// address", initialValue: "/contact" }),
          ],
          preview: { select: { title: "title", media: "image" }, prepare: ({ title, media }) => ({ title, subtitle: "Photo + text card", media }) },
        }),
      ],
    }),

    defineField({ name: "seo", title: "SEO", type: "seo", group: "seo" }),
  ],
  orderings: [{ title: "Newest first", name: "dateDesc", by: [{ field: "publishedAt", direction: "desc" }] }],
  preview: { select: { title: "title", subtitle: "publishedAt", media: "coverImage" } },
});
