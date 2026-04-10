"use client";

import { Search } from "lucide-react";
import * as React from "react";

import { siteNav } from "@/lib/nav";
import { cn } from "@/lib/utils";

import {
  filterNavForRecruiterMode,
  useRecruiterMode,
} from "@/components/recruiter-mode";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

export function CommandPalette() {
  const { recruiterMode } = useRecruiterMode();
  const [open, setOpen] = React.useState(false);
  const [q, setQ] = React.useState("");
  const inputRef = React.useRef<HTMLInputElement>(null);

  const navItems = React.useMemo(
    () => filterNavForRecruiterMode(siteNav, recruiterMode),
    [recruiterMode],
  );

  React.useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key !== "?") return;
      const t = e.target as HTMLElement | null;
      if (
        t &&
        (t.tagName === "INPUT" ||
          t.tagName === "TEXTAREA" ||
          t.isContentEditable)
      ) {
        return;
      }
      e.preventDefault();
      setOpen((o) => !o);
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  React.useEffect(() => {
    if (open) {
      setQ("");
      window.setTimeout(() => inputRef.current?.focus(), 0);
    }
  }, [open]);

  const filtered = React.useMemo(() => {
    const s = q.trim().toLowerCase();
    if (!s) return [...navItems];
    return navItems.filter(
      (n) =>
        n.label.toLowerCase().includes(s) ||
        n.href.toLowerCase().includes(s),
    );
  }, [q, navItems]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent
        className="top-[20%] max-w-md translate-y-0 gap-0 p-0 sm:max-w-md"
        onCloseAutoFocus={(e) => e.preventDefault()}
      >
        <DialogHeader className="sr-only">
          <DialogTitle>Jump to section</DialogTitle>
          <DialogDescription>
            Search or pick a section to scroll to. Press question mark to
            toggle.
          </DialogDescription>
        </DialogHeader>
        <div className="flex items-center gap-2 border-b border-border/50 px-3 py-2">
          <Search className="h-4 w-4 shrink-0 text-muted" />
          <input
            ref={inputRef}
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Filter sections…"
            className="flex-1 bg-transparent py-2 text-sm outline-none placeholder:text-muted"
            aria-autocomplete="list"
          />
          <kbd className="hidden rounded border border-border/60 bg-background/50 px-1.5 py-0.5 font-mono text-[10px] text-muted sm:inline">
            ?
          </kbd>
        </div>
        <ul
          className="max-h-64 overflow-y-auto p-2"
          role="listbox"
          aria-label="Sections"
        >
          {filtered.map((item) => (
            <li key={item.href}>
              <a
                href={item.href}
                onClick={() => setOpen(false)}
                className={cn(
                  "flex w-full rounded-lg px-3 py-2.5 text-left text-sm text-foreground",
                  "hover:bg-primary/10 focus:bg-primary/10 focus:outline-none",
                )}
              >
                <span>{item.label}</span>
                <span className="ml-auto text-xs text-muted">{item.href}</span>
              </a>
            </li>
          ))}
          {filtered.length === 0 && (
            <li className="px-3 py-4 text-center text-sm text-muted">
              No matches
            </li>
          )}
        </ul>
      </DialogContent>
    </Dialog>
  );
}
