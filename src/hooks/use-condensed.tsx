import { useCallback, useEffect, useState } from "react";

const STORAGE_KEY = "aaxiiom:condensed";
const EVENT = "aaxiiom:condensed-change";

/**
 * Global "condensed mode" preference.
 * When on, long-form content collapses into expandable cards.
 */
export function useCondensed() {
  const [condensed, setCondensed] = useState(false);

  useEffect(() => {
    const read = () => setCondensed(window.localStorage.getItem(STORAGE_KEY) === "1");
    read();
    window.addEventListener(EVENT, read);
    window.addEventListener("storage", read);
    return () => {
      window.removeEventListener(EVENT, read);
      window.removeEventListener("storage", read);
    };
  }, []);

  const toggle = useCallback(() => {
    const next = window.localStorage.getItem(STORAGE_KEY) === "1" ? "0" : "1";
    window.localStorage.setItem(STORAGE_KEY, next);
    window.dispatchEvent(new Event(EVENT));
  }, []);

  return { condensed, toggle };
}
