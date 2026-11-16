import { useEffect, useRef } from "react";

/** Runs `then` once, `ms` after `what` last became something; never while it is null. */
export const useAfter = (what: unknown, ms: number, then: () => void): void => {
  const latest = useRef(then);
  latest.current = then;
  useEffect(() => {
    if (what === null) return;
    const timer = setTimeout(() => latest.current(), ms);
    return () => clearTimeout(timer);
  }, [what, ms]);
};
