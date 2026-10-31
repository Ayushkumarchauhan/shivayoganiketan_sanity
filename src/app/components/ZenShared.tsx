import { useState, useEffect, useRef, memo } from "react";
import { Link, useLocation } from "react-router";
import { Facebook, Twitter, Instagram, Youtube } from "lucide-react";
import { SITE, submitForm } from "./SiteExtras";
import { getLenis } from "./SmoothScroll";
import { useCms } from "../cms/useCms";
import svgPaths from "../../imports/svg-qtx3rc5tzi";
import { placeholder } from "./imagePlaceholder";
const imgFooterBg = placeholder("imgFooterBg");
import logoDark from "../../imports/logo-dark.png";

// ─── SHARED UI ──────────────────────────────────────────────────────────────

export function LeafIcon({ size = 18, color = "#C3DBC5" }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 18 18" fill="none" className="shrink-0">
      <path clipRule="evenodd" d={svgPaths.p2373de00} fill={color} fillRule="evenodd" />
    </svg>
  );
}

export function SectionBadge({ text, light = false }: { text: string; light?: boolean }) {
  return (
    <div className="flex items-center gap-2">
      <LeafIcon />
      <span
        className={`font-['Marcellus:Regular',sans-serif] text-[11px] sm:text-[13px] lg:text-[18px] tracking-[1px] uppercase ${
          light ? "text-white" : "text-[#151515]"
        }`}
      >
        {text}
      </span>
    </div>
  );
}

export function StarRating() {
  return (
    <svg width="132" height="24" viewBox="0 0 132 24" fill="none" className="shrink-0">
      <path d={svgPaths.p187b1f00} fill="#C3DBC5" />
      <path d={svgPaths.pcd25600} fill="#C3DBC5" />
      <path d={svgPaths.p27900270} fill="#C3DBC5" />
      <path d={svgPaths.p35da9200} fill="#C3DBC5" />
      <path d={svgPaths.p1dde8b00} fill="#C3DBC5" />
    </svg>
  );
}

export function ArrowCircleButton({ label, bg = "white" }: { label: string; bg?: string }) {
  return (
    <button
      style={{ background: bg }}
      className="flex items-center gap-2 pl-4 lg:pl-5 pr-2 py-1.5 lg:py-2 rounded-full cursor-pointer hover:opacity-90 transition-opacity shrink-0"
    >
      <span className="font-['Lato:Medium',sans-serif] text-[#1e1b1b] text-[13px] lg:text-[16px] whitespace-nowrap">
        {label}
      </span>
      <div className="w-8 h-8 lg:w-10 lg:h-10 bg-[#FAE1FB] rounded-full flex items-center justify-center -rotate-90 shrink-0">
        <svg width="16" height="16" viewBox="0 0 40 40" fill="none">
          <path d={svgPaths.p17b45500} fill="#151515" />
        </svg>
      </div>
    </button>
  );
}

export function GreenButton({ label, sm = false }: { label: string; sm?: boolean }) {
  return (
    <button
      className={`bg-[#c3dbc5] flex items-center justify-center rounded-full cursor-pointer hover:opacity-90 transition-opacity shrink-0 ${
        sm ? "px-5 py-3" : "px-6 lg:px-7 py-3 lg:py-[18px]"
      }`}
    >
      <span className="font-['Lato:Medium',sans-serif] text-[#151515] text-[13px] lg:text-[16px] whitespace-nowrap">
        {label}
      </span>
    </button>
  );
}

export function OutlinedButton({ label }: { label: string }) {
  return (
    <button className="border border-[#151515] flex items-center gap-2 px-5 lg:px-7 py-3 lg:py-[17px] rounded-full cursor-pointer hover:bg-[#151515] hover:text-white transition-colors shrink-0 group">
      <span className="font-['Lato:Medium',sans-serif] text-[13px] lg:text-[16px] text-[#151515] group-hover:text-white whitespace-nowrap">
        {label}
      </span>
      <svg width="10" height="10" viewBox="0 0 10 10" fill="none" className="shrink-0">
        <path d={svgPaths.p29f60cc0} fill="currentColor" className="text-[#151515] group-hover:text-white" />
      </svg>
    </button>
  );
}

export function LogoSymbol({ size = 35, color = "white" }: { size?: number; color?: string }) {
  return (
    <div style={{ width: size, height: size }} className="relative overflow-hidden shrink-0">
      <svg className="absolute inset-0 w-full h-full" fill="none" viewBox="0 0 35 35">
        <path clipRule="evenodd" d={svgPaths.p1adc3500} fill={color} fillRule="evenodd" />
      </svg>
    </div>
  );
}

// ─── SELECT MENU ──────────────────────────────────────────────────────────────
// A custom dropdown that matches the navbar dropdown styling (white rounded
// panel, soft shadow, teal hover/selected state). Use it in place of a native
// <select> anywhere in a form.
//
//   <SelectMenu
//     value={value}
//     onChange={setValue}
//     placeholder="Choose an option…"
//     options={[{ label: "One", value: "one" }, …]}
//     triggerClassName="…styling for the closed box…"
//     required            // (optional) preserves HTML form validation
//     name="course"       // (optional) name for the hidden form field
//   />
export interface SelectOption {
  label: string;
  value: string;
}

export function SelectMenu({
  value,
  onChange,
  options,
  placeholder = "Select an option",
  triggerClassName = "",
  required = false,
  name,
  ariaLabel,
}: {
  value: string;
  onChange: (value: string) => void;
  options: SelectOption[];
  placeholder?: string;
  triggerClassName?: string;
  required?: boolean;
  name?: string;
  ariaLabel?: string;
}) {
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    function onDocClick(e: MouseEvent) {
      if (rootRef.current && !rootRef.current.contains(e.target as Node)) setOpen(false);
    }
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    document.addEventListener("mousedown", onDocClick);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDocClick);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const selected = options.find((o) => o.value === value);

  return (
    <div ref={rootRef} className="relative w-full">
      {/* Trigger */}
      <button
        type="button"
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-label={ariaLabel ?? placeholder}
        onClick={() => setOpen((o) => !o)}
        className={`w-full flex items-center justify-between gap-3 text-left cursor-pointer ${triggerClassName}`}
      >
        <span className={selected ? "text-[#151515]" : "text-[#8b8a82]"}>
          {selected ? selected.label : placeholder}
        </span>
        <svg
          width="12" height="8" viewBox="0 0 7.5 4.5" fill="none"
          className={`shrink-0 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
        >
          <path d={svgPaths.p21c79680} stroke="#151515" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
        </svg>
      </button>

      {/* Panel */}
      <div
        className={`absolute left-0 top-full mt-2 z-40 w-full origin-top transition-all duration-200 ${
          open ? "opacity-100 scale-y-100 translate-y-0 pointer-events-auto" : "opacity-0 scale-y-95 -translate-y-1 pointer-events-none"
        }`}
      >
        <div
          role="listbox"
          data-lenis-prevent
          className="bg-white rounded-[18px] border border-[#e8e0d8] shadow-[0px_12px_32px_rgba(7,66,64,0.12)] p-2 flex flex-col gap-0.5 max-h-[280px] overflow-y-auto"
        >
          {options.map((opt) => {
            const isSel = opt.value === value;
            return (
              <button
                key={opt.value}
                type="button"
                role="option"
                aria-selected={isSel}
                onClick={() => { onChange(opt.value); setOpen(false); }}
                className={`flex items-center justify-between gap-3 text-left rounded-[12px] px-3.5 py-2.5 transition-colors ${
                  isSel ? "bg-[#eef3ee]" : "hover:bg-[#f4efe8]"
                }`}
              >
                <span className={`font-['Lato:Regular',sans-serif] text-[15px] leading-[20px] ${isSel ? "text-[#074240] font-['Lato:Medium',sans-serif]" : "text-[#151515]"}`}>
                  {opt.label}
                </span>
                {isSel && (
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" className="shrink-0">
                    <path d="M5 12.5L10 17.5L19 7" stroke="#074240" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Hidden mirror keeps native form validation working when `required`. It is
          kept focusable (not display:none) so the browser can show its bubble. */}
      {(required || name) && (
        <input
          tabIndex={-1}
          aria-hidden="true"
          required={required}
          name={name}
          value={value}
          onChange={() => {}}
          className="absolute left-1/2 bottom-0 w-px h-px opacity-0 pointer-events-none"
        />
      )}
    </div>
  );
}

// Self-contained variant that manages its own state — handy for simple forms
// where the value doesn't need to be lifted up.
export function FormSelect({
  defaultValue = "",
  ...rest
}: Omit<React.ComponentProps<typeof SelectMenu>, "value" | "onChange"> & { defaultValue?: string }) {
  const [value, setValue] = useState(defaultValue);
  return <SelectMenu {...rest} value={value} onChange={setValue} />;
}

// ─── FOOTER NEWSLETTER (sends via submitForm → Web3Forms) ────────────────────
function NewsletterForm() {
  const [email, setEmail] = useState("");
  const [state, setState] = useState<"idle" | "loading" | "done" | "error">("idle");
  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) { setState("error"); return; }
    setState("loading");
    const res = await submitForm("Newsletter signup", { email });
    setState(res.ok ? "done" : "error");
    if (res.ok) setEmail("");
  };
  return (
    <form onSubmit={onSubmit} noValidate className="flex flex-col gap-1.5">
      <div className="flex items-center gap-2 bg-[#e8e0d8] rounded-full pl-4 pr-1 py-1 w-full sm:w-[320px] lg:w-[400px]">
        <label htmlFor="footer-newsletter" className="sr-only">Email address</label>
        <input
          id="footer-newsletter"
          type="email"
          name="email"
          autoComplete="email"
          required
          value={email}
          onChange={(e) => { setEmail(e.target.value); if (state !== "loading") setState("idle"); }}
          placeholder="Your email..."
          className="flex-1 min-w-0 bg-transparent font-['Lato:Regular',sans-serif] text-[#434a4a] text-[14px] lg:text-[16px] outline-none"
        />
        <button
          type="submit"
          disabled={state === "loading"}
          aria-label="Subscribe to newsletter"
          className="w-[40px] h-[40px] lg:w-[50px] lg:h-[50px] bg-white rounded-full flex items-center justify-center shrink-0 -rotate-90 hover:bg-[#c3dbc5] transition-colors disabled:opacity-60"
        >
          <svg width="16" height="16" viewBox="0 0 40 40" fill="none" aria-hidden="true">
            <path d={svgPaths.p17b45500} fill="#151515" />
          </svg>
        </button>
      </div>
      <p aria-live="polite" className="min-h-[18px] font-['Lato:Regular',sans-serif] text-[12px] lg:text-[13px] text-[#434a4a]">
        {state === "done" && "Thank you — you're subscribed."}
        {state === "error" && "Please enter a valid email address and try again."}
      </p>
    </form>
  );
}

// ─── NAVBAR ──────────────────────────────────────────────────────────────────

// Static data hoisted to module level — never recreated on re-render
const NAV_LINKS = [
  { label: "Home",     to: "/",          hasDropdown: false },
  { label: "Retreats", to: "/retreats",  hasDropdown: false },
  { label: "Programs", to: "/programs",  hasDropdown: true  },
  { label: "Pages",    to: "#",          hasDropdown: true  },
  { label: "Contacts", to: "/contact",   hasDropdown: false },
] as const;

const PAGES_DROPDOWN = [
  { label: "About Us",            to: "/about"    },
  { label: "Our Teachers",        to: "/teachers" },
  { label: "Fees & Registration", to: "/prices"   },
  { label: "Blog",                to: "/blog"     },
] as const;

const PROGRAMS_DROPDOWN = [
  { label: "Yoga Course For Beginners",              to: "/programs/yoga-course-for-beginners"              },
  { label: "200 Hrs Hatha Yoga Teacher Training",    to: "/programs/200-hrs-hatha-yoga-teacher-training"    },
  { label: "200 Hrs Vinyasa Yoga Teacher Training",  to: "/programs/200-hrs-vinyasa-yoga-teacher-training"  },
  { label: "200 Hrs Kundalini Yoga Teacher Training", to: "/programs/200-hrs-kundalini-yoga-teacher-training" },
] as const;

// Maps a nav label to the dropdown items it should show
const DROPDOWN_ITEMS: Record<string, ReadonlyArray<{ label: string; to: string }>> = {
  Pages:    PAGES_DROPDOWN,
  Programs: PROGRAMS_DROPDOWN,
};

export function Navbar() {
  // Programs menu follows Sanity (Display order); falls back to the built-in list.
  const { programs } = useCms();
  const programLinks = programs ? programs.map((p) => ({ label: p.title, to: `/programs/${p.slug}` })) : PROGRAMS_DROPDOWN;
  const dropdownItems: Record<string, ReadonlyArray<{ label: string; to: string }>> = { ...DROPDOWN_ITEMS, Programs: programLinks };
  const [open, setOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [mobileExpandedItem, setMobileExpandedItem] = useState<string | null>(null);
  const { pathname } = useLocation();
  const dropdownAreaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const locked = open || searchOpen;
    document.body.style.overflow = locked ? "hidden" : "";
    // Smooth-scroll engine ignores body overflow — pause it explicitly while an overlay is open.
    const lenis = getLenis();
    if (lenis) { if (locked) lenis.stop(); else lenis.start(); }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open, searchOpen]);

  // Close dropdown on outside click
  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (dropdownAreaRef.current && !dropdownAreaRef.current.contains(e.target as Node)) {
        setOpenDropdown(null);
      }
    }
    if (openDropdown) document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [openDropdown]);

  const isActive = (to: string) => {
    if (to === "/") return pathname === "/";
    if (to === "/contact") return pathname === "/contact";
    if (to === "/teachers") return pathname.startsWith("/teachers");
    if (to === "/programs") return pathname.startsWith("/programs");
    if (to === "/retreats") return pathname.startsWith("/retreats");
    if (to === "/about") return pathname === "/about";
    if (to === "/blog") return pathname.startsWith("/blog");
    if (to === "/prices") return pathname === "/prices";
    return false;
  };

  return (
    <>
      {/* ── Search Overlay — always in DOM, toggled via CSS for instant open/close ── */}
      <div
        className={`fixed inset-0 z-[100] bg-[#c3dbc5] flex items-center justify-center transition-opacity duration-200 ${
          searchOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        aria-hidden={!searchOpen}
      >
        {/* Close button */}
        <button
          onClick={() => setSearchOpen(false)}
          aria-label="Close search"
          className="absolute top-5 right-5 text-white hover:opacity-70 transition-opacity"
        >
          <svg width="25" height="25" viewBox="0 0 25 25" fill="none">
            <path
              clipRule="evenodd"
              d="M0.394903 0.39494C0.921431 -0.131657 1.77516 -0.13163 2.30172 0.394922L12.5 10.5932L22.6983 0.39494C23.2248 -0.13168 24.0785 -0.131554 24.6051 0.394903C25.1317 0.921432 25.1316 1.77517 24.6051 2.30172L14.4068 12.5L24.6051 22.6983C25.1316 23.2248 25.1316 24.0786 24.6051 24.6051C24.3419 24.8683 23.9961 25 23.6517 25C23.3073 25 22.9615 24.8683 22.6982 24.6051L12.5 14.4068L2.30176 24.6051C2.03854 24.8683 1.69278 25 1.34834 25C1.00395 25 0.658153 24.8683 0.394939 24.6051C-0.131656 24.0786 -0.13163 23.2249 0.394921 22.6983L10.5932 12.5L0.394939 2.30174C-0.131661 1.77518 -0.131548 0.921458 0.394903 0.39494Z"
              fill="currentColor"
              fillRule="evenodd"
            />
          </svg>
        </button>

        {/* Search input row */}
        <div className="w-full max-w-[800px] px-6 sm:px-8">
          <div className="flex items-center justify-between border-b border-[#074240] py-6 sm:py-8 gap-4">
            <input
              type="text"
              placeholder="Search..."
              className="flex-1 bg-transparent font-['Marcellus:Regular',sans-serif] text-[#074240] text-[32px] sm:text-[48px] lg:text-[60px] tracking-[-2px] outline-none placeholder:text-[#074240]/50 min-w-0"
            />
            <button className="shrink-0 text-[#074240] hover:opacity-70 transition-opacity">
              <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
                <circle cx="15" cy="15" r="13" stroke="currentColor" strokeWidth="2.3" />
                <line x1="24.8" y1="24.8" x2="34.5" y2="34.5" stroke="currentColor" strokeWidth="2.3" strokeLinecap="round" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* ── Main Header ──────────────────────────────────────────── */}
      <header className="w-full sticky top-0 z-50 bg-[#f8f3ed]/95 backdrop-blur-sm border-b border-[#e8e0d8]">
        <div className="max-w-[1840px] mx-auto px-4 sm:px-6 lg:px-10 flex items-center justify-between h-16 lg:h-20">

          {/* Logo */}
          <Link to="/" className="flex items-center shrink-0">
            <img loading="lazy" decoding="async"
              src={logoDark}
              alt="Shiva Yoga Niketan"
              className="h-10 lg:h-12 w-auto object-contain"
            />
          </Link>

          {/* Desktop nav */}
          <nav ref={dropdownAreaRef} className="hidden lg:flex items-center gap-6 xl:gap-10">
            {NAV_LINKS.map((link) => {
              const active = isActive(link.to);
              const dropOpen = openDropdown === link.label;
              return (
                <div
                  key={link.label}
                  className="relative"
                  onMouseEnter={() => link.hasDropdown && setOpenDropdown(link.label)}
                  onMouseLeave={() => link.hasDropdown && setOpenDropdown(null)}
                >
                  <Link
                    to={link.to}
                    onClick={(e) => link.to === "#" && e.preventDefault()}
                    className="flex items-center gap-2 cursor-pointer group"
                  >
                    <span
                      className={`font-['Playfair_Display:Medium_Italic',sans-serif] text-[16px] xl:text-[18px] transition-colors ${
                        active || dropOpen
                          ? "text-[#074240] border-b border-[#074240]"
                          : "text-[#151515] group-hover:text-[#074240]"
                      }`}
                    >
                      {link.label}
                    </span>
                    {link.hasDropdown && (
                      <svg
                        width="7" height="5" viewBox="0 0 7.5 4.5" fill="none"
                        className={`shrink-0 transition-transform duration-200 ${dropOpen ? "rotate-180" : ""}`}
                      >
                        <path
                          d={svgPaths.p21c79680}
                          stroke={active || dropOpen ? "#074240" : "#151515"}
                          strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5"
                        />
                      </svg>
                    )}
                  </Link>

                  {/* Dropdown panel — outer div uses pt-3 (padding, NOT margin) so the
                      hover zone is seamless from trigger to panel; no gap for mouse to escape.
                      When closed it MUST be pointer-events-none, otherwise the invisible
                      panel box below the link keeps capturing hover and re-opens the menu. */}
                  {link.hasDropdown && (
                    <div className={`absolute top-full left-0 z-50 pt-3 ${dropOpen ? "pointer-events-auto" : "pointer-events-none"} ${link.label === "Programs" ? "w-[300px]" : "w-[240px]"}`}>
                      <div
                        className={`bg-white rounded-[20px] shadow-[0px_4px_24px_rgba(0,0,0,0.10)] p-[30px] flex flex-col gap-[10px] transition-all duration-200 origin-top ${
                          dropOpen ? "opacity-100 scale-y-100 pointer-events-auto" : "opacity-0 scale-y-95 pointer-events-none"
                        }`}
                      >
                        {(dropdownItems[link.label] ?? []).map((item) => (
                          <div key={item.label} className="flex flex-col gap-[5px]">
                            <Link
                              to={item.to}
                              onClick={() => setOpenDropdown(null)}
                              className={`font-['Lato:Regular',sans-serif] text-[15px] leading-[24px] hover:text-[#074240] transition-colors ${
                                pathname === item.to ? "text-[#074240]" : "text-[#151515]"
                              }`}
                            >
                              {item.label}
                            </Link>
                            <div className={`h-px w-full ${pathname === item.to ? "bg-[#074240]" : "bg-white"}`} />
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </nav>

          {/* Desktop right: search + CTA */}
          <div className="hidden lg:flex items-center gap-5 xl:gap-6">
            <button
              aria-label="Open search"
              onClick={() => setSearchOpen(true)}
              className="text-[#151515] hover:text-[#074240] transition-colors"
            >
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path clipRule="evenodd" d={svgPaths.p391ec100} fill="currentColor" fillRule="evenodd" />
                <path clipRule="evenodd" d={svgPaths.p25d9d7c0} fill="currentColor" fillRule="evenodd" />
              </svg>
            </button>
            {/* Book Now CTA — navigates to /appointment */}
            <Link
              to="/appointment"
              className="bg-white flex items-center gap-2 pl-5 pr-[10px] py-2 rounded-full hover:bg-[#c3dbc5] transition-colors shrink-0 group"
              aria-label="Book Now"
            >
              <span className="font-['Lato:Medium',sans-serif] text-[#1e1b1b] text-[15px] xl:text-[16px] whitespace-nowrap">
                Book Now
              </span>
              <div className="w-8 h-8 lg:w-10 lg:h-10 bg-[#c3dbc5] group-hover:bg-white rounded-full flex items-center justify-center -rotate-90 shrink-0 transition-colors">
                <svg width="16" height="16" viewBox="0 0 40 40" fill="none">
                  <path d={svgPaths.p17b45500} fill="#151515" />
                </svg>
              </div>
            </Link>
          </div>

          {/* Mobile/Tablet hamburger */}
          <button
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen(!open)}
            className="lg:hidden flex flex-col gap-1.5 p-1 cursor-pointer"
          >
            <span className={`block w-6 h-0.5 bg-[#151515] transition-all duration-300 ${open ? "rotate-45 translate-y-2" : ""}`} />
            <span className={`block w-6 h-0.5 bg-[#151515] transition-all duration-300 ${open ? "opacity-0" : ""}`} />
            <span className={`block w-6 h-0.5 bg-[#151515] transition-all duration-300 ${open ? "-rotate-45 -translate-y-2" : ""}`} />
          </button>
        </div>
      </header>

      {/* ── Mobile/Tablet Offcanvas ───────────────────────────────── */}
      {/* Backdrop */}
      <div
        onClick={() => setOpen(false)}
        className={`lg:hidden fixed inset-0 z-[60] bg-black/30 transition-opacity duration-300 ${
          open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
      />

      {/* Slide-in panel */}
      <div
        className={`lg:hidden fixed top-0 right-0 h-full z-[70] w-[320px] sm:w-[460px] bg-white flex flex-col justify-between transition-transform duration-300 ease-in-out ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Inner scroll container */}
        <div data-lenis-prevent className="flex flex-col justify-between h-full overflow-y-auto p-[30px] sm:p-[40px]">

          {/* Top: Logo + nav */}
          <div className="flex flex-col gap-[30px] sm:gap-[50px]">

            {/* Logo row */}
            <div className="relative flex items-center">
              <Link to="/" onClick={() => setOpen(false)} className="flex items-center">
                <img loading="lazy" decoding="async"
                  src={logoDark}
                  alt="Shiva Yoga Niketan"
                  className="h-10 sm:h-12 w-auto object-contain"
                />
              </Link>

              {/* Close X */}
              <button
                onClick={() => setOpen(false)}
                aria-label="Close menu"
                className="absolute right-0 top-0 text-[#151515] hover:opacity-60 transition-opacity"
              >
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                  <path
                    clipRule="evenodd"
                    d="M0.264645 0.264645C0.654083 -0.125022 1.28 -0.125017 1.67041 0.264645L9 7.5942L16.3296 0.264645C16.72 -0.125017 17.3459 -0.125017 17.7354 0.264645C18.1258 0.655013 18.1258 1.28006 17.7354 1.67041L10.4058 9L17.7354 16.3296C18.1258 16.72 18.1258 17.3459 17.7354 17.7354C17.5401 17.9307 17.2832 18.028 17.0261 18.028C16.769 18.028 16.5131 17.9307 16.3178 17.7354L9 10.4058L1.67041 17.7354C1.47504 17.9307 1.21813 18.028 0.961 18.028C0.703779 18.028 0.447864 17.9307 0.252491 17.7354C-0.137971 17.3459 -0.137923 16.72 0.252588 16.3296L7.5942 9L0.252491 1.67041C-0.137972 1.28006 -0.137906 0.655013 0.264645 0.264645Z"
                    fill="currentColor"
                    fillRule="evenodd"
                  />
                </svg>
              </button>
            </div>

            {/* Nav items — mirrors desktop NAV_LINKS exactly */}
            <nav className="flex flex-col gap-[20px] sm:gap-[25px]">

              {/* Home */}
              <Link
                to="/"
                onClick={() => setOpen(false)}
                className={`font-['Marcellus:Regular',sans-serif] text-[28px] sm:text-[40px] tracking-[-1px] leading-tight transition-colors ${
                  pathname === "/" ? "text-[#074240]" : "text-[#151515] hover:text-[#074240]"
                }`}
              >
                Home
              </Link>

              {/* Retreats */}
              <Link
                to="/retreats"
                onClick={() => setOpen(false)}
                className="font-['Marcellus:Regular',sans-serif] text-[#151515] text-[28px] sm:text-[40px] tracking-[-1px] leading-tight hover:text-[#074240] transition-colors"
              >
                Retreats
              </Link>

              {/* Programs — expandable, matches desktop dropdown */}
              <div className="flex flex-col gap-[16px]">
                <div className="flex items-center gap-[12px]">
                  <Link
                    to="/programs"
                    onClick={() => { setOpen(false); setMobileExpandedItem(null); }}
                    className={`font-['Marcellus:Regular',sans-serif] text-[28px] sm:text-[40px] tracking-[-1px] leading-tight transition-colors ${
                      pathname === "/programs" ? "text-[#074240]" : "text-[#151515] hover:text-[#074240]"
                    }`}
                  >
                    Programs
                  </Link>
                  <button
                    aria-label={mobileExpandedItem === "Programs" ? "Collapse Programs" : "Expand Programs"}
                    onClick={() => setMobileExpandedItem(mobileExpandedItem === "Programs" ? null : "Programs")}
                    className="p-1"
                  >
                    <svg
                      width="10" height="6" viewBox="0 0 12 7" fill="none"
                      className={`shrink-0 transition-transform duration-200 ${mobileExpandedItem === "Programs" ? "rotate-180" : ""}`}
                    >
                      <path
                        d="M11 1L6 6L1 1"
                        stroke={mobileExpandedItem === "Programs" ? "#074240" : "#151515"}
                        strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                      />
                    </svg>
                  </button>
                </div>

                {/* Programs sub-items */}
                <div
                  className={`flex flex-col gap-3 pl-3 border-l-2 border-[#c3dbc5] overflow-hidden transition-all duration-300 ${
                    mobileExpandedItem === "Programs" ? "max-h-[300px] opacity-100" : "max-h-0 opacity-0"
                  }`}
                >
                  {programLinks.map((item) => (
                    <Link
                      key={item.label}
                      to={item.to}
                      onClick={() => { setOpen(false); setMobileExpandedItem(null); }}
                      className={`font-['Playfair_Display:Medium_Italic',sans-serif] italic text-[16px] sm:text-[18px] leading-[26px] transition-colors hover:text-[#074240] ${
                        pathname === item.to ? "text-[#074240]" : "text-[#151515]"
                      }`}
                    >
                      {item.label}
                    </Link>
                  ))}
                </div>
              </div>

              {/* Pages — expandable, matches desktop dropdown */}
              <div className="flex flex-col gap-[16px]">
                <button
                  className="flex items-center gap-[12px] text-left"
                  onClick={() => setMobileExpandedItem(mobileExpandedItem === "Pages" ? null : "Pages")}
                >
                  <span
                    className={`font-['Marcellus:Regular',sans-serif] text-[28px] sm:text-[40px] tracking-[-1px] leading-tight transition-colors ${
                      mobileExpandedItem === "Pages" ? "text-[#074240]" : "text-[#151515]"
                    }`}
                  >
                    Pages
                  </span>
                  <svg
                    width="10" height="6" viewBox="0 0 12 7" fill="none"
                    className={`shrink-0 transition-transform duration-200 ${mobileExpandedItem === "Pages" ? "rotate-180" : ""}`}
                  >
                    <path
                      d="M11 1L6 6L1 1"
                      stroke={mobileExpandedItem === "Pages" ? "#074240" : "#151515"}
                      strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                    />
                  </svg>
                </button>

                {/* Pages sub-items */}
                <div
                  className={`flex flex-col gap-3 pl-3 border-l-2 border-[#c3dbc5] overflow-hidden transition-all duration-300 ${
                    mobileExpandedItem === "Pages" ? "max-h-[260px] opacity-100" : "max-h-0 opacity-0"
                  }`}
                >
                  {PAGES_DROPDOWN.map((item) => (
                    <Link
                      key={item.label}
                      to={item.to}
                      onClick={() => { setOpen(false); setMobileExpandedItem(null); }}
                      className={`font-['Playfair_Display:Medium_Italic',sans-serif] italic text-[16px] sm:text-[18px] leading-[26px] transition-colors hover:text-[#074240] ${
                        pathname === item.to ? "text-[#074240]" : "text-[#151515]"
                      }`}
                    >
                      {item.label}
                    </Link>
                  ))}
                </div>
              </div>

              {/* Contacts */}
              <Link
                to="/contact"
                onClick={() => setOpen(false)}
                className={`font-['Marcellus:Regular',sans-serif] text-[28px] sm:text-[40px] tracking-[-1px] leading-tight transition-colors ${
                  pathname === "/contact" ? "text-[#074240]" : "text-[#151515] hover:text-[#074240]"
                }`}
              >
                Contacts
              </Link>
            </nav>
          </div>

          {/* Bottom: search + CTA */}
          <div className="flex flex-col gap-[15px] mt-10">
            {/* Search field */}
            <div className="relative rounded-[30px] border border-[#8b8a82] flex items-center justify-between px-[25px] py-[13px]">
              <input
                type="text"
                placeholder="Search..."
                className="flex-1 bg-transparent font-['Lato:Regular',sans-serif] text-[#8b8a82] text-[16px] sm:text-[17px] outline-none min-w-0"
              />
              <button className="shrink-0 ml-3 text-[#074240] hover:opacity-70 transition-opacity">
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <path clipRule="evenodd" d={svgPaths.p391ec100} fill="currentColor" fillRule="evenodd" />
                  <path clipRule="evenodd" d={svgPaths.p25d9d7c0} fill="currentColor" fillRule="evenodd" />
                </svg>
              </button>
            </div>

            {/* Book CTA */}
            <Link
              to="/appointment"
              onClick={() => setOpen(false)}
              className="w-full bg-[#c3dbc5] rounded-[30px] py-[18px] px-[30px] font-['Lato:Medium',sans-serif] text-[#151515] text-[15px] text-center hover:opacity-90 transition-opacity block"
            >
              Book Now
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}

// ─── FOOTER ──────────────────────────────────────────────────────────────────

// ── Static sitemap data — hoisted so Footer never recreates on re-render ──────
const SITEMAP_EXPLORE = [
  { label: "Home",               to: "/"           },
  { label: "About Us",           to: "/about"      },
  { label: "Our Teachers",       to: "/teachers"   },
  { label: "Blog & Journal",     to: "/blog"       },
  { label: "Contact Us",         to: "/contact"    },
] as const;

const SITEMAP_RETREATS = [
  { label: "All Retreats",          to: "/retreats"                           },
  { label: "Roots of Stillness",    to: "/retreats/roots-of-stillness"        },
  { label: "Sacred Flow",           to: "/retreats/sacred-flow"               },
  { label: "Winter of Presence",    to: "/retreats/winter-of-presence"        },
  { label: "The Inner Horizon",     to: "/retreats/the-inner-horizon"         },
  { label: "Awaken in the Wild",    to: "/retreats/awaken-in-the-wild"        },
  { label: "Paths of Awakening",    to: "/retreats/paths-of-awakening"        },
] as const;

const SITEMAP_PROGRAMS = [
  { label: "All Programs",              to: "/programs"                                        },
  { label: "Yoga For Beginners",        to: "/programs/yoga-course-for-beginners"              },
  { label: "200 Hrs Hatha Training",    to: "/programs/200-hrs-hatha-yoga-teacher-training"    },
  { label: "200 Hrs Vinyasa Training",  to: "/programs/200-hrs-vinyasa-yoga-teacher-training"  },
  { label: "200 Hrs Kundalini Training", to: "/programs/200-hrs-kundalini-yoga-teacher-training" },
] as const;

export const Footer = memo(function Footer() {
  // Footer lists follow Sanity (max 6 each); fall back to the built-in lists.
  const { programs, retreats } = useCms();
  const retreatLinks = retreats ? retreats.slice(0, 6).map((r) => ({ label: r.name, to: `/retreats/${r.slug}` })) : SITEMAP_RETREATS;
  const programLinks = programs ? programs.slice(0, 6).map((p) => ({ label: p.title, to: `/programs/${p.slug}` })) : SITEMAP_PROGRAMS;
  return (
    <footer className="relative overflow-hidden rounded-t-[16px] lg:rounded-t-[20px] mx-4 sm:mx-6 lg:mx-10">
      <img
        src={imgFooterBg}
        alt=""
        loading="lazy"
        decoding="async"
        className="absolute inset-0 w-full h-full object-cover opacity-30 pointer-events-none"
      />
      <div className="relative z-10">

        {/* ── Newsletter bar ── */}
        <div className="px-6 lg:px-[80px] pt-12 lg:pt-[80px] pb-10 lg:pb-[80px] border-b border-white/30">
          <div className="max-w-[1280px] mx-auto flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6 lg:gap-0">
            <p className="font-['Marcellus:Regular',sans-serif] text-[#151515] text-[18px] sm:text-[22px] lg:text-[32px] leading-[1.4] tracking-[-0.5px] lg:tracking-[-1px] max-w-[460px]">
              Enjoy 10% off your first retreat — a gift to welcome your stillness.
            </p>
            <div className="flex flex-col gap-2 shrink-0 w-full sm:w-auto">
              <p className="font-['Marcellus:Regular',sans-serif] text-[#151515] text-[12px] lg:text-[18px] tracking-[1px] uppercase">
                Sign up to Newsletter
              </p>
              <NewsletterForm />
            </div>
          </div>
        </div>

        {/* ── Sitemap grid ── */}
        <div className="px-6 lg:px-[80px] py-10 lg:py-[60px] border-b border-white/20">
          <div className="max-w-[1280px] mx-auto grid grid-cols-2 lg:grid-cols-[1.4fr_1fr_1.2fr_1fr] gap-x-6 gap-y-10 lg:gap-10 xl:gap-16">

            {/* ── Col 1 · Brand ── */}
            <div className="col-span-2 lg:col-span-1 flex flex-col gap-5 lg:gap-6">
              <Link to="/" className="flex items-center">
                <img loading="lazy" decoding="async" src={logoDark} alt="Shiva Yoga Niketan" className="h-10 lg:h-12 w-auto object-contain" />
              </Link>
              <p className="font-['Lato:Regular',sans-serif] text-[#434a4a] text-[14px] lg:text-[15px] leading-[1.7] max-w-[260px]">
                Ancient wisdom. Modern stillness. A sanctuary for the body, mind, and spirit.
              </p>
              <div className="flex flex-col gap-1">
                {/* NAP (Name / Address / Phone) — must match Google Business Profile exactly. Edit in SITE (SiteExtras.tsx). */}
                <a href={`tel:${SITE.phone}`} className="font-['Lato:Regular',sans-serif] text-[#151515] text-[14px] lg:text-[15px] leading-[1.7] hover:text-[#074240] transition-colors">
                  {SITE.phoneDisplay}
                </a>
                <a href={`mailto:${SITE.email}`} className="font-['Lato:Regular',sans-serif] text-[#151515] text-[14px] lg:text-[15px] leading-[1.7] hover:text-[#074240] transition-colors">
                  {SITE.email}
                </a>
                <address className="not-italic font-['Lato:Regular',sans-serif] text-[#434a4a] text-[13px] lg:text-[14px] leading-[1.6]">
                  {SITE.street}, {SITE.city}, {SITE.region} {SITE.postal}, India
                </address>
              </div>
              {/* Social icons */}
              <div className="flex gap-2 mt-1">
                <a href={SITE.social.facebook} target="_blank" rel="noopener noreferrer me" aria-label="Shiva Yoga Niketan on Facebook"
                  className="w-9 h-9 lg:w-[42px] lg:h-[42px] bg-white rounded-full flex items-center justify-center hover:bg-[#c3dbc5] transition-colors shrink-0">
                  <Facebook size={18} strokeWidth={2} className="text-[#151515]" />
                </a>
                <a href={SITE.social.twitter} target="_blank" rel="noopener noreferrer me" aria-label="Shiva Yoga Niketan on X (Twitter)"
                  className="w-9 h-9 lg:w-[42px] lg:h-[42px] bg-white rounded-full flex items-center justify-center hover:bg-[#c3dbc5] transition-colors shrink-0">
                  <Twitter size={18} strokeWidth={2} className="text-[#151515]" />
                </a>
                <a href={SITE.social.instagram} target="_blank" rel="noopener noreferrer me" aria-label="Shiva Yoga Niketan on Instagram"
                  className="w-9 h-9 lg:w-[42px] lg:h-[42px] bg-white rounded-full flex items-center justify-center hover:bg-[#c3dbc5] transition-colors shrink-0">
                  <Instagram size={18} strokeWidth={2} className="text-[#151515]" />
                </a>
                <a href={SITE.social.youtube} target="_blank" rel="noopener noreferrer me" aria-label="Shiva Yoga Niketan on YouTube"
                  className="w-9 h-9 lg:w-[42px] lg:h-[42px] bg-white rounded-full flex items-center justify-center hover:bg-[#c3dbc5] transition-colors shrink-0">
                  <Youtube size={18} strokeWidth={2} className="text-[#151515]" />
                </a>
              </div>
            </div>

            {/* ── Col 2 · Explore ── */}
            <div className="flex flex-col gap-4 lg:gap-5">
              <p className="font-['Marcellus:Regular',sans-serif] text-[#151515] text-[18px] lg:text-[24px] tracking-[-0.5px]">Explore</p>
              <nav className="flex flex-col gap-2 lg:gap-3" aria-label="Explore">
                {SITEMAP_EXPLORE.map((l) => (
                  <Link
                    key={l.to}
                    to={l.to}
                    className="font-['Lato:Regular',sans-serif] text-[#151515] text-[13px] lg:text-[15px] leading-[1.7] hover:text-[#074240] transition-colors"
                  >
                    {l.label}
                  </Link>
                ))}
              </nav>
            </div>

            {/* ── Col 3 · Retreats ── */}
            <div className="flex flex-col gap-4 lg:gap-5">
              <p className="font-['Marcellus:Regular',sans-serif] text-[#151515] text-[18px] lg:text-[24px] tracking-[-0.5px]">Retreats</p>
              <nav className="flex flex-col gap-2 lg:gap-3" aria-label="Retreats">
                {retreatLinks.map((l) => (
                  <Link
                    key={l.to}
                    to={l.to}
                    className="font-['Lato:Regular',sans-serif] text-[#151515] text-[13px] lg:text-[15px] leading-[1.7] hover:text-[#074240] transition-colors"
                  >
                    {l.label}
                  </Link>
                ))}
              </nav>
            </div>

            {/* ── Col 4 · Programs & Book ── */}
            <div className="flex flex-col gap-4 lg:gap-5">
              <p className="font-['Marcellus:Regular',sans-serif] text-[#151515] text-[18px] lg:text-[24px] tracking-[-0.5px]">Programs</p>
              <nav className="flex flex-col gap-2 lg:gap-3" aria-label="Programs">
                {programLinks.map((l) => (
                  <Link
                    key={l.to}
                    to={l.to}
                    className="font-['Lato:Regular',sans-serif] text-[#151515] text-[13px] lg:text-[15px] leading-[1.7] hover:text-[#074240] transition-colors"
                  >
                    {l.label}
                  </Link>
                ))}
              </nav>
            </div>

          </div>
        </div>

        {/* ── Copyright ── */}
        <div className="px-6 lg:px-[80px] py-5">
          <div className="max-w-[1280px] mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
            <p className="font-['Lato:Regular',sans-serif] text-[#434a4a] text-[12px] lg:text-[14px] leading-[1.7]">
              © 2025 Shiva Yoga Niketan · All Rights Reserved
            </p>
            <div className="flex items-center gap-4">
              <Link to="/privacy" className="font-['Lato:Regular',sans-serif] text-[#434a4a] text-[12px] lg:text-[14px] leading-[1.7] hover:text-[#074240] transition-colors">
                Privacy Policy
              </Link>
              <span className="text-[#8b8a82] text-[12px]">·</span>
              <Link to="/terms" className="font-['Lato:Regular',sans-serif] text-[#434a4a] text-[12px] lg:text-[14px] leading-[1.7] hover:text-[#074240] transition-colors">
                Terms &amp; Conditions
              </Link>
              <span className="text-[#8b8a82] text-[12px]">·</span>
              <Link to="/sitemap" className="font-['Lato:Regular',sans-serif] text-[#434a4a] text-[12px] lg:text-[14px] leading-[1.7] hover:text-[#074240] transition-colors">
                Sitemap
              </Link>
            </div>
          </div>
        </div>

      </div>
    </footer>
  );
});