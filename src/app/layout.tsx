import type { Metadata, Viewport } from "next";
import { Inter, Poppins } from "next/font/google";

import { ThemeProvider } from "@/components/theme-provider";

import "./globals.css";

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
  metadataBase: new URL("https://example.com"),
  title: {
    default: "Alex Morgan — Full Stack .NET Engineer",
    template: "%s | Alex Morgan",
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
  authors: [{ name: "Alex Morgan" }],
  openGraph: {
    type: "website",
    locale: "en_US",
    title: "Alex Morgan — Full Stack .NET Engineer",
    description:
      "Portfolio: scalable backends, cloud-native systems, and modern frontends across financial and healthcare domains.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Alex Morgan — Full Stack .NET Engineer",
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
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
