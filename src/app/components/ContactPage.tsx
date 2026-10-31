import { useState } from "react";
import { useNavigate, Link } from "react-router";
import { Clock } from "lucide-react";
import svgPaths from "../../imports/svg-5su6po4af3";
import { placeholder } from "./imagePlaceholder";
const imgHeroBg = placeholder("imgHeroBg");
const imgHeroOverlay = placeholder("imgHeroOverlay");
const imgHeroPerson = placeholder("imgHeroPerson");
const imgMap = placeholder("imgMap");
const imgAppleValley = placeholder("imgAppleValley");
const imgWhiteBearLake = placeholder("imgWhiteBearLake");
const imgMeditationWoman = placeholder("imgMeditationWoman");
const imgTeam = placeholder("imgTeam");
import { SectionBadge, StarRating } from "./ZenShared";
import { Breadcrumbs, FaqSection, TextField, PrimaryButton, SITE, submitForm, Honeypot, FormError, type Faq } from "./SiteExtras";

const mapsUrl = (q: string) => `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(q)}`;
const dirUrl = (q: string) => `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(q)}`;

// ─── CONTACT HERO ─────────────────────────────────────────────────────────────

function ContactHero() {
  return (
    <section className="px-4 sm:px-6 lg:px-10 pt-4 lg:pt-10">
      <div className="relative w-full h-[360px] sm:h-[480px] md:h-[580px] lg:h-[780px] rounded-[16px] lg:rounded-[20px] overflow-hidden">
        {/* Rainbow gradient background */}
        <img loading="lazy" decoding="async"
          src={imgHeroBg}
          alt=""
          className="absolute inset-0 w-full h-full object-cover mix-blend-lighten opacity-70"
        />
        {/* Light bg wash */}
        <div className="absolute inset-0 bg-white/60" />
        {/* Decorative overlay */}
        <img loading="lazy" decoding="async"
          src={imgHeroOverlay}
          alt=""
          className="absolute right-0 top-0 h-full w-auto object-cover object-left hidden sm:block"
          style={{ maxWidth: "55%" }}
        />
        {/* Person with yoga mat */}
        <img loading="lazy" decoding="async"
          src={imgHeroPerson}
          alt="Person holding yoga mat"
          className="absolute right-0 top-0 h-full w-auto object-cover object-left hidden md:block"
          style={{ maxWidth: "50%" }}
        />
        {/* Dark tint on right */}
        <div className="absolute inset-0 bg-[rgba(0,0,0,0.04)]" />

        {/* Content */}
        <div className="absolute inset-0 flex items-center">
          <div className="px-6 sm:px-10 lg:px-[160px] max-w-[800px] flex flex-col gap-6 lg:gap-[30px]">
            <SectionBadge text="Contact Us" />
            <h1 className="font-['Marcellus:Regular',sans-serif] text-[#151515] text-[32px] sm:text-[52px] md:text-[68px] lg:text-[90px] leading-[1] tracking-[-2px] lg:tracking-[-5px]">
              Contact Us{" "}
              <span className="font-['Playfair_Display:Italic',sans-serif] text-[#074240]">Easily Online</span>
              {", "}
              by Phone or by Dropping In
            </h1>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-4 lg:gap-[50px]">
              <Link to="/about" className="bg-white flex items-center gap-2 pl-5 pr-2 py-2 rounded-full cursor-pointer hover:opacity-90 transition-opacity shrink-0">
                <span className="font-['Lato:Medium',sans-serif] text-[#1e1b1b] text-[13px] lg:text-[16px] whitespace-nowrap">
                  Learn More
                </span>
                <div className="w-8 h-8 lg:w-10 lg:h-10 bg-[#FAE1FB] rounded-full flex items-center justify-center -rotate-90 shrink-0">
                  <svg width="16" height="16" viewBox="0 0 40 40" fill="none">
                    <path d={svgPaths.p17b45500} fill="#151515" />
                  </svg>
                </div>
              </Link>
              <div className="flex flex-col gap-0.5">
                <p className="font-['Lato:SemiBold',sans-serif] text-[#434a4a] text-[11px] lg:text-[12px] tracking-[1px] uppercase">
                  Give Us a Call:
                </p>
                <p className="font-['Marcellus:Regular',sans-serif] text-[#151515] text-[14px] lg:text-[18px] tracking-[1px] uppercase">
                  + 0800 2336 7811
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── CONTACT INFORMATION ─────────────────────────────────────────────────────

function ContactInfoSection() {
  return (
    <section className="py-16 sm:py-20 lg:py-[120px] px-4 sm:px-6 lg:px-10">
      <div className="max-w-[1280px] mx-auto flex flex-col lg:flex-row items-center gap-10 lg:gap-[80px]">
        {/* Left: info */}
        <div className="flex-1 flex flex-col gap-6 lg:gap-[30px]">
          <h2 className="font-['Marcellus:Regular',sans-serif] text-[#151515] text-[28px] sm:text-[38px] lg:text-[60px] leading-[1.1] tracking-[-1px] lg:tracking-[-2px]">
            Contact{" "}
            <span className="font-['Playfair_Display:Italic',sans-serif] text-[#074240]">Information</span>
          </h2>
          <p className="font-['Lato:Regular',sans-serif] text-[#434a4a] text-[14px] sm:text-[16px] lg:text-[18px] leading-[1.7] max-w-[480px]">
            Down to earth, thorough instruction in yoga and mindfulness for the benefit of all bodies.
          </p>
          <div className="flex gap-8 lg:gap-[60px] flex-wrap">
            <div className="flex flex-col gap-3">
              <p className="font-['Marcellus:Regular',sans-serif] text-[#151515] text-[14px] lg:text-[18px] tracking-[1px] uppercase">
                Address:
              </p>
              <a
                href={mapsUrl(SITE.mapQuery)}
                target="_blank"
                rel="noopener noreferrer"
                className="font-['Lato:Regular',sans-serif] text-[#434a4a] text-[14px] lg:text-[18px] leading-[1.7] hover:text-[#074240] transition-colors"
              >
                <p>Laxman Jhula Road, Tapovan</p>
                <p>Rishikesh, Uttarakhand 249192</p>
                <p>India</p>
              </a>
            </div>
            <div className="flex flex-col gap-3">
              <p className="font-['Marcellus:Regular',sans-serif] text-[#151515] text-[14px] lg:text-[18px] tracking-[1px] uppercase">
                Service Times:
              </p>
              <div className="font-['Lato:Regular',sans-serif] text-[#434a4a] text-[14px] lg:text-[18px] leading-[1.7]">
                <p>Saturdays 4 pm</p>
                <p>Sundays 9 &amp; 11 am</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right: Map */}
        <div className="w-full lg:w-[600px] xl:w-[740px] lg:shrink-0">
          <div className="relative w-full h-[260px] sm:h-[360px] lg:h-[580px] rounded-[16px] lg:rounded-br-[15px] lg:rounded-tr-[15px] overflow-hidden">
            <img
              src={imgMap}
              alt="Map showing our location"
              loading="lazy"
              decoding="async"
              className="absolute inset-0 w-full h-full object-cover"
            />
            {/* Map pin 1 */}
            <div className="absolute" style={{ left: "37%", top: "28%" }}>
              <svg width="24" height="42" viewBox="0 0 23.6166 41.6112" fill="none">
                <path d={svgPaths.p2881cc00} fill="#074240" />
                <path d={svgPaths.p12c1f72} fill="#F8F3ED" />
              </svg>
            </div>
            {/* Map pin 2 */}
            <div className="absolute" style={{ left: "65%", top: "57%" }}>
              <svg width="24" height="42" viewBox="0 0 23.6166 41.6112" fill="none">
                <path d={svgPaths.p2881cc00} fill="#074240" />
                <path d={svgPaths.p3efda900} fill="#F8F3ED" />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── ALL LOCATIONS ────────────────────────────────────────────────────────────

function LocationCard({
  image,
  city,
  address,
  serviceTimes,
}: {
  image: string;
  city: string;
  address: string[];
  serviceTimes: string[];
}) {
  return (
    <div className="flex flex-col gap-6 lg:gap-[35px]">
      {/* Location image */}
      <div className="w-full h-[200px] sm:h-[280px] lg:h-[360px] rounded-[16px] lg:rounded-[20px] overflow-hidden relative">
        <img
          src={image}
          alt={city}
          loading="lazy"
          decoding="async"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <img
          src={imgHeroBg}
          alt=""
          loading="lazy"
          decoding="async"
          className="absolute inset-0 w-full h-full object-cover mix-blend-lighten opacity-10 pointer-events-none"
        />
      </div>

      {/* Location info */}
      <div className="flex flex-col gap-3 lg:gap-[30px]">
        <div className="flex flex-col gap-3 lg:gap-[15px]">
          <p className="font-['Marcellus:Regular',sans-serif] text-[#151515] text-[22px] sm:text-[26px] lg:text-[32px] leading-[1.4] tracking-[-0.5px] lg:tracking-[-1px]">
            {city}
          </p>
          <div className="flex gap-6 lg:gap-[20px] flex-wrap">
            <div className="flex flex-col gap-2">
              <p className="font-['Marcellus:Regular',sans-serif] text-[#434a4a] text-[12px] lg:text-[18px] tracking-[1px] uppercase">
                Address:
              </p>
              <div className="font-['Lato:Regular',sans-serif] text-[#434a4a] text-[14px] lg:text-[18px] leading-[1.7]">
                {address.map((line, i) => (
                  <p key={i}>{line}</p>
                ))}
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <p
                className="font-['Marcellus:Regular',sans-serif] text-[#434a4a] text-[12px] lg:text-[18px] tracking-[1px] uppercase"
                style={{ color: "#fae1fb" }}
              >
                Service Times:
              </p>
              <div className="font-['Lato:Regular',sans-serif] text-[#434a4a] text-[14px] lg:text-[18px] leading-[1.7]">
                {serviceTimes.map((line, i) => (
                  <p key={i}>{line}</p>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Get Directions link → Google Maps */}
        <a
          href={dirUrl(`${city} ${address.join(" ")}`)}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1.5 group cursor-pointer w-fit"
        >
          <span className="font-['Lato:Medium',sans-serif] text-[#1e1b1b] text-[14px] lg:text-[16px] group-hover:text-[#074240] transition-colors">
            Get Directions
          </span>
          <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
            <path d={svgPaths.p29f60cc0} fill="#151515" />
          </svg>
        </a>
      </div>
    </div>
  );
}

function AllLocationsSection() {
  return (
    <section className="py-0 px-4 sm:px-6 lg:px-10 pb-16 sm:pb-20 lg:pb-[120px]">
      <div className="max-w-[1280px] mx-auto flex flex-col gap-10 lg:gap-[50px]">
        <h2 className="font-['Marcellus:Regular',sans-serif] text-[#1f1f1f] text-[28px] sm:text-[40px] lg:text-[60px] text-center tracking-[-1px] lg:tracking-[-2px] leading-tight">
          All Locations
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 lg:gap-[60px]">
          <LocationCard
            image={imgAppleValley}
            city="Apple Valley"
            address={["14960 Florence Trail", "Apple Valley, MN 55124"]}
            serviceTimes={["Saturdays 4 pm", "Sundays 9 & 11 am"]}
          />
          <LocationCard
            image={imgWhiteBearLake}
            city="White Bear Lake"
            address={["2401 East Buffalo St.", "White Bear Lake, MN 55110"]}
            serviceTimes={["Saturdays 4 & 6 pm", "Sundays 9 & 11 am"]}
          />
        </div>
      </div>
    </section>
  );
}

// ─── ASK A QUESTION ──────────────────────────────────────────────────────────

// ─── RESPONSE-TIME PROMISE ─────────────────────────────────────────────────────

function ResponsePromise() {
  return (
    <section className="px-4 sm:px-6 lg:px-10 pb-16 sm:pb-20 lg:pb-[120px]">
      <div className="max-w-[1280px] mx-auto bg-[#c3dbc5] rounded-[20px] px-6 sm:px-10 lg:px-[70px] py-8 lg:py-[50px] flex flex-col sm:flex-row items-center gap-6 lg:gap-10 text-center sm:text-left">
        <div className="w-16 h-16 lg:w-20 lg:h-20 rounded-full bg-white flex items-center justify-center shrink-0">
          <Clock size={34} className="text-[#074240]" />
        </div>
        <div className="flex flex-col gap-2">
          <p className="font-['Marcellus:Regular',sans-serif] text-[#151515] text-[24px] lg:text-[34px] tracking-[-1px] leading-[1.2]">
            We reply within one business day
          </p>
          <p className="font-['Lato:Regular',sans-serif] text-[#434a4a] text-[14px] lg:text-[17px] leading-[1.7] max-w-[620px]">
            Every enquiry is answered by a real member of our Rishikesh team — never an automated
            bot. Reach us any time on WhatsApp at {SITE.phone} for the fastest response.
          </p>
        </div>
      </div>
    </section>
  );
}

// ─── REVIEWS ───────────────────────────────────────────────────────────────────

const REVIEWS = [
  { name: "Emma L.", place: "United Kingdom", text: "The 200-hour Hatha training changed how I move and breathe. The teachers are patient, deeply knowledgeable and genuinely kind." },
  { name: "Daniel R.", place: "Germany", text: "A truly authentic Rishikesh experience. The Gurukul method, the food, the philosophy classes — everything felt intentional and grounded." },
  { name: "Priyanka S.", place: "India", text: "I arrived exhausted and left restored. The retreat gave me tools for stillness that I still use every single day back home." },
];

function ReviewsSection() {
  return (
    <section className="px-4 sm:px-6 lg:px-10 pb-16 sm:pb-20 lg:pb-[120px]">
      <div className="max-w-[1280px] mx-auto flex flex-col gap-10 lg:gap-[50px]">
        <h2 className="font-['Marcellus:Regular',sans-serif] text-[#151515] text-[28px] sm:text-[40px] lg:text-[60px] text-center tracking-[-1px] lg:tracking-[-2px] leading-tight">
          What Our Students Say
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {REVIEWS.map((r) => (
            <div key={r.name} className="bg-white rounded-[20px] border border-[#e8e0d8] p-7 lg:p-9 flex flex-col gap-4">
              <StarRating />
              <p className="font-['Lato:Regular',sans-serif] text-[#434a4a] text-[15px] lg:text-[17px] leading-[1.8] flex-1">
                &ldquo;{r.text}&rdquo;
              </p>
              <div>
                <p className="font-['Marcellus:Regular',sans-serif] text-[#151515] text-[18px] lg:text-[20px] tracking-[-0.5px]">{r.name}</p>
                <p className="font-['Lato:Regular',sans-serif] text-[#8b8a82] text-[13px] lg:text-[14px]">{r.place}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── TEAM PHOTO ────────────────────────────────────────────────────────────────

function TeamSection() {
  return (
    <section className="px-4 sm:px-6 lg:px-10 pb-16 sm:pb-20 lg:pb-[120px]">
      <div className="max-w-[1280px] mx-auto flex flex-col gap-6 lg:gap-10">
        <div className="w-full h-[260px] sm:h-[380px] lg:h-[520px] rounded-[20px] overflow-hidden">
          <img
            src={imgTeam}
            alt="The Shiva Yoga Niketan teaching team gathered outdoors in Rishikesh"
            loading="lazy"
            decoding="async"
            className="w-full h-full object-cover object-center"
          />
        </div>
        <p className="font-['Lato:Regular',sans-serif] text-[#434a4a] text-[14px] lg:text-[18px] leading-[1.8] max-w-[720px] mx-auto text-center">
          Our teaching family in Rishikesh — a close-knit team of masters, therapists and guest
          faculty devoted to sharing authentic yoga with every student who joins us.
        </p>
      </div>
    </section>
  );
}

// ─── FAQ CONTENT ───────────────────────────────────────────────────────────────

const CONTACT_FAQS: Faq[] = [
  { q: "How quickly will I hear back after enquiring?", a: "We reply to every enquiry within one business day, and usually much sooner. For urgent questions, message us on WhatsApp for a same-day response." },
  { q: "Where exactly are you located?", a: "We are in Tapovan, on Laxman Jhula Road in Rishikesh, Uttarakhand — the heart of India's yoga capital, a short walk from the Ganges." },
  { q: "Do I need prior experience to join a course?", a: "Not at all. Our beginner course is designed for newcomers, while our 200-hour trainings welcome both first-timers and experienced practitioners." },
  { q: "What is included in the course fee?", a: "Fees include tuition, course materials, private accommodation and three vegetarian meals a day. Full inclusions are listed on each program page." },
  { q: "How do I secure my place?", a: "Complete the application form and pay the USD 200 registration fee. Once received, we confirm your spot and send joining details and travel guidance." },
];

function AskQuestionSection() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [errors, setErrors] = useState<{ name?: string; email?: string; message?: string }>({});
  const [loading, setLoading] = useState(false);
  const [sendError, setSendError] = useState<string | null>(null);

  const validate = () => {
    const e: typeof errors = {};
    if (!formData.name.trim()) e.name = "Please enter your name.";
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(formData.email)) e.email = "Please enter a valid email address.";
    if (formData.message.trim().length < 10) e.message = "Please add a little more detail (10+ characters).";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!validate()) return;
    const bot = (e.currentTarget.elements.namedItem("botcheck") as HTMLInputElement | null)?.checked;
    setLoading(true);
    setSendError(null);
    // Delivered by Web3Forms (see SITE.web3formsKey) → confirmation page.
    const res = await submitForm("Contact enquiry", { ...formData, botcheck: bot });
    setLoading(false);
    if (res.ok) navigate("/thank-you");
    else setSendError(res.error);
  };

  return (
    <section className="py-0 px-4 sm:px-6 lg:px-10 pb-16 sm:pb-20 lg:pb-[120px]">
      <div className="max-w-[1280px] mx-auto flex flex-col lg:flex-row items-center gap-10 lg:gap-[100px]">
        {/* Decorative image — woman meditating outdoors */}
        <div className="w-full max-w-[380px] sm:max-w-[420px] lg:w-[440px] lg:shrink-0 mx-auto lg:mx-0">
          <div
            className="w-full overflow-hidden"
            style={{
              borderRadius: "300px 300px 20px 20px",
              height: "clamp(340px, 50vw, 700px)",
            }}
          >
            <img
              src={imgMeditationWoman}
              alt="Woman meditating outdoors"
              loading="lazy"
              decoding="async"
              className="w-full h-full object-cover object-center"
            />
          </div>
        </div>

        {/* Form */}
        <div className="flex-1 flex flex-col gap-8 lg:gap-[50px] w-full">
          <div className="flex flex-col gap-4 lg:gap-[30px]">
            <h2 className="font-['Marcellus:Regular',sans-serif] text-[#151515] text-[26px] sm:text-[38px] lg:text-[60px] leading-[1.1] tracking-[-0.5px] lg:tracking-[-2px]">
              Ask a Question
            </h2>
            <p className="font-['Lato:Regular',sans-serif] text-[#434a4a] text-[14px] sm:text-[16px] lg:text-[18px] leading-[1.7]">
              Down to earth, thorough instruction in yoga and mindfulness for the benefit of all bodies.
            </p>
          </div>

          <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-4 lg:gap-5 w-full">
            {/* Name + Email row */}
            <div className="flex flex-col sm:flex-row gap-4 lg:gap-5">
              <div className="flex-1">
                <TextField
                  label="Name" required
                  value={formData.name}
                  onChange={(v) => setFormData({ ...formData, name: v })}
                  placeholder="Your full name"
                  error={errors.name}
                  success={!!formData.name && !errors.name}
                />
              </div>
              <div className="flex-1">
                <TextField
                  label="E-Mail" type="email" required
                  value={formData.email}
                  onChange={(v) => setFormData({ ...formData, email: v })}
                  placeholder="your@email.com"
                  error={errors.email}
                  success={!!formData.email && !errors.email}
                />
              </div>
            </div>

            {/* Message */}
            <TextField
              label="Your Message" textarea required
              value={formData.message}
              onChange={(v) => setFormData({ ...formData, message: v })}
              placeholder="Write your message here..."
              error={errors.message}
            />

            <Honeypot />
            <FormError message={sendError} />

            {/* Submit */}
            <div className="flex items-center gap-4 flex-wrap">
              <PrimaryButton type="submit" variant="secondary" loading={loading}>
                Send Message
              </PrimaryButton>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}

// ─── CONTACT PAGE ─────────────────────────────────────────────────────────────

export default function ContactPage() {
  return (
    <main>
      <Breadcrumbs />
      <ContactHero />
      <ContactInfoSection />
      <ResponsePromise />
      <AllLocationsSection />
      <ReviewsSection />
      <TeamSection />
      <AskQuestionSection />
      <FaqSection items={CONTACT_FAQS} />
    </main>
  );
}