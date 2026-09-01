import { ImageResponse } from "next/og";

/**
 * Statically generated OpenGraph / Twitter card image (1200x630).
 * Next.js injects `og:image` and `twitter:image` from this file convention,
 * which is what makes the `summary_large_image` card in `layout.tsx` resolve.
 */
export const alt = "Matias Acosta — Full Stack Developer & Consultor ERP / IoT";

export const size = { width: 1200, height: 630 };

export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px",
          backgroundColor: "#0A0E17",
          backgroundImage:
            "radial-gradient(circle at 15% 0%, #395CAA55 0%, transparent 55%)",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: "64px",
              height: "64px",
              borderRadius: "16px",
              backgroundColor: "#395CAA",
              color: "#ffffff",
              fontSize: "28px",
              fontWeight: 700,
            }}
          >
            MA
          </div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <span style={{ color: "#ffffff", fontSize: "30px", fontWeight: 700 }}>
              Matias Acosta
            </span>
            <span style={{ color: "#94a3b8", fontSize: "20px" }}>
              Cooperativa Tera · Rosario, Argentina
            </span>
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
          <span
            style={{
              color: "#ffffff",
              fontSize: "62px",
              fontWeight: 800,
              lineHeight: 1.15,
              letterSpacing: "-0.02em",
            }}
          >
            Full Stack Developer
            <br />
            &amp; Consultor ERP / IoT
          </span>
          <span style={{ color: "#D5DEEF", fontSize: "26px", lineHeight: 1.4 }}>
            Ecosistemas ERP (Odoo 18/19 · AFIP/ARCA) y telemetría IIoT en tiempo real.
          </span>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
          <div style={{ width: "56px", height: "4px", backgroundColor: "#395CAA" }} />
          <span style={{ color: "#64748b", fontSize: "22px" }}>acostamatt.dev</span>
        </div>
      </div>
    ),
    size,
  );
}
