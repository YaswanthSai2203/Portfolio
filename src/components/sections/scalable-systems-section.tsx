"use client";

import { motion, useInView } from "framer-motion";
import * as React from "react";

import { useReducedMotion } from "@/hooks/use-reduced-motion";
import { cn } from "@/lib/utils";

const microservicesDiagram = `
┌──────────┐   ┌──────────┐   ┌──────────┐
│ Billing  │   │ Claims   │   │ Identity │
│ service  │   │ service  │   │ service  │
└────┬─────┘   └────┬─────┘   └────┬─────┘
     │              │              │
     └──────────────┼──────────────┘
                    │
            ┌───────▼────────┐
            │   API Gateway   │
            │  + rate limits  │
            └───────┬────────┘
                    │
            ┌───────▼────────┐
            │   Clients /    │
            │   BFF layers   │
            └────────────────┘`.trim();

const eventFlowDiagram = `
  Producer          Bus / Queue              Consumer
 ┌────────┐      ┌─────────────────┐      ┌────────┐
 │Service │─────▶│ Azure Service   │─────▶│Worker  │
 │   A    │      │ Bus (topics)    │      │group B │
 └────────┘      └────────┬────────┘      └────────┘
                          │
 ┌────────┐      ┌────────▼────────┐      ┌────────┐
 │Service │─────▶│ AWS SQS (+ DLQ) │─────▶│Lambda /│
 │   C    │      │ cross-cloud fan │      │service │
 └────────┘      └─────────────────┘      └────────┘`.trim();

const apiPatterns = [
  {
    title: "REST + versioning",
    text: "Resource-oriented URLs, explicit v1/v2, deprecation headers, and OpenAPI as the contract source of truth.",
  },
  {
    title: "Idempotent writes",
    text: "Idempotency-Key on mutating operations; safe retries from mobile and async workers.",
  },
  {
    title: "Pagination & filtering",
    text: "Cursor-based lists for large datasets; bounded page sizes and stable sort keys.",
  },
  {
    title: "Problem+json errors",
    text: "Consistent error shape with trace IDs for support and observability correlation.",
  },
];

const cacheDb = [
  {
    title: "Caching",
    points: [
      "Redis for hot reads, session, and rate-limit counters with TTL discipline.",
      "Cache-aside vs read-through chosen per consistency needs; stampede protection on cold keys.",
      "CDN at the edge for static assets and cacheable BFF responses.",
    ],
  },
  {
    title: "Database",
    points: [
      "Index for real query shapes, not hypothetical ones; cover indexes where reads dominate.",
      "Partition large tables; archive cold rows to keep working set lean.",
      "Read replicas for reporting; write path stays on primary with clear lag expectations.",
    ],
  },
];

export function ScalableSystemsSection() {
  const reduced = useReducedMotion();
  const ref = React.useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      id="scalable-systems"
      className="scroll-mt-28 border-t border-border/40 bg-background py-24"
    >
      <div ref={ref} className="mx-auto max-w-6xl px-4 sm:px-6">
        <motion.div
          initial={reduced ? false : { opacity: 0, y: 18 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          className="max-w-2xl"
        >
          <p className="text-sm font-medium uppercase tracking-widest text-primary">
            System design
          </p>
          <h2 className="mt-2 font-display text-3xl font-bold tracking-tight sm:text-4xl">
            How I design scalable systems
          </h2>
          <p className="mt-3 text-muted">
            Bounded contexts, asynchronous boundaries, and data layers that
            stay understandable as load grows.
          </p>
        </motion.div>

        <div className="mt-14 grid gap-10 lg:grid-cols-2">
          <motion.div
            initial={reduced ? false : { opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.08 }}
            className={cn(
              "rounded-2xl border border-border/50 bg-card/20 p-5 backdrop-blur-sm",
              "transition-all duration-300 hover:border-primary/20 hover:shadow-md hover:shadow-primary/5",
            )}
          >
            <h3 className="font-display text-lg font-semibold">
              Microservices architecture
            </h3>
            <p className="mt-2 text-sm text-muted">
              Services align to business capabilities; synchronous calls only
              where UX demands it—everything else goes async or cached.
            </p>
            <pre
              className="mt-4 overflow-x-auto rounded-xl border border-border/40 bg-background/80 p-4 text-[10px] leading-snug text-accent"
              aria-label="Microservices diagram"
            >
              {microservicesDiagram}
            </pre>
          </motion.div>

          <motion.div
            initial={reduced ? false : { opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.12 }}
            className={cn(
              "rounded-2xl border border-border/50 bg-card/20 p-5 backdrop-blur-sm",
              "transition-all duration-300 hover:border-accent/25 hover:shadow-md hover:shadow-accent/5",
            )}
          >
            <h3 className="font-display text-lg font-semibold">
              Event-driven flow
            </h3>
            <p className="mt-2 text-sm text-muted">
              Azure Service Bus for ordered topics and AWS SQS for fan-out and
              Lambdas—dead-letter queues and retries are first-class.
            </p>
            <pre
              className="mt-4 overflow-x-auto rounded-xl border border-border/40 bg-background/80 p-4 text-[10px] leading-snug text-primary/90"
              aria-label="Event flow diagram"
            >
              {eventFlowDiagram}
            </pre>
          </motion.div>
        </div>

        <motion.div
          initial={reduced ? false : { opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.16 }}
          className="mt-12"
        >
          <h3 className="font-display text-xl font-semibold">
            API design patterns
          </h3>
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            {apiPatterns.map((p, i) => (
              <motion.div
                key={p.title}
                initial={reduced ? false : { opacity: 0, x: -12 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ delay: i * 0.05 }}
                className="rounded-xl border border-border/40 bg-background/30 p-4 transition-colors hover:border-primary/20"
              >
                <p className="font-medium text-foreground">{p.title}</p>
                <p className="mt-2 text-sm text-muted">{p.text}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={reduced ? false : { opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.2 }}
          className="mt-12 grid gap-6 md:grid-cols-2"
        >
          {cacheDb.map((block) => (
            <div
              key={block.title}
              className="rounded-2xl border border-dashed border-border/60 bg-card/15 p-6"
            >
              <h3 className="font-display text-lg font-semibold">
                {block.title} strategy
              </h3>
              <ul className="mt-4 space-y-2 text-sm text-muted">
                {block.points.map((pt) => (
                  <li key={pt} className="flex gap-2">
                    <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-primary" />
                    <span>{pt}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
