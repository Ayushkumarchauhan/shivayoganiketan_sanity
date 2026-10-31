import { submitForm, Honeypot, FormError } from "./SiteExtras";
import { useState, useEffect } from "react";
import { useCms } from "../cms/useCms";
import { Link, useSearchParams } from "react-router";
import { SelectMenu } from "./ZenShared";
import { placeholder } from "./imagePlaceholder";

// ─── Images ───────────────────────────────────────────────────────────────────
const imgYoga = placeholder("imgYoga");
const imgTexture = placeholder("imgTexture");

// ─────────────────────────────────────────────────────────────────────────────
// Application Form data
//
// ▸ COURSES and COURSE DATES come from the Programs in Sanity (each program's
//   "Upcoming course dates"). The lists below are only used if Sanity is empty.
// ▸ To edit the REGISTRATION FEE shown in the heading, change REGISTRATION_FEE.
// ─────────────────────────────────────────────────────────────────────────────
const COURSES = [
  "Yoga Course For Beginners",
  "200 Hrs Hatha Yoga Teacher Training",
  "200 Hrs Vinyasa Yoga Teacher Training",
  "200 Hrs Kundalini Yoga Teacher Training",
];

const COURSE_DATES = [
  "7th January 2022 – 3rd February 2022",
  "7th February 2022 – 3rd March 2022",
  "7th March 2022 – 3rd April 2022",
  "7th April 2022 – 3rd May 2022",
  "7th May 2022 – 3rd June 2022",
  "7th June 2022 – 3rd July 2022",
  "7th July 2022 – 3rd August 2022",
  "7th August 2022 – 3rd September 2022",
  "7th September 2022 – 3rd October 2022",
];

const REGISTRATION_FEE = "USD 200";

// ─── Shared input styling (cream pills on the green panel) ──────────────────────
const APP_INPUT =
  "w-full bg-[#f8f3ed] rounded-[12px] px-4 py-3 font-['Lato:Regular',sans-serif] text-[#151515] text-[15px] outline-none placeholder:text-[#8b8a82] border border-transparent focus:border-[#074240] transition-colors";

function AppField({ label, required, children }: { label: string; required?: boolean; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-1.5">
      <span className="font-['Lato:SemiBold',sans-serif] text-[#151515] text-[13px]">
        {label}
        {required && <span className="text-[#074240]"> *</span>}
      </span>
      {children}
    </div>
  );
}

const EMPTY_APP = {
  name: "", email: "", gender: "", course: "", date1: "", date2: "", date3: "",
  address: "", mobile: "", dob: "", occupation: "", country: "", message: "", accept: false,
};

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function AppointmentPage() {
  const [searchParams] = useSearchParams();
  // The program pages link here with ?course=…&date=… to pre-fill the form.
  const presetCourse = searchParams.get("course") ?? "";
  const presetDate = searchParams.get("date") ?? "";

  // Courses = program names; dates = every program's upcoming dates (de-duplicated).
  const { programs } = useCms();
  const courses = programs ? programs.map((p) => p.title) : COURSES;
  const cmsDates = programs ? [...new Set(programs.flatMap((p) => (p.dates ?? []).map((d) => d.period)))] : null;
  const courseDates = cmsDates ? (cmsDates.length ? cmsDates : ["Flexible — we'll discuss dates with you"]) : COURSE_DATES;

  const [f, setF] = useState({ ...EMPTY_APP });
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    setF((prev) => ({
      ...prev,
      course: courses.includes(presetCourse) ? presetCourse : prev.course,
      date1: courseDates.includes(presetDate) ? presetDate : prev.date1,
    }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [presetCourse, presetDate, programs]);

  const set = (k: keyof typeof f) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setF((prev) => ({ ...prev, [k]: e.target.value }));

  const [sending, setSending] = useState(false);
  const [sendError, setSendError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const bot = (e.currentTarget.elements.namedItem("botcheck") as HTMLInputElement | null)?.checked;
    setSending(true);
    setSendError(null);
    const res = await submitForm("Course application", { ...f, botcheck: bot } as Record<string, string | boolean | undefined>);
    setSending(false);
    if (res.ok) setSubmitted(true);
    else setSendError(res.error);
  };

  const dateOptions = courseDates.map((d) => ({ label: d, value: d }));

  return (
    <div className="w-full">

      {/* ── Breadcrumb hero strip ── */}
      <section className="px-4 sm:px-6 lg:px-10 pt-6 pb-0">
        <div className="max-w-[1280px] mx-auto flex items-center gap-2 font-['Lato:Regular',sans-serif] text-[14px] text-[#434a4a]">
          <Link to="/" className="hover:text-[#074240] transition-colors">Home</Link>
          <span>/</span>
          <span className="text-[#151515]">Application Form</span>
        </div>
      </section>

      {/* ── Main form card ── */}
      <section className="px-4 sm:px-6 lg:px-10 py-8 sm:py-12 lg:py-[60px]">
        <div className="max-w-[1280px] mx-auto rounded-[16px] lg:rounded-[20px] overflow-hidden flex flex-col lg:flex-row">

          {/* ── Left: green form panel ── */}
          <div className="bg-[#c3dbc5] flex-1 lg:max-w-[680px] xl:max-w-[740px] flex flex-col gap-8 lg:gap-10 p-8 sm:p-10 lg:p-[60px] xl:p-[80px]">

            {/* Heading */}
            <div className="flex flex-col gap-3">
              <h1 className="font-['Marcellus:Regular',sans-serif] text-[#151515] text-[36px] sm:text-[44px] lg:text-[52px] tracking-[-1.5px] leading-tight">
                Application Form
              </h1>
              <p className="font-['Lato:Medium',sans-serif] text-[#074240] text-[15px] lg:text-[16px]">
                Registration fee — {REGISTRATION_FEE}
              </p>
            </div>

            {/* Form */}
            {submitted ? (
              <div className="flex flex-col items-center gap-4 py-10 text-center">
                <div className="w-16 h-16 rounded-full bg-[#074240] flex items-center justify-center">
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
                    <path d="M5 12L10 17L19 7" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
                <h2 className="font-['Marcellus:Regular',sans-serif] text-[#151515] text-[28px] tracking-[-1px]">
                  Application Received
                </h2>
                <p className="font-['Lato:Regular',sans-serif] text-[#434a4a] text-[16px] leading-[1.7] max-w-[420px]">
                  Thank you, <strong>{f.name || "friend"}</strong>. We have received your application
                  {f.course ? <> for <strong>{f.course}</strong></> : null}. Our team will contact you shortly with the next steps.
                </p>
                <button
                  onClick={() => { setSubmitted(false); setF({ ...EMPTY_APP }); }}
                  className="mt-4 border border-[#074240] rounded-full px-8 py-3 font-['Lato:Medium',sans-serif] text-[#074240] text-[15px] hover:bg-[#074240] hover:text-white transition-colors"
                >
                  Submit Another
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-4">

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <AppField label="Your Name" required>
                    <input required value={f.name} onChange={set("name")} type="text" className={APP_INPUT} />
                  </AppField>
                  <AppField label="Your Email" required>
                    <input required value={f.email} onChange={set("email")} type="email" className={APP_INPUT} />
                  </AppField>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <AppField label="Your Gender" required>
                    <SelectMenu
                      required
                      value={f.gender}
                      onChange={(v) => setF((p) => ({ ...p, gender: v }))}
                      placeholder="— Please choose an option —"
                      options={["Male", "Female", "Other"].map((g) => ({ label: g, value: g }))}
                      triggerClassName={APP_INPUT}
                    />
                  </AppField>
                  <AppField label="Select Your Course" required>
                    <SelectMenu
                      required
                      value={f.course}
                      onChange={(v) => setF((p) => ({ ...p, course: v }))}
                      placeholder="— Please choose an option —"
                      options={courses.map((c) => ({ label: c, value: c }))}
                      triggerClassName={APP_INPUT}
                    />
                  </AppField>
                </div>

                {/* Three preferred course-date choices */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {([
                    { key: "date1", label: "Course Date — 1st choice", req: true },
                    { key: "date2", label: "Course Date — 2nd choice", req: false },
                    { key: "date3", label: "Course Date — 3rd choice", req: false },
                  ] as const).map((d) => (
                    <AppField key={d.key} label={d.label} required={d.req}>
                      <SelectMenu
                        required={d.req}
                        value={f[d.key]}
                        onChange={(v) => setF((p) => ({ ...p, [d.key]: v }))}
                        placeholder="— Choose —"
                        options={dateOptions}
                        triggerClassName={APP_INPUT}
                      />
                    </AppField>
                  ))}
                </div>

                <AppField label="Address">
                  <input value={f.address} onChange={set("address")} type="text" className={APP_INPUT} />
                </AppField>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <AppField label="Your Mobile" required>
                    <input required value={f.mobile} onChange={set("mobile")} type="tel" className={APP_INPUT} />
                  </AppField>
                  <AppField label="Date of Birth">
                    <input value={f.dob} onChange={set("dob")} type="date" className={APP_INPUT} style={{ colorScheme: "light" }} />
                  </AppField>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <AppField label="Occupation">
                    <input value={f.occupation} onChange={set("occupation")} type="text" className={APP_INPUT} />
                  </AppField>
                  <AppField label="Country">
                    <input value={f.country} onChange={set("country")} type="text" className={APP_INPUT} />
                  </AppField>
                </div>

                <AppField label="Your Message">
                  <textarea value={f.message} onChange={set("message")} rows={4} className={`${APP_INPUT} resize-none`} />
                </AppField>

                <label className="flex items-start gap-3 cursor-pointer">
                  <input
                    required
                    type="checkbox"
                    checked={f.accept}
                    onChange={(e) => setF((p) => ({ ...p, accept: e.target.checked }))}
                    className="mt-0.5 h-[18px] w-[18px] shrink-0 accent-[#074240] cursor-pointer"
                  />
                  <span className="font-['Lato:Regular',sans-serif] text-[#434a4a] text-[14px] leading-[1.6]">
                    Please accept our Terms &amp; Conditions and Privacy Policy.
                  </span>
                </label>

                <Honeypot />
                <FormError message={sendError} />

                {/* Submit */}
                <button
                  type="submit"
                  disabled={sending}
                  aria-busy={sending}
                  className="w-full bg-[#074240] text-white rounded-full py-4 font-['Lato:Medium',sans-serif] text-[16px] hover:bg-[#0a5552] transition-colors mt-1 disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {sending ? "Sending…" : "Submit Application"}
                </button>

              </form>
            )}
          </div>

          {/* ── Right: photo panel ── */}
          <div className="relative lg:flex-1 h-[260px] sm:h-[360px] lg:h-auto overflow-hidden">
            <img loading="lazy" decoding="async"
              src={imgTexture}
              alt=""
              className="absolute inset-0 w-full h-full object-cover opacity-5 mix-blend-hard-light pointer-events-none z-10"
            />
            <img loading="lazy" decoding="async"
              src={imgYoga}
              alt="Yoga appointment"
              className="absolute inset-0 w-full h-full object-cover object-center"
            />
            {/* Subtle dark overlay */}
            <div className="absolute inset-0 bg-black/9" />
          </div>
        </div>
      </section>

      {/* ── Why book with us ── */}
      <section className="px-4 sm:px-6 lg:px-10 pb-14 lg:pb-[80px]">
        <div className="max-w-[1280px] mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {[
              {
                icon: "🌿",
                title: "Expert Guidance",
                body: "Our certified instructors tailor each session to your individual journey and well-being goals.",
              },
              {
                icon: "🕊️",
                title: "Flexible Scheduling",
                body: "Choose dates and times that suit your lifestyle — morning, afternoon, or weekend sessions available.",
              },
              {
                icon: "✨",
                title: "Personalised Experience",
                body: "From retreat selection to program design, every detail is curated with intention just for you.",
              },
            ].map((item) => (
              <div
                key={item.title}
                className="bg-white rounded-[20px] p-7 lg:p-10 flex flex-col gap-4"
              >
                <span className="text-[32px]">{item.icon}</span>
                <h3 className="font-['Marcellus:Regular',sans-serif] text-[#151515] text-[22px] lg:text-[24px] tracking-[-0.5px]">
                  {item.title}
                </h3>
                <p className="font-['Lato:Regular',sans-serif] text-[#434a4a] text-[15px] lg:text-[16px] leading-[1.7]">
                  {item.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
}
