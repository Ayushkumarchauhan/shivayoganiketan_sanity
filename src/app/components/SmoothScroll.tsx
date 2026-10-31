import { useEffect, useLayoutEffect, useRef } from "react";
import { useLocation, useNavigationType } from "react-router";
import Lenis from "lenis";

// ═══════════════════════════════════════════════════════════════════════════════
// SMOOTH SCROLL + SCROLL MANAGEMENT
//
// 1. Smooth (inertial) wheel / trackpad scrolling via Lenis on desktop.
//    • Touch devices keep their native momentum scrolling (already smooth, and
//      hijacking touch feels wrong on phones).
//    • Disabled entirely for users with "Reduce motion" turned on.
//    • Nested scroll areas (dropdown lists, mobile menu) scroll natively.
//      Add `data-lenis-prevent` to any future scrollable box to opt it out.
//
// 2. Route-change scroll reset that runs BEFORE the browser paints
//    (useLayoutEffect). Previously the reset ran after paint, so the new page
//    was briefly drawn at the old scroll position — which is why the FOOTER
//    flashed first when navigating from lower down the page.
//
// 3. Back / Forward restores where you were on that page; `#hash` links glide
//    to their section (offset for the sticky navbar).
//
// Tune the feel with LERP: lower = silkier/longer glide, higher = snappier.
// ═══════════════════════════════════════════════════════════════════════════════
const LERP = 0.1;
const NAV_OFFSET = -96; // px — keeps anchored headings clear of the sticky navbar

let lenis: Lenis | null = null;

/** The active Lenis instance (null on touch / reduced-motion devices). */
export const getLenis = () => lenis;

/** Scroll the page — smooth by default, instant when `immediate` is true. */
export function scrollToY(y: number, immediate = false) {
  if (lenis) lenis.scrollTo(y, { immediate, force: true });
  else window.scrollTo({ top: y, left: 0, behavior: immediate ? ("instant" as ScrollBehavior) : "smooth" });
}

function scrollToHash(hash: string, immediate = false) {
  const id = decodeURIComponent(hash.slice(1));
  const el = id ? document.getElementById(id) : null;
  if (!el) return false;
  if (lenis) lenis.scrollTo(el, { offset: NAV_OFFSET, immediate, force: true });
  else {
    const y = el.getBoundingClientRect().top + window.scrollY + NAV_OFFSET;
    window.scrollTo({ top: y, behavior: immediate ? ("instant" as ScrollBehavior) : "smooth" });
  }
  // Move keyboard focus to the target too (accessibility for skip links / TOCs).
  if (!el.hasAttribute("tabindex")) el.setAttribute("tabindex", "-1");
  el.focus({ preventScroll: true });
  return true;
}

// Saved positions per history entry, for Back/Forward restoration.
const POS_KEY = "syn-scroll-positions";
const positions: Record<string, number> = (() => {
  try { return JSON.parse(sessionStorage.getItem(POS_KEY) || "{}"); } catch { return {}; }
})();

export function ScrollManager() {
  const location = useLocation();
  const navType = useNavigationType();
  const prev = useRef<{ pathname: string; key: string } | null>(null);

  // ── Lenis lifecycle ────────────────────────────────────────────────────────
  useEffect(() => {
    if ("scrollRestoration" in history) history.scrollRestoration = "manual";

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    const coarse = window.matchMedia("(pointer: coarse)");
    const start = () => {
      if (lenis || reduce.matches || coarse.matches) return;
      lenis = new Lenis({
        lerp: LERP,
        autoRaf: true,
        smoothWheel: true,
        allowNestedScroll: true,   // dropdowns / menus with their own scroll keep working
        anchors: { offset: NAV_OFFSET }, // same-page <a href="#…"> glide smoothly
      });
    };
    const stop = () => { lenis?.destroy(); lenis = null; };
    const sync = () => (reduce.matches || coarse.matches ? stop() : start());

    sync();
    reduce.addEventListener("change", sync);
    coarse.addEventListener("change", sync);
    return () => {
      reduce.removeEventListener("change", sync);
      coarse.removeEventListener("change", sync);
      stop();
    };
  }, []);

  // ── Remember scroll position of the current history entry ──────────────────
  useEffect(() => {
    let raf = 0;
    const save = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        positions[location.key] = window.scrollY;
        try { sessionStorage.setItem(POS_KEY, JSON.stringify(positions)); } catch { /* quota / private mode */ }
      });
    };
    window.addEventListener("scroll", save, { passive: true });
    return () => { window.removeEventListener("scroll", save); cancelAnimationFrame(raf); };
  }, [location.key]);

  // ── Decide where to scroll — BEFORE paint ───────────────────────────────────
  useLayoutEffect(() => {
    const last = prev.current;
    prev.current = { pathname: location.pathname, key: location.key };
    if (!last) {
      // First load: honour a #hash in the URL, otherwise start at the top.
      if (location.hash) requestAnimationFrame(() => scrollToHash(location.hash, true));
      return;
    }
    if (last.key === location.key) return;

    const samePage = last.pathname === location.pathname;
    lenis?.resize(); // new page = new height

    if (navType === "POP" && positions[location.key] != null) {
      scrollToY(positions[location.key], true);      // Back / Forward → restore exactly
    } else if (location.hash) {
      // Same page → glide to the section; new page → jump straight there.
      if (!scrollToHash(location.hash, !samePage)) scrollToY(0, true);
    } else if (samePage) {
      scrollToY(0);                                   // e.g. clicking the logo on Home → glide up
    } else {
      scrollToY(0, true);                             // new page → top, instantly, before paint
    }
  }, [location.key, location.pathname, location.hash, navType]);

  return null;
}
