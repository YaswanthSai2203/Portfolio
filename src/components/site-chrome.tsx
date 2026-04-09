import * as React from "react";

import { CommandPalette } from "@/components/command-palette";
import { KonamiEasterEgg } from "@/components/konami-easter-egg";
import { PortfolioTerminal } from "@/components/portfolio-terminal";
import { StarShower } from "@/components/star-shower";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { ThemeCustomizer } from "@/components/theme-customizer";
export function SiteChrome({ children }: { children: React.ReactNode }) {
  return (
    <>
      <KonamiEasterEgg />
      <StarShower />
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[100] focus:rounded-lg focus:bg-primary focus:px-4 focus:py-2 focus:text-primary-foreground"
      >
        Skip to main content
      </a>
      <SiteHeader />
      <CommandPalette />
      <PortfolioTerminal />
      {children}
      <ThemeCustomizer />
      <SiteFooter />
    </>
  );
}
