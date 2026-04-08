"use client";

import * as React from "react";

export function useCountUp(
  end: number,
  durationMs: number,
  enabled: boolean,
): number {
  const [value, setValue] = React.useState(0);

  React.useEffect(() => {
    if (!enabled) {
      setValue(0);
      return;
    }
    if (durationMs <= 0) {
      setValue(end);
      return;
    }
    let start: number | null = null;
    let frame: number;
    const step = (t: number) => {
      if (start === null) start = t;
      const p = Math.min((t - start) / durationMs, 1);
      const eased = 1 - (1 - p) ** 3;
      setValue(Math.round(eased * end));
      if (p < 1) frame = requestAnimationFrame(step);
    };
    frame = requestAnimationFrame(step);
    return () => cancelAnimationFrame(frame);
  }, [end, durationMs, enabled]);

  return value;
}
