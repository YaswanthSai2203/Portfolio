"use client";

import dynamic from "next/dynamic";

export const AboutSection = dynamic(
  () =>
    import("@/components/sections/about-section").then((m) => ({
      default: m.AboutSection,
    })),
  { ssr: true, loading: () => <SectionSkeleton /> },
);

export const SkillsSection = dynamic(
  () =>
    import("@/components/sections/skills-section").then((m) => ({
      default: m.SkillsSection,
    })),
  { ssr: true, loading: () => <SectionSkeleton tall /> },
);

export const ExperienceSection = dynamic(
  () =>
    import("@/components/sections/experience-section").then((m) => ({
      default: m.ExperienceSection,
    })),
  { ssr: true, loading: () => <SectionSkeleton tall /> },
);

export const ProjectsSection = dynamic(
  () =>
    import("@/components/sections/projects-section").then((m) => ({
      default: m.ProjectsSection,
    })),
  { ssr: true, loading: () => <SectionSkeleton tall /> },
);

export const AISection = dynamic(
  () =>
    import("@/components/sections/ai-section").then((m) => ({
      default: m.AISection,
    })),
  { ssr: true, loading: () => <SectionSkeleton /> },
);

export const ContactSection = dynamic(
  () =>
    import("@/components/sections/contact-section").then((m) => ({
      default: m.ContactSection,
    })),
  { ssr: true, loading: () => <SectionSkeleton tall /> },
);

function SectionSkeleton({ tall }: { tall?: boolean }) {
  return (
    <div
      className="border-t border-border/30 py-24"
      aria-hidden
    >
      <div className="mx-auto max-w-6xl animate-pulse px-4 sm:px-6">
        <div className="h-4 w-24 rounded bg-border/50" />
        <div className="mt-4 h-10 max-w-md rounded-lg bg-border/40" />
        <div className="mt-4 h-4 max-w-xl rounded bg-border/30" />
        <div
          className={`mt-12 rounded-2xl bg-border/20 ${tall ? "h-72" : "h-48"}`}
        />
      </div>
    </div>
  );
}
