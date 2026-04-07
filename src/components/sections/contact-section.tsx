"use client";

import { motion, useInView } from "framer-motion";
import { Github, Linkedin, Mail, Send } from "lucide-react";
import * as React from "react";

import { profile } from "@/lib/data";
import { useReducedMotion } from "@/hooks/use-reduced-motion";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export function ContactSection() {
  const reduced = useReducedMotion();
  const ref = React.useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const [status, setStatus] = React.useState<"idle" | "sent">("idle");

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sent");
    window.setTimeout(() => setStatus("idle"), 4000);
  }

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
            Reach out directly or use the form—submission is mocked on the
            client and ready to wire to your API route or form backend.
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
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Name</Label>
                    <Input
                      id="name"
                      name="name"
                      required
                      autoComplete="name"
                      placeholder="Your name"
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
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="message">How can I help?</Label>
                    <Textarea
                      id="message"
                      name="message"
                      required
                      placeholder="A few lines on the opportunity, stack, or timeline."
                    />
                  </div>
                  <Button type="submit" className="w-full sm:w-auto">
                    <Send className="h-4 w-4" />
                    {status === "sent" ? "Thanks — message captured" : "Send message"}
                  </Button>
                  <p className="text-xs text-muted">
                    Mock submit: connect to{" "}
                    <code className="rounded bg-background/80 px-1 py-0.5 text-[11px]">
                      app/api/contact/route.ts
                    </code>{" "}
                    or a serverless function when you are ready.
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
