"use client";

import { FormEvent, useEffect, useRef, useState } from "react";
import styles from "./RoofCheckModal.module.css";

const whatsappNumber = "919063092424";

export default function RoofCheckModal() {
  const [open, setOpen] = useState(false);
  const dialogRef = useRef<HTMLElement>(null);

  useEffect(() => {
    function openFromHash() {
      if (window.location.hash !== "#roof-check") return;

      setOpen(true);
      window.history.replaceState(null, "", `${window.location.pathname}${window.location.search}`);
    }

    openFromHash();
    window.addEventListener("hashchange", openFromHash);
    return () => window.removeEventListener("hashchange", openFromHash);
  }, []);

  useEffect(() => {
    function openFromRoofCheckLink(event: MouseEvent) {
      if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey) return;

      const target = event.target as Element | null;
      const link = target?.closest<HTMLAnchorElement>('a[href$="#roof-check"]');
      if (!link) return;

      event.preventDefault();
      setOpen(true);
    }

    document.addEventListener("click", openFromRoofCheckLink, true);
    return () => document.removeEventListener("click", openFromRoofCheckLink, true);
  }, []);

  useEffect(() => {
    if (!open) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    dialogRef.current?.focus();

    function closeOnEscape(event: KeyboardEvent) {
      if (event.key === "Escape") setOpen(false);
    }

    window.addEventListener("keydown", closeOnEscape);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", closeOnEscape);
    };
  }, [open]);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const values = new FormData(event.currentTarget);
    const message = [
      "Hello Arignya, I would like a free roof check for my home.",
      "",
      `Name: ${String(values.get("name") ?? "").trim()}`,
      `Phone: ${String(values.get("phone") ?? "").trim()}`,
      `City or PIN code: ${String(values.get("location") ?? "").trim()}`,
      `Average monthly electricity bill: ${String(values.get("monthlyBill") ?? "").trim()}`,
      "",
      "Please attach your latest electricity bill (PDF, JPG or PNG) in this WhatsApp chat.",
    ].join("\n");

    window.open(
      `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`,
      "_blank",
      "noopener,noreferrer",
    );
  }

  if (!open) return null;

  return (
    <div className={styles.backdrop} onMouseDown={() => setOpen(false)}>
      <section
        ref={dialogRef}
        className={styles.dialog}
        role="dialog"
        aria-modal="true"
        aria-labelledby="roof-check-modal-title"
        tabIndex={-1}
        onMouseDown={(event) => event.stopPropagation()}
      >
        <div className={styles.header}>
          <div>
            <p>Free roof check</p>
            <h2 id="roof-check-modal-title">Start with what you know.</h2>
          </div>
          <button type="button" onClick={() => setOpen(false)} aria-label="Close roof check form">Close</button>
        </div>

        <p className={styles.intro}>Share a few details about your home. WhatsApp will open with your enquiry ready to send.</p>

        <form onSubmit={handleSubmit}>
          <div className={styles.fields}>
            <label><span>Name</span><input name="name" autoComplete="name" placeholder="Your name" required /></label>
            <label><span>Phone</span><input name="phone" type="tel" inputMode="tel" autoComplete="tel" placeholder="Your phone number" required /></label>
            <label><span>City or PIN code</span><input name="location" autoComplete="postal-code" placeholder="City or PIN code" required /></label>
            <label><span>Average monthly electricity bill</span><input name="monthlyBill" inputMode="numeric" placeholder="For example, ₹4,500" required /></label>
          </div>
          <p className={styles.note}>After WhatsApp opens, attach your latest electricity bill as a PDF, JPG or PNG.</p>
          <button className={styles.submit} type="submit">Continue on WhatsApp</button>
        </form>
      </section>
    </div>
  );
}
