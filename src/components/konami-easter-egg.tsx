"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Sparkles } from "lucide-react";
import * as React from "react";

const SEQ = [
  "ArrowUp",
  "ArrowUp",
  "ArrowDown",
  "ArrowDown",
  "ArrowLeft",
  "ArrowRight",
  "ArrowLeft",
  "ArrowRight",
  "b",
  "a",
] as const;

export function KonamiEasterEgg() {
  const idxRef = React.useRef(0);
  const [show, setShow] = React.useState(false);

  React.useEffect(() => {
    function onKey(e: KeyboardEvent) {
      const t = e.target as HTMLElement | null;
      if (
        t &&
        (t.tagName === "INPUT" ||
          t.tagName === "TEXTAREA" ||
          t.isContentEditable)
      ) {
        return;
      }
      const key = e.key.length === 1 ? e.key.toLowerCase() : e.key;
      const expected = SEQ[idxRef.current];
      const match =
        expected === "b" || expected === "a"
          ? key === expected
          : key === expected;

      if (match) {
        idxRef.current += 1;
        if (idxRef.current >= SEQ.length) {
          idxRef.current = 0;
          setShow(true);
          window.setTimeout(() => setShow(false), 4500);
        }
      } else {
        idxRef.current = key === SEQ[0] ? 1 : 0;
      }
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95 }}
          className="pointer-events-none fixed inset-x-4 bottom-24 z-[95] mx-auto max-w-sm rounded-2xl border border-primary/40 bg-card/95 p-4 text-center shadow-2xl backdrop-blur-xl sm:inset-x-auto sm:left-1/2 sm:-translate-x-1/2"
          role="status"
        >
          <Sparkles className="mx-auto h-8 w-8 text-primary" />
          <p className="mt-2 font-display text-lg font-semibold">
            Full stack mode unlocked
          </p>
          <p className="mt-1 text-sm text-muted">
            You found the classic code. Now go ship something reliable.
          </p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
