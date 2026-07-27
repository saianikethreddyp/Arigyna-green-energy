import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function SolarHero() {
  return (
    <section className="solar-hero" aria-labelledby="solar-hero-title">
      <div className="solar-hero__scene" aria-hidden="true">
        <Image
          src="/hero.png"
          alt=""
          fill
          priority
          sizes="100vw"
          className="solar-hero__image"
        />
        <div className="solar-hero__sun" />
        <div className="solar-hero__cloud solar-hero__cloud--one" />
        <div className="solar-hero__cloud solar-hero__cloud--two" />
        <div className="solar-hero__light-sweep" />
        <div className="solar-hero__panel-sheen" />
        <div className="solar-hero__grade" />
        <div className="solar-hero__grain" />
      </div>

      <div className="solar-hero__content">
        <p className="solar-hero__eyebrow">
          Rooftop solar for Andhra Pradesh and Telangana
        </p>
        <h1 id="solar-hero-title" className="solar-hero__title">
          Turn your roof into
          <span>Zero electricity bills</span>
        </h1>
        <p className="solar-hero__copy">
          Complete rooftop solar installation for your home, from system design
          and equipment to net-metering support.
        </p>
        <div className="solar-hero__actions">
          <Link href="/residential" className="solar-hero__primary-action">
            Get a free roof check
            <ArrowRight aria-hidden="true" size={19} strokeWidth={2} />
          </Link>
          <Link href="/residential" className="solar-hero__secondary-action">
            View solar packages
          </Link>
        </div>
      </div>

      <div className="solar-hero__proof" aria-label="Service highlights">
        <div>
          <strong>Complete solar EPC</strong>
          <span>One team from design to installation</span>
        </div>
        <div>
          <strong>Net-metering support</strong>
          <span>Help with documents and coordination</span>
        </div>
        <div>
          <strong>20 to 25 days</strong>
          <span>Target installation timeline</span>
        </div>
      </div>
    </section>
  );
}
