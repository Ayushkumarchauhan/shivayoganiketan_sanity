// ═══════════════════════════════════════════════════════════════════════════════
// Builds studio/seed/content.ndjson from the website's BUILT-IN content, so the
// Sanity dataset starts with exactly what the site shows today.
//
//   Run from the project root:   node studio/seed/build-seed.mjs
//
// It bundles the page files with esbuild (already installed for the website) and
// reads their exported arrays — nothing is copied by hand, so nothing drifts.
// Images are NOT included (the site uses placeholders); add photos in the Studio.
// ═══════════════════════════════════════════════════════════════════════════════
import { createRequire } from "module";
import path from "path";
import fs from "fs";
import { pathToFileURL } from "url";

const root = process.cwd();
const pnpm = path.join(root, "node_modules/.pnpm");
const esbuildDir = fs.readdirSync(pnpm).find((d) => /^esbuild@/.test(d));
const esbuild = createRequire(path.join(pnpm, esbuildDir, "node_modules/esbuild/package.json"))("esbuild");

const C = (f) => path.join(root, "src/app/components", f).replace(/\\/g, "/");
const entry = `
export { ALL_PROGRAMS } from "${C("ProgramDetailPage.tsx")}";
export { PROGRAM_CARDS } from "${C("ProgramsPage.tsx")}";
export { ALL_RETREATS } from "${C("RetreatDetailPage.tsx")}";
export { RETREATS as HOME_CARDS } from "${C("YogaLandingPage.tsx")}";
export { TEACHERS as PROFILES } from "${C("TeacherProfilePage.tsx")}";
export { TEACHERS as LISTED } from "${C("TeachersPage.tsx")}";
export { BLOG_POSTS, BODY_TEXT_1, BODY_TEXT_2, BODY_TEXT_3, PULLQUOTE } from "${C("BlogPostPage.tsx")}";
`;
const out = path.join(root, "node_modules/.cache/seed-bundle.mjs");
fs.mkdirSync(path.dirname(out), { recursive: true });
await esbuild.build({
  stdin: { contents: entry, resolveDir: root, loader: "ts" },
  bundle: true, platform: "node", format: "esm", outfile: out, jsx: "automatic", logLevel: "error",
  loader: { ".png": "empty", ".jpg": "empty", ".webp": "empty", ".svg": "empty", ".css": "empty" },
  external: ["figma:asset/*"],
  banner: { js: "globalThis.window ??= undefined;" },
});
const D = await import(pathToFileURL(out).href + `?t=${Date.now()}`);

// ── helpers ───────────────────────────────────────────────────────────────────
let k = 0;
const key = () => `k${(++k).toString(36).padStart(6, "0")}`;
const keyed = (arr, map = (x) => x) => (arr ?? []).map((x) => ({ _key: key(), ...map(x) }));
const block = (text, style = "normal", listItem) => ({
  _type: "block", _key: key(), style, markDefs: [],
  ...(listItem ? { listItem, level: 1 } : {}),
  children: [{ _type: "span", _key: key(), text, marks: [] }],
});
const slug = (s) => ({ _type: "slug", current: s });
const ref = (id) => ({ _type: "reference", _ref: id, _key: key() });
const docs = [];

// ── Teachers ──────────────────────────────────────────────────────────────────
const listed = new Set(D.LISTED.map((t) => t.slug));
const listedOrder = D.LISTED.map((t) => t.slug);
D.PROFILES.forEach((t, i) => {
  const li = listedOrder.indexOf(t.slug);
  docs.push({
    _id: `teacher-${t.slug}`, _type: "teacher",
    name: t.name, slug: slug(t.slug), role: t.title,
    order: li >= 0 ? (li + 1) * 10 : 100 + i * 10,
    listed: listed.has(t.slug),
    expertise: t.expertise, experience: t.experience,
    bio: [t.bio1, t.bio2].filter(Boolean),
    education: t.education, certification: t.cert,
    email: t.email && t.email !== "info@shivayoganiketan.com" ? t.email : undefined,
    shifts: keyed(t.shifts, (s) => ({ _type: "shift", day: s.day, time: s.time })),
  });
});
const teacherIds = new Set(docs.map((d) => d._id));

// ── Programs ──────────────────────────────────────────────────────────────────
const cards = Object.fromEntries(D.PROGRAM_CARDS.map((c) => [c.slug, c]));
const homeCards = Object.fromEntries(D.HOME_CARDS.filter((c) => c.href.startsWith("/programs/")).map((c) => [c.href.split("/").pop(), c]));
D.ALL_PROGRAMS.forEach((p, i) => {
  const home = homeCards[p.slug];
  docs.push({
    _id: `program-${p.slug}`, _type: "program",
    title: p.title, slug: slug(p.slug), order: (i + 1) * 10, featured: true,
    badge: p.badge, tagline: p.tagline,
    cardSummary: cards[p.slug]?.description ?? home?.desc,
    duration: home && !/\d{4}/.test(home.date) ? home.date : undefined,
    accreditation: home && /alliance/i.test(home.type) ? home.type : undefined,
    introTitle: p.introTitle, introParas: p.introParas,
    learnTitle: p.learnTitle, learnPoints: p.learnPoints,
    ethicsTitle: p.ethicsTitle, ethicsPoints: p.ethicsPoints,
    topicsHeading: p.topicsHeading, topics: p.topics && keyed(p.topics, (t) => ({ _type: "titledText", title: t.title, body: t.body })),
    teachers: (p.teachers ?? []).map((t) => ref(`teacher-${t.slug}`)).filter((r) => teacherIds.has(r._ref)),
    scheduleTitle: p.scheduleTitle, scheduleNote: p.scheduleNote,
    schedule: p.schedule && keyed(p.schedule, (r) => ({ _type: "scheduleRow", time: r.time, activity: r.activity })),
    feesTitle: p.feesTitle, registrationFee: p.registrationFee,
    fees: p.fees && keyed(p.fees, (r) => ({ _type: "priceRow", label: r.label, price: r.price })),
    feesNotes: p.feesNotes,
    datesTitle: p.datesTitle, dates: p.dates && keyed(p.dates, (r) => ({ _type: "courseDate", period: r.period, price: r.price })),
    includesTitle: p.includesTitle, includes: p.includes,
    accommodationTitle: p.accommodationTitle, accommodation: p.accommodation,
    assistanceTitle: p.assistanceTitle, assistanceNote: p.assistanceNote,
    assistanceEmail: p.assistanceEmail, assistanceWhatsapp: p.assistanceWhatsapp,
    showCallbackForm: p.showCallbackForm !== false,
  });
});

// ── Retreats ──────────────────────────────────────────────────────────────────
// The two real Rishikesh retreats from the homepage first, then the detail-page retreats.
const homeRetreats = D.HOME_CARDS.filter((c) => !c.href.startsWith("/programs/"));
homeRetreats.forEach((r, i) => {
  const s = r.title.toLowerCase().replace(/&/g, "and").replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
  docs.push({
    _id: `retreat-${s}`, _type: "retreat", name: r.title, slug: slug(s), order: (i + 1) * 10, featured: true,
    category: "Meditation & Yoga Retreat", tagline: r.desc, dateLabel: r.date, location: r.location, price: r.price,
  });
});
D.ALL_RETREATS.forEach((r, i) => {
  docs.push({
    _id: `retreat-${r.slug}`, _type: "retreat", name: r.name, slug: slug(r.slug), order: 100 + i * 10, featured: true,
    category: r.badge, tagline: r.tagline, dateLabel: r.date, time: r.time, location: r.location,
  });
});

// ── Blog posts ────────────────────────────────────────────────────────────────
// Each seeded post gets the same article the site shows today, built from the
// editor's building blocks — so editors can see how each block is used.
const sampleBody = () => [
  block(D.BODY_TEXT_1),
  { _type: "ctaCard", _key: key(), title: "Electric vs. Manual Toothbrush", text: "When the first vaccines were approved for emergency use, there were too few doses available to vaccinate everyone who wanted them.", buttonLabel: "More Reviews", buttonLink: "/contact" },
  block(D.BODY_TEXT_2),
  { _type: "pullQuote", _key: key(), text: D.PULLQUOTE, attribution: "Dr. John Collins" },
  block(D.BODY_TEXT_2),
  block(D.BODY_TEXT_3),
  { _type: "highlight", _key: key(), text: "I am fortunate to have many excellent doctors in my family and amongst my friends. I never thought I needed a special primary care physician." },
  { _type: "accordion", _key: key(), heading: "Collaboration on key to a meaningful response", items: keyed([
    { title: "The science behind a healthy sense of Self", body: D.BODY_TEXT_1 },
    { title: "Collaboration on key to a meaningful response", body: D.BODY_TEXT_2 },
    { title: "Electric vs. Manual Toothbrush", body: "When the first vaccines were approved for emergency use, there were too few doses available to vaccinate everyone. States had to create systems to decide who received the vaccine first." },
  ], (t) => ({ _type: "titledText", ...t })) },
  block("Eligibility varies widely from state to state because each state created its own system.", "normal", "bullet"),
  block("Some health issues that could increase COVID-19-related risk.", "normal", "bullet"),
  block("Verification of age or health conditions varies widely.", "normal", "bullet"),
];
const iso = (d) => { const x = new Date(d); return isNaN(x) ? undefined : x.toISOString().slice(0, 10); };
D.BLOG_POSTS.forEach((p) => {
  docs.push({
    _id: `post-${p.slug}`, _type: "post", title: p.title, slug: slug(p.slug), category: p.category,
    author: p.author, publishedAt: iso(p.date), body: sampleBody(),
  });
});

// ── Write NDJSON (strip undefined) ────────────────────────────────────────────
const clean = (o) => JSON.parse(JSON.stringify(o));
const file = path.join(root, "studio/seed/content.ndjson");
fs.writeFileSync(file, docs.map((d) => JSON.stringify(clean(d))).join("\n") + "\n");
const count = (t) => docs.filter((d) => d._type === t).length;
console.log(`Seed written → ${path.relative(root, file)}: ${count("program")} programs, ${count("retreat")} retreats, ${count("teacher")} teachers, ${count("post")} posts`);
