"use client";

import { motion } from "framer-motion";
import { ArrowDown, Download, Sparkles } from "lucide-react";
import Link from "next/link";
import * as React from "react";

import { profile, rotatingSkills } from "@/lib/data";
import { useReducedMotion } from "@/hooks/use-reduced-motion";

import { ParticleField } from "@/components/particle-field";
import { Button } from "@/components/ui/button";

export function HeroSection() {
  const reduced = useReducedMotion();
  const [skillIndex, setSkillIndex] = React.useState(0);

  React.useEffect(() => {
    if (reduced) return;
    const id = window.setInterval(() => {
      setSkillIndex((i) => (i + 1) % rotatingSkills.length);
    }, 2800);
    return () => window.clearInterval(id);
  }, [reduced]);

  const currentSkill = rotatingSkills[skillIndex];

  return (
    <section
      id="top"
      className="relative min-h-[100dvh] overflow-hidden mesh-gradient pt-24 pb-16"
    >
      <div className="animate-pulse-glow pointer-events-none absolute -left-32 top-20 h-72 w-72 rounded-full bg-primary/30 blur-3xl" />
      <div className="animate-pulse-glow pointer-events-none absolute -right-24 bottom-32 h-80 w-80 rounded-full bg-accent/25 blur-3xl [animation-delay:1.2s]" />
      <ParticleField className="opacity-70" />

      <div className="relative z-10 mx-auto flex max-w-6xl flex-col gap-10 px-4 sm:px-6 lg:flex-row lg:items-center lg:gap-16">
        <div className="flex-1 space-y-8">
          <motion.div
            initial={reduced ? false : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 rounded-full border border-border/60 glass px-4 py-1.5 text-xs font-medium text-muted"
          >
            <Sparkles className="h-3.5 w-3.5 text-accent" aria-hidden />
            Open to senior full-stack & platform roles
          </motion.div>

          <motion.div
            initial={reduced ? false : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.05 }}
            className="space-y-4"
          >
            <h1 className="font-display text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
              <span className="block text-foreground">{profile.name}</span>
              <span className="mt-2 block bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent glow-text">
                {profile.title}
              </span>
            </h1>
            <p className="max-w-xl text-lg text-muted">
              I build{" "}
              <span className="font-medium text-foreground">
                scalable .NET platforms
              </span>
              , cloud-native services, and crisp product experiences—with
              reliability you can measure.
            </p>
          </motion.div>

          <motion.div
            initial={reduced ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.15, duration: 0.5 }}
            className="flex min-h-[2.5rem] items-center gap-2 text-sm text-muted"
          >
            <span className="text-foreground/80">Focus:</span>
            <span
              className="inline-block font-mono text-sm text-accent"
              key={currentSkill}
            >
              {reduced ? rotatingSkills[0] : currentSkill}
              {!reduced && (
                <motion.span
                  className="ml-0.5 inline-block h-4 w-0.5 bg-accent align-middle"
                  animate={{ opacity: [1, 0, 1] }}
                  transition={{ duration: 0.9, repeat: Infinity }}
                />
              )}
            </span>
          </motion.div>

          <motion.div
            initial={reduced ? false : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.45 }}
            className="flex flex-wrap gap-3"
          >
            <Button size="lg" asChild>
              <Link href="#projects">View projects</Link>
            </Button>
            <Button size="lg" variant="secondary" asChild>
              <a
                href="/api/resume"
                download={profile.resumeDownloadFilename}
              >
                <Download className="h-4 w-4" />
                Download resume
              </a>
            </Button>
          </motion.div>

          <motion.p
            initial={reduced ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.35 }}
            className="flex items-center gap-2 text-xs text-muted"
          >
            <ArrowDown className="h-3.5 w-3.5 animate-bounce" aria-hidden />
            Scroll to explore architecture, delivery, and impact
          </motion.p>
        </div>

        <motion.div
          initial={reduced ? false : { opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="relative flex-1"
        >
          <div className="glass relative overflow-hidden rounded-3xl p-8 neu-inset">
            <div className="absolute -right-8 -top-8 h-32 w-32 rounded-full bg-primary/20 blur-2xl" />
            <div className="relative space-y-6">
              <div className="flex items-center justify-between gap-4">
                <span className="text-xs font-medium uppercase tracking-wider text-muted">
                  System snapshot
                </span>
                <span className="rounded-full bg-emerald-500/15 px-2 py-0.5 text-[10px] font-semibold text-emerald-400">
                  Healthy
                </span>
              </div>
              <div className="grid gap-3 sm:grid-cols-2">
                {[
                  { k: "Stack", v: ".NET + React" },
                  { k: "Cloud", v: "Azure / AWS" },
                  { k: "Patterns", v: "Microservices" },
                  { k: "Domains", v: "FinTech / Health" },
                ].map((row) => (
                  <div
                    key={row.k}
                    className="rounded-xl border border-border/40 bg-background/30 p-4"
                  >
                    <p className="text-[11px] uppercase tracking-wide text-muted">
                      {row.k}
                    </p>
                    <p className="mt-1 font-display text-sm font-semibold">
                      {row.v}
                    </p>
                  </div>
                ))}
              </div>
              <div className="rounded-xl border border-dashed border-border/50 bg-background/20 p-4">
                <p className="text-xs text-muted">
                  Recent emphasis:{" "}
                  <span className="text-foreground">
                    performance, observability, and safe AI automation
                  </span>{" "}
                  in regulated environments.
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
