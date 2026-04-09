"use client";

import { motion, useInView } from "framer-motion";
import * as React from "react";

import { aiHighlights } from "@/lib/data";
import { useReducedMotion } from "@/hooks/use-reduced-motion";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function AISection() {
  const reduced = useReducedMotion();
  const ref = React.useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      id="ai"
      className="scroll-mt-28 border-t border-border/40 py-24"
    >
      <div
        ref={ref}
        className="relative mx-auto max-w-6xl overflow-hidden rounded-3xl border border-primary/25 bg-gradient-to-br from-primary/12 via-background to-accent/12 px-4 py-16 shadow-[0_0_80px_-20px_oklch(0.72_0.19_250/0.35),0_0_60px_-24px_oklch(0.78_0.15_195/0.2)] sm:px-8"
      >
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -left-20 top-10 h-64 w-64 rounded-full bg-primary/30 blur-3xl animate-pulse-glow" />
          <div className="absolute -right-16 bottom-0 h-56 w-56 rounded-full bg-accent/25 blur-3xl animate-pulse-glow [animation-delay:1.5s]" />
          <div className="absolute left-1/2 top-1/2 h-96 w-96 -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/10 blur-[100px]" />
        </div>

        <NodeBackdrop reduced={reduced} active={inView} />

        <motion.div
          initial={reduced ? false : { opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          className="relative z-10 max-w-2xl"
        >
          <p className="text-sm font-medium uppercase tracking-widest text-accent">
            AI & innovation
          </p>
          <h2 className="mt-2 font-display text-3xl font-bold tracking-tight sm:text-4xl">
            Production-grade intelligence, not demos
          </h2>
          <p className="mt-4 text-muted">
            From retrieval pipelines to OCR normalization, I focus on
            evaluable systems: tracing, guardrails, and cost-aware inference in
            real workflows.
          </p>
        </motion.div>

        <div className="relative z-10 mt-12 grid gap-4 md:grid-cols-3">
          {aiHighlights.map((item, i) => (
            <motion.div
              key={item.title}
              initial={reduced ? false : { opacity: 0, y: 18 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.1 + i * 0.08, duration: 0.45 }}
            >
              <Card className="glass h-full border-primary/25 shadow-[0_0_48px_-8px_oklch(0.72_0.19_250/0.15)] transition-all duration-300 hover:-translate-y-1 hover:border-primary/40 hover:shadow-[0_0_56px_-6px_oklch(0.72_0.19_250/0.22)]">
                <CardHeader>
                  <CardTitle className="text-base font-semibold text-foreground">
                    {item.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted leading-relaxed">
                    {item.description}
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function NodeBackdrop({
  reduced,
  active,
}: {
  reduced: boolean;
  active: boolean;
}) {
  const nodes = React.useMemo(
    () => [
      { x: "12%", y: "22%", sx: 12, sy: 22, delay: 0 },
      { x: "42%", y: "18%", sx: 42, sy: 18, delay: 0.2 },
      { x: "78%", y: "28%", sx: 78, sy: 28, delay: 0.4 },
      { x: "22%", y: "62%", sx: 22, sy: 62, delay: 0.15 },
      { x: "58%", y: "58%", sx: 58, sy: 58, delay: 0.35 },
      { x: "88%", y: "70%", sx: 88, sy: 70, delay: 0.5 },
    ],
    [],
  );

  if (reduced) return null;

  return (
    <div className="pointer-events-none absolute inset-0 z-0" aria-hidden>
      <svg
        className="h-full w-full opacity-50"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
      >
        <defs>
          <linearGradient id="aiLine" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="oklch(0.72 0.19 250 / 0)" />
            <stop offset="50%" stopColor="oklch(0.72 0.19 250 / 0.45)" />
            <stop offset="100%" stopColor="oklch(0.78 0.15 195 / 0)" />
          </linearGradient>
        </defs>
        {nodes.slice(0, -1).map((n, i) => {
          const t = nodes[i + 1];
          const d = `M ${n.sx} ${n.sy} L ${t.sx} ${t.sy}`;
          return (
            <motion.path
              key={`${i}-line`}
              d={d}
              fill="none"
              stroke="url(#aiLine)"
              strokeWidth={0.35}
              initial={{ pathLength: 0, opacity: 0 }}
              animate={
                active
                  ? { pathLength: 1, opacity: 0.7 }
                  : { pathLength: 0, opacity: 0 }
              }
              transition={{ duration: 1.2, delay: n.delay, ease: "easeOut" }}
            />
          );
        })}
      </svg>
      {nodes.map((n) => (
        <motion.span
          key={`${n.x}-${n.y}`}
          className="absolute h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent shadow-[0_0_20px_oklch(0.78_0.15_195/0.9)]"
          style={{ left: n.x, top: n.y }}
          animate={
            active
              ? { scale: [1, 1.25, 1], opacity: [0.5, 1, 0.5] }
              : { scale: 1, opacity: 0.3 }
          }
          transition={{
            duration: 3.5,
            repeat: Infinity,
            ease: "easeInOut",
            delay: n.delay,
          }}
        />
      ))}
    </div>
  );
}
