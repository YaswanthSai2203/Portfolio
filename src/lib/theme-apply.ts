/** Shared theme application for URL sync + customizer (no React). */
export const STORAGE_HUE = "portfolio-hue-primary";
export const STORAGE_DENSITY = "portfolio-density";

export function applyHues(primary: number, accent: number) {
  document.documentElement.style.setProperty("--hue-primary", String(primary));
  document.documentElement.style.setProperty("--hue-accent", String(accent));
}

export function applyDensity(d: "cozy" | "compact") {
  if (d === "compact") {
    document.documentElement.setAttribute("data-density", "compact");
  } else {
    document.documentElement.removeAttribute("data-density");
  }
}

export function persistHuesLocal(primary: number, accent: number) {
  localStorage.setItem(
    STORAGE_HUE,
    JSON.stringify({ primary, accent }),
  );
}

export function persistDensityLocal(d: "cozy" | "compact") {
  localStorage.setItem(STORAGE_DENSITY, d);
}
