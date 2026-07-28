import type { Metadata } from "next";
import { Atkinson_Hyperlegible_Next } from "next/font/google";
import RoofCheckModal from "@/components/RoofCheckModal";
import "./globals.css";

const atkinson = Atkinson_Hyperlegible_Next({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-atkinson",
  adjustFontFallback: false,
});

export const metadata: Metadata = {
  title: {
    default: "Arignya Home Solar",
    template: "%s | Arignya",
  },
  description:
    "Residential rooftop solar services across Andhra Pradesh and Telangana.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={atkinson.variable}>
      <body>
        {children}
        <RoofCheckModal />
      </body>
    </html>
  );
}
