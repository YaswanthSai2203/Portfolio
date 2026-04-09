"use client";

import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import * as React from "react";

import {
  getProjectById,
  insuranceAiCaseStudy,
} from "@/lib/data";
import { useReducedMotion } from "@/hooks/use-reduced-motion";

import { ProjectDemoBlock } from "@/components/project-demos";
import { SiteChrome } from "@/components/site-chrome";
import { Button } from "@/components/ui/button";

export default function InsuranceAiCaseStudyPage() {
  const reduced = useReducedMotion();
  const project = getProjectById("insurance-ai");

  return (
    <SiteChrome>
      <main id="main" className="pt-24 pb-32">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <motion.div
            initial={reduced ? false : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <Button variant="ghost" size="sm" className="mb-8 -ml-2 gap-2" asChild>
              <Link href="/#projects">
                <ArrowLeft className="h-4 w-4" />
                Back to projects
              </Link>
            </Button>
            <p className="text-sm font-medium uppercase tracking-widest text-primary">
              Case study
            </p>
            <h1 className="mt-2 font-display text-3xl font-bold tracking-tight sm:text-4xl">
              {insuranceAiCaseStudy.title}
            </h1>
            <p className="mt-3 text-lg text-muted">
              {insuranceAiCaseStudy.subtitle}
            </p>
            <p className="mt-6 leading-relaxed text-muted">
              {insuranceAiCaseStudy.intro}
            </p>
          </motion.div>

          <section className="mt-14">
            <h2 className="font-display text-xl font-semibold">Timeline</h2>
            <ol className="mt-6 space-y-6 border-l border-border/60 pl-6">
              {insuranceAiCaseStudy.timeline.map((t, i) => (
                <motion.li
                  key={t.phase}
                  initial={reduced ? false : { opacity: 0, x: -8 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05 }}
                  className="relative"
                >
                  <span className="absolute -left-[29px] top-1.5 h-2.5 w-2.5 rounded-full bg-primary ring-4 ring-background" />
                  <p className="text-xs font-semibold uppercase tracking-wide text-primary">
                    {t.period}
                  </p>
                  <p className="font-display text-lg font-medium">{t.phase}</p>
                  <p className="mt-2 text-sm text-muted">{t.summary}</p>
                </motion.li>
              ))}
            </ol>
          </section>

          <section className="mt-14">
            <h2 className="font-display text-xl font-semibold">
              Request / response flow
            </h2>
            <pre className="mt-4 overflow-x-auto rounded-xl border border-border/50 bg-background/80 p-4 font-mono text-[10px] leading-relaxed text-foreground/90 sm:text-[11px]">
              {insuranceAiCaseStudy.sequenceDiagram}
            </pre>
          </section>

          <section className="mt-14">
            <h2 className="font-display text-xl font-semibold">
              Deeper architecture
            </h2>
            <pre className="mt-4 overflow-x-auto rounded-xl border border-border/50 bg-background/80 p-4 font-mono text-[9px] leading-tight text-foreground/90 sm:text-[10px]">
              {insuranceAiCaseStudy.architectureDeep.join("\n")}
            </pre>
          </section>

          {project && (
            <section className="mt-14">
              <h2 className="font-display text-xl font-semibold">
                Modal snapshot (same as home)
              </h2>
              <p className="mt-2 text-sm text-muted">
                Problem, decisions, and metrics also live on the main portfolio
                card — this page extends with timeline and evolution.
              </p>
              <div className="mt-4 rounded-xl border border-border/40 bg-card/20 p-4 text-sm text-muted">
                <p className="text-foreground/90">{project.problem}</p>
              </div>
            </section>
          )}

          <section className="mt-14">
            <h2 className="font-display text-xl font-semibold">
              What I&apos;d change next
            </h2>
            <ul className="mt-4 space-y-3">
              {insuranceAiCaseStudy.whatNext.map((line) => (
                <li key={line} className="flex gap-2 text-sm text-muted">
                  <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-accent" />
                  <span>{line}</span>
                </li>
              ))}
            </ul>
          </section>

          {project && project.demoKind !== "none" && (
            <section className="mt-14">
              <h2 className="font-display text-xl font-semibold">Demo</h2>
              <div className="mt-4">
                <ProjectDemoBlock kind={project.demoKind} />
              </div>
            </section>
          )}
        </div>
      </main>
    </SiteChrome>
  );
}
