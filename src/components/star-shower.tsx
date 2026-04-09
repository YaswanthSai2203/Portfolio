"use client";

import { AnimatePresence, motion } from "framer-motion";
import * as React from "react";

export function StarShower() {
  const [burst, setBurst] = React.useState(false);

  React.useEffect(() => {
    function onStar() {
      setBurst(true);
      window.setTimeout(() => setBurst(false), 2200);
    }
    window.addEventListener("portfolio-star", onStar);
    return () => window.removeEventListener("portfolio-star", onStar);
  }, []);

  const stars = React.useMemo(
    () =>
      Array.from({ length: 18 }, (_, i) => ({
        id: i,
        x: 8 + (i * 47) % 84,
        delay: (i % 6) * 0.06,
        rot: (i * 23) % 360,
      })),
    [],
  );

  return (
    <AnimatePresence>
      {burst && (
        <motion.div
          className="pointer-events-none fixed inset-x-0 top-0 z-[95] flex h-32 justify-center overflow-hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          aria-hidden
        >
          {stars.map((s) => (
            <motion.span
              key={s.id}
              className="absolute text-xl text-primary"
              style={{ left: `${s.x}%`, top: -8 }}
              initial={{ y: -20, opacity: 0, rotate: s.rot }}
              animate={{
                y: 140,
                opacity: [0, 1, 1, 0],
                rotate: s.rot + 180,
              }}
              transition={{
                duration: 1.8,
                delay: s.delay,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              ★
            </motion.span>
          ))}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
