import { useRouteLoaderData } from "react-router";
import { EMPTY_CMS, type CmsData } from "./content";

/** Published Sanity content for the current visit (lists are null → use built-in fallback). */
export function useCms(): CmsData {
  return (useRouteLoaderData("root") as CmsData | undefined) ?? EMPTY_CMS;
}
