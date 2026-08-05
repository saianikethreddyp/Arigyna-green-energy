import Image from "next/image";
import Link from "next/link";
import styles from "./Footer.module.css";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.top}>
        <div className={styles.identity}>
          <Link href="/" className={styles.brand} aria-label="Arignya home">
            <Image
              src="/arignya-logo-client.png"
              alt="Arignya Green Energy Private Limited"
              width={210}
              height={210}
              priority
            />
          </Link>
          <strong className={styles.legalName}>
            Arignya Green Energy Private Limited
          </strong>
          <p>
            Residential rooftop solar services across Andhra Pradesh and
            Telangana.
          </p>
        </div>

        <div className={styles.footerGroup}>
          <p className={styles.groupLabel}>What we coordinate</p>
          <ul className={styles.serviceList}>
            <li>System design and engineering</li>
            <li>Procurement and logistics</li>
            <li>Installation and commissioning</li>
            <li>Net-metering coordination</li>
          </ul>
        </div>

        <div className={styles.contact}>
          <p className={styles.groupLabel}>Contact</p>
          <a href="tel:+919063092424">+91 90630 92424</a>
          <a href="mailto:arignyagreenenergies@gmail.com">
            arignyagreenenergies@gmail.com
          </a>
          <a href="mailto:info@arignyagreenenergy.com">
            info@arignyagreenenergy.com
          </a>
        </div>

        <nav className={styles.links} aria-label="Footer navigation">
          <p className={styles.groupLabel}>Explore</p>
          <Link href="/">Home</Link>
          <Link href="/residential">Home Solar</Link>
          <Link href="/subsidies">Subsidy &amp; Process</Link>
          <Link href="/#roof-check" data-lead-source="Footer">
            Request a solar quote
          </Link>
          <a href="mailto:arignyagreenenergies@gmail.com">Contact Arignya</a>
        </nav>
      </div>

      <address className={styles.address}>
        <span className={styles.groupLabel}>Office address</span>
        <p>
          Arignya Green Energy Private Limited, Flat No. 204, Dwellings
          Apartment, Door No. 1-98/9/D/48, Madhapur, Shaikpet, Hyderabad -
          500081, Telangana.
        </p>
      </address>

      <div className={styles.notes}>
        <p>
          Module options: ReNew, Adani or Waaree. Inverter options: Power-One,
          Growatt or Polycab. Equipment is subject to availability and final
          quotation.
        </p>
        <p>
          Package prices are from the price list effective 3 July 2026.
          Pricing, subsidy information and timelines remain subject to site
          assessment, applicable approvals and the final written quotation.
        </p>
      </div>

      <div className={styles.bottom}>
        <span>© 2026 Arignya Green Energy Private Limited</span>
        <span>Andhra Pradesh and Telangana</span>
      </div>
    </footer>
  );
}
