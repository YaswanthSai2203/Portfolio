"use client";

import { motion, useInView } from "framer-motion";
import * as React from "react";

import { impactRows } from "@/lib/data";
import { useReducedMotion } from "@/hooks/use-reduced-motion";

export function ImpactSection() {
  const reduced = useReducedMotion();
  const ref = React.useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <section
      id="impact"
      className="scroll-mt-28 border-t border-border/40 bg-background py-24"
    >
      <div ref={ref} className="mx-auto max-w-6xl px-4 sm:px-6">
        <motion.div
          initial={reduced ? false : { opacity: 0, y: 14 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          className="max-w-2xl"
        >
          <p className="text-sm font-medium uppercase tracking-widest text-primary">
            Impact
          </p>
          <h2 className="mt-2 font-display text-3xl font-bold tracking-tight sm:text-4xl">
            Outcomes with measurement context
          </h2>
          <p className="mt-3 text-muted">
            Replace rows in <code className="text-[11px]">impactRows</code>{" "}
            with numbers you can stand behind in interviews.
          </p>
        </motion.div>

        <motion.div
          initial={reduced ? false : { opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.06 }}
          className="mt-10 overflow-x-auto rounded-2xl border border-border/50"
        >
          <table className="w-full min-w-[640px] border-collapse text-left text-sm">
            <thead>
              <tr className="border-b border-border/50 bg-card/40">
                <th className="p-3 font-display text-xs font-semibold uppercase tracking-wide text-muted">
                  Role / context
                </th>
                <th className="p-3 font-display text-xs font-semibold uppercase tracking-wide text-muted">
                  Metric
                </th>
                <th className="p-3 font-display text-xs font-semibold uppercase tracking-wide text-muted">
                  Before
                </th>
                <th className="p-3 font-display text-xs font-semibold uppercase tracking-wide text-muted">
                  After
                </th>
                <th className="p-3 font-display text-xs font-semibold uppercase tracking-wide text-muted">
                  How measured
                </th>
              </tr>
            </thead>
            <tbody>
              {impactRows.map((row, i) => (
                <tr
                  key={i}
                  className="border-b border-border/30 transition-colors hover:bg-card/20"
                >
                  <td className="p-3 font-medium text-foreground">{row.role}</td>
                  <td className="p-3 text-muted">{row.metric}</td>
                  <td className="max-w-[140px] p-3 text-muted">{row.before}</td>
                  <td className="p-3 font-medium text-accent">{row.after}</td>
                  <td className="max-w-[220px] p-3 text-xs text-muted">
                    {row.measured}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </motion.div>
      </div>
    </section>
  );
}
