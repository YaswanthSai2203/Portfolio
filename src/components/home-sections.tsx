"use client";

import { Suspense } from "react";

import { useRecruiterMode } from "@/components/recruiter-mode";
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
import { HeroSection } from "@/components/sections/hero-section";

export function HomeSections() {
  const { recruiterMode } = useRecruiterMode();

  if (recruiterMode) {
    return (
      <>
        <HeroSection />
        <AboutSection />
        <SkillsSection />
        <ExperienceSection />
        <CertificationsSection />
        <Suspense fallback={<div className="min-h-[40vh] border-t border-border/30" />}>
          <ProjectsSection />
        </Suspense>
        <ContactSection />
      </>
    );
  }

  return (
    <>
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
    </>
  );
}
