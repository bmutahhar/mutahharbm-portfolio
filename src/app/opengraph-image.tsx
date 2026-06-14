import { ImageResponse } from "next/og";

export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

const NAME = "Mutahhar Bin Muzaffar";
const TITLE = "Full Stack Engineer · React Flow Expert";
const SIGNAL = "#d9f24f";
const INK = "#f0f2e6";
const MUTED = "rgba(240,242,230,0.55)";
const SURFACE = "rgba(255,255,255,0.04)";
const BORDER = "rgba(240,242,230,0.18)";

const PIPELINE = ["profile", "experience", "work", "impact"];

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 72,
          background:
            "radial-gradient(circle at 1px 1px, rgba(240,242,230,0.14) 1px, transparent 0), linear-gradient(135deg, #131410 0%, #181a14 100%)",
          backgroundSize: "28px 28px, 100% 100%",
          color: INK,
          fontFamily: "system-ui, sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 14,
            fontSize: 22,
            letterSpacing: "0.24em",
            textTransform: "uppercase",
            color: MUTED,
          }}
        >
          <div
            style={{
              display: "flex",
              width: 12,
              height: 12,
              borderRadius: 999,
              background: SIGNAL,
            }}
          />
          portfolio / signal graph
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
          <div
            style={{
              display: "flex",
              fontSize: 84,
              lineHeight: 1.02,
              fontWeight: 800,
              letterSpacing: "-0.02em",
              maxWidth: 1000,
            }}
          >
            {NAME}
          </div>
          <div style={{ display: "flex", fontSize: 34, fontWeight: 500, color: SIGNAL }}>
            {TITLE}
          </div>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: 0 }}>
          {PIPELINE.map((label, index) => (
            <div key={label} style={{ display: "flex", alignItems: "center" }}>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 12,
                  padding: "16px 26px",
                  borderRadius: 14,
                  border: `1.5px solid ${index === PIPELINE.length - 1 ? SIGNAL : BORDER}`,
                  background: SURFACE,
                  fontSize: 24,
                  letterSpacing: "0.08em",
                  color: index === PIPELINE.length - 1 ? SIGNAL : INK,
                }}
              >
                <div
                  style={{
                    display: "flex",
                    width: 9,
                    height: 9,
                    borderRadius: 999,
                    border: `1.5px solid ${SIGNAL}`,
                    background: "transparent",
                  }}
                />
                {label}
              </div>
              {index < PIPELINE.length - 1 ? (
                <div
                  style={{
                    display: "flex",
                    width: 56,
                    height: 2,
                    background: `linear-gradient(90deg, ${BORDER}, ${SIGNAL})`,
                  }}
                />
              ) : null}
            </div>
          ))}
        </div>
      </div>
    ),
    size,
  );
}
