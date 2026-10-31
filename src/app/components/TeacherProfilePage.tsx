import NotFoundPage from "./NotFoundPage";
import { usePageMeta, useJsonLd, absUrl, SITE } from "./SiteExtras";
import { useParams, Link } from "react-router";
import { useMemo } from "react";
import { useCms } from "../cms/useCms";
import svgPaths from "../../imports/svg-wqhud5k8ta";
import { placeholder, LCP } from "./imagePlaceholder";

const imgTexture = placeholder("imgTexture");
const imgArticle1 = placeholder("imgArticle1");
const imgArticle2 = placeholder("imgArticle2");
const imgTeacher1 = placeholder("imgTeacher1");
const imgTeacher2 = placeholder("imgTeacher2");
const imgTeacher3 = placeholder("imgTeacher3");
const imgTeacher4 = placeholder("imgTeacher4");
const imgTeacher5 = placeholder("imgTeacher5");
const imgTeacher6 = placeholder("imgTeacher6");

// ─────────────────────────────────────────────────────────────────────────────
// Teacher data
// ─────────────────────────────────────────────────────────────────────────────

// Built-in content — shown when Sanity has no published teachers (and used to seed Sanity).
export const TEACHERS = [
  // ── Real faculty (linked from /teachers). Verify education / cert / shifts — see Manual_Launch_Tasks.md ──
  {
    slug:        "raj-singh",
    name:        "Raj Singh",
    firstName:   "Raj",
    title:       "Hatha & Ashtanga Teacher",
    photo:       imgTeacher1,
    phone:       "+91 74558 55666",
    office:      "+91 74558 55666",
    email:       "info@shivayoganiketan.com",
    bio1:        "Raj leads the daily Hatha and Ashtanga practice at Shiva Yoga Niketan. His classes focus on precise alignment, steady breath and building the strength and discipline that a lifelong practice needs — always taught in the traditional way, step by step.",
    bio2:        "Outside the shala Raj enjoys early-morning walks along the Ganges and time in the Himalayan foothills, and believes that a calm, simple daily routine is the foundation of every good practice.",
    education:   "Traditional yoga training, Rishikesh (to be confirmed)",
    cert:        "Yoga Alliance (to be confirmed)",
    expertise:   "Hatha & Ashtanga Yoga",
    experience:  "Senior faculty at Shiva Yoga Niketan",
    shifts:      [
      { day: "Monday",    time: "09:00 – 14:00" },
      { day: "Wednesday", time: "10:00 – 15:00" },
      { day: "Friday",    time: "08:00 – 13:00" },
      { day: "Tuesday",   time: "11:00 – 16:00" },
      { day: "Thursday",  time: "09:00 – 14:00" },
      { day: "Saturday",  time: "07:00 – 12:00" },
    ],
    art1Title:   "Yoga Breathwork for Stress and Anxiety Relief",
    art1Tag:     "Wellness",
    art1Img:     imgArticle1,
    art2Title:   "Three Years Post Injury: Persistence and Progress",
    art2Tag:     "Recovery",
    art2Img:     imgArticle2,
  },
  {
    slug:        "gokul-bisht",
    name:        "Gokul Bisht",
    firstName:   "Gokul",
    title:       "Anatomy & Physiology Teacher",
    photo:       imgTeacher2,
    phone:       "+91 74558 55666",
    office:      "+91 74558 55666",
    email:       "info@shivayoganiketan.com",
    bio1:        "Gokul teaches the anatomy and physiology modules of our teacher training courses. He helps students understand how the body moves in each asana, how to practise safely, and how to adapt postures for different bodies and abilities.",
    bio2:        "His classes connect modern anatomy with traditional yogic knowledge, so that students leave able to teach with both confidence and care.",
    education:   "Traditional yoga training, Rishikesh (to be confirmed)",
    cert:        "Yoga Alliance (to be confirmed)",
    expertise:   "Yoga Anatomy & Physiology",
    experience:  "Senior faculty at Shiva Yoga Niketan",
    shifts:      [
      { day: "Monday",    time: "09:00 – 14:00" },
      { day: "Wednesday", time: "10:00 – 15:00" },
      { day: "Friday",    time: "08:00 – 13:00" },
      { day: "Tuesday",   time: "11:00 – 16:00" },
      { day: "Thursday",  time: "09:00 – 14:00" },
      { day: "Saturday",  time: "07:00 – 12:00" },
    ],
    art1Title:   "Yoga Breathwork for Stress and Anxiety Relief",
    art1Tag:     "Wellness",
    art1Img:     imgArticle1,
    art2Title:   "Three Years Post Injury: Persistence and Progress",
    art2Tag:     "Recovery",
    art2Img:     imgArticle2,
  },
  {
    slug:        "shashank-badoni",
    name:        "Shashank Badoni",
    firstName:   "Shashank",
    title:       "Eclectic Philosopher · Guest Faculty",
    photo:       imgTeacher3,
    phone:       "+91 74558 55666",
    office:      "+91 74558 55666",
    email:       "info@shivayoganiketan.com",
    bio1:        "Shashank joins Shiva Yoga Niketan as guest faculty for yoga philosophy. His lectures explore the Yoga Sutras of Patanjali, the Bhagavad Gita and the wider Vedic tradition, and how their teachings apply to modern life.",
    bio2:        "Known for lively discussion and open questions, he encourages students to think deeply and experience philosophy as a living practice rather than theory.",
    education:   "Traditional yoga training, Rishikesh (to be confirmed)",
    cert:        "Yoga Alliance (to be confirmed)",
    expertise:   "Yoga Philosophy",
    experience:  "Senior faculty at Shiva Yoga Niketan",
    shifts:      [
      { day: "Monday",    time: "09:00 – 14:00" },
      { day: "Wednesday", time: "10:00 – 15:00" },
      { day: "Friday",    time: "08:00 – 13:00" },
      { day: "Tuesday",   time: "11:00 – 16:00" },
      { day: "Thursday",  time: "09:00 – 14:00" },
      { day: "Saturday",  time: "07:00 – 12:00" },
    ],
    art1Title:   "Yoga Breathwork for Stress and Anxiety Relief",
    art1Tag:     "Wellness",
    art1Img:     imgArticle1,
    art2Title:   "Three Years Post Injury: Persistence and Progress",
    art2Tag:     "Recovery",
    art2Img:     imgArticle2,
  },
  {
    slug:        "gopal",
    name:        "Gopal",
    firstName:   "Gopal",
    title:       "Hatha Yoga Master",
    photo:       imgTeacher4,
    phone:       "+91 74558 55666",
    office:      "+91 74558 55666",
    email:       "info@shivayoganiketan.com",
    bio1:        "Gopal is a Hatha Yoga master whose teaching draws on the classical texts, including the Hatha Yoga Pradipika. His classes combine asana, pranayama, shatkarma and meditation as one complete, integrated practice.",
    bio2:        "Patient and grounded, he guides students of every level to find steadiness and ease in their practice.",
    education:   "Traditional yoga training, Rishikesh (to be confirmed)",
    cert:        "Yoga Alliance (to be confirmed)",
    expertise:   "Traditional Hatha Yoga",
    experience:  "Senior faculty at Shiva Yoga Niketan",
    shifts:      [
      { day: "Monday",    time: "09:00 – 14:00" },
      { day: "Wednesday", time: "10:00 – 15:00" },
      { day: "Friday",    time: "08:00 – 13:00" },
      { day: "Tuesday",   time: "11:00 – 16:00" },
      { day: "Thursday",  time: "09:00 – 14:00" },
      { day: "Saturday",  time: "07:00 – 12:00" },
    ],
    art1Title:   "Yoga Breathwork for Stress and Anxiety Relief",
    art1Tag:     "Wellness",
    art1Img:     imgArticle1,
    art2Title:   "Three Years Post Injury: Persistence and Progress",
    art2Tag:     "Recovery",
    art2Img:     imgArticle2,
  },
  // ── Template profiles below (still linked from Program pages) ──
  {
    slug:        "angela-carbone",
    name:        "Angela Carbone",
    firstName:   "Angela",
    title:       "Yoga Teacher & Therapist",
    photo:       imgTeacher1,
    phone:       "+91 74558 55666",
    office:      "+91 74558 55666",
    email:       "angela@shivayoganiketan.com",
    bio1:        "I enjoy getting to know my students and building meaningful relationships. I understand that each person is unique and that they have diverse cultural backgrounds, so I strive to actively listen and empower them to be an advocate for the health and wellness goals that are important to them. I'm dedicated to providing compassionate and individualized care through patient education and evidence-based yoga therapy.",
    bio2:        "I find joy by doing almost any outdoor activity, including hiking, running, and exploring with our furbabies. I enjoy spending time with family and friends. I also strive to live mindfully and intentionally by creating uplifting routines and relaxing rituals.",
    education:   "University of Virginia, M.D. of Medicine",
    cert:        "National Commission on Certification of Physician Assistants",
    expertise:   "Vinyasa Flow & Therapeutic Yoga",
    experience:  "25 years of experience",
    shifts:      [
      { day: "Monday",    time: "09:00 – 14:00" },
      { day: "Wednesday", time: "10:00 – 15:00" },
      { day: "Friday",    time: "08:00 – 13:00" },
      { day: "Tuesday",   time: "11:00 – 16:00" },
      { day: "Thursday",  time: "09:00 – 14:00" },
      { day: "Saturday",  time: "07:00 – 12:00" },
    ],
    art1Title:   "Yoga Breathwork for Stress and Anxiety Relief",
    art1Tag:     "Wellness",
    art1Img:     imgArticle1,
    art2Title:   "Three Years Post Injury: Persistence and Progress",
    art2Tag:     "Recovery",
    art2Img:     imgArticle2,
  },
  {
    slug:        "meghan-conner",
    name:        "Meghan Conner",
    firstName:   "Meghan",
    title:       "Yoga Teacher & Therapist",
    photo:       imgTeacher2,
    phone:       "+(012) 4567-890",
    office:      "+(012) 4567-891",
    email:       "meghan@shivayoganiketan.com",
    bio1:        "My yoga journey began in my early twenties during a period of significant personal change. Through consistent practice I discovered how much yoga could offer beyond physical flexibility — it became my anchor in mindfulness and self-compassion. I now bring that transformative power to each of my students, guiding them with patience and warmth.",
    bio2:        "Outside the studio, I love swimming, cooking plant-based meals, and reading. I believe that everything we do off the mat informs our practice, and I encourage my students to cultivate curiosity in every area of their lives.",
    education:   "Kripalu School of Yoga & Health, RYT-500",
    cert:        "Yoga Alliance – E-RYT 500, YACEP",
    expertise:   "Restorative Yoga & Mindful Movement",
    experience:  "18 years of experience",
    shifts:      [
      { day: "Tuesday",   time: "08:00 – 13:00" },
      { day: "Thursday",  time: "09:00 – 14:00" },
      { day: "Saturday",  time: "07:00 – 12:00" },
      { day: "Monday",    time: "10:00 – 15:00" },
      { day: "Wednesday", time: "11:00 – 16:00" },
      { day: "Friday",    time: "08:30 – 13:30" },
    ],
    art1Title:   "Restorative Yoga: Healing the Nervous System",
    art1Tag:     "Mindfulness",
    art1Img:     imgArticle2,
    art2Title:   "The Role of Breathwork in Emotional Balance",
    art2Tag:     "Wellness",
    art2Img:     imgArticle1,
  },
  {
    slug:        "sofia-renner",
    name:        "Sofia Renner",
    firstName:   "Sofia",
    title:       "Yoga Teacher & Therapist",
    photo:       imgTeacher3,
    phone:       "+(012) 5678-901",
    office:      "+(012) 5678-902",
    email:       "sofia@shivayoganiketan.com",
    bio1:        "My practice is rooted in the Iyengar tradition, which emphasises precision, alignment, and the use of props to bring the full benefits of postures to every body. I love working with students of all abilities, adapting my teaching to meet each person exactly where they are — whether beginners or experienced practitioners.",
    bio2:        "When I am not teaching, you will find me in my garden, practising tai chi at sunrise, or writing about holistic health. I believe that stillness is one of the most radical acts of self-care, and I strive to create that space for every student.",
    education:   "BKS Iyengar Yoga Institute, Pune – Certified Teacher",
    cert:        "International Yoga Teachers Association – Certified Instructor",
    expertise:   "Iyengar Yoga & Somatic Therapy",
    experience:  "21 years of experience",
    shifts:      [
      { day: "Monday",    time: "07:00 – 12:00" },
      { day: "Wednesday", time: "08:00 – 13:00" },
      { day: "Friday",    time: "10:00 – 15:00" },
      { day: "Tuesday",   time: "09:00 – 14:00" },
      { day: "Thursday",  time: "11:00 – 16:00" },
      { day: "Saturday",  time: "08:00 – 11:00" },
    ],
    art1Title:   "Alignment First: Why Iyengar Yoga Changes Everything",
    art1Tag:     "Technique",
    art1Img:     imgArticle1,
    art2Title:   "Somatic Practices to Release Stored Trauma",
    art2Tag:     "Healing",
    art2Img:     imgArticle2,
  },
  {
    slug:        "lena-hart",
    name:        "Lena Hart",
    firstName:   "Lena",
    title:       "Yoga Teacher & Therapist",
    photo:       imgTeacher4,
    phone:       "+(012) 6789-012",
    office:      "+(012) 6789-013",
    email:       "lena@shivayoganiketan.com",
    bio1:        "I came to yoga through dance, and that background informs the fluid, expressive way I teach. My classes feel more like moving meditations than structured exercise sessions. I want each student to find their own rhythm and trust their body's inner wisdom.",
    bio2:        "In my free time I choreograph community dance events, paint watercolours, and walk barefoot along the coast whenever I can. Nature is my greatest teacher, and I try to weave its rhythms into every class I lead.",
    education:   "Chopra Center for Wellbeing – Primordial Sound Meditation",
    cert:        "Yoga Alliance – RYT-500, Prenatal Yoga Certified",
    expertise:   "Dance-Informed Yoga & Prenatal Yoga",
    experience:  "14 years of experience",
    shifts:      [
      { day: "Wednesday", time: "09:00 – 14:00" },
      { day: "Friday",    time: "08:00 – 13:00" },
      { day: "Sunday",    time: "10:00 – 13:00" },
      { day: "Monday",    time: "07:30 – 12:30" },
      { day: "Thursday",  time: "10:00 – 15:00" },
      { day: "Saturday",  time: "09:00 – 12:00" },
    ],
    art1Title:   "Yoga for Expectant Mothers: A Gentle Guide",
    art1Tag:     "Prenatal",
    art1Img:     imgArticle2,
    art2Title:   "How Dance and Yoga Unlock Creative Expression",
    art2Tag:     "Movement",
    art2Img:     imgArticle1,
  },
  {
    slug:        "maya-tran",
    name:        "Maya Tran",
    firstName:   "Maya",
    title:       "Yoga Teacher & Therapist",
    photo:       imgTeacher5,
    phone:       "+(012) 7890-123",
    office:      "+(012) 7890-124",
    email:       "maya@shivayoganiketan.com",
    bio1:        "Growing up immersed in two cultures taught me how powerful it is to find common ground through shared practices. Yoga gave me that bridge. My teaching draws on classical Hatha roots while integrating modern anatomy and trauma-sensitive principles.",
    bio2:        "Outside the mat I am passionate about herbalism, sound healing, and community building. I host monthly women's circles and seasonal fire ceremonies that help people reconnect with themselves and each other in deeply meaningful ways.",
    education:   "Sivananda Yoga Vedanta Centre – Advanced Teachers Training",
    cert:        "Trauma-Sensitive Yoga Facilitator – TCTSY",
    expertise:   "Hatha Yoga & Trauma-Sensitive Practice",
    experience:  "16 years of experience",
    shifts:      [
      { day: "Monday",    time: "06:30 – 11:30" },
      { day: "Wednesday", time: "09:00 – 14:00" },
      { day: "Friday",    time: "07:00 – 12:00" },
      { day: "Tuesday",   time: "10:00 – 15:00" },
      { day: "Thursday",  time: "08:00 – 13:00" },
      { day: "Saturday",  time: "07:00 – 10:00" },
    ],
    art1Title:   "Trauma-Sensitive Yoga: Creating Safety in the Body",
    art1Tag:     "Healing",
    art1Img:     imgArticle1,
    art2Title:   "Sound Healing and the Parasympathetic System",
    art2Tag:     "Wellness",
    art2Img:     imgArticle2,
  },
  {
    slug:        "priya-sharma",
    name:        "Priya Sharma",
    firstName:   "Priya",
    title:       "Yoga Teacher & Therapist",
    photo:       imgTeacher6,
    phone:       "+(012) 8901-234",
    office:      "+(012) 8901-235",
    email:       "priya@shivayoganiketan.com",
    bio1:        "My relationship with yoga started at age seven in Chennai, where I studied traditional Ashtanga under my grandmother's guidance. Those early years instilled in me a deep reverence for the practice as a whole life system — not just a physical discipline. I bring that reverence to every class I teach.",
    bio2:        "I am also a certified Ayurvedic nutrition consultant, and I love integrating dietary and lifestyle wisdom into my teachings. Real transformation happens when we align our bodies, minds, and daily habits with the natural world around us.",
    education:   "SVYASA University, Bangalore – Bachelor of Yogic Sciences",
    cert:        "Yoga Alliance – E-RYT 500 & Ayurvedic Wellness Counselor",
    expertise:   "Ashtanga Yoga & Ayurvedic Integration",
    experience:  "29 years of experience",
    shifts:      [
      { day: "Tuesday",   time: "07:00 – 12:00" },
      { day: "Thursday",  time: "08:00 – 13:00" },
      { day: "Saturday",  time: "06:30 – 11:30" },
      { day: "Monday",    time: "09:00 – 14:00" },
      { day: "Wednesday", time: "10:00 – 15:00" },
      { day: "Friday",    time: "07:30 – 12:30" },
    ],
    art1Title:   "Ashtanga Yoga: Discipline, Grace, and Inner Fire",
    art1Tag:     "Technique",
    art1Img:     imgArticle2,
    art2Title:   "Eat for Your Dosha: Ayurvedic Nutrition Basics",
    art2Tag:     "Nutrition",
    art2Img:     imgArticle1,
  },
];

// ────────────────────────────────────────────────────────────────────────────
// Small reusable pieces
// ─────────────────────────────────────────────────────────────────────────────

function Divider() {
  return <div className="w-full h-px bg-[#8b8a82] opacity-40 my-1" />;
}

function SocialRow() {
  return (
    <div className="flex gap-[7px] items-center">
      <div className="w-[46px] h-[46px] rounded-full bg-[#FAE1FB] flex items-center justify-center">
        <svg width="10" height="16" viewBox="0 0 46 46" fill="none">
          <path d={svgPaths.p77e9780} fill="#151515" />
        </svg>
      </div>
      <div className="w-[46px] h-[46px] rounded-full bg-[#FAE1FB] flex items-center justify-center">
        <svg width="18" height="18" viewBox="0 0 46 46" fill="none">
          <path d={svgPaths.p4db5c00} fill="#151515" />
          <path d={svgPaths.pc4e4500} fill="#151515" />
          <path d={svgPaths.p73fc900} fill="#151515" />
        </svg>
      </div>
      <div className="w-[46px] h-[46px] rounded-full bg-[#FAE1FB] flex items-center justify-center">
        <svg width="20" height="14" viewBox="0 0 46 46" fill="none">
          <path d={svgPaths.p38b6ae00} fill="#151515" />
        </svg>
      </div>
      <div className="w-[46px] h-[46px] rounded-full bg-[#C3DBC5] flex items-center justify-center">
        <svg width="16" height="14" viewBox="0 0 46 46" fill="none">
          <path d={svgPaths.p31ff3080} fill="#151515" />
        </svg>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Page component
// ─────────────────────────────────────────────────────────────────────────────

// ── Content source: Sanity when published, otherwise the built-in TEACHERS ──
type Teacher = (typeof TEACHERS)[number] & {
  bioParas?: string[]; art1Slug?: string; art2Slug?: string;
  seo?: { metaTitle?: string; metaDescription?: string };
};
const PHOTO_FALLBACKS = [imgTeacher1, imgTeacher2, imgTeacher3, imgTeacher4, imgTeacher5, imgTeacher6];

function useTeacherList(): Teacher[] {
  const { teachers, posts } = useCms();
  return useMemo(() => {
    if (!teachers) return TEACHERS;
    const tpl = TEACHERS[0];
    // "From the journal" cards: the two newest blog posts (or the built-in samples).
    const a1 = posts?.[0], a2 = posts?.[1];
    return teachers.map((t, i): Teacher => ({
      ...tpl,
      slug: t.slug, name: t.name, firstName: t.firstName, title: t.title,
      photo: t.photo ?? PHOTO_FALLBACKS[i % PHOTO_FALLBACKS.length],
      phone: t.phone || SITE.phoneDisplay, office: t.phone || SITE.phoneDisplay, email: t.email || SITE.email,
      bio1: t.bio[0] ?? "", bio2: t.bio[1] ?? "", bioParas: t.bio,
      education: t.education, cert: t.cert, expertise: t.expertise, experience: t.experience,
      shifts: t.shifts.length ? t.shifts : tpl.shifts,
      ...(a1 ? { art1Title: a1.title, art1Tag: a1.category, art1Img: a1.img ?? tpl.art1Img, art1Slug: a1.slug } : {}),
      ...(a2 ? { art2Title: a2.title, art2Tag: a2.category, art2Img: a2.img ?? tpl.art2Img, art2Slug: a2.slug } : {}),
      seo: t.seo,
    }));
  }, [teachers, posts]);
}

export default function TeacherProfilePage() {
  const params = useParams();
  const teachers = useTeacherList();
  // Unknown slug → real 404 (prevents "soft 404" duplicate pages in Google).
  if (!teachers.some((t) => t.slug === params.slug)) return <NotFoundPage />;
  return <TeacherProfile key={params.slug} slugParam={params.slug!} teachers={teachers} />;
}

function TeacherProfile({ slugParam, teachers }: { slugParam: string; teachers: Teacher[] }) {

  const idx   = teachers.findIndex((t) => t.slug === slugParam);
  const t     = teachers[idx >= 0 ? idx : 0];
  const prev  = idx > 0 ? teachers[idx - 1] : null;
  const next  = idx < teachers.length - 1 ? teachers[idx + 1] : null;

  usePageMeta({
    title: t.seo?.metaTitle || `${t.name} — ${t.title} | ${SITE.name}`,
    description: t.seo?.metaDescription || `Meet ${t.name}, ${t.title.toLowerCase()} at ${SITE.name} in Rishikesh, India. Learn about their background, teaching style and the courses they lead.`,
  });
  useJsonLd("syn-person-schema", {
    "@context": "https://schema.org",
    "@type": "Person",
    name: t.name,
    jobTitle: t.title,
    worksFor: { "@type": "Organization", name: SITE.name, url: SITE.url },
    url: absUrl(`/teachers/${t.slug}`),
  });

  return (
    <div className="bg-[#f8f3ed]">

      {/* ── Hero card ── */}
      <section className="px-4 sm:px-6 lg:px-10 pt-4 sm:pt-6">
        <div className="bg-white rounded-[20px] overflow-hidden flex flex-col md:flex-row min-h-[360px] lg:min-h-[520px]">

          {/* Left: info */}
          <div className="flex-1 flex flex-col justify-center px-6 sm:px-10 lg:px-[80px] py-10 lg:py-14 gap-6 lg:gap-10">
            <div className="flex flex-col gap-3 lg:gap-5">
              <span className="inline-flex self-start bg-[#c3dbc5] rounded-full px-3 py-1 font-['Lato:SemiBold',sans-serif] text-[#151515] text-[11px] lg:text-[12px] tracking-[1px] uppercase">
                {t.title}
              </span>
              <h1 className="font-['Marcellus:Regular',sans-serif] text-[#151515] text-[38px] sm:text-[56px] lg:text-[80px] xl:text-[90px] tracking-[-2px] lg:tracking-[-4px] leading-[1]">
                {t.name}
              </h1>
            </div>

            <div className="flex flex-col gap-2">
              <p className="font-['Lato:Regular',sans-serif] text-[#434a4a] text-[14px] lg:text-[18px] leading-[1.7]">Phone: {t.phone}</p>
              <Divider />
              <p className="font-['Lato:Regular',sans-serif] text-[#434a4a] text-[14px] lg:text-[18px] leading-[1.7]">Office: {t.office}</p>
              <Divider />
              <p className="font-['Lato:Regular',sans-serif] text-[#434a4a] text-[14px] lg:text-[18px] leading-[1.7]">Email: {t.email}</p>
              <Divider />
            </div>

            <SocialRow />
          </div>

          {/* Right: photo */}
          <div className="hidden md:block relative w-[44%] shrink-0 overflow-hidden">
            <img loading="eager" decoding="async" src={imgTexture} alt="" className="absolute inset-0 w-full h-full object-cover opacity-30 pointer-events-none" />
            <img {...LCP} loading="eager" decoding="async" src={t.photo} alt={t.name} className="relative z-10 w-full h-full object-cover object-top" />
          </div>
        </div>
      </section>

      {/* ── Main 2-col layout ── */}
      <section className="py-10 sm:py-14 lg:py-[80px] px-4 sm:px-6 lg:px-10">
        <div className="max-w-[1280px] mx-auto flex flex-col lg:flex-row gap-8 lg:gap-[60px] xl:gap-[100px] items-start">

          {/* Sidebar: Booking */}
          <div className="w-full lg:w-[280px] xl:w-[320px] shrink-0">
            <div className="bg-white rounded-[20px] p-6 lg:p-[40px] flex flex-col gap-4 sticky top-24">
              <p className="font-['Marcellus:Regular',sans-serif] text-[#151515] text-[16px] lg:text-[18px] tracking-[1px] uppercase text-center">
                Book a Consultation:
              </p>
              <input
                type="text"
                placeholder="Your Full Name"
                className="w-full bg-[#f8f3ed] rounded-full px-5 py-3.5 font-['Lato:Regular',sans-serif] text-[#434a4a] text-[14px] lg:text-[16px] outline-none placeholder:text-[#8b8a82]"
              />
              <input
                type="tel"
                placeholder="Your Phone"
                className="w-full bg-[#f8f3ed] rounded-full px-5 py-3.5 font-['Lato:Regular',sans-serif] text-[#434a4a] text-[14px] lg:text-[16px] outline-none placeholder:text-[#8b8a82]"
              />
              <input
                type="date"
                className="w-full bg-[#f8f3ed] rounded-full px-5 py-3.5 font-['Lato:Regular',sans-serif] text-[#434a4a] text-[14px] lg:text-[16px] outline-none"
              />
              <input
                type="time"
                className="w-full bg-[#f8f3ed] rounded-full px-5 py-3.5 font-['Lato:Regular',sans-serif] text-[#434a4a] text-[14px] lg:text-[16px] outline-none"
              />
              <Link to="/appointment" className="inline-flex items-center justify-center w-full bg-[#c3dbc5] rounded-full py-4 font-['Lato:Medium',sans-serif] text-[#151515] text-[14px] lg:text-[16px] hover:opacity-90 transition-opacity">
                Book Now
              </Link>
            </div>
          </div>

          {/* Main content */}
          <div className="flex-1 min-w-0 flex flex-col gap-12 lg:gap-[80px]">

            {/* Biography */}
            <div className="flex flex-col gap-5 lg:gap-[40px]">
              <h2 className="font-['Marcellus:Regular',sans-serif] text-[#151515] text-[32px] sm:text-[44px] lg:text-[60px] tracking-[-1px] lg:tracking-[-2px] leading-[1.1]">
                Short Biography
              </h2>
              {(t.bioParas ?? [t.bio1, t.bio2]).filter(Boolean).map((para, i) => (
                <p key={i} className="font-['Lato:Regular',sans-serif] text-[#434a4a] text-[14px] lg:text-[18px] leading-[1.8]">{para}</p>
              ))}
            </div>

            {/* Education */}
            <div className="flex flex-col gap-5 lg:gap-[40px]">
              <h2 className="font-['Marcellus:Regular',sans-serif] text-[#151515] text-[28px] sm:text-[40px] lg:text-[60px] tracking-[-1px] lg:tracking-[-2px] leading-[1.1]">
                Education &amp; Experience
              </h2>
              <div className="flex flex-col gap-3">
                {[
                  { label: "Education",         value: t.education  },
                  { label: "Board Certification", value: t.cert      },
                  { label: "Field of Expertise", value: t.expertise  },
                  { label: "Years of Practice",  value: t.experience },
                ].map(({ label, value }) => (
                  <div key={label}>
                    <div className="flex flex-col sm:flex-row gap-2 sm:gap-8 py-1">
                      <p className="font-['Marcellus:Regular',sans-serif] text-[#151515] text-[12px] lg:text-[18px] tracking-[1px] uppercase sm:w-[180px] shrink-0 leading-[1.5]">
                        {label}
                      </p>
                      <p className="font-['Lato:Regular',sans-serif] text-[#434a4a] text-[14px] lg:text-[18px] leading-[1.7] flex-1">
                        {value}
                      </p>
                    </div>
                    <Divider />
                  </div>
                ))}
              </div>
            </div>

            {/* Working Shifts */}
            <div className="flex flex-col gap-5 lg:gap-[40px]">
              <h2 className="font-['Marcellus:Regular',sans-serif] text-[#151515] text-[28px] sm:text-[40px] lg:text-[60px] tracking-[-1px] lg:tracking-[-2px] leading-[1.1]">
                Working Shifts
              </h2>
              <div className="flex flex-col gap-4">
                <div className="flex gap-3 flex-wrap">
                  {t.shifts.slice(0, 3).map((s) => (
                    <div key={s.day + "a"} className="bg-white rounded-[20px] flex flex-col gap-1 py-5 px-4 flex-1 min-w-[100px] text-center">
                      <p className="font-['Lato:Regular',sans-serif] text-[#151515] text-[16px] lg:text-[18px] leading-[1.6]">{s.day}</p>
                      <p className="font-['Lato:Regular',sans-serif] text-[#434a4a] text-[13px] lg:text-[16px] leading-[1.6]">{s.time}</p>
                    </div>
                  ))}
                </div>
                <div className="flex gap-3 flex-wrap">
                  {t.shifts.slice(3, 6).map((s) => (
                    <div key={s.day + "b"} className="bg-white rounded-[20px] flex flex-col gap-1 py-5 px-4 flex-1 min-w-[100px] text-center">
                      <p className="font-['Lato:Regular',sans-serif] text-[#151515] text-[16px] lg:text-[18px] leading-[1.6]">{s.day}</p>
                      <p className="font-['Lato:Regular',sans-serif] text-[#434a4a] text-[13px] lg:text-[16px] leading-[1.6]">{s.time}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Related Articles */}
            <div className="flex flex-col gap-5 lg:gap-[40px]">
              <h2 className="font-['Marcellus:Regular',sans-serif] text-[#151515] text-[28px] sm:text-[40px] lg:text-[60px] tracking-[-1px] lg:tracking-[-2px] leading-[1.1]">
                Related Articles:
              </h2>
              <div className="flex flex-col sm:flex-row gap-5">
                {/* Article 1 */}
                <div className="bg-white flex-1 rounded-[20px] overflow-hidden flex flex-col relative">
                  <div className="h-[200px] relative shrink-0">
                    <img src={t.art1Img} alt={t.art1Title} loading="lazy" decoding="async" className="w-full h-full object-cover" />
                    <img src={imgTexture} alt="" loading="lazy" decoding="async" className="absolute inset-0 w-full h-full object-cover mix-blend-lighten opacity-10 pointer-events-none" />
                    <div className="absolute bottom-[-12px] left-8 bg-[#c3dbc5] px-3 py-1 rounded-full z-10">
                      <span className="font-['Lato:SemiBold',sans-serif] text-[#151515] text-[11px] tracking-[1px] uppercase">{t.art1Tag}</span>
                    </div>
                  </div>
                  <div className="p-6 flex flex-col gap-4 mt-2">
                    <p className="font-['Marcellus:Regular',sans-serif] text-[#151515] text-[20px] lg:text-[26px] tracking-[-0.5px] leading-[1.3]">{t.art1Title}</p>
                    <Link to={t.art1Slug ? `/blog/${t.art1Slug}` : "/blog"} className="flex items-center gap-2 self-start">
                      <span className="font-['Lato:Medium',sans-serif] text-[#1e1b1b] text-[14px] lg:text-[16px]">Read More</span>
                      <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                        <path d={svgPaths.p29f60cc0} fill="#151515" />
                      </svg>
                    </Link>
                  </div>
                </div>
                {/* Article 2 */}
                <div className="bg-white flex-1 rounded-[20px] overflow-hidden flex flex-col relative">
                  <div className="h-[200px] relative shrink-0">
                    <img src={t.art2Img} alt={t.art2Title} loading="lazy" decoding="async" className="w-full h-full object-cover" />
                    <img src={imgTexture} alt="" loading="lazy" decoding="async" className="absolute inset-0 w-full h-full object-cover mix-blend-lighten opacity-10 pointer-events-none" />
                    <div className="absolute bottom-[-12px] left-8 bg-[#c3dbc5] px-3 py-1 rounded-full z-10">
                      <span className="font-['Lato:SemiBold',sans-serif] text-[#151515] text-[11px] tracking-[1px] uppercase">{t.art2Tag}</span>
                    </div>
                  </div>
                  <div className="p-6 flex flex-col gap-4 mt-2">
                    <p className="font-['Marcellus:Regular',sans-serif] text-[#151515] text-[20px] lg:text-[26px] tracking-[-0.5px] leading-[1.3]">{t.art2Title}</p>
                    <Link to={t.art2Slug ? `/blog/${t.art2Slug}` : "/blog"} className="flex items-center gap-2 self-start">
                      <span className="font-['Lato:Medium',sans-serif] text-[#1e1b1b] text-[14px] lg:text-[16px]">Read More</span>
                      <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                        <path d={svgPaths.p29f60cc0} fill="#151515" />
                      </svg>
                    </Link>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ── Prev / Next ── */}
      <section className="pb-12 lg:pb-16 px-4 sm:px-6 lg:px-10">
        <div className="max-w-[1280px] mx-auto flex items-center justify-between gap-6">
          {prev ? (
            <Link to={`/teachers/${prev.slug}`} className="flex items-center gap-4 group">
              <div className="w-[50px] h-[50px] rounded-full bg-[#C3DBC5] flex items-center justify-center shrink-0 group-hover:bg-[#074240] transition-colors rotate-180">
                <svg width="16" height="16" viewBox="0 0 50 50" fill="none">
                  <path d={svgPaths.pb429800} fill="#151515" />
                </svg>
              </div>
              <span className="font-['Marcellus:Regular',sans-serif] text-[#151515] text-[18px] lg:text-[24px] group-hover:text-[#074240] transition-colors">
                {prev.name}
              </span>
            </Link>
          ) : <div />}
          {next ? (
            <Link to={`/teachers/${next.slug}`} className="flex items-center gap-4 group">
              <span className="font-['Marcellus:Regular',sans-serif] text-[#151515] text-[18px] lg:text-[24px] group-hover:text-[#074240] transition-colors">
                {next.name}
              </span>
              <div className="w-[50px] h-[50px] rounded-full bg-[#C3DBC5] flex items-center justify-center shrink-0 group-hover:bg-[#074240] transition-colors">
                <svg width="16" height="16" viewBox="0 0 50 50" fill="none">
                  <path d={svgPaths.pb429800} fill="#151515" />
                </svg>
              </div>
            </Link>
          ) : <div />}
        </div>
      </section>

    </div>
  );
}