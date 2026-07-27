export type SolarConnection = "Single-phase" | "Three-phase";
export type SolarModuleOption = "renew" | "adaniWaaree";

export type SolarPackage = {
  slug: string;
  capacity: string;
  connection: SolarConnection;
  renewPrice: string;
  adaniWaareePrice: string;
  renewPriceValue: number;
  adaniWaareePriceValue: number;
  ctaLabel: string;
};

export const solarPackages = [
  {
    slug: "3kw-single-phase",
    capacity: "3 kW",
    connection: "Single-phase",
    renewPrice: "₹2,17,000",
    adaniWaareePrice: "₹2,35,000",
    renewPriceValue: 217000,
    adaniWaareePriceValue: 235000,
    ctaLabel: "Ask about 3 kW",
  },
  {
    slug: "5kw-single-phase",
    capacity: "5 kW",
    connection: "Single-phase",
    renewPrice: "₹3,20,000",
    adaniWaareePrice: "₹3,58,000",
    renewPriceValue: 320000,
    adaniWaareePriceValue: 358000,
    ctaLabel: "Ask about 5 kW",
  },
  {
    slug: "5kw-three-phase",
    capacity: "5 kW",
    connection: "Three-phase",
    renewPrice: "₹3,47,000",
    adaniWaareePrice: "₹3,90,000",
    renewPriceValue: 347000,
    adaniWaareePriceValue: 390000,
    ctaLabel: "Ask about 5 kW three-phase",
  },
  {
    slug: "10kw-three-phase",
    capacity: "10 kW",
    connection: "Three-phase",
    renewPrice: "₹6,35,000",
    adaniWaareePrice: "₹6,60,000",
    renewPriceValue: 635000,
    adaniWaareePriceValue: 660000,
    ctaLabel: "Ask about 10 kW",
  },
] satisfies SolarPackage[];

export function getSolarPackagePrice(
  solarPackage: SolarPackage,
  moduleOption: SolarModuleOption,
) {
  return moduleOption === "renew"
    ? solarPackage.renewPriceValue
    : solarPackage.adaniWaareePriceValue;
}

export function getSolarModuleLabel(moduleOption: SolarModuleOption) {
  return moduleOption === "renew" ? "ReNew" : "Adani or Waaree";
}
