import type { PortableTextBlock } from "@portabletext/react";
import { CMS } from "./config";
import { groq } from "./client";
import { imageUrl, type SanityImage } from "./image";

// ═══════════════════════════════════════════════════════════════════════════════
// CONTENT LOADER
// One request fetches every published Program, Retreat, Teacher and Blog post.
// Each list is normalised into the exact shape the pages already use, so page
// JSX barely changes. If a list is EMPTY in Sanity, or Sanity is unreachable,
// that list is `null` and the page falls back to its built-in content.
// ═══════════════════════════════════════════════════════════════════════════════

export interface Seo { metaTitle?: string; metaDescription?: string }
type PT = PortableTextBlock[];

export interface CmsTeacherRef { name: string; title: string; slug: string; photo?: string }

export interface CmsProgram {
  slug: string; title: string; badge: string; tagline: string;
  heroImg?: string; heroAlt?: string;
  cardSummary: string; duration?: string; accreditation?: string; featured: boolean;
  introTitle: string; introParas: string[];
  learnTitle?: string; learnPoints?: string[];
  ethicsTitle?: string; ethicsPoints?: string[];
  topicsHeading?: string; topics?: { title: string; body: string }[];
  scheduleTitle?: string; scheduleNote?: string; schedule?: { time: string; activity: string }[];
  feesTitle?: string; registrationFee?: string; fees?: { label: string; price: string }[]; feesNotes?: string[];
  datesTitle?: string; dates?: { period: string; price: string }[];
  includesTitle?: string; includes?: string[];
  accommodationTitle?: string; accommodation?: string;
  assistanceTitle?: string; assistanceNote?: string; assistanceEmail?: string; assistanceWhatsapp?: string;
  showCallbackForm?: boolean;
  teachers: CmsTeacherRef[];
  seo?: Seo;
}

export interface CmsRetreat {
  slug: string; name: string; badge: string; tagline: string;
  date: string; startDate?: string; endDate?: string; time: string; location: string; price?: string;
  heroImg?: string; heroAlt?: string; featured: boolean;
  description?: PT; organizer?: string; venueName?: string; venueAddress?: string;
  seo?: Seo;
}

export interface CmsTeacher {
  slug: string; name: string; firstName: string; title: string;
  photo?: string; photoAlt?: string; listed: boolean;
  expertise: string; experience: string; bio: string[]; education: string; cert: string;
  phone?: string; email?: string; shifts: { day: string; time: string }[];
  seo?: Seo;
}

export interface CmsPost {
  slug: string; title: string; category: string; author: string; authorBio?: string;
  publishedAt: string; date: string; readTime: string;
  img?: string; imgAlt?: string; excerpt?: string; body?: PT;
  seo?: Seo;
}

export interface CmsData {
  programs: CmsProgram[] | null;
  retreats: CmsRetreat[] | null;
  teachers: CmsTeacher[] | null;
  posts: CmsPost[] | null;
  /** true when at least one list came from Sanity. */
  live: boolean;
}

export const EMPTY_CMS: CmsData = { programs: null, retreats: null, teachers: null, posts: null, live: false };

// ── GROQ ──────────────────────────────────────────────────────────────────────
const ORDER = "order(coalesce(order, 100) asc, _createdAt asc)";
const IMG = "{ alt, hotspot, asset }";
const QUERY = /* groq */ `{
  "programs": *[_type == "program" && defined(slug.current)] | ${ORDER} {
    ..., "slug": slug.current, heroImage ${IMG},
    "teachers": teachers[]->{ name, role, "slug": slug.current, photo ${IMG} }
  },
  "retreats": *[_type == "retreat" && defined(slug.current)] | ${ORDER} {
    ..., "slug": slug.current, heroImage ${IMG}
  },
  "teachers": *[_type == "teacher" && defined(slug.current)] | ${ORDER} {
    ..., "slug": slug.current, photo ${IMG}
  },
  "posts": *[_type == "post" && defined(slug.current)] | order(publishedAt desc) {
    ..., "slug": slug.current, coverImage ${IMG}, "plain": pt::text(body)
  }
}`;

// ── Raw → site shapes ─────────────────────────────────────────────────────────
/* eslint-disable @typescript-eslint/no-explicit-any */
const str = (v: unknown, d = "") => (typeof v === "string" ? v : d);
const arr = <T,>(v: unknown): T[] => (Array.isArray(v) ? (v as T[]) : []);
const opt = <T,>(v: T[] | undefined | null) => (v && v.length ? v : undefined);

function fmtDate(iso: string) {
  const d = new Date(iso + "T00:00:00");
  return isNaN(d.getTime()) ? iso : d.toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" });
}

const toProgram = (p: any): CmsProgram => ({
  slug: p.slug, title: str(p.title), badge: str(p.badge), tagline: str(p.tagline),
  heroImg: imageUrl(p.heroImage as SanityImage, { w: 1800 }), heroAlt: p.heroImage?.alt,
  cardSummary: str(p.cardSummary, str(p.tagline)), duration: p.duration, accreditation: p.accreditation, featured: p.featured !== false,
  introTitle: str(p.introTitle, p.title), introParas: arr<string>(p.introParas),
  learnTitle: p.learnTitle, learnPoints: opt(arr<string>(p.learnPoints)),
  ethicsTitle: p.ethicsTitle, ethicsPoints: opt(arr<string>(p.ethicsPoints)),
  topicsHeading: p.topicsHeading, topics: opt(arr<any>(p.topics).map((t) => ({ title: str(t.title), body: str(t.body) }))),
  scheduleTitle: p.scheduleTitle, scheduleNote: p.scheduleNote, schedule: opt(arr<any>(p.schedule).map((r) => ({ time: str(r.time), activity: str(r.activity) }))),
  feesTitle: p.feesTitle, registrationFee: p.registrationFee, fees: opt(arr<any>(p.fees).map((r) => ({ label: str(r.label), price: str(r.price) }))),
  feesNotes: opt(arr<string>(p.feesNotes)),
  datesTitle: p.datesTitle, dates: opt(arr<any>(p.dates).map((r) => ({ period: str(r.period), price: str(r.price) }))),
  includesTitle: p.includesTitle, includes: opt(arr<string>(p.includes)),
  accommodationTitle: p.accommodationTitle, accommodation: p.accommodation,
  assistanceTitle: p.assistanceTitle, assistanceNote: p.assistanceNote, assistanceEmail: p.assistanceEmail, assistanceWhatsapp: p.assistanceWhatsapp,
  showCallbackForm: p.showCallbackForm !== false,
  teachers: arr<any>(p.teachers).filter(Boolean).map((t) => ({ name: str(t.name), title: str(t.role), slug: str(t.slug), photo: imageUrl(t.photo, { w: 600 }) })),
  seo: p.seo,
});

const toRetreat = (r: any): CmsRetreat => ({
  slug: r.slug, name: str(r.name), badge: str(r.category), tagline: str(r.tagline),
  date: str(r.dateLabel), startDate: r.startDate, endDate: r.endDate, time: str(r.time), location: str(r.location), price: r.price,
  heroImg: imageUrl(r.heroImage, { w: 1400 }), heroAlt: r.heroImage?.alt, featured: r.featured !== false,
  description: opt(arr<any>(r.description)) as PT | undefined, organizer: r.organizer, venueName: r.venueName, venueAddress: r.venueAddress,
  seo: r.seo,
});

const toTeacher = (t: any): CmsTeacher => ({
  slug: t.slug, name: str(t.name), firstName: str(t.name).split(" ")[0], title: str(t.role),
  photo: imageUrl(t.photo, { w: 900 }), photoAlt: t.photo?.alt, listed: t.listed !== false,
  expertise: str(t.expertise), experience: str(t.experience), bio: arr<string>(t.bio),
  education: str(t.education), cert: str(t.certification), phone: t.phone, email: t.email,
  shifts: arr<any>(t.shifts).map((s) => ({ day: str(s.day), time: str(s.time) })),
  seo: t.seo,
});

const toPost = (p: any): CmsPost => {
  const words = str(p.plain).split(/\s+/).filter(Boolean).length;
  return {
    slug: p.slug, title: str(p.title), category: str(p.category, "Journal"), author: str(p.author, "Shiva Yoga Niketan"), authorBio: p.authorBio,
    publishedAt: str(p.publishedAt), date: fmtDate(str(p.publishedAt)), readTime: `${Math.max(1, Math.round(words / 200))} min read`,
    img: imageUrl(p.coverImage, { w: 1800 }), imgAlt: p.coverImage?.alt, excerpt: p.excerpt,
    body: opt(arr<any>(p.body)) as PT | undefined, seo: p.seo,
  };
};
/* eslint-enable @typescript-eslint/no-explicit-any */

// ── Loader (cached for the whole visit) ───────────────────────────────────────
let cache: Promise<CmsData> | null = null;

export function loadCms(): Promise<CmsData> {
  if (!CMS.enabled) return Promise.resolve(EMPTY_CMS);
  if (!cache) {
    cache = groq<Record<string, unknown[]>>(QUERY)
      .then((raw) => {
        const list = <T,>(v: unknown[] | undefined, fn: (x: unknown) => T) => (v && v.length ? v.map(fn) : null);
        const data: CmsData = {
          programs: list(raw.programs, toProgram as (x: unknown) => CmsProgram),
          retreats: list(raw.retreats, toRetreat as (x: unknown) => CmsRetreat),
          teachers: list(raw.teachers, toTeacher as (x: unknown) => CmsTeacher),
          posts: list(raw.posts, toPost as (x: unknown) => CmsPost),
          live: false,
        };
        data.live = !!(data.programs || data.retreats || data.teachers || data.posts);
        return data;
      })
      .catch((err) => {
        console.warn("[cms] Sanity unavailable — using built-in content.", err);
        cache = null; // retry on next navigation
        return EMPTY_CMS;
      });
  }
  return cache;
}
