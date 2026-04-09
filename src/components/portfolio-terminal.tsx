"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Terminal } from "lucide-react";
import { useTheme } from "next-themes";
import * as React from "react";

import { profile, projects } from "@/lib/data";
import { appVersion } from "@/lib/app-version";

type Line = { kind: "in" | "out" | "err"; text: string };

const BANNER = `
   ██████╗ ██████╗ ██████╗ ████████╗███████╗ ██████╗ ██╗     ██╗ ██████╗
   ██╔══██╗██╔══██╗██╔══██╗╚══██╔══╝██╔════╝██╔═══██╗██║     ██║██╔════╝
   ██████╔╝██████╔╝██████╔╝   ██║   █████╗  ██║   ██║██║     ██║██║     
   ██╔═══╝ ██╔══██╗██╔═══╝    ██║   ██╔══╝  ██║   ██║██║     ██║██║     
   ██║     ██║  ██║██║        ██║   ██║     ╚██████╔╝███████╗██║╚██████╗
   ╚═╝     ╚═╝  ╚═╝╚═╝        ╚═╝   ╚═╝      ╚═════╝ ╚══════╝╚═╝ ╚═════╝
`.trim();

function isTypingTarget(el: EventTarget | null): boolean {
  if (!el || !(el instanceof HTMLElement)) return false;
  const tag = el.tagName;
  if (tag === "INPUT" || tag === "TEXTAREA" || tag === "SELECT") return true;
  return el.isContentEditable;
}

export function PortfolioTerminal() {
  const { setTheme, resolvedTheme } = useTheme();
  const [open, setOpen] = React.useState(false);
  const [lines, setLines] = React.useState<Line[]>([]);
  const [input, setInput] = React.useState("");
  const [hist, setHist] = React.useState<string[]>([]);
  const [histIdx, setHistIdx] = React.useState(-1);
  const scrollRef = React.useRef<HTMLDivElement>(null);
  const inputRef = React.useRef<HTMLInputElement>(null);
  const booted = React.useRef(false);

  React.useEffect(() => {
    if (open && !booted.current) {
      booted.current = true;
      setLines([
        { kind: "out", text: BANNER },
        {
          kind: "out",
          text: "Portfolio CLI — type `help`. Press ` (backtick) or Esc to close.",
        },
      ]);
    }
  }, [open]);

  React.useEffect(() => {
    if (open) {
      window.setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [open]);

  React.useEffect(() => {
    scrollRef.current?.scrollTo({
      top: scrollRef.current.scrollHeight,
      behavior: "smooth",
    });
  }, [lines, open]);

  React.useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape" && open) {
        e.preventDefault();
        setOpen(false);
        return;
      }
      if (e.key === "`" && !e.repeat) {
        if (isTypingTarget(e.target)) return;
        e.preventDefault();
        setOpen((o) => !o);
      }
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  async function runCommand(raw: string) {
    const trimmed = raw.trim();
    if (!trimmed) return;

    setLines((L) => [...L, { kind: "in", text: `> ${trimmed}` }]);
    setHist((h) => [...h.filter((x) => x !== trimmed), trimmed].slice(-50));
    setHistIdx(-1);

    const [cmd, ...rest] = trimmed.split(/\s+/);
    const arg = rest.join(" ").trim();
    const lower = cmd.toLowerCase();

    const out = (text: string) =>
      setLines((L) => [...L, { kind: "out", text }]);
    const err = (text: string) =>
      setLines((L) => [...L, { kind: "err", text }]);

    switch (lower) {
      case "help":
        out(
          [
            "Commands:",
            "  help              — this list",
            "  whoami            — headline bio",
            "  stack             — core stack one-liner",
            "  projects          — shipped work titles",
            "  open <id>         — scroll to #section (e.g. open projects)",
            "  health            — fetch GET /api/health",
            "  theme <dark|light> — toggle site theme",
            "  resume            — download resume (same as hero)",
            "  joke              — tiny easter egg",
            "  deps              — site dependency stack (package.json)",
            "  specs             — fake-but-fun system spec",
            "  hire              — copy mailto + LinkedIn to clipboard",
            "  blueprint         — toggle blueprint grid overlay",
            "  star              — thank-you animation (try it)",
            "  clear             — clear output",
            "  exit | quit       — close console",
            "",
            "Hotkeys (outside inputs): ` console · g blueprint grid",
          ].join("\n"),
        );
        break;
      case "whoami":
        out(`${profile.name} — ${profile.title}\n${profile.location}`);
        break;
      case "stack":
        out(
          "C# · ASP.NET Core · React · Angular · Azure · AWS · Docker · K8s · SQL · event-driven · LLM/RAG",
        );
        break;
      case "projects":
        out(projects.map((p) => `• ${p.id}: ${p.title}`).join("\n"));
        break;
      case "open": {
        const id = arg.replace(/^#/, "");
        const map: Record<string, string> = {
          top: "#top",
          home: "#top",
          about: "#about",
          skills: "#skills",
          experience: "#experience",
          impact: "#impact",
          certs: "#certifications",
          certifications: "#certifications",
          philosophy: "#philosophy",
          values: "#philosophy",
          systems: "#scalable-systems",
          projects: "#projects",
          ai: "#ai",
          learning: "#credibility",
          lab: "#engineering-lab",
          faq: "#recruiter-faq",
          contact: "#contact",
        };
        const hash = map[id.toLowerCase()];
        if (!hash) {
          err(`Unknown section: ${id}. Try: projects, contact, lab, …`);
        } else {
          window.location.hash = hash;
          out(`Scrolling to ${hash}`);
        }
        break;
      }
      case "health":
        out("Fetching /api/health …");
        try {
          const r = await fetch("/api/health");
          const j = await r.json();
          out(JSON.stringify(j, null, 2));
        } catch {
          err("Request failed (offline or blocked).");
        }
        break;
      case "theme":
        if (arg.toLowerCase() === "dark" || arg.toLowerCase() === "light") {
          setTheme(arg.toLowerCase());
          out(`theme → ${arg.toLowerCase()}`);
        } else {
          err("usage: theme dark | theme light");
        }
        break;
      case "resume":
        window.location.assign("/api/resume");
        out("Opening resume download…");
        break;
      case "joke":
        out(
          "Why do programmers prefer dark mode?\nBecause light attracts bugs. (Also: fewer photons, more focus.)",
        );
        break;
      case "deps":
        out(
          [
            `portfolio@${appVersion}`,
            "next · react · typescript · tailwindcss v4",
            "framer-motion · three · @react-three/fiber · drei",
            "radix-ui · lucide-react · resend (contact) · qrcode",
          ].join("\n"),
        );
        break;
      case "specs":
        out(
          [
            "PORTFOLIO_SPEC v0.9 (tongue-in-cheek)",
            "─────────────────────────────────────",
            "Availability: 99.9% (when Vercel says so)",
            "Latency to impress: <10s first scroll",
            "Concurrency: one human, many tabs",
            "Storage: mostly vibes + git",
            "Compliance: recruiter-friendly, no blockchain",
          ].join("\n"),
        );
        break;
      case "hire": {
        const mail = `mailto:${profile.email}?subject=${encodeURIComponent("Role discussion — " + profile.name)}`;
        const text = `${profile.name}\n${profile.title}\n${profile.email}\n${profile.linkedin}`;
        try {
          await navigator.clipboard.writeText(text);
          out(
            `Copied to clipboard:\n${text}\n\nPrimary mailto (tap on mobile):\n${mail}`,
          );
        } catch {
          err("Clipboard blocked — copy manually from the contact card.");
        }
        break;
      }
      case "blueprint":
        window.dispatchEvent(new CustomEvent("portfolio-blueprint"));
        out(
          "Toggled blueprint grid (same as hotkey g outside inputs). Run again to turn off.",
        );
        break;
      case "star": {
        window.dispatchEvent(new CustomEvent("portfolio-star"));
        out("★ ★ ★  Thanks for the energy — check the top of the page.");
        break;
      }
      case "clear":
        setLines([]);
        break;
      case "exit":
      case "quit":
        setOpen(false);
        break;
      default:
        err(
          `Unknown command: ${cmd}. Type \`help\` — yes, the backtick key toggles this console.`,
        );
    }
  }

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    const v = input;
    setInput("");
    void runCommand(v);
  }

  function onInputKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "ArrowUp" && hist.length > 0) {
      e.preventDefault();
      setHistIdx((i) => {
        const next = Math.min(hist.length - 1, i < 0 ? hist.length - 1 : i - 1);
        const cmd = hist[next] ?? "";
        window.setTimeout(() => setInput(cmd), 0);
        return next;
      });
    } else if (e.key === "ArrowDown" && hist.length > 0) {
      e.preventDefault();
      setHistIdx((i) => {
        if (i < 0) return -1;
        const next = i + 1;
        if (next >= hist.length) {
          window.setTimeout(() => setInput(""), 0);
          return -1;
        }
        window.setTimeout(() => setInput(hist[next] ?? ""), 0);
        return next;
      });
    }
  }

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="fixed bottom-6 left-4 z-[59] flex h-12 w-12 items-center justify-center rounded-full border border-border/60 bg-card/90 text-primary shadow-lg backdrop-blur-sm transition-colors hover:border-primary/40 hover:bg-card sm:left-6"
        aria-label={open ? "Close portfolio console" : "Open portfolio console"}
        aria-expanded={open}
        title="Portfolio console (`)"
      >
        <Terminal className="h-5 w-5" />
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 16 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-x-0 bottom-0 z-[58] max-h-[min(52vh,520px)] border-t border-primary/30 bg-[oklch(0.08_0.03_260)] shadow-[0_-20px_60px_oklch(0_0_0/0.5)] light:bg-zinc-950"
            role="dialog"
            aria-label="Portfolio developer console"
          >
            <div className="flex items-center justify-between border-b border-border/40 px-3 py-2">
              <span className="font-mono text-[11px] text-muted">
                portfolio@dev — zsh — 80×24
              </span>
              <span className="text-[10px] text-muted">
                theme: {resolvedTheme ?? "…"} · Esc close
              </span>
            </div>
            <div
              ref={scrollRef}
              className="h-[min(38vh,400px)] overflow-y-auto px-3 py-2 font-mono text-[11px] leading-relaxed sm:text-xs"
            >
              {lines.map((line, i) => (
                <pre
                  key={i}
                  className={
                    line.kind === "in"
                      ? "mb-1 text-accent"
                      : line.kind === "err"
                        ? "mb-2 whitespace-pre-wrap text-red-400"
                        : "mb-2 whitespace-pre-wrap text-emerald-100/90 light:text-emerald-900"
                  }
                >
                  {line.text}
                </pre>
              ))}
            </div>
            <form
              onSubmit={onSubmit}
              className="flex items-center gap-2 border-t border-border/40 bg-black/20 px-3 py-2 light:bg-black/10"
            >
              <span className="shrink-0 font-mono text-accent">$</span>
              <input
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={onInputKeyDown}
                className="min-w-0 flex-1 bg-transparent font-mono text-xs text-foreground outline-none placeholder:text-muted sm:text-sm"
                placeholder="help · whoami · open projects · health"
                autoComplete="off"
                spellCheck={false}
                aria-label="Console command"
              />
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
