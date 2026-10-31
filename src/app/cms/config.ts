// ═══════════════════════════════════════════════════════════════════════════════
// Sanity connection settings (public — safe to commit; NO tokens here ever).
// Editors manage content at https://shivayoganiketan.sanity.studio
// ═══════════════════════════════════════════════════════════════════════════════
export const CMS = {
  projectId: "ntvvkd3p",
  dataset: "production",
  apiVersion: "2024-10-01",
  /** Max time to wait for content before falling back to the built-in copy. */
  timeoutMs: 3500,
  /** Set to false to switch the website back to the hard-coded content instantly. */
  enabled: true,
};
