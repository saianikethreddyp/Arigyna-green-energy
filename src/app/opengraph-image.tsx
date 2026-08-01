import { ImageResponse } from "next/og";

export const alt = "Arignya Green Energy";

export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          alignItems: "center",
          background: "#f7f5ef",
          color: "#10251d",
          display: "flex",
          fontFamily: "sans-serif",
          height: "100%",
          justifyContent: "center",
          padding: "88px",
          position: "relative",
          width: "100%",
        }}
      >
        <div
          style={{
            background: "#1769ff",
            borderRadius: "999px",
            height: "460px",
            opacity: 0.12,
            position: "absolute",
            right: "-120px",
            top: "-180px",
            width: "460px",
          }}
        />
        <div style={{ display: "flex", flexDirection: "column", maxWidth: "900px" }}>
          <div style={{ color: "#319346", fontSize: 34, fontWeight: 700, letterSpacing: 1.5 }}>
            ARIGNYA GREEN ENERGY
          </div>
          <div style={{ fontSize: 78, fontWeight: 700, letterSpacing: -3, lineHeight: 1.05, marginTop: 30 }}>
            Residential rooftop solar in Andhra Pradesh and Telangana
          </div>
        </div>
      </div>
    ),
    size,
  );
}
