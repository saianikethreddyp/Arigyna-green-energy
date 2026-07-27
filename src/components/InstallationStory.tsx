"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import InstallationWorkbench from "./InstallationWorkbench";
import styles from "./InstallationStory.module.css";

const steps = [
  {
    number: "01",
    title: "Roof assessment",
    copy: "We review your electricity bill, connection type, location and available roof area.",
    status: "Understand the roof",
  },
  {
    number: "02",
    title: "System design",
    copy: "We recommend a suitable system capacity and prepare the technical design for your roof.",
    status: "Plan the right system",
  },
  {
    number: "03",
    title: "Documents and confirmation",
    copy: "We verify the required information, confirm your equipment and provide the final quotation.",
    status: "Confirm the details",
  },
  {
    number: "04",
    title: "Delivery and installation",
    copy: "Once the order is processed, we coordinate equipment delivery and install the system at your site.",
    status: "Build the system",
  },
  {
    number: "05",
    title: "Testing, commissioning and net-metering support",
    copy: "We test the completed system, support commissioning and help coordinate the net-metering process with the relevant DISCOM.",
    status: "Prepare for operation",
  },
] as const;

export default function InstallationStory() {
  const [activeStep, setActiveStep] = useState(0);
  const chapters = useRef<Array<HTMLElement | null>>([]);
  const manualScrollTarget = useRef<number | null>(null);
  const manualScrollTimer = useRef<number | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

        if (visible && manualScrollTarget.current === null) {
          setActiveStep(Number((visible.target as HTMLElement).dataset.step));
        }
      },
      {
        rootMargin: "-28% 0px -42% 0px",
        threshold: [0.2, 0.45, 0.7],
      },
    );

    chapters.current.forEach((chapter) => {
      if (chapter) observer.observe(chapter);
    });

    return () => {
      observer.disconnect();
      if (manualScrollTimer.current !== null) {
        window.clearTimeout(manualScrollTimer.current);
      }
    };
  }, []);

  function goToStep(index: number) {
    manualScrollTarget.current = index;
    setActiveStep(index);
    chapters.current[index]?.scrollIntoView({
      behavior: "smooth",
      block: "center",
    });

    if (manualScrollTimer.current !== null) {
      window.clearTimeout(manualScrollTimer.current);
    }

    manualScrollTimer.current = window.setTimeout(() => {
      manualScrollTarget.current = null;
      manualScrollTimer.current = null;
    }, 900);
  }

  return (
    <section
      id="installation"
      className={styles.section}
      aria-labelledby="installation-title"
    >
      <div className={styles.intro}>
        <p>The installation process</p>
        <h2 id="installation-title">
          Five clear steps to your rooftop solar system
        </h2>
      </div>

      <div className={styles.story}>
        <aside className={styles.stickyPanel} aria-label="Installation progress">
          <div className={styles.panelTop}>
            <span>Step {activeStep + 1} of 5</span>
            <span>{steps[activeStep].status}</span>
          </div>

          <InstallationWorkbench step={activeStep} />

          <div className={styles.panelBottom}>
            <p>{steps[activeStep].title}</p>
            <div className={styles.stepButtons}>
              {steps.map((step, index) => (
                <button
                  key={step.number}
                  type="button"
                  aria-label={`Go to step ${index + 1}: ${step.title}`}
                  aria-current={activeStep === index ? "step" : undefined}
                  onClick={() => goToStep(index)}
                >
                  {step.number}
                </button>
              ))}
            </div>
          </div>
        </aside>

        <div className={styles.chapters}>
          {steps.map((step, index) => (
            <article
              key={step.number}
              ref={(node) => {
                chapters.current[index] = node;
              }}
              data-step={index}
              className={styles.chapter}
            >
              <span className={styles.chapterNumber}>{step.number}</span>
              <div>
                <h3>{step.title}</h3>
                <p>{step.copy}</p>

                {index === 0 && (
                  <a className={styles.textLink} href="#roof-check">
                    Start with your bill
                  </a>
                )}

                {index === 3 && (
                  <div className={styles.equipment}>
                    <span>Available module options</span>
                    <div className={styles.brandGrid}>
                      <div className={styles.brandLogo}>
                        <Image
                          src="/brands/renew.svg"
                          alt="ReNew"
                          fill
                          sizes="160px"
                        />
                      </div>
                      <div className={styles.brandLogo}>
                        <Image
                          src="/brands/adani.svg"
                          alt="Adani"
                          fill
                          sizes="150px"
                        />
                      </div>
                      <div className={styles.brandLogo}>
                        <Image
                          src="/brands/waaree.png"
                          alt="Waaree"
                          fill
                          sizes="160px"
                        />
                      </div>
                    </div>
                  </div>
                )}

                {index === 4 && (
                  <div className={styles.equipment}>
                    <span>Available inverter options</span>
                    <div className={styles.brandGrid}>
                      <div className={styles.brandLogo}>
                        <Image
                          src="/brands/power-one.png"
                          alt="Power-One"
                          fill
                          sizes="170px"
                        />
                      </div>
                      <div className={styles.brandLogo}>
                        <Image
                          src="/brands/growatt.png"
                          alt="Growatt"
                          fill
                          sizes="150px"
                        />
                      </div>
                      <div className={styles.brandLogo}>
                        <Image
                          src="/brands/polycab.png"
                          alt="Polycab"
                          fill
                          sizes="150px"
                        />
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </article>
          ))}

          <div className={styles.notes}>
            <p>
              Our delivery and installation target is 20–25 days from payment.
              The final timeline can change because of site conditions,
              approvals, equipment availability, weather or other factors
              outside our control.
            </p>
            <p>
              Equipment is subject to availability and final quotation.
              Warranty coverage follows the respective manufacturer&apos;s
              terms and conditions.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
