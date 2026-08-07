import { absoluteUrl } from "@/lib/site";

const businessName = "Arignya Green Energy Private Limited";

export default function OrganizationJsonLd() {
  const url = absoluteUrl();
  const organizationId = url ? `${url}#organization` : undefined;

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": ["ProfessionalService", "LocalBusiness"],
        ...(organizationId ? { "@id": organizationId } : {}),
        name: businessName,
        legalName: businessName,
        ...(url ? { url } : {}),
        ...(url ? { logo: absoluteUrl("/arignya-logo-client.png") } : {}),
        image: absoluteUrl("/concepts/home-hero-human-v2.png"),
        description:
          "Residential rooftop solar design, installation, net-metering coordination and subsidy assistance in Hyderabad, Telangana and Andhra Pradesh.",
        serviceType: [
          "Residential rooftop solar installation",
          "Solar system design",
          "Net-metering coordination",
          "Solar subsidy assistance",
        ],
        telephone: "+91 90630 92424",
        email: "arignyagreenenergies@gmail.com",
        address: {
          "@type": "PostalAddress",
          streetAddress:
            "Flat No. 204, Dwellings Apartment, Door No. 1-98/9/D/48, Madhapur, Shaikpet",
          addressLocality: "Hyderabad",
          addressRegion: "Telangana",
          postalCode: "500081",
          addressCountry: "IN",
        },
        areaServed: [
          { "@type": "City", name: "Hyderabad" },
          { "@type": "AdministrativeArea", name: "Andhra Pradesh" },
          { "@type": "AdministrativeArea", name: "Telangana" },
        ],
        contactPoint: {
          "@type": "ContactPoint",
          telephone: "+91 90630 92424",
          contactType: "sales",
          areaServed: ["IN-AP", "IN-TG"],
          availableLanguage: ["en"],
        },
      },
      ...(url
        ? [
            {
              "@type": "WebSite",
              "@id": `${url}#website`,
              url,
              name: "Arignya",
              inLanguage: "en-IN",
              publisher: { "@id": organizationId },
            },
          ]
        : []),
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
      }}
    />
  );
}
