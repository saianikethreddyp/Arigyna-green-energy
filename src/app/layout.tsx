import type { Metadata } from "next";
import { Atkinson_Hyperlegible_Next } from "next/font/google";
import OrganizationJsonLd from "@/components/OrganizationJsonLd";
import RoofCheckModal from "@/components/RoofCheckModal";
import { siteUrl } from "@/lib/site";
import "./globals.css";

const atkinson = Atkinson_Hyperlegible_Next({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-atkinson",
  adjustFontFallback: false,
});

export const metadata: Metadata = {
  metadataBase: siteUrl ? new URL(siteUrl) : undefined,
  title: {
    default: "Arignya Home Solar",
    template: "%s",
  },
  description:
    "Residential rooftop solar services across Andhra Pradesh and Telangana.",
  applicationName: "Arignya",
  authors: [{ name: "Arignya Green Energy Private Limited" }],
  creator: "Arignya Green Energy Private Limited",
  publisher: "Arignya Green Energy Private Limited",
  formatDetection: {
    address: false,
    email: false,
    telephone: false,
  },
  icons: {
    icon: "/arignya-logo-client.png",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={atkinson.variable}>
      <body>
        <OrganizationJsonLd />
        {children}
        <RoofCheckModal />
      </body>
    </html>
  );
}
