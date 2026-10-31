import { useState, useMemo } from "react";
import { useCms } from "../cms/useCms";
import { RichText } from "../cms/RichText";
import type { PortableTextBlock } from "@portabletext/react";
import { useParams, Link, useNavigate } from "react-router";
import { SITE, submitForm, Honeypot, FormError, usePageMeta, useJsonLd, absUrl } from "./SiteExtras";
import NotFoundPage from "./NotFoundPage";
import svgPaths from "../../imports/OpenRetreat/svg-6kr3we1r79";
import { SelectMenu } from "./ZenShared";
import { placeholder, LCP } from "./imagePlaceholder";

// ─── Images ──────────────────────────────────────────────────────────────────
const imgTexture = placeholder("imgTexture");
const imgHeroPortrait = placeholder("imgHeroPortrait");
const imgMap = placeholder("imgMap");
const imgBooking = placeholder("imgBooking");

// Retreat-specific hero images
const imgCard1 = placeholder("imgCard1");
const imgCard2 = placeholder("imgCard2");
const imgCard3 = placeholder("imgCard3");
const imgCard4 = placeholder("imgCard4");
const imgCard5 = placeholder("imgCard5");
const imgCard6 = placeholder("imgCard6");

// ─── Data ─────────────────────────────────────────────────────────────────────
interface RetreatData {
  slug: string;
  name: string;
  badge: string;
  tagline: string;
  date: string;
  time: string;
  location: string;
  heroImg: string;
  prevTitle?: string;
  prevSlug?: string;
  nextTitle?: string;
  nextSlug?: string;
  // Optional — filled from Sanity when available.
  price?: string;
  description?: PortableTextBlock[];
  organizer?: string;
  venueName?: string;
  venueAddress?: string;
  startDate?: string;
  endDate?: string;
  seo?: { metaTitle?: string; metaDescription?: string };
}

// Built-in content — shown when Sanity has no published retreats (and used to seed Sanity).
export const ALL_RETREATS: RetreatData[] = [
  {
    slug: "roots-of-stillness",
    name: "Roots of Stillness",
    badge: "Yoga & Meditation",
    tagline: "Join volunteers to prepare and serve meals to families in need.",
    date: "September 18–24, 2025",
    time: "12:00 PM",
    location: "Tuscany, Italy",
    heroImg: imgCard1,
    nextTitle: "Sacred Flow",
    nextSlug: "sacred-flow",
  },
  {
    slug: "sacred-flow",
    name: "Sacred Flow",
    badge: "Intuitive Movement",
    tagline: "Surrender to the rhythm of intuitive movement and find freedom in your practice.",
    date: "October 10–17, 2025",
    time: "9:00 AM",
    location: "Bali, Indonesia",
    heroImg: imgCard2,
    prevTitle: "Roots of Stillness",
    prevSlug: "roots-of-stillness",
    nextTitle: "Awaken in the Wild",
    nextSlug: "awaken-in-the-wild",
  },
  {
    slug: "awaken-in-the-wild",
    name: "Awaken in the Wild",
    badge: "Meditation & Clean Eating",
    tagline: "Reconnect with nature's wisdom through immersive wilderness meditation and nourishing whole foods.",
    date: "January 5–12, 2026",
    time: "8:00 AM",
    location: "Costa Rica",
    heroImg: imgCard3,
    prevTitle: "Sacred Flow",
    prevSlug: "sacred-flow",
    nextTitle: "Paths of Awakening",
    nextSlug: "paths-of-awakening",
  },
  {
    slug: "paths-of-awakening",
    name: "Paths of Awakening",
    badge: "Mindful Movement",
    tagline: "Walk the ancient paths of mindful movement and discover your own quiet centre.",
    date: "January 5–12, 2026",
    time: "8:00 AM",
    location: "Costa Rica",
    heroImg: imgCard4,
    prevTitle: "Awaken in the Wild",
    prevSlug: "awaken-in-the-wild",
    nextTitle: "Winter of Presence",
    nextSlug: "winter-of-presence",
  },
  {
    slug: "winter-of-presence",
    name: "Winter of Presence",
    badge: "Yin Yoga & Mindfulness",
    tagline: "Let the stillness of winter guide you inward through gentle yin yoga and mindfulness practice.",
    date: "December 12–16, 2025",
    time: "10:00 AM",
    location: "Lapland, Finland",
    heroImg: imgCard5,
    prevTitle: "Paths of Awakening",
    prevSlug: "paths-of-awakening",
    nextTitle: "The Inner Horizon",
    nextSlug: "the-inner-horizon",
  },
  {
    slug: "the-inner-horizon",
    name: "The Inner Horizon",
    badge: "Spiritual Exploration",
    tagline: "Journey to the edge of the self through sacred ceremony and spirit-led exploration.",
    date: "November 2–7, 2025",
    time: "9:30 AM",
    location: "Sedona, USA",
    heroImg: imgCard6,
    prevTitle: "Winter of Presence",
    prevSlug: "winter-of-presence",
  },
];

// ─── Arrow SVG data ───────────────────────────────────────────────────────────
const ARROW_RIGHT = svgPaths.pb429800;
const ARROW_LEFT  = svgPaths.p37389300;

// ─── Page ─────────────────────────────────────────────────────────────────────
// "September 18–24, 2025" / "December 12–16, 2025" → ISO start/end dates for schema.org.
const MONTHS = ["january","february","march","april","may","june","july","august","september","october","november","december"];
function parseDateRange(label: string): { startDate?: string; endDate?: string } {
  const m = label.match(/([A-Za-z]+)\s+(\d{1,2})\s*[–-]\s*(?:([A-Za-z]+)\s+)?(\d{1,2}),\s*(\d{4})/);
  if (!m) return {};
  const m1 = MONTHS.indexOf(m[1].toLowerCase());
  const m2 = m[3] ? MONTHS.indexOf(m[3].toLowerCase()) : m1;
  if (m1 < 0 || m2 < 0) return {};
  const pad = (n: number) => String(n).padStart(2, "0");
  return { startDate: `${m[5]}-${pad(m1 + 1)}-${pad(+m[2])}`, endDate: `${m[5]}-${pad(m2 + 1)}-${pad(+m[4])}` };
}

// ── Content source: Sanity when published, otherwise the built-in ALL_RETREATS ──
const HERO_FALLBACKS = [imgCard1, imgCard2, imgCard3, imgCard4, imgCard5, imgCard6];

function useRetreatList(): RetreatData[] {
  const { retreats } = useCms();
  return useMemo(() => {
    if (!retreats) return ALL_RETREATS;
    return retreats.map((r, i) => ({
      ...r,
      heroImg: r.heroImg ?? HERO_FALLBACKS[i % HERO_FALLBACKS.length],
      // Previous / next links follow the "Display order" set in Sanity.
      prevTitle: retreats[i - 1]?.name, prevSlug: retreats[i - 1]?.slug,
      nextTitle: retreats[i + 1]?.name, nextSlug: retreats[i + 1]?.slug,
    }));
  }, [retreats]);
}

export default function RetreatDetailPage() {
  const { slug } = useParams();
  const retreats = useRetreatList();
  // Unknown slug → real 404 (prevents "soft 404" duplicate pages in Google).
  if (!retreats.some((r) => r.slug === slug)) return <NotFoundPage />;
  return <RetreatDetail key={slug} slug={slug!} retreats={retreats} />;
}

function RetreatDetail({ slug, retreats }: { slug: string; retreats: RetreatData[] }) {
  const navigate = useNavigate();
  const idx     = retreats.findIndex((r) => r.slug === slug);
  const retreat = retreats[idx >= 0 ? idx : 0];
  const [sending, setSending] = useState(false);
  const [sendError, setSendError] = useState<string | null>(null);

  usePageMeta({
    title: retreat.seo?.metaTitle || `${retreat.name} Retreat — ${retreat.badge} | Shiva Yoga Niketan`,
    description: retreat.seo?.metaDescription || `${retreat.name}: a ${retreat.badge.toLowerCase()} retreat, ${retreat.date} in ${retreat.location}. See what's included, the daily rhythm and how to book your place.`,
  });
  // Event rich-result schema. startDate is parsed from the display date when possible.
  useJsonLd("syn-retreat-schema", {
    "@context": "https://schema.org",
    "@type": "Event",
    name: `${retreat.name} — ${retreat.badge} Retreat`,
    description: retreat.tagline,
    eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
    eventStatus: "https://schema.org/EventScheduled",
    ...(retreat.startDate ? { startDate: retreat.startDate, endDate: retreat.endDate ?? retreat.startDate } : parseDateRange(retreat.date)),
    location: { "@type": "Place", name: retreat.location, address: retreat.location },
    organizer: { "@type": "Organization", name: SITE.name, url: SITE.url },
    url: absUrl(`/retreats/${retreat.slug}`),
  });

  const [form, setForm] = useState({ name: "", phone: "", email: "", retreat: "", date: "", time: "" });

  const onBook = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!form.name.trim() || !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(form.email)) {
      setSendError("Please enter your name and a valid email address.");
      return;
    }
    const bot = (e.currentTarget.elements.namedItem("botcheck") as HTMLInputElement | null)?.checked;
    setSending(true); setSendError(null);
    const res = await submitForm("Retreat booking", { ...form, retreat: form.retreat || retreat.slug, botcheck: bot });
    setSending(false);
    if (res.ok) navigate("/thank-you"); else setSendError(res.error);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  return (
    <div className="w-full">

      {/* ── Hero ── */}
      <section className="px-4 sm:px-6 lg:px-10 pt-6 sm:pt-8 lg:pt-10">
        <div className="relative rounded-[16px] lg:rounded-[20px] overflow-hidden min-h-[300px] lg:min-h-[520px]">
          {/* Gradient texture bg */}
          <div className="absolute inset-0">
            <img loading="eager" decoding="async"
              src={imgTexture}
              alt=""
              className="absolute w-full h-[147%] max-w-none opacity-70"
              style={{ top: "-11%" }}
            />
          </div>

          {/* Content row */}
          <div className="relative flex flex-col md:flex-row items-start md:items-center gap-8 px-8 sm:px-12 lg:px-[120px] xl:px-[160px] pt-12 lg:pt-[60px] pb-10 lg:pb-[60px] z-10">

            {/* Left: text */}
            <div className="flex-1 flex flex-col gap-6 lg:gap-[40px]">
              {/* Badge */}
              <div className="self-start bg-[#c3dbc5] rounded-full px-4 py-1">
                <span className="font-['Lato:SemiBold',sans-serif] text-[#151515] text-[12px] tracking-[1px] uppercase">
                  {retreat.badge}
                </span>
              </div>

              {/* Title */}
              <h1 className="font-['Marcellus:Regular',sans-serif] text-[#151515] text-[44px] sm:text-[60px] lg:text-[80px] xl:text-[90px] tracking-[-3px] lg:tracking-[-5px] leading-none">
                {retreat.name}
              </h1>

              {/* Tagline */}
              <p className="font-['Lato:Regular',sans-serif] text-[#434a4a] text-[16px] lg:text-[20px] leading-[1.6] max-w-[500px]">
                {retreat.tagline}
              </p>

              {/* Date & location bar */}
              <div className="flex flex-wrap items-center gap-6">
                <div className="flex items-center gap-2">
                  {/* Clock icon */}
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <path d={svgPaths.p28738200} fill="#074240" />
                    <path d={svgPaths.p2a755e80} fill="#074240" />
                  </svg>
                  <span className="font-['Lato:SemiBold',sans-serif] text-[#151515] text-[13px] lg:text-[14px] tracking-[1px] uppercase">
                    {retreat.date} — {retreat.time}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  {/* Location icon */}
                  <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                    <path d={svgPaths.p1d482000} fill="#074240" />
                    <path d={svgPaths.p2b03200} fill="#074240" />
                  </svg>
                  <span className="font-['Lato:Medium',sans-serif] text-[#151515] text-[15px] lg:text-[16px]">
                    {retreat.location}
                  </span>
                </div>
              </div>
            </div>

            {/* Right: portrait image — rounded pill shape */}
            <div
              className="hidden md:block relative shrink-0 w-[300px] lg:w-[380px] xl:w-[440px]"
              style={{ height: "520px" }}
            >
              <div
                className="absolute inset-0 overflow-hidden"
                style={{ borderRadius: "220px 220px 20px 20px" }}
              >
                <img {...LCP} loading="eager" decoding="async"
                  src={retreat.heroImg}
                  alt={retreat.name}
                  className="absolute inset-0 w-full h-full object-cover object-top"
                />
                <img loading="eager" decoding="async"
                  src={imgTexture}
                  alt=""
                  className="absolute inset-0 w-full h-full object-cover mix-blend-lighten opacity-15 pointer-events-none"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Body text ── */}
      <section className="px-4 sm:px-6 lg:px-10 py-10 sm:py-14 lg:py-[80px]">
        <div className="max-w-[1280px] mx-auto flex flex-col gap-6 lg:gap-[30px]">
          {retreat.description ? (
            <RichText value={retreat.description} className="flex flex-col gap-6 lg:gap-[30px]" />
          ) : (
            <>
            <p className="font-['Lato:Regular',sans-serif] text-[#434a4a] text-[15px] lg:text-[18px] leading-[1.8]">
              {retreat.name} is a {retreat.badge.toLowerCase()} retreat created for anyone who needs to step away from the noise and return to themselves. Over the course of the retreat you will follow a gentle daily rhythm of asana, pranayama and guided meditation, led by experienced teachers from {SITE.name} who have trained in the traditional lineages of Rishikesh.
            </p>
            <p className="font-['Lato:Regular',sans-serif] text-[#434a4a] text-[15px] lg:text-[18px] leading-[1.8]">
              Each day begins before sunrise with breathwork and a slow, grounding practice, followed by a nourishing sattvic breakfast. Late mornings are for workshops on yoga philosophy, alignment and mindful living; afternoons are left open for rest, journaling, nature walks or one-to-one time with your teachers. Evenings close with restorative yoga, yoga nidra or a candle-lit meditation.
            </p>
            <p className="font-['Lato:Regular',sans-serif] text-[#434a4a] text-[15px] lg:text-[18px] leading-[1.8]">
              No previous experience is required — every session is offered with variations so beginners and seasoned practitioners can practise side by side. Spaces are deliberately limited to keep groups small and personal. If you have questions about the programme, accommodation or travel, call us on <a href={`tel:${SITE.phone}`} className="text-[#074240] underline">{SITE.phoneDisplay}</a> or <Link to="/contact" className="text-[#074240] underline">send us a message</Link>.
            </p>
            </>
          )}
        </div>
      </section>

      {/* ── Details / Organizer / Venue ── */}
      <section className="px-4 sm:px-6 lg:px-10 pb-10 sm:pb-14 lg:pb-[80px]">
        <div className="max-w-[1280px] mx-auto bg-white rounded-[20px] p-8 sm:p-10 lg:p-[60px] flex flex-col lg:flex-row gap-10 lg:gap-[40px]">

          {/* Details */}
          <div className="flex-1 flex flex-col gap-7 lg:gap-[30px]">
            <h3 className="font-['Marcellus:Regular',sans-serif] text-[#151515] text-[28px] lg:text-[32px] tracking-[-1px]">Details</h3>
            <div className="flex flex-col gap-5">
              {[
                { label: "Date", value: retreat.date },
                { label: "Time", value: retreat.time },
                { label: "Cost", value: retreat.price || "On request" },
              ].map((item) => (
                <div key={item.label} className="flex flex-col gap-[7px]">
                  <span className="font-['Lato:SemiBold',sans-serif] text-[#151515] text-[12px] tracking-[1px] uppercase">{item.label}:</span>
                  <span className="font-['Lato:Regular',sans-serif] text-[#434a4a] text-[16px] lg:text-[18px] leading-[1.6]">{item.value}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Organizer */}
          <div className="flex-1 flex flex-col gap-7 lg:gap-[30px]">
            <h3 className="font-['Marcellus:Regular',sans-serif] text-[#151515] text-[28px] lg:text-[32px] tracking-[-1px]">Organizer</h3>
            <div className="flex flex-col gap-5">
              <span className="font-['Lato:Regular',sans-serif] text-[#434a4a] text-[16px] lg:text-[18px]">{retreat.organizer || SITE.name}</span>
              {[
                { label: "Phone", value: SITE.phoneDisplay },
                { label: "Email", value: SITE.email },
                { label: "Organizer Website", value: SITE.url.replace(/^https?:\/\//, "") },
              ].map((item) => (
                <div key={item.label} className="flex flex-col gap-[7px]">
                  <span className="font-['Lato:SemiBold',sans-serif] text-[#151515] text-[12px] tracking-[1px] uppercase">{item.label}:</span>
                  <span className="font-['Lato:Regular',sans-serif] text-[#434a4a] text-[16px] lg:text-[18px] leading-[1.6]">{item.value}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Venue */}
          <div className="flex-1 flex flex-col gap-7 lg:gap-[30px]">
            <h3 className="font-['Marcellus:Regular',sans-serif] text-[#151515] text-[28px] lg:text-[32px] tracking-[-1px]">Venue</h3>
            <div className="flex flex-col gap-5">
              <div className="flex flex-col gap-[7px]">
                <span className="font-['Lato:Regular',sans-serif] text-[#434a4a] text-[16px] lg:text-[18px]">{retreat.venueName || retreat.location}</span>
                <span className="font-['Lato:Regular',sans-serif] text-[#434a4a] text-[16px] lg:text-[18px] leading-[1.6] whitespace-pre-line">
                  {retreat.venueAddress || "Full venue address is shared on booking."}<br />
                  <a href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(retreat.venueAddress || retreat.location)}`} target="_blank" rel="noopener noreferrer" className="text-[#074240] underline">+ Google Map</a>
                </span>
              </div>
              {[
                { label: "Phone", value: SITE.phoneDisplay },
                { label: "Bookings", value: SITE.email },
              ].map((item) => (
                <div key={item.label} className="flex flex-col gap-[7px]">
                  <span className="font-['Lato:SemiBold',sans-serif] text-[#151515] text-[12px] tracking-[1px] uppercase">{item.label}:</span>
                  <span className="font-['Lato:Regular',sans-serif] text-[#434a4a] text-[16px] lg:text-[18px]">{item.value}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Map image */}
          <div className="hidden lg:block relative rounded-[16px] lg:rounded-[20px] overflow-hidden w-[280px] xl:w-[320px] shrink-0 min-h-[200px]">
            <img
              src={imgMap}
              alt="Venue map"
              loading="lazy"
              decoding="async"
              className="absolute inset-0 w-full h-full object-cover"
            />
          </div>
        </div>
      </section>

      {/* ── Book Your Spot ── */}
      <section className="px-4 sm:px-6 lg:px-10 pb-10 sm:pb-14 lg:pb-[80px]">
        <div className="max-w-[1280px] mx-auto flex flex-col lg:flex-row items-center gap-10 lg:gap-[80px] overflow-hidden">

          {/* Left: portrait with rounded top */}
          <div
            className="hidden lg:block relative shrink-0 w-[340px] xl:w-[420px]"
            style={{ height: "600px" }}
          >
            <div
              className="absolute inset-0 overflow-hidden"
              style={{ borderRadius: "300px 300px 20px 20px" }}
            >
              <img
                src={imgBooking}
                alt="Book your spot"
                loading="lazy"
                decoding="async"
                className="absolute inset-0 w-full h-full object-cover object-top"
              />
              <img loading="lazy" decoding="async"
                src={imgTexture}
                alt=""
                className="absolute inset-0 w-full h-full object-cover mix-blend-lighten opacity-15 pointer-events-none"
              />
            </div>
          </div>

          {/* Right: form */}
          <div className="flex-1 flex flex-col gap-8 lg:gap-[50px]">
            {/* Heading */}
            <div className="flex flex-col gap-5 lg:gap-[50px]">
              <h2 className="font-['Marcellus:Regular',sans-serif] text-[#151515] text-[40px] sm:text-[54px] lg:text-[60px] tracking-[-2px] leading-tight text-center lg:text-left">
                Book Your{" "}
                <span className="font-['Playfair_Display:Italic',sans-serif] italic text-[#074240]">Spot</span>
              </h2>
              <p className="font-['Lato:Regular',sans-serif] text-[#434a4a] text-[16px] lg:text-[18px] leading-[1.7] text-center lg:text-left">
                Reserve your place on {retreat.name}. Leave your details and our team will confirm availability and send you everything you need to know.
              </p>
            </div>

            {/* Form fields */}
            <form onSubmit={onBook} noValidate className="flex flex-col gap-4">
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="Your Name"
                className="w-full bg-white rounded-[30px] px-6 py-4 font-['Lato:Regular',sans-serif] text-[#434a4a] text-[16px] outline-none placeholder:text-[#434a4a]"
              />
              <div className="flex gap-4">
                <input
                  type="tel"
                  name="phone"
                  value={form.phone}
                  onChange={handleChange}
                  placeholder="Your Phone"
                  className="flex-1 bg-white rounded-[30px] px-6 py-4 font-['Lato:Regular',sans-serif] text-[#434a4a] text-[16px] outline-none placeholder:text-[#434a4a] min-w-0"
                />
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="Your Email"
                  className="flex-1 bg-white rounded-[30px] px-6 py-4 font-['Lato:Regular',sans-serif] text-[#434a4a] text-[16px] outline-none placeholder:text-[#434a4a] min-w-0"
                />
              </div>
              <SelectMenu
                name="retreat"
                value={form.retreat}
                onChange={(v) => setForm((prev) => ({ ...prev, retreat: v }))}
                placeholder="Choose a Retreat"
                triggerClassName="bg-white rounded-[30px] px-6 py-4 font-['Lato:Regular',sans-serif] text-[16px]"
                options={retreats.map((r) => ({ label: r.name, value: r.slug }))}
              />
              <div className="flex gap-4">
                <input
                  type="date"
                  name="date"
                  value={form.date}
                  onChange={handleChange}
                  className="flex-1 bg-white rounded-[30px] px-6 py-4 font-['Lato:Regular',sans-serif] text-[#434a4a] text-[16px] outline-none min-w-0"
                />
                <input
                  type="time"
                  name="time"
                  value={form.time}
                  onChange={handleChange}
                  className="flex-1 bg-white rounded-[30px] px-6 py-4 font-['Lato:Regular',sans-serif] text-[#434a4a] text-[16px] outline-none min-w-0"
                />
              </div>
              <Honeypot />
              <FormError message={sendError} />
              <button type="submit" disabled={sending} className="w-full bg-[#c3dbc5] rounded-[30px] py-4 font-['Lato:Medium',sans-serif] text-[#151515] text-[16px] hover:opacity-90 transition-opacity disabled:opacity-60">
                {sending ? "Sending…" : "Book Your Spot"}
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* ── Prev / Next navigation ── */}
      <section className="px-4 sm:px-6 lg:px-10 pb-12 lg:pb-16">
        <div className="max-w-[1280px] mx-auto flex items-center justify-between gap-6">
          {/* Prev */}
          {retreat.prevSlug ? (
            <Link
              to={`/retreats/${retreat.prevSlug}`}
              className="flex items-center gap-5 group"
            >
              <div className="w-[50px] h-[50px] rounded-full bg-[#c3dbc5] flex items-center justify-center shrink-0 rotate-180 group-hover:bg-[#074240] transition-colors">
                <svg width="16" height="16" viewBox="0 0 50 50" fill="none">
                  <path d={ARROW_RIGHT} fill="#074240" />
                </svg>
              </div>
              <span className="font-['Marcellus:Regular',sans-serif] text-[#151515] text-[16px] lg:text-[24px] group-hover:text-[#074240] transition-colors">
                {retreat.prevTitle}
              </span>
            </Link>
          ) : (
            <div />
          )}

          {/* Next */}
          {retreat.nextSlug ? (
            <Link
              to={`/retreats/${retreat.nextSlug}`}
              className="flex items-center gap-5 group"
            >
              <span className="font-['Marcellus:Regular',sans-serif] text-[#151515] text-[16px] lg:text-[24px] group-hover:text-[#074240] transition-colors text-right">
                {retreat.nextTitle}
              </span>
              <div className="w-[50px] h-[50px] rounded-full bg-[#c3dbc5] flex items-center justify-center shrink-0 group-hover:bg-[#074240] transition-colors">
                <svg width="16" height="16" viewBox="0 0 50 50" fill="none">
                  <path d={ARROW_RIGHT} fill="#074240" />
                </svg>
              </div>
            </Link>
          ) : (
            <div />
          )}
        </div>
      </section>

    </div>
  );
}