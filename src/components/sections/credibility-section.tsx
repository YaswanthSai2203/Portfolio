"use client";

import { motion, useInView } from "framer-motion";
import { BookOpen, Mic, Newspaper, Radio, Github } from "lucide-react";
import Link from "next/link";
import * as React from "react";

import {
  nowUpdates,
  openSourceHighlights,
  readingList,
  speakingAndWriting,
} from "@/lib/data";
import { useReducedMotion } from "@/hooks/use-reduced-motion";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const typeIcon = {
  book: BookOpen,
  course: Radio,
  newsletter: Newspaper,
} as const;

export function CredibilitySection() {
  const reduced = useReducedMotion();
  const ref = React.useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <section
      id="credibility"
      className="scroll-mt-28 border-t border-border/40 py-24"
    >
      <div ref={ref} className="mx-auto max-w-6xl px-4 sm:px-6">
        <motion.div
          initial={reduced ? false : { opacity: 0, y: 14 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          className="max-w-2xl"
        >
          <p className="text-sm font-medium uppercase tracking-widest text-primary">
            Learning & voice
          </p>
          <h2 className="mt-2 font-display text-3xl font-bold tracking-tight sm:text-4xl">
            What I read, ship, and share
          </h2>
          <p className="mt-3 text-muted">
            Replace placeholders in{" "}
            <code className="rounded bg-background/80 px-1 text-[11px]">
              data.ts
            </code>{" "}
            with your real books, links, talks, and OSS highlights.
          </p>
        </motion.div>

        <div className="mt-12 grid gap-8 lg:grid-cols-2">
          <motion.div
            initial={reduced ? false : { opacity: 0, y: 18 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.05 }}
          >
            <Card className="glass h-full border-border/50">
              <CardHeader>
                <CardTitle className="text-lg">Reading & stack</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {readingList.map((item) => {
                  const Icon = typeIcon[item.type];
                  const inner = (
                    <>
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                        <Icon className="h-5 w-5" />
                      </div>
                      <div className="min-w-0">
                        <p className="font-medium text-foreground">
                          {item.title}
                        </p>
                        <p className="text-xs text-muted">{item.author}</p>
                        <p className="mt-1 text-sm text-muted">{item.note}</p>
                      </div>
                    </>
                  );
                  return "url" in item && item.url ? (
                    <Link
                      key={item.title}
                      href={item.url}
                      target="_blank"
                      rel="noreferrer"
                      className="flex gap-3 rounded-xl border border-border/40 bg-background/30 p-3 transition-colors hover:border-primary/30"
                    >
                      {inner}
                    </Link>
                  ) : (
                    <div
                      key={item.title}
                      className="flex gap-3 rounded-xl border border-border/40 bg-background/30 p-3"
                    >
                      {inner}
                    </div>
                  );
                })}
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={reduced ? false : { opacity: 0, y: 18 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.1 }}
          >
            <Card className="glass h-full border-border/50">
              <CardHeader>
                <CardTitle className="text-lg">Now</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-4">
                  {nowUpdates.map((u) => (
                    <li
                      key={u.date}
                      className="border-l-2 border-primary/40 pl-4"
                    >
                      <p className="text-xs font-semibold uppercase tracking-wide text-primary">
                        {u.date}
                      </p>
                      <p className="mt-1 text-sm text-muted">{u.text}</p>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        <div className="mt-8 grid gap-8 lg:grid-cols-2">
          <motion.div
            initial={reduced ? false : { opacity: 0, y: 18 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.12 }}
          >
            <Card className="glass border-border/50">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Mic className="h-5 w-5 text-primary" />
                  Speaking & writing
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                    {speakingAndWriting.map((s) => (
                  <div
                    key={s.title}
                    className="rounded-xl border border-border/40 bg-background/30 p-3"
                  >
                    <p className="font-medium text-foreground">{s.title}</p>
                    <p className="text-xs text-muted">
                      {s.venue} · {s.year} · {s.kind}
                    </p>
                    {s.url ? (
                      <Link
                        href={s.url}
                        target="_blank"
                        rel="noreferrer"
                        className="mt-2 inline-block text-xs font-medium text-primary hover:underline"
                      >
                        Open link
                      </Link>
                    ) : null}
                  </div>
                ))}
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={reduced ? false : { opacity: 0, y: 18 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.15 }}
          >
            <Card className="glass border-border/50">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Github className="h-5 w-5 text-primary" />
                  Open source
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {openSourceHighlights.map((o) => (
                  <a
                    key={o.title}
                    href={o.url}
                    target="_blank"
                    rel="noreferrer"
                    className="block rounded-xl border border-border/40 bg-background/30 p-3 transition-colors hover:border-primary/30"
                  >
                    <p className="font-medium text-foreground">{o.title}</p>
                    <p className="text-xs text-primary">{o.role}</p>
                    <p className="mt-1 text-sm text-muted">{o.detail}</p>
                  </a>
                ))}
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
