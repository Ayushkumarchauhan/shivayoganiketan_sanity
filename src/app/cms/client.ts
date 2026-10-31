import { CMS } from "./config";

// Tiny read-only GROQ client (no SDK needed). Reads PUBLISHED content only, via
// Sanity's global CDN. Drafts are never visible on the website.
export async function groq<T>(query: string, params: Record<string, unknown> = {}): Promise<T> {
  const qs = new URLSearchParams({ query, perspective: "published" });
  for (const [k, v] of Object.entries(params)) qs.set(`$${k}`, JSON.stringify(v));
  const url = `https://${CMS.projectId}.apicdn.sanity.io/v${CMS.apiVersion}/data/query/${CMS.dataset}?${qs}`;

  const ctrl = new AbortController();
  const timer = setTimeout(() => ctrl.abort(), CMS.timeoutMs);
  try {
    const res = await fetch(url, { signal: ctrl.signal });
    if (!res.ok) throw new Error(`Sanity ${res.status}`);
    return (await res.json()).result as T;
  } finally {
    clearTimeout(timer);
  }
}
