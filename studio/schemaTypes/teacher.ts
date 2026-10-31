import { defineArrayMember, defineField, defineType } from "sanity";
import { UsersIcon } from "@sanity/icons/Users";
import { imageField, orderField, slugField } from "./objects/shared";

// A teacher = profile page at /teachers/<slug>. Teachers can be attached to programs.
export default defineType({
  name: "teacher",
  title: "Teacher",
  type: "document",
  icon: UsersIcon,
  groups: [
    { name: "basics", title: "Basics", default: true },
    { name: "profile", title: "Profile" },
    { name: "contact", title: "Contact & times" },
    { name: "seo", title: "SEO" },
  ],
  fields: [
    defineField({ name: "name", title: "Full name", type: "string", group: "basics", validation: (r) => r.required() }),
    { ...slugField("name"), group: "basics" },
    { ...orderField, group: "basics" },
    defineField({ name: "role", title: "Role", type: "string", group: "basics", description: "e.g. Hatha & Ashtanga Teacher", validation: (r) => r.required() }),
    { ...imageField("photo", "Photo", "Portrait, at least 800 px tall. Face near the top."), group: "basics" },
    defineField({
      name: "listed", title: "Show on the Teachers page", type: "boolean", group: "basics", initialValue: true,
      description: "Turn off for guest or past teachers who should keep a profile page but not appear in the main list.",
    }),

    defineField({ name: "expertise", title: "Expertise", type: "string", group: "profile", description: "e.g. Traditional Hatha Yoga" }),
    defineField({ name: "experience", title: "Experience", type: "string", group: "profile", description: "e.g. 20 years of experience" }),
    defineField({ name: "bio", title: "Biography", type: "array", group: "profile", description: "One box per paragraph.", of: [defineArrayMember({ type: "text", rows: 4 })] }),
    defineField({ name: "education", title: "Education", type: "string", group: "profile" }),
    defineField({ name: "certification", title: "Certification", type: "string", group: "profile", description: "e.g. E-RYT 500, Yoga Alliance" }),

    defineField({ name: "phone", title: "Phone", type: "string", group: "contact", description: "Leave empty to show the school's main number." }),
    defineField({ name: "email", title: "Email", type: "string", group: "contact", description: "Leave empty to show the school's main email." }),
    defineField({ name: "shifts", title: "Class times", type: "array", group: "contact", of: [defineArrayMember({ type: "shift" })] }),

    defineField({ name: "seo", title: "SEO", type: "seo", group: "seo" }),
  ],
  orderings: [{ title: "Display order", name: "orderAsc", by: [{ field: "order", direction: "asc" }] }],
  preview: { select: { title: "name", subtitle: "role", media: "photo" } },
});
