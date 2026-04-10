import type { Metadata, Viewport } from "next";
import { Inter, Poppins } from "next/font/google";

import { JsonLd } from "@/components/json-ld";
import { PortfolioShell } from "@/components/portfolio-shell";
import { RecruiterModeProvider } from "@/components/recruiter-mode";
import { ThemeProvider } from "@/components/theme-provider";
import { profile } from "@/lib/data";
import { getSiteUrl } from "@/lib/site";

import "./globals.css";

const siteTitle = `${profile.name} — ${profile.title}`;
const siteUrl = getSiteUrl();

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-poppins",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: siteTitle,
    template: `%s | ${profile.name}`,
  },
  description:
    "Senior full stack .NET engineer: ASP.NET Core, React, Angular, Azure, AWS, microservices, distributed systems, and production AI (LLM, RAG, OCR).",
  keywords: [
    "Full Stack Engineer",
    ".NET",
    "ASP.NET Core",
    "React",
    "Angular",
    "Azure",
    "AWS",
    "Microservices",
    "LLM",
    "RAG",
  ],
  authors: [{ name: profile.name, url: siteUrl }],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    url: siteUrl,
    locale: "en_US",
    siteName: `${profile.name} — Portfolio`,
    title: siteTitle,
    description:
      "Portfolio: scalable backends, cloud-native systems, and modern frontends across financial and healthcare domains.",
  },
  twitter: {
    card: "summary_large_image",
    title: siteTitle,
    description:
      "Portfolio: scalable backends, cloud-native systems, and modern frontends.",
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f8fafc" },
    { media: "(prefers-color-scheme: dark)", color: "#0b0f1a" },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${inter.variable} ${poppins.variable} min-h-dvh bg-background font-sans`}
      >
        <JsonLd />
        <ThemeProvider>
          <RecruiterModeProvider>
            <PortfolioShell>{children}</PortfolioShell>
          </RecruiterModeProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
