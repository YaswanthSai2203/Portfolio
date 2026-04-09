"use client";

import { motion, useInView } from "framer-motion";
import { Copy, Terminal } from "lucide-react";
import * as React from "react";

import { showcaseSnippet } from "@/lib/data";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
import { useSiteOrigin } from "@/hooks/use-site-origin";

import { CodeSnippetView } from "@/components/code-snippet-view";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function EngineeringLabSection() {
  const reduced = useReducedMotion();
  const ref = React.useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const origin = useSiteOrigin();
  const [copied, setCopied] = React.useState(false);

  const curl =
    origin.length > 0
      ? `curl -sS "${origin}/api/health" | jq`
      : `curl -sS "https://YOUR_DOMAIN/api/health"`;

  async function copyCurl() {
    const text =
      origin.length > 0
        ? `curl -sS "${origin}/api/health"`
        : curl.replace(" | jq", "");
    await navigator.clipboard.writeText(text);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 2000);
  }

  return (
    <section
      id="engineering-lab"
      className="scroll-mt-28 border-t border-border/40 bg-background py-24"
    >
      <div ref={ref} className="mx-auto max-w-6xl px-4 sm:px-6">
        <motion.div
          initial={reduced ? false : { opacity: 0, y: 14 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          className="max-w-2xl"
        >
          <p className="text-sm font-medium uppercase tracking-widest text-primary">
            Engineering lab
          </p>
          <h2 className="mt-2 font-display text-3xl font-bold tracking-tight sm:text-4xl">
            Small demos, real patterns
          </h2>
          <p className="mt-3 text-muted">
            Health check curl for ops-minded visitors; code sample is
            illustrative—tune the snippet in{" "}
            <code className="text-[11px]">showcaseSnippet</code>.
          </p>
        </motion.div>

        <div className="mt-12 grid gap-8 lg:grid-cols-2">
          <motion.div
            initial={reduced ? false : { opacity: 0, y: 18 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.06 }}
          >
            <Card className="glass border-border/50">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Terminal className="h-5 w-5 text-primary" />
                  API health
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <p className="text-sm text-muted">
                  <kbd className="rounded border border-border/60 bg-background/50 px-1 font-mono text-xs">
                    GET
                  </kbd>{" "}
                  <code className="text-xs">/api/health</code> — JSON with{" "}
                  <code className="text-xs">ok</code>, short git SHA on Vercel,
                  and timestamp.
                </p>
                <div className="relative rounded-xl border border-border/50 bg-background/90 p-4">
                  <pre className="overflow-x-auto font-mono text-[11px] leading-relaxed text-foreground/90">
                    {curl}
                  </pre>
                  <Button
                    type="button"
                    size="sm"
                    variant="secondary"
                    className="absolute right-2 top-2 gap-1 text-xs"
                    onClick={() => void copyCurl()}
                  >
                    <Copy className="h-3.5 w-3.5" />
                    {copied ? "Copied" : "Copy"}
                  </Button>
                </div>
                {!origin && (
                  <p className="text-xs text-muted">
                    After load, the curl uses your current origin automatically.
                  </p>
                )}
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={reduced ? false : { opacity: 0, y: 18 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.1 }}
          >
            <CodeSnippetView
              title={showcaseSnippet.title}
              code={showcaseSnippet.code}
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
