import { profile } from "@/lib/data";

export function SiteFooter() {
  return (
    <footer className="border-t border-border/40 py-10 text-center text-xs text-muted">
      <p>
        © {new Date().getFullYear()} {profile.name}. Crafted with Next.js,
        Tailwind CSS, and Framer Motion.
      </p>
    </footer>
  );
}
