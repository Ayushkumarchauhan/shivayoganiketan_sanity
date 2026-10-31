import { RouterProvider, createBrowserRouter } from "react-router";
import { routes } from "./routes";

const router = createBrowserRouter(routes);

// ── Early connection hints ────────────────────────────────────────────────────
// Runs at MODULE LOAD (before React's first render), not in a useEffect, so the
// TCP/TLS handshake to Google Fonts overlaps with the app's own JS/CSS download
// instead of starting after the page has already painted.
// (When you export, also put these <link>s in index.html — see Manual_Launch_Tasks.md #11.)
if (typeof document !== "undefined") {
  const hints: Array<{ rel: string; href: string; crossOrigin?: boolean }> = [
    { rel: "preconnect", href: "https://fonts.googleapis.com" },
    { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: true },
  ];
  for (const { rel, href, crossOrigin } of hints) {
    if (document.head.querySelector(`link[rel="${rel}"][href="${href}"]`)) continue;
    const link = document.createElement("link");
    link.rel = rel;
    link.href = href;
    if (crossOrigin) link.crossOrigin = "anonymous";
    document.head.appendChild(link);
  }
}

export default function App() {
  return <RouterProvider router={router} />;
}
