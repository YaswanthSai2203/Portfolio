"use client";

import * as React from "react";

const STORAGE_KEY = "portfolio-recruiter-mode";

type Ctx = {
  recruiterMode: boolean;
  setRecruiterMode: (v: boolean) => void;
  toggleRecruiterMode: () => void;
};

const RecruiterModeContext = React.createContext<Ctx | null>(null);

export function RecruiterModeProvider({ children }: { children: React.ReactNode }) {
  const [recruiterMode, setRecruiterModeState] = React.useState(true);

  React.useEffect(() => {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw === "false") setRecruiterModeState(false);
  }, []);

  const setRecruiterMode = React.useCallback((v: boolean) => {
    setRecruiterModeState(v);
    localStorage.setItem(STORAGE_KEY, v ? "true" : "false");
  }, []);

  const toggleRecruiterMode = React.useCallback(() => {
    setRecruiterModeState((prev) => {
      const next = !prev;
      localStorage.setItem(STORAGE_KEY, next ? "true" : "false");
      return next;
    });
  }, []);

  const value = React.useMemo(
    () => ({ recruiterMode, setRecruiterMode, toggleRecruiterMode }),
    [recruiterMode, setRecruiterMode, toggleRecruiterMode],
  );

  return (
    <RecruiterModeContext.Provider value={value}>
      {children}
    </RecruiterModeContext.Provider>
  );
}

export function useRecruiterMode(): Ctx {
  const ctx = React.useContext(RecruiterModeContext);
  if (!ctx) {
    throw new Error("useRecruiterMode must be used within RecruiterModeProvider");
  }
  return ctx;
}

/** Hrefs visible in recruiter-focused view (subset of site). */
export const RECRUITER_NAV_HREFS = new Set([
  "#top",
  "#about",
  "#skills",
  "#experience",
  "#certifications",
  "#projects",
  "#contact",
]);

export function filterNavForRecruiterMode<T extends { href: string }>(
  items: readonly T[],
  recruiterMode: boolean,
): T[] {
  if (!recruiterMode) return [...items];
  return items.filter((item) => RECRUITER_NAV_HREFS.has(item.href));
}
