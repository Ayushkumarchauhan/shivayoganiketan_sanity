import { Link } from "react-router";
import { useCms } from "../cms/useCms";
import svgPaths from "../../imports/svg-cgj6lsvvva";
import { placeholder, LCP } from "./imagePlaceholder";
const imgHeroBg = placeholder("imgHeroBg");
const imgHeroPhoto = placeholder("imgHeroPhoto");
const imgP2044 = placeholder("imgP2044");
const imgP2045 = placeholder("imgP2045");
const imgP2046 = placeholder("imgP2046");
const imgDiscountPhoto = placeholder("imgDiscountPhoto");

// ── Program icon types drawn from Figma SVG paths ───────────────────────────

function YogaIcon() {
  // Leaf/meditation icon from the programs
  return (
    <div className="w-[55px] h-[55px] shrink-0">
      <svg width="55" height="55" viewBox="0 0 60 56" fill="none">
        <path d={svgPaths.p2ed94080} stroke="white" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth="0.97" />
        <path d={svgPaths.p7ef7b00} stroke="white" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth="0.97" />
      </svg>
    </div>
  );
}

function BowlIcon() {
  // Sound bowl icon
  return (
    <div className="w-[60px] h-[56px] shrink-0">
      <svg width="61" height="58" viewBox="0 0 61.5 57.7" fill="none">
        <path d={svgPaths.p2abc2580} stroke="white" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth="1.5" />
        <path d={svgPaths.p28d35f00} stroke="white" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth="1.5" />
        <path d={svgPaths.p29cbeb00} stroke="white" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth="1.5" />
        <path d={svgPaths.pb4a3a80} stroke="white" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth="1.5" />
      </svg>
    </div>
  );
}

function MeditationIcon() {
  // Circular meditation / zen icon
  return (
    <div className="w-[60px] h-[60px] shrink-0">
      <svg width="60" height="60" viewBox="0 0 60 60" fill="none">
        <path d={svgPaths.p26185900} stroke="white" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth="1.5" />
        <path d={svgPaths.p1443ce00} stroke="white" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth="1.5" />
        <path d={svgPaths.p254260} stroke="white" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth="1.5" />
        <path d={svgPaths.p3b1ea480} stroke="white" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth="1.5" />
        <path d={svgPaths.p2c8e0a00} stroke="white" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth="1.5" />
        <path d={svgPaths.p3659dc00} stroke="white" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth="1.5" />
        <path d={svgPaths.p24f00cf0} stroke="white" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth="1.5" />
        <path d={svgPaths.p6c07180} stroke="white" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth="1.5" />
        <path d={svgPaths.p314a1b40} stroke="white" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth="1.5" />
        <path d={svgPaths.p2fb4e5c0} stroke="white" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth="1.5" />
        <path d={svgPaths.p6d6700} stroke="white" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth="1.5" />
        <path d={svgPaths.p14d22280} stroke="white" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth="1.5" />
      </svg>
    </div>
  );
}

function NatureIcon() {
  // Leaf wind icon from nature walks card
  return (
    <div className="w-[60px] h-[58px] shrink-0">
      <svg width="60" height="58" viewBox="0 0 60 60" fill="none">
        <path d={svgPaths.p35171480} clipRule="evenodd" fill="white" fillRule="evenodd" />
        <path d={svgPaths.peaca980} clipRule="evenodd" fill="white" fillRule="evenodd" />
        <path d={svgPaths.p2090e480} clipRule="evenodd" fill="white" fillRule="evenodd" />
      </svg>
    </div>
  );
}

// ── Photo program card (with image + yellow title) ───────────────────────────
interface PhotoCardProps {
  title: string;
  image: string;
  icon: React.ReactNode;
  description: string;
  slug: string;
}

function PhotoProgramCard({ title, image, icon, description, slug }: PhotoCardProps) {
  return (
    <div className="group flex-1 min-w-0 h-[300px] sm:h-[420px] lg:h-[550px] relative rounded-[20px] overflow-hidden cursor-pointer">
      {/* Background image */}
      <img loading="lazy" decoding="async" src={image} alt={title} className="absolute inset-0 w-full h-full object-cover rounded-[20px] transition-transform duration-500 group-hover:scale-105" />
      {/* Dark gradient overlay */}
      <div
        className="absolute inset-0 rounded-[20px]"
        style={{
          backgroundImage: "linear-gradient(rgba(0,0,0,0) 52%, rgba(0,0,0,0.5) 100%), linear-gradient(90deg, rgba(0,0,0,0.1) 0%, rgba(0,0,0,0.1) 100%)",
        }}
      />
      {/* Light overlay blend */}
      <img loading="lazy" decoding="async" src={imgHeroBg} alt="" className="absolute inset-0 w-full h-full object-cover mix-blend-lighten opacity-10 rounded-[20px]" />
      {/* Default content: icon top + yellow title bottom */}
      <div className="relative z-10 flex flex-col items-start justify-between w-full h-full p-5 sm:p-[30px] transition-opacity duration-300 group-hover:opacity-0">
        <div>{icon}</div>
        <p className="font-['Marcellus:Regular',sans-serif] text-[#fcff91] text-[20px] sm:text-[26px] lg:text-[32px] tracking-[-1px] leading-[1.3]">
          {title}
        </p>
      </div>
      {/* Hover overlay: sage-green panel slides up from bottom */}
      <div className="absolute inset-0 z-20 bg-[#c3dbc5] rounded-[20px] translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out overflow-hidden">
        {/* Subtle texture */}
        <img loading="lazy" decoding="async" src={imgHeroBg} alt="" className="absolute w-[200%] h-[140%] top-[-14%] left-[-36%] max-w-none object-cover opacity-100" />
        {/* Overlay content */}
        <div className="relative z-10 flex flex-col items-start justify-between w-full h-full p-5 sm:p-[30px]">
          <div className="flex flex-col gap-5 lg:gap-[30px]">
            <div className="opacity-0 -translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500 delay-150">
              {icon}
            </div>
            <div className="flex flex-col gap-4 lg:gap-6">
              <p className="font-['Marcellus:Regular',sans-serif] text-[#151515] text-[22px] sm:text-[26px] lg:text-[32px] tracking-[-1px] leading-[1.3] opacity-0 -translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500 delay-[175ms]">
                {title}
              </p>
              <p className="font-['Lato:Regular',sans-serif] text-[#151515] text-[13px] lg:text-[16px] leading-[1.7] opacity-0 translate-y-3 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500 delay-200">
                {description}
              </p>
            </div>
          </div>
          <Link
            to={`/programs/${slug}`}
            className="flex items-center gap-2 px-5 lg:px-7 py-3 lg:py-4 rounded-full border border-[#151515] hover:bg-[#151515] hover:text-white transition-colors [&>span]:text-[#1e1b1b] [&:hover>span]:text-white opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500 delay-[225ms]"
          >
            <span className="font-['Lato:Medium',sans-serif] text-[13px] lg:text-[16px] whitespace-nowrap">
              View Details
            </span>
            <svg width="10" height="10" viewBox="0 0 10 10" fill="none" className="shrink-0">
              <path d={svgPaths.p29f60cc0} fill="currentColor" />
            </svg>
          </Link>
        </div>
      </div>
    </div>
  );
}

// ── "Flipped" program card (sage green bg + text + button) ───────────────────
interface FlippedCardProps {
  title:       string;
  description: string;
  slug:        string;
}

function FlippedProgramCard({ title, description, slug }: FlippedCardProps) {
  return (
    <div className="flex-1 min-w-0 h-[300px] sm:h-[420px] lg:h-[550px] relative rounded-[20px] overflow-hidden shadow-[0px_5px_30px_0px_rgba(0,0,0,0.2)]">
      {/* Sage green background */}
      <div className="absolute inset-0 bg-[#c3dbc5] rounded-[20px]" />
      {/* Background texture */}
      <div className="absolute inset-0 overflow-hidden rounded-[20px]">
        <img src={imgHeroBg} alt="" loading="lazy" decoding="async" className="absolute w-[200%] h-[140%] top-[-14%] left-[-36%] max-w-none object-cover" />
      </div>
      {/* Content */}
      <div className="group relative z-10 flex flex-col items-start justify-between w-full h-full p-5 sm:p-[30px] cursor-pointer">
        <div className="flex flex-col gap-5 lg:gap-[30px]">
          <MeditationIcon />
          <div className="flex flex-col gap-4 lg:gap-6">
            <p className="font-['Marcellus:Regular',sans-serif] text-[#151515] text-[22px] sm:text-[26px] lg:text-[32px] tracking-[-1px] leading-[1.3]">
              {title}
            </p>
            <p className="font-['Lato:Regular',sans-serif] text-[#151515] text-[13px] lg:text-[16px] leading-[1.7] transition-all duration-500 ease-out opacity-0 translate-y-3 group-hover:opacity-100 group-hover:translate-y-0">
              {description}
            </p>
          </div>
        </div>
        <Link
          to={`/programs/${slug}`}
          className="flex items-center gap-2 px-5 lg:px-7 py-3 lg:py-4 rounded-full border border-[#151515] hover:bg-[#151515] hover:text-white transition-all duration-500 ease-out delay-75 opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 [&>span]:text-[#1e1b1b] [&:hover>span]:text-white"
        >
          <span className="font-['Lato:Medium',sans-serif] text-[13px] lg:text-[16px] whitespace-nowrap">
            View Details
          </span>
          <svg width="10" height="10" viewBox="0 0 10 10" fill="none" className="shrink-0">
            <path d={svgPaths.p29f60cc0} fill="currentColor" className="text-[#151515]" />
          </svg>
        </Link>
      </div>
    </div>
  );
}

// ── Discount / CTA section ───────────────────────────────────────────────────
function DiscountSection() {
  return (
    <section className="py-12 sm:py-16 lg:py-[80px] px-4 sm:px-6 lg:px-10">
      <div className="max-w-[1280px] mx-auto flex flex-col lg:flex-row items-center gap-10 lg:gap-[100px]">
        {/* Photo */}
        <div
          className="w-full lg:flex-1 h-[300px] sm:h-[400px] lg:h-[480px] rounded-[200px_20px_200px_20px] overflow-hidden shrink-0 relative"
        >
          <img
            src={imgDiscountPhoto}
            alt="Discount offer"
            loading="lazy"
            decoding="async"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 mix-blend-lighten opacity-10 overflow-hidden">
            <img loading="lazy" decoding="async" src={imgHeroBg} alt="" className="absolute w-[200%] h-full top-0 left-[-50%] max-w-none object-cover" />
          </div>
        </div>

        {/* Text + CTA */}
        <div className="w-full lg:flex-1 flex flex-col gap-8 lg:gap-10">
          <div className="flex flex-col gap-4 lg:gap-[30px]">
            <p className="font-['Lato:SemiBold',sans-serif] text-[#fae1fb] text-[11px] sm:text-[12px] tracking-[1px] uppercase">
              Free Consultation
            </p>
            <p className="font-['Marcellus:Regular',sans-serif] text-[#151515] text-[32px] sm:text-[42px] lg:text-[60px] tracking-[-1px] lg:tracking-[-2px] leading-[1.1]">
              Get a special 50% discount and unleash your health.
            </p>
            <p className="font-['Lato:Regular',sans-serif] text-[#434a4a] text-[14px] lg:text-[18px] leading-[1.7]">
              Dr. Simmons and her team of Oral Surgeons and Periodontists are committed to providing you with the highest quality of implants and crowns.
            </p>
          </div>
          <Link to="/prices" className="inline-flex items-center justify-center self-start bg-[#c3dbc5] rounded-full px-6 lg:px-8 py-3 lg:py-[18px] font-['Lato:Medium',sans-serif] text-[#151515] text-[14px] lg:text-[16px] hover:opacity-90 transition-opacity">
            Find Out More
          </Link>
        </div>
      </div>
    </section>
  );
}

// ── Page ─────────────────────────────────────────────────────────────────────
// ── Built-in cards (shown when Sanity has no published programs; also used to seed Sanity) ──
export const PROGRAM_CARDS = [
  { slug: "yoga-course-for-beginners", title: "Yoga Course For Beginners", image: imgP2044,
    description: "A gentle, welcoming introduction to yoga — build a strong foundation in postures, breath, and mindful movement at your own pace." },
  { slug: "200-hrs-hatha-yoga-teacher-training", title: "200 Hrs Hatha Yoga Teacher Training", image: imgP2045,
    description: "A comprehensive certification rooted in classical Hatha yoga — asana, alignment, philosophy, and the art of teaching." },
  { slug: "200-hrs-vinyasa-yoga-teacher-training", title: "200 Hrs Vinyasa Yoga Teacher Training", image: imgP2046,
    description: "Master the flowing, breath-linked sequences of Vinyasa and learn to guide dynamic, creative classes with confidence." },
  { slug: "200-hrs-kundalini-yoga-teacher-training", title: "200 Hrs Kundalini Yoga Teacher Training", image: imgP2044,
    description: "Awaken your energy through kriyas, mantra, and meditation — a transformative training in the yoga of awareness." },
];
const CARD_IMAGES = [imgP2044, imgP2045, imgP2046];
const ICONS = [<YogaIcon key="y" />, <BowlIcon key="b" />, <MeditationIcon key="m" />, <NatureIcon key="n" />];
const chunk = <T,>(a: T[], n: number) => Array.from({ length: Math.ceil(a.length / n) }, (_, i) => a.slice(i * n, i * n + n));

export default function ProgramsPage() {
  const { programs } = useCms();
  const cards = programs
    ? programs.map((p, i) => ({ slug: p.slug, title: p.title, description: p.cardSummary, image: p.heroImg ?? CARD_IMAGES[i % CARD_IMAGES.length] }))
    : PROGRAM_CARDS;
  return (
    <main>
      {/* ── Hero ── */}
      <section className="px-4 sm:px-6 lg:px-10 pt-4 sm:pt-6 pb-0">
        <div className="relative w-full min-h-[320px] sm:min-h-[420px] lg:min-h-[520px] rounded-[20px] overflow-hidden flex">
          {/* Background gradient */}
          <div className="absolute inset-0 overflow-hidden rounded-[20px]">
            <img loading="eager" decoding="async"
              src={imgHeroBg}
              alt=""
              className="absolute w-[200%] h-[140%] top-[-14%] left-[-36%] max-w-none object-cover"
            />
          </div>

          {/* Left: text */}
          <div className="relative z-10 flex-1 flex items-center px-6 sm:px-10 lg:px-[80px] xl:px-[120px] py-12 lg:py-0">
            <div className="flex flex-col gap-4 lg:gap-[30px] max-w-[500px]">
              <h1 className="font-['Marcellus:Regular',sans-serif] text-[#074240] text-[42px] sm:text-[60px] lg:text-[80px] xl:text-[90px] tracking-[-2px] lg:tracking-[-4px] leading-[1]">
                Our Programs
              </h1>
              <p className="font-['Lato:Regular',sans-serif] text-[#151515] text-[14px] lg:text-[18px] leading-[1.7] max-w-[380px]">
                Yoga Alliance–accredited 200-hour Hatha, Vinyasa and Kundalini teacher training, plus a gentle beginner course, taught in Rishikesh, India.
              </p>
            </div>
          </div>

          {/* Right: hero photo */}
          <div className="hidden md:block flex-1 relative">
            <img {...LCP} loading="eager" decoding="async"
              src={imgHeroPhoto}
              alt="Our Programs"
              className="absolute inset-0 w-full h-full object-cover object-center"
            />
            <div className="absolute inset-0 mix-blend-lighten opacity-10">
              <img src={imgHeroBg} alt="" loading="eager" decoding="async" className="absolute w-[200%] h-full top-0 left-[-50%] max-w-none object-cover" />
            </div>
          </div>
        </div>
      </section>

      {/* ── Programs grid ── */}
      <section className="py-12 sm:py-16 lg:py-[80px] px-4 sm:px-6 lg:px-10">
        <div className="max-w-[1280px] mx-auto flex flex-col gap-5 lg:gap-[30px]">
          {/* Cards come from Sanity (Programs) — 2 per row. Every 4th card uses the
              sage "flipped" style to keep the original rhythm of the design. */}
          {chunk(cards, 2).map((row, r) => (
            <div key={r} className="flex flex-col sm:flex-row gap-5 lg:gap-[30px]">
              {row.map((c, j) => {
                const i = r * 2 + j;
                return i % 4 === 3 ? (
                  <FlippedProgramCard key={c.slug} title={c.title} description={c.description} slug={c.slug} />
                ) : (
                  <PhotoProgramCard key={c.slug} title={c.title} image={c.image} icon={ICONS[i % ICONS.length]} description={c.description} slug={c.slug} />
                );
              })}
            </div>
          ))}
        </div>
      </section>

      {/* ── Discount CTA ── */}
      <DiscountSection />

    </main>
  );
}