"use client";

import { AnimatePresence, motion } from "framer-motion";
import * as React from "react";

function isTypingTarget(el: EventTarget | null): boolean {
  if (!el || !(el instanceof HTMLElement)) return false;
  const tag = el.tagName;
  if (tag === "INPUT" || tag === "TEXTAREA" || tag === "SELECT") return true;
  return el.isContentEditable;
}

export function BlueprintOverlay() {
  const [on, setOn] = React.useState(false);

  React.useEffect(() => {
    function onBlueprint(e: Event) {
      const ce = e as CustomEvent<{ active?: boolean }>;
      if (typeof ce.detail?.active === "boolean") {
        setOn(ce.detail.active);
      } else {
        setOn((v) => !v);
      }
    }
    window.addEventListener("portfolio-blueprint", onBlueprint);
    return () => window.removeEventListener("portfolio-blueprint", onBlueprint);
  }, []);

  React.useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key !== "g" || e.repeat) return;
      if (e.ctrlKey || e.metaKey || e.altKey) return;
      if (isTypingTarget(e.target)) return;
      e.preventDefault();
      setOn((v) => !v);
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <AnimatePresence>
      {on && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.35 }}
          className="pointer-events-none fixed inset-0 z-[5]"
          aria-hidden
        >
          <div
            className="absolute inset-0 opacity-[0.12] light:opacity-[0.08]"
            style={{
              backgroundImage: `
                linear-gradient(to right, oklch(0.72 0.19 250) 1px, transparent 1px),
                linear-gradient(to bottom, oklch(0.72 0.19 250) 1px, transparent 1px)
              `,
              backgroundSize: "56px 56px",
            }}
          />
          <div
            className="absolute inset-0 opacity-[0.06] light:opacity-[0.04]"
            style={{
              backgroundImage: `
                linear-gradient(to right, oklch(0.78 0.15 195) 1px, transparent 1px),
                linear-gradient(to bottom, oklch(0.78 0.15 195) 1px, transparent 1px)
              `,
              backgroundSize: "14px 14px",
            }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
