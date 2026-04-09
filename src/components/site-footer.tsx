import { profile } from "@/lib/data";

export function SiteFooter() {
  return (
    <footer className="border-t border-border/40 py-10 text-center text-xs text-muted">
      <p>
        © {new Date().getFullYear()} {profile.name}. Crafted with Next.js,
        Tailwind CSS, and Framer Motion.
      </p>
      <p className="mt-2 text-[11px]">
        Press <kbd className="rounded border border-border/50 px-1">?</kbd>{" "}
        to jump to any section ·{" "}
        <kbd className="rounded border border-border/50 px-1">`</kbd>{" "}
        opens the dev console.
      </p>
    </footer>
  );
}
