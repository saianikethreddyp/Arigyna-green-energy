"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import styles from "./Navbar.module.css";

const links = [
  ["/residential", "Home Solar"],
  ["/commercial", "Commercial Solar"],
  ["/subsidies", "Subsidy & Process"],
] as const;

export default function Navbar() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      <header className={styles.header}>
        <div className={styles.inner}>
        <Link href="/" className={styles.brand} aria-label="Arignya home">
          <svg className={styles.brandMark} viewBox="0 0 58 40" aria-hidden="true">
            <g className={styles.sunRays}><path d="M25 3V8M14 6L17 10M36 6L33 10M7 14L13 16M43 14L37 16" /></g>
            <path d="M13 20A13 13 0 0 1 39 20Z" fill="#f5a623" /><path d="M17 20A9 9 0 0 1 35 20Z" fill="#ffd45b" />
            <path d="M5 21L37 18L47 29L14 33Z" fill="#1769ff" stroke="#10251d" strokeWidth="1.4" /><path d="M13 20L21 32M21 19L29 31M29 19L38 30M9 25L42 22M12 29L45 26" fill="none" stroke="#d9eaff" strokeWidth="1" />
            <path d="M10 33C22 37 39 36 51 27C48 36 36 40 21 39C15 38 11 36 10 33Z" fill="#319346" /><path d="M39 34C45 24 50 21 56 21C54 29 49 35 39 37C42 33 46 29 51 26" fill="#76c442" />
          </svg>
          <span className={styles.brandCopy}><strong><span>Arig</span><span>nya</span></strong><small>Green Energy</small></span>
        </Link>

        <nav className={styles.nav} aria-label="Primary navigation">
          {links.map(([href, label]) => <Link key={href} href={href} aria-current={pathname === href ? "page" : undefined}>{label}</Link>)}
        </nav>

        <div className={styles.controls}>
          <Link href="/#roof-check" className={styles.cta}>Get a free roof check</Link>
          <button className={styles.menuButton} type="button" aria-expanded={menuOpen} aria-controls="mobile-navigation" aria-label={menuOpen ? "Close navigation" : "Open navigation"} onClick={() => setMenuOpen((open) => !open)}>
            <span /><span /><span />
          </button>
        </div>
        </div>
      </header>
      <nav
        id="mobile-navigation"
        className={styles.mobileNav}
        aria-label="Mobile navigation"
        aria-hidden={!menuOpen}
        data-open={menuOpen}
        inert={!menuOpen}
      >
          {links.map(([href, label]) => <Link key={href} href={href} aria-current={pathname === href ? "page" : undefined} onClick={() => setMenuOpen(false)}>{label}</Link>)}
          <Link href="/#roof-check" onClick={() => setMenuOpen(false)}>Get a free roof check</Link>
          <a href="https://wa.me/919063092424" target="_blank" rel="noreferrer">WhatsApp us</a>
      </nav>
    </>
  );
}
