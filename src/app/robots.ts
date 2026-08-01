import type { MetadataRoute } from "next";
import { absoluteUrl } from "@/lib/site";

export default function robots(): MetadataRoute.Robots {
  const sitemap = absoluteUrl("/sitemap.xml");

  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: [
        "/api/",
        "/concepts/modern-deccan-solar-home-v5-demo.html",
        "/concepts/solar-house-wakes-v4-demo.html",
      ],
    },
    ...(sitemap ? { sitemap } : {}),
  };
}
