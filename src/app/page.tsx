import type { Metadata } from "next";
import BillUploadCTA from "@/components/BillUploadCTA";
import Footer from "@/components/Footer";
import InstallationStory from "@/components/InstallationStory";
import Navbar from "@/components/Navbar";
import SolarDayNight from "@/components/SolarDayNight";
import SolarRoofEngine from "@/components/SolarRoofEngine";
import { solarPackages } from "@/data/solar-packages";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "Arignya Home Solar | Rooftop Solar in Andhra Pradesh and Telangana",
  description:
    "Residential rooftop solar design, installation, net-metering coordination, loan facilitation and subsidy assistance across Andhra Pradesh and Telangana.",
};

export default function Home() {
  return (
    <div className={styles.page}>
      <Navbar />

      <main>
        <section className={styles.hero} aria-labelledby="hero-title">
          <div className={styles.heroGrid}>
            <div className={styles.heroCopy}>
              <p className={styles.eyebrow}>
                Home solar in Andhra Pradesh and Telangana
              </p>

              <h1 id="hero-title" className={styles.heroTitle}>
                <span className={styles.titleLine}>Turn Your Roof</span>
                <span className={styles.titleConnector}>Into</span>
                <span className={styles.titleOutcome}>Zero Electricity Bills</span>
              </h1>

              <p className={styles.heroDescription}>
                Get a rooftop solar system designed for your home, electricity
                use and roof conditions. We handle the work from system design
                and equipment procurement to installation and commissioning.
              </p>

              <div className={styles.heroActions}>
                <a className={styles.primaryButton} href="#roof-check">
                  Get a free roof check
                </a>
                <a className={styles.secondaryButton} href="#packages">
                  View solar packages
                </a>
              </div>

              <p className={styles.claimNote}>
                Your final bill depends on system size, consumption, solar
                generation, net metering and applicable grid charges.
              </p>
            </div>

            <div className={styles.heroVisual}>
              <SolarRoofEngine />
            </div>
          </div>

        </section>

        <section id="packages" className={styles.packages} aria-labelledby="packages-title">
          <div className={styles.packageIntro}>
            <div>
              <p className={styles.sectionNumber}>Current residential packages</p>
              <h2 id="packages-title">Clear prices for common home solar systems</h2>
            </div>
            <p>
              Start with a package that matches your electricity connection and
              expected energy use. We will confirm the right capacity after
              checking your bill, roof and site conditions.
            </p>
          </div>

          <div className={styles.packageBoard}>
            <div className={styles.connectionHelp}>
              <span>Compare by connection type</span>
              <p>
                Check your latest electricity bill if you are unsure whether
                your connection is single-phase or three-phase.
              </p>
            </div>

            <table
              className={styles.packageTable}
              aria-label="Residential solar package prices"
            >
              <thead>
                <tr>
                  <th scope="col">System capacity</th>
                  <th scope="col">
                    <span className={styles.brandHeading}>
                      <span>Module package</span>
                    </span>
                  </th>
                  <th scope="col">
                    <span className={styles.brandHeading}>
                      <span>Choose either module brand</span>
                    </span>
                  </th>
                  <th scope="col">
                    <span className={styles.visuallyHidden}>Enquire</span>
                  </th>
                </tr>
              </thead>

              {["Single-phase", "Three-phase"].map((connection) => (
                <tbody key={connection}>
                  <tr className={styles.phaseRow}>
                    <th colSpan={4} scope="rowgroup">
                      <span>{connection}</span>
                      <small>
                        {connection === "Single-phase"
                          ? "Common residential connection"
                          : "For homes with a three-phase connection"}
                      </small>
                    </th>
                  </tr>

                  {solarPackages
                    .filter(
                      (solarPackage) =>
                        solarPackage.connection === connection,
                    )
                    .map((solarPackage) => (
                      <tr
                        className={styles.packageRow}
                        key={solarPackage.slug}
                      >
                        <th className={styles.systemName} scope="row">
                          <strong>{solarPackage.capacity}</strong>
                          <span>{solarPackage.connection}</span>
                        </th>
                        <td className={styles.price}>
                          <span className={styles.mobileLabel}>
                            ReNew modules
                          </span>
                          {solarPackage.renewPrice}
                        </td>
                        <td className={styles.price}>
                          <span className={styles.mobileLabel}>
                            Adani or Waaree modules
                          </span>
                          {solarPackage.adaniWaareePrice}
                        </td>
                        <td className={styles.packageAction}>
                          <a
                            href={`/residential?system=${solarPackage.slug}`}
                          >
                            {solarPackage.ctaLabel}
                          </a>
                        </td>
                      </tr>
                    ))}
                </tbody>
              ))}
            </table>
          </div>

          <div className={styles.packageFooter}>
            <p>
              Price list effective from 3 July 2026. Prices and equipment are
              subject to availability and final site assessment. Additional
              charges may apply for elevated structures, special mounting, civil
              work, load extension, statutory approvals or other site-specific
              requirements. Applicable subsidy is subject to government scheme
              rules and approval.
            </p>
            <a href="/residential">
              Compare all packages
            </a>
          </div>
        </section>

        <SolarDayNight />
        <InstallationStory />
        <BillUploadCTA />
      </main>

      <Footer />
    </div>
  );
}
