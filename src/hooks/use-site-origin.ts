"use client";

import * as React from "react";

export function useSiteOrigin(): string {
  const [origin, setOrigin] = React.useState("");

  React.useEffect(() => {
    setOrigin(window.location.origin);
  }, []);

  return origin;
}
