import { Link } from "react-router";
import { useCms } from "../cms/useCms";
import { Breadcrumbs } from "./SiteExtras";

const GROUPS: { title: string; links: { to: string; label: string }[] }[] = [
  {
    title: "Main",
    links: [
      { to: "/", label: "Home" },
      { to: "/about", label: "About Us" },
      { to: "/teachers", label: "Our Teachers" },
      { to: "/contact", label: "Contact Us" },
      { to: "/prices", label: "Prices" },
      { to: "/appointment", label: "Apply / Book" },
    ],
  },
  {
    title: "Programs",
    links: [
      { to: "/programs", label: "All Programs" },
      { to: "/programs/yoga-course-for-beginners", label: "Yoga Course for Beginners" },
      { to: "/programs/200-hrs-hatha-yoga-teacher-training", label: "200 Hrs Hatha Teacher Training" },
      { to: "/programs/200-hrs-vinyasa-yoga-teacher-training", label: "200 Hrs Vinyasa Teacher Training" },
      { to: "/programs/200-hrs-kundalini-yoga-teacher-training", label: "200 Hrs Kundalini Teacher Training" },
    ],
  },
  {
    title: "Retreats",
    links: [
      { to: "/retreats", label: "All Retreats" },
      { to: "/retreats/roots-of-stillness", label: "Roots of Stillness" },
      { to: "/retreats/sacred-flow", label: "Sacred Flow" },
      { to: "/retreats/winter-of-presence", label: "Winter of Presence" },
      { to: "/retreats/the-inner-horizon", label: "The Inner Horizon" },
      { to: "/retreats/awaken-in-the-wild", label: "Awaken in the Wild" },
      { to: "/retreats/paths-of-awakening", label: "Paths of Awakening" },
    ],
  },
  {
    title: "Teachers",
    links: [
      { to: "/teachers", label: "All Teachers" },
      { to: "/teachers/raj-singh", label: "Raj Singh" },
      { to: "/teachers/gokul-bisht", label: "Gokul Bisht" },
      { to: "/teachers/shashank-badoni", label: "Shashank Badoni" },
      { to: "/teachers/gopal", label: "Gopal" },
      { to: "/teachers/angela-carbone", label: "Angela Carbone" },
      { to: "/teachers/meghan-conner", label: "Meghan Conner" },
      { to: "/teachers/sofia-renner", label: "Sofia Renner" },
      { to: "/teachers/lena-hart", label: "Lena Hart" },
      { to: "/teachers/maya-tran", label: "Maya Tran" },
      { to: "/teachers/priya-sharma", label: "Priya Sharma" },
    ],
  },
  {
    title: "Journal",
    links: [
      { to: "/blog", label: "Blog & Journal" },
      { to: "/blog/wound-care-rehab-recovery-1", label: "Wound Care Plays a Major Role in Rehab and Recovery" },
      { to: "/blog/three-years-post-injury-1", label: "Three Years Post Injury: Persistence and Progress" },
      { to: "/blog/life-devoted-helping-others-1", label: "A Life Devoted to Helping Others Overcome Adversity" },
      { to: "/blog/wound-care-rehab-recovery-2", label: "9 Best Electric Toothbrushes For Perfect At-Home Teeth Cleaning" },
      { to: "/blog/three-years-post-injury-2", label: "How Mindful Movement Rewires the Nervous System" },
      { to: "/blog/life-devoted-helping-others-2", label: "The Ancient Practice That Rewires Modern Minds" },
      { to: "/blog/wound-care-rehab-recovery-3", label: "Collaboration between Different Ideas of Environment" },
      { to: "/blog/three-years-post-injury-3", label: "Why Silence is the Most Underrated Healing Tool" },
      { to: "/blog/life-devoted-helping-others-3", label: "Gratitude Practices for a More Meaningful Response" },
    ],
  },
  {
    title: "Legal",
    links: [
      { to: "/privacy", label: "Privacy Policy" },
      { to: "/terms", label: "Terms & Conditions" },
      { to: "/sitemap", label: "Sitemap" },
    ],
  },
];

export default function SitemapPage() {
  // Detail-page links follow Sanity when published (keeps the "All …" link first).
  const cms = useCms();
  const dynamic: Record<string, { to: string; label: string }[] | null> = {
    Programs: cms.programs?.map((p) => ({ to: `/programs/${p.slug}`, label: p.title })) ?? null,
    Retreats: cms.retreats?.map((r) => ({ to: `/retreats/${r.slug}`, label: r.name })) ?? null,
    Teachers: cms.teachers?.map((t) => ({ to: `/teachers/${t.slug}`, label: t.name })) ?? null,
    Journal: cms.posts?.map((b) => ({ to: `/blog/${b.slug}`, label: b.title })) ?? null,
  };
  const groups = GROUPS.map((g) => (dynamic[g.title] ? { ...g, links: [g.links[0], ...dynamic[g.title]!] } : g));
  return (
    <main className="bg-[#f8f3ed]">
      <Breadcrumbs />

      <section className="px-4 sm:px-6 lg:px-10 pt-8 lg:pt-12 pb-6 lg:pb-10">
        <div className="max-w-[1280px] mx-auto flex flex-col gap-4">
          <h1 className="font-['Marcellus:Regular',sans-serif] text-[#151515] text-[36px] sm:text-[52px] lg:text-[72px] tracking-[-2px] lg:tracking-[-4px] leading-[1.05]">
            Sitemap
          </h1>
          <p className="font-['Lato:Regular',sans-serif] text-[#434a4a] text-[15px] lg:text-[18px] leading-[1.8] max-w-[640px]">
            Every page of Shiva Yoga Niketan in one place. Choose a section below to jump straight
            to what you&rsquo;re looking for.
          </p>
        </div>
      </section>

      <section className="px-4 sm:px-6 lg:px-10 pb-16 sm:pb-20 lg:pb-[120px]">
        <div className="max-w-[1280px] mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {groups.map((group) => (
            <div key={group.title} className="bg-white rounded-[20px] border border-[#e8e0d8] p-6 lg:p-8 flex flex-col gap-4">
              <h2 className="font-['Marcellus:Regular',sans-serif] text-[#151515] text-[18px] lg:text-[22px] tracking-[1px] uppercase">
                {group.title}
              </h2>
              <nav className="flex flex-col gap-2.5" aria-label={group.title}>
                {group.links.map((l) => (
                  <Link
                    key={l.to}
                    to={l.to}
                    className="font-['Lato:Regular',sans-serif] text-[#434a4a] text-[14px] lg:text-[16px] leading-[1.6] hover:text-[#074240] transition-colors"
                  >
                    {l.label}
                  </Link>
                ))}
              </nav>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
