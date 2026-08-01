import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { createPageMetadata } from "@/lib/seo";
import styles from "./page.module.css";

export const metadata: Metadata = createPageMetadata({
  title: "PM Surya Ghar Subsidy and Solar Process | Arignya",
  description:
    "Understand residential solar subsidy assistance, loan facilitation, net-metering coordination and the Arignya installation process.",
  path: "/subsidies",
});

const processSteps = [
  ["01", "Roof assessment", "Send us your bill and location. We review your expected system requirement and confirm whether we can service your location."],
  ["02", "System design", "We assess your roof and prepare a suitable system design using the agreed equipment options."],
  ["03", "Documents and confirmation", "We verify the required information, explain the quotation and confirm the payment route."],
  ["04", "Delivery and installation", "Delivery and installation are targeted within 20–25 days from payment, subject to weather, approvals, equipment availability and other conditions outside our control."],
  ["05", "Testing, commissioning and net-metering support", "We test the system, support commissioning and coordinate the applicable net-metering steps."],
] as const;

const faqs = [
  ["Does rooftop solar guarantee a zero electricity bill?", "No. Your final bill depends on consumption, solar generation, system size, net-metering rules and fixed or other applicable grid charges. A properly sized system can reduce the electricity you draw from the grid, but the result varies by home."],
  ["Do the panels power my home at night?", "Solar panels do not generate electricity after sunset. A grid-connected home normally uses grid power at night unless a battery is included in the system."],
  ["Is a battery included?", "Not unless your written quotation specifically includes one. The package prices shown on this website should not be understood as battery-inclusive."],
  ["Is the subsidy guaranteed?", "No. Subsidy eligibility, verification, approval and payment are controlled by the government and relevant authorities."],
  ["How is the subsidy paid?", "If applicable, the subsidy is credited directly to the customer's bank account under the PM Surya Ghar scheme guidelines, timelines and government regulations. Arignya cannot control delays or rejected claims."],
  ["Will my loan be approved?", "The lending bank makes the final decision. Arignya can facilitate the application but cannot guarantee approval or the sanctioned amount."],
  ["Is net metering guaranteed?", "No. Net metering is subject to the applicable DISCOM process, policies, approval and meter availability."],
  ["Will installation always be completed in 20-25 days?", "The target is 20-25 days from payment, but site conditions, equipment availability, weather, regulatory approvals and DISCOM processes may extend the timeline."],
  ["Which equipment brands are available?", "Module options include ReNew, Adani and Waaree. Inverter options include Power One, Growatt and Polycab. Final allocation is subject to availability and your confirmed quotation."],
  ["What payment is needed to apply?", "The circular requires a booking amount of ₹5,000 with the application. Direct-payment customers pay the full quoted amount after document verification and before order processing."],
  ["What happens if a bank loan is lower than the quote?", "The customer must pay the balance difference before the order is processed."],
  ["Can equipment be changed after confirmation?", "Changes to the module brand, inverter brand or balance-of-system components are not permitted once the order is confirmed."],
  ["How long is the price valid?", "The circular states that prices remain valid for 45 days, after which the company may revise them."],
] as const;

export default function Subsidies() {
  return (
    <div className={styles.page}>
      <Navbar />
      <main>
        <section className={styles.hero} aria-labelledby="subsidy-title">
          <div>
            <p className={styles.eyebrow}>Subsidy and installation support</p>
            <h1 id="subsidy-title">
              <span className={styles.titleLead}>A Clearer Path</span>
              <span className={styles.titleConnector}>Through</span>
              <span className={styles.titleOutcome}>Residential Solar.</span>
            </h1>
          </div>
          <div className={styles.heroDetails}>
            <p>We help you understand the system, documents and coordination involved. Government benefits, bank loans and DISCOM approvals remain subject to the rules and decisions of the respective authorities.</p>
            <div className={styles.actions}>
              <Link className={styles.primaryButton} href="/#roof-check">Check my roof and bill</Link>
              <a className={styles.secondaryButton} href="#process">See the process</a>
            </div>
          </div>
        </section>

        <section className={styles.subsidy} aria-labelledby="support-title">
          <div className={styles.sectionIntro}>
            <p>PM Surya Ghar assistance</p>
            <h2 id="support-title">Understand the subsidy before you make a decision.</h2>
          </div>
          <div className={styles.subsidyBoard}>
            <p className={styles.boardCopy}>If applicable, the solar subsidy is credited directly to the customer&apos;s bank account under the PM Surya Ghar scheme guidelines, timelines and applicable government regulations.</p>
            <div className={styles.subsidyFacts} aria-label="Subsidy terms">
              <div><span>Payment route</span><strong>Direct to your bank account</strong></div>
              <div><span>What decides it</span><strong>Scheme and DISCOM rules</strong></div>
              <div><span>What we can do</span><strong>Assist with the process</strong></div>
            </div>
            <p className={styles.qualification}>Eligibility, verification, approval and final payment are decided by the government and relevant DISCOM. Arignya cannot guarantee subsidy approval, timing, amount or payment, and is not responsible for delayed or rejected claims.</p>
            <div className={styles.boardActions}>
              <a href="#process">Understand the subsidy process</a>
              <a href="https://pmsuryaghar.gov.in/" target="_blank" rel="noreferrer">Visit the official PM Surya Ghar portal</a>
            </div>
          </div>
          <div className={styles.sourcePanel}>
            <div>
              <p className={styles.sourceLabel}>Commercial terms source</p>
              <h3>Pricing and service conditions dated 3 July 2026.</h3>
              <p>The Saraswan Holdings circular applies to residential rooftop kits with EPC in Andhra Pradesh and Telangana. It lists a ₹5,000 booking amount, a 20–25 day delivery and installation target from payment, and 45-day price validity.</p>
            </div>
            <div className={styles.sourceMark}>
              <Image
                src="/saraswan-holdings-source.png"
                alt="Saraswan Holdings"
                width={260}
                height={82}
              />
              <span>Supplier circular, not a government notification.</span>
            </div>
          </div>
        </section>

        <section className={styles.help} aria-labelledby="help-title">
          <div className={styles.sectionIntro}>
            <p>How we help</p>
            <h2 id="help-title">Assistance without false promises.</h2>
          </div>
          <div className={styles.helpGrid}>
            <article>
              <h3>We can help with</h3>
              <ul><li>Understanding the applicable process</li><li>Reviewing the information needed to begin</li><li>System installation and commissioning</li><li>Net-metering coordination with the concerned department</li><li>Subsidy-process assistance</li><li>Bank-loan application facilitation</li></ul>
            </article>
            <article>
              <h3>We cannot guarantee</h3>
              <ul><li>Subsidy eligibility, approval or payment</li><li>The subsidy amount finally sanctioned</li><li>Government processing time</li><li>DISCOM approval or net-meter availability</li><li>Bank-loan approval</li><li>A fixed installation date when external approvals are pending</li></ul>
            </article>
          </div>
        </section>

        <section id="process" className={styles.process} aria-labelledby="process-title">
          <div className={styles.sectionIntro}>
            <p>The installation process</p>
            <h2 id="process-title">Five steps, with the next one made clear.</h2>
          </div>
          <ol className={styles.steps}>
            {processSteps.map(([number, title, copy]) => <li key={number}><span>{number}</span><div><h3>{title}</h3><p>{copy}</p></div></li>)}
          </ol>
        </section>

        <section className={styles.loan} aria-labelledby="loan-title">
          <div><p className={styles.eyebrow}>Loan facilitation</p><h2 id="loan-title">Planning to use a bank loan?</h2></div>
          <div><p>We can help you begin the loan application process. Loan approval, the sanctioned amount, interest rate, documentation and disbursement are decided by the lending bank.</p><p>You may need to visit the bank and complete its formalities directly. If the sanctioned amount is lower than the final quotation, the difference must be paid before the order is processed.</p><Link className={styles.primaryButton} href="/#roof-check">Ask about loan facilitation</Link></div>
        </section>

        <section className={styles.faq} aria-labelledby="faq-title">
          <div className={styles.sectionIntro}><p>Frequently asked questions</p><h2 id="faq-title">The details that affect your decision.</h2></div>
          <div className={styles.faqList}>{faqs.map(([question, answer]) => <details key={question}><summary>{question}</summary><p>{answer}</p></details>)}</div>
        </section>

        <section className={styles.finalCta} aria-labelledby="final-title">
          <p className={styles.eyebrow}>Start with what you already have</p>
          <h2 id="final-title">Start with the information you already have.</h2>
          <p>Send your latest electricity bill and location. We will explain the next step without asking you to commit immediately.</p>
          <Link className={styles.primaryButton} href="/#roof-check">Send my electricity bill</Link>
        </section>
      </main>
      <Footer />
    </div>
  );
}
