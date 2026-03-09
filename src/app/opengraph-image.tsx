import { ImageResponse } from "next/og";

export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

const NAME = "Mutahhar Bin Muzaffar";
const TITLE = "Frontend Engineer & React Flow Expert";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          background:
            "radial-gradient(circle at 12% 18%, rgba(110,158,117,0.35), rgba(10,12,10,0) 38%), radial-gradient(circle at 88% 80%, rgba(110,158,117,0.22), rgba(10,12,10,0) 42%), linear-gradient(120deg, #0a0c0a 0%, #0d140f 50%, #0a0c0a 100%)",
          color: "#f1f5f2",
          fontFamily: "Inter, system-ui, sans-serif",
          boxSizing: "border-box",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            width: "100%",
            height: "100%",
            background:
              "linear-gradient(120deg, rgba(110,158,117,0.14), rgba(110,158,117,0.04) 40%, rgba(110,158,117,0.12))",
            display: "flex",
            alignItems: "center",
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 24,
              padding: "76px",
              width: "100%",
            }}
          >
            <div
              style={{
                display: "flex",
                fontSize: 20,
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                color: "rgba(241,245,242,0.72)",
              }}
            >
              Portfolio
            </div>

            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: 12,
              }}
            >
              <div
                style={{
                  display: "flex",
                  fontSize: 78,
                  lineHeight: 1.05,
                  fontWeight: 800,
                  maxWidth: 1020,
                }}
              >
                {NAME}
              </div>
              <div
                style={{
                  display: "flex",
                  fontSize: 38,
                  lineHeight: 1.2,
                  fontWeight: 600,
                  color: "rgb(110,158,117)",
                }}
              >
                {TITLE}
              </div>
            </div>
          </div>
        </div>
      </div>
    ),
    size,
  );
}
