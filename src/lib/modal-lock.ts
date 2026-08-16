import { useEffect, useSyncExternalStore } from "react";

/**
 * One counted registry for every modal/overlay on the site.
 *
 * Replaces the per-component `document.body.style.overflow` writes: those were
 * unkeyed, so whichever overlay unmounted first cleared the lock for all the
 * others. Doubles as the signal the floating WhatsApp button uses to get out of
 * the way — it renders at z-[200], above every modal panel.
 */

let openCount = 0;
const listeners = new Set<() => void>();

function setCount(next: number) {
  openCount = next;
  document.body.style.overflow = openCount > 0 ? "hidden" : "";
  listeners.forEach((l) => l());
}

/** Counts an open overlay: locks body scroll and hides the WhatsApp FAB while `open`. */
export function useModalLock(open: boolean) {
  useEffect(() => {
    if (!open) return;
    setCount(openCount + 1);
    return () => setCount(Math.max(0, openCount - 1));
  }, [open]);
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}

/** True while any overlay registered via `useModalLock` is open. */
export const useAnyModalOpen = () =>
  useSyncExternalStore(
    subscribe,
    () => openCount > 0,
    () => false,
  );
