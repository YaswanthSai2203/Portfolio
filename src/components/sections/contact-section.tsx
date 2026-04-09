"use client";

import { motion, useInView } from "framer-motion";
import { AlertCircle, CheckCircle2, Github, Linkedin, Loader2, Mail, Send } from "lucide-react";
import * as React from "react";

import { profile } from "@/lib/data";
import { useReducedMotion } from "@/hooks/use-reduced-motion";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

type SubmitState =
  | { kind: "idle" }
  | { kind: "sending" }
  | { kind: "success" }
  | { kind: "error"; message: string; showMailto?: boolean };

export function ContactSection() {
  const reduced = useReducedMotion();
  const ref = React.useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const [state, setState] = React.useState<SubmitState>({ kind: "idle" });

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const fd = new FormData(form);
    const name = String(fd.get("name") ?? "").trim();
    const email = String(fd.get("email") ?? "").trim();
    const message = String(fd.get("message") ?? "").trim();
    const website = String(fd.get("website") ?? "").trim();

    setState({ kind: "sending" });

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, message, website }),
      });
      const data = (await res.json()) as {
        ok?: boolean;
        error?: string;
        code?: string;
      };

      if (res.ok && data.ok) {
        setState({ kind: "success" });
        form.reset();
        window.setTimeout(() => setState({ kind: "idle" }), 8000);
        return;
      }

      const showMailto = data.code === "NOT_CONFIGURED";
      setState({
        kind: "error",
        message:
          data.error ??
          "Something went wrong. Please try again or use email below.",
        showMailto,
      });
    } catch {
      setState({
        kind: "error",
        message: "Network error. Check your connection or email me directly.",
      });
    }
  }

  const mailtoHref = `mailto:${profile.email}?subject=${encodeURIComponent("Portfolio inquiry")}`;

  return (
    <section
      id="contact"
      className="scroll-mt-28 border-t border-border/40 bg-background py-24 pb-32"
    >
      <div ref={ref} className="mx-auto max-w-6xl px-4 sm:px-6">
        <motion.div
          initial={reduced ? false : { opacity: 0, y: 14 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
        >
          <p className="text-sm font-medium uppercase tracking-widest text-primary">
            Contact
          </p>
          <h2 className="mt-2 font-display text-3xl font-bold tracking-tight sm:text-4xl">
            Let&apos;s build something reliable
          </h2>
          <p className="mt-3 max-w-2xl text-muted">
            Send a message through the form (delivered to my inbox when email is
            configured on the server) or reach out via the links.
          </p>
        </motion.div>

        <div className="mt-12 grid gap-8 lg:grid-cols-2">
          <motion.div
            initial={reduced ? false : { opacity: 0, x: -12 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.08 }}
          >
            <Card className="glass h-full border-border/50">
              <CardHeader>
                <CardTitle className="text-lg">Direct links</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <a
                  href={`mailto:${profile.email}`}
                  className="flex items-center gap-3 rounded-xl border border-border/50 bg-background/30 p-4 text-sm transition-colors hover:border-primary/40"
                >
                  <Mail className="h-5 w-5 text-primary" />
                  <div>
                    <p className="text-xs uppercase tracking-wide text-muted">
                      Email
                    </p>
                    <p className="font-medium text-foreground">
                      {profile.email}
                    </p>
                  </div>
                </a>
                <a
                  href={profile.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-3 rounded-xl border border-border/50 bg-background/30 p-4 text-sm transition-colors hover:border-primary/40"
                >
                  <Linkedin className="h-5 w-5 text-primary" />
                  <div>
                    <p className="text-xs uppercase tracking-wide text-muted">
                      LinkedIn
                    </p>
                    <p className="font-medium text-foreground">Profile</p>
                  </div>
                </a>
                <a
                  href={profile.github}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-3 rounded-xl border border-border/50 bg-background/30 p-4 text-sm transition-colors hover:border-primary/40"
                >
                  <Github className="h-5 w-5 text-primary" />
                  <div>
                    <p className="text-xs uppercase tracking-wide text-muted">
                      GitHub
                    </p>
                    <p className="font-medium text-foreground">Repositories</p>
                  </div>
                </a>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={reduced ? false : { opacity: 0, x: 12 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.12 }}
          >
            <Card className="glass border-border/50 neu-inset">
              <CardHeader>
                <CardTitle className="text-lg">Message</CardTitle>
              </CardHeader>
              <CardContent>
                {state.kind === "success" && (
                  <div
                    className="mb-4 flex items-start gap-2 rounded-lg border border-emerald-500/30 bg-emerald-500/10 p-3 text-sm text-foreground"
                    role="status"
                  >
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-500" />
                    <span>Thanks — your message was sent. I&apos;ll get back to you soon.</span>
                  </div>
                )}
                {state.kind === "error" && (
                  <div
                    className="mb-4 flex flex-col gap-2 rounded-lg border border-amber-500/30 bg-amber-500/10 p-3 text-sm text-foreground"
                    role="alert"
                  >
                    <div className="flex items-start gap-2">
                      <AlertCircle className="mt-0.5 h-4 w-4 shrink-0 text-amber-500" />
                      <span>{state.message}</span>
                    </div>
                    {state.showMailto && (
                      <a
                        href={mailtoHref}
                        className="ml-6 text-sm font-medium text-primary underline-offset-4 hover:underline"
                      >
                        Open email to {profile.email}
                      </a>
                    )}
                  </div>
                )}
                <form onSubmit={handleSubmit} className="space-y-4">
                  <p className="hidden" aria-hidden="true">
                    <label htmlFor="contact-website">Website</label>
                    <input
                      id="contact-website"
                      name="website"
                      type="text"
                      tabIndex={-1}
                      autoComplete="off"
                    />
                  </p>
                  <div className="space-y-2">
                    <Label htmlFor="name">Name</Label>
                    <Input
                      id="name"
                      name="name"
                      required
                      autoComplete="name"
                      placeholder="Your name"
                      disabled={state.kind === "sending"}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      required
                      autoComplete="email"
                      placeholder="you@company.com"
                      disabled={state.kind === "sending"}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="message">How can I help?</Label>
                    <Textarea
                      id="message"
                      name="message"
                      required
                      minLength={10}
                      placeholder="A few lines on the opportunity, stack, or timeline."
                      disabled={state.kind === "sending"}
                    />
                  </div>
                  <Button
                    type="submit"
                    className="w-full sm:w-auto"
                    disabled={state.kind === "sending"}
                  >
                    {state.kind === "sending" ? (
                      <Loader2 className="h-4 w-4 animate-spin" />
                    ) : (
                      <Send className="h-4 w-4" />
                    )}
                    {state.kind === "sending" ? "Sending…" : "Send message"}
                  </Button>
                  <p className="text-xs text-muted">
                    Hosts need{" "}
                    <code className="rounded bg-background/80 px-1 py-0.5 text-[11px]">
                      RESEND_API_KEY
                    </code>{" "}
                    +{" "}
                    <code className="rounded bg-background/80 px-1 py-0.5 text-[11px]">
                      CONTACT_FROM_EMAIL
                    </code>{" "}
                    (see <code className="text-[11px]">.env.example</code>) or a{" "}
                    <code className="text-[11px]">CONTACT_WEBHOOK_URL</code>.
                  </p>
                </form>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
