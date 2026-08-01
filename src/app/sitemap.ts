import type { MetadataRoute } from "next";
import { absoluteUrl } from "@/lib/site";

const routes = [
  { path: "/", changeFrequency: "monthly", priority: 1 },
  { path: "/residential", changeFrequency: "monthly", priority: 0.9 },
  { path: "/subsidies", changeFrequency: "monthly", priority: 0.8 },
  { path: "/commercial", changeFrequency: "monthly", priority: 0.7 },
] as const;

export default function sitemap(): MetadataRoute.Sitemap {
  return routes.flatMap(({ path, changeFrequency, priority }) => {
    const url = absoluteUrl(path);

    return url
      ? [
          {
            url,
            lastModified: new Date(),
            changeFrequency,
            priority,
          },
        ]
      : [];
  });
}
