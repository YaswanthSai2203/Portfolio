"use client";

import { motion, useInView } from "framer-motion";
import { Layers } from "lucide-react";
import * as React from "react";

import { projects } from "@/lib/data";
import { useReducedMotion } from "@/hooks/use-reduced-motion";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function ProjectsSection() {
  const reduced = useReducedMotion();
  const ref = React.useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <section
      id="projects"
      className="scroll-mt-28 border-t border-border/40 bg-background py-24"
    >
      <div ref={ref} className="mx-auto max-w-6xl px-4 sm:px-6">
        <motion.div
          initial={reduced ? false : { opacity: 0, y: 14 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
        >
          <p className="text-sm font-medium uppercase tracking-widest text-primary">
            Projects
          </p>
          <h2 className="mt-2 font-display text-3xl font-bold tracking-tight sm:text-4xl">
            Selected work that ships
          </h2>
          <p className="mt-3 max-w-2xl text-muted">
            Rich cards with stack badges, outcomes, and a detail modal for
            deeper narrative—built for recruiter skim speed.
          </p>
        </motion.div>

        <div className="mt-14 grid gap-6 lg:grid-cols-3">
          {projects.map((project, i) => (
            <motion.div
              key={project.id}
              initial={reduced ? false : { opacity: 0, y: 22 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.07, duration: 0.45 }}
            >
              <Card className="glass group flex h-full flex-col border-border/50 transition-all hover:-translate-y-1 hover:border-primary/30 hover:shadow-xl hover:shadow-primary/10">
                <CardHeader>
                  <CardTitle className="text-lg leading-snug">
                    {project.title}
                  </CardTitle>
                  <p className="text-sm text-muted">{project.tagline}</p>
                  <div className="flex flex-wrap gap-1.5 pt-2">
                    {project.stack.map((s) => (
                      <span
                        key={s}
                        className="rounded-md bg-primary/10 px-2 py-0.5 text-[11px] font-medium text-primary"
                      >
                        {s}
                      </span>
                    ))}
                  </div>
                </CardHeader>
                <CardContent className="mt-auto flex flex-1 flex-col gap-4">
                  <ul className="space-y-2 text-sm text-foreground/90">
                    {project.features.map((f) => (
                      <li key={f} className="flex gap-2">
                        <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-accent" />
                        <span>{f}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="grid grid-cols-3 gap-2 border-t border-border/40 pt-4">
                    {project.metrics.map((m) => (
                      <div
                        key={m.label}
                        className="rounded-lg border border-border/40 bg-background/30 p-2 text-center"
                      >
                        <p className="font-display text-sm font-bold text-foreground">
                          {m.value}
                        </p>
                        <p className="text-[10px] font-medium uppercase tracking-wide text-muted">
                          {m.label}
                        </p>
                        <p className="text-[10px] text-muted/80">{m.detail}</p>
                      </div>
                    ))}
                  </div>
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button
                        variant="secondary"
                        className="w-full border-border/70 group-hover:border-primary/40"
                      >
                        View details
                        <Layers className="h-4 w-4 opacity-70" />
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-h-[85vh] overflow-y-auto sm:max-w-lg">
                      <DialogHeader>
                        <DialogTitle>{project.title}</DialogTitle>
                        <DialogDescription>{project.tagline}</DialogDescription>
                      </DialogHeader>
                      <div className="space-y-4 text-sm text-muted">
                        <p className="text-foreground/90">{project.detail}</p>
                        <div>
                          <p className="text-xs font-semibold uppercase tracking-widest text-muted">
                            Stack
                          </p>
                          <div className="mt-2 flex flex-wrap gap-2">
                            {project.stack.map((s) => (
                              <span
                                key={s}
                                className="rounded-full border border-border/60 px-2 py-0.5 text-xs"
                              >
                                {s}
                              </span>
                            ))}
                          </div>
                        </div>
                        <div>
                          <p className="text-xs font-semibold uppercase tracking-widest text-muted">
                            Outcomes
                          </p>
                          <ul className="mt-2 space-y-1">
                            {project.metrics.map((m) => (
                              <li key={m.label}>
                                <span className="font-medium text-foreground">
                                  {m.value}
                                </span>{" "}
                                {m.label} — {m.detail}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </DialogContent>
                  </Dialog>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
