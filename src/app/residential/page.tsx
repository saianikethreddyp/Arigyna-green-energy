import type { Metadata } from "next";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import SolarPackageCalculator from "@/components/SolarPackageCalculator";
import { createPageMetadata } from "@/lib/seo";
import styles from "./page.module.css";

export const metadata: Metadata = createPageMetadata({
  title: "Home Solar Packages in Hyderabad | Arignya",
  description:
    "Compare home solar packages for Hyderabad, Telangana and Andhra Pradesh, including residential rooftop installation, net-metering coordination and subsidy support.",
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
