"use client";

import * as React from "react";

import { profile } from "@/lib/data";

export function ContactMailtoQr() {
  const [src, setSrc] = React.useState<string | null>(null);

  React.useEffect(() => {
    let cancelled = false;
    const mailto = `mailto:${profile.email}`;
    void import("qrcode").then((QR) => {
      QR.default
        .toDataURL(mailto, {
          margin: 1,
          width: 112,
          color: { dark: "#6366f1", light: "#0f172a" },
        })
        .then((dataUrl) => {
          if (!cancelled) setSrc(dataUrl);
        })
        .catch(() => {});
    });
    return () => {
      cancelled = true;
    };
  }, []);

  if (!src) {
    return (
      <div className="h-[112px] w-[112px] shrink-0 animate-pulse rounded-lg bg-border/30" />
    );
  }

  return (
    <div className="shrink-0 rounded-lg border border-border/50 bg-background/40 p-2">
      {/* data: URL from qrcode — not suitable for next/image */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={src} alt="" width={112} height={112} className="rounded" />
      <p className="mt-1 text-center text-[9px] text-muted">Scan → mail</p>
    </div>
  );
}
