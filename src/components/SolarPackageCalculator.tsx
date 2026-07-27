"use client";

import {
  FormEvent,
  useMemo,
  useRef,
  useState,
} from "react";
import {
  getSolarModuleLabel,
  getSolarPackagePrice,
  solarPackages,
  type SolarConnection,
  type SolarModuleOption,
} from "@/data/solar-packages";
import {
  createSolarLeadPayload,
  createSolarLeadWhatsAppUrl,
  formatRupees,
} from "@/lib/solar-lead";
import styles from "./SolarPackageCalculator.module.css";

type ConnectionChoice = SolarConnection | "Help me find it";
type SubmissionState =
  | "idle"
  | "sending"
  | "sent"
  | "unavailable"
  | "error";

type SolarPackageCalculatorProps = {
  initialSystemSlug?: string;
  whatsappE164?: string;
};

const connectionChoices: ConnectionChoice[] = [
  "Single-phase",
  "Three-phase",
  "Help me find it",
];

export default function SolarPackageCalculator({
  initialSystemSlug,
  whatsappE164,
}: SolarPackageCalculatorProps) {
  const initialPackage = solarPackages.find(
    (solarPackage) => solarPackage.slug === initialSystemSlug,
  );
  const [monthlyBill, setMonthlyBill] = useState("");
  const [connectionChoice, setConnectionChoice] =
    useState<ConnectionChoice | null>(initialPackage?.connection ?? null);
  const [confirmedConnection, setConfirmedConnection] =
    useState<SolarConnection | null>(null);
  const [selectedSlug, setSelectedSlug] = useState(
    initialPackage?.slug ?? solarPackages[0].slug,
  );
  const [moduleOption, setModuleOption] =
    useState<SolarModuleOption>("renew");
  const [billReference, setBillReference] = useState("");
  const [billError, setBillError] = useState("");
  const [connectionError, setConnectionError] = useState("");
  const [submissionState, setSubmissionState] =
    useState<SubmissionState>("idle");
  const [submissionMessage, setSubmissionMessage] = useState("");
  const [mobilePlanOpen, setMobilePlanOpen] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);
  const packageRailRef = useRef<HTMLDivElement>(null);

  const availablePackages = useMemo(
    () =>
      confirmedConnection
        ? solarPackages.filter(
            (solarPackage) =>
              solarPackage.connection === confirmedConnection,
          )
        : [],
    [confirmedConnection],
  );

  const selectedPackage =
    availablePackages.find(
      (solarPackage) => solarPackage.slug === selectedSlug,
    ) ??
    availablePackages[0] ??
    solarPackages[0];

  const selectedPrice = getSolarPackagePrice(
    selectedPackage,
    moduleOption,
  );
  const planIsReady = confirmedConnection !== null;

  function confirmBillContext() {
    const parsedBill = Number(monthlyBill);
    const billIsValid = Number.isFinite(parsedBill) && parsedBill > 0;
    const connectionIsValid =
      connectionChoice === "Single-phase" ||
      connectionChoice === "Three-phase";

    setBillError(
      billIsValid ? "" : "Enter an average monthly bill greater than ₹0.",
    );
    setConnectionError(
      connectionIsValid
        ? ""
        : connectionChoice === "Help me find it"
          ? "Use the bill guide below to confirm single-phase or three-phase."
          : "Choose the connection type shown on your bill.",
    );

    if (!billIsValid || !connectionIsValid) return;

    const nextConnection = connectionChoice as SolarConnection;
    const firstCompatible = solarPackages.find(
      (solarPackage) => solarPackage.connection === nextConnection,
    );

    setConfirmedConnection(nextConnection);
    if (
      !solarPackages.some(
        (solarPackage) =>
          solarPackage.slug === selectedSlug &&
          solarPackage.connection === nextConnection,
      ) &&
      firstCompatible
    ) {
      setSelectedSlug(firstCompatible.slug);
    }
    setSubmissionState("idle");
    setSubmissionMessage("");

    window.requestAnimationFrame(() => {
      packageRailRef.current?.focus({ preventScroll: true });
    });
  }

  function createPayloadFromForm() {
    const form = formRef.current;
    if (!form || !form.reportValidity() || !confirmedConnection) return null;

    const data = new FormData(form);
    return createSolarLeadPayload({
      name: String(data.get("name") ?? ""),
      phone: String(data.get("phone") ?? ""),
      cityOrPinCode: String(data.get("location") ?? ""),
      averageMonthlyBillRupees: Number(monthlyBill),
      connectionType: confirmedConnection,
      selectedPackage,
      selectedModuleOption: moduleOption,
      billReference: billReference || undefined,
    });
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const payload = createPayloadFromForm();
    if (!payload) return;

    setSubmissionState("sending");
    setSubmissionMessage("Sending your Solar Starting Plan…");

    try {
      const response = await fetch("/api/solar-leads", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(payload),
      });
      const result = (await response.json()) as {
        ok?: boolean;
        code?: string;
      };

      if (response.ok && result.ok) {
        setSubmissionState("sent");
        setSubmissionMessage(
          "Your enquiry was sent. Arignya can now review this starting plan.",
        );
        return;
      }

      if (result.code === "delivery_not_configured") {
        setSubmissionState("unavailable");
        setSubmissionMessage(
          "Online form delivery is not connected yet. Nothing was sent or stored. You can still copy these details or continue on WhatsApp once the business number is verified.",
        );
        return;
      }

      setSubmissionState("error");
      setSubmissionMessage(
        "Your enquiry could not be sent or stored. Please try again.",
      );
    } catch {
      setSubmissionState("error");
      setSubmissionMessage(
        "Your enquiry could not be sent or stored. Please check your connection and try again.",
      );
    }
  }

  function handleWhatsApp() {
    const payload = createPayloadFromForm();
    if (!payload || !whatsappE164) return;

    try {
      window.open(
        createSolarLeadWhatsAppUrl(whatsappE164, payload),
        "_blank",
        "noopener,noreferrer",
      );
    } catch {
      setSubmissionState("unavailable");
      setSubmissionMessage(
        "The WhatsApp business number is not configured in valid E.164 format.",
      );
    }
  }

  return (
    <section
      id="calculator"
      className={styles.calculator}
      data-plan-ready={planIsReady}
      aria-labelledby="calculator-title"
    >
      <header className={styles.calculatorIntro}>
        <p>Bill-to-Roof</p>
        <h2 id="calculator-title">
          Turn your electricity bill into a solar starting plan.
        </h2>
        <span>
          Tell us what is already on your bill. We will show the compatible
          listed packages and what still needs a roof check.
        </span>
      </header>

      <div className={styles.workspace}>
        <article className={styles.bill} aria-labelledby="bill-title">
          <div className={styles.billMasthead}>
            <div>
              <span>Electricity bill context</span>
              <h3 id="bill-title">Start with what you know</h3>
            </div>
            <strong aria-hidden="true">01</strong>
          </div>

          <div className={styles.billBody}>
            <label className={styles.billAmount}>
              <span>Average monthly electricity bill</span>
              <span className={styles.moneyInput}>
                <b aria-hidden="true">₹</b>
                <input
                  type="number"
                  min="1"
                  step="100"
                  inputMode="numeric"
                  value={monthlyBill}
                  onChange={(event) => {
                    setMonthlyBill(event.target.value);
                    setBillError("");
                  }}
                  aria-describedby="bill-amount-note bill-amount-error"
                  aria-invalid={Boolean(billError)}
                  placeholder="4,500"
                />
                <small>/ month</small>
              </span>
            </label>
            <p id="bill-amount-note" className={styles.truthNote}>
              Bill amount is enquiry context. It cannot reliably determine
              solar capacity, savings or payback on its own.
            </p>
            <p id="bill-amount-error" className={styles.error}>
              {billError}
            </p>

            <fieldset className={styles.connectionField}>
              <legend>Connection type shown on the bill</legend>
              <div className={styles.connectionOptions}>
                {connectionChoices.map((choice) => (
                  <label key={choice}>
                    <input
                      type="radio"
                      name="connection"
                      value={choice}
                      checked={connectionChoice === choice}
                      onChange={() => {
                        setConnectionChoice(choice);
                        setConnectionError("");
                      }}
                    />
                    <span>{choice}</span>
                  </label>
                ))}
              </div>
            </fieldset>

            {connectionChoice === "Help me find it" ? (
              <div className={styles.connectionHelp}>
                <strong>Look near “phase”, “supply” or “connection”.</strong>
                <p>
                  Choose only what your bill states. If it is still unclear,
                  keep the bill selected and Arignya can confirm it during the
                  enquiry.
                </p>
                <div>
                  <button
                    type="button"
                    onClick={() => {
                      setConnectionChoice("Single-phase");
                      setConnectionError("");
                    }}
                  >
                    It says single-phase
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setConnectionChoice("Three-phase");
                      setConnectionError("");
                    }}
                  >
                    It says three-phase
                  </button>
                </div>
              </div>
            ) : null}

            <p className={styles.error}>{connectionError}</p>

            <label className={styles.billUpload}>
              <span>
                <strong>Latest bill</strong>
                <small>PDF, JPG or PNG · optional</small>
              </span>
              <input
                type="file"
                accept=".pdf,.jpg,.jpeg,.png,application/pdf,image/jpeg,image/png"
                onChange={(event) =>
                  setBillReference(event.target.files?.[0]?.name ?? "")
                }
              />
              <b>{billReference || "Choose file"}</b>
            </label>

            <button
              type="button"
              className={styles.confirmButton}
              onClick={confirmBillContext}
            >
              {planIsReady
                ? "Update compatible packages"
                : "Show compatible listed packages"}
            </button>
          </div>

          <footer className={styles.billFooter}>
            <span>Capacity still requires consumption and site confirmation.</span>
            <span>Price list: 03.07.2026</span>
          </footer>
        </article>

        <div
          ref={packageRailRef}
          className={styles.packageStage}
          tabIndex={-1}
          aria-hidden={!planIsReady}
        >
          {planIsReady ? (
            <>
              <div className={styles.railHeading}>
                <div>
                  <span>Compatible by connection</span>
                  <h3>{confirmedConnection} packages</h3>
                </div>
                <p>
                  Compatibility is not a capacity recommendation. Your roof,
                  consumption and site still need confirmation.
                </p>
              </div>

              <div
                className={styles.priceRail}
                aria-label="Compatible listed solar packages"
              >
                {availablePackages.map((solarPackage) => {
                  const isSelected = solarPackage.slug === selectedPackage.slug;
                  return (
                    <button
                      key={solarPackage.slug}
                      type="button"
                      aria-pressed={isSelected}
                      onClick={() => {
                        setSelectedSlug(solarPackage.slug);
                        setSubmissionState("idle");
                        setSubmissionMessage("");
                      }}
                    >
                      <span>{solarPackage.capacity}</span>
                      <small>{solarPackage.connection}</small>
                      <b>{solarPackage.renewPrice}</b>
                      <em>ReNew modules</em>
                      <i>{isSelected ? "In starting plan" : "Select system"}</i>
                    </button>
                  );
                })}
              </div>

              <div className={styles.moduleRail}>
                <div>
                  <span>Module option</span>
                  <p>
                    Final allocation remains subject to equipment availability
                    and the written quotation.
                  </p>
                </div>
                <div className={styles.moduleOptions}>
                  {(["renew", "adaniWaaree"] as const).map((option) => (
                    <button
                      key={option}
                      type="button"
                      aria-pressed={moduleOption === option}
                      onClick={() => {
                        setModuleOption(option);
                        setSubmissionState("idle");
                        setSubmissionMessage("");
                      }}
                    >
                      <span>{getSolarModuleLabel(option)}</span>
                      <b>
                        {formatRupees(
                          getSolarPackagePrice(selectedPackage, option),
                        )}
                      </b>
                    </button>
                  ))}
                </div>
              </div>
            </>
          ) : null}
        </div>
      </div>

      {planIsReady ? (
        <form
          ref={formRef}
          className={styles.planSheet}
          onSubmit={handleSubmit}
          aria-labelledby="plan-title"
        >
          <header className={styles.planHeader}>
            <div>
              <span>Solar Starting Plan</span>
              <h3 id="plan-title">
                {selectedPackage.capacity} · {getSolarModuleLabel(moduleOption)}
              </h3>
            </div>
            <strong>{formatRupees(selectedPrice)}</strong>
          </header>

          <div className={styles.planColumns}>
            <section aria-labelledby="known-title">
              <h4 id="known-title">Known from this plan</h4>
              <dl>
                <div>
                  <dt>Monthly bill</dt>
                  <dd>{formatRupees(Number(monthlyBill))}</dd>
                </div>
                <div>
                  <dt>Connection</dt>
                  <dd>{confirmedConnection}</dd>
                </div>
                <div>
                  <dt>Selected package</dt>
                  <dd>{selectedPackage.capacity}</dd>
                </div>
                <div>
                  <dt>Module option</dt>
                  <dd>{getSolarModuleLabel(moduleOption)}</dd>
                </div>
                <div>
                  <dt>Listed price</dt>
                  <dd>{formatRupees(selectedPrice)}</dd>
                </div>
              </dl>
            </section>

            <section aria-labelledby="roof-check-title">
              <h4 id="roof-check-title">Needs a roof check</h4>
              <ul>
                <li>Usable roof area</li>
                <li>Roof structure and mounting requirements</li>
                <li>Current equipment availability</li>
                <li>Site-specific electrical or civil work</li>
                <li>Final system capacity and written quotation</li>
              </ul>
            </section>
          </div>

          <p className={styles.pricingQualification}>
            Listed price is from the 3 July 2026 price list. Prices and
            equipment remain subject to availability, final site assessment and
            a written quotation. Additional site-specific work may change the
            final price.
          </p>

          <div className={styles.contactFields}>
            <label>
              <span>Name</span>
              <input
                name="name"
                autoComplete="name"
                placeholder="Your name"
                required
              />
            </label>
            <label>
              <span>Phone</span>
              <input
                name="phone"
                type="tel"
                inputMode="tel"
                autoComplete="tel"
                placeholder="Your phone number"
                required
              />
            </label>
            <label>
              <span>City or PIN code</span>
              <input
                name="location"
                autoComplete="postal-code"
                placeholder="City or PIN code"
                required
              />
            </label>
          </div>

          <div className={styles.planActions}>
            <button
              type="submit"
              disabled={submissionState === "sending"}
            >
              {submissionState === "sending"
                ? "Sending…"
                : "Confirm this with a free roof check"}
            </button>
            <button
              type="button"
              className={styles.whatsappButton}
              onClick={handleWhatsApp}
              disabled={!whatsappE164}
              aria-describedby={!whatsappE164 ? "whatsapp-config-note" : undefined}
            >
              Continue on WhatsApp
            </button>
          </div>

          {!whatsappE164 ? (
            <p id="whatsapp-config-note" className={styles.configNote}>
              WhatsApp is unavailable until the verified business number is
              configured.
            </p>
          ) : null}

          {submissionMessage ? (
            <p
              className={styles.submissionStatus}
              data-state={submissionState}
              role="status"
            >
              {submissionMessage}
            </p>
          ) : null}
        </form>
      ) : null}

      {planIsReady ? (
        <div className={styles.mobileSummary}>
          <button
            type="button"
            aria-expanded={mobilePlanOpen}
            onClick={() => setMobilePlanOpen((current) => !current)}
          >
            <span>
              <small>Solar Starting Plan</small>
              <strong>{selectedPackage.capacity}</strong>
            </span>
            <b>{formatRupees(selectedPrice)}</b>
            <i>{mobilePlanOpen ? "Close" : "View plan"}</i>
          </button>
          {mobilePlanOpen ? (
            <div>
              <span>{confirmedConnection}</span>
              <span>{getSolarModuleLabel(moduleOption)} modules</span>
              <a href="#plan-title">Complete plan and roof check</a>
            </div>
          ) : null}
        </div>
      ) : null}
    </section>
  );
}
