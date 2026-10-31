import { Breadcrumbs } from "./SiteExtras";

export interface LegalSection {
  id: string;
  heading: string;
  paras: string[];
}

export function LegalLayout({
  title, updated, intro, sections,
}: {
  title: string;
  updated: string;
  intro: string;
  sections: LegalSection[];
}) {
  return (
    <main className="bg-[#f8f3ed]">
      <Breadcrumbs />

      {/* Header */}
      <section className="px-4 sm:px-6 lg:px-10 pt-8 lg:pt-12 pb-6 lg:pb-10">
        <div className="max-w-[1080px] mx-auto flex flex-col gap-4">
          <h1 className="font-['Marcellus:Regular',sans-serif] text-[#151515] text-[36px] sm:text-[52px] lg:text-[72px] tracking-[-2px] lg:tracking-[-4px] leading-[1.05]">
            {title}
          </h1>
          <p className="font-['Lato:Regular',sans-serif] text-[#8b8a82] text-[13px] lg:text-[14px] tracking-[0.5px] uppercase">
            Last updated · {updated}
          </p>
          <p className="font-['Lato:Regular',sans-serif] text-[#434a4a] text-[15px] lg:text-[18px] leading-[1.8] max-w-[720px]">
            {intro}
          </p>
        </div>
      </section>

      {/* Body: TOC sidebar + article */}
      <section className="px-4 sm:px-6 lg:px-10 pb-16 sm:pb-20 lg:pb-[120px]">
        <div className="max-w-[1080px] mx-auto flex flex-col lg:flex-row gap-10 lg:gap-[70px] items-start">

          {/* Table of contents */}
          <aside className="w-full lg:w-[260px] shrink-0 lg:sticky lg:top-6">
            <div className="bg-white rounded-[20px] border border-[#e8e0d8] p-6 lg:p-8 flex flex-col gap-4">
              <p className="font-['Marcellus:Regular',sans-serif] text-[#151515] text-[16px] lg:text-[18px] tracking-[1px] uppercase">
                Contents
              </p>
              <nav className="flex flex-col gap-2.5" aria-label="Table of contents">
                {sections.map((s, i) => (
                  <a
                    key={s.id}
                    href={`#${s.id}`}
                    className="font-['Lato:Regular',sans-serif] text-[#434a4a] text-[14px] leading-[1.6] hover:text-[#074240] transition-colors"
                  >
                    {i + 1}. {s.heading}
                  </a>
                ))}
              </nav>
            </div>
          </aside>

          {/* Article */}
          <article className="flex-1 flex flex-col gap-9 lg:gap-12 scroll-smooth">
            {sections.map((s, i) => (
              <section key={s.id} id={s.id} className="flex flex-col gap-4 scroll-mt-24">
                <h2 className="font-['Marcellus:Regular',sans-serif] text-[#151515] text-[24px] sm:text-[30px] lg:text-[36px] tracking-[-1px] leading-[1.2]">
                  {i + 1}. {s.heading}
                </h2>
                {s.paras.map((p, j) => (
                  <p key={j} className="font-['Lato:Regular',sans-serif] text-[#434a4a] text-[15px] lg:text-[18px] leading-[1.85]">
                    {p}
                  </p>
                ))}
              </section>
            ))}
          </article>
        </div>
      </section>
    </main>
  );
}
