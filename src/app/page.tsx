import { HeroSection } from "@/components/sections/hero-section";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import {
  AboutSection,
  AISection,
  CertificationsSection,
  ContactSection,
  ExperienceSection,
  PhilosophySection,
  ProjectsSection,
  ScalableSystemsSection,
  SkillsSection,
} from "@/components/lazy-sections";

export default function HomePage() {
  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[100] focus:rounded-lg focus:bg-primary focus:px-4 focus:py-2 focus:text-primary-foreground"
      >
        Skip to main content
      </a>
      <SiteHeader />
      <main id="main">
        <HeroSection />
        <AboutSection />
        <SkillsSection />
        <ExperienceSection />
        <CertificationsSection />
        <PhilosophySection />
        <ScalableSystemsSection />
        <ProjectsSection />
        <AISection />
        <ContactSection />
      </main>
      <SiteFooter />
    </>
  );
}
