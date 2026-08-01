import type { Metadata } from "next";
import { absoluteUrl } from "@/lib/site";

type PageMetadata = {
  title: string;
  description: string;
  path: string;
};

const socialImage = "/opengraph-image";

export function createPageMetadata({
  title,
  description,
  path,
}: PageMetadata): Metadata {
  const canonical = absoluteUrl(path);

  return {
    title,
    description,
    alternates: canonical ? { canonical } : undefined,
    openGraph: {
      type: "website",
      locale: "en_IN",
      siteName: "Arignya",
      title,
      description,
      url: canonical,
      images: [
        {
          url: socialImage,
          width: 1200,
          height: 630,
          alt: "Arignya Green Energy",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [socialImage],
    },
  };
}
