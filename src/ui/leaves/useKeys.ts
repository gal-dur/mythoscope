import { useEffect, useRef } from "react";

/** Reports each key pressed anywhere but in a text field, by its name. */
export const useKeys = (onKey: (key: string) => void): void => {
  const latest = useRef(onKey);
  latest.current = onKey;
  useEffect(() => {
    const listen = (event: KeyboardEvent) => {
      const target = event.target;
      if (target instanceof HTMLInputElement || target instanceof HTMLTextAreaElement) return;
      latest.current(event.key);
    };
    window.addEventListener("keydown", listen);
    return () => window.removeEventListener("keydown", listen);
  }, []);
};
