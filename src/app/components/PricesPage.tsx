import { useState } from "react";
import { Link } from "react-router";
import { useCms } from "../cms/useCms";
import svgPaths from "../../imports/Prices/svg-gw9r9i3rc1";
import { placeholder, LCP } from "./imagePlaceholder";

// ─── Images ──────────────────────────────────────────────────────────────────
const imgTexture = placeholder("imgTexture");
const imgHeroRight = placeholder("imgHeroRight");
const imgProgram1 = placeholder("imgProgram1");
const imgProgram2 = placeholder("imgProgram2");
const imgProgram3 = placeholder("imgProgram3");

// ─── Pricing data ─────────────────────────────────────────────────────────────
interface PricingRow {
  label: string;
  regular: string;
  earlyBook: string;
}

interface PricingSection {
  roomType: string;
  rows: PricingRow[];
}

interface PricingCard {
  id: string;
  title: string;
  description: string;
  highlighted: boolean;
  sections: PricingSection[];
  detailSlug: string;
}

const PRICING_CARDS: PricingCard[] = [
  {
    id: "3-day-reset",
    title: "3-Day Reset",
    description: "A gentle weekend to unplug and begin again.",
    highlighted: true,
    detailSlug: "3-day-reset",
    sections: [
      {
        roomType: "Single Room",
        rows: [
          { label: "3 Days", regular: "$420", earlyBook: "" },
          { label: "3 Days (Early Booking)", regular: "$380", earlyBook: "" },
        ],
      },
      {
        roomType: "Shared Room",
        rows: [
          { label: "3 Days", regular: "$360", earlyBook: "" },
          { label: "3 Days (Early Booking)", regular: "$330", earlyBook: "" },
        ],
      },
    ],
  },
  {
    id: "7-day-immersion",
    title: "7-Day Immersion",
    description: "A full week of deep rest, connection, and healing practices.",
    highlighted: false,
    detailSlug: "7-day-immersion",
    sections: [
      {
        roomType: "Single Room",
        rows: [
          { label: "7 Days", regular: "$890", earlyBook: "" },
          { label: "7 Days (Early Booking)", regular: "$820", earlyBook: "" },
        ],
      },
      {
        roomType: "Shared Room",
        rows: [
          { label: "7 Days", regular: "$790", earlyBook: "" },
          { label: "7 Days (Early Booking)", regular: "$730", earlyBook: "" },
        ],
      },
    ],
  },
  {
    id: "couples-package",
    title: "Couples Package",
    description: "Shared accommodation and dual participation for two.",
    highlighted: false,
    detailSlug: "couples-package",
    sections: [
      {
        roomType: "Standard Room",
        rows: [
          { label: "7 Days", regular: "$1,600", earlyBook: "" },
          { label: "7 Days (Early Booking)", regular: "$1,480", earlyBook: "" },
        ],
      },
      {
        roomType: "Premium Room",
        rows: [
          { label: "7 Days", regular: "$1,800", earlyBook: "" },
          { label: "7 Days (Early Booking)", regular: "$1,650", earlyBook: "" },
        ],
      },
    ],
  },
  {
    id: "weekend-reset",
    title: "Weekend Reset",
    description: "A full week of deep rest, connection, and healing practices.",
    highlighted: false,
    detailSlug: "weekend-reset",
    sections: [
      {
        roomType: "Single Room",
        rows: [
          { label: "7 Days", regular: "$890", earlyBook: "" },
          { label: "7 Days (Early Booking)", regular: "$820", earlyBook: "" },
        ],
      },
      {
        roomType: "Shared Room",
        rows: [
          { label: "7 Days", regular: "$790", earlyBook: "" },
          { label: "7 Days (Early Booking)", regular: "$750", earlyBook: "" },
        ],
      },
    ],
  },
  {
    id: "royal-renewal",
    title: "Royal Renewal",
    description: "Shared accommodation and dual participation for her.",
    highlighted: false,
    detailSlug: "royal-renewal",
    sections: [
      {
        roomType: "Standard Room",
        rows: [
          { label: "7 Days", regular: "$1,600", earlyBook: "" },
          { label: "7 Days (Early Booking)", regular: "$1,480", earlyBook: "" },
        ],
      },
      {
        roomType: "Premium Room",
        rows: [
          { label: "7 Days", regular: "$1,800", earlyBook: "" },
          { label: "7 Days (Early Booking)", regular: "$1,650", earlyBook: "" },
        ],
      },
    ],
  },
  {
    id: "zen-together",
    title: "Zen Together",
    description: "A full week of deep rest, connection, and healing practices.",
    highlighted: false,
    detailSlug: "zen-together",
    sections: [
      {
        roomType: "Single Room",
        rows: [
          { label: "7 Days", regular: "$845", earlyBook: "" },
          { label: "7 Days (Early Booking)", regular: "$780", earlyBook: "" },
        ],
      },
      {
        roomType: "Shared Room",
        rows: [
          { label: "7 Days", regular: "$745", earlyBook: "" },
          { label: "7 Days (Early Booking)", regular: "$690", earlyBook: "" },
        ],
      },
    ],
  },
];

// ─── Inline SVG paths ─────────────────────────────────────────────────────────
// Flower icon (for pricing card header decoration)
const FLOWER_PATH  = svgPaths.p5631b00;
const ARROW_PATH   = svgPaths.p29f60cc0; // diagonal arrow for "View Details"
const ARROW_LEFT   = svgPaths.p1c4da680; // arrow left for carousel (mapped from carousel arrow in svg file)
const ARROW_RIGHT  = svgPaths.p1c4da680; // we'll use same path but mirror

// Program card flower icon path (25x25 version)
const PROGRAM_FLOWER = svgPaths.p5631b00;

// ─── Program card (for "See Our Programs" section) ────────────────────────────
interface ProgramCardData {
  name: string;
  date: string;
  location: string;
  category: string;
  img: string;
  slug: string;
}

const PROGRAM_FALLBACKS = [imgProgram1, imgProgram2, imgProgram3];

const PROGRAMS: ProgramCardData[] = [
  {
    name: "Roots of Stillness",
    date: "September 18–24, 2025",
    location: "Tuscany, Italy",
    category: "Yoga & Meditation",
    img: imgProgram1,
    slug: "roots-of-stillness",
  },
  {
    name: "Sacred Flow",
    date: "October 10–17, 2025",
    location: "Bali, Indonesia",
    category: "Intuitive Movement",
    img: imgProgram2,
    slug: "sacred-flow",
  },
  {
    name: "Awaken in the Wild",
    date: "January 5–12, 2026",
    location: "Costa Rica",
    category: "Meditation & Clean Eating",
    img: imgProgram3,
    slug: "awaken-in-the-wild",
  },
];

// ─── Pricing card component ───────────────────────────────────────────────────
function PricingCard({ card }: { card: PricingCard }) {
  const bg = card.highlighted ? "bg-[#c3dbc5]" : "bg-white";

  return (
    <div className={`${bg} rounded-[20px] overflow-hidden flex flex-col gap-8 lg:gap-[40px] p-8 lg:p-[50px]`}>
      {/* Header */}
      <div className="flex flex-col gap-3">
        <div className="flex items-start justify-between gap-4">
          <h3 className="font-['Marcellus:Regular',sans-serif] text-[#151515] text-[26px] lg:text-[32px] tracking-[-1px] leading-tight">
            {card.title}
          </h3>
          {/* Decorative icon */}
          <svg width="48" height="48" viewBox="0 0 48 48" fill="none" className="shrink-0 opacity-40">
            <circle cx="24" cy="24" r="22" stroke={card.highlighted ? "#074240" : "#c3dbc5"} strokeWidth="1.5" fill="none" />
            <path clipRule="evenodd" d={FLOWER_PATH} fill={card.highlighted ? "#074240" : "#c3dbc5"} fillRule="evenodd" transform="translate(11.5 11.5) scale(0.92)" />
          </svg>
        </div>
        <p className="font-['Lato:Regular',sans-serif] text-[#434a4a] text-[15px] lg:text-[18px] leading-[1.6]">
          {card.description}
        </p>
      </div>

      {/* Pricing sections */}
      {card.sections.map((section, si) => (
        <div key={si} className="flex flex-col gap-4">
          <p className="font-['Lato:SemiBold',sans-serif] text-[#074240] text-[12px] tracking-[1px] uppercase">
            {section.roomType}:
          </p>
          <div className="flex flex-col gap-3">
            {section.rows.map((row, ri) => (
              <div key={ri}>
                <div className="flex items-center justify-between">
                  <span className="font-['Marcellus:Regular',sans-serif] text-[#151515] text-[15px] lg:text-[16px]">
                    {row.label}
                  </span>
                  <span className="font-['Marcellus:Regular',sans-serif] text-[#151515] text-[15px] lg:text-[16px]">
                    {row.regular}
                  </span>
                </div>
                {ri < section.rows.length - 1 && (
                  <div className={`mt-3 w-full h-px ${card.highlighted ? "bg-white/40" : "bg-[#8b8a82]/30"}`} />
                )}
              </div>
            ))}
          </div>
        </div>
      ))}

      {/* View Details button */}
      <Link
        to={`/retreats/${card.detailSlug}`}
        className="self-start flex items-center gap-2 border border-[#151515] rounded-full px-7 py-4 hover:bg-[#151515] hover:text-white transition-colors group"
      >
        <span className="font-['Lato:Medium',sans-serif] text-[#1e1b1b] text-[15px] lg:text-[16px] group-hover:text-white transition-colors">
          View Details
        </span>
        <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
          <path d={ARROW_PATH} className="group-hover:fill-white transition-colors" fill="#151515" />
        </svg>
      </Link>
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function PricesPage() {
  // Retreat carousel: Sanity retreats when published, else the built-in three.
  const { retreats } = useCms();
  const programs: ProgramCardData[] = retreats
    ? retreats.map((r, i) => ({ name: r.name, date: r.date, location: r.location, category: r.badge, img: r.heroImg ?? PROGRAM_FALLBACKS[i % PROGRAM_FALLBACKS.length], slug: r.slug }))
    : PROGRAMS;
  const [carouselIdx, setCarouselIdx] = useState(0);
  const visiblePrograms = programs.slice(carouselIdx, carouselIdx + 3);

  return (
    <div className="w-full">

      {/* ── Hero ── */}
      <section className="px-4 sm:px-6 lg:px-10 pt-6 sm:pt-8 lg:pt-10">
        <div className="relative rounded-[16px] lg:rounded-[20px] overflow-hidden flex flex-col md:flex-row min-h-[300px] lg:min-h-[440px]">
          {/* Gradient texture background */}
          <div className="absolute inset-0 pointer-events-none">
            <img loading="eager" decoding="async"
              src={imgTexture}
              alt=""
              className="absolute w-[191%] h-[139%] max-w-none"
              style={{ left: "-36%", top: "-13%" }}
            />
          </div>

          {/* Left: text */}
          <div className="relative flex-1 flex flex-col justify-center px-8 sm:px-12 lg:px-[90px] xl:px-[120px] py-10 lg:py-[60px] gap-5 lg:gap-[30px] z-10">
            <h1 className="font-['Marcellus:Regular',sans-serif] text-[#074240] text-[48px] sm:text-[64px] lg:text-[80px] xl:text-[90px] tracking-[-3px] sm:tracking-[-4px] lg:tracking-[-5px] leading-none">
              Course Fees &amp; Pricing
            </h1>
            <p className="font-['Lato:Regular',sans-serif] text-[#151515] text-[16px] lg:text-[18px] leading-[1.6] max-w-[420px]">
              Clear, all-inclusive fees for our yoga teacher training courses and retreats in Rishikesh — tuition, accommodation and sattvic meals included.
            </p>
          </div>

          {/* Right: hero photo */}
          <div className="relative hidden md:block shrink-0 w-[48%] lg:w-[50%] min-h-[300px] lg:min-h-[440px] overflow-hidden">
            <img {...LCP} loading="eager" decoding="async"
              src={imgHeroRight}
              alt="Prices"
              className="absolute inset-0 w-full h-full object-cover object-center"
            />
            <img loading="eager" decoding="async"
              src={imgTexture}
              alt=""
              className="absolute inset-0 w-full h-full object-cover mix-blend-lighten opacity-10 pointer-events-none"
            />
          </div>
        </div>
      </section>

      {/* ── Pricing cards grid ── */}
      <section className="px-4 sm:px-6 lg:px-10 py-10 sm:py-14 lg:py-[80px]">
        <div className="max-w-[1280px] mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-[30px]">
          {PRICING_CARDS.map((card) => (
            <PricingCard key={card.id} card={card} />
          ))}
        </div>
      </section>

      {/* ── See Our Programs ── */}
      <section className="px-4 sm:px-6 lg:px-10 pb-14 lg:pb-[80px]">
        <div className="max-w-[1280px] mx-auto flex flex-col gap-6 lg:gap-[30px]">

          {/* Section header */}
          <div className="flex items-center justify-between">
            <h2 className="font-['Marcellus:Regular',sans-serif] text-[#151515] text-[28px] sm:text-[36px] lg:text-[40px] tracking-[-1px]">
              See Our Programs
            </h2>
            {/* Carousel arrows */}
            <div className="flex items-center gap-3">
              <button
                onClick={() => setCarouselIdx(Math.max(0, carouselIdx - 1))}
                disabled={carouselIdx === 0}
                className="w-[50px] h-[50px] rounded-full bg-[#c3dbc5] flex items-center justify-center hover:bg-[#074240] disabled:opacity-40 transition-colors group"
                aria-label="Previous"
              >
                <svg width="16" height="16" viewBox="0 0 50 50" fill="none" className="rotate-180">
                  <circle cx="25" cy="25" r="25" fill="transparent" />
                  <path d="M19 25H31M31 25L26 20M31 25L26 30" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <span className="sr-only">Previous</span>
              </button>
              <button
                onClick={() => setCarouselIdx(Math.min(programs.length - 3, carouselIdx + 1))}
                disabled={carouselIdx >= programs.length - 3}
                className="w-[50px] h-[50px] rounded-full bg-[#c3dbc5] flex items-center justify-center hover:bg-[#074240] disabled:opacity-40 transition-colors"
                aria-label="Next"
              >
                <svg width="16" height="16" viewBox="0 0 50 50" fill="none">
                  <circle cx="25" cy="25" r="25" fill="transparent" />
                  <path d="M19 25H31M31 25L26 20M31 25L26 30" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <span className="sr-only">Next</span>
              </button>
            </div>
          </div>

          {/* Program cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-[30px]">
            {programs.map((prog) => (
              <Link
                key={prog.slug}
                to={`/retreats/${prog.slug}`}
                className="relative rounded-[20px] overflow-hidden h-[300px] sm:h-[380px] lg:h-[420px] group block"
              >
                <img
                  src={prog.img}
                  alt={prog.name}
                  loading="lazy"
                  decoding="async"
                  className="absolute inset-0 w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-500"
                />
                <div
                  className="absolute inset-0"
                  style={{
                    backgroundImage:
                      "linear-gradient(180deg, rgba(0,0,0,0.30) 10%, rgba(0,0,0,0) 37%, rgba(0,0,0,0) 67%, rgba(0,0,0,0.30) 89%)",
                  }}
                />
                <div className="relative flex flex-col items-start justify-between p-6 lg:p-[30px] h-full">
                  <div className="flex items-center gap-2">
                    <svg width="20" height="20" viewBox="0 0 25 25" fill="none" className="shrink-0">
                      <path clipRule="evenodd" d={PROGRAM_FLOWER} fill="#FCFF91" fillRule="evenodd" />
                    </svg>
                    <span className="font-['Marcellus:Regular',sans-serif] text-[#fcff91] text-[22px] lg:text-[28px] tracking-[-1px] leading-tight">
                      {prog.name}
                    </span>
                  </div>
                  <div className="flex flex-col items-end gap-2 self-end">
                    {[prog.date, prog.location, prog.category].map((tag) => (
                      <div
                        key={tag}
                        className="backdrop-blur-[2px] bg-white/20 border border-[#fcff91] rounded-full px-4 py-[5px]"
                      >
                        <span className="font-['Lato:SemiBold',sans-serif] text-[#fcff91] text-[11px] tracking-[1px] uppercase">
                          {tag}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
}