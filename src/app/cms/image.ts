import { CMS } from "./config";

// Builds an optimised Sanity CDN image URL from an image field.
// Sanity resizes, crops (respecting the editor's hotspot) and converts to WebP/AVIF
// automatically — so editors can upload any photo straight from a phone.
export interface SanityImage {
  asset?: { _ref?: string; _id?: string };
  hotspot?: { x: number; y: number };
  alt?: string;
}

export function imageUrl(img: SanityImage | null | undefined, opts: { w?: number; h?: number; q?: number } = {}): string | undefined {
  const ref = img?.asset?._ref ?? img?.asset?._id;
  if (!ref) return undefined;
  // ref format: image-<id>-<width>x<height>-<ext>
  const m = /^image-([a-f0-9]+)-(\d+x\d+)-(\w+)$/.exec(ref);
  if (!m) return undefined;
  const [, id, dims, ext] = m;
  const p = new URLSearchParams({ auto: "format", fit: "crop", q: String(opts.q ?? 78) });
  if (opts.w) p.set("w", String(opts.w));
  if (opts.h) p.set("h", String(opts.h));
  if (img?.hotspot) { p.set("crop", "focalpoint"); p.set("fp-x", String(img.hotspot.x)); p.set("fp-y", String(img.hotspot.y)); }
  return `https://cdn.sanity.io/images/${CMS.projectId}/${CMS.dataset}/${id}-${dims}.${ext}?${p}`;
}
