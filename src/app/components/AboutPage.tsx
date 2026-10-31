import { useRef, useEffect, useCallback } from "react";
import { Link } from "react-router";
import { useCms } from "../cms/useCms";
import { StarRating, LeafIcon, FormSelect } from "./ZenShared";
import svgPaths from "../../imports/svg-1w945ax3ss";
import { imgImage, imgImage2, imgImage4 } from "../../imports/svg-1xkxq";
import { placeholder, LCP } from "./imagePlaceholder";
// Images
const imgFrame = placeholder("imgFrame");
const imgHeroLeft = placeholder("imgHeroLeft");
const imgAbout = placeholder("imgAbout");
const imgStory1 = placeholder("imgStory1");
const imgStory2 = placeholder("imgStory2");
const imgStory3 = placeholder("imgStory3");
const imgTeacher1 = placeholder("imgTeacher1");
const imgTeacher2 = placeholder("imgTeacher2");
const imgTeacher3 = placeholder("imgTeacher3");
const imgRetreat1 = placeholder("imgRetreat1");
const imgRetreat2 = placeholder("imgRetreat2");
const imgRetreat3 = placeholder("imgRetreat3");
const imgRetreat4 = placeholder("imgRetreat4");
const imgRetreat5 = placeholder("imgRetreat5");
const imgQuote1 = placeholder("imgQuote1");
const imgQuote2 = placeholder("imgQuote2");
const imgQuote3 = placeholder("imgQuote3");

// ── Shared icon helpers ───────────────────────────────────────────────────────
function ZenIcon({ color = "#C3DBC5" }: { color?: string }) {
  return (
    <svg width="25" height="25" viewBox="0 0 25 25" fill="none">
      <path clipRule="evenodd" d={svgPaths.p5631b00} fill={color} fillRule="evenodd" />
    </svg>
  );
}

function SocialPill({ type }: { type: "fb" | "tw" | "li" }) {
  return (
    <div className="w-[42px] h-[42px] bg-[#FAE1FB] rounded-full flex items-center justify-center shrink-0">
      {type === "fb" && (
        <svg width="10" height="16" viewBox="0 0 46 46" fill="none">
          <path d={svgPaths.p3305a000} fill="#151515" />
        </svg>
      )}
      {type === "tw" && (
        <svg width="14" height="12" viewBox="0 0 46 46" fill="none">
          <path d={svgPaths.p3e749d00} fill="#151515" />
        </svg>
      )}
      {type === "li" && (
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
          <path d={svgPaths.p123d7000} fill="#151515" />
          <path d={svgPaths.p2f420800} fill="#151515" />
          <path d={svgPaths.p1081a4f8} fill="#151515" />
        </svg>
      )}
    </div>
  );
}

// ── Teacher card (reuses same pattern as TeachersPage) ────────────────────────
function TeamCard({ name, title, photo, mask, slug }: { name: string; title: string; photo: string; mask: string; slug: string }) {
  return (
    <div className="bg-white flex flex-col gap-6 lg:gap-[30px] items-start overflow-hidden p-5 sm:p-6 lg:p-[30px] rounded-[20px] w-full">
      <div>
        <p className="font-['Marcellus:Regular',sans-serif] text-[#151515] text-[22px] lg:text-[32px] tracking-[-0.5px] lg:tracking-[-1px] leading-[1.35]">{name}</p>
        <p className="font-['Lato:Regular',sans-serif] text-[#074240] text-[14px] lg:text-[16px] leading-[24px]">{title}</p>
      </div>
      <div
        className="w-full aspect-square relative overflow-hidden rounded-[12px]"
        style={{
          maskImage: `url("${mask}")`,
          WebkitMaskImage: `url("${mask}")`,
          maskSize: "cover",
          WebkitMaskSize: "cover",
          maskRepeat: "no-repeat",
          WebkitMaskRepeat: "no-repeat",
          maskPosition: "center",
          WebkitMaskPosition: "center",
        }}
      >
        <img loading="lazy" decoding="async" src={photo} alt={name} className="w-full h-full object-cover object-top" />
      </div>
      <div className="flex items-center justify-between w-full gap-3 flex-wrap">
        <div className="flex items-center gap-[7px]">
          <SocialPill type="fb" /><SocialPill type="tw" /><SocialPill type="li" />
        </div>
        <Link
          to={`/teachers/${slug}`}
          className="flex items-center gap-2 px-5 lg:px-[30px] py-3 lg:py-4 rounded-full border border-[#151515] hover:bg-[#151515] hover:text-white transition-colors group shrink-0"
        >
          <span className="font-['Lato:Medium',sans-serif] text-[#1e1b1b] group-hover:text-white text-[13px] lg:text-[16px] whitespace-nowrap">Open Profile</span>
          <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
            <path d={svgPaths.p29f60cc0} fill="currentColor" />
          </svg>
        </Link>
      </div>
    </div>
  );
}

// ── Retreat card for the specialties section ─────────────────────────────────

const RETREAT_FALLBACKS = [imgRetreat1, imgRetreat2, imgRetreat3, imgRetreat4, imgRetreat5];
const TEAM_PHOTOS = [imgTeacher1, imgTeacher2, imgTeacher3];
const TEAM_MASKS = [imgImage, imgImage2, imgImage4];

const SPECIALTIES = [
  { image: imgRetreat1, title: "Roots of Stillness", slug: "roots-of-stillness", date: "September 18–24, 2025", location: "Tuscany, Italy",   type: "Yoga & Meditation"         },
  { image: imgRetreat2, title: "Sacred Flow",         slug: "sacred-flow",        date: "October 10–17, 2025",  location: "Bali, Indonesia",  type: "Intuitive Movement"        },
  { image: imgRetreat3, title: "Awaken in the Wild",  slug: "awaken-in-the-wild", date: "January 5–12, 2026",   location: "Costa Rica",       type: "Meditation & Clean Eating" },
  { image: imgRetreat4, title: "Winter of Presence",  slug: "winter-of-presence", date: "December 12–16, 2025", location: "Lapland, Finland", type: "Yin Yoga & Mindfulness"    },
  { image: imgRetreat5, title: "The Inner Horizon",   slug: "the-inner-horizon",  date: "November 2–7, 2025",   location: "Sedona, USA",      type: "Spiritual Exploration"     },
];

function RetreatCard({
  image, title, date, location, type, slug,
}: { image: string; title: string; date: string; location: string; type: string; slug: string }) {
  return (
    <div className="group flex-none w-[280px] sm:w-[340px] lg:w-[434px] h-[400px] sm:h-[500px] lg:h-[600px] relative rounded-[20px] overflow-hidden cursor-pointer">

      {/* Background image */}
      <img src={image} alt={title} loading="lazy" decoding="async" className="absolute inset-0 w-full h-full object-cover rounded-[20px] transition-transform duration-700 group-hover:scale-105" />
      <div
        className="absolute inset-0 rounded-[20px]"
        style={{ backgroundImage: "linear-gradient(180deg, rgba(0,0,0,0.3) 10%, rgba(0,0,0,0) 37%, rgba(0,0,0,0) 67%, rgba(0,0,0,0.3) 89%)" }}
      />

      {/* ── Default state ── */}
      <div className="relative z-10 flex flex-col items-start justify-between w-full h-full p-5 lg:p-[30px] transition-opacity duration-300 group-hover:opacity-0 pointer-events-none">
        <div className="flex items-center gap-[7px]">
          <ZenIcon color="#FCFF91" />
          <p className="font-['Marcellus:Regular',sans-serif] text-[#fcff91] text-[22px] lg:text-[32px] tracking-[-1px] leading-[1.3]">{title}</p>
        </div>
        <div className="flex flex-col gap-[7px] items-end w-full">
          {[date, location, type].map((tag) => (
            <div key={tag} className="backdrop-blur-[2px] bg-[rgba(255,255,255,0.2)] flex items-center justify-center py-[5px] px-[15px] rounded-full border border-[#fcff91]">
              <p className="font-['Lato:SemiBold',sans-serif] text-[#fcff91] text-[11px] lg:text-[12px] tracking-[1px] uppercase">{tag}</p>
            </div>
          ))}
        </div>
      </div>

      {/* ── Hover state: sage-green panel slides up from bottom ── */}
      <div className="absolute inset-0 z-20 bg-[#c3dbc5] rounded-[20px] translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out overflow-hidden">
        {/* Subtle texture */}
        <img loading="lazy" decoding="async" src={imgFrame} alt="" className="absolute w-[200%] h-[140%] top-[-14%] left-[-36%] max-w-none object-cover opacity-50 pointer-events-none" />
        {/* Panel content */}
        <div className="relative z-10 flex flex-col items-start justify-between w-full h-full p-5 lg:p-[30px]">
          <div className="flex flex-col gap-4 lg:gap-6">
            {/* Icon */}
            <div className="opacity-0 -translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500 delay-100">
              <ZenIcon color="#151515" />
            </div>
            {/* Title */}
            <p className="font-['Marcellus:Regular',sans-serif] text-[#151515] text-[22px] lg:text-[32px] tracking-[-1px] leading-[1.3] opacity-0 -translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500 delay-150">
              {title}
            </p>
            {/* Info rows */}
            <div className="flex flex-col gap-[10px] opacity-0 translate-y-3 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500 delay-[185ms]">
              {([
                { label: "Date",     value: date     },
                { label: "Location", value: location },
                { label: "Style",    value: type     },
              ] as const).map((item) => (
                <div key={item.label} className="flex items-start gap-2">
                  <span className="font-['Lato:SemiBold',sans-serif] text-[#151515] text-[10px] lg:text-[11px] tracking-[1px] uppercase mt-[3px] shrink-0">
                    {item.label}:
                  </span>
                  <span className="font-['Lato:Regular',sans-serif] text-[#151515] text-[13px] lg:text-[14px] leading-[1.5]">
                    {item.value}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* View Retreat CTA */}
          <Link
            to={`/retreats/${slug}`}
            className="flex items-center gap-2 px-5 lg:px-7 py-3 lg:py-4 rounded-full border border-[#151515] hover:bg-[#151515] transition-all duration-300 opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 [transition-delay:225ms] [&>span]:text-[#1e1b1b] [&:hover>span]:text-white"
          >
            <span className="font-['Lato:Medium',sans-serif] text-[13px] lg:text-[16px] whitespace-nowrap">
              View Retreat
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

// ── Testimonial card ──────────────────────────────────────────────────────────
function TestimonialCard({ quote, author, avatar }: { quote: string; author: string; avatar: string }) {
  return (
    <div className="bg-white flex-1 min-w-0 rounded-[20px] flex flex-col items-center gap-8 lg:gap-10 p-6 sm:p-8 lg:p-[40px]">
      <StarRating />
      <p className="font-['Lato:Regular',sans-serif] text-[#151515] text-[14px] sm:text-[16px] lg:text-[18px] leading-[1.7] text-center">{quote}</p>
      <div className="flex flex-col items-center gap-3">
        <div className="relative size-[100px]">
          <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100" fill="none">
            <path clipRule="evenodd" d={svgPaths.p29f5fb40} fill="white" fillRule="evenodd" />
          </svg>
          <img src={avatar} alt={author} loading="lazy" decoding="async" className="absolute inset-0 w-full h-full object-cover rounded-full" />
        </div>
        <p className="font-['Marcellus:Regular',sans-serif] text-[#074240] text-[14px] lg:text-[16px] leading-[24px] text-center">{author}</p>
      </div>
    </div>
  );
}

// ── Page ────────────────────────────────────────────────────────────────────
export default function AboutPage() {
  // Retreat cards: Sanity retreats marked "Show on homepage / About", else the built-in list.
  const { retreats, teachers } = useCms();
  const specialties = retreats
    ? retreats.filter((r) => r.featured).map((r, i) => ({ image: r.heroImg ?? RETREAT_FALLBACKS[i % RETREAT_FALLBACKS.length], title: r.name, slug: r.slug, date: r.date, location: r.location, type: r.badge }))
    : SPECIALTIES;
  // Team cards: first 3 listed teachers from Sanity, else the built-in three.
  const team = teachers
    ? teachers.filter((t) => t.listed).slice(0, 3).map((t, i) => ({ name: t.name, title: t.title, slug: t.slug, photo: t.photo ?? TEAM_PHOTOS[i % 3], mask: TEAM_MASKS[i % 3] }))
    : null;
  const carouselRef = useRef<HTMLDivElement>(null);
  const isPaused    = useRef(false);
  const posRef      = useRef(0);
  const rafRef      = useRef<number | null>(null);

  const SPEED = 0.55;

  /* ── Auto-scroll loop ── */
  useEffect(() => {
    const el = carouselRef.current;
    if (!el) return;

    // Performance: only animate while the carousel is on screen (and respect
    // the OS "reduce motion" setting) — saves CPU/battery and keeps scrolling smooth.
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let onScreen = true;
    const io = new IntersectionObserver(([entry]) => { onScreen = entry.isIntersecting; }, { rootMargin: "100px" });
    io.observe(el);
    function tick() {
      if (el && onScreen && !isPaused.current && !reduceMotion) {
        posRef.current += SPEED;
        const half = el.scrollWidth / 2;
        if (posRef.current >= half) posRef.current -= half;
        el.scrollLeft = posRef.current;
      }
      rafRef.current = requestAnimationFrame(tick);
    }
    rafRef.current = requestAnimationFrame(tick);
    return () => { io.disconnect(); if (rafRef.current) cancelAnimationFrame(rafRef.current); };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /* ── Arrow navigation ── */
  const scrollCards = useCallback((dir: "left" | "right") => {
    const el = carouselRef.current;
    if (!el) return;
    const firstCard = el.firstElementChild as HTMLElement | null;
    const step = firstCard ? firstCard.offsetWidth + 40 : 320;
    posRef.current += dir === "right" ? step : -step;
    const half = el.scrollWidth / 2;
    if (posRef.current < 0)     posRef.current += half;
    if (posRef.current >= half) posRef.current -= half;
    el.scrollLeft = posRef.current;
  }, []);

  return (
    <main>
      {/* ── 1. Hero ── */}
      <section className="px-4 sm:px-6 lg:px-10 pt-4 sm:pt-6">
        <div className="relative w-full min-h-[360px] sm:min-h-[500px] lg:min-h-[660px] rounded-[20px] overflow-hidden flex">
          {/* Left: pink bg + text */}
          <div className="flex-1 relative flex items-center">
            <div className="absolute inset-0 bg-[#fae1fb]" />
            <img loading="eager" decoding="async" src={imgFrame} alt="" className="absolute inset-0 w-full h-full object-cover opacity-60 pointer-events-none" />
            <div className="relative z-10 flex flex-col gap-6 lg:gap-10 px-6 sm:px-10 lg:px-[80px] xl:px-[120px] py-12 lg:py-0 max-w-[540px]">
              {/* Badge */}
              <div className="flex items-center gap-2">
                <LeafIcon color="#074240" />
                <span className="font-['Marcellus:Regular',sans-serif] text-[#151515] text-[13px] sm:text-[16px] lg:text-[18px] tracking-[1px] uppercase">About Us</span>
              </div>
              {/* Headline */}
              <h1 className="font-['Marcellus:Regular',sans-serif] font-normal text-[#151515] text-[36px] sm:text-[54px] lg:text-[72px] xl:text-[90px] tracking-[-2px] lg:tracking-[-4px] leading-[1.05]">
                Why Study{" "}
                <span className="font-['Playfair_Display:Italic',sans-serif] italic text-[#074240]">Yoga</span> With Us?
              </h1>
              <p className="font-['Lato:Regular',sans-serif] text-[#434a4a] text-[14px] lg:text-[18px] leading-[1.7] max-w-[400px]">
                Authentic Hatha, Vinyasa and Kundalini yoga taught in the traditional way by experienced teachers in Rishikesh — the yoga capital of the world.
              </p>
            </div>
          </div>

          {/* Right: yoga photo */}
          <div className="hidden md:block flex-1 relative">
            <img {...LCP} loading="eager" decoding="async" src={imgHeroLeft} alt="Yoga hero" className="absolute inset-0 w-full h-full object-cover" />
            <img loading="eager" decoding="async" src={imgFrame} alt="" className="absolute inset-0 w-full h-full object-cover mix-blend-hard-light opacity-10 pointer-events-none" />
          </div>
        </div>
      </section>

      {/* ── 2. About Us ── */}
      <section className="py-12 sm:py-16 lg:py-[80px] px-4 sm:px-6 lg:px-10">
        <div className="max-w-[1280px] mx-auto flex flex-col lg:flex-row gap-10 lg:gap-[100px] items-center">
          {/* Photo */}
          <div className="w-full lg:flex-none lg:w-[520px] xl:w-[600px] h-[360px] sm:h-[460px] lg:h-[580px] relative overflow-hidden rounded-tl-[300px] rounded-tr-[20px] rounded-bl-[20px] rounded-br-[20px] shrink-0">
            <img src={imgAbout} alt="About Us" loading="lazy" decoding="async" className="absolute inset-0 w-full h-full object-cover" />
            <img src={imgFrame} alt="" loading="lazy" decoding="async" className="absolute inset-0 w-full h-full object-cover mix-blend-hard-light opacity-15 pointer-events-none" />
          </div>
          {/* Text */}
          <div className="flex flex-col gap-5 lg:gap-[30px]">
            <h2 className="font-['Marcellus:Regular',sans-serif] text-[#151515] text-[36px] sm:text-[48px] lg:text-[60px] tracking-[-1px] lg:tracking-[-2px] leading-[1.1]">About Us</h2>
            <p className="font-['Lato:Regular',sans-serif] text-[#434a4a] text-[14px] lg:text-[18px] leading-[1.7]">
              Community is everything at Shiva Yoga Niketan. It's who we are and how things get done. Everyone here is motivated by a deep commitment to making sure each person and family feels welcome and included. When everyone feels like they belong, we are stronger and smarter together. We're a community driven to make the world a better place—starting in our practice, our breath, and our stillness.
            </p>
          </div>
        </div>
      </section>

      {/* ── 3. Our Story ── */}
      <section className="py-0 pb-12 sm:pb-16 lg:pb-[80px] px-4 sm:px-6 lg:px-10">
        <div className="max-w-[1280px] mx-auto flex flex-col lg:flex-row gap-5 lg:gap-[20px] items-center lg:h-[680px]">
          {/* Left: text + 2 small photos */}
          <div className="flex flex-col gap-10 lg:gap-[80px] justify-end w-full lg:w-[520px] xl:w-[620px] shrink-0 lg:h-full">
            <div className="flex flex-col gap-4 lg:gap-[30px]">
              <h2 className="font-['Marcellus:Regular',sans-serif] text-[#151515] text-[32px] sm:text-[44px] lg:text-[60px] tracking-[-1px] lg:tracking-[-2px] leading-[1.1]">Our Story</h2>
              <p className="font-['Lato:Regular',sans-serif] text-[#434a4a] text-[14px] lg:text-[18px] leading-[1.7]">
                Our curriculum appeals to student diversity and interest, and is rigorous and challenging. We understand each person comes to us with different talents, learning styles, and identities. And we celebrate that difference because our diversity is our strength.
              </p>
            </div>
            <div className="flex gap-4 lg:gap-[20px] h-[180px] sm:h-[240px] lg:h-[330px]">
              <div className="flex-1 relative rounded-[20px] overflow-hidden">
                <img src={imgStory2} alt="" loading="lazy" decoding="async" className="absolute inset-0 w-full h-full object-cover" />
                <img src={imgFrame} alt="" loading="lazy" decoding="async" className="absolute inset-0 w-full h-full object-cover mix-blend-hard-light opacity-15 pointer-events-none" />
              </div>
              <div className="flex-1 relative rounded-[20px] overflow-hidden">
                <img src={imgStory1} alt="" loading="lazy" decoding="async" className="absolute inset-0 w-full h-full object-cover" />
                <img src={imgFrame} alt="" loading="lazy" decoding="async" className="absolute inset-0 w-full h-full object-cover mix-blend-hard-light opacity-15 pointer-events-none" />
              </div>
            </div>
          </div>

          {/* Right: tall asymmetric photo */}
          <div className="flex-1 min-w-0 h-[360px] sm:h-[460px] lg:h-full relative rounded-tl-[20px] rounded-tr-[20px] rounded-bl-[20px] rounded-br-[300px] overflow-hidden">
            <img src={imgStory3} alt="Our story" loading="lazy" decoding="async" className="absolute inset-0 w-full h-full object-cover object-top" />
            <img src={imgFrame} alt="" loading="lazy" decoding="async" className="absolute inset-0 w-full h-full object-cover mix-blend-hard-light opacity-15 pointer-events-none" />
          </div>
        </div>
      </section>

      {/* ── 4. Our Professional Team ── */}
      <section className="py-12 sm:py-16 lg:py-[80px] px-4 sm:px-6 lg:px-10">
        <div className="max-w-[1280px] mx-auto flex flex-col gap-10 lg:gap-[70px] items-center">
          <h2 className="font-['Marcellus:Regular',sans-serif] text-[#151515] text-[32px] sm:text-[44px] lg:text-[60px] tracking-[-1px] lg:tracking-[-2px] text-center leading-[1.1]">
            Our Professional Team
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-[30px] w-full">
            {team ? (
              team.map((t) => <TeamCard key={t.slug} name={t.name} title={t.title} photo={t.photo} mask={t.mask} slug={t.slug} />)
            ) : (
              <>
                <TeamCard name="Raj Singh"       title="Hatha & Ashtanga Teacher"     photo={imgTeacher1} mask={imgImage}  slug="raj-singh" />
                <TeamCard name="Gokul Bisht"     title="Anatomy & Physiology Teacher" photo={imgTeacher2} mask={imgImage2} slug="gokul-bisht" />
                <TeamCard name="Gopal"           title="Hatha Yoga Master"            photo={imgTeacher3} mask={imgImage4} slug="gopal" />
              </>
            )}
          </div>
          <Link to="/teachers" className="inline-flex items-center justify-center bg-[#c3dbc5] rounded-full px-6 lg:px-8 py-3 lg:py-[18px] font-['Lato:Medium',sans-serif] text-[#151515] text-[14px] lg:text-[16px] hover:opacity-90 transition-opacity">
            Meet the Team
          </Link>
        </div>
      </section>

      {/* ── 5. Areas of Specialty / Retreats carousel ── */}
      <section className="py-12 sm:py-16 lg:py-[80px]">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-10 mb-10 lg:mb-[70px] flex flex-col gap-4 lg:gap-[20px] items-center">
          <div className="flex items-center gap-2">
            <LeafIcon color="#C3DBC5" />
            <span className="font-['Marcellus:Regular',sans-serif] text-[#151515] text-[13px] lg:text-[18px] tracking-[1px] uppercase">Areas of Specialty</span>
          </div>
          <h2 className="font-['Marcellus:Regular',sans-serif] text-[#151515] text-[28px] sm:text-[40px] lg:text-[60px] tracking-[-1px] lg:tracking-[-2px] text-center leading-[1.15] max-w-[700px]">
            We can help you with the following conditions:
          </h2>
        </div>

        {/* Scroll track with flanking arrows */}
        <div className="relative">

          {/* Left arrow */}
          <button
            onClick={() => scrollCards("left")}
            aria-label="Previous specialty"
            className="absolute left-3 lg:left-6 top-1/2 -translate-y-1/2 z-30 w-11 h-11 lg:w-[52px] lg:h-[52px] rounded-full bg-white shadow-[0_4px_20px_rgba(0,0,0,0.14)] flex items-center justify-center hover:bg-[#c3dbc5] transition-colors shrink-0"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
              <path d="M15 18L9 12L15 6" stroke="#151515" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>

          {/* Card track */}
          <div
            ref={carouselRef}
            className="flex gap-4 lg:gap-[40px] overflow-x-hidden px-4 sm:px-6 lg:px-10 pb-4"
            style={{ scrollbarWidth: "none" }}
            onMouseEnter={() => { isPaused.current = true;  }}
            onMouseLeave={() => { isPaused.current = false; }}
          >
            {[...specialties, ...specialties].map((item, i) => (
              <RetreatCard key={`${item.slug}-${i}`} {...item} />
            ))}
          </div>

          {/* Right arrow */}
          <button
            onClick={() => scrollCards("right")}
            aria-label="Next specialty"
            className="absolute right-3 lg:right-6 top-1/2 -translate-y-1/2 z-30 w-11 h-11 lg:w-[52px] lg:h-[52px] rounded-full bg-white shadow-[0_4px_20px_rgba(0,0,0,0.14)] flex items-center justify-center hover:bg-[#c3dbc5] transition-colors shrink-0"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
              <path d="M9 18L15 12L9 6" stroke="#151515" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>

        </div>
      </section>

      {/* ── 6. Testimonials ── */}
      <section className="py-12 sm:py-16 lg:py-[80px] px-4 sm:px-6 lg:px-10">
        <div className="max-w-[1280px] mx-auto flex flex-col gap-10 lg:gap-[70px]">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <h2 className="font-['Marcellus:Regular',sans-serif] text-[#151515] text-[28px] sm:text-[40px] lg:text-[60px] tracking-[-1px] lg:tracking-[-2px] leading-[1.1]">
              Real People. Real Results
            </h2>
            <Link to="/contact" className="inline-flex items-center justify-center self-start sm:self-auto bg-[#c3dbc5] rounded-full px-5 lg:px-7 py-2.5 lg:py-[18px] font-['Lato:Medium',sans-serif] text-[#151515] text-[13px] lg:text-[16px] hover:opacity-90 transition-opacity shrink-0">
              More Reviews
            </Link>
          </div>
          <div className="flex flex-col sm:flex-row gap-5 lg:gap-[40px]">
            <TestimonialCard
              quote={`"I came to this retreat overwhelmed by life. Each practice, each meal, each moment of stillness helped me soften. I found a sense of peace I hadn't felt in years — it truly changed something deep inside."`}
              author="Emily R., Roots of Stillness – Tuscany"
              avatar={imgQuote1}
            />
            <TestimonialCard
              quote={`"Something about the silence, the land, and the guided reflections helped me peel back layers I didn't even know I was holding onto. This retreat helped me see myself clearly, and I carry that with me every day."`}
              author="Alina K., The Inner Horizon – Sedona"
              avatar={imgQuote2}
            />
            <TestimonialCard
              quote={`"I had been living in my head for too long. The quiet mornings, the slow yoga, the nourishing food — they all helped me soften back into my body. I left feeling radiant and real again."`}
              author="Sofia G., Roots of Stillness – Tuscany"
              avatar={imgQuote3}
            />
          </div>
        </div>
      </section>

      {/* ── 7. Appointment CTA ── */}
      <section className="py-12 sm:py-16 lg:py-[80px] px-4 sm:px-6 lg:px-10">
        <div className="max-w-[1280px] mx-auto bg-[#c3dbc5] rounded-[30px] overflow-hidden relative">
          {/* Subtle texture */}
          <img src={imgFrame} alt="" loading="lazy" decoding="async" className="absolute inset-0 w-full h-full object-cover opacity-20 pointer-events-none" />
          <div className="relative z-10 flex flex-col gap-8 lg:gap-[50px] items-center px-6 sm:px-10 lg:px-[80px] py-12 lg:py-[70px]">
            {/* Heading */}
            <div className="flex flex-col gap-4 items-center text-center max-w-[680px]">
              <div className="flex items-center gap-2">
                <LeafIcon color="white" />
                <span className="font-['Marcellus:Regular',sans-serif] text-[#151515] text-[12px] lg:text-[18px] tracking-[1px] uppercase">Schedule your visit online</span>
              </div>
              <h2 className="font-['Marcellus:Regular',sans-serif] text-[#151515] text-[28px] sm:text-[40px] lg:text-[60px] tracking-[-1px] lg:tracking-[-2px] leading-[1.1]">
                Take the next step and schedule an appointment today
              </h2>
            </div>

            {/* Form */}
            <div className="flex flex-col gap-3 w-full max-w-[860px]">
              <input type="text" placeholder="Your Name" className="w-full bg-white rounded-full px-6 py-4 font-['Lato:Regular',sans-serif] text-[#434a4a] text-[15px] outline-none placeholder:text-[#8b8a82]" />
              <div className="flex flex-col sm:flex-row gap-3">
                <input type="tel" placeholder="Your Phone" className="flex-1 bg-white rounded-full px-6 py-4 font-['Lato:Regular',sans-serif] text-[#434a4a] text-[15px] outline-none placeholder:text-[#8b8a82]" />
                <input type="email" placeholder="Your Email" className="flex-1 bg-white rounded-full px-6 py-4 font-['Lato:Regular',sans-serif] text-[#434a4a] text-[15px] outline-none placeholder:text-[#8b8a82]" />
              </div>
              <FormSelect
                placeholder="Choose a Retreat"
                triggerClassName="bg-white rounded-full px-6 py-4 font-['Lato:Regular',sans-serif] text-[15px]"
                options={[
                  { label: "Roots of Stillness",  value: "roots-of-stillness"  },
                  { label: "Sacred Flow",         value: "sacred-flow"         },
                  { label: "Awaken in the Wild",  value: "awaken-in-the-wild"  },
                  { label: "Winter of Presence",  value: "winter-of-presence"  },
                  { label: "The Inner Horizon",   value: "the-inner-horizon"   },
                ]}
              />
              <div className="flex flex-col sm:flex-row gap-3">
                <input type="date" className="flex-1 bg-white rounded-full px-6 py-4 font-['Lato:Regular',sans-serif] text-[#434a4a] text-[15px] outline-none" />
                <input type="time" className="flex-1 bg-white rounded-full px-6 py-4 font-['Lato:Regular',sans-serif] text-[#434a4a] text-[15px] outline-none" />
              </div>
              <Link to="/appointment" className="inline-flex items-center justify-center w-full bg-[#074240] rounded-full py-4 lg:py-[18px] font-['Lato:Medium',sans-serif] text-white text-[15px] lg:text-[16px] hover:opacity-90 transition-opacity mt-1">
                Book an Appointment
              </Link>
            </div>
          </div>
        </div>
      </section>

    </main>
  );
}