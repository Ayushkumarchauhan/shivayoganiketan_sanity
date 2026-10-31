import { Link } from "react-router";
import { useCms } from "../cms/useCms";
import svgPaths from "../../imports/Retreats/svg-jfxskhtkju";
import { placeholder, LCP } from "./imagePlaceholder";

// ─── Images ──────────────────────────────────────────────────────────────────
const imgTexture = placeholder("imgTexture");
const imgHeroRight = placeholder("imgHeroRight");
const imgCard1 = placeholder("imgCard1");
const imgCard2 = placeholder("imgCard2");
const imgCard3 = placeholder("imgCard3");
const imgCard4 = placeholder("imgCard4");
const imgCard5 = placeholder("imgCard5");
const imgCard6 = placeholder("imgCard6");

// ─── Retreat data ─────────────────────────────────────────────────────────────
interface Retreat {
  slug: string;
  name: string;
  date: string;
  location: string;
  category: string;
  img: string;
}

const CARD_FALLBACKS = [imgCard1, imgCard2, imgCard3, imgCard4, imgCard5, imgCard6];

// Built-in content — shown when Sanity has no published retreats.
const RETREATS: Retreat[] = [
  {
    slug: "roots-of-stillness",
    name: "Roots of Stillness",
    date: "September 18–24, 2025",
    location: "Tuscany, Italy",
    category: "Yoga & Meditation",
    img: imgCard1,
  },
  {
    slug: "sacred-flow",
    name: "Sacred Flow",
    date: "October 10–17, 2025",
    location: "Bali, Indonesia",
    category: "Intuitive Movement",
    img: imgCard2,
  },
  {
    slug: "awaken-in-the-wild",
    name: "Awaken in the Wild",
    date: "January 5–12, 2026",
    location: "Costa Rica",
    category: "Meditation & Clean Eating",
    img: imgCard3,
  },
  {
    slug: "paths-of-awakening",
    name: "Paths of Awakening",
    date: "January 5–12, 2026",
    location: "Costa Rica",
    category: "Meditation & Clean Eating",
    img: imgCard4,
  },
  {
    slug: "winter-of-presence",
    name: "Winter of Presence",
    date: "December 12–16, 2025",
    location: "Lapland, Finland",
    category: "Yin Yoga & Mindfulness",
    img: imgCard5,
  },
  {
    slug: "the-inner-horizon",
    name: "The Inner Horizon",
    date: "November 2–7, 2025",
    location: "Sedona, USA",
    category: "Spiritual Exploration",
    img: imgCard6,
  },
];

// ─── Inline SVG path for the decorative flower icon ───────────────────────────
const FLOWER_PATH = svgPaths.p5631b00;

// ─── Retreat card ─────────────────────────────────────────────────────────────
function RetreatCard({ retreat }: { retreat: Retreat }) {
  return (
    <Link
      to={`/retreats/${retreat.slug}`}
      className="relative rounded-[20px] overflow-hidden flex flex-col h-[320px] sm:h-[400px] lg:h-[563px] group"
    >
      {/* Background image */}
      <img
        src={retreat.img}
        alt={retreat.name}
        loading="lazy"
        decoding="async"
        className="absolute inset-0 w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-500"
      />

      {/* Gradient overlay */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage:
            "linear-gradient(180deg, rgba(0,0,0,0.30) 10%, rgba(0,0,0,0) 37%, rgba(0,0,0,0) 67%, rgba(0,0,0,0.30) 89%)",
        }}
      />

      {/* Content */}
      <div className="relative flex flex-col items-start justify-between p-6 lg:p-[30px] h-full">
        {/* Top: name with flower icon */}
        <div className="flex items-center gap-2">
          <svg width="20" height="20" viewBox="0 0 25 25" fill="none" className="shrink-0">
            <path clipRule="evenodd" d={FLOWER_PATH} fill="#FCFF91" fillRule="evenodd" />
          </svg>
          <span className="font-['Marcellus:Regular',sans-serif] text-[#fcff91] text-[22px] sm:text-[28px] lg:text-[32px] tracking-[-1px] leading-tight">
            {retreat.name}
          </span>
        </div>

        {/* Bottom: tags */}
        <div className="flex flex-col items-end gap-2 self-end">
          {[retreat.date, retreat.location, retreat.category].map((tag) => (
            <div
              key={tag}
              className="backdrop-blur-[2px] bg-white/20 border border-[#fcff91] rounded-full px-4 py-[5px]"
            >
              <span className="font-['Lato:SemiBold',sans-serif] text-[#fcff91] text-[11px] sm:text-[12px] tracking-[1px] uppercase">
                {tag}
              </span>
            </div>
          ))}
        </div>
      </div>
    </Link>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function RetreatsPage() {
  // Retreat cards come from Sanity when published; otherwise the built-in list below.
  const { retreats } = useCms();
  const list: Retreat[] = retreats
    ? retreats.map((r, i) => ({ slug: r.slug, name: r.name, date: r.date, location: r.location, category: r.badge, img: r.heroImg ?? CARD_FALLBACKS[i % CARD_FALLBACKS.length] }))
    : RETREATS;
  return (
    <div className="w-full">

      {/* ── Hero ── */}
      <section className="px-4 sm:px-6 lg:px-10 pt-6 sm:pt-8 lg:pt-10">
        <div className="relative rounded-[16px] lg:rounded-[20px] overflow-hidden flex flex-col md:flex-row min-h-[320px] lg:min-h-[440px]">
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
              Our Retreats
            </h1>
            <p className="font-['Lato:Regular',sans-serif] text-[#151515] text-[16px] lg:text-[18px] leading-[1.6] max-w-[420px]">
              Restorative yoga and meditation retreats designed to slow you down — daily practice, breathwork, nourishing food and time in nature.
            </p>
          </div>

          {/* Right: hero photo */}
          <div className="relative hidden md:block shrink-0 w-[48%] lg:w-[50%] min-h-[320px] lg:min-h-[440px] overflow-hidden">
            <img {...LCP} loading="eager" decoding="async"
              src={imgHeroRight}
              alt="Our Retreats"
              className="absolute inset-0 w-full h-full object-cover object-top"
            />
            <img loading="eager" decoding="async"
              src={imgTexture}
              alt=""
              className="absolute inset-0 w-full h-full object-cover mix-blend-lighten opacity-10 pointer-events-none"
            />
          </div>
        </div>
      </section>

      {/* ── Retreat grid ── */}
      <section className="px-4 sm:px-6 lg:px-10 py-10 sm:py-14 lg:py-[80px]">
        <div className="max-w-[1280px] mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-[30px]">
          {list.map((retreat) => (
            <RetreatCard key={retreat.slug} retreat={retreat} />
          ))}
        </div>
      </section>

    </div>
  );
}