"use client";

import { motion, useInView } from "framer-motion";
import { Quote } from "lucide-react";
import * as React from "react";

import { engineeringPhilosophy } from "@/lib/data";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
import { cn } from "@/lib/utils";

export function PhilosophySection() {
  const reduced = useReducedMotion();
  const ref = React.useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      id="philosophy"
      className="scroll-mt-28 border-t border-border/40 py-24"
    >
      <div ref={ref} className="mx-auto max-w-6xl px-4 sm:px-6">
        <motion.div
          initial={reduced ? false : { opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="max-w-2xl"
        >
          <p className="text-sm font-medium uppercase tracking-widest text-primary">
            Engineering philosophy
          </p>
          <h2 className="mt-2 font-display text-3xl font-bold tracking-tight sm:text-4xl">
            How I think about shipping
          </h2>
          <p className="mt-3 text-muted">
            Principles that guide architecture, code review, and production
            operations—before frameworks and buzzwords.
          </p>
        </motion.div>

        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {engineeringPhilosophy.map((item, i) => (
            <motion.article
              key={item.title}
              initial={reduced ? false : { opacity: 0, y: 24 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.06 * i, duration: 0.45 }}
              whileHover={
                reduced
                  ? undefined
                  : { y: -4, transition: { duration: 0.2 } }
              }
              className={cn(
                "group relative overflow-hidden rounded-2xl border border-border/50 bg-card/25 p-6 shadow-sm backdrop-blur-sm",
                "transition-shadow duration-300 hover:border-primary/25 hover:shadow-lg hover:shadow-primary/5",
              )}
            >
              <Quote className="absolute right-4 top-4 h-8 w-8 text-primary/10 transition-colors group-hover:text-primary/20" />
              <h3 className="font-display text-lg font-semibold text-foreground">
                {item.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">
                {item.body}
              </p>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
