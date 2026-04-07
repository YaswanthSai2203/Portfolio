"use client";

import { motion, useInView } from "framer-motion";
import * as React from "react";

import { skillCategories } from "@/lib/data";
import { useReducedMotion } from "@/hooks/use-reduced-motion";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function SkillsSection() {
  const reduced = useReducedMotion();
  const ref = React.useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  const radar = React.useMemo(() => {
    const backend = skillCategories.find((c) => c.name === "Backend")?.items ?? [];
    const frontend =
      skillCategories.find((c) => c.name === "Frontend")?.items ?? [];
    const cloud =
      skillCategories.find((c) => c.name === "Cloud & DevOps")?.items ?? [];
    const avg = (items: { level: number }[]) =>
      items.length
        ? Math.round(items.reduce((a, b) => a + b.level, 0) / items.length)
        : 0;
    return [
      { label: "Backend", value: avg(backend) },
      { label: "Frontend", value: avg(frontend) },
      { label: "Cloud", value: avg(cloud) },
      { label: "Data", value: 84 },
      { label: "AI", value: 80 },
    ];
  }, []);

  const size = 220;
  const cx = size / 2;
  const cy = size / 2;
  const maxR = size * 0.38;
  const points = radar.length;
  const angleStep = (Math.PI * 2) / points;

  const polygonPoints = radar
    .map((axis, i) => {
      const r = (axis.value / 100) * maxR;
      const a = -Math.PI / 2 + i * angleStep;
      const x = cx + r * Math.cos(a);
      const y = cy + r * Math.sin(a);
      return `${x},${y}`;
    })
    .join(" ");

  const ringPoints = Array.from({ length: points }, (_, i) => {
    const a = -Math.PI / 2 + i * angleStep;
    const x = cx + maxR * Math.cos(a);
    const y = cy + maxR * Math.sin(a);
    return `${x},${y}`;
  }).join(" ");

  return (
    <section
      id="skills"
      className="scroll-mt-28 border-t border-border/40 bg-background py-24"
    >
      <div ref={ref} className="mx-auto max-w-6xl px-4 sm:px-6">
        <motion.div
          initial={reduced ? false : { opacity: 0, y: 14 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between"
        >
          <div>
            <p className="text-sm font-medium uppercase tracking-widest text-primary">
              Skills
            </p>
            <h2 className="mt-2 font-display text-3xl font-bold tracking-tight sm:text-4xl">
              Depth across the full stack
            </h2>
            <p className="mt-3 max-w-xl text-muted">
              Categorized proficiency with interactive cards and a compact
              competency radar for quick scanning.
            </p>
          </div>
        </motion.div>

        <div className="mt-14 grid gap-8 lg:grid-cols-[minmax(0,1fr)_320px]">
          <div className="grid gap-4 sm:grid-cols-2">
            {skillCategories.map((cat, i) => (
              <motion.div
                key={cat.name}
                initial={reduced ? false : { opacity: 0, y: 18 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: i * 0.05, duration: 0.45 }}
              >
                <Card className="glass group h-full border-border/50 transition-transform hover:-translate-y-0.5">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-base">{cat.name}</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {cat.items.map((item) => (
                      <div key={item.name}>
                        <div className="flex justify-between text-xs">
                          <span className="text-foreground">{item.name}</span>
                          <span className="tabular-nums text-muted">
                            {item.level}%
                          </span>
                        </div>
                        <div className="mt-1.5 h-2 overflow-hidden rounded-full bg-background/80 neu-inset">
                          <motion.div
                            className="h-full rounded-full bg-gradient-to-r from-primary to-accent"
                            initial={{ width: 0 }}
                            animate={
                              inView
                                ? { width: `${item.level}%` }
                                : { width: 0 }
                            }
                            transition={{
                              duration: reduced ? 0 : 0.9,
                              delay: reduced ? 0 : 0.15 + i * 0.04,
                              ease: [0.22, 1, 0.36, 1],
                            }}
                          />
                        </div>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={reduced ? false : { opacity: 0, scale: 0.97 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.5 }}
            className="glass flex flex-col items-center justify-center rounded-3xl border-border/50 p-8 neu-inset"
          >
            <p className="mb-4 text-center text-xs font-medium uppercase tracking-widest text-muted">
              Competency radar
            </p>
            <svg
              width={size}
              height={size}
              viewBox={`0 0 ${size} ${size}`}
              className="text-border"
              role="img"
              aria-label="Radar chart summarizing backend, frontend, cloud, data, and AI competency"
            >
              <polygon
                points={ringPoints}
                fill="none"
                stroke="currentColor"
                strokeOpacity={0.35}
              />
              {[0.33, 0.66, 1].map((t) => (
                <polygon
                  key={t}
                  points={Array.from({ length: points }, (_, i) => {
                    const a = -Math.PI / 2 + i * angleStep;
                    const r = maxR * t;
                    const x = cx + r * Math.cos(a);
                    const y = cy + r * Math.sin(a);
                    return `${x},${y}`;
                  }).join(" ")}
                  fill="none"
                  stroke="currentColor"
                  strokeOpacity={0.12}
                />
              ))}
              <motion.polygon
                points={polygonPoints}
                fill="url(#skillGrad)"
                fillOpacity={0.35}
                stroke="currentColor"
                className="text-primary"
                strokeWidth={1.5}
                initial={false}
                animate={
                  inView
                    ? { fillOpacity: 0.4, strokeOpacity: 1 }
                    : { fillOpacity: 0, strokeOpacity: 0 }
                }
                transition={{ duration: reduced ? 0 : 0.6 }}
              />
              <defs>
                <linearGradient id="skillGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="oklch(0.72 0.19 250)" />
                  <stop offset="100%" stopColor="oklch(0.78 0.15 195)" />
                </linearGradient>
              </defs>
              {radar.map((axis, i) => {
                const a = -Math.PI / 2 + i * angleStep;
                const lx = cx + (maxR + 18) * Math.cos(a);
                const ly = cy + (maxR + 18) * Math.sin(a);
                return (
                  <text
                    key={axis.label}
                    x={lx}
                    y={ly}
                    textAnchor="middle"
                    dominantBaseline="middle"
                    className="fill-muted text-[9px] font-medium uppercase tracking-wide"
                  >
                    {axis.label}
                  </text>
                );
              })}
            </svg>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
