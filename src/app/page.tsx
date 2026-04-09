import { Suspense } from "react";

import { HeroSection } from "@/components/sections/hero-section";
import { SiteChrome } from "@/components/site-chrome";
import {
  AboutSection,
  AISection,
  CertificationsSection,
  ContactSection,
  CredibilitySection,
  EngineeringLabSection,
  ExperienceSection,
  ImpactSection,
  PhilosophySection,
  ProjectsSection,
  RecruiterFaqSection,
  ScalableSystemsSection,
  SkillsSection,
} from "@/components/lazy-sections";

export default function HomePage() {
  return (
    <SiteChrome>
      <main id="main">
        <HeroSection />
        <AboutSection />
        <SkillsSection />
        <ExperienceSection />
        <ImpactSection />
        <CertificationsSection />
        <PhilosophySection />
        <ScalableSystemsSection />
        <Suspense fallback={<div className="min-h-[40vh] border-t border-border/30" />}>
          <ProjectsSection />
        </Suspense>
        <AISection />
        <CredibilitySection />
        <EngineeringLabSection />
        <RecruiterFaqSection />
        <ContactSection />
      </main>
    </SiteChrome>
  );
}
