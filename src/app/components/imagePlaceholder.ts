// ─────────────────────────────────────────────────────────────────────────────
// Image placeholders
//
// Every photo/illustration in this project has been replaced with a labeled
// placeholder so you can drop in your own optimised .webp images after export.
//
// Each placeholder is a self-contained inline SVG (a data-URI string) that
// renders a box printing the image's NAME — the same name shown in the label is
// the variable it is assigned to in the page file, so it is easy to find.
//
// ── HOW TO REPLACE A PLACEHOLDER WITH A REAL IMAGE ──────────────────────────
// 1. Drop your image into  src/assets/  e.g.  src/assets/hero-bg.webp
// 2. In the page file, find the line that created the placeholder, e.g.
//        const imgHeroBg = placeholder("imgHeroBg");
//    and replace it with a normal import at the TOP of that file:
//        import imgHeroBg from "../../assets/hero-bg.webp";
//    (Keep the SAME variable name — everything downstream keeps working.)
// 3. Delete the now-unused `placeholder` import if a file has no placeholders
//    left.
//
// The `name` argument is purely the label drawn on the box; change it freely.
// ─────────────────────────────────────────────────────────────────────────────

export function placeholder(name: string, width = 640, height = 480): string {
  // Break long names onto multiple <tspan> lines so they stay readable.
  const words = name.replace(/([a-z0-9])([A-Z])/g, "$1 $2").split(/\s+/);
  const lines: string[] = [];
  let current = "";
  for (const word of words) {
    if ((current + " " + word).trim().length > 18) {
      if (current) lines.push(current.trim());
      current = word;
    } else {
      current = (current + " " + word).trim();
    }
  }
  if (current) lines.push(current.trim());

  const lineHeight = 26;
  const startY = 50 - ((lines.length - 1) * lineHeight) / 2 / (height / 100);
  const tspans = lines
    .map(
      (line, i) =>
        `<tspan x='50%' y='${startY + (i * lineHeight * 100) / height}%'>${escapeXml(line)}</tspan>`,
    )
    .join("");

  const svg =
    `<svg xmlns='http://www.w3.org/2000/svg' width='${width}' height='${height}' viewBox='0 0 ${width} ${height}' preserveAspectRatio='xMidYMid slice'>` +
    `<rect width='100%' height='100%' fill='#ece5db'/>` +
    `<rect x='10' y='10' width='${width - 20}' height='${height - 20}' fill='none' stroke='#c3dbc5' stroke-width='3' stroke-dasharray='12 8'/>` +
    `<text x='50%' y='50%' text-anchor='middle' fill='#074240' font-family='Georgia, serif' font-size='24' font-style='italic'>${tspans}</text>` +
    `<text x='50%' y='${height - 28}' text-anchor='middle' fill='#8b8a82' font-family='sans-serif' font-size='14'>replace with your image</text>` +
    `</svg>`;

  return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
}

function escapeXml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

// ─────────────────────────────────────────────────────────────────────────────
// LCP hint — spread onto the ONE most important above-the-fold image per page:
//     <img {...LCP} loading="eager" src={imgHero} … />
// Tells the browser to download it before everything else (faster Largest
// Contentful Paint). Uses the lowercase DOM attribute because React 18 doesn't
// recognise the camelCase `fetchPriority` prop. Never put it on more than 1–2 images.
// ─────────────────────────────────────────────────────────────────────────────
export const LCP = { fetchpriority: "high" } as unknown as Record<string, string>;
