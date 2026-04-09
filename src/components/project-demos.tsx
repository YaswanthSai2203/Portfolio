"use client";

import { motion } from "framer-motion";
import { ChevronRight, Play, Sparkles } from "lucide-react";
import * as React from "react";

import type { ProjectDemoKind } from "@/lib/data";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
import { cn } from "@/lib/utils";

import { Button } from "@/components/ui/button";

const MOCK_ENDPOINTS = [
  { method: "GET", path: "/api/v1/claims/{id}", desc: "Claim aggregate + status" },
  { method: "POST", path: "/api/v1/claims/{id}/documents", desc: "Upload claim document" },
  { method: "POST", path: "/api/v1/rag/query", desc: "Policy-grounded Q&A (demo)" },
];

export function ProjectDemoBlock({ kind }: { kind: ProjectDemoKind }) {
  if (kind === "none") return null;
  if (kind === "rag") return <RagDemo />;
  if (kind === "dashboard") return <DashboardDemo />;
  return <ApiExplorerDemo />;
}

function ApiExplorerDemo() {
  const reduced = useReducedMotion();
  const [open, setOpen] = React.useState<string | null>(MOCK_ENDPOINTS[0].path);

  return (
    <div className="rounded-xl border border-border/60 bg-card/40 p-4 font-mono text-[11px] text-muted">
      <div className="mb-3 flex items-center justify-between gap-2 border-b border-border/40 pb-2">
        <span className="text-[10px] font-semibold uppercase tracking-wider text-primary">
          Demo · API explorer
        </span>
        <span className="text-[10px] text-muted">Portfolio mock — not live backend</span>
      </div>
      <div className="space-y-1">
        {MOCK_ENDPOINTS.map((ep) => {
          const isOpen = open === ep.path;
          return (
            <div key={ep.path} className="overflow-hidden rounded-lg border border-border/40">
              <button
                type="button"
                onClick={() => setOpen(isOpen ? null : ep.path)}
                className="flex w-full items-center gap-2 bg-background/40 px-2 py-2 text-left hover:bg-background/60"
              >
                <ChevronRight
                  className={cn(
                    "h-3.5 w-3.5 shrink-0 transition-transform",
                    isOpen && "rotate-90",
                  )}
                />
                <span
                  className={cn(
                    "shrink-0 rounded px-1.5 py-0.5 text-[9px] font-bold",
                    ep.method === "GET" && "bg-emerald-500/20 text-emerald-400",
                    ep.method === "POST" && "bg-sky-500/20 text-sky-400",
                  )}
                >
                  {ep.method}
                </span>
                <span className="truncate text-foreground/90">{ep.path}</span>
              </button>
              {isOpen && (
                <motion.div
                  initial={reduced ? false : { height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  className="border-t border-border/30 bg-background/20 px-3 py-2 text-[10px]"
                >
                  <p className="text-muted">{ep.desc}</p>
                  <pre className="mt-2 overflow-x-auto rounded bg-background/50 p-2 text-[9px] leading-relaxed text-accent/90">
                    {`{\n  "example": true,\n  "note": "Swagger-style preview for portfolio"\n}`}
                  </pre>
                </motion.div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

function RagDemo() {
  const reduced = useReducedMotion();
  const [running, setRunning] = React.useState(false);
  const [step, setStep] = React.useState(-1);

  const lines = [
    { t: "Retrieving policy chunks (k=5)…", delay: 400 },
    { t: "Re-ranking by section relevance…", delay: 600 },
    { t: "Generating answer with citations…", delay: 700 },
    {
      t: 'Answer: "Covered if reported within 30 days — see §4.2 (source: Policy-2024.pdf)."',
      delay: 0,
    },
  ];

  function run() {
    if (running) return;
    setRunning(true);
    setStep(-1);
    let idx = -1;
    const next = () => {
      idx += 1;
      if (idx >= lines.length) {
        setRunning(false);
        return;
      }
      setStep(idx);
      const wait = idx < lines.length - 1 ? lines[idx].delay : 0;
      if (wait > 0) window.setTimeout(next, wait);
      else setRunning(false);
    };
    window.setTimeout(next, 300);
  }

  return (
    <div className="rounded-xl border border-primary/25 bg-primary/5 p-4">
      <div className="mb-3 flex items-center justify-between gap-2">
        <span className="flex items-center gap-2 text-[10px] font-semibold uppercase tracking-wider text-primary">
          <Sparkles className="h-3.5 w-3.5" />
          Demo · Simulated RAG response
        </span>
        <Button
          type="button"
          size="sm"
          variant="secondary"
          className="h-8 gap-1 text-xs"
          disabled={running}
          onClick={run}
        >
          <Play className="h-3 w-3" />
          Run pipeline
        </Button>
      </div>
      <div className="space-y-2 rounded-lg border border-border/40 bg-background/40 p-3 font-mono text-[10px]">
        {step >= 0 &&
          lines.slice(0, step + 1).map((line, idx) => (
            <motion.p
              key={idx}
              initial={reduced ? false : { opacity: 0, x: -6 }}
              animate={{ opacity: 1, x: 0 }}
              className={cn(
                "text-muted",
                idx === lines.length - 1 && step === lines.length - 1 && "text-foreground",
              )}
            >
              {line.t}
            </motion.p>
          ))}
        {step < 0 && !running && (
          <p className="text-muted">Press run to simulate retrieval → answer.</p>
        )}
      </div>
    </div>
  );
}

function DashboardDemo() {
  const reduced = useReducedMotion();
  const bars = [
    { label: "Applied", w: 72, tone: "bg-primary/70" },
    { label: "Interview", w: 45, tone: "bg-accent/70" },
    { label: "Offer", w: 18, tone: "bg-emerald-500/60" },
  ];

  return (
    <div className="rounded-xl border border-border/60 bg-background/40 p-4">
      <p className="mb-3 text-[10px] font-semibold uppercase tracking-wider text-muted">
        Demo · Pipeline snapshot
      </p>
      <div className="grid gap-3 sm:grid-cols-3">
        {bars.map((b, i) => (
          <motion.div
            key={b.label}
            initial={reduced ? false : { opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.08 }}
            className="rounded-lg border border-border/40 bg-card/30 p-3"
          >
            <p className="text-[10px] text-muted">{b.label}</p>
            <div className="mt-2 h-2 overflow-hidden rounded-full bg-border/40">
              <motion.div
                className={cn("h-full rounded-full", b.tone)}
                initial={reduced ? { width: `${b.w}%` } : { width: 0 }}
                whileInView={{ width: `${b.w}%` }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              />
            </div>
            <p className="mt-2 font-display text-lg font-bold tabular-nums">
              {b.w}%
            </p>
            <p className="text-[9px] text-muted">Mock funnel load</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
