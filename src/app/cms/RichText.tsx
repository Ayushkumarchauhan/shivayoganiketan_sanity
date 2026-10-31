import { useState } from "react";
import { Link } from "react-router";
import { PortableText, type PortableTextComponents, type PortableTextBlock } from "@portabletext/react";
import { imageUrl, type SanityImage } from "./image";

// ═══════════════════════════════════════════════════════════════════════════════
// RICH TEXT — renders Sanity "Portable Text" with the site's existing article
// styles (same classes as the original hand-built blog layout), so editor content
// looks identical to the designed pages. Used by blog posts and retreat pages.
// ═══════════════════════════════════════════════════════════════════════════════

const P = "font-['Lato:Regular',sans-serif] text-[#434a4a] text-[16px] lg:text-[18px] leading-[1.8]";
const PLUS = (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
    <path d="M8 3.33V12.67M3.33 8H12.67" stroke="#074240" strokeWidth="2" strokeLinecap="round" />
  </svg>
);

/** Internal paths use the router (no full reload); everything else opens normally. */
function SmartLink({ href, className, children }: { href: string; className?: string; children: React.ReactNode }) {
  if (href.startsWith("/")) return <Link to={href} className={className}>{children}</Link>;
  const external = /^https?:/.test(href);
  return (
    <a href={href} className={className} {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}>
      {children}
    </a>
  );
}

interface AccordionValue { heading?: string; items?: { _key: string; title: string; body?: string }[] }
function Accordion({ value }: { value: AccordionValue }) {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <div className="flex flex-col">
      {value.heading && (
        <h3 className="font-['Marcellus:Regular',sans-serif] text-[#151515] text-[22px] lg:text-[28px] tracking-[-0.5px] pb-6 border-b border-[#e8e0d8]">
          {value.heading}
        </h3>
      )}
      {(value.items ?? []).map((item, i) => (
        <div key={item._key ?? i}>
          <button
            type="button"
            onClick={() => setOpen(open === i ? null : i)}
            aria-expanded={open === i}
            className="w-full flex items-center justify-between py-5 text-left group"
          >
            <span className="font-['Marcellus:Regular',sans-serif] text-[#151515] text-[18px] lg:text-[22px] tracking-[-0.5px] group-hover:text-[#074240] transition-colors">
              {item.title}
            </span>
            <span className={`shrink-0 w-5 h-5 flex items-center justify-center transition-transform duration-200 ${open === i ? "rotate-45" : ""}`}>{PLUS}</span>
          </button>
          {open === i ? (
            <div className="pb-6 border-b border-[#e8e0d8]"><p className={P}>{item.body}</p></div>
          ) : (
            <div className="border-b border-[#e8e0d8]" />
          )}
        </div>
      ))}
    </div>
  );
}

const components: PortableTextComponents = {
  block: {
    normal: ({ children }) => <p className={P}>{children}</p>,
    h2: ({ children }) => (
      <h2 className="font-['Marcellus:Regular',sans-serif] font-normal text-[#151515] text-[28px] sm:text-[34px] lg:text-[44px] tracking-[-1px] leading-[1.15]">{children}</h2>
    ),
    h3: ({ children }) => (
      <h3 className="font-['Marcellus:Regular',sans-serif] font-normal text-[#151515] text-[22px] lg:text-[28px] tracking-[-0.5px] leading-[1.25]">{children}</h3>
    ),
  },
  list: {
    bullet: ({ children }) => <ul className="flex flex-col gap-5">{children}</ul>,
    number: ({ children }) => <ol className={`${P} list-decimal pl-6 flex flex-col gap-3`}>{children}</ol>,
  },
  listItem: {
    bullet: ({ children }) => (
      <li className="flex items-start gap-4">
        <span className="shrink-0 mt-1 w-5 h-5 flex items-center justify-center">{PLUS}</span>
        <span className={`${P} flex-1`}>{children}</span>
      </li>
    ),
    number: ({ children }) => <li>{children}</li>,
  },
  marks: {
    strong: ({ children }) => <strong className="font-['Lato:SemiBold',sans-serif] text-[#151515]">{children}</strong>,
    em: ({ children }) => <em className="italic">{children}</em>,
    link: ({ value, children }) => (
      <SmartLink href={String(value?.href ?? "#")} className="text-[#074240] underline underline-offset-2 hover:text-[#0a5552]">{children}</SmartLink>
    ),
  },
  types: {
    bodyImage: ({ value }: { value: { image?: SanityImage; alt?: string; caption?: string; size?: string } }) => {
      const portrait = value.size === "portrait";
      const src = imageUrl(value.image, portrait ? { w: 900, h: 1200 } : { w: 1600 });
      if (!src) return null;
      return (
        <figure className="flex flex-col gap-4">
          <div className={`relative rounded-[20px] overflow-hidden ${portrait ? "w-full max-w-[420px] mx-auto aspect-[3/4]" : "h-[260px] sm:h-[360px] lg:h-[420px]"}`}>
            <img src={src} alt={value.alt ?? ""} loading="lazy" decoding="async" className="absolute inset-0 w-full h-full object-cover" />
          </div>
          {value.caption && <figcaption className="font-['Lato:Regular',sans-serif] text-[#434a4a] text-[14px] text-center">{value.caption}</figcaption>}
        </figure>
      );
    },
    pullQuote: ({ value }: { value: { text: string; attribution?: string } }) => (
      <blockquote className="bg-white rounded-[20px] p-8 lg:p-[50px] lg:px-[60px]">
        <p className="font-['Marcellus:Regular',sans-serif] text-[#151515] text-[22px] sm:text-[26px] lg:text-[32px] tracking-[-1px] leading-[1.4] text-center">“{value.text}”</p>
        {value.attribution && <p className="font-['Marcellus:Regular',sans-serif] text-[#151515] text-[16px] text-center mt-5">{value.attribution}</p>}
      </blockquote>
    ),
    highlight: ({ value }: { value: { text: string } }) => (
      <div className="bg-[#c3dbc5] rounded-[20px] px-8 sm:px-14 lg:px-[60px] py-10 lg:py-[60px]">
        <p className="font-['Marcellus:Regular',sans-serif] text-[#151515] text-[20px] sm:text-[26px] lg:text-[32px] tracking-[-1px] leading-[1.4] text-center">{value.text}</p>
      </div>
    ),
    accordion: ({ value }: { value: AccordionValue }) => <Accordion value={value} />,
    ctaCard: ({ value }: { value: { image?: SanityImage; title: string; text?: string; buttonLabel?: string; buttonLink?: string } }) => {
      const src = imageUrl(value.image, { w: 1000, h: 800 });
      return (
        <div className="flex flex-col lg:flex-row rounded-[20px] overflow-hidden">
          {src && (
            <div className="relative flex-1 min-h-[260px] lg:min-h-[280px]">
              <img src={src} alt="" loading="lazy" decoding="async" className="absolute inset-0 w-full h-full object-cover" />
            </div>
          )}
          <div className={`bg-white flex-shrink-0 ${src ? "lg:w-[44%]" : "w-full"} flex flex-col gap-6 lg:gap-[30px] p-8 lg:p-[50px] justify-center`}>
            <h3 className="font-['Marcellus:Regular',sans-serif] font-normal text-[#151515] text-[28px] sm:text-[36px] lg:text-[48px] tracking-[-1.5px] leading-tight">{value.title}</h3>
            {value.text && <p className="font-['Lato:Regular',sans-serif] text-[#434a4a] text-[15px] lg:text-[18px] leading-[1.7]">{value.text}</p>}
            {value.buttonLink && (
              <SmartLink href={value.buttonLink} className="inline-flex items-center justify-center self-start bg-[#c3dbc5] rounded-full px-7 py-4 font-['Lato:Medium',sans-serif] text-[#151515] text-[15px] hover:opacity-90 transition-opacity">
                {value.buttonLabel || "Learn more"}
              </SmartLink>
            )}
          </div>
        </div>
      );
    },
  },
};

export function RichText({ value, className = "flex flex-col gap-8 lg:gap-[50px]" }: { value: PortableTextBlock[]; className?: string }) {
  return (
    <div className={className}>
      <PortableText value={value} components={components} />
    </div>
  );
}
