import type { Metadata } from "next";
import type { ReactNode } from "react";

import { insuranceAiCaseStudy } from "@/lib/data";

export const metadata: Metadata = {
  title: insuranceAiCaseStudy.title,
  description: insuranceAiCaseStudy.subtitle,
};

export default function InsuranceAiLayout({ children }: { children: ReactNode }) {
  return children;
}
