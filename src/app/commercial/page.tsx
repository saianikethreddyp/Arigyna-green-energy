import type { Metadata } from "next";
import Image from "next/image";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { createPageMetadata } from "@/lib/seo";
import styles from "./page.module.css";

export const metadata: Metadata = createPageMetadata({
  title: "Commercial Rooftop Solar | Arignya",
  description:
    "Start a commercial rooftop solar discussion with Arignya. We assess site context, electricity use and project requirements before recommending a path.",
  path: "/commercial",
});

const projectInputs = [
  "A recent electricity bill or consumption summary",
  "Site location and building type",
  "Approximate usable roof area, if known",
  "Your role in the property or business",
];

const coordinationItems = [
  ["01", "Site understanding", "We begin with your electricity use, roof context and project objective."],
  ["02", "Technical assessment", "A suitable system approach depends on site conditions, structural requirements and the applicable connection process."],
  ["03", "Proposal and confirmation", "We document the proposed scope, equipment and commercial terms before any work is confirmed."],
  ["04", "Delivery and execution", "The delivery plan, approvals and final timeline are confirmed for the specific project."],
];

export default function Commercial() {
  return (
    <div className={styles.page}>
      <Navbar />
      <main>
        <section className={styles.hero} aria-labelledby="commercial-title">
          <div className={styles.heroCopy}>
            <p className={styles.eyebrow}>Commercial rooftop solar</p>
            <h1 id="commercial-title">
              <span className={styles.titleLead}>Start With the Site.</span>
              <span className={styles.titleBuild}>Build the Right</span>
              <span className={styles.titleOutcome}>Solar Plan.</span>
            </h1>
            <p className={styles.heroDescription}>
              Commercial solar needs a clear view of your electricity use, roof,
              building and operational requirements. Start a project discussion
              with the information you already have.
            </p>
            <div className={styles.heroActions}>
              <a className={styles.primaryButton} href="#commercial-enquiry">
                Discuss a commercial project
              </a>
              <a className={styles.secondaryButton} href="#project-inputs">
                What to prepare
              </a>
            </div>
            <p className={styles.claimNote}>
              System scope, generation, savings, approvals, timeline and final
              pricing depend on technical and commercial assessment.
            </p>
          </div>

          <div className={styles.heroVisual}>
            <Image
              src="/concepts/commercial-rooftop-hero.png.png"
              alt="Commercial warehouse roof with a solar panel array"
              fill
              priority
              sizes="(max-width: 900px) 100vw, 50vw"
            />
          </div>
        </section>

        <section id="project-inputs" className={styles.inputs} aria-labelledby="inputs-title">
          <div className={styles.sectionIntro}>
            <p>First conversation</p>
            <h2 id="inputs-title">Bring what you know. We will identify what needs a closer look.</h2>
          </div>
          <div className={styles.inputsBoard}>
            <div>
              <span>Useful starting information</span>
              <p>You do not need a completed technical brief to start a conversation.</p>
            </div>
            <ul>
              {projectInputs.map((input) => <li key={input}>{input}</li>)}
            </ul>
          </div>
        </section>

        <section className={styles.process} aria-labelledby="process-title">
          <div className={styles.sectionIntro}>
            <p>Project path</p>
            <h2 id="process-title">A commercial proposal should be specific to your site.</h2>
          </div>
          <div className={styles.processGrid}>
            {coordinationItems.map(([number, title, copy]) => (
              <article key={number}>
                <span>{number}</span>
                <h3>{title}</h3>
                <p>{copy}</p>
              </article>
            ))}
          </div>
          <p className={styles.processNote}>
            Any regulatory approvals, utility coordination, equipment availability and project schedule remain subject to the applicable process and final written agreement.
          </p>
        </section>

        <section id="commercial-enquiry" className={styles.enquiry} aria-labelledby="enquiry-title">
          <div>
            <p className={styles.eyebrow}>Commercial enquiry</p>
            <h2 id="enquiry-title">Tell us where you are starting from.</h2>
            <p>
              Share your site location and the best way to reach you. We will use
              these details only to respond to your commercial solar enquiry.
            </p>
          </div>
          <div className={styles.enquiryActions}>
            <a className={styles.primaryButton} href="tel:+919063092424">Call +91 90630 92424</a>
            <a className={styles.secondaryButton} href="mailto:arignyagreenenergies@gmail.com?subject=Commercial%20rooftop%20solar%20enquiry">
              Email project details
            </a>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
