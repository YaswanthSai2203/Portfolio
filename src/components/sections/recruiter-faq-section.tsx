"use client";

import { motion, useInView } from "framer-motion";
import { ChevronDown } from "lucide-react";
import * as React from "react";

import { recruiterFaq } from "@/lib/data";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
import { cn } from "@/lib/utils";

export function RecruiterFaqSection() {
  const reduced = useReducedMotion();
  const ref = React.useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const [open, setOpen] = React.useState<number | null>(0);

  return (
    <section
      id="recruiter-faq"
      className="scroll-mt-28 border-t border-border/40 py-24"
    >
      <div ref={ref} className="mx-auto max-w-3xl px-4 sm:px-6">
        <motion.div
          initial={reduced ? false : { opacity: 0, y: 14 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
        >
          <p className="text-sm font-medium uppercase tracking-widest text-primary">
            For recruiters
          </p>
          <h2 className="mt-2 font-display text-3xl font-bold tracking-tight sm:text-4xl">
            FAQ
          </h2>
          <p className="mt-3 text-muted">
            Edit answers in <code className="text-[11px]">recruiterFaq</code> in{" "}
            <code className="text-[11px]">data.ts</code>.
          </p>
        </motion.div>

        <ul className="mt-10 space-y-2">
          {recruiterFaq.map((item, i) => {
            const isOpen = open === i;
            return (
              <motion.li
                key={item.q}
                initial={reduced ? false : { opacity: 0, y: 10 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.03 * i }}
                className="overflow-hidden rounded-xl border border-border/50 bg-card/25"
              >
                <button
                  type="button"
                  onClick={() => setOpen(isOpen ? null : i)}
                  className="flex w-full items-center justify-between gap-3 p-4 text-left"
                  aria-expanded={isOpen}
                >
                  <span className="font-medium text-foreground">{item.q}</span>
                  <ChevronDown
                    className={cn(
                      "h-4 w-4 shrink-0 text-muted transition-transform",
                      isOpen && "rotate-180",
                    )}
                  />
                </button>
                {isOpen && (
                  <div className="border-t border-border/40 px-4 pb-4 pt-2 text-sm text-muted">
                    {item.a}
                  </div>
                )}
              </motion.li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
