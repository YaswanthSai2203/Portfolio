"use client";

export function syncThemeSearchParams(updates: {
  hue?: number;
  accent?: number;
  density?: "cozy" | "compact";
}) {
  if (typeof window === "undefined") return;
  const url = new URL(window.location.href);
  if (updates.hue !== undefined) {
    url.searchParams.set("hue", String(Math.round(updates.hue)));
  }
  if (updates.accent !== undefined) {
    url.searchParams.set("accent", String(Math.round(updates.accent)));
  }
  if (updates.density !== undefined) {
    url.searchParams.set("density", updates.density);
  }
  window.history.replaceState(null, "", url.pathname + url.search + url.hash);
}
