import { useState, useEffect, useRef, useCallback } from "react";
import { Link, useNavigate } from "react-router";
import { submitForm, Honeypot, FormError } from "./SiteExtras";
import { useCms } from "../cms/useCms";
import svgPaths from "../../imports/svg-qtx3rc5tzi";
import { imgQuote2 } from "../../imports/svg-3af3l";
import { placeholder, LCP } from "./imagePlaceholder";
import {
  SectionBadge,
  StarRating,
  ArrowCircleButton,
  GreenButton,
  OutlinedButton,
  SelectMenu,
} from "./ZenShared";
const imgFrame1000007866 = placeholder("imgFrame1000007866");
const imgFrame1000007867 = placeholder("imgFrame1000007867");
const imgVector = placeholder("imgVector");
const imgHome2 = placeholder("imgHome2");
const imgP2044 = placeholder("imgP2044");
const imgP2045 = placeholder("imgP2045");
const imgP2046 = placeholder("imgP2046");
const imgP2047 = placeholder("imgP2047");
const imgScreenshot20250724At1547072 = placeholder("imgScreenshot20250724At1547072");
const imgP2048 = placeholder("imgP2048");
const imgP2049 = placeholder("imgP2049");
const imgP2050 = placeholder("imgP2050");
const imgP2051 = placeholder("imgP2051");
const imgP2052 = placeholder("imgP2052");
const imgRectangle1 = placeholder("imgRectangle1");
const imgRectangle3 = placeholder("imgRectangle3");
const imgRectangle4 = placeholder("imgRectangle4");
const imgFrame1000007885 = placeholder("imgFrame1000007885");
const imgQuote3 = placeholder("imgQuote3");
const imgQuote4 = placeholder("imgQuote4");
const imgQuote5 = placeholder("imgQuote5");
const imgQuote6 = placeholder("imgQuote6");
const imgQuote7 = placeholder("imgQuote7");
const imgRectangle40277 = placeholder("imgRectangle40277");
const imgRectangle40278 = placeholder("imgRectangle40278");
const imgQuote8 = placeholder("imgQuote8");
const imgQuote9 = placeholder("imgQuote9");
const imgRectangle40317 = placeholder("imgRectangle40317");
const imgRectangle40311 = placeholder("imgRectangle40311");
const imgRectangle40316 = placeholder("imgRectangle40316");
const imgRectangle40315 = placeholder("imgRectangle40315");
const imgRectangle40313 = placeholder("imgRectangle40313");
const imgRectangle40314 = placeholder("imgRectangle40314");
const imgRectangle40318 = placeholder("imgRectangle40318");
const imgVector1 = placeholder("imgVector1");
const imgHome3 = placeholder("imgHome3");
const imgHome4 = placeholder("imgHome4");

// ─── HERO ──────────────────────────────────────────────────────────────────────

function HeroSection() {
  return (
    <section className="px-4 sm:px-6 lg:px-10 pt-4 lg:pt-10 pb-0">
      <div className="relative w-full h-[460px] sm:h-[600px] md:h-[720px] lg:h-[920px] xl:h-[980px] rounded-[16px] lg:rounded-[20px] overflow-hidden">
        {/* Background — above fold: eager + high priority */}
        <img {...LCP} loading="eager" decoding="async" src={imgFrame1000007866} alt="" className="absolute inset-0 w-full h-full object-cover object-center" />
        <img loading="eager" decoding="async" src={imgFrame1000007867} alt="" className="absolute inset-0 w-full h-full object-cover mix-blend-lighten opacity-70" />

        {/* Content overlay */}
        <div className="absolute inset-0 flex flex-col items-center justify-center px-4 sm:px-10">
          <div className="relative bg-white/70 backdrop-blur-sm rounded-[16px] lg:rounded-[20px] px-6 sm:px-10 lg:px-16 py-8 sm:py-12 lg:py-16 flex flex-col items-center gap-6 lg:gap-10 max-w-[680px] w-full mx-auto text-center">
            {/* Heading */}
            {/* SEO: the single page <h1>. Visual is unchanged; a visually-hidden suffix adds the primary keyword. */}
            <h1 className="font-['Marcellus:Regular',sans-serif] font-normal">
              <span className="block text-[#151515] text-[40px] sm:text-[56px] md:text-[70px] lg:text-[90px] leading-[1] tracking-[-3px] lg:tracking-[-5px]">
                Awaken Your
              </span>
              <span className="block text-[#151515] text-[40px] sm:text-[56px] md:text-[70px] lg:text-[90px] leading-[1] tracking-[-3px] lg:tracking-[-5px]">
                Inner{" "}
                <span className="font-['Playfair_Display:Italic',sans-serif] text-[#074240]">Stillness</span>
              </span>
              <span className="sr-only"> — Yoga Teacher Training &amp; Retreats in Rishikesh, India</span>
            </h1>

            {/* Sub-text */}
            <p className="font-['Lato:Regular',sans-serif] text-[#434a4a] text-[14px] sm:text-[16px] lg:text-[20px] leading-[1.6] opacity-80 max-w-[420px]">
              Join us for a transformative journey through yoga, breath, and meditation — in nature's embrace.
            </p>

            {/* Buttons */}
            <div className="flex flex-wrap items-center justify-center gap-3">
              <OutlinedButton label="Explore Retreats" />
              <GreenButton label="Book Your Spot" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── WELCOME ──────────────────────────────────────────────────────────────────

function WelcomeSection() {
  return (
    <section className="py-16 sm:py-20 lg:py-[120px] px-4 sm:px-6 lg:px-10">
      <div className="max-w-[1280px] mx-auto flex flex-col items-center gap-10 lg:gap-[50px]">
        {/* Lotus icon */}
        <div className="flex flex-col items-center gap-6 lg:gap-[30px]">
          <img src={imgVector} alt="Lotus" loading="lazy" decoding="async" className="w-[90px] h-[90px] sm:w-[120px] sm:h-[120px] lg:w-[150px] lg:h-[150px]" />
          <SectionBadge text="Welcome to Shiva Yoga Niketan" />
        </div>
        {/* Quote */}
        <p className="font-['Marcellus:Regular',sans-serif] text-[#151515] text-[18px] sm:text-[22px] lg:text-[32px] leading-[1.5] lg:leading-[42px] text-center tracking-[-0.5px] lg:tracking-[-1px] max-w-[900px]">
          Shiva Yoga Niketan is the dream of a few simple yoga teachers who wish to live a quiet life in nature, and to instruct a small number of committed, advanced students — rooted in the universal principles of Love, Peace and Wisdom.
        </p>
      </div>
    </section>
  );
}

// ─── NEXT RETREAT ─────────────────────────────────────────────────────────────

function NextRetreatSection() {
  return (
    <section className="py-0 px-4 sm:px-6 lg:px-10 pb-16 sm:pb-20 lg:pb-[120px]">
      <div className="max-w-[1280px] mx-auto flex flex-col lg:flex-row items-center gap-10 lg:gap-[100px]">
        {/* Image */}
        <div className="w-full lg:w-[590px] lg:shrink-0">
          <div className="w-full h-[300px] sm:h-[420px] lg:h-[600px] xl:h-[680px] overflow-hidden rounded-t-[16px] lg:rounded-tl-[20px] lg:rounded-tr-[20px] rounded-b-[120px] sm:rounded-b-[200px] lg:rounded-b-[300px]">
            <img src={imgHome2} alt="Retreat landscape" loading="lazy" decoding="async" className="w-full h-full object-cover object-center" />
          </div>
        </div>

        {/* Content */}
        <div className="flex flex-col items-center lg:items-start gap-8 lg:gap-10 flex-1 text-center lg:text-left">
          <SectionBadge text="Next Retreat" />
          <div>
            <p className="font-['Marcellus:Regular',sans-serif] text-[#151515] text-[28px] sm:text-[38px] lg:text-[60px] leading-[1.1] tracking-[-1px] lg:tracking-[-2px]">
              Whispers of Stillness
            </p>
            <p className="font-['Playfair_Display:Italic',sans-serif] text-[#074240] text-[28px] sm:text-[38px] lg:text-[60px] leading-[1.1] tracking-[-1px] lg:tracking-[-2px]">
              Amalfi Coast
            </p>
          </div>
          <p className="font-['Lato:SemiBold',sans-serif] text-[#8b8a82] text-[10px] sm:text-[11px] lg:text-[12px] tracking-[1px] uppercase opacity-80">
            Sept 18–24 / Limited spots available
          </p>
          <p className="font-['Lato:Regular',sans-serif] text-[#434a4a] text-[14px] sm:text-[16px] lg:text-[20px] leading-[1.6] max-w-[520px]">
            Awaken to the gentle embrace of the Amalfi Coast, where sea breezes, golden light, and serene landscapes invite deep rest and renewal. Each day blends sunrise yoga, nourishing cuisine, and time to explore or simply be.
          </p>
          <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3">
            <ArrowCircleButton label="Learn More" />
            <GreenButton label="Book Your Spot" />
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── MODULE-LEVEL STATIC DATA ─────────────────────────────────────────────────
// Hoisted here so these objects are never recreated on re-render.

const WHATS_INCLUDED_ITEMS = [
  { img: imgP2044, title: "Daily Yoga Classes",        desc: "Grounding practices to start and end your day.",             borderRadius: "rounded-tl-[100px] sm:rounded-tl-[200px] lg:rounded-tl-[250px] rounded-tr-[16px] lg:rounded-tr-[20px] rounded-b-[16px] lg:rounded-b-[20px]" },
  { img: imgP2045, title: "Daily Meditation Classes",  desc: "Guided practices to ground, center, and awaken.",            borderRadius: "rounded-t-[100px] sm:rounded-t-[200px] lg:rounded-t-[250px] rounded-b-[16px] lg:rounded-b-[20px]" },
  { img: imgP2046, title: "Sustainable Stays",         desc: "Eco-friendly spaces designed for rest and renewal.",         borderRadius: "rounded-tl-[16px] lg:rounded-tl-[20px] rounded-tr-[100px] sm:rounded-tr-[200px] lg:rounded-tr-[250px] rounded-b-[16px] lg:rounded-b-[20px]" },
  { img: imgP2047, title: "Organic, plant-based meals",desc: "Plant-powered nourishment made with love.",                  borderRadius: "rounded-t-[16px] lg:rounded-t-[20px] rounded-bl-[100px] sm:rounded-bl-[200px] lg:rounded-bl-[250px] rounded-br-[100px] sm:rounded-br-[200px] lg:rounded-br-[250px]" },
];

const STATS = [
  { number: "450+", label: "Hearts Reconnected Through Retreats",  cta: "Explore Retreats"  },
  { number: "12",   label: "Sacred Locations\nAcross the Globe",   cta: "Explore Locations" },
  { number: "98%",  label: "Of Guests Return or Recommend Us",     cta: "Explore Reviews"   },
];

// Homepage teacher-training / retreat showcase. `href` points each card to the
// right place — trainings have detail pages under /programs, the two retreats
// link to the retreats listing. Dates & prices are easy to edit here.
export const RETREATS = [
  { title: "Yoga Course for Beginners",      href: "/programs/yoga-course-for-beginners",              img: imgP2048, date: "4-Week Course",     location: "Rishikesh, India", type: "Foundation",        price: "On request", desc: "A four-week preparatory series introducing newcomers to all the basic fundamentals of yoga." },
  { title: "200 Hr Hatha Yoga TTC",          href: "/programs/200-hrs-hatha-yoga-teacher-training",    img: imgP2049, date: "7 Jul – 3 Aug 2022", location: "Rishikesh, India", type: "Yoga Alliance, USA", price: "USD 1450", desc: "A 200-hour Hatha teacher training in compliance with Yoga Alliance (USA) standards." },
  { title: "200 Hr Vinyasa Yoga TTC",        href: "/programs/200-hrs-vinyasa-yoga-teacher-training",  img: imgP2050, date: "7 Jul – 3 Aug 2022", location: "Rishikesh, India", type: "Yoga Alliance, USA", price: "USD 1450", desc: "Accredited by Yoga Alliance (USA) — open to beginner trainees and practitioners alike." },
  { title: "200 Hr Kundalini Yoga TTC",      href: "/programs/200-hrs-kundalini-yoga-teacher-training",img: imgP2051, date: "7 Jul – 3 Aug 2022", location: "Rishikesh, India", type: "Yoga Alliance, USA", price: "USD 1450", desc: "Blend academic knowledge with primary yoga practice on this accredited program." },
  { title: "15 Days Meditation & Yoga Retreat", href: "/retreats",                                    img: imgP2052, date: "Year-round",        location: "Rishikesh, India", type: "Retreat",           price: "On request", desc: "One of the most precise and affordable 15-day rejuvenating yoga experiences, offered all year round." },
  { title: "7 Days Meditation & Yoga Retreat",  href: "/retreats",                                    img: imgP2049, date: "Year-round",        location: "Rishikesh, India", type: "Retreat",           price: "On request", desc: "A wonderful recreating holiday for beginners and instructors — understand your body and its patterns." },
];

const INSTRUCTORS = [
  { name: "Angela Carbone", role: "Yoga Teacher & Therapist",        img: imgRectangle1 },
  { name: "Marco Sereni",   role: "Meditation Guide & Breathwork",   img: imgRectangle3 },
  { name: "Lucia Mori",     role: "Holistic Wellness Practitioner",  img: imgRectangle4 },
];

const REVIEWS = [
  { quote: "\"I came to this retreat overwhelmed by life. Each practice, each meal, each moment of stillness helped me soften. I found a sense of peace I hadn't felt in years — it truly changed something deep inside.\"", author: "Emily R., Roots of Stillness – Tuscany", img: imgQuote3 },
  { quote: "\"Something about the silence, the land, and the guided reflections helped me peel back layers I didn't even know I was holding onto. This retreat helped me see myself clearly, and I carry that with me every day.\"", author: "Alina K., The Inner Horizon – Sedona", img: imgQuote4 },
  { quote: "\"I had been living in my head for too long. The quiet mornings, the slow yoga, the nourishing food — they all helped me soften back into my body. I left feeling radiant and real again.\"", author: "Sofia G., Roots of Stillness – Tuscany", img: imgQuote5 },
  { quote: "\"From the ocean meditations to the gentle movement sessions, every detail of the retreat felt like it was designed for deep healing. I left feeling lighter, clearer, and more connected to myself.\"", author: "David M., Sacred Flow – Bali", img: imgQuote6 },
  { quote: "The snow, the stillness, the candlelit evenings — it all created a space where I could finally slow down. This retreat helped me reconnect with the part of myself that knows how to just be.\"", author: "Jonas L., Winter of Presence – Finland", img: imgQuote7 },
  { quote: "\"This wasn't just a break. It was a return to presence. The jungle, the people, the practices — they brought me back to my breath, to my body, to a feeling of aliveness I had forgotten.\"", author: "Priya S., Awaken in the Wild – Costa Rica", img: imgQuote8 },
  { quote: "\"There was something sacred about the whole experience. I felt held, seen, and supported — not just by the facilitators, but by the space itself. I returned home with more clarity and more heart.\"", author: "Mateo B., Sacred Flow – Bali", img: imgQuote9 },
];

const VIDEO_THUMBS = [imgRectangle40277, imgRectangle40278];
const GALLERY_ROW1 = [imgRectangle40317, imgRectangle40311, imgRectangle40316];
const GALLERY_ROW2 = [imgRectangle40315, imgRectangle40313, imgRectangle40314, imgRectangle40318];

const CONDITIONS = [
  { id: "tension",   label: "Tension & Stress Release",        desc: "Let go of daily pressure through a blend of therapeutic yoga, breathwork, and energy balancing practices. Our approach helps dissolve built-up tension in both body and mind." },
  { id: "emotional", label: "Emotional Fatigue & Burnout",     desc: "" },
  { id: "chronic",   label: "Chronic Pain & Discomfort",       desc: "" },
  { id: "sleep",     label: "Sleep & Nervous System Support",  desc: "" },
  { id: "digestive", label: "Digestive & Gut Health Support",  desc: "" },
];

// ─── TESTIMONIAL SUB-COMPONENTS (module-level — not nested inside parent) ─────
// Defining these inside TestimonialsSection would give React a new component
// type on every render, forcing full unmount/remount of all 9 instances.

type ReviewItem = { quote: string; author: string; img: string };

function ReviewCard({ review }: { review: ReviewItem }) {
  return (
    <div className="bg-white rounded-[16px] lg:rounded-[20px] p-6 lg:p-[40px] flex flex-col gap-6 lg:gap-[40px] break-inside-avoid mb-5 lg:mb-[40px]">
      <StarRating />
      <p className="font-['Lato:Regular',sans-serif] text-[#151515] text-[14px] sm:text-[15px] lg:text-[18px] leading-[1.7]">
        {review.quote}
      </p>
      <div className="flex flex-col items-center gap-3">
        <div
          className="w-[70px] h-[70px] lg:w-[100px] lg:h-[100px] rounded-full overflow-hidden"
          style={{ maskImage: `url('${imgQuote2}')`, maskSize: "cover" }}
        >
          <img src={review.img} alt="" loading="lazy" decoding="async" className="w-full h-full object-cover" />
        </div>
        <p className="font-['Marcellus:Regular',sans-serif] text-[#074240] text-[12px] lg:text-[16px] text-center leading-[1.5]">
          {review.author}
        </p>
      </div>
    </div>
  );
}

function VideoCard({ src }: { src: string }) {
  return (
    <div className="relative h-[220px] sm:h-[300px] lg:h-[540px] rounded-[16px] lg:rounded-[20px] overflow-hidden cursor-pointer group break-inside-avoid mb-5 lg:mb-[40px]">
      <img
        src={src}
        alt=""
        loading="lazy"
        decoding="async"
        style={{ willChange: "transform" }}
        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
      />
      <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors" />
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-14 h-14 lg:w-[80px] lg:h-[80px] bg-white rounded-full flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
          <svg width="20" height="20" viewBox="0 0 80 80" fill="none" className="ml-1">
            <path d={svgPaths.p3537c9a0} fill="#151515" />
          </svg>
        </div>
      </div>
    </div>
  );
}

// ─── WHAT'S INCLUDED ──────────────────────────────────────────────────────────

function WhatsIncludedSection() {

  return (
    <section className="py-0 px-4 sm:px-6 lg:px-10 pb-16 sm:pb-20 lg:pb-[120px]">
      <div className="max-w-[1840px] mx-auto flex flex-col gap-10 lg:gap-[60px]">
        <h2 className="font-['Marcellus:Regular',sans-serif] text-[#151515] text-[28px] sm:text-[40px] lg:text-[60px] text-center tracking-[-1px] lg:tracking-[-2px] leading-tight">
          What's included:
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-10">
          {WHATS_INCLUDED_ITEMS.map((item) => (
            <div key={item.title} className="flex flex-col gap-3 lg:gap-[10px]">
              <div className={`h-[220px] sm:h-[320px] lg:h-[550px] w-full overflow-hidden ${item.borderRadius}`}>
                <img src={item.img} alt={item.title} loading="lazy" decoding="async" className="w-full h-full object-cover object-center" />
              </div>
              <div className="pt-1 lg:pt-2">
                <p className="font-['Marcellus:Regular',sans-serif] text-[#151515] text-[18px] sm:text-[22px] lg:text-[32px] leading-[1.4] tracking-[-0.5px] lg:tracking-[-1px]">
                  {item.title}
                </p>
                <p className="font-['Lato:Regular',sans-serif] text-[#434a4a] text-[13px] sm:text-[14px] lg:text-[16px] leading-[1.6] mt-1">
                  {item.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── ABOUT / UNIQUE ───────────────────────────────────────────────────────────

function AboutSection() {
  return (
    <section className="py-12 sm:py-16 lg:py-[120px] px-4 sm:px-6 lg:px-10 bg-[#f8f3ed]">
      <div className="max-w-[1280px] mx-auto flex flex-col lg:flex-row items-center gap-10 lg:gap-[100px]">
        {/* Content */}
        <div className="flex flex-col gap-6 lg:gap-10 flex-1 order-2 lg:order-1">
          <div className="flex flex-col gap-4 lg:gap-[30px]">
            <SectionBadge text="About us" />
            <h2 className="font-['Marcellus:Regular',sans-serif] text-[#151515] text-[26px] sm:text-[38px] lg:text-[60px] leading-[1.1] tracking-[-1px] lg:tracking-[-2px]">
              What Makes Shiva Yoga Niketan{" "}
              <span className="font-['Playfair_Display:Italic',sans-serif] text-[#074240]">Different</span>
            </h2>
          </div>
          <p className="font-['Lato:Regular',sans-serif] text-[#434a4a] text-[14px] sm:text-[16px] lg:text-[18px] leading-[1.7]">
            We are modeled around non-sectarian and non-religious teachings, rooted in the universal principles of Love, Peace and Wisdom. We consider all beings to be Divine, with the potential to live an amazing, healthy and peaceful life under any of the circumstances of this challenging modern lifestyle.
          </p>
          <p className="font-['Lato:Regular',sans-serif] text-[#434a4a] text-[14px] sm:text-[16px] lg:text-[18px] leading-[1.7]">
            We do not represent any particular tradition or style. Most of our teachers have their own gurus and practices, but we never impose a single path — we present the best wisdom from all traditions. We don't teach you what is Truth; instead, we assist you in finding your own Truth.
          </p>
          <GreenButton label="Learn More" />
        </div>

        {/* Flower image */}
        <div className="order-1 lg:order-2 shrink-0 w-full max-w-[380px] sm:max-w-[480px] lg:max-w-[600px] xl:max-w-[650px]">
          <div className="aspect-square overflow-hidden" style={{ borderRadius: "40% 40% 50% 50% / 40% 40% 50% 50%" }}>
            <img
              src={imgScreenshot20250724At1547072}
              alt="Zen Retreat flower"
              loading="lazy"
              decoding="async"
              className="w-full h-full object-cover object-center"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── STATS ────────────────────────────────────────────────────────────────────

function StatsSection() {
  return (
    <section className="py-12 sm:py-16 lg:py-[80px] px-4 sm:px-6 lg:px-10">
      <div className="max-w-[1280px] mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-0">
          {STATS.map((stat, i) => (
            <div
              key={stat.number}
              className={`flex flex-col gap-6 lg:gap-10 py-8 sm:py-0 sm:px-6 lg:px-10 ${i > 0 ? "border-t sm:border-t-0 sm:border-l border-[#8B8A82]/30" : ""}`}
            >
              <div className="flex flex-col gap-4 lg:gap-[30px]">
                <p className="font-['Playfair_Display:Italic',sans-serif] text-[#151515] text-[64px] sm:text-[72px] lg:text-[100px] leading-[1] tracking-[-3px] lg:tracking-[-5px]">
                  {stat.number}
                </p>
                <p className="font-['Marcellus:Regular',sans-serif] text-[#074240] text-[18px] sm:text-[20px] lg:text-[32px] leading-[1.4] tracking-[-0.5px] lg:tracking-[-1px] whitespace-pre-line">
                  {stat.label}
                </p>
              </div>
              <ArrowCircleButton label={stat.cta} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── UPCOMING RETREATS ────────────────────────────────────────────────────────

type Retreat = typeof RETREATS[0];

/** Individual retreat card — image bg + hover slides up sage-green detail panel */
function RetreatScrollCard({ retreat }: { retreat: Retreat }) {
  return (
    <div className="group shrink-0 w-[72vw] sm:w-[46vw] md:w-[38vw] lg:w-[30vw] xl:w-[380px] relative h-[380px] sm:h-[480px] lg:h-[600px] rounded-[16px] lg:rounded-[20px] overflow-hidden cursor-pointer">

      {/* Background image */}
      <img
        src={retreat.img}
        alt={retreat.title}
        loading="lazy"
        decoding="async"
        className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
      />
      {/* Dark gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

      {/* ── Default state content ── */}
      <div className="relative z-10 flex flex-col items-start justify-between w-full h-full p-4 lg:p-[30px] transition-opacity duration-300 group-hover:opacity-0 pointer-events-none">
        <div className="flex items-center gap-2">
          <svg width="20" height="20" viewBox="0 0 25 25" fill="none" className="shrink-0">
            <path clipRule="evenodd" d={svgPaths.p5631b00} fill="#FCFF91" fillRule="evenodd" />
          </svg>
          <p className="font-['Marcellus:Regular',sans-serif] text-[#fcff91] text-[18px] sm:text-[22px] lg:text-[32px] leading-[1.2] tracking-[-0.5px] lg:tracking-[-1px]">
            {retreat.title}
          </p>
        </div>
        <div className="flex flex-col items-end gap-2 self-end">
          {[retreat.date, retreat.location, retreat.type].map((tag) => (
            <div key={tag} className="backdrop-blur-sm bg-white/20 border border-[#fcff91] px-3 py-1 rounded-full">
              <span className="font-['Lato:SemiBold',sans-serif] text-[#fcff91] text-[10px] lg:text-[12px] tracking-[1px] uppercase">
                {tag}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* ── Hover state: sage-green panel slides up from bottom ── */}
      <div className="absolute inset-0 z-20 bg-[#c3dbc5] rounded-[16px] lg:rounded-[20px] translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out overflow-hidden">
        {/* Subtle texture overlay */}
        <img loading="lazy" decoding="async"
          src={imgFrame1000007867}
          alt=""
          className="absolute w-[200%] h-[140%] top-[-14%] left-[-36%] max-w-none object-cover opacity-50 pointer-events-none"
        />
        {/* Panel content */}
        <div className="relative z-10 flex flex-col items-start justify-between w-full h-full p-4 lg:p-[30px]">
          <div className="flex flex-col gap-4 lg:gap-6">
            {/* Flower icon */}
            <div className="opacity-0 -translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500 delay-100">
              <svg width="22" height="22" viewBox="0 0 25 25" fill="none" className="shrink-0">
                <path clipRule="evenodd" d={svgPaths.p5631b00} fill="#151515" fillRule="evenodd" />
              </svg>
            </div>
            {/* Title */}
            <p className="font-['Marcellus:Regular',sans-serif] text-[#151515] text-[22px] sm:text-[26px] lg:text-[32px] tracking-[-1px] leading-[1.3] opacity-0 -translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500 delay-150">
              {retreat.title}
            </p>
            {/* Info rows */}
            <div className="flex flex-col gap-[10px] opacity-0 translate-y-3 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500 delay-[185ms]">
              {([
                { label: "Dates",    value: retreat.date     },
                { label: "Location", value: retreat.location },
                { label: "Style",    value: retreat.type     },
                { label: "Fee",      value: retreat.price    },
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
          {/* View Details CTA */}
          <Link
            to={retreat.href}
            className="flex items-center gap-2 px-5 lg:px-7 py-3 lg:py-4 rounded-full border border-[#151515] hover:bg-[#151515] transition-all duration-300 opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 [transition-delay:225ms] [&>span]:text-[#1e1b1b] [&:hover>span]:text-white"
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

// Upcoming cards = programs + retreats marked "Show on homepage" in Sanity.
// Either half falls back to the built-in cards if that list isn't in Sanity yet.
const UPCOMING_IMGS = [imgP2048, imgP2049, imgP2050, imgP2051, imgP2052];
function useUpcoming(): Retreat[] {
  const { programs, retreats } = useCms();
  const progCards: Retreat[] = programs
    ? programs.filter((p) => p.featured).map((p, i) => ({
        title: p.title, href: `/programs/${p.slug}`, img: p.heroImg ?? UPCOMING_IMGS[i % UPCOMING_IMGS.length],
        date: p.dates?.[0]?.period ?? p.duration ?? "", location: "Rishikesh, India",
        type: p.accreditation || p.badge, price: p.dates?.[0]?.price ?? p.fees?.[0]?.price ?? "On request", desc: p.cardSummary,
      }))
    : RETREATS.filter((r) => r.href.startsWith("/programs/"));
  const retreatCards: Retreat[] = retreats
    ? retreats.filter((r) => r.featured).map((r, i) => ({
        title: r.name, href: `/retreats/${r.slug}`, img: r.heroImg ?? UPCOMING_IMGS[(i + 4) % UPCOMING_IMGS.length],
        date: r.date, location: r.location, type: r.badge || "Retreat", price: r.price || "On request", desc: r.tagline,
      }))
    : RETREATS.filter((r) => !r.href.startsWith("/programs/"));
  return [...progCards, ...retreatCards];
}

function UpcomingRetreatsSection() {
  const upcoming = useUpcoming();
  const scrollRef = useRef<HTMLDivElement>(null);
  const isPaused  = useRef(false);
  const rafRef    = useRef<number | null>(null);
  const posRef    = useRef(0); // fractional pixel position for smooth sub-pixel scrolling

  const SPEED = 0.55; // px per animation frame ≈ 33 px/s at 60 fps

  /* ── Auto-scroll loop (duplicated cards → seamless infinite marquee) ── */
  useEffect(() => {
    const el = scrollRef.current;
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
        const half = el.scrollWidth / 2; // content is duplicated, so half = one full set
        if (posRef.current >= half) posRef.current -= half;
        el.scrollLeft = posRef.current;
      }
      rafRef.current = requestAnimationFrame(tick);
    }

    rafRef.current = requestAnimationFrame(tick);
    return () => { io.disconnect(); if (rafRef.current) cancelAnimationFrame(rafRef.current); };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /* ── Arrow click: advance/retreat by one card width ── */
  const scrollCards = useCallback((dir: "left" | "right") => {
    const el = scrollRef.current;
    if (!el) return;
    const firstCard = el.firstElementChild as HTMLElement | null;
    const step = firstCard ? firstCard.offsetWidth + 32 : 340;
    posRef.current += dir === "right" ? step : -step;
    const half = el.scrollWidth / 2;
    if (posRef.current < 0)     posRef.current += half;
    if (posRef.current >= half) posRef.current -= half;
    el.scrollLeft = posRef.current;
  }, []);

  return (
    <section className="py-12 sm:py-16 lg:py-[120px]">

      {/* ── Section header ── */}
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-10 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-8 lg:mb-[70px]">
        <div className="flex flex-col gap-3 lg:gap-5">
          <SectionBadge text="Teacher Training in Rishikesh" />
          <h2 className="font-['Marcellus:Regular',sans-serif] text-[#151515] text-[28px] sm:text-[40px] lg:text-[60px] leading-[1.1] tracking-[-1px] lg:tracking-[-2px]">
            Yoga Teacher{" "}
            <span className="font-['Playfair_Display:Italic',sans-serif] text-[#074240]">Training</span>
          </h2>
          <p className="font-['Lato:SemiBold',sans-serif] text-[#8b8a82] text-[11px] lg:text-[13px] tracking-[1px] uppercase">
            Hatha · Kundalini · Vinyasa · Meditation — accredited by Yoga Alliance, USA
          </p>
        </div>
        <Link
          to="/programs"
          className="border border-[#151515] self-start sm:self-auto flex items-center gap-2 px-5 lg:px-7 py-3 lg:py-[17px] rounded-full cursor-pointer hover:bg-[#151515] hover:text-white transition-colors shrink-0 group"
        >
          <span className="font-['Lato:Medium',sans-serif] text-[13px] lg:text-[16px] text-[#151515] group-hover:text-white whitespace-nowrap">
            View all Programs
          </span>
          <svg width="10" height="10" viewBox="0 0 10 10" fill="none" className="shrink-0">
            <path d={svgPaths.p29f60cc0} fill="currentColor" className="text-[#151515] group-hover:text-white" />
          </svg>
        </Link>
      </div>

      {/* ── Scroll track with flanking arrows ── */}
      <div className="relative">

        {/* Left arrow */}
        <button
          onClick={() => scrollCards("left")}
          aria-label="Previous retreat"
          className="absolute left-3 lg:left-6 top-1/2 -translate-y-[60%] z-30 w-11 h-11 lg:w-[52px] lg:h-[52px] rounded-full bg-white shadow-[0_4px_20px_rgba(0,0,0,0.14)] flex items-center justify-center hover:bg-[#c3dbc5] transition-colors shrink-0"
        >
          <svg width="14" height="14" viewBox="0 0 40 40" fill="none" className="rotate-90">
            <path d={svgPaths.p17b45500} fill="#151515" />
          </svg>
        </button>

        {/* Card track — overflow-x-hidden clips the duplicated items */}
        <div
          ref={scrollRef}
          className="flex gap-4 lg:gap-8 overflow-x-hidden px-4 sm:px-6 lg:px-10 pb-4"
          style={{ scrollbarWidth: "none" }}
          onMouseEnter={() => { isPaused.current = true;  }}
          onMouseLeave={() => { isPaused.current = false; }}
        >
          {/* Render cards twice for seamless infinite loop */}
          {[...upcoming, ...upcoming].map((retreat, i) => (
            <RetreatScrollCard key={`${retreat.href}-${i}`} retreat={retreat} />
          ))}
        </div>

        {/* Right arrow */}
        <button
          onClick={() => scrollCards("right")}
          aria-label="Next retreat"
          className="absolute right-3 lg:right-6 top-1/2 -translate-y-[60%] z-30 w-11 h-11 lg:w-[52px] lg:h-[52px] rounded-full bg-white shadow-[0_4px_20px_rgba(0,0,0,0.14)] flex items-center justify-center hover:bg-[#c3dbc5] transition-colors shrink-0"
        >
          <svg width="14" height="14" viewBox="0 0 40 40" fill="none" className="-rotate-90">
            <path d={svgPaths.p17b45500} fill="#151515" />
          </svg>
        </button>

      </div>
    </section>
  );
}

// ─── TEAM ─────────────────────────────────────────────────────────────────────

function InstructorsSection() {
  // First 3 teachers listed in Sanity, else the built-in three.
  const { teachers } = useCms();
  const instructors = teachers
    ? teachers.filter((t) => t.listed).slice(0, 3).map((t, i) => ({ name: t.name, role: t.title, img: t.photo ?? INSTRUCTORS[i % INSTRUCTORS.length].img }))
    : INSTRUCTORS;

  return (
    <section className="py-12 sm:py-16 lg:py-[120px] px-4 sm:px-6 lg:px-10">
      <div className="max-w-[1280px] mx-auto flex flex-col gap-10 lg:gap-[70px]">
        {/* Header */}
        <div className="flex flex-col items-center gap-4 lg:gap-6 text-center">
          <SectionBadge text="Meet our team" />
          <h2 className="font-['Marcellus:Regular',sans-serif] text-[#151515] text-[26px] sm:text-[38px] lg:text-[60px] leading-[1.1] tracking-[-1px] lg:tracking-[-2px]">
            Meet the People{" "}
            <span className="font-['Playfair_Display:Italic',sans-serif] text-[#074240]">Who Make It Sacred</span>
          </h2>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-[30px]">
          {instructors.map((inst) => (
            <div key={inst.name} className="bg-white rounded-[16px] lg:rounded-[20px] overflow-hidden flex flex-col p-5 lg:p-[30px] gap-5 lg:gap-[30px]">
              {/* Name & role */}
              <div>
                <p className="font-['Marcellus:Regular',sans-serif] text-[#151515] text-[20px] lg:text-[32px] leading-[1.3] tracking-[-0.5px] lg:tracking-[-1px]">
                  {inst.name}
                </p>
                <p className="font-['Marcellus:Regular',sans-serif] text-[#074240] text-[13px] lg:text-[16px] leading-[1.5]">
                  {inst.role}
                </p>
              </div>
              {/* Photo */}
              <div className="w-full aspect-[4/3] rounded-[12px] overflow-hidden">
                <img src={inst.img} alt={inst.name} loading="lazy" decoding="async" className="w-full h-full object-cover object-top" />
              </div>
              {/* Footer */}
              <div className="flex items-center justify-between">
                {/* Social */}
                <div className="flex gap-2">
                  {["F", "in", "ig"].map((s, idx) => (
                    <div key={s} className="w-9 h-9 lg:w-[45px] lg:h-[45px] bg-[#FAE1FB] rounded-full flex items-center justify-center cursor-pointer hover:bg-[#e8c5e9] transition-colors">
                      {idx === 0 && <svg width="8" height="14" viewBox="0 0 45 45" fill="none"><path d={svgPaths.p2da27080} fill="#151515" /></svg>}
                      {idx === 1 && <svg width="14" height="14" viewBox="0 0 45 45" fill="none"><path d={svgPaths.p3e749d00} fill="#151515" /></svg>}
                      {idx === 2 && <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                        <path d={svgPaths.p1211c900} fill="#151515" />
                        <path d={svgPaths.pf070500} fill="#151515" />
                        <path d={svgPaths.p1b2fe080} fill="#151515" />
                      </svg>}
                    </div>
                  ))}
                </div>
                {/* Open profile */}
                <Link to="/teachers" className="border border-[#151515] flex items-center gap-2 px-4 py-2 lg:px-[30px] lg:py-[16px] rounded-full cursor-pointer hover:bg-[#151515] hover:text-white transition-colors group">
                  <span className="font-['Lato:Medium',sans-serif] text-[12px] lg:text-[16px] text-[#1e1b1b] group-hover:text-white">Open Profile</span>
                  <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                    <path d={svgPaths.p29f60cc0} fill="currentColor" className="group-hover:text-white text-[#151515]" />
                  </svg>
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Meet the Team button */}
        <div className="flex justify-center">
          <GreenButton label="Meet the Team" />
        </div>
      </div>
    </section>
  );
}

// ─── COUNTDOWN ────────────────────────────────────────────────────────────────

// Defined outside any component so the reference is stable across renders
const RETREAT_TARGET_MS = new Date("2026-09-18T09:00:00").getTime();

function useCountdown() {
  const [time, setTime] = useState({ d: 0, h: 0, m: 0, s: 0 });
  useEffect(() => {
    const calc = () => {
      const diff = Math.max(0, RETREAT_TARGET_MS - Date.now());
      setTime({
        d: Math.floor(diff / 86400000),
        h: Math.floor((diff % 86400000) / 3600000),
        m: Math.floor((diff % 3600000) / 60000),
        s: Math.floor((diff % 60000) / 1000),
      });
    };
    calc();
    const id = setInterval(calc, 1000);
    return () => clearInterval(id);
  }, []);
  return time;
}

function CountdownSection() {
  const { d, h, m, s } = useCountdown();

  const units = [
    { value: d, label: "Days" },
    { value: h, label: "Hrs" },
    { value: m, label: "Mins" },
    { value: s, label: "Secs" },
  ];

  return (
    <section className="px-4 sm:px-6 lg:px-10 py-4">
      <div className="relative w-full rounded-[16px] lg:rounded-[20px] overflow-hidden py-16 sm:py-20 lg:py-[150px] flex items-center justify-center">
        <img src={imgFrame1000007885} alt="" loading="lazy" decoding="async" className="absolute inset-0 w-full h-full object-cover" />
        <img src={imgFrame1000007867} alt="" loading="lazy" decoding="async" className="absolute inset-0 w-full h-full object-cover mix-blend-lighten opacity-85" />

        <div className="relative z-10 flex flex-col items-center gap-8 lg:gap-[50px] px-4 text-center">
          <div className="flex flex-col items-center gap-2 lg:gap-4">
            <p className="font-['Marcellus:Regular',sans-serif] text-[#151515] text-[24px] sm:text-[36px] lg:text-[60px] leading-[1.1] tracking-[-1px] lg:tracking-[-2px]">
              Join Us at
            </p>
            <p className="font-['Playfair_Display:Italic',sans-serif] text-[#074240] text-[24px] sm:text-[36px] lg:text-[60px] leading-[1.1] tracking-[-1px] lg:tracking-[-2px]">
              Whispers of Stillness
            </p>
            <p className="font-['Marcellus:Regular',sans-serif] text-[#151515] text-[24px] sm:text-[36px] lg:text-[60px] leading-[1.1] tracking-[-1px] lg:tracking-[-2px]">
              Retreat
            </p>
          </div>

          {/* Timer */}
          <div className="flex items-end gap-3 sm:gap-5 lg:gap-[40px]">
            {units.map((unit, i) => (
              <div key={unit.label} className="flex items-end gap-3 sm:gap-5 lg:gap-[40px]">
                <div className="flex flex-col items-center gap-2 lg:gap-[15px]">
                  <p className="font-['Playfair_Display:Italic',sans-serif] text-[#151515] text-[40px] sm:text-[60px] lg:text-[100px] leading-[1] tracking-[-2px] lg:tracking-[-5px]">
                    {String(unit.value).padStart(2, "0")}
                  </p>
                  <p className="font-['Lato:SemiBold',sans-serif] text-[#151515] text-[10px] lg:text-[12px] tracking-[1px] uppercase">
                    {unit.label}
                  </p>
                </div>
                {i < 3 && (
                  <p className="font-['Marcellus:Regular',sans-serif] text-[#151515] text-[24px] sm:text-[40px] lg:text-[60px] leading-[1] pb-6 lg:pb-8">
                    :
                  </p>
                )}
              </div>
            ))}
          </div>

          <ArrowCircleButton label="Book Your Spot" />
        </div>
      </div>
    </section>
  );
}

// ─── TESTIMONIALS ─────────────────────────────────────────────────────────────

function TestimonialsSection() {
  return (
    <section className="py-12 sm:py-16 lg:py-[120px] px-4 sm:px-6 lg:px-10">
      <div className="max-w-[1280px] mx-auto flex flex-col gap-10 lg:gap-[70px]">
        {/* Heading */}
        <h2 className="font-['Marcellus:Regular',sans-serif] text-[#151515] text-[26px] sm:text-[38px] lg:text-[60px] text-center leading-[1.1] tracking-[-1px] lg:tracking-[-2px]">
          Stories of{" "}
          <span className="font-['Playfair_Display:Italic',sans-serif] text-[#074240]">Stillness & Transformation</span>
        </h2>

        {/* Masonry — 1 col mobile, 2 col tablet, 3 col desktop */}
        <div className="columns-1 sm:columns-2 lg:columns-3 gap-4 lg:gap-[40px]">
          <ReviewCard review={REVIEWS[0]} />
          <VideoCard src={VIDEO_THUMBS[0]} />
          <ReviewCard review={REVIEWS[3]} />
          <ReviewCard review={REVIEWS[1]} />
          <ReviewCard review={REVIEWS[4]} />
          <VideoCard src={VIDEO_THUMBS[1]} />
          <ReviewCard review={REVIEWS[2]} />
          <ReviewCard review={REVIEWS[5]} />
          <ReviewCard review={REVIEWS[6]} />
        </div>

        <div className="flex justify-center">
          <GreenButton label="More Reviews" />
        </div>
      </div>
    </section>
  );
}

// ─── GALLERY ──────────────────────────────────────────────────────────────────

function GallerySection() {
  return (
    <section className="py-4 px-4 sm:px-6 lg:px-10">
      <div className="flex flex-col gap-3 lg:gap-5">
        {/* Row 1 — 3 columns, middle one has overlay text */}
        <div className="grid grid-cols-3 gap-3 lg:gap-5">
          {GALLERY_ROW1.map((img, i) => (
            <div
              key={i}
              className="relative rounded-[12px] lg:rounded-[20px] overflow-hidden aspect-[3/4] sm:aspect-[4/3]"
            >
              <img src={img} alt="" loading="lazy" decoding="async" style={{ willChange: "transform" }} className="absolute inset-0 w-full h-full object-cover" />
              {i === 1 && (
                <div className="absolute inset-0 flex flex-col items-center justify-center bg-white/20 backdrop-blur-[2px] p-4 text-center">
                  <p className="font-['Marcellus:Regular',sans-serif] text-[#074240] text-[10px] sm:text-[12px] lg:text-[18px] tracking-[1px] uppercase mb-2">
                    Photo gallery
                  </p>
                  <p className="font-['Marcellus:Regular',sans-serif] text-[#151515] text-[16px] sm:text-[22px] lg:text-[46px] leading-[1.1] tracking-[-0.5px] lg:tracking-[-2px]">
                    Retreat Life
                  </p>
                  <p className="font-['Marcellus:Regular',sans-serif] text-[#151515] text-[16px] sm:text-[22px] lg:text-[46px] leading-[1.1] tracking-[-0.5px] lg:tracking-[-2px]">
                    in Photos
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Row 2 — 4 columns */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 lg:gap-5">
          {GALLERY_ROW2.map((img, i) => (
            <div key={i} className="relative rounded-[12px] lg:rounded-[20px] overflow-hidden aspect-[3/4] sm:aspect-[4/3]">
              <img src={img} alt="" loading="lazy" decoding="async" style={{ willChange: "transform" }} className="absolute inset-0 w-full h-full object-cover" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── WELLNESS ─────────────────────────────────────────────────────────────────

function WellnessSection() {
  const [expanded, setExpanded] = useState<string>("tension");

  return (
    <section className="py-12 sm:py-16 lg:py-[120px] px-4 sm:px-6 lg:px-10">
      <div className="max-w-[1280px] mx-auto flex flex-col gap-8 lg:gap-[60px]">
        {/* Header row */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="flex flex-col gap-4 lg:gap-[30px]">
            <SectionBadge text="How We Support Your Healing" />
            <h2 className="font-['Marcellus:Regular',sans-serif] text-[#151515] text-[24px] sm:text-[36px] lg:text-[60px] leading-[1.1] tracking-[-0.5px] lg:tracking-[-2px]">
              Supporting Your Journey
              <br />
              <span className="font-['Playfair_Display:Italic',sans-serif] text-[#074240]">Back to Balance.</span>
            </h2>
          </div>
          <img src={imgVector1} alt="" loading="lazy" decoding="async" className="w-[60px] h-[60px] lg:w-[120px] lg:h-[120px] shrink-0 self-start sm:self-center" />
        </div>

        {/* Content */}
        <div className="flex flex-col lg:flex-row items-start gap-8 lg:gap-[120px]">
          {/* Accordion */}
          <div className="flex flex-col gap-3 lg:gap-[15px] w-full lg:w-[600px] lg:shrink-0">
            {CONDITIONS.map((c) => (
              <div key={c.id}>
                {c.id === expanded ? (
                  <div className="bg-[#c3dbc5] rounded-[10px] px-5 lg:px-[30px] py-5 lg:py-[35px]">
                    <div
                      className="flex items-center justify-between cursor-pointer"
                      onClick={() => setExpanded("")}
                    >
                      <p className="font-['Marcellus:Regular',sans-serif] text-[#151515] text-[16px] sm:text-[20px] lg:text-[32px] tracking-[-0.5px] lg:tracking-[-1px] leading-[1.3]">
                        {c.label}
                      </p>
                      <svg width="14" height="8" viewBox="0 0 18.24 10.62" fill="none" className="shrink-0 rotate-180">
                        <path d={svgPaths.p22282f80} stroke="#151515" strokeLinecap="square" strokeLinejoin="round" strokeWidth="3" />
                      </svg>
                    </div>
                    {c.desc && (
                      <p className="font-['Lato:Regular',sans-serif] text-[#151515] text-[13px] lg:text-[18px] leading-[1.7] mt-4">
                        {c.desc}
                      </p>
                    )}
                  </div>
                ) : (
                  <div
                    className="bg-white rounded-[10px] px-5 lg:px-[30px] py-4 lg:py-[35px] flex items-center justify-between cursor-pointer hover:bg-[#f0f7f0] transition-colors"
                    onClick={() => setExpanded(c.id)}
                  >
                    <p className="font-['Marcellus:Regular',sans-serif] text-[#151515] text-[16px] sm:text-[20px] lg:text-[32px] tracking-[-0.5px] lg:tracking-[-1px] leading-[1.3]">
                      {c.label}
                    </p>
                    <svg width="14" height="8" viewBox="0 0 18.24 10.62" fill="none" className="shrink-0">
                      <path d={svgPaths.p22282f80} stroke="#074240" strokeLinecap="square" strokeLinejoin="round" strokeWidth="3" />
                    </svg>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Image */}
          <div className="w-full lg:flex-1">
            <div className="w-full h-[300px] sm:h-[420px] lg:h-[709px] overflow-hidden rounded-t-[16px] lg:rounded-t-[20px] rounded-b-[120px] sm:rounded-b-[200px] lg:rounded-b-[300px]">
              <img src={imgHome3} alt="Wellness" loading="lazy" decoding="async" className="w-full h-full object-cover object-center" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── BOOKING FORM ─────────────────────────────────────────────────────────────

function BookingSection() {
  const navigate = useNavigate();
  const { retreats } = useCms();
  const retreatOptions = retreats
    ? retreats.map((r) => ({ label: `${r.name} – ${r.location}`, value: r.slug }))
    : [
        { label: "Roots of Stillness – Tuscany",     value: "roots-of-stillness"  },
        { label: "Sacred Flow – Bali",               value: "sacred-flow"         },
        { label: "Awaken in the Wild – Costa Rica",  value: "awaken-in-the-wild"  },
        { label: "Winter of Presence – Finland",     value: "winter-of-presence"  },
        { label: "The Inner Horizon – Sedona",       value: "the-inner-horizon"   },
      ];
  const [retreat, setRetreat] = useState("");
  const [sending, setSending] = useState(false);
  const [sendError, setSendError] = useState<string | null>(null);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const data = Object.fromEntries(fd.entries()) as Record<string, string>;
    if (!data.name?.trim() || !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(data.email ?? "")) {
      setSendError("Please enter your name and a valid email address.");
      return;
    }
    setSending(true); setSendError(null);
    const res = await submitForm("Retreat booking (homepage)", { ...data, retreat, botcheck: fd.has("botcheck") });
    setSending(false);
    if (res.ok) navigate("/thank-you"); else setSendError(res.error);
  };

  return (
    <section className="py-12 sm:py-16 lg:py-[120px] px-4 sm:px-6 lg:px-10">
      <div className="max-w-[1280px] mx-auto flex flex-col lg:flex-row items-stretch gap-8 lg:gap-[120px]">
        {/* Image — hidden on mobile, shown on tablet+ */}
        <div className="hidden md:block w-full lg:w-[560px] lg:shrink-0">
          <div className="w-full h-[360px] lg:h-[709px] overflow-hidden rounded-b-[16px] lg:rounded-b-[20px] rounded-t-[120px] sm:rounded-t-[200px] lg:rounded-t-[300px]">
            <img src={imgHome4} alt="Booking" loading="lazy" decoding="async" className="w-full h-full object-cover object-center scale-x-[-1]" />
          </div>
        </div>

        {/* Form */}
        <div className="flex-1 flex flex-col justify-center gap-8 lg:gap-[60px]">
          <div className="flex flex-col gap-4 lg:gap-[30px]">
            <SectionBadge text="Book your spot" />
            <h2 className="font-['Marcellus:Regular',sans-serif] text-[#151515] text-[26px] sm:text-[38px] lg:text-[60px] leading-[1.1] tracking-[-0.5px] lg:tracking-[-2px]">
              Reserve Your Place{" "}
              <span className="font-['Playfair_Display:Italic',sans-serif] text-[#074240]">on the Retreat</span>
            </h2>
          </div>

          <form className="flex flex-col gap-3 lg:gap-[15px]" onSubmit={onSubmit} noValidate>
            <input
              type="text"
              name="name"
              autoComplete="name"
              required
              aria-label="Your name"
              placeholder="Your Name"
              className="w-full bg-white rounded-[30px] px-5 lg:px-[25px] py-3 lg:py-4 font-['Lato:Regular',sans-serif] text-[#434a4a] text-[14px] lg:text-[16px] outline-none focus:ring-2 focus:ring-[#c3dbc5]"
            />
            <div className="flex gap-3 lg:gap-[15px]">
              <input
                type="tel"
                name="phone"
                autoComplete="tel"
                aria-label="Your phone"
                placeholder="Your Phone"
                className="flex-1 bg-white rounded-[30px] px-5 lg:px-[25px] py-3 lg:py-4 font-['Lato:Regular',sans-serif] text-[#434a4a] text-[14px] lg:text-[16px] outline-none focus:ring-2 focus:ring-[#c3dbc5]"
              />
              <input
                type="email"
                name="email"
                autoComplete="email"
                required
                aria-label="Your email"
                placeholder="Your Email"
                className="flex-1 bg-white rounded-[30px] px-5 lg:px-[25px] py-3 lg:py-4 font-['Lato:Regular',sans-serif] text-[#434a4a] text-[14px] lg:text-[16px] outline-none focus:ring-2 focus:ring-[#c3dbc5]"
              />
            </div>
            <SelectMenu
              value={retreat}
              onChange={setRetreat}
              placeholder="Choose a Retreat"
              triggerClassName="bg-white rounded-[30px] px-5 lg:px-[25px] py-3 lg:py-4 font-['Lato:Regular',sans-serif] text-[14px] lg:text-[16px]"
              options={retreatOptions}
            />
            <input
              type="date"
              name="date"
              aria-label="Preferred date"
              placeholder="Select Date"
              className="w-full bg-white rounded-[30px] px-5 lg:px-[25px] py-3 lg:py-4 font-['Lato:Regular',sans-serif] text-[#434a4a] text-[14px] lg:text-[16px] outline-none focus:ring-2 focus:ring-[#c3dbc5]"
            />
            <Honeypot />
            <FormError message={sendError} />
            <button
              type="submit"
              disabled={sending}
              className="w-full bg-[#c3dbc5] rounded-[30px] py-3 lg:py-[18px] font-['Lato:Medium',sans-serif] text-[#151515] text-[14px] lg:text-[16px] text-center cursor-pointer hover:bg-[#a8d0ac] transition-colors mt-1 disabled:opacity-60"
            >
              {sending ? "Sending…" : "Book Your Spot"}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}


// ─── MAIN EXPORT ──────────────────────────────────────────────────────────────

export default function YogaLandingPage() {
  return (
    <main>
      <HeroSection />
      <WelcomeSection />
      <NextRetreatSection />
      <WhatsIncludedSection />
      <AboutSection />
      <StatsSection />
      <UpcomingRetreatsSection />
      <InstructorsSection />
      <CountdownSection />
      <TestimonialsSection />
      <GallerySection />
      <WellnessSection />
      <BookingSection />
    </main>
  );
}