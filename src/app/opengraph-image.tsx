import { ImageResponse } from "next/og";

import { profile } from "@/lib/data";

export const alt = `${profile.name} — ${profile.title}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          justifyContent: "center",
          background: "linear-gradient(135deg, #0f172a 0%, #1e1b4b 45%, #0c4a6e 100%)",
          padding: 72,
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 16,
            maxWidth: 900,
          }}
        >
          <span
            style={{
              fontSize: 28,
              fontWeight: 600,
              color: "#7dd3fc",
              letterSpacing: "0.08em",
              textTransform: "uppercase" as const,
            }}
          >
            Portfolio
          </span>
          <span
            style={{
              fontSize: 64,
              fontWeight: 700,
              color: "#f8fafc",
              lineHeight: 1.1,
            }}
          >
            {profile.name}
          </span>
          <span
            style={{
              fontSize: 36,
              fontWeight: 500,
              color: "#94a3b8",
              lineHeight: 1.3,
            }}
          >
            {profile.title}
          </span>
          <span
            style={{
              marginTop: 24,
              fontSize: 24,
              color: "#cbd5e1",
              lineHeight: 1.4,
            }}
          >
            .NET · React · Azure · Microservices · AI systems
          </span>
        </div>
      </div>
    ),
    { ...size },
  );
}
