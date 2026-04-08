"use client";

import { AnimatePresence, motion, useInView } from "framer-motion";
import { ChevronDown } from "lucide-react";
import * as React from "react";

import { experiences } from "@/lib/data";
import { useReducedMotion } from "@/hooks/use-reduced-motion";

import { Card, CardContent } from "@/components/ui/card";

export function ExperienceSection() {
  const reduced = useReducedMotion();
  const ref = React.useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [openId, setOpenId] = React.useState<string | null>("rj");

  return (
    <section
      id="experience"
      className="scroll-mt-28 border-t border-border/40 py-24"
    >
      <div ref={ref} className="mx-auto max-w-6xl px-4 sm:px-6">
        <motion.div
          initial={reduced ? false : { opacity: 0, y: 14 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
        >
          <p className="text-sm font-medium uppercase tracking-widest text-primary">
            Experience
          </p>
          <h2 className="mt-2 font-display text-3xl font-bold tracking-tight sm:text-4xl">
            Timeline of ownership
          </h2>
          <p className="mt-3 max-w-2xl text-muted">
            Interactive vertical timeline with Raymond James as the current
            focus and Wipro as the foundation years.
          </p>
        </motion.div>

        <div className="relative mt-14">
          <div
            className="absolute left-[11px] top-3 bottom-3 w-px bg-gradient-to-b from-primary/60 via-border to-transparent sm:left-[15px]"
            aria-hidden
          />
          <ul className="space-y-6">
            {experiences.map((job, index) => {
              const expanded = openId === job.id;
              return (
                <motion.li
                  key={job.id}
                  initial={reduced ? false : { opacity: 0, x: -12 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: index * 0.08, duration: 0.45 }}
                  className="relative pl-10 sm:pl-12"
                >
                  <span
                    className="absolute left-1.5 top-5 flex h-3 w-3 items-center justify-center sm:left-2.5"
                    aria-hidden
                  >
                    <span
                      className={`absolute h-3 w-3 rounded-full ${
                        job.current
                          ? "bg-primary shadow-[0_0_12px_oklch(0.72_0.19_250/0.7)]"
                          : "bg-border"
                      }`}
                    />
                  </span>
                  <Card
                    className={`glass overflow-hidden border-border/50 transition-shadow hover:shadow-lg hover:shadow-primary/5 ${
                      job.current ? "ring-1 ring-primary/25" : ""
                    }`}
                  >
                    <button
                      type="button"
                      onClick={() => setOpenId(expanded ? null : job.id)}
                      className="flex w-full flex-col gap-1 p-6 text-left sm:flex-row sm:items-start sm:justify-between"
                      aria-expanded={expanded}
                    >
                      <div>
                        <div className="flex flex-wrap items-center gap-2">
                          <h3 className="font-display text-lg font-semibold">
                            {job.company}
                          </h3>
                          {job.current && (
                            <span className="rounded-full bg-primary/15 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-primary">
                              Current
                            </span>
                          )}
                        </div>
                        <p className="text-sm text-muted">{job.role}</p>
                        <p className="mt-2 text-sm text-foreground/90">
                          {job.summary}
                        </p>
                      </div>
                      <div className="flex shrink-0 items-center gap-2 sm:flex-col sm:items-end">
                        <span className="text-xs font-medium uppercase tracking-wide text-muted">
                          {job.period}
                        </span>
                        <motion.span
                          animate={{ rotate: expanded ? 180 : 0 }}
                          transition={{ duration: 0.25 }}
                          className="inline-flex rounded-lg border border-border/60 p-1 text-muted"
                        >
                          <ChevronDown className="h-4 w-4" aria-hidden />
                        </motion.span>
                      </div>
                    </button>
                    <AnimatePresence initial={false}>
                      {expanded && (
                        <motion.div
                          initial={reduced ? false : { height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={reduced ? undefined : { height: 0, opacity: 0 }}
                          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                        >
                          <CardContent className="border-t border-border/40 px-6 pb-6 pt-0">
                            <div className="pt-6">
                              <p className="text-xs font-semibold uppercase tracking-widest text-muted">
                                Key achievements
                              </p>
                              <ul className="mt-3 space-y-2 text-sm text-foreground/90">
                                {job.achievements.map((a) => (
                                  <li key={a} className="flex gap-2">
                                    <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-accent" />
                                    <span>{a}</span>
                                  </li>
                                ))}
                              </ul>
                              <p className="mt-6 text-xs font-semibold uppercase tracking-widest text-muted">
                                Technologies
                              </p>
                              <div className="mt-3 flex flex-wrap gap-2">
                                {job.tech.map((t) => (
                                  <span
                                    key={t}
                                    className="rounded-full border border-border/60 bg-background/40 px-3 py-1 text-xs text-muted"
                                  >
                                    {t}
                                  </span>
                                ))}
                              </div>
                            </div>
                          </CardContent>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </Card>
                </motion.li>
              );
            })}
          </ul>
        </div>
      </div>
    </section>
  );
}
