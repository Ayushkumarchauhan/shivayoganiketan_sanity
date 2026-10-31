# Guidelines — Shiva Yoga Niketan

## Change log

All changes made to this project are tracked in **[`CHANGELOG.md`](./CHANGELOG.md)** (same folder).
It is detailed, newest-first, and **must be updated every time a new change is made** — add a dated
entry describing the request, what was done, and which files were touched.

If a change needs follow-up by the site owner (a key, real content, an account, hosting), also add it
to **[`Manual_Launch_Tasks.md`](./Manual_Launch_Tasks.md)**.

## Other reference docs in this folder
- `CHANGELOG.md` — full history of changes (keep updated).
- `Manual_Launch_Tasks.md` — **owner to-do list** (API keys, real content, Google accounts, hosting). Add an item whenever a change creates a manual step; tick items off when done.
- `Editing_Content_in_Sanity.md` — **how to edit Programs, Retreats, Teachers & Blog** in the Sanity dashboard (for admin + manager), plus developer notes.
- `Claude_Handoff.md` — project handoff notes.
- `FileStructure.md` — file/folder map.
- `Replacing_Images.md` — how to swap placeholder images with `.webp` files.
- `ZenRetreat_VS_Code_Guide.md` — VS Code editing guide.

## Content management (Sanity)
Programs, Retreats, Teachers and Blog posts are managed in **Sanity** (project `ntvvkd3p`).
- Website reads content through `src/app/cms/` (`useCms()` hook). **Never hard-code new items for these four types**; add them in Sanity. Each page keeps a built-in fallback array that is shown only when Sanity is empty or unreachable.
- The Studio (editing dashboard) lives in `/studio` and is a separate app. **Don't install its dependencies inside this project** (~400 MB); build or deploy it from a copy, or on a developer machine.
- When adding a content field: schema (`studio/schemaTypes`) → mapping (`src/app/cms/content.ts`) → page → redeploy the Studio → update `Editing_Content_in_Sanity.md`.
