"use client";

import { profile } from "@/lib/data";

import { useRecruiterMode } from "@/components/recruiter-mode";

export function SiteFooter() {
  const { recruiterMode } = useRecruiterMode();

  return (
    <footer className="border-t border-border/40 py-10 text-center text-xs text-muted">
      <p>
        © {new Date().getFullYear()} {profile.name}. Crafted with Next.js,
        Tailwind CSS, and Framer Motion.
      </p>
      {!recruiterMode && (
        <p className="mt-2 text-[11px]">
          Press <kbd className="rounded border border-border/50 px-1">?</kbd>{" "}
          to jump to any section ·{" "}
          <kbd className="rounded border border-border/50 px-1">`</kbd>{" "}
          opens the dev console.
        </p>
      )}
      {recruiterMode && (
        <p className="mt-2 text-[11px]">
          Recruiter view: toggle{" "}
          <span className="font-medium text-foreground/80">Full site</span> in
          the header for labs, AI, FAQ, and demos.
        </p>
      )}
    </footer>
  );
}
