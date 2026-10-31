import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { visionTool } from "@sanity/vision";
import { BookIcon } from "@sanity/icons/Book";
import { CalendarIcon } from "@sanity/icons/Calendar";
import { UsersIcon } from "@sanity/icons/Users";
import { DocumentTextIcon } from "@sanity/icons/DocumentText";
import { schemaTypes } from "./schemaTypes";

// ═══════════════════════════════════════════════════════════════════════════════
// Shiva Yoga Niketan — content dashboard.
// Left-hand menu: Programs · Retreats · Teachers · Blog posts.
// Every list is sorted by the "Display order" field (lowest first), so you can
// re-arrange items on the website by changing that number.
// ═══════════════════════════════════════════════════════════════════════════════
const ordered = [{ field: "order", direction: "asc" as const }, { field: "_createdAt", direction: "asc" as const }];

export default defineConfig({
  name: "default",
  title: "Shiva Yoga Niketan",
  projectId: "ntvvkd3p",
  dataset: "production",

  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .title("Website content")
          .items([
            S.listItem().title("Programs").icon(BookIcon).child(
              S.documentTypeList("program").title("Programs").defaultOrdering(ordered),
            ),
            S.listItem().title("Retreats").icon(CalendarIcon).child(
              S.documentTypeList("retreat").title("Retreats").defaultOrdering(ordered),
            ),
            S.listItem().title("Teachers").icon(UsersIcon).child(
              S.documentTypeList("teacher").title("Teachers").defaultOrdering(ordered),
            ),
            S.divider(),
            S.listItem().title("Blog posts").icon(DocumentTextIcon).child(
              S.documentTypeList("post").title("Blog posts").defaultOrdering([{ field: "publishedAt", direction: "desc" }]),
            ),
          ]),
    }),
    // "Vision" = query playground for developers. Hidden from the Editor role's day-to-day use.
    visionTool({ defaultApiVersion: "2024-10-01" }),
  ],

  schema: { types: schemaTypes },

  document: {
    // Hide "Duplicate"-style template clutter: only offer the four real document types in "Create".
    newDocumentOptions: (prev) => prev.filter((t) => ["program", "retreat", "teacher", "post"].includes(t.templateId)),
  },
});
