import { memo } from "react";
import { Link } from "react-router";
import { useCms } from "../cms/useCms";
import { placeholder } from "./imagePlaceholder";

// ─── Direct relative imports — physically present in the repo ─────────────────
const img1 = placeholder("img1");
const img2 = placeholder("img2");
const img3 = placeholder("img3");
const img4 = placeholder("img4");
const img5 = placeholder("img5");
const img6 = placeholder("img6");
const img7 = placeholder("img7");
const img8 = placeholder("img8");
const img9 = placeholder("img9");

// ─── Diagonal-arrow SVG path (inlined — no extra import needed) ───────────────
const ARROW_PATH =
  "M9.1605 0H0.849401C0.626751 0 0.413219 0.0884475 0.255781 0.245885C0.0983438 0.403323 0.00989626 0.616854 0.00989626 0.839505C0.00989626 1.06216 0.0983438 1.27569 0.255781 1.43312C0.413219 1.59056 0.626751 1.67901 0.849401 1.67901H7.13309L0.256291 8.55665C0.17611 8.63409 0.112154 8.72673 0.0681567 8.82915C0.0241591 8.93157 0.00100033 9.04173 3.16969e-05 9.1532C-0.000936937 9.26467 0.020304 9.37522 0.062515 9.47839C0.104726 9.58156 0.167062 9.67529 0.245885 9.75411C0.324709 9.83294 0.418441 9.89527 0.521613 9.93748C0.624785 9.9797 0.735331 10.0009 0.846799 9.99997C0.958268 9.999 1.06843 9.97584 1.17085 9.93184C1.27327 9.88785 1.36591 9.82389 1.44335 9.74371L8.32099 2.86649V9.1506C8.32099 9.37325 8.40944 9.58678 8.56688 9.74422C8.72431 9.90166 8.93785 9.9901 9.1605 9.9901C9.38315 9.9901 9.59668 9.90166 9.75411 9.74422C9.91155 9.58678 10 9.37325 10 9.1506V0.839505C10 0.616854 9.91155 0.403323 9.75411 0.245885C9.59668 0.0884475 9.38315 0 9.1605 0Z";

// ─── Static data — hoisted outside component (never re-created on re-render) ──
interface BlogPost {
  id: number;
  img: string;
  category: string;
  title: string;
  slug: string;
}

const IMG_FALLBACKS = [img1, img2, img3, img4, img5, img6, img7, img8, img9];

// Built-in list — shown when Sanity has no published posts.
const BLOG_POSTS: BlogPost[] = [
  {
    id: 1,
    img: img1,
    category: "Health",
    title: "Wound Care Plays a Major Role in Rehab and Recovery",
    slug: "wound-care-rehab-recovery-1",
  },
  {
    id: 2,
    img: img2,
    category: "Injury",
    title: "Three Years Post Injury: Persistence and Progress",
    slug: "three-years-post-injury-1",
  },
  {
    id: 3,
    img: img3,
    category: "Success Stories",
    title: "A Life Devoted to Helping Others Overcome Adversity",
    slug: "life-devoted-helping-others-1",
  },
  {
    id: 4,
    img: img4,
    category: "Health",
    title: "Wound Care Plays a Major Role in Rehab and Recovery",
    slug: "wound-care-rehab-recovery-2",
  },
  {
    id: 5,
    img: img5,
    category: "Injury",
    title: "Three Years Post Injury: Persistence and Progress",
    slug: "three-years-post-injury-2",
  },
  {
    id: 6,
    img: img6,
    category: "Success Stories",
    title: "A Life Devoted to Helping Others Overcome Adversity",
    slug: "life-devoted-helping-others-2",
  },
  {
    id: 7,
    img: img7,
    category: "Health",
    title: "Wound Care Plays a Major Role in Rehab and Recovery",
    slug: "wound-care-rehab-recovery-3",
  },
  {
    id: 8,
    img: img8,
    category: "Success Stories",
    title: "A Life Devoted to Helping Others Overcome Adversity",
    slug: "life-devoted-helping-others-3",
  },
  {
    id: 9,
    img: img9,
    category: "Injury",
    title: "Three Years Post Injury: Persistence and Progress",
    slug: "three-years-post-injury-3",
  },
];

// ─── BlogCard ─────────────────────────────────────────────────────────────────
const BlogCard = memo(function BlogCard({ post }: { post: BlogPost }) {
  return (
    <article className="bg-white rounded-[20px] overflow-hidden relative flex flex-col group hover:shadow-[0_8px_32px_rgba(0,0,0,0.08)] transition-shadow duration-300">
      {/* Image */}
      <div className="relative h-[200px] sm:h-[220px] lg:h-[251px] shrink-0 overflow-hidden">
        <img
          src={post.img}
          alt={post.title}
          loading="lazy"
          decoding="async"
          className="absolute inset-0 w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-500"
        />
        {/* Category badge — sits at the image / text boundary */}
        <span className="absolute bottom-0 translate-y-1/2 left-6 lg:left-[40px] bg-[#c3dbc5] px-[10px] py-[4px] rounded-[30px] font-['Lato:SemiBold',sans-serif] text-[#151515] text-[11px] lg:text-[12px] tracking-[1px] uppercase whitespace-nowrap z-10">
          {post.category}
        </span>
      </div>

      {/* Text body */}
      <div className="flex flex-col gap-5 lg:gap-[25px] p-5 sm:p-7 lg:p-[40px] pt-7 lg:pt-[32px] flex-1">
        <h3 className="font-['Marcellus:Regular',sans-serif] text-[#151515] text-[20px] sm:text-[24px] lg:text-[28px] xl:text-[32px] tracking-[-0.5px] lg:tracking-[-1px] leading-[1.35]">
          {post.title}
        </h3>

        {/* Read More link */}
        <Link
          to={`/blog/${post.slug}`}
          className="flex items-center gap-[7px] w-fit group/link"
        >
          <span className="font-['Lato:Medium',sans-serif] text-[#1e1b1b] text-[14px] lg:text-[16px] group-hover/link:text-[#074240] transition-colors">
            Read More
          </span>
          <svg
            width="10"
            height="10"
            viewBox="0 0 10 10"
            fill="none"
            className="shrink-0 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 transition-transform duration-200"
          >
            <path d={ARROW_PATH} fill="#151515" />
          </svg>
        </Link>
      </div>
    </article>
  );
});

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function BlogPage() {
  // Posts from Sanity (newest first) when published; otherwise the built-in list.
  const { posts } = useCms();
  const list: BlogPost[] = posts
    ? posts.map((p, i) => ({ id: i + 1, img: p.img ?? IMG_FALLBACKS[i % IMG_FALLBACKS.length], category: p.category, title: p.title, slug: p.slug }))
    : BLOG_POSTS;
  return (
    <div className="w-full">

      {/* ── Hero banner ── */}
      <section className="px-4 sm:px-6 lg:px-10 pt-6 sm:pt-8 lg:pt-10">
        <div className="bg-[#c3dbc5] rounded-[16px] lg:rounded-[20px] w-full flex items-center justify-center py-12 sm:py-16 lg:py-[80px] px-6">
          <div className="flex flex-col items-center gap-4 lg:gap-5">
            <h1 className="font-['Marcellus:Regular',sans-serif] text-[#151515] text-[40px] sm:text-[60px] lg:text-[80px] xl:text-[90px] tracking-[-2px] sm:tracking-[-3px] lg:tracking-[-5px] leading-none text-center">
              Blog Page
            </h1>
            <nav aria-label="Breadcrumb" className="flex items-center gap-[10px] font-['Lato:Regular',sans-serif] text-[14px] lg:text-[16px]">
              <Link to="/" className="text-[#151515] hover:text-[#074240] transition-colors leading-[24px]">
                Home
              </Link>
              <span className="text-[#151515] leading-[24px]">/</span>
              <span className="text-[#434a4a] leading-[24px]">Blog Page</span>
            </nav>
          </div>
        </div>
      </section>

      {/* ── Blog grid ── */}
      <section className="px-4 sm:px-6 lg:px-10 py-10 sm:py-14 lg:py-[80px]">
        <div className="max-w-[1280px] mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 lg:gap-[30px]">
            {list.map((post) => (
              <BlogCard key={post.id} post={post} />
            ))}
          </div>
        </div>
      </section>

    </div>
  );
}
