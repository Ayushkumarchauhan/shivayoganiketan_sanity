import { useState, useEffect, useMemo, useSyncExternalStore } from "react";
import { Link, useLocation } from "react-router";
import { Check, AlertCircle, ChevronDown, ArrowRight, MessageCircle } from "lucide-react";

// ═══════════════════════════════════════════════════════════════════════════════
// SITE EXTRAS — pre-launch SEO + UX building blocks.
// Everything here reuses the existing Design System tokens:
//   cream #f8f3ed · sage #c3dbc5 · deep teal #074240 · ink #151515
//   grey  #434a4a · muted #8b8a82 · border #e8e0d8
//   Marcellus (headings) · Lato (body/UI) · Playfair Display Italic (accent)
// The ONLY non-brand values are the two functional form-state colours
// (validation red / success teal) — semantic states, not new brand colours.
// ═══════════════════════════════════════════════════════════════════════════════

const ERROR_COLOR = "#b23b2e"; // semantic validation state only
const SUCCESS_COLOR = "#074240"; // reuses brand teal

// ─── SITE CONSTANTS (edit these in one place) ──────────────────────────────────
export const SITE = {
  name: "Shiva Yoga Niketan",
  url: "https://www.shivayoganiketan.com",
  phone: "+91-7455855666",
  email: "info@shivayoganiketan.com",
  street: "Laxman Jhula Road, Tapovan",
  city: "Rishikesh",
  region: "Uttarakhand",
  postal: "249192",
  country: "IN",
  mapQuery: "Shiva+Yoga+Niketan,+Tapovan,+Rishikesh,+Uttarakhand",
  // 1200×630 social-share image. Upload the file to /public/og-cover.jpg (see Manual_Launch_Tasks.md).
  ogImage: "https://www.shivayoganiketan.com/og-cover.jpg",
  // Replace with your real GA4 Measurement ID before launch (e.g. "G-AB12CD34EF").
  gaMeasurementId: "G-XXXXXXXXXX",
  // Google Search Console HTML-tag verification code (content="…" value only). Leave "" until you have it.
  googleSiteVerification: "",
  // WhatsApp number in international format, digits only (used for wa.me links).
  whatsapp: "917455855666",
  // Human-friendly phone display.
  phoneDisplay: "+91 74558 55666",
  // Approximate map coordinates for Tapovan, Rishikesh — refine with your exact pin.
  geo: { lat: 30.1290, lng: 78.3234 },
  // Opening hours in schema.org format.
  openingHours: ["Mo-Su 06:00-20:00"],
  // Social profiles. Generic homepages ("https://facebook.com") are treated as placeholders and
  // are NOT emitted into structured data. Replace with your real profile URLs.
  social: {
    facebook: "https://facebook.com",
    instagram: "https://instagram.com",
    twitter: "https://twitter.com",
    youtube: "https://youtube.com",
  },
  // ── Form delivery ──
  // Free Web3Forms access key (https://web3forms.com → enter your email → copy the key).
  // While this is a placeholder, forms run in DEMO mode (they validate + show success but send nothing).
  web3formsKey: "YOUR_WEB3FORMS_ACCESS_KEY",
};

/** True when a social URL is a real profile (not a bare placeholder homepage). */
export function isRealProfile(url: string) {
  try { return new URL(url).pathname.replace(/\/+$/, "").length > 0; } catch { return false; }
}

// ═══════════════════════════════════════════════════════════════════════════════
// 0 · FORM DELIVERY — one helper used by every form on the site.
//     Sends to Web3Forms (email to your inbox, no backend needed).
// ═══════════════════════════════════════════════════════════════════════════════
export type FormResult = { ok: true; demo?: boolean } | { ok: false; error: string };

export async function submitForm(formName: string, data: Record<string, string | boolean | undefined>): Promise<FormResult> {
  const key = SITE.web3formsKey;
  const payload = {
    access_key: key,
    subject: `New ${formName} — ${SITE.name} website`,
    from_name: `${SITE.name} Website`,
    form: formName,
    page: typeof window !== "undefined" ? window.location.href : "",
    ...data,
  };

  // Analytics conversion event (only fires if GA was consented + loaded).
  if (typeof window !== "undefined" && window.gtag) window.gtag("event", "generate_lead", { form_name: formName });

  if (!key || key.startsWith("YOUR_")) {
    // DEMO MODE — no key configured yet.
    console.warn(`[submitForm] DEMO MODE: "${formName}" was not sent. Set SITE.web3formsKey in SiteExtras.tsx.`, payload);
    await new Promise((r) => setTimeout(r, 700));
    return { ok: true, demo: true };
  }

  try {
    const res = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify(payload),
    });
    const json = await res.json().catch(() => ({}));
    if (res.ok && json.success !== false) return { ok: true };
    return { ok: false, error: json.message || "Something went wrong. Please try again." };
  } catch {
    return { ok: false, error: `Network error — please try again, or email us at ${SITE.email}.` };
  }
}

/** Hidden honeypot field — bots fill it, humans don't. Web3Forms discards submissions where it is checked. */
export function Honeypot() {
  return <input type="checkbox" name="botcheck" className="hidden" tabIndex={-1} autoComplete="off" aria-hidden="true" />;
}

/** Inline error line for failed submissions (DS typography, semantic error colour). */
export function FormError({ message }: { message?: string | null }) {
  if (!message) return null;
  return (
    <p role="alert" className="flex items-center gap-1.5 font-['Lato:Regular',sans-serif] text-[13px] lg:text-[14px]" style={{ color: ERROR_COLOR }}>
      <AlertCircle size={14} /> {message}
    </p>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// 0b · SKIP LINK — keyboard / screen-reader users jump straight to content.
// ═══════════════════════════════════════════════════════════════════════════════
export function SkipLink() {
  return (
    <a
      href="#main-content"
      className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[100] focus:rounded-full focus:bg-[#074240] focus:px-5 focus:py-3 focus:font-['Lato:Medium',sans-serif] focus:text-white focus:text-[14px]"
    >
      Skip to main content
    </a>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// 1 · PRIMARY / SECONDARY BUTTON — with loading & disabled states
//     (deep-teal fill = primary CTA used across the site)
// ═══════════════════════════════════════════════════════════════════════════════
interface PrimaryButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  type?: "button" | "submit";
  variant?: "primary" | "secondary";
  loading?: boolean;
  disabled?: boolean;
  fullWidth?: boolean;
  to?: string;
  href?: string;
  className?: string;
}

export function PrimaryButton({
  children, onClick, type = "button", variant = "primary",
  loading = false, disabled = false, fullWidth = false, to, href, className = "",
}: PrimaryButtonProps) {
  const base =
    "inline-flex items-center justify-center gap-2 rounded-full px-7 py-4 font-['Lato:Medium',sans-serif] text-[14px] lg:text-[16px] transition-all disabled:cursor-not-allowed";
  const look =
    variant === "primary"
      ? "bg-[#074240] text-white hover:bg-[#0a5552] disabled:opacity-60"
      : "bg-[#c3dbc5] text-[#151515] hover:bg-[#a8d0ac] disabled:opacity-60";
  const cls = `${base} ${look} ${fullWidth ? "w-full" : ""} ${className}`;

  const inner = loading ? (
    <>
      <Spinner />
      <span>Please wait…</span>
    </>
  ) : (
    children
  );

  if (to && !loading && !disabled) return <Link to={to} className={cls}>{inner}</Link>;
  if (href && !loading && !disabled) return <a href={href} className={cls}>{inner}</a>;

  return (
    <button type={type} onClick={onClick} disabled={loading || disabled} className={cls} aria-busy={loading}>
      {inner}
    </button>
  );
}

function Spinner({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className="animate-spin" aria-hidden="true">
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeOpacity="0.25" strokeWidth="3" />
      <path d="M12 3a9 9 0 0 1 9 9" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
    </svg>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// 2 · TEXT FIELD — with error / success states
// ═══════════════════════════════════════════════════════════════════════════════
interface TextFieldProps {
  label: string;
  value: string;
  onChange: (v: string) => void;
  id?: string;
  type?: string;
  placeholder?: string;
  required?: boolean;
  error?: string;
  success?: boolean;
  textarea?: boolean;
}

export function TextField({
  label, value, onChange, id, type = "text", placeholder,
  required, error, success, textarea,
}: TextFieldProps) {
  const fieldId = id ?? label.toLowerCase().replace(/\s+/g, "-");
  const shared =
    "w-full bg-white rounded-[20px] px-5 lg:px-6 py-3 lg:py-4 font-['Lato:Regular',sans-serif] text-[#434a4a] text-[14px] lg:text-[16px] outline-none transition-all border";
  const state = error
    ? "border-[#b23b2e] focus:ring-2 focus:ring-[#b23b2e]/30"
    : success
    ? "border-[#074240] focus:ring-2 focus:ring-[#c3dbc5]"
    : "border-[#e8e0d8] focus:border-[#c3dbc5] focus:ring-2 focus:ring-[#c3dbc5]";

  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={fieldId} className="font-['Lato:SemiBold',sans-serif] text-[#074240] text-[11px] lg:text-[12px] tracking-[1px] uppercase">
        {label}{required && <span aria-hidden="true"> *</span>}
      </label>
      {textarea ? (
        <textarea
          id={fieldId} value={value} onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder} rows={6} required={required}
          aria-invalid={!!error} aria-describedby={error ? `${fieldId}-err` : undefined}
          className={`${shared} ${state} resize-none rounded-[20px]`}
        />
      ) : (
        <input
          id={fieldId} type={type} value={value} onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder} required={required}
          aria-invalid={!!error} aria-describedby={error ? `${fieldId}-err` : undefined}
          className={`${shared} ${state} h-[50px] lg:h-[55px] rounded-[30px]`}
        />
      )}
      {error && (
        <p id={`${fieldId}-err`} className="flex items-center gap-1.5 font-['Lato:Regular',sans-serif] text-[13px]" style={{ color: ERROR_COLOR }}>
          <AlertCircle size={14} /> {error}
        </p>
      )}
      {success && !error && (
        <p className="flex items-center gap-1.5 font-['Lato:Regular',sans-serif] text-[13px]" style={{ color: SUCCESS_COLOR }}>
          <Check size={14} /> Looks good.
        </p>
      )}
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// 3 · BREADCRUMBS — auto-generated from the URL, DS typography
// ═══════════════════════════════════════════════════════════════════════════════
const CRUMB_LABELS: Record<string, string> = {
  about: "About Us", teachers: "Our Teachers", programs: "Programs",
  retreats: "Retreats", blog: "Blog & Journal", contact: "Contact Us",
  prices: "Prices", appointment: "Application Form", privacy: "Privacy Policy",
  terms: "Terms & Conditions", sitemap: "Sitemap", "thank-you": "Thank You",
};

function deslugify(seg: string) {
  return seg.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
}

export function Breadcrumbs() {
  const { pathname } = useLocation();
  const override = useSyncExternalStore(metaStore.subscribe, metaStore.get, metaStore.get);
  const segments = pathname.split("/").filter(Boolean);
  if (segments.length === 0) return null; // no breadcrumb on the homepage

  const crumbs = segments.map((seg, i) => {
    const to = "/" + segments.slice(0, i + 1).join("/");
    const isLast = i === segments.length - 1;
    // Detail pages register their real title via usePageMeta — prefer it over the slug.
    const label = isLast && override && !override.noindex ? override.title.split(" — ")[0].split(" | ")[0] : CRUMB_LABELS[seg] ?? deslugify(seg);
    return { to, label, last: i === segments.length - 1 };
  });

  return (
    <nav aria-label="Breadcrumb" className="px-4 sm:px-6 lg:px-10 pt-5 lg:pt-6">
      <ol className="max-w-[1280px] mx-auto flex flex-wrap items-center gap-2 font-['Lato:Regular',sans-serif] text-[13px] lg:text-[14px] text-[#434a4a]">
        <li><Link to="/" className="hover:text-[#074240] transition-colors">Home</Link></li>
        {crumbs.map((c) => (
          <li key={c.to} className="flex items-center gap-2">
            <span className="text-[#8b8a82]">/</span>
            {c.last
              ? <span className="text-[#151515]" aria-current="page">{c.label}</span>
              : <Link to={c.to} className="hover:text-[#074240] transition-colors">{c.label}</Link>}
          </li>
        ))}
      </ol>
    </nav>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// 4 · FAQ SECTION — reusable accordion (DS card styling)
// ═══════════════════════════════════════════════════════════════════════════════
export interface Faq { q: string; a: string; }

export function FaqSection({ title = "Frequently Asked Questions", items }: { title?: string; items: Faq[] }) {
  const [open, setOpen] = useState<number>(0);
  // FAQPage rich-result schema, generated from the same items that are rendered.
  useJsonLd("syn-faq-schema", items.length ? {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((it) => ({ "@type": "Question", name: it.q, acceptedAnswer: { "@type": "Answer", text: it.a } })),
  } : null);
  return (
    <section className="py-14 sm:py-20 lg:py-[100px] px-4 sm:px-6 lg:px-10">
      <div className="max-w-[880px] mx-auto flex flex-col gap-8 lg:gap-12">
        <h2 className="font-['Marcellus:Regular',sans-serif] text-[#151515] text-[28px] sm:text-[40px] lg:text-[52px] tracking-[-1px] lg:tracking-[-2px] leading-[1.1] text-center">
          {title}
        </h2>
        <div className="flex flex-col gap-3">
          {items.map((item, i) => {
            const isOpen = open === i;
            return (
              <div key={i} className="bg-white rounded-[16px] border border-[#e8e0d8] overflow-hidden">
                <button
                  onClick={() => setOpen(isOpen ? -1 : i)}
                  aria-expanded={isOpen}
                  className="flex items-center justify-between w-full text-left gap-4 px-5 lg:px-7 py-4 lg:py-5"
                >
                  <span className={`font-['Marcellus:Regular',sans-serif] text-[17px] lg:text-[22px] tracking-[-0.5px] ${isOpen ? "text-[#074240]" : "text-[#151515]"}`}>
                    {item.q}
                  </span>
                  <ChevronDown size={20} className={`shrink-0 text-[#074240] transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`} />
                </button>
                {isOpen && (
                  <p className="px-5 lg:px-7 pb-5 font-['Lato:Regular',sans-serif] text-[#434a4a] text-[14px] lg:text-[17px] leading-[1.8]">
                    {item.a}
                  </p>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// 5 · STICKY MOBILE CTA — bottom bar, mobile breakpoint only
// ═══════════════════════════════════════════════════════════════════════════════
export function StickyMobileCTA() {
  const { pathname } = useLocation();
  // Hide on the booking page itself (already the destination).
  if (pathname.startsWith("/appointment")) return null;
  return (
    <div className="lg:hidden fixed bottom-0 inset-x-0 z-40 bg-white/95 backdrop-blur border-t border-[#e8e0d8] px-4 py-3 flex items-center gap-3 shadow-[0_-6px_20px_rgba(7,66,64,0.08)]">
      <a href={`tel:${SITE.phone}`} className="shrink-0 rounded-full border border-[#151515] px-5 py-3 font-['Lato:Medium',sans-serif] text-[#151515] text-[14px]">
        Call
      </a>
      <a
        href={`https://wa.me/${SITE.whatsapp}?text=${encodeURIComponent("Hi! I'd like to know more about your yoga courses.")}`}
        target="_blank" rel="noopener noreferrer" aria-label="Chat with us on WhatsApp"
        className="shrink-0 inline-flex items-center gap-1.5 rounded-full border border-[#151515] px-4 py-3 font-['Lato:Medium',sans-serif] text-[#151515] text-[14px]"
      >
        <MessageCircle size={16} /> WhatsApp
      </a>
      <Link to="/appointment" className="flex-1 inline-flex items-center justify-center gap-2 rounded-full bg-[#074240] px-5 py-3 font-['Lato:Medium',sans-serif] text-white text-[14px]">
        Book Your Place <ArrowRight size={16} />
      </Link>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// 6 · COOKIE BANNER — bottom banner, DS styling. Gates analytics.
// ═══════════════════════════════════════════════════════════════════════════════
const CONSENT_KEY = "syn-cookie-consent";

export function CookieBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem(CONSENT_KEY);
    if (!stored) setVisible(true);
    else if (stored === "accepted") loadAnalytics();
  }, []);

  const decide = (choice: "accepted" | "declined") => {
    localStorage.setItem(CONSENT_KEY, choice);
    setVisible(false);
    if (choice === "accepted") loadAnalytics();
  };

  if (!visible) return null;

  return (
    <div className="fixed bottom-0 inset-x-0 z-50 lg:bottom-4 lg:inset-x-auto lg:right-4 lg:max-w-[440px]">
      <div className="m-3 lg:m-0 bg-white rounded-[16px] border border-[#e8e0d8] shadow-[0_12px_40px_rgba(7,66,64,0.16)] p-5 lg:p-6 flex flex-col gap-4">
        <p className="font-['Marcellus:Regular',sans-serif] text-[#151515] text-[18px] lg:text-[20px] tracking-[-0.5px]">
          We value your privacy
        </p>
        <p className="font-['Lato:Regular',sans-serif] text-[#434a4a] text-[13px] lg:text-[14px] leading-[1.7]">
          We use cookies to improve your experience and understand site traffic. See our{" "}
          <Link to="/privacy" className="text-[#074240] underline">Privacy Policy</Link>.
        </p>
        <div className="flex items-center gap-3">
          <button onClick={() => decide("declined")} className="flex-1 rounded-full border border-[#151515] py-3 font-['Lato:Medium',sans-serif] text-[#151515] text-[14px] hover:bg-[#f8f3ed] transition-colors">
            Decline
          </button>
          <button onClick={() => decide("accepted")} className="flex-1 rounded-full bg-[#074240] py-3 font-['Lato:Medium',sans-serif] text-white text-[14px] hover:bg-[#0a5552] transition-colors">
            Accept
          </button>
        </div>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// 7 · ANALYTICS (GA4) — loaded only after cookie consent
// ═══════════════════════════════════════════════════════════════════════════════
declare global {
  interface Window { dataLayer?: unknown[]; gtag?: (...args: unknown[]) => void; }
}

let analyticsLoaded = false;
function loadAnalytics() {
  if (analyticsLoaded) return;
  const id = SITE.gaMeasurementId;
  if (!id || id.includes("XXXX")) return; // placeholder id — skip until real one is set
  analyticsLoaded = true;
  const s = document.createElement("script");
  s.async = true;
  s.src = `https://www.googletagmanager.com/gtag/js?id=${id}`;
  document.head.appendChild(s);
  window.dataLayer = window.dataLayer || [];
  window.gtag = function gtag() { window.dataLayer!.push(arguments); };
  window.gtag("js", new Date());
  window.gtag("config", id);
}

// ═══════════════════════════════════════════════════════════════════════════════
// 8 · ROUTE HEAD — unique <title>, meta description, OG/Twitter, canonical,
//     favicon, JSON-LD, per route. One place covers every page.
// ═══════════════════════════════════════════════════════════════════════════════
interface Meta { title: string; description: string; }

// Titles ≈ 50–60 chars · Descriptions ≈ 120–160 chars, unique per page.
const SEO_MAP: Record<string, Meta> = {
  "/": {
    title: "Shiva Yoga Niketan — Yoga Teacher Training in Rishikesh",
    description: "Yoga Alliance–accredited 200-hour teacher training, beginner courses and retreats in Rishikesh, India. Learn Hatha, Vinyasa and Kundalini yoga.",
  },
  "/about": {
    title: "About Shiva Yoga Niketan — Our Story & Yoga Lineage",
    description: "Discover Shiva Yoga Niketan: our teachers, traditional Gurukul method and mission to share authentic Hatha and Raja yoga from Rishikesh, India.",
  },
  "/teachers": {
    title: "Our Yoga Teachers in Rishikesh — Shiva Yoga Niketan",
    description: "Meet our master yoga teachers, each with 20–50 years of experience in Hatha, Ashtanga, philosophy, anatomy and meditation in Rishikesh, India.",
  },
  "/programs": {
    title: "Yoga Teacher Training Programs — Shiva Yoga Niketan",
    description: "Explore Yoga Alliance–accredited 200-hour Hatha, Vinyasa and Kundalini teacher training and beginner yoga courses in Rishikesh, India.",
  },
  "/retreats": {
    title: "Yoga & Meditation Retreats in Rishikesh, India",
    description: "Restorative 7 and 15-day yoga and meditation retreats in the foothills of the Himalayas. Reconnect with body, mind and soul at Shiva Yoga Niketan.",
  },
  "/blog": {
    title: "Yoga Blog & Journal — Shiva Yoga Niketan, Rishikesh",
    description: "Reflections on yoga, pranayama, meditation and mindful living from the teachers of Shiva Yoga Niketan in Rishikesh, India. Read our journal.",
  },
  "/contact": {
    title: "Contact Shiva Yoga Niketan — Rishikesh, India",
    description: "Get in touch with Shiva Yoga Niketan in Rishikesh. Find our address, map and directions, phone, email and answers to common questions.",
  },
  "/prices": {
    title: "Course Fees & Pricing — Shiva Yoga Niketan Rishikesh",
    description: "Transparent pricing for our yoga teacher training courses and retreats in Rishikesh, including what each fee covers and early-booking discounts.",
  },
  "/appointment": {
    title: "Apply & Book Your Course — Shiva Yoga Niketan",
    description: "Complete your application to join a yoga teacher training course or retreat at Shiva Yoga Niketan in Rishikesh. Registration fee USD 200.",
  },
  "/privacy": {
    title: "Privacy Policy — Shiva Yoga Niketan, Rishikesh",
    description: "Learn how Shiva Yoga Niketan collects, uses and protects your personal information when you use our website and enrol in our courses.",
  },
  "/terms": {
    title: "Terms & Conditions — Shiva Yoga Niketan, Rishikesh",
    description: "Read the terms and conditions governing bookings, payments, cancellations and use of the Shiva Yoga Niketan website and yoga courses.",
  },
  "/sitemap": {
    title: "Sitemap — Browse Every Page of Shiva Yoga Niketan",
    description: "A complete sitemap of Shiva Yoga Niketan: courses, retreats, teachers, blog, contact and policy pages, all in one convenient place.",
  },
  "/thank-you": {
    title: "Thank You — Shiva Yoga Niketan, Rishikesh",
    description: "Thank you for reaching out to Shiva Yoga Niketan. Your message has been received and our team will respond within one business day.",
  },
};

const DYNAMIC_META: { prefix: string; make: (slug: string) => Meta }[] = [
  { prefix: "/teachers/", make: (s) => ({ title: `${deslugify(s)} — Yoga Teacher | Shiva Yoga Niketan`, description: `Meet ${deslugify(s)}, a yoga teacher at Shiva Yoga Niketan in Rishikesh. Explore their background, style and the classes they lead.` }) },
  { prefix: "/programs/", make: (s) => ({ title: `${deslugify(s)} — Shiva Yoga Niketan Rishikesh`, description: `Full details of the ${deslugify(s)} at Shiva Yoga Niketan in Rishikesh: syllabus, daily schedule, dates, fees and how to apply.` }) },
  { prefix: "/retreats/", make: (s) => ({ title: `${deslugify(s)} Retreat — Shiva Yoga Niketan`, description: `Discover the ${deslugify(s)} retreat at Shiva Yoga Niketan in Rishikesh: what to expect, itinerary, inclusions, dates and booking details.` }) },
  { prefix: "/blog/", make: (s) => ({ title: `${deslugify(s)} — Shiva Yoga Niketan Journal`, description: `Read "${deslugify(s)}" on the Shiva Yoga Niketan journal — insights on yoga, meditation and mindful living from our Rishikesh teachers.` }) },
];

const NOT_FOUND_META: Meta = {
  title: "Page Not Found (404) — Shiva Yoga Niketan",
  description: "The page you are looking for could not be found. Return to the Shiva Yoga Niketan homepage to explore our yoga courses and retreats.",
};

function upsertMeta(selector: string, attrs: Record<string, string>) {
  let el = document.head.querySelector<HTMLMetaElement>(selector);
  if (!el) {
    el = document.createElement("meta");
    document.head.appendChild(el);
  }
  Object.entries(attrs).forEach(([k, v]) => el!.setAttribute(k, v));
}

function upsertLink(rel: string, href: string) {
  let el = document.head.querySelector<HTMLLinkElement>(`link[rel="${rel}"]`);
  if (!el) {
    el = document.createElement("link");
    el.rel = rel;
    document.head.appendChild(el);
  }
  el.href = href;
}

// SVG favicon — a leaf mark in the brand teal, no external file required.
const FAVICON =
  "data:image/svg+xml," +
  encodeURIComponent(
    `<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32'><rect width='32' height='32' rx='8' fill='#074240'/><path d='M16 6c-6 3-8 8-8 12 0 4 3 8 8 8 0-6 2-10 6-13-4 0-7 1-9 4 0-4 1-8 3-11z' fill='#c3dbc5'/></svg>`
  );

// ─── Page-level overrides ──────────────────────────────────────────────────────
// Detail pages call usePageMeta() with their REAL title/description (instead of the
// slug-derived fallback), and the 404 page calls it with noindex. RouteHead
// subscribes to this tiny store so overrides win regardless of effect order.
export interface PageMeta extends Meta { noindex?: boolean; image?: string; type?: "website" | "article"; }
let overrideMeta: PageMeta | null = null;
const listeners = new Set<() => void>();
const metaStore = {
  set(m: PageMeta | null) { overrideMeta = m; listeners.forEach((l) => l()); },
  get: () => overrideMeta,
  subscribe(l: () => void) { listeners.add(l); return () => { listeners.delete(l); }; },
};

export function usePageMeta(meta: PageMeta | null) {
  const key = meta ? JSON.stringify(meta) : "";
  useEffect(() => {
    if (!meta) return;
    metaStore.set(meta);
    return () => metaStore.set(null);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key]);
}

/** Injects a JSON-LD <script> for the lifetime of the calling component. */
export function useJsonLd(id: string, data: object | null) {
  const json = data ? JSON.stringify(data) : "";
  useEffect(() => {
    if (!json) return;
    let tag = document.getElementById(id) as HTMLScriptElement | null;
    if (!tag) {
      tag = document.createElement("script");
      tag.type = "application/ld+json";
      tag.id = id;
      document.head.appendChild(tag);
    }
    tag.text = json;
    return () => { tag?.remove(); };
  }, [id, json]);
}

/** Absolute URL helper for structured data. */
export const absUrl = (path: string) => SITE.url + (path === "/" ? "" : path);

// Routes that must never be indexed by search engines.
const NOINDEX_ROUTES = ["/thank-you"];

export function RouteHead() {
  const { pathname } = useLocation();
  const override = useSyncExternalStore(metaStore.subscribe, metaStore.get, metaStore.get);

  const baseMeta: Meta = useMemo(() => {
    if (SEO_MAP[pathname]) return SEO_MAP[pathname];
    const dyn = DYNAMIC_META.find((d) => pathname.startsWith(d.prefix) && pathname.length > d.prefix.length);
    if (dyn) return dyn.make(pathname.slice(dyn.prefix.length));
    return NOT_FOUND_META;
  }, [pathname]);

  const meta: PageMeta = override ?? baseMeta;
  const isKnown = !!SEO_MAP[pathname] || DYNAMIC_META.some((d) => pathname.startsWith(d.prefix) && pathname.length > d.prefix.length);
  const noindex = !!override?.noindex || NOINDEX_ROUTES.includes(pathname) || !isKnown;

  // One-time head setup (lang, favicon, theme colour, verification, site-wide schema).
  useEffect(() => {
    document.documentElement.lang = "en";
    upsertLink("icon", FAVICON);
    upsertLink("apple-touch-icon", FAVICON);
    upsertMeta('meta[name="theme-color"]', { name: "theme-color", content: "#074240" });
    upsertMeta('meta[name="viewport"]', { name: "viewport", content: "width=device-width, initial-scale=1" });
    upsertMeta('meta[property="og:locale"]', { property: "og:locale", content: "en_IN" });
    if (SITE.googleSiteVerification) {
      upsertMeta('meta[name="google-site-verification"]', { name: "google-site-verification", content: SITE.googleSiteVerification });
    }

    const sameAs = Object.values(SITE.social).filter(isRealProfile);
    const graph = {
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": ["LocalBusiness", "HealthAndBeautyBusiness"],
          "@id": SITE.url + "/#business",
          name: SITE.name,
          url: SITE.url,
          telephone: SITE.phone,
          email: SITE.email,
          image: SITE.ogImage,
          logo: SITE.ogImage,
          address: {
            "@type": "PostalAddress",
            streetAddress: SITE.street,
            addressLocality: SITE.city,
            addressRegion: SITE.region,
            postalCode: SITE.postal,
            addressCountry: SITE.country,
          },
          geo: { "@type": "GeoCoordinates", latitude: SITE.geo.lat, longitude: SITE.geo.lng },
          openingHours: SITE.openingHours,
          hasMap: `https://www.google.com/maps/search/?api=1&query=${SITE.mapQuery}`,
          areaServed: "Worldwide",
          priceRange: "$$",
          ...(sameAs.length ? { sameAs } : {}),
        },
        {
          "@type": "WebSite",
          "@id": SITE.url + "/#website",
          url: SITE.url,
          name: SITE.name,
          inLanguage: "en",
          publisher: { "@id": SITE.url + "/#business" },
        },
      ],
    };
    const schemaId = "syn-local-schema";
    let tag = document.getElementById(schemaId) as HTMLScriptElement | null;
    if (!tag) {
      tag = document.createElement("script");
      tag.type = "application/ld+json";
      tag.id = schemaId;
      document.head.appendChild(tag);
    }
    tag.text = JSON.stringify(graph);
  }, []);

  // Per-route meta.
  useEffect(() => {
    const canonical = absUrl(pathname.replace(/\/+$/, "") || "/");
    const image = meta.image ?? SITE.ogImage;
    document.title = meta.title;
    upsertMeta('meta[name="description"]', { name: "description", content: meta.description });
    upsertMeta('meta[name="robots"]', { name: "robots", content: noindex ? "noindex, follow" : "index, follow, max-image-preview:large" });

    // Canonical only for indexable pages.
    const existingCanon = document.head.querySelector('link[rel="canonical"]');
    if (noindex) existingCanon?.remove();
    else upsertLink("canonical", canonical);

    // Open Graph
    upsertMeta('meta[property="og:type"]', { property: "og:type", content: meta.type ?? "website" });
    upsertMeta('meta[property="og:site_name"]', { property: "og:site_name", content: SITE.name });
    upsertMeta('meta[property="og:title"]', { property: "og:title", content: meta.title });
    upsertMeta('meta[property="og:description"]', { property: "og:description", content: meta.description });
    upsertMeta('meta[property="og:url"]', { property: "og:url", content: canonical });
    upsertMeta('meta[property="og:image"]', { property: "og:image", content: image });
    upsertMeta('meta[property="og:image:width"]', { property: "og:image:width", content: "1200" });
    upsertMeta('meta[property="og:image:height"]', { property: "og:image:height", content: "630" });

    // Twitter / X
    upsertMeta('meta[name="twitter:card"]', { name: "twitter:card", content: "summary_large_image" });
    upsertMeta('meta[name="twitter:title"]', { name: "twitter:title", content: meta.title });
    upsertMeta('meta[name="twitter:description"]', { name: "twitter:description", content: meta.description });
    upsertMeta('meta[name="twitter:image"]', { name: "twitter:image", content: image });

    // Send a GA pageview if analytics has been consented + loaded.
    if (window.gtag) window.gtag("event", "page_view", { page_path: pathname, page_title: meta.title });
  }, [pathname, meta, noindex]);

  // BreadcrumbList schema for every indexable non-home route.
  const segments = pathname.split("/").filter(Boolean);
  const crumbSchema = segments.length && !noindex
    ? {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: SITE.url + "/" },
          ...segments.map((seg, i) => {
            const isLast = i === segments.length - 1;
            const label = isLast && override ? override.title.split(" — ")[0].split(" | ")[0] : CRUMB_LABELS[seg] ?? deslugify(seg);
            return { "@type": "ListItem", position: i + 2, name: label, item: absUrl("/" + segments.slice(0, i + 1).join("/")) };
          }),
        ],
      }
    : null;
  useJsonLd("syn-breadcrumb-schema", crumbSchema);

  return null;
}
