"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import styles from "./SolarDayNight.module.css";

type Period = "morning" | "night";

const content = {
  morning: {
    heading: "Your roof powers your home during the day",
    copy: "During the day, your panels generate electricity for your home. Any extra power may be sent to the grid through net metering.",
    controlCopy: "Solar generation",
  },
  night: {
    heading: "After sunset, your home returns to grid power",
    copy: "After sunset, your home uses grid power unless a battery is part of your system. Your savings come from the solar energy generated during the day.",
    controlCopy: "Grid power",
  },
} satisfies Record<
  Period,
  { heading: string; copy: string; controlCopy: string }
>;

export default function SolarDayNight() {
  const [period, setPeriod] = useState<Period>("morning");
  const morningButton = useRef<HTMLButtonElement>(null);
  const nightButton = useRef<HTMLButtonElement>(null);
  function selectPeriod(nextPeriod: Period) {
    setPeriod(nextPeriod);
    if (nextPeriod === "morning") {
      morningButton.current?.focus();
    } else {
      nightButton.current?.focus();
    }
  }

  function handleKeyDown(event: React.KeyboardEvent<HTMLDivElement>) {
    if (event.key === "ArrowLeft" || event.key === "ArrowUp") {
      event.preventDefault();
      selectPeriod("morning");
    }

    if (event.key === "ArrowRight" || event.key === "ArrowDown") {
      event.preventDefault();
      selectPeriod("night");
    }
  }

  return (
    <section
      id="day-night"
      className={styles.section}
      aria-labelledby="solar-day-night-title"
    >
      <div className={styles.scene} data-period={period}>
        <div className={styles.imageStage} key={`house-${period}`}>
          <Image
            className={styles.morningImage}
            src="/concepts/solar-home-morning-v1.png"
            alt="A residential home with rooftop solar panels in daylight"
            fill
            loading="eager"
            sizes="(max-width: 720px) 100vw, 1380px"
          />
          <Image
            className={styles.nightImage}
            src="/concepts/solar-home-night-v1.png"
            alt="The same residential home after sunset with its windows illuminated"
            fill
            loading="eager"
            sizes="(max-width: 720px) 100vw, 1380px"
          />
        </div>

        <div className={styles.topFade} aria-hidden="true" />
        <div className={styles.bottomFade} aria-hidden="true" />

        <div className={styles.sceneHeading}>
          <p>How grid-connected solar works</p>
          <h2 id="solar-day-night-title">
            <span>Solar changes how</span>{" "}
            <span>your home uses</span>{" "}
            <span>electricity</span>
          </h2>
        </div>

        <div
          className={styles.segmentedControl}
          role="group"
          aria-label="Choose a time of day"
          onKeyDown={handleKeyDown}
        >
          <button
            ref={morningButton}
            type="button"
            aria-pressed={period === "morning"}
            onClick={() => selectPeriod("morning")}
          >
            <strong>Morning</strong>
            <span>{content.morning.controlCopy}</span>
          </button>
          <button
            ref={nightButton}
            type="button"
            aria-pressed={period === "night"}
            onClick={() => selectPeriod("night")}
          >
            <strong>Night</strong>
            <span>{content.night.controlCopy}</span>
          </button>
        </div>

        <div className={styles.exposureFlash} key={`flash-${period}`} aria-hidden="true" />

        <div className={styles.explanation} key={period}>
          <h3>{content[period].heading}</h3>
          <p>{content[period].copy}</p>
        </div>
      </div>

      <p className={styles.batteryNote}>
        The packages shown on this website do not include a battery unless it
        is specifically included in your written quotation.
      </p>
    </section>
  );
}
