"use client";

import { motion, useInView } from "framer-motion";
import { Layers } from "lucide-react";
import * as React from "react";

import { projects } from "@/lib/data";
import { useReducedMotion } from "@/hooks/use-reduced-motion";

import { ProjectDemoBlock } from "@/components/project-demos";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function ProjectsSection() {
  const reduced = useReducedMotion();
  const ref = React.useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const [detailOpen, setDetailOpen] = React.useState(false);
  const [detailId, setDetailId] = React.useState<string | null>(null);
  const detailProject = detailId
    ? projects.find((p) => p.id === detailId)
    : undefined;

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
            Deep dives: problem, architecture, trade-offs, metrics, and
            interactive demos—one shared modal for stable hydration.
          </p>
        </motion.div>

        <div className="mt-14 grid gap-6 lg:grid-cols-3">
          {projects.map((project, i) => (
            <motion.div
              key={project.id}
              initial={reduced ? false : { opacity: 0, y: 22 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.07, duration: 0.45 }}
              whileHover={
                reduced ? undefined : { y: -6, transition: { duration: 0.25 } }
              }
            >
              <Card className="glass group flex h-full flex-col border-border/50 transition-all duration-300 hover:border-primary/35 hover:shadow-xl hover:shadow-primary/[0.12]">
                <CardHeader>
                  <CardTitle className="text-lg leading-snug">
                    {project.title}
                  </CardTitle>
                  <p className="text-sm text-muted">{project.tagline}</p>
                  <div className="flex flex-wrap gap-1.5 pt-2">
                    {project.stack.map((s) => (
                      <span
                        key={s}
                        className="rounded-md bg-primary/10 px-2 py-0.5 text-[11px] font-medium text-primary transition-colors group-hover:bg-primary/15"
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
                        className="rounded-lg border border-border/40 bg-background/30 p-2 text-center transition-colors group-hover:border-primary/15"
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
                  <Button
                    type="button"
                    variant="secondary"
                    className="w-full border-border/70 group-hover:border-primary/40"
                    onClick={() => {
                      setDetailId(project.id);
                      setDetailOpen(true);
                    }}
                  >
                    View details
                    <Layers className="h-4 w-4 opacity-70" />
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        <Dialog
          open={detailOpen}
          onOpenChange={(open) => {
            setDetailOpen(open);
            if (!open) setDetailId(null);
          }}
        >
          <DialogContent
            key={detailId ?? "closed"}
            className="max-h-[90vh] max-w-[calc(100%-2rem)] overflow-y-auto sm:max-w-2xl"
          >
            {detailProject ? (
              <>
                <DialogHeader>
                  <DialogTitle>{detailProject.title}</DialogTitle>
                  <DialogDescription>{detailProject.tagline}</DialogDescription>
                </DialogHeader>

                <div className="space-y-6 text-sm">
                  <section>
                    <h4 className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-primary">
                      <span aria-hidden>🧩</span> Problem
                    </h4>
                    <p className="mt-2 leading-relaxed text-muted">
                      {detailProject.problem}
                    </p>
                  </section>

                  <section>
                    <h4 className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-primary">
                      <span aria-hidden>🏗️</span> Architecture
                    </h4>
                    <pre className="mt-2 overflow-x-auto rounded-xl border border-border/50 bg-background/70 p-3 text-[9px] leading-tight text-foreground/90">
                      {detailProject.architectureLines.join("\n")}
                    </pre>
                  </section>

                  <section>
                    <h4 className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-primary">
                      <span aria-hidden>⚙️</span> Tech decisions
                    </h4>
                    <ul className="mt-2 space-y-3">
                      {detailProject.techDecisions.map((d) => (
                        <li
                          key={d.choice}
                          className="rounded-lg border border-border/40 bg-card/20 p-3"
                        >
                          <p className="font-medium text-foreground">
                            {d.choice}
                          </p>
                          <p className="mt-1 text-muted">{d.rationale}</p>
                        </li>
                      ))}
                    </ul>
                  </section>

                  <section>
                    <h4 className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-primary">
                      <span aria-hidden>📊</span> Metrics
                    </h4>
                    <div className="mt-2 grid grid-cols-1 gap-2 sm:grid-cols-3">
                      {detailProject.metrics.map((m) => (
                        <div
                          key={m.label}
                          className="rounded-lg border border-primary/20 bg-primary/5 p-3 text-center"
                        >
                          <p className="font-display text-lg font-bold text-foreground">
                            {m.value}
                          </p>
                          <p className="text-[10px] font-medium uppercase text-muted">
                            {m.label}
                          </p>
                          <p className="text-[10px] text-muted">{m.detail}</p>
                        </div>
                      ))}
                    </div>
                  </section>

                  <section>
                    <h4 className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-primary">
                      <span aria-hidden>🎯</span> Challenges & solutions
                    </h4>
                    <ul className="mt-2 space-y-3">
                      {detailProject.challenges.map((c) => (
                        <li
                          key={c.challenge}
                          className="rounded-lg border border-border/40 p-3"
                        >
                          <p className="text-xs font-semibold text-amber-600 dark:text-amber-400">
                            {c.challenge}
                          </p>
                          <p className="mt-1 text-muted">{c.solution}</p>
                        </li>
                      ))}
                    </ul>
                  </section>

                  <section>
                    <h4 className="text-xs font-bold uppercase tracking-widest text-primary">
                      Summary
                    </h4>
                    <p className="mt-2 text-muted">{detailProject.detail}</p>
                    <div className="mt-3 flex flex-wrap gap-2">
                      {detailProject.stack.map((s) => (
                        <span
                          key={s}
                          className="rounded-full border border-border/60 px-2 py-0.5 text-xs text-foreground/90"
                        >
                          {s}
                        </span>
                      ))}
                    </div>
                  </section>

                  {detailProject.demoKind !== "none" && (
                    <section>
                      <h4 className="text-xs font-bold uppercase tracking-widest text-primary">
                        Live demo
                      </h4>
                      <div className="mt-3">
                        <ProjectDemoBlock kind={detailProject.demoKind} />
                      </div>
                    </section>
                  )}
                </div>
              </>
            ) : null}
          </DialogContent>
        </Dialog>
      </div>
    </section>
  );
}
