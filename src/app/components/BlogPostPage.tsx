import { submitForm, Honeypot, FormError, usePageMeta, useJsonLd, absUrl, SITE } from "./SiteExtras";
import NotFoundPage from "./NotFoundPage";
import { useState, useMemo } from "react";
import { useCms } from "../cms/useCms";
import { RichText } from "../cms/RichText";
import type { PortableTextBlock } from "@portabletext/react";
import { useParams, Link } from "react-router";
import { placeholder, LCP } from "./imagePlaceholder";

// ─── Images — OpenPost1-1 (article body pool) ────────────────────────────────
const imgTexture = placeholder("imgTexture");
const imgHero1 = placeholder("imgHero1");
const imgOverlay1 = placeholder("imgOverlay1");
const imgBody1 = placeholder("imgBody1");
const imgBody2 = placeholder("imgBody2");
const imgBody4 = placeholder("imgBody4");
const imgRelated1 = placeholder("imgRelated1");
const imgRelated2 = placeholder("imgRelated2");
const imgRelated3 = placeholder("imgRelated3");
const imgAvatar = placeholder("imgAvatar");
const imgCommentA = placeholder("imgCommentA");
const imgCommentB = placeholder("imgCommentB");
const imgSidecard = placeholder("imgSidecard");

// ─── Images — OpenPost2 (unique variant-2 hero + extra images) ───────────────
const imgHero2 = placeholder("imgHero2");
const imgBody5 = placeholder("imgBody5");

// ─── Shared post data (mirrors BlogPage.tsx BLOG_POSTS) ──────────────────────
// Built-in content — shown when Sanity has no published posts (and used to seed Sanity).
export const BLOG_POSTS = [
  { id: 1,  slug: "wound-care-rehab-recovery-1",    category: "Health",          title: "Wound Care Plays a Major Role in Rehab and Recovery",      author: "Anna Rue",       date: "November 22, 2023", readTime: "8 min read" },
  { id: 2,  slug: "three-years-post-injury-1",       category: "Injury",          title: "Three Years Post Injury: Persistence and Progress",          author: "Jeremy Adelman", date: "October 15, 2023",  readTime: "6 min read" },
  { id: 3,  slug: "life-devoted-helping-others-1",   category: "Success Stories", title: "A Life Devoted to Helping Others Overcome Adversity",        author: "Anna Rue",       date: "September 8, 2023", readTime: "10 min read" },
  { id: 4,  slug: "wound-care-rehab-recovery-2",     category: "Health",          title: "9 Best Electric Toothbrushes For Perfect At-Home Teeth Cleaning", author: "Jeremy Adelman", date: "August 30, 2023",   readTime: "7 min read" },
  { id: 5,  slug: "three-years-post-injury-2",       category: "Yoga",            title: "How Mindful Movement Rewires the Nervous System",            author: "Anna Rue",       date: "July 18, 2023",     readTime: "9 min read" },
  { id: 6,  slug: "life-devoted-helping-others-2",   category: "Meditation",      title: "The Ancient Practice That Rewires Modern Minds",             author: "Jeremy Adelman", date: "June 5, 2023",      readTime: "5 min read" },
  { id: 7,  slug: "wound-care-rehab-recovery-3",     category: "Wellness",        title: "Collaboration between Different Ideas of Environment",        author: "Anna Rue",       date: "May 22, 2023",      readTime: "7 min read" },
  { id: 8,  slug: "three-years-post-injury-3",       category: "Retreat",         title: "Why Silence is the Most Underrated Healing Tool",            author: "Jeremy Adelman", date: "April 10, 2023",    readTime: "6 min read" },
  { id: 9,  slug: "life-devoted-helping-others-3",   category: "Mindfulness",     title: "Gratitude Practices for a More Meaningful Response",         author: "Anna Rue",       date: "March 3, 2023",     readTime: "8 min read" },
];

const RELATED_POSTS = [
  { title: "Wound Care Plays a Major Role in Rehab and Recovery", category: "Health",   img: imgRelated1, slug: "wound-care-rehab-recovery-1" },
  { title: "Three Years Post Injury: Persistence and Progress",   category: "Injury",   img: imgRelated2, slug: "three-years-post-injury-1"   },
  { title: "A Life Devoted to Helping Others",                    category: "Stories",  img: imgRelated3, slug: "life-devoted-helping-others-1"},
];

const COMMENTS = [
  { avatar: imgAvatar,   name: "Anna Rue",       date: "November 22, 2023", text: "Really insightful article — the section on breathwork timing was exactly what I needed. Thank you for sharing." },
  { avatar: imgCommentA, name: "Jeremy Adelman", date: "October 15, 2023",  text: "I've been practising yoga for 10 years and this gives great scientific backing for what I've experienced personally." },
  { avatar: imgCommentB, name: "Maria Santos",   date: "September 8, 2023", text: "Could you expand on the nervous-system regulation part? I'd love a deeper dive into that topic." },
];

// ─── Helpers ─────────────────────────────────────────────────────────────────
export const BODY_TEXT_1 = `On 11th March 2020 SARS-CoV-2 was declared a pandemic, a virus predominantly affecting the respiratory system. Within months there were also reports of neurological disturbances such as lack of smell and taste, dizziness and headaches. As the virus continued to spread from Wuhan through to neighboring countries and continents there was an increasing prevalence and severity of these neurological and psychiatric cases. Members of these professional organizations identified patients exhibiting these syndromes and a swift 5-minute clinical dataset was completed. It contained four critical components: diagnosis, demography, geography, and nature of the clinical syndrome.`;
export const BODY_TEXT_2 = `Patients were stratified into a younger (under 60) group and an older (over 60) group, and symptoms were clustered into broader clinical syndromes associated with the condition and classified into case definitions. Eligibility varies widely from state to state because each state created its own distribution system, sometimes varying by county, age group, occupation, or health status.`;
export const BODY_TEXT_3 = `I am fortunate to have many excellent practitioners in my life. I never thought I needed a special primary care physician until I realized that prevention is always more powerful than cure. The union of ancient and modern approaches is where I find the most sustainable well-being.`;
export const PULLQUOTE  = `Stillness is not the absence of movement — it is the presence of complete awareness within every breath.`;

// ─── Social share buttons ─────────────────────────────────────────────────────
function SocialShare({ direction = "row" }: { direction?: "row" | "col" }) {
  const cls = `flex ${direction === "col" ? "flex-col" : "flex-row"} gap-2`;
  const btn = "w-11 h-11 rounded-full bg-[#FAE1FB] flex items-center justify-center hover:bg-[#c3dbc5] transition-colors cursor-pointer shrink-0";
  const [copied, setCopied] = useState(false);
  const url = typeof window !== "undefined" ? window.location.href : "";
  const title = typeof document !== "undefined" ? document.title : "";
  const openShare = (href: string) => window.open(href, "_blank", "noopener,noreferrer,width=640,height=560");
  const copy = async () => {
    try { await navigator.clipboard.writeText(url); setCopied(true); setTimeout(() => setCopied(false), 1800); } catch { /* clipboard blocked */ }
  };
  // Instagram has no web share URL — use the native share sheet where available, otherwise copy the link.
  const nativeShare = async () => {
    if (navigator.share) { try { await navigator.share({ title, url }); } catch { /* dismissed */ } }
    else copy();
  };
  return (
    <div className={cls}>
      {/* Facebook */}
      <button type="button" onClick={() => openShare(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`)} className={btn} aria-label="Share on Facebook">
        <svg width="8" height="14" viewBox="0 0 12 22" fill="none">
          <path d="M7.5 7H10.5V4H7.5C5.843 4 4.5 5.343 4.5 7V9H2.5V12H4.5V22H7.5V12H10.5L11 9H7.5V7Z" fill="#151515" fillRule="evenodd" clipRule="evenodd" />
        </svg>
      </button>
      {/* Twitter/X */}
      <button type="button" onClick={() => openShare(`https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`)} className={btn} aria-label="Share on X (Twitter)">
        <svg width="14" height="12" viewBox="0 0 20 18" fill="none">
          <path d="M20 2.37a8.2 8.2 0 01-2.36.64A4.11 4.11 0 0019.44.3a8.27 8.27 0 01-2.61 1A4.1 4.1 0 0013.85 0C11.6 0 9.8 1.8 9.8 4.02c0 .31.04.62.1.91C6.48 4.77 3.44 3.17 1.4.74a4 4 0 00-.56 2.02c0 1.4.71 2.62 1.79 3.34A4.08 4.08 0 01.8 5.55v.05c0 1.95 1.38 3.57 3.22 3.94a4.1 4.1 0 01-1.85.07 4.1 4.1 0 003.83 2.84A8.24 8.24 0 010 14.05 11.62 11.62 0 006.29 16c7.55 0 11.68-6.26 11.68-11.68 0-.18 0-.35-.01-.53A8.34 8.34 0 0020 2.37z" fill="#151515" />
        </svg>
      </button>
      {/* Instagram */}
      <button type="button" onClick={nativeShare} className={btn} aria-label="Share">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" fill="#151515"/>
        </svg>
      </button>
      {/* Link */}
      <button type="button" onClick={copy} className={`${btn} bg-[#c3dbc5]`} aria-label={copied ? "Link copied" : "Copy link"} title={copied ? "Link copied!" : "Copy link"}>
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
          <path d="M10 13a5 5 0 007.54.54l3-3a5 5 0 00-7.07-7.07l-1.72 1.71" stroke="#151515" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M14 11a5 5 0 00-7.54-.54l-3 3a5 5 0 007.07 7.07l1.71-1.71" stroke="#151515" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </button>
    </div>
  );
}

// ─── Article body sections (reused across both variants) ─────────────────────
function ArticleBody({ withSideAside = false }: { withSideAside?: boolean }) {
  const [openAccordion, setOpenAccordion] = useState<number | null>(0);
  const accordions = [
    { title: "The science behind a healthy sense of Self", body: BODY_TEXT_1 },
    { title: "Collaboration on key to a meaningful response", body: BODY_TEXT_2 },
    { title: "Electric vs. Manual Toothbrush", body: "When the first vaccines were approved for emergency use, there were too few doses available to vaccinate everyone. States had to create systems to decide who received the vaccine first." },
  ];
  const bullets = [
    "Eligibility varies widely from state to state because each state created its own system.",
    "Some health issues that could increase COVID-19-related risk.",
    "Verification of age or health conditions varies widely.",
  ];

  return (
    <div className="flex flex-col gap-8 lg:gap-[50px]">

      {/* Body text 1 */}
      <p className="font-['Lato:Regular',sans-serif] text-[#434a4a] text-[16px] lg:text-[18px] leading-[1.8]">{BODY_TEXT_1}</p>

      {/* Wide inline image */}
      <div className="relative rounded-[20px] overflow-hidden h-[260px] sm:h-[360px] lg:h-[420px]">
        <img src={imgBody1} alt="Article illustration" loading="lazy" decoding="async" className="absolute inset-0 w-full h-full object-cover" />
        <img loading="lazy" decoding="async" src={imgTexture} alt="" className="absolute inset-0 w-full h-full object-cover mix-blend-lighten opacity-10 pointer-events-none" />
      </div>
      <p className="font-['Lato:Regular',sans-serif] text-[#434a4a] text-[14px] text-center -mt-4">Photo by Conscious Design / Unsplash</p>

      {/* Split card: image left + CTA text right */}
      <div className="flex flex-col lg:flex-row rounded-[20px] overflow-hidden">
        <div className="relative flex-1 min-h-[260px] lg:min-h-[280px]">
          <img src={imgBody2} alt="" loading="lazy" decoding="async" className="absolute inset-0 w-full h-full object-cover" />
        </div>
        <div className="bg-white flex-shrink-0 lg:w-[44%] flex flex-col gap-6 lg:gap-[30px] p-8 lg:p-[50px] justify-center">
          <h3 className="font-['Marcellus:Regular',sans-serif] text-[#151515] text-[28px] sm:text-[36px] lg:text-[48px] xl:text-[56px] tracking-[-1.5px] leading-tight">
            Electric vs. Manual Toothbrush
          </h3>
          <p className="font-['Lato:Regular',sans-serif] text-[#434a4a] text-[15px] lg:text-[18px] leading-[1.7]">
            When the first vaccines were approved for emergency use, there were too few doses available to vaccinate everyone who wanted them.
          </p>
          <Link to="/contact" className="inline-flex items-center justify-center self-start bg-[#c3dbc5] rounded-full px-7 py-4 font-['Lato:Medium',sans-serif] text-[#151515] text-[15px] hover:opacity-90 transition-opacity">
            More Reviews
          </Link>
        </div>
      </div>

      {/* Body text 2 */}
      <p className="font-['Lato:Regular',sans-serif] text-[#434a4a] text-[16px] lg:text-[18px] leading-[1.8]">{BODY_TEXT_2}</p>

      {/* Pull quote */}
      <blockquote className="bg-white rounded-[20px] p-8 lg:p-[50px] lg:px-[60px]">
        <p className="font-['Marcellus:Regular',sans-serif] text-[#151515] text-[22px] sm:text-[26px] lg:text-[32px] tracking-[-1px] leading-[1.4] text-center">
          {`"`}{PULLQUOTE}{`"`}
        </p>
        <p className="font-['Marcellus:Regular',sans-serif] text-[#151515] text-[16px] text-center mt-5">Dr. John Collins</p>
      </blockquote>

      {/* Inline portrait image + body text */}
      <div className={`flex flex-col ${withSideAside ? "" : "lg:flex-row"} gap-8 lg:gap-10 items-start`}>
        <div className="relative rounded-[20px] overflow-hidden flex-shrink-0 w-full lg:w-[380px] h-[300px] sm:h-[420px] lg:h-[530px]">
          <img src={imgBody4} alt="Meditation" loading="lazy" decoding="async" className="absolute inset-0 w-full h-full object-cover object-top" />
        </div>
        <div className="flex flex-col gap-5 flex-1">
          <p className="font-['Lato:Regular',sans-serif] text-[#434a4a] text-[16px] lg:text-[18px] leading-[1.8]">{BODY_TEXT_2}</p>
          <p className="font-['Lato:Regular',sans-serif] text-[#434a4a] text-[16px] lg:text-[18px] leading-[1.8]">{BODY_TEXT_3}</p>
        </div>
      </div>

      {/* Green pull quote block */}
      <div className="bg-[#c3dbc5] rounded-[20px] px-8 sm:px-14 lg:px-[60px] py-10 lg:py-[60px]">
        <p className="font-['Marcellus:Regular',sans-serif] text-[#151515] text-[20px] sm:text-[26px] lg:text-[32px] tracking-[-1px] leading-[1.4] text-center">
          I am fortunate to have many excellent doctors in my family and amongst my friends. I never thought I needed a special primary care physician.
        </p>
      </div>

      {/* Accordions */}
      <div className="flex flex-col">
        <h3 className="font-['Marcellus:Regular',sans-serif] text-[#151515] text-[22px] lg:text-[28px] tracking-[-0.5px] pb-6 border-b border-[#e8e0d8]">
          Collaboration on key to a meaningful response
        </h3>
        {accordions.map((acc, i) => (
          <div key={i}>
            <button
              onClick={() => setOpenAccordion(openAccordion === i ? null : i)}
              className="w-full flex items-center justify-between py-5 text-left group"
            >
              <span className="font-['Marcellus:Regular',sans-serif] text-[#151515] text-[18px] lg:text-[22px] tracking-[-0.5px] group-hover:text-[#074240] transition-colors pr-4">
                {acc.title}
              </span>
              <span className={`shrink-0 w-5 h-5 flex items-center justify-center transition-transform duration-200 ${openAccordion === i ? "rotate-45" : ""}`}>
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path d="M8 3.33V12.67M3.33 8H12.67" stroke="#074240" strokeWidth="2" strokeLinecap="round" />
                </svg>
              </span>
            </button>
            {openAccordion === i && (
              <div className="pb-6 border-b border-[#e8e0d8]">
                <p className="font-['Lato:Regular',sans-serif] text-[#434a4a] text-[15px] lg:text-[18px] leading-[1.8]">{acc.body}</p>
              </div>
            )}
            {openAccordion !== i && <div className="border-b border-[#e8e0d8]" />}
          </div>
        ))}
      </div>

      {/* Bullet list */}
      <div className="flex flex-col gap-5">
        {bullets.map((item, i) => (
          <div key={i} className="flex items-start gap-4">
            <span className="shrink-0 mt-1 w-5 h-5 flex items-center justify-center">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M8 3.33V12.67M3.33 8H12.67" stroke="#074240" strokeWidth="2" strokeLinecap="round" />
              </svg>
            </span>
            <p className="font-['Lato:Regular',sans-serif] text-[#434a4a] text-[15px] lg:text-[18px] leading-[1.8] flex-1">{item}</p>
          </div>
        ))}
      </div>

      {/* Inline image — body image 5 */}
      <div className="relative rounded-[20px] overflow-hidden h-[220px] sm:h-[300px] lg:h-[380px]">
        <img src={imgBody5} alt="Yoga practice" loading="lazy" decoding="async" className="absolute inset-0 w-full h-full object-cover" />
      </div>

    </div>
  );
}

// ─── Author bio card ──────────────────────────────────────────────────────────
function AuthorCard({ name, bio }: { name: string; bio: string }) {
  return (
    <div className="bg-white rounded-[20px] overflow-hidden flex flex-col sm:flex-row gap-0">
      <div className="relative sm:w-[200px] lg:w-[240px] h-[180px] sm:h-auto shrink-0">
        <img src={imgSidecard} alt={name} loading="lazy" decoding="async" className="absolute inset-0 w-full h-full object-cover object-top" />
      </div>
      <div className="flex flex-col gap-4 p-6 lg:p-8 justify-center flex-1">
        <div className="flex flex-col gap-1">
          <p className="font-['Marcellus:Regular',sans-serif] text-[#151515] text-[20px] lg:text-[24px] leading-[1.3]">{name}</p>
          <p className="font-['Lato:SemiBold',sans-serif] text-[#434a4a] text-[12px] tracking-[1px] uppercase">Author</p>
        </div>
        <p className="font-['Lato:Regular',sans-serif] text-[#434a4a] text-[14px] lg:text-[16px] leading-[1.7]">{bio}</p>
        <Link to="/teachers" className="inline-flex items-center justify-center self-start bg-[#c3dbc5] rounded-full px-6 py-3 font-['Lato:Medium',sans-serif] text-[#151515] text-[14px] hover:opacity-90 transition-opacity">
          Open Profile
        </Link>
      </div>
    </div>
  );
}

// ─── Related posts ────────────────────────────────────────────────────────────
function RelatedPosts({ items }: { items: { title: string; category: string; img: string; slug: string }[] }) {
  if (!items.length) return null;
  return (
    <div className="flex flex-col gap-6 lg:gap-8">
      <h2 className="font-['Marcellus:Regular',sans-serif] text-[#151515] text-[28px] lg:text-[36px] tracking-[-1px]">Related Posts</h2>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 lg:gap-6">
        {items.map((p) => (
          <Link key={p.slug} to={`/blog/${p.slug}`} className="group flex flex-col bg-white rounded-[20px] overflow-hidden hover:shadow-md transition-shadow">
            <div className="relative h-[180px] sm:h-[160px] lg:h-[200px] overflow-hidden">
              <img src={p.img} alt={p.title} loading="lazy" decoding="async" className="absolute inset-0 w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-500" />
              <span className="absolute bottom-3 left-4 bg-[#c3dbc5] px-3 py-1 rounded-full font-['Lato:SemiBold',sans-serif] text-[11px] tracking-[1px] uppercase text-[#151515]">{p.category}</span>
            </div>
            <div className="p-5">
              <p className="font-['Marcellus:Regular',sans-serif] text-[#151515] text-[16px] lg:text-[18px] tracking-[-0.5px] leading-[1.4] group-hover:text-[#074240] transition-colors line-clamp-2">{p.title}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

// ─── Comments section ─────────────────────────────────────────────────────────
function Comments() {
  return (
    <div className="flex flex-col gap-6 lg:gap-8">
      <h2 className="font-['Marcellus:Regular',sans-serif] text-[#151515] text-[28px] lg:text-[36px] tracking-[-1px]">
        Comments ({COMMENTS.length})
      </h2>
      <div className="flex flex-col gap-6">
        {COMMENTS.map((c, i) => (
          <div key={i} className="bg-white rounded-[20px] p-6 lg:p-8 flex gap-4 lg:gap-6">
            <img loading="lazy" decoding="async" src={c.avatar} alt={c.name} className="w-10 h-10 lg:w-12 lg:h-12 rounded-full object-cover shrink-0" />
            <div className="flex-1 flex flex-col gap-2">
              <div className="flex items-center gap-3 flex-wrap">
                <span className="font-['Marcellus:Regular',sans-serif] text-[#151515] text-[16px] lg:text-[18px]">{c.name}</span>
                <span className="font-['Lato:Regular',sans-serif] text-[#8b8a82] text-[13px]">{c.date}</span>
              </div>
              <p className="font-['Lato:Regular',sans-serif] text-[#434a4a] text-[14px] lg:text-[16px] leading-[1.7]">{c.text}</p>
              <button className="self-start font-['Lato:Medium',sans-serif] text-[#074240] text-[13px] hover:underline">Reply</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Leave a Reply form ───────────────────────────────────────────────────────
function LeaveReply() {
  const [form, setForm] = useState({ name: "", email: "", comment: "" });
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);
  const [sendError, setSendError] = useState<string | null>(null);
  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const bot = (e.currentTarget.elements.namedItem("botcheck") as HTMLInputElement | null)?.checked;
    setSending(true); setSendError(null);
    const res = await submitForm("Blog comment", { ...form, post: window.location.pathname, botcheck: bot });
    setSending(false);
    if (res.ok) setSent(true); else setSendError(res.error);
  };
  const INPUT = "w-full bg-white rounded-[30px] px-6 py-4 font-['Lato:Regular',sans-serif] text-[#434a4a] text-[15px] lg:text-[16px] outline-none placeholder:text-[#8b8a82] focus:shadow-[0_0_0_2px_rgba(7,66,64,0.18)] transition-shadow";

  return (
    <div className="flex flex-col gap-6 lg:gap-8">
      <h2 className="font-['Marcellus:Regular',sans-serif] text-[#151515] text-[28px] lg:text-[36px] tracking-[-1px]">Leave a Reply</h2>
      {sent ? (
        <div className="bg-[#c3dbc5] rounded-[20px] p-8 text-center">
          <p className="font-['Marcellus:Regular',sans-serif] text-[#151515] text-[20px]">Thank you for your comment!</p>
        </div>
      ) : (
        <form onSubmit={onSubmit} className="flex flex-col gap-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <input required placeholder="Your Name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className={`${INPUT} flex-1`} />
            <input required type="email" placeholder="Your Email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className={`${INPUT} flex-1`} />
          </div>
          <textarea required rows={6} placeholder="Your comment..." value={form.comment} onChange={(e) => setForm({ ...form, comment: e.target.value })} className={`${INPUT} resize-none rounded-[20px]`} />
          <Honeypot />
          <FormError message={sendError} />
          <button type="submit" disabled={sending} className="self-start bg-[#c3dbc5] rounded-full px-10 py-4 font-['Lato:Medium',sans-serif] text-[#151515] text-[15px] hover:opacity-90 transition-opacity disabled:opacity-60">
            {sending ? "Sending…" : "Submit"}
          </button>
        </form>
      )}
    </div>
  );
}

// ─── Variant 1 Hero — gradient bg + title centred, hero image below ───────────
function HeroVariant1({ post }: { post: Post }) {
  return (
    <section className="px-4 sm:px-6 lg:px-10 pt-6 sm:pt-8 lg:pt-10">
      <div className="relative rounded-[16px] lg:rounded-[20px] overflow-hidden">
        {/* Gradient texture bg */}
        <img loading="eager" decoding="async" src={imgTexture} alt="" className="absolute inset-0 w-full h-full object-cover opacity-70 pointer-events-none" />
        <div className="relative z-10 flex flex-col items-center gap-8 lg:gap-[50px] px-6 sm:px-10 pt-12 lg:pt-[60px] pb-0">
          {/* Category + title + meta */}
          <div className="flex flex-col items-center gap-5 lg:gap-[30px] max-w-[900px] text-center">
            <span className="bg-white rounded-full px-4 py-1 font-['Lato:SemiBold',sans-serif] text-[#151515] text-[12px] tracking-[1px] uppercase">
              {post.category}
            </span>
            <h1 className="font-['Marcellus:Regular',sans-serif] text-[#151515] text-[36px] sm:text-[52px] lg:text-[72px] xl:text-[84px] tracking-[-3px] lg:tracking-[-4px] leading-none">
              {post.title}
            </h1>
            <p className="font-['Lato:Regular',sans-serif] text-[#434a4a] text-[16px] lg:text-[20px] leading-[1.6] max-w-[680px]">
              Tooth decay — or dental caries — is an infectious disease process that causes damage to the structure of teeth. Cavities are the most notable consequences of dental caries.
            </p>
            {/* Author + date */}
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-3">
                <img loading="eager" decoding="async" src={imgAvatar} alt={post.author} className="w-10 h-10 rounded-full object-cover" />
                <span className="font-['Marcellus:Regular',sans-serif] text-[#151515] text-[16px]">{post.author}</span>
              </div>
              <span className="font-['Marcellus:Regular',sans-serif] text-[#434a4a] text-[16px]">{post.date}</span>
              <span className="font-['Lato:Regular',sans-serif] text-[#8b8a82] text-[14px]">{post.readTime}</span>
            </div>
          </div>

          {/* Hero image — overlaps bottom of the header section */}
          <div className="relative w-full rounded-t-[20px] overflow-hidden h-[280px] sm:h-[400px] lg:h-[560px]">
            <img {...LCP} loading="eager" decoding="async" src={post.img ?? imgHero1} alt={post.imgAlt || post.title} className="absolute inset-0 w-full h-full object-cover object-center" />
            <img loading="eager" decoding="async" src={imgOverlay1} alt="" className="absolute inset-0 w-full h-full object-cover mix-blend-lighten opacity-10 pointer-events-none" />
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Variant 2 Hero — full-bleed image with title overlaid ───────────────────
function HeroVariant2({ post }: { post: Post }) {
  return (
    <section className="px-4 sm:px-6 lg:px-10 pt-6 sm:pt-8 lg:pt-10">
      <div className="relative rounded-[16px] lg:rounded-[20px] overflow-hidden min-h-[400px] sm:min-h-[520px] lg:min-h-[680px] flex items-center">
        {/* Background: large full-bleed image */}
        <img {...LCP} loading="eager" decoding="async" src={post.img ?? imgHero2} alt={post.imgAlt || post.title} className="absolute inset-0 w-full h-full object-cover object-center" />
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/20 to-black/60" />
        <img loading="eager" decoding="async" src={imgTexture} alt="" className="absolute inset-0 w-full h-full object-cover opacity-60 mix-blend-lighten pointer-events-none" />

        {/* Centered content */}
        <div className="relative z-10 flex flex-col items-center gap-6 lg:gap-[30px] px-6 sm:px-10 lg:px-[120px] py-16 lg:py-[80px] w-full text-center">
          <span className="bg-white rounded-full px-4 py-1 font-['Lato:SemiBold',sans-serif] text-[#151515] text-[12px] tracking-[1px] uppercase">
            {post.category}
          </span>
          <h1 className="font-['Marcellus:Regular',sans-serif] text-white text-[36px] sm:text-[52px] lg:text-[72px] xl:text-[84px] tracking-[-3px] lg:tracking-[-4px] leading-none max-w-[1000px]">
            {post.title}
          </h1>
          <p className="font-['Lato:Regular',sans-serif] text-white/80 text-[16px] lg:text-[20px] leading-[1.6] max-w-[680px]">
            Tooth decay — or dental caries — is an infectious disease process that causes damage to the structure of teeth.
          </p>
          <div className="flex items-center gap-6 flex-wrap justify-center">
            <div className="flex items-center gap-3">
              <img loading="eager" decoding="async" src={imgAvatar} alt={post.author} className="w-10 h-10 rounded-full object-cover" />
              <span className="font-['Marcellus:Regular',sans-serif] text-white text-[16px]">{post.author}</span>
            </div>
            <span className="font-['Marcellus:Regular',sans-serif] text-white/70 text-[16px]">{post.date}</span>
            <span className="font-['Lato:Regular',sans-serif] text-white/60 text-[14px]">{post.readTime}</span>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────
// ── Content source: Sanity when published, otherwise the built-in BLOG_POSTS ──
type Post = (typeof BLOG_POSTS)[number] & {
  img?: string; imgAlt?: string; body?: PortableTextBlock[]; authorBio?: string; excerpt?: string; publishedAt?: string;
  seo?: { metaTitle?: string; metaDescription?: string };
};
const DEFAULT_AUTHOR_BIO = "I enjoy getting to know my students and building meaningful relationships. I understand that every practice journey is personal, and I'm here to guide yours with patience and care.";

function usePostList(): Post[] {
  const { posts } = useCms();
  return useMemo(
    () => (posts ? posts.map((p, i): Post => ({ id: i + 1, ...p })) : BLOG_POSTS),
    [posts],
  );
}

export default function BlogPostPage() {
  const { slug } = useParams();
  const posts = usePostList();
  // Unknown slug → real 404 (prevents "soft 404" duplicate pages in Google).
  if (!posts.some((p) => p.slug === slug)) return <NotFoundPage />;
  return <BlogPost key={slug} slug={slug!} posts={posts} />;
}

function BlogPost({ slug, posts }: { slug: string; posts: Post[] }) {
  const idx  = posts.findIndex((p) => p.slug === slug);
  const post = posts[idx >= 0 ? idx : 0];
  // Related: up to 3 other posts (same category first) — or the built-in samples.
  const related = posts === BLOG_POSTS
    ? RELATED_POSTS
    : [...posts.filter((p) => p.slug !== slug && p.category === post.category), ...posts.filter((p) => p.slug !== slug && p.category !== post.category)]
        .slice(0, 3)
        .map((p, i) => ({ title: p.title, category: p.category, slug: p.slug, img: p.img ?? [imgRelated1, imgRelated2, imgRelated3][i] }));
  const authorBio = post.authorBio || DEFAULT_AUTHOR_BIO;
  // Sanity post → its own article (or just the summary if the article is still empty).
  // The sample layout (<ArticleBody/>) is only used for the built-in fallback posts.
  const article = post.body
    ? <RichText value={post.body} />
    : posts === BLOG_POSTS
      ? null
      : <p className="font-['Lato:Regular',sans-serif] text-[#434a4a] text-[16px] lg:text-[18px] leading-[1.8]">{post.excerpt ?? ""}</p>;

  // Real article title in <title>/OG + BlogPosting rich-result schema.
  usePageMeta({
    title: post.seo?.metaTitle || `${post.title} | ${SITE.name} Journal`,
    description: post.seo?.metaDescription || post.excerpt || `${post.title} (${post.readTime}). ${post.category} insights by ${post.author} from the ${SITE.name} yoga journal in Rishikesh, India.`,
    type: "article",
    image: post.img,
  });
  const published = new Date(post.publishedAt || post.date);
  useJsonLd("syn-article-schema", {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    articleSection: post.category,
    author: { "@type": "Person", name: post.author },
    publisher: { "@type": "Organization", name: SITE.name, logo: { "@type": "ImageObject", url: SITE.ogImage } },
    ...(isNaN(published.getTime()) ? {} : { datePublished: published.toISOString().slice(0, 10) }),
    image: post.img ?? SITE.ogImage,
    mainEntityOfPage: absUrl(`/blog/${post.slug}`),
  });
  const isVariant2 = idx % 2 === 1; // odd-index posts use full-bleed variant

  return (
    <div className="w-full">

      {/* ── Hero (alternate between two variants) ── */}
      {isVariant2 ? <HeroVariant2 post={post} /> : <HeroVariant1 post={post} />}

      {/* ── Article body ── */}
      <section className="px-4 sm:px-6 lg:px-10 py-10 sm:py-14 lg:py-[70px]">
        <div className="max-w-[1280px] mx-auto">

          {isVariant2 ? (
            /* ── Variant 2: left article + right sticky sidebar ── */
            <div className="flex flex-col lg:flex-row gap-10 xl:gap-[80px] items-start">
              {/* Left: article + share */}
              <div className="flex gap-5 flex-1 min-w-0">
                {/* Vertical share (desktop) */}
                <div className="hidden lg:flex flex-col gap-3 items-center pt-2 shrink-0">
                  <span className="font-['Marcellus:Regular',sans-serif] text-[#151515] text-[14px] tracking-[-0.5px] mb-1">Share</span>
                  <SocialShare direction="col" />
                </div>
                {/* Article */}
                <div className="flex-1 min-w-0">
                  {article ?? <ArticleBody />}
                </div>
              </div>

              {/* Right: author sidebar */}
              <div className="lg:w-[260px] xl:w-[300px] shrink-0 flex flex-col gap-6 lg:sticky lg:top-24">
                {/* Author mini-card */}
                <div className="bg-white rounded-[20px] overflow-hidden flex flex-col">
                  <div className="relative h-[180px]">
                    <img src={imgSidecard} alt={post.author} loading="lazy" decoding="async" className="absolute inset-0 w-full h-full object-cover object-top" />
                  </div>
                  <div className="p-5 flex flex-col gap-3">
                    <div>
                      <p className="font-['Marcellus:Regular',sans-serif] text-[#151515] text-[18px]">{post.author}</p>
                      <p className="font-['Lato:SemiBold',sans-serif] text-[#434a4a] text-[11px] tracking-[1px] uppercase">Author</p>
                    </div>
                    <p className="font-['Lato:Regular',sans-serif] text-[#434a4a] text-[13px] leading-[1.6]">
                      {authorBio.length > 95 ? authorBio.slice(0, 92).replace(/\s+\S*$/, "") + "…" : authorBio}
                    </p>
                    <Link to="/teachers" className="inline-flex items-center justify-center w-full bg-[#c3dbc5] rounded-full py-3 font-['Lato:Medium',sans-serif] text-[#151515] text-[14px] hover:opacity-90 transition-opacity">
                      Open Profile
                    </Link>
                  </div>
                </div>

                {/* Share horizontal (mobile) + vertical label */}
                <div className="lg:hidden flex flex-col gap-3">
                  <p className="font-['Marcellus:Regular',sans-serif] text-[#151515] text-[18px]">Share</p>
                  <SocialShare direction="row" />
                </div>
              </div>
            </div>
          ) : (
            /* ── Variant 1: full-width article + sticky left share bar ── */
            <div className="flex gap-5 lg:gap-8 items-start">
              {/* Sticky left share column (desktop only) */}
              <div className="hidden lg:flex flex-col gap-3 items-center lg:sticky lg:top-24 shrink-0 pt-2">
                <span className="font-['Marcellus:Regular',sans-serif] text-[#151515] text-[14px] tracking-[-0.5px] mb-1">Share</span>
                <SocialShare direction="col" />
              </div>

              {/* Main article */}
              <div className="flex-1 min-w-0">
                {article ?? <ArticleBody withSideAside />}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* ── Author bio (full-width, only for Variant 1) ── */}
      {!isVariant2 && (
        <section className="px-4 sm:px-6 lg:px-10 pb-10 sm:pb-14">
          <div className="max-w-[1280px] mx-auto">
            <AuthorCard
              name={post.author}
              bio={authorBio}
            />
          </div>
        </section>
      )}

      {/* ── Mobile share bar ── */}
      <section className="lg:hidden px-4 sm:px-6 pb-8">
        <div className="max-w-[1280px] mx-auto flex flex-col gap-3">
          <p className="font-['Marcellus:Regular',sans-serif] text-[#151515] text-[18px]">Share</p>
          <SocialShare direction="row" />
        </div>
      </section>

      {/* ── Related Posts ── */}
      <section className="px-4 sm:px-6 lg:px-10 pb-10 sm:pb-14">
        <div className="max-w-[1280px] mx-auto">
          <RelatedPosts items={related} />
        </div>
      </section>

      {/* ── Comments ── */}
      <section className="px-4 sm:px-6 lg:px-10 pb-10 sm:pb-14">
        <div className="max-w-[1280px] mx-auto">
          <Comments />
        </div>
      </section>

      {/* ── Leave a Reply ── */}
      <section className="px-4 sm:px-6 lg:px-10 pb-14 lg:pb-[80px]">
        <div className="max-w-[1280px] mx-auto">
          <LeaveReply />
        </div>
      </section>

    </div>
  );
}