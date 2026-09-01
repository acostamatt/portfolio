import type { MetadataRoute } from "next";
import { SITE_URL, absoluteUrl } from "@/data/site";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        // Next.js internals and build artifacts carry no indexable content.
        disallow: ["/api/", "/_next/", "/404", "/500"],
      },
    ],
    sitemap: absoluteUrl("/sitemap.xml"),
    host: SITE_URL,
  };
}
