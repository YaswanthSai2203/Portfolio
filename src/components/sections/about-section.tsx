"use client";

import { motion, useInView } from "framer-motion";
import * as React from "react";

import { profile } from "@/lib/data";
import { useCountUp } from "@/hooks/use-count-up";
import { useReducedMotion } from "@/hooks/use-reduced-motion";

import { Card, CardContent } from "@/components/ui/card";

const stats = [
  { key: "years", label: "Years shipping production", end: profile.yearsExperience, suffix: "+" },
  {
    key: "projects",
    label: "Products & platforms delivered",
    end: profile.projectsShipped,
    suffix: "+",
  },
  {
    key: "systems",
    label: "Major systems optimized",
    end: profile.systemsOptimized,
    suffix: "+",
  },
] as const;

export function AboutSection() {
  const reduced = useReducedMotion();
  const ref = React.useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="about" className="scroll-mt-28 border-t border-border/40 py-24">
      <div ref={ref} className="mx-auto max-w-6xl px-4 sm:px-6">
        <motion.div
          initial={reduced ? false : { opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.45 }}
          className="max-w-2xl"
        >
          <p className="text-sm font-medium uppercase tracking-widest text-primary">
            About
          </p>
          <h2 className="mt-2 font-display text-3xl font-bold tracking-tight sm:text-4xl">
            Engineering with measurable outcomes
          </h2>
          <p className="mt-4 text-muted leading-relaxed">{profile.summary}</p>
        </motion.div>

        <div className="mt-12 grid gap-4 sm:grid-cols-3">
          {stats.map((s, i) => (
            <StatCard
              key={s.key}
              label={s.label}
              end={s.end}
              suffix={s.suffix}
              inView={inView}
              reduced={reduced}
              delay={i * 0.08}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function StatCard({
  label,
  end,
  suffix,
  inView,
  reduced,
  delay,
}: {
  label: string;
  end: number;
  suffix: string;
  inView: boolean;
  reduced: boolean;
  delay: number;
}) {
  const animated = useCountUp(end, 1400, inView && !reduced);
  const display = inView ? (reduced ? end : animated) : 0;
  return (
    <motion.div
      initial={reduced ? false : { opacity: 0, y: 14 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.45, delay }}
    >
      <Card className="glass h-full overflow-hidden border-border/50">
        <CardContent className="p-6">
          <p className="font-display text-4xl font-bold tabular-nums text-foreground">
            {display}
            {suffix}
          </p>
          <p className="mt-2 text-sm text-muted">{label}</p>
        </CardContent>
      </Card>
    </motion.div>
  );
}
