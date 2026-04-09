"use client";

import dynamic from "next/dynamic";
import { motion, useScroll, useSpring } from "framer-motion";
import * as React from "react";

import { useReducedMotion } from "@/hooks/use-reduced-motion";

const PortfolioSceneCanvas = dynamic(
  () =>
    import("@/components/scene/portfolio-scene").then((m) => ({
      default: m.PortfolioSceneCanvas,
    })),
  { ssr: false, loading: () => null },
);

export function PortfolioShell({ children }: { children: React.ReactNode }) {
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll();
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 80,
    damping: 28,
    restDelta: 0.001,
  });

  return (
    <>
      {!reduced && <PortfolioSceneCanvas />}
      {!reduced && (
        <div
          className="pointer-events-none fixed inset-0 z-0 bg-background/72 backdrop-blur-[2px]"
          aria-hidden
        />
      )}
      {!reduced && (
        <motion.div
          className="pointer-events-none fixed left-0 right-0 top-0 z-[35] h-[3px] origin-left bg-gradient-to-r from-primary via-accent to-primary"
          style={{ scaleX: smoothProgress }}
          aria-hidden
        />
      )}
      <div className="relative z-[1]">{children}</div>
    </>
  );
}
