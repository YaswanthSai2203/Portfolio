"use client";

import { AnimatePresence, motion, useInView } from "framer-motion";
import {
  Award,
  Calendar,
  ChevronDown,
  Copy,
  ExternalLink,
  Filter,
  ShieldCheck,
} from "lucide-react";
import * as React from "react";

import {
  certificationCategoryLabels,
  certifications,
  type CertificationCategory,
} from "@/lib/data";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
import { cn } from "@/lib/utils";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

function certStatus(
  expiresIso: string | null,
  nowMs: number,
): "active" | "expiring" | "none" {
  if (!expiresIso) return "none";
  const end = new Date(expiresIso).getTime();
  if (Number.isNaN(end)) return "none";
  if (end < nowMs) return "expiring";
  const days = (end - nowMs) / (1000 * 60 * 60 * 24);
  if (days <= 90) return "expiring";
  return "active";
}

function useNowMs(): number {
  const [ms, setMs] = React.useState(0);
  React.useEffect(() => {
    setMs(Date.now());
    const id = window.setInterval(() => setMs(Date.now()), 60_000);
    return () => window.clearInterval(id);
  }, []);
  return ms;
}

const ALL = "all" as const;

export function CertificationsSection() {
  const reduced = useReducedMotion();
  const nowMs = useNowMs();
  const ref = React.useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const [filter, setFilter] = React.useState<typeof ALL | CertificationCategory>(
    ALL,
  );
  const [expandedId, setExpandedId] = React.useState<string | null>(null);
  const [copiedId, setCopiedId] = React.useState<string | null>(null);

  const categories = React.useMemo(() => {
    const set = new Set<CertificationCategory>();
    certifications.forEach((c) => set.add(c.category));
    return Array.from(set);
  }, []);

  const filtered = React.useMemo(
    () =>
      filter === ALL
        ? certifications
        : certifications.filter((c) => c.category === filter),
    [filter],
  );

  const skillCloud = React.useMemo(() => {
    const counts = new Map<string, number>();
    certifications.forEach((c) => {
      c.skills.forEach((s) => counts.set(s, (counts.get(s) ?? 0) + 1));
    });
    return Array.from(counts.entries())
      .sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]))
      .slice(0, 12);
  }, []);

  function copyId(id: string, text: string) {
    void navigator.clipboard.writeText(text);
    setCopiedId(id);
    window.setTimeout(() => setCopiedId(null), 2000);
  }

  return (
    <section
      id="certifications"
      className="scroll-mt-28 border-t border-border/40 bg-background py-24"
    >
      <div ref={ref} className="mx-auto max-w-6xl px-4 sm:px-6">
        <motion.div
          initial={reduced ? false : { opacity: 0, y: 14 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between"
        >
          <div className="max-w-2xl">
            <p className="text-sm font-medium uppercase tracking-widest text-primary">
              Certifications
            </p>
            <h2 className="mt-2 font-display text-3xl font-bold tracking-tight sm:text-4xl">
              Credentialed across agile, cloud, and delivery
            </h2>
            <p className="mt-3 text-muted">
              Filter by focus area, scan shared skills across credentials, and
              expand any card for credential IDs and verification links.
            </p>
          </div>
          <div className="glass flex flex-wrap items-center gap-2 rounded-2xl border border-border/50 p-3">
            <Filter className="h-4 w-4 text-muted" aria-hidden />
            {([ALL, ...categories] as const).map((key) => (
              <button
                key={key}
                type="button"
                onClick={() => setFilter(key)}
                className={cn(
                  "rounded-full px-3 py-1.5 text-xs font-medium transition-colors",
                  filter === key
                    ? "bg-primary text-primary-foreground"
                    : "bg-background/50 text-muted hover:bg-card/80 hover:text-foreground",
                )}
              >
                {key === ALL ? "All" : certificationCategoryLabels[key]}
              </button>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={reduced ? false : { opacity: 0, y: 10 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.06 }}
          className="mt-10"
        >
          <p className="text-xs font-semibold uppercase tracking-widest text-muted">
            Skills across credentials
          </p>
          <div className="mt-3 flex flex-wrap gap-2">
            {skillCloud.map(([skill, count]) => (
              <span
                key={skill}
                className="inline-flex items-center gap-1.5 rounded-full border border-border/60 bg-card/40 px-3 py-1 text-xs text-foreground"
              >
                {skill}
                <span className="tabular-nums text-[10px] text-muted">
                  ×{count}
                </span>
              </span>
            ))}
          </div>
        </motion.div>

        <motion.div
          layout
          className="mt-12 grid gap-5 sm:grid-cols-2"
        >
          <AnimatePresence mode="popLayout">
            {filtered.map((cert, i) => {
              const expanded = expandedId === cert.id;
              const status =
                nowMs > 0 ? certStatus(cert.expiresIso, nowMs) : "none";
              const expired =
                nowMs > 0 &&
                cert.expiresIso &&
                new Date(cert.expiresIso).getTime() < nowMs;
              return (
                <motion.div
                  key={cert.id}
                  layout
                  initial={reduced ? false : { opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={reduced ? undefined : { opacity: 0, scale: 0.98 }}
                  transition={{ delay: reduced ? 0 : i * 0.04, duration: 0.35 }}
                >
                  <Card
                    className={cn(
                      "glass h-full overflow-hidden border-border/50 transition-shadow hover:border-primary/25 hover:shadow-lg hover:shadow-primary/5",
                      expanded && "ring-1 ring-primary/20",
                    )}
                  >
                    <CardContent className="p-0">
                      <div className="flex items-start gap-3 border-b border-border/40 p-5">
                        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary/15 text-primary">
                          <Award className="h-5 w-5" aria-hidden />
                        </div>
                        <div className="min-w-0 flex-1">
                          <p className="text-[11px] font-semibold uppercase tracking-wide text-muted">
                            {cert.issuer}
                          </p>
                          <h3 className="mt-1 font-display text-base font-semibold leading-snug text-foreground">
                            {cert.title}
                          </h3>
                          <div className="mt-2 flex flex-wrap items-center gap-2">
                            <span className="inline-flex items-center gap-1 rounded-md bg-background/60 px-2 py-0.5 text-[11px] text-muted">
                              <Calendar className="h-3 w-3" />
                              Issued {cert.issuedLabel}
                            </span>
                            {cert.expiresLabel && cert.expiresIso && (
                              <span
                                className={cn(
                                  "inline-flex items-center gap-1 rounded-md px-2 py-0.5 text-[11px]",
                                  nowMs === 0 && "bg-border/40 text-muted",
                                  nowMs > 0 &&
                                    status === "active" &&
                                    "bg-emerald-500/15 text-emerald-600 dark:text-emerald-400",
                                  nowMs > 0 &&
                                    status === "expiring" &&
                                    expired &&
                                    "bg-red-500/15 text-red-700 dark:text-red-400",
                                  nowMs > 0 &&
                                    status === "expiring" &&
                                    !expired &&
                                    "bg-amber-500/15 text-amber-700 dark:text-amber-400",
                                )}
                              >
                                <ShieldCheck className="h-3 w-3" />
                                {nowMs === 0
                                  ? `Expires ${cert.expiresLabel}`
                                  : expired
                                    ? `Expired ${cert.expiresLabel}`
                                    : status === "expiring"
                                      ? `Renews soon · ${cert.expiresLabel}`
                                      : `Expires ${cert.expiresLabel}`}
                              </span>
                            )}
                            <span className="rounded-md bg-accent/10 px-2 py-0.5 text-[10px] font-medium uppercase tracking-wide text-accent">
                              {certificationCategoryLabels[cert.category]}
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="space-y-3 p-5 pt-4">
                        <p className="text-sm leading-relaxed text-muted">
                          {cert.summary}
                        </p>
                        <div className="flex flex-wrap gap-1.5">
                          {cert.skills.map((s) => (
                            <span
                              key={s}
                              className="rounded-md border border-border/50 bg-background/40 px-2 py-0.5 text-[11px] text-foreground/90"
                            >
                              {s}
                            </span>
                          ))}
                        </div>
                        <button
                          type="button"
                          onClick={() =>
                            setExpandedId(expanded ? null : cert.id)
                          }
                          className="flex w-full items-center justify-between rounded-lg border border-border/50 bg-background/30 px-3 py-2 text-left text-xs font-medium text-foreground transition-colors hover:bg-card/50"
                          aria-expanded={expanded}
                        >
                          Credential details
                          <motion.span
                            animate={{ rotate: expanded ? 180 : 0 }}
                            transition={{ duration: 0.2 }}
                          >
                            <ChevronDown className="h-4 w-4 text-muted" />
                          </motion.span>
                        </button>
                        <AnimatePresence initial={false}>
                          {expanded && (
                            <motion.div
                              initial={reduced ? false : { height: 0, opacity: 0 }}
                              animate={{ height: "auto", opacity: 1 }}
                              exit={reduced ? undefined : { height: 0, opacity: 0 }}
                              transition={{ duration: 0.3 }}
                              className="overflow-hidden"
                            >
                              <div className="space-y-3 rounded-lg border border-dashed border-border/60 bg-background/20 p-3 text-xs">
                                {cert.credentialId && (
                                  <div>
                                    <p className="font-semibold uppercase tracking-wide text-muted">
                                      Credential ID
                                    </p>
                                    <div className="mt-1 flex flex-wrap items-center gap-2">
                                      <code className="rounded bg-background/80 px-2 py-1 font-mono text-[11px]">
                                        {cert.credentialId}
                                      </code>
                                      <Button
                                        type="button"
                                        variant="ghost"
                                        size="sm"
                                        className="h-8 gap-1 px-2 text-xs"
                                        onClick={() =>
                                          copyId(cert.id, cert.credentialId!)
                                        }
                                      >
                                        <Copy className="h-3.5 w-3.5" />
                                        {copiedId === cert.id ? "Copied" : "Copy"}
                                      </Button>
                                    </div>
                                  </div>
                                )}
                                {!cert.credentialId && (
                                  <p className="text-muted">
                                    No public credential ID on file—verify via
                                    issuer portal if needed.
                                  </p>
                                )}
                                {cert.verifyUrl && (
                                  <a
                                    href={cert.verifyUrl}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="inline-flex items-center gap-1.5 font-medium text-primary hover:underline"
                                  >
                                    Verify on issuer site
                                    <ExternalLink className="h-3.5 w-3.5" />
                                  </a>
                                )}
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
