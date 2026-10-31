import { Link } from "react-router";
import { useCms } from "../cms/useCms";
import { Facebook, Twitter, Linkedin } from "lucide-react";
import svgPaths from "../../imports/svg-fmjhwjhc9q";
import sharedPaths from "../../imports/svg-qtx3rc5tzi";
import { imgImage, imgImage2, imgImage4 } from "../../imports/svg-ewnsb";
import { placeholder, LCP } from "./imagePlaceholder";
import { FormSelect } from "./ZenShared";
const imgHeroBg = placeholder("imgHeroBg");
const imgHeroPhoto = placeholder("imgHeroPhoto");
const imgTeacher1 = placeholder("imgTeacher1");
const imgTeacher2 = placeholder("imgTeacher2");
const imgTeacher3 = placeholder("imgTeacher3");
const imgTeacher4 = placeholder("imgTeacher4");
const imgTeacher5 = placeholder("imgTeacher5");
const imgTeacher6 = placeholder("imgTeacher6");
const imgApptPhoto = placeholder("imgApptPhoto");
const imgFounder = placeholder("imgFounder");

// ── Social icon pills ─────────────────────────────────────────────────────────
function SocialPill({ type }: { type: "fb" | "tw" | "li" }) {
  return (
    <div className="w-[42px] h-[42px] bg-[#FAE1FB] rounded-full flex items-center justify-center shrink-0">
      {type === "fb" && <Facebook size={18} strokeWidth={2} className="text-[#151515]" />}
      {type === "tw" && <Twitter size={18} strokeWidth={2} className="text-[#151515]" />}
      {type === "li" && <Linkedin size={18} strokeWidth={2} className="text-[#151515]" />}
    </div>
  );
}

// ── Teacher card ──────────────────────────────────────────────────────────────
interface TeacherCardProps {
  name: string;
  title: string;
  photo: string;
  maskSvg: string;
  slug: string;
}

function TeacherCard({ name, title, photo, maskSvg, slug }: TeacherCardProps) {
  return (
    <div className="bg-white flex flex-col gap-6 sm:gap-7 items-start overflow-hidden p-5 sm:p-7 lg:p-[30px] rounded-[20px] w-full">
      {/* Name + title */}
      <div>
        <p className="font-['Marcellus:Regular',sans-serif] text-[#151515] text-[22px] sm:text-[26px] lg:text-[32px] tracking-[-0.5px] lg:tracking-[-1px] leading-[1.3]">
          {name}
        </p>
        <p className="font-['Lato:Regular',sans-serif] text-[#074240] text-[14px] lg:text-[16px] leading-[24px]">
          {title}
        </p>
      </div>

      {/* Blob-masked photo */}
      <div className="w-full aspect-square relative overflow-hidden rounded-[12px]"
        style={{
          maskImage: `url("${maskSvg}")`,
          WebkitMaskImage: `url("${maskSvg}")`,
          maskSize: "cover",
          WebkitMaskSize: "cover",
          maskRepeat: "no-repeat",
          WebkitMaskRepeat: "no-repeat",
          maskPosition: "center",
          WebkitMaskPosition: "center",
        }}
      >
        <img
          src={photo}
          alt={name}
          loading="lazy"
          decoding="async"
          className="w-full h-full object-cover object-top"
        />
      </div>

      {/* Social + profile button */}
      <div className="flex items-center justify-between w-full gap-3 flex-wrap">
        <div className="flex items-center gap-[7px]">
          <SocialPill type="fb" />
          <SocialPill type="tw" />
          <SocialPill type="li" />
        </div>
        <Link
          to={`/teachers/${slug}`}
          className="flex items-center gap-2 px-5 lg:px-7 py-3 lg:py-4 rounded-full border border-[#151515] hover:bg-[#151515] hover:text-white transition-colors group shrink-0"
        >
          <span className="font-['Lato:Medium',sans-serif] text-[#1e1b1b] group-hover:text-white text-[13px] lg:text-[16px] whitespace-nowrap">
            Open Profile
          </span>
          <svg width="10" height="10" viewBox="0 0 10 10" fill="none" className="shrink-0">
            <path d={svgPaths.p29f60cc0} fill="currentColor" className="text-[#151515] group-hover:text-white" />
          </svg>
        </Link>
      </div>
    </div>
  );
}

// ── Schedule icon (calendar) ──────────────────────────────────────────────────
function CalendarIcon() {
  return (
    <svg width="18" height="19" viewBox="0 0 18 19" fill="none">
      <path d={svgPaths.p36de9c00} fill="#151515" />
    </svg>
  );
}

// ── Appointment section ───────────────────────────────────────────────────────
function AppointmentSection() {
  return (
    <section className="py-12 sm:py-16 lg:py-[80px] px-4 sm:px-6 lg:px-10">
      <div className="max-w-[1280px] mx-auto flex flex-col lg:flex-row gap-10 lg:gap-[100px] items-center">
        {/* Photo */}
        <div
          className="w-full lg:flex-1 h-[320px] sm:h-[400px] lg:h-[520px] rounded-[20px_200px_200px_20px] overflow-hidden shrink-0"
        >
          <img
            src={imgApptPhoto}
            alt="Appointment"
            loading="lazy"
            decoding="async"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Form */}
        <div className="w-full lg:flex-1 flex flex-col gap-6 lg:gap-8">
          <div>
            <p className="font-['Marcellus:Regular',sans-serif] text-[#151515] text-[32px] sm:text-[40px] lg:text-[52px] tracking-[-1px] lg:tracking-[-2px] leading-[1.15]">
              Sign up for{" "}
              <span className="font-['Playfair_Display:Italic',sans-serif] italic">
                Appointment
              </span>
            </p>
            <p className="font-['Lato:Regular',sans-serif] text-[#434a4a] text-[14px] lg:text-[16px] leading-[1.7] mt-3">
              Book a session with one of our master teachers and begin your journey towards holistic well-being here in Rishikesh.
            </p>
          </div>

          <div className="flex flex-col gap-3">
            {/* Name */}
            <input
              type="text"
              placeholder="Your Name"
              className="w-full bg-[#f0ebe5] rounded-full px-5 py-3.5 font-['Lato:Regular',sans-serif] text-[#434a4a] text-[14px] lg:text-[16px] outline-none placeholder:text-[#8b8a82]"
            />
            {/* Phone + Email */}
            <div className="flex flex-col sm:flex-row gap-3">
              <input
                type="tel"
                placeholder="Your Phone"
                className="flex-1 bg-[#f0ebe5] rounded-full px-5 py-3.5 font-['Lato:Regular',sans-serif] text-[#434a4a] text-[14px] lg:text-[16px] outline-none placeholder:text-[#8b8a82]"
              />
              <input
                type="email"
                placeholder="Your Email"
                className="flex-1 bg-[#f0ebe5] rounded-full px-5 py-3.5 font-['Lato:Regular',sans-serif] text-[#434a4a] text-[14px] lg:text-[16px] outline-none placeholder:text-[#8b8a82]"
              />
            </div>
            {/* Choose retreat */}
            <FormSelect
              placeholder="Choose a Retreat"
              triggerClassName="bg-[#f0ebe5] rounded-full px-5 py-3.5 font-['Lato:Regular',sans-serif] text-[14px] lg:text-[16px]"
              options={[
                { label: "Sacred Flow",       value: "sacred-flow"       },
                { label: "The Inner Horizon", value: "the-inner-horizon" },
                { label: "Winter of Presence", value: "winter-of-presence" },
              ]}
            />
            {/* Date + Time */}
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="relative flex-1">
                <input
                  type="date"
                  placeholder="Select Date"
                  className="w-full bg-[#f0ebe5] rounded-full px-5 py-3.5 font-['Lato:Regular',sans-serif] text-[#434a4a] text-[14px] lg:text-[16px] outline-none"
                />
              </div>
              <div className="relative flex-1">
                <input
                  type="time"
                  placeholder="Select Time"
                  className="w-full bg-[#f0ebe5] rounded-full px-5 py-3.5 font-['Lato:Regular',sans-serif] text-[#434a4a] text-[14px] lg:text-[16px] outline-none"
                />
              </div>
            </div>
            {/* Submit */}
            <Link to="/appointment" className="inline-flex items-center justify-center w-full bg-[#c3dbc5] rounded-full py-4 font-['Lato:Medium',sans-serif] text-[#151515] text-[14px] lg:text-[16px] hover:opacity-90 transition-opacity mt-1">
              Book an Appointment
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

// ── Founder feature ───────────────────────────────────────────────────────────
const FOUNDER_INTRO = [
  "Yogi Bhupesh, one of the leading figures of the fitness movement in Rishikesh, is a yogic healer, traditional martial-art practitioner, thought leader, meditation and breathing expert, body-energy specialist, and much more.",
  "At the tender age of 12 he was drawn to yoga and meditation, and decided to embark on a lifelong journey of fitness. A widely travelled man, he gained his expertise under the tutelage of some of the world's finest fitness gurus. He holds two master's degrees — one in human consciousness and yogic sciences, and the other in philosophy.",
  "Under his guidance, more than 1,000 students have perfected the art of harmonizing the mind, body, and soul through his courses on yoga, breathing techniques, and — of course — his ultimate fitness programme (not for the faint-hearted): martial arts.",
  "The Okinawan Goju-Ryu style — a famous traditional martial-art form — lies at Bhupesh's core. He believes this form cultivates inner discipline far more than outward might and agility, and that harnessing this inner strength calls for the right mentor and steady guidance.",
  "With a deep love for life itself, Bhupesh — in addition to teaching yoga and martial arts — has organized many popular workshops on life skills that address the pressing problems of today's world: stress management, effective time management, and the power of positivity, to name just a few.",
];

const FOUNDER_TOPICS = [
  {
    title: "Yoga and Meditation",
    body: "Yoga is all about turning inwards. With a deep understanding of Hatha, Vinyasa, and Iyengar yoga, Bhupesh has helped people move beyond niche fitness into a world of holistic well-being. His years of practice are clearly reflected in his own demeanour and that of his students — a quality that has drawn several celebrities and renowned figures to seek his guidance. The fundamental unit of existence is the breath, and to treat any problem it is wise to begin healing at that level.",
  },
  {
    title: "Mind, Body, and Soul Connectivity",
    body: "In our busy lives, we often forget to listen to our soul. We blindly follow what our mind tells us, and the body follows suit — disturbing the balance between mind, body, and soul. Through yoga and meditation this balance and rhythm can be beautifully restored. Yogic guru Bhupesh has helped many attain this peace, and in doing so, make their lives better.",
  },
  {
    title: "Using Body Energies — Find the Key to Happiness and Health",
    body: "It is well known that we are governed by our energies. But when it comes to mastering the art of nurturing yourself with positive energy while minimizing the impact of the negative, Bhupesh has a whole world to reveal. Learn the dynamics of energy and its impact on our anatomy and our lives through a man who lives in a state of eternal bliss.",
  },
  {
    title: "Building Inner Discipline through Self-Hypnosis",
    body: "Whether it is yoga, meditation, or martial arts, every path requires building core discipline — turning inwards and settling into a state of self-hypnosis. This is not as easy as it sounds and calls for the right mentoring and hand-holding. Body awareness is extremely important, and every lock requires a different key. That is why Bhupesh believes in offering customized solutions based on each person's body type. Here is your opportunity to explore a whole new you, and to discover the treasure hidden within the universe of the body.",
  },
];

function FounderSection() {
  return (
    <section className="py-12 sm:py-16 lg:py-[80px] px-4 sm:px-6 lg:px-10">
      <div className="max-w-[1280px] mx-auto flex flex-col lg:flex-row gap-10 lg:gap-[70px] items-start">
        {/* Photo + title card */}
        <div className="w-full lg:w-[360px] xl:w-[400px] shrink-0 lg:sticky lg:top-6 flex flex-col gap-6">
          <div className="w-full aspect-[4/5] rounded-[20px] overflow-hidden">
            <img
              src={imgFounder}
              alt="Yogi Bhupesh"
              loading="lazy"
              decoding="async"
              className="w-full h-full object-cover object-top"
            />
          </div>
          <div className="flex flex-col gap-2">
            <span className="inline-flex self-start bg-[#c3dbc5] rounded-full px-3 py-1 font-['Lato:SemiBold',sans-serif] text-[#151515] text-[11px] lg:text-[12px] tracking-[1px] uppercase">
              Founder &amp; Owner
            </span>
            <p className="font-['Marcellus:Regular',sans-serif] text-[#151515] text-[32px] lg:text-[40px] tracking-[-1px] leading-[1.1]">
              Yogi Bhupesh
            </p>
            <p className="font-['Playfair_Display:Italic',sans-serif] italic text-[#074240] text-[16px] lg:text-[18px]">
              Unleashing the power within
            </p>
          </div>
        </div>

        {/* Narrative */}
        <div className="flex-1 flex flex-col gap-5 lg:gap-6">
          {FOUNDER_INTRO.map((para, i) => (
            <p key={i} className="font-['Lato:Regular',sans-serif] text-[#434a4a] text-[15px] lg:text-[18px] leading-[1.8]">
              {para}
            </p>
          ))}

          <div className="flex flex-col gap-6 lg:gap-8 mt-2">
            {FOUNDER_TOPICS.map((topic) => (
              <div key={topic.title} className="flex flex-col gap-2">
                <h3 className="font-['Marcellus:Regular',sans-serif] text-[#151515] text-[20px] lg:text-[26px] tracking-[-0.5px] leading-[1.3]">
                  {topic.title}
                </h3>
                <p className="font-['Lato:Regular',sans-serif] text-[#434a4a] text-[15px] lg:text-[18px] leading-[1.8]">
                  {topic.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ── Teachers data ─────────────────────────────────────────────────────────────
const PHOTO_FALLBACKS = [imgTeacher1, imgTeacher2, imgTeacher3, imgTeacher4];
const MASKS = [imgImage, imgImage2, imgImage4, imgImage];

// Built-in list — shown when Sanity has no published teachers.
export const TEACHERS = [
  { name: "Raj Singh",       title: "Hatha & Ashtanga Teacher",      photo: imgTeacher1, mask: imgImage,  slug: "raj-singh" },
  { name: "Gokul Bisht",     title: "Anatomy & Physiology Teacher",  photo: imgTeacher2, mask: imgImage2, slug: "gokul-bisht" },
  { name: "Shashank Badoni", title: "Eclectic Philosopher · Guest Faculty", photo: imgTeacher3, mask: imgImage4, slug: "shashank-badoni" },
  { name: "Gopal",           title: "Hatha Yoga Master",             photo: imgTeacher4, mask: imgImage,  slug: "gopal" },
];

// ── Page ──────────────────────────────────────────────────────────────────────
export default function TeachersPage() {
  // Cards: Sanity teachers with "Show on the Teachers page" ticked, in Display order.
  const { teachers } = useCms();
  const list = teachers
    ? teachers.filter((t) => t.listed).map((t, i) => ({ name: t.name, title: t.title, slug: t.slug, photo: t.photo ?? PHOTO_FALLBACKS[i % PHOTO_FALLBACKS.length], mask: MASKS[i % MASKS.length] }))
    : TEACHERS;
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
            <div className="flex flex-col gap-4 lg:gap-[26px] max-w-[520px]">
              <h1 className="font-['Marcellus:Regular',sans-serif] text-[#074240] text-[34px] sm:text-[48px] lg:text-[62px] xl:text-[68px] tracking-[-1.5px] lg:tracking-[-3px] leading-[1.05]">
                Professional Yoga Teachers in Rishikesh, India
              </h1>
              <p className="font-['Playfair_Display:Italic',sans-serif] italic text-[#151515] text-[15px] lg:text-[19px] leading-[1.7] max-w-[440px]">
                &ldquo;All our trainers are true masters, each with 20 to 50 years of experience in teaching yoga. They guide you in a flexible, supportive environment and offer their full attention to every student.&rdquo;
              </p>
              <p className="font-['Lato:Medium',sans-serif] text-[#074240] text-[12px] lg:text-[14px] leading-[1.8] tracking-[0.5px] uppercase max-w-[440px]">
                Yoga Masters · Spiritual Meditation · Pranayama &amp; Breathing Techniques · Shatkarmas Cleansing · Philosophy &amp; Satsang
              </p>
            </div>
          </div>

          {/* Right: hero photo */}
          <div className="hidden md:block flex-1 relative">
            <img {...LCP} loading="eager" decoding="async"
              src={imgHeroPhoto}
              alt="Yoga teachers"
              className="absolute inset-0 w-full h-full object-cover object-center"
            />
            {/* Light overlay blend */}
            <div className="absolute inset-0 mix-blend-lighten opacity-10">
              <img src={imgHeroBg} alt="" loading="eager" decoding="async" className="absolute w-[200%] h-full top-0 left-[-50%] max-w-none object-cover" />
            </div>
          </div>
        </div>
      </section>

      {/* ── Founder ── */}
      <FounderSection />

      {/* ── Teacher grid ── */}
      <section className="pb-12 sm:pb-16 lg:pb-[80px] px-4 sm:px-6 lg:px-10">
        <div className="max-w-[1280px] mx-auto flex flex-col gap-8 lg:gap-12">
          <h2 className="font-['Marcellus:Regular',sans-serif] text-[#151515] text-[32px] sm:text-[40px] lg:text-[52px] tracking-[-1px] lg:tracking-[-2px] leading-[1.1] text-center">
            Meet Our Teachers
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-[30px]">
            {list.map((teacher, i) => (
              <TeacherCard
                key={i}
                name={teacher.name}
                title={teacher.title}
                photo={teacher.photo}
                maskSvg={teacher.mask}
                slug={teacher.slug}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ── Appointment section ── */}
      <AppointmentSection />

    </main>
  );
}