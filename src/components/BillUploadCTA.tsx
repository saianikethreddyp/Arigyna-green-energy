import styles from "./BillUploadCTA.module.css";

export default function BillUploadCTA() {
  return (
    <section className={styles.section} aria-labelledby="roof-check-title">
      <div className={styles.copy}>
        <p className={styles.eyebrow}>Start with what you already have</p>
        <h2 id="roof-check-title">Your latest electricity bill is enough to get started.</h2>
        <p className={styles.description}>Share a few details first. WhatsApp will then open with your enquiry ready to send.</p>
        <p className={styles.privacy}>After WhatsApp opens, attach your latest electricity bill as a PDF, JPG or PNG.</p>
      </div>

      <div className={styles.form}>
        <p className={styles.handoff}>Your name, phone number, city or PIN code, and average monthly bill will be included in your WhatsApp message.</p>
        <a className={styles.whatsapp} href="#roof-check">Open roof check form</a>
      </div>
    </section>
  );
}
