import type { MetadataRoute } from "next";
import { absoluteUrl } from "@/data/site";

type SitemapEntry = MetadataRoute.Sitemap[number];

interface RouteConfig {
  path: string;
  priority: NonNullable<SitemapEntry["priority"]>;
  changeFrequency: NonNullable<SitemapEntry["changeFrequency"]>;
}

/**
 * Indexable routes. The portfolio is a single-page app whose sections are
 * in-page anchors — crawlers collapse fragment URLs onto the canonical `/`,
 * so only real routes belong here. Add new segments as the app grows.
 */
const ROUTES: RouteConfig[] = [{ path: "/", priority: 1, changeFrequency: "monthly" }];

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  return ROUTES.map(({ path, priority, changeFrequency }) => ({
    url: absoluteUrl(path),
    lastModified,
    changeFrequency,
    priority,
  }));
}
