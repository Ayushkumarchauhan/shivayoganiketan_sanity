import { Link } from "react-router";
import { PrimaryButton, usePageMeta } from "./SiteExtras";
import { LeafIcon } from "./ZenShared";

export default function NotFoundPage() {
  // Rendered both for unknown URLs and unknown detail slugs — always noindex.
  usePageMeta({
    title: "Page Not Found (404) — Shiva Yoga Niketan",
    description: "The page you are looking for could not be found. Return to the Shiva Yoga Niketan homepage to explore our yoga courses and retreats.",
    noindex: true,
  });
  return (
    <main className="bg-[#f8f3ed]">
      <section className="px-4 sm:px-6 lg:px-10 py-16 sm:py-24 lg:py-[140px]">
        <div className="max-w-[720px] mx-auto flex flex-col items-center text-center gap-7 lg:gap-9">
          {/* Centered illustration — brand leaf mark in a soft sage disc */}
          <div className="relative w-[150px] h-[150px] lg:w-[200px] lg:h-[200px] rounded-full bg-[#c3dbc5]/40 flex items-center justify-center">
            <div className="w-[104px] h-[104px] lg:w-[140px] lg:h-[140px] rounded-full bg-white flex items-center justify-center shadow-[0_16px_40px_rgba(7,66,64,0.10)]">
              <LeafIcon size={56} color="#074240" />
            </div>
            <span className="absolute -bottom-2 font-['Marcellus:Regular',sans-serif] text-[#074240]/25 text-[64px] lg:text-[88px] leading-none select-none">
              404
            </span>
          </div>

          <div className="flex flex-col gap-4">
            <h1 className="font-['Marcellus:Regular',sans-serif] text-[#151515] text-[36px] sm:text-[52px] lg:text-[68px] tracking-[-2px] lg:tracking-[-3px] leading-[1.05]">
              Page not found
            </h1>
            <p className="font-['Lato:Regular',sans-serif] text-[#434a4a] text-[15px] lg:text-[18px] leading-[1.8] max-w-[520px] mx-auto">
              The path you followed may have moved, or perhaps it never existed. Let&rsquo;s guide
              you back to solid ground — return home and begin your journey again.
            </p>
          </div>

          <PrimaryButton to="/">Back to Home</PrimaryButton>

          {/* Helpful internal links */}
          <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 pt-2 font-['Lato:Regular',sans-serif] text-[14px] text-[#434a4a]">
            {[
              { to: "/programs", label: "Programs" },
              { to: "/retreats", label: "Retreats" },
              { to: "/teachers", label: "Teachers" },
              { to: "/contact", label: "Contact" },
            ].map((l) => (
              <Link key={l.to} to={l.to} className="hover:text-[#074240] transition-colors">
                {l.label}
              </Link>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
