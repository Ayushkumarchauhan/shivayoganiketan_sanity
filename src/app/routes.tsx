import { Outlet, useNavigation, type RouteObject } from "react-router";
import { useEffect, useState } from "react";
import { Navbar, Footer } from "./components/ZenShared";
import { RouteHead, CookieBanner, StickyMobileCTA, SkipLink } from "./components/SiteExtras";
import { ScrollManager } from "./components/SmoothScroll";
import { loadCms } from "./cms/content";

// ═══════════════════════════════════════════════════════════════════════════════
// PAGE CHUNKS — one importer per page.
// Shared by (a) the router's `lazy` loaders and (b) the prefetcher below, so a
// chunk fetched early on hover/idle is the exact same module the router uses
// (the browser + bundler cache it — no double download).
// ═══════════════════════════════════════════════════════════════════════════════
const pages = {
  home:           () => import("./components/YogaLandingPage"),
  contact:        () => import("./components/ContactPage"),
  teachers:       () => import("./components/TeachersPage"),
  teacher:        () => import("./components/TeacherProfilePage"),
  programs:       () => import("./components/ProgramsPage"),
  program:        () => import("./components/ProgramDetailPage"),
  about:          () => import("./components/AboutPage"),
  blog:           () => import("./components/BlogPage"),
  blogPost:       () => import("./components/BlogPostPage"),
  retreats:       () => import("./components/RetreatsPage"),
  retreat:        () => import("./components/RetreatDetailPage"),
  prices:         () => import("./components/PricesPage"),
  appointment:    () => import("./components/AppointmentPage"),
  thankYou:       () => import("./components/ThankYouPage"),
  privacy:        () => import("./components/PrivacyPolicyPage"),
  terms:          () => import("./components/TermsPage"),
  sitemap:        () => import("./components/SitemapPage"),
  notFound:       () => import("./components/NotFoundPage"),
} as const;
type PageKey = keyof typeof pages;

/** Converts an importer into React Router's `lazy` shape. */
const lazy = (key: PageKey) => async () => ({ Component: (await pages[key]()).default });

/** Maps a pathname to the chunk that renders it (used by the prefetcher). */
function pageFor(pathname: string): PageKey | null {
  const p = pathname.replace(/\/+$/, "") || "/";
  if (p === "/") return "home";
  const [, first, second] = p.split("/");
  const table: Record<string, [PageKey, PageKey?]> = {
    contact: ["contact"], teachers: ["teachers", "teacher"], programs: ["programs", "program"],
    about: ["about"], blog: ["blog", "blogPost"], retreats: ["retreats", "retreat"],
    prices: ["prices"], appointment: ["appointment"], "thank-you": ["thankYou"],
    privacy: ["privacy"], terms: ["terms"], sitemap: ["sitemap"],
  };
  const hit = table[first];
  if (!hit) return null;
  return second ? hit[1] ?? hit[0] : hit[0];
}

const prefetched = new Set<PageKey>();
function prefetch(key: PageKey | null) {
  if (!key || prefetched.has(key)) return;
  prefetched.add(key);
  pages[key]().catch(() => prefetched.delete(key)); // allow retry if offline
}

// Respect "Data Saver" / very slow connections — no speculative downloads there.
function canSpeculate() {
  const c = (navigator as Navigator & { connection?: { saveData?: boolean; effectiveType?: string } }).connection;
  return !(c?.saveData || /(^|-)2g$/.test(c?.effectiveType ?? ""));
}

// ── Prefetcher ────────────────────────────────────────────────────────────────
// 1. Intent: when a pointer hovers / a finger touches / keyboard focuses an
//    internal link, start downloading that page's chunk (~100–300 ms head start).
// 2. Idle: once the current page is idle, quietly warm the most-visited pages.
function usePrefetch() {
  useEffect(() => {
    if (!canSpeculate()) return;

    const onIntent = (e: Event) => {
      const a = (e.target as Element | null)?.closest?.("a[href]") as HTMLAnchorElement | null;
      if (!a || a.origin !== window.location.origin || a.target === "_blank") return;
      prefetch(pageFor(a.pathname));
    };
    document.addEventListener("pointerover", onIntent, { passive: true });
    document.addEventListener("touchstart", onIntent, { passive: true });
    document.addEventListener("focusin", onIntent);

    const IDLE_WARM: PageKey[] = ["programs", "program", "appointment", "contact", "retreats", "about"];
    const ric = (window as Window & { requestIdleCallback?: (cb: () => void, o?: { timeout: number }) => number }).requestIdleCallback;
    const timer = window.setTimeout(() => {
      const run = () => IDLE_WARM.forEach((k, i) => window.setTimeout(() => prefetch(k), i * 250));
      ric ? ric(run, { timeout: 4000 }) : run();
    }, 2500); // wait until after first paint + LCP

    return () => {
      document.removeEventListener("pointerover", onIntent);
      document.removeEventListener("touchstart", onIntent);
      document.removeEventListener("focusin", onIntent);
      window.clearTimeout(timer);
    };
  }, []);
}

// ── Initial-load shell (only shown before the very first page chunk arrives) ──
function PageLoader() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center bg-[#f8f3ed]" role="status" aria-label="Loading">
      <div className="flex flex-col items-center gap-4">
        <svg width="44" height="44" viewBox="0 0 44 44" fill="none" className="animate-spin" aria-hidden="true">
          <circle cx="22" cy="22" r="18" stroke="#c3dbc5" strokeWidth="3" />
          <path d="M22 4 A18 18 0 0 1 40 22" stroke="#074240" strokeWidth="3" strokeLinecap="round" />
        </svg>
        <p className="font-['Marcellus:Regular',sans-serif] text-[#074240] text-[11px] tracking-[3px] uppercase">Loading</p>
      </div>
    </div>
  );
}

// ── Route-change progress bar ─────────────────────────────────────────────────
// The current page STAYS on screen while the next chunk loads (no blank flash /
// layout jump). A slim teal bar appears only if loading takes longer than 150 ms,
// so prefetched (instant) navigations show nothing at all.
function NavProgress({ active }: { active: boolean }) {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    if (!active) { setVisible(false); return; }
    const t = window.setTimeout(() => setVisible(true), 150);
    return () => window.clearTimeout(t);
  }, [active]);
  if (!visible) return null;
  return (
    <div className="fixed top-0 inset-x-0 z-[90] h-[3px] overflow-hidden bg-[#c3dbc5]/50" role="progressbar" aria-label="Loading page">
      <div className="h-full w-1/3 bg-[#074240] rounded-full animate-[zen-progress_1.1s_ease-in-out_infinite]" />
      <style>{`@keyframes zen-progress { 0% { transform: translateX(-100%); } 100% { transform: translateX(300%); } }`}</style>
    </div>
  );
}

// ── Shared Root layout ────────────────────────────────────────────────────────
// Navbar & Footer mount ONCE and persist across all route transitions.
function Root() {
  const navigation = useNavigation();
  usePrefetch();

  return (
    <div className="min-h-screen bg-[#f8f3ed]">
      {/* Smooth scrolling + pre-paint scroll reset on route change (fixes footer flash). Must sit inside the router. */}
      <ScrollManager />
      {/* Keyboard users: first Tab stop jumps past the navbar to the page content. */}
      <SkipLink />
      {/* Per-route SEO head (title, meta, OG/Twitter, canonical, favicon, JSON-LD). */}
      <RouteHead />
      <NavProgress active={navigation.state === "loading"} />

      {/*
        Navbar is intentionally OUTSIDE the overflow-x-hidden wrapper below.
        `position: sticky` stops working when an ancestor has overflow set,
        so keeping Navbar here lets it stick to the real viewport edge.
      */}
      <Navbar />

      {/* overflow-x-hidden scoped to content + footer so wide sections are clipped without breaking the sticky navbar. */}
      <div className="overflow-x-hidden pb-[72px] lg:pb-0">
        <div id="main-content" tabIndex={-1} className="outline-none">
          <Outlet />
        </div>
        <Footer />
      </div>

      {/* Global chrome */}
      <StickyMobileCTA />
      <CookieBanner />
    </div>
  );
}

// ── Route config ──────────────────────────────────────────────────────────────
// React Router's own `lazy` fetches the chunk BEFORE rendering the route, so
// components never suspend during render.
// Exported separately so tests / pre-rendering can reuse the exact same routes.
export const routes: RouteObject[] = [
  {
    id: "root",
    path: "/",
    Component: Root,
    HydrateFallback: PageLoader,
    // Published content from Sanity (Programs, Retreats, Teachers, Blog) — fetched ONCE
    // per visit in a single request, before the first page renders (no content flicker).
    // Falls back to the built-in content if Sanity is slow (> 3.5 s) or unreachable.
    loader: () => loadCms(),
    shouldRevalidate: () => false,
    children: [
      { index: true,              lazy: lazy("home") },
      { path: "contact",          lazy: lazy("contact") },
      { path: "teachers",         lazy: lazy("teachers") },
      { path: "teachers/:slug",   lazy: lazy("teacher") },
      { path: "programs",         lazy: lazy("programs") },
      { path: "programs/:slug",   lazy: lazy("program") },
      { path: "about",            lazy: lazy("about") },
      { path: "blog",             lazy: lazy("blog") },
      { path: "blog/:slug",       lazy: lazy("blogPost") },
      { path: "retreats",         lazy: lazy("retreats") },
      { path: "retreats/:slug",   lazy: lazy("retreat") },
      { path: "prices",           lazy: lazy("prices") },
      { path: "appointment",      lazy: lazy("appointment") },
      { path: "thank-you",        lazy: lazy("thankYou") },
      { path: "privacy",          lazy: lazy("privacy") },
      { path: "terms",            lazy: lazy("terms") },
      { path: "sitemap",          lazy: lazy("sitemap") },
      { path: "*",                lazy: lazy("notFound") }, // custom 404
    ],
  },
];
