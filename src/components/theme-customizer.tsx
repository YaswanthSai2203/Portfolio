"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Palette, X } from "lucide-react";
import * as React from "react";

import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

const STORAGE_HUE = "portfolio-hue-primary";
const STORAGE_DENSITY = "portfolio-density";

const PRESETS = [
  { label: "Indigo", primary: 250, accent: 195 },
  { label: "Violet", primary: 280, accent: 210 },
  { label: "Teal", primary: 195, accent: 165 },
  { label: "Amber", primary: 75, accent: 45 },
] as const;

function applyHues(primary: number, accent: number) {
  document.documentElement.style.setProperty("--hue-primary", String(primary));
  document.documentElement.style.setProperty("--hue-accent", String(accent));
}

function persistBoth(primary: number, accent: number, setHue: (n: number) => void) {
  setHue(primary);
  applyHues(primary, accent);
  localStorage.setItem(STORAGE_HUE, JSON.stringify({ primary, accent }));
}

function applyDensity(d: "cozy" | "compact") {
  if (d === "compact") {
    document.documentElement.setAttribute("data-density", "compact");
  } else {
    document.documentElement.removeAttribute("data-density");
  }
}

export function ThemeCustomizer() {
  const [open, setOpen] = React.useState(false);
  const [hue, setHue] = React.useState(250);
  const [density, setDensity] = React.useState<"cozy" | "compact">("cozy");

  React.useEffect(() => {
    const raw = localStorage.getItem(STORAGE_HUE);
    const d = localStorage.getItem(STORAGE_DENSITY) as "cozy" | "compact" | null;
    if (raw) {
      try {
        const parsed = JSON.parse(raw) as { primary: number; accent: number };
        if (
          typeof parsed.primary === "number" &&
          typeof parsed.accent === "number"
        ) {
          setHue(parsed.primary);
          applyHues(parsed.primary, parsed.accent);
        }
      } catch {
        const n = Number(raw);
        if (!Number.isNaN(n)) {
          setHue(n);
          applyHues(n, (n + 45) % 360);
        }
      }
    }
    if (d === "compact" || d === "cozy") {
      setDensity(d);
      applyDensity(d);
    }
  }, []);

  function persistHues(next: number) {
    const acc = (next + 45) % 360;
    persistBoth(next, acc, setHue);
  }

  function persistPreset(primary: number, accent: number) {
    persistBoth(primary, accent, setHue);
  }

  function persistDensity(next: "cozy" | "compact") {
    setDensity(next);
    applyDensity(next);
    localStorage.setItem(STORAGE_DENSITY, next);
  }

  return (
    <div className="fixed bottom-6 right-4 z-[60] sm:right-6">
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 12, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.96 }}
            transition={{ duration: 0.2 }}
            className="mb-3 w-[min(calc(100vw-2rem),320px)] rounded-2xl border border-border/60 bg-card/95 p-4 shadow-2xl backdrop-blur-xl"
          >
            <div className="mb-3 flex items-center justify-between">
              <p className="font-display text-sm font-semibold">Theme lab</p>
              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="h-8 w-8"
                onClick={() => setOpen(false)}
                aria-label="Close theme panel"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
            <p className="mb-3 text-xs text-muted">
              Accent hues use CSS variables; density tweaks base font size.
            </p>
            <div className="space-y-3">
              <div>
                <Label className="text-xs text-muted">Presets</Label>
                <div className="mt-2 flex flex-wrap gap-2">
                  {PRESETS.map((p) => (
                    <Button
                      key={p.label}
                      type="button"
                      size="sm"
                      variant="secondary"
                      className="text-xs"
                      onClick={() => persistPreset(p.primary, p.accent)}
                    >
                      {p.label}
                    </Button>
                  ))}
                </div>
              </div>
              <div>
                <Label htmlFor="hue-slider" className="text-xs text-muted">
                  Primary hue ({hue}°)
                </Label>
                <input
                  id="hue-slider"
                  type="range"
                  min={0}
                  max={360}
                  value={hue}
                  onChange={(e) => persistHues(Number(e.target.value))}
                  className="mt-2 w-full accent-primary"
                />
              </div>
              <div>
                <Label className="text-xs text-muted">Density</Label>
                <div className="mt-2 flex gap-2">
                  <Button
                    type="button"
                    size="sm"
                    variant={density === "cozy" ? "default" : "secondary"}
                    onClick={() => persistDensity("cozy")}
                  >
                    Cozy
                  </Button>
                  <Button
                    type="button"
                    size="sm"
                    variant={density === "compact" ? "default" : "secondary"}
                    onClick={() => persistDensity("compact")}
                  >
                    Compact
                  </Button>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      <Button
        type="button"
        size="icon"
        className="h-12 w-12 rounded-full border border-border/60 shadow-lg"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        aria-label="Open theme customizer"
      >
        <Palette className="h-5 w-5" />
      </Button>
    </div>
  );
}
