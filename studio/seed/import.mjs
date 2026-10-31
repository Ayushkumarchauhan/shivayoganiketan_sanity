// ═══════════════════════════════════════════════════════════════════════════════
// Uploads studio/seed/content.ndjson to Sanity (createOrReplace — safe to re-run;
// it overwrites ONLY these seeded documents and never deletes anything else).
//
//   SANITY_TOKEN=xxxx node studio/seed/import.mjs
//
// The token needs the "Editor" permission. Delete it in sanity.io/manage → API → Tokens
// right after importing. Never commit a token to the code.
// ═══════════════════════════════════════════════════════════════════════════════
import fs from "fs";
import path from "path";

const PROJECT = "ntvvkd3p", DATASET = "production", API = "v2024-10-01";
const token = process.env.SANITY_TOKEN;
if (!token) { console.error("Set SANITY_TOKEN first."); process.exit(1); }

const file = path.join(process.cwd(), "studio/seed/content.ndjson");
const docs = fs.readFileSync(file, "utf8").split("\n").filter(Boolean).map((l) => JSON.parse(l));

// Teachers first so program → teacher references resolve.
const rank = { teacher: 0, program: 1, retreat: 2, post: 3 };
docs.sort((a, b) => rank[a._type] - rank[b._type]);

for (let i = 0; i < docs.length; i += 25) {
  const batch = docs.slice(i, i + 25);
  const res = await fetch(`https://${PROJECT}.api.sanity.io/${API}/data/mutate/${DATASET}?returnIds=true&visibility=sync`, {
    method: "POST",
    headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
    body: JSON.stringify({ mutations: batch.map((d) => ({ createOrReplace: d })) }),
  });
  const json = await res.json();
  if (!res.ok) { console.error("Import failed:", res.status, JSON.stringify(json).slice(0, 600)); process.exit(1); }
  console.log(`✔ ${Math.min(i + 25, docs.length)}/${docs.length}`);
}
console.log("Done. Content is published and live on the website.");
