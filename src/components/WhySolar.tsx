"use client";

import { useEffect, useRef, useState } from "react";
import WhySolarScene from "./WhySolarScene";
import styles from "./WhySolar.module.css";

const chapters = [
  {
    number: "01",
    title: "Use less grid electricity during daylight.",
    copy: "Solar can supply part of the electricity your home is using while the panels are generating.",
  },
  {
    number: "02",
    title: "Put suitable roof space to work.",
    copy: "Panel placement and system capacity follow your available roof area, electricity use and site conditions.",
  },
  {
    number: "03",
    title: "Generate cleaner electricity at home.",
    copy: "Produce electricity on your own roof, closer to where your home consumes it.",
  },
] as const;

export default function WhySolar() {
  const sectionRef = useRef<HTMLElement>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    let frame = 0;

    function update() {
      frame = 0;
      const rect = section!.getBoundingClientRect();
      const travel = Math.max(1, section!.offsetHeight - window.innerHeight);
      setProgress(Math.max(0, Math.min(1, -rect.top / travel)));
    }

    function requestUpdate() {
      if (frame) return;
      frame = window.requestAnimationFrame(update);
    }

    update();
    window.addEventListener("scroll", requestUpdate, { passive: true });
    window.addEventListener("resize", requestUpdate);

    return () => {
      window.removeEventListener("scroll", requestUpdate);
      window.removeEventListener("resize", requestUpdate);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, []);

  const activeChapter =
    progress < 0.36 ? 0 : progress < 0.68 ? 1 : 2;

  return (
    <section
      ref={sectionRef}
      id="why-solar"
      className={styles.section}
      aria-labelledby="why-solar-title"
    >
      <div className={styles.sticky} data-opening={progress < 0.14}>
        <div className={styles.visual}>
          <WhySolarScene progress={progress} />
        </div>

        <div className={styles.story}>
          <p className={styles.eyebrow}>Why home solar</p>

          <div className={styles.opening} data-visible={progress < 0.12}>
            <h2 id="why-solar-title">
              Every sunny day, energy reaches your roof.
            </h2>
            <p>Solar gives your home a way to use it.</p>
          </div>

          <div
            className={styles.chapterStack}
            data-visible={progress >= 0.14}
          >
            {chapters.map((chapter, index) => (
              <article
                key={chapter.number}
                className={styles.chapter}
                data-active={activeChapter === index}
              >
                <span>{chapter.number}</span>
                <div>
                  <h3>{chapter.title}</h3>
                  <p>{chapter.copy}</p>
                </div>
              </article>
            ))}
          </div>

          <div className={styles.progress} aria-hidden="true">
            <span style={{ transform: `scaleX(${progress})` }} />
          </div>

          <div className={styles.closing} data-visible={progress > 0.86}>
            <p>The next question is how much solar fits your home.</p>
            <a href="#roof-check" data-lead-source="Why Solar section">
              See what your roof could support
            </a>
          </div>

          <p className={styles.note} data-hidden={progress > 0.84}>
            Actual generation and bill impact depend on system size,
            electricity use, roof conditions, net metering and applicable grid
            charges.
          </p>
        </div>
      </div>
    </section>
  );
}
