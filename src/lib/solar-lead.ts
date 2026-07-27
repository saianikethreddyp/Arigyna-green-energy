import type {
  SolarConnection,
  SolarModuleOption,
  SolarPackage,
} from "@/data/solar-packages";
import {
  getSolarModuleLabel,
  getSolarPackagePrice,
  solarPackages,
} from "@/data/solar-packages";

export type SolarLeadPayload = {
  schemaVersion: 1;
  source: "bill-to-roof";
  name: string;
  phone: string;
  cityOrPinCode: string;
  averageMonthlyBillRupees: number;
  connectionType: SolarConnection;
  selectedSystemSlug: string;
  selectedSystemCapacity: string;
  selectedModuleOption: SolarModuleOption;
  selectedModuleLabel: string;
  listedPackagePriceRupees: number;
  billUpload: {
    status: "not-selected" | "selected-in-browser";
    reference?: string;
  };
  roofSiteAssessmentRequired: true;
};

export type SolarLeadInput = {
  name: string;
  phone: string;
  cityOrPinCode: string;
  averageMonthlyBillRupees: number;
  connectionType: SolarConnection;
  selectedPackage: SolarPackage;
  selectedModuleOption: SolarModuleOption;
  billReference?: string;
};

export function createSolarLeadPayload(
  input: SolarLeadInput,
): SolarLeadPayload {
  const billReference = input.billReference?.trim();

  return {
    schemaVersion: 1,
    source: "bill-to-roof",
    name: input.name.trim(),
    phone: input.phone.trim(),
    cityOrPinCode: input.cityOrPinCode.trim(),
    averageMonthlyBillRupees: Math.round(input.averageMonthlyBillRupees),
    connectionType: input.connectionType,
    selectedSystemSlug: input.selectedPackage.slug,
    selectedSystemCapacity: input.selectedPackage.capacity,
    selectedModuleOption: input.selectedModuleOption,
    selectedModuleLabel: getSolarModuleLabel(input.selectedModuleOption),
    listedPackagePriceRupees: getSolarPackagePrice(
      input.selectedPackage,
      input.selectedModuleOption,
    ),
    billUpload: billReference
      ? { status: "selected-in-browser", reference: billReference }
      : { status: "not-selected" },
    roofSiteAssessmentRequired: true,
  };
}

export function formatSolarLeadWhatsAppMessage(payload: SolarLeadPayload) {
  const billStatus =
    payload.billUpload.status === "selected-in-browser"
      ? `Selected in browser: ${payload.billUpload.reference ?? "file selected"} (not attached to WhatsApp)`
      : "No bill selected";

  return [
    "Hello Arignya, I would like to confirm a home solar starting plan.",
    "",
    `Name: ${payload.name}`,
    `Phone: ${payload.phone}`,
    `City or PIN code: ${payload.cityOrPinCode}`,
    `Average monthly electricity bill: ${formatRupees(payload.averageMonthlyBillRupees)}`,
    `Connection type: ${payload.connectionType}`,
    `Selected system capacity: ${payload.selectedSystemCapacity}`,
    `Selected module option: ${payload.selectedModuleLabel}`,
    `Listed package price: ${formatRupees(payload.listedPackagePriceRupees)}`,
    `Bill upload status: ${billStatus}`,
    "",
    "I understand that a roof/site assessment and final quotation are still required.",
  ].join("\n");
}

export function createSolarLeadWhatsAppUrl(
  whatsappE164: string,
  payload: SolarLeadPayload,
) {
  const normalizedNumber = whatsappE164.trim();

  if (!/^\+[1-9]\d{7,14}$/.test(normalizedNumber)) {
    throw new Error("WhatsApp number must use E.164 format.");
  }

  const waNumber = normalizedNumber.slice(1);
  return `https://wa.me/${waNumber}?text=${encodeURIComponent(
    formatSolarLeadWhatsAppMessage(payload),
  )}`;
}

export function isSolarLeadPayload(value: unknown): value is SolarLeadPayload {
  if (!value || typeof value !== "object") return false;

  const lead = value as Partial<SolarLeadPayload>;
  const hasRequiredShape =
    lead.schemaVersion === 1 &&
    lead.source === "bill-to-roof" &&
    typeof lead.name === "string" &&
    lead.name.trim().length > 0 &&
    typeof lead.phone === "string" &&
    lead.phone.trim().length > 0 &&
    typeof lead.cityOrPinCode === "string" &&
    lead.cityOrPinCode.trim().length > 0 &&
    typeof lead.averageMonthlyBillRupees === "number" &&
    Number.isFinite(lead.averageMonthlyBillRupees) &&
    lead.averageMonthlyBillRupees > 0 &&
    (lead.connectionType === "Single-phase" ||
      lead.connectionType === "Three-phase") &&
    typeof lead.selectedSystemSlug === "string" &&
    typeof lead.selectedSystemCapacity === "string" &&
    (lead.selectedModuleOption === "renew" ||
      lead.selectedModuleOption === "adaniWaaree") &&
    typeof lead.listedPackagePriceRupees === "number" &&
    lead.roofSiteAssessmentRequired === true &&
    Boolean(lead.billUpload) &&
    (lead.billUpload?.status === "not-selected" ||
      lead.billUpload?.status === "selected-in-browser") &&
    (lead.billUpload?.reference === undefined ||
      typeof lead.billUpload.reference === "string");

  if (!hasRequiredShape) return false;

  const selectedPackage = solarPackages.find(
    (solarPackage) => solarPackage.slug === lead.selectedSystemSlug,
  );

  if (!selectedPackage || !lead.selectedModuleOption) return false;

  return (
    lead.connectionType === selectedPackage.connection &&
    lead.selectedSystemCapacity === selectedPackage.capacity &&
    lead.selectedModuleLabel ===
      getSolarModuleLabel(lead.selectedModuleOption) &&
    lead.listedPackagePriceRupees ===
      getSolarPackagePrice(selectedPackage, lead.selectedModuleOption)
  );
}

export function formatRupees(value: number) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(value);
}
