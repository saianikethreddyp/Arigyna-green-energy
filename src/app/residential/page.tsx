import type { Metadata } from "next";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import SolarPackageCalculator from "@/components/SolarPackageCalculator";
import { createPageMetadata } from "@/lib/seo";
import styles from "./page.module.css";

export const metadata: Metadata = createPageMetadata({
  title: "Home Solar Packages | Arignya",
  description:
    "Compare residential rooftop solar packages and understand what is included in an Arignya installation across Andhra Pradesh and Telangana.",
  path: "/residential",
});

type ResidentialProps = {
  searchParams: Promise<{ system?: string | string[] }>;
};

export default async function Residential({ searchParams }: ResidentialProps) {
  const params = await searchParams;
  const requestedSystem =
    typeof params.system === "string" ? params.system : undefined;
  const whatsappE164 = process.env.ARIGNYA_WHATSAPP_E164;

  return (
    <div className={styles.page}>
      <Navbar />

      <main>
        <SolarPackageCalculator
          initialSystemSlug={requestedSystem}
          whatsappE164={whatsappE164}
        />
      </main>

      <Footer />
    </div>
  );
}
