import { useSyncExternalStore } from 'react';

const mql = typeof window !== 'undefined'
  ? window.matchMedia('(max-width: 768px)')
  : null;

let isMobileSnapshot = mql?.matches || false;

function subscribe(cb: () => void) {
  const handler = (e: MediaQueryListEvent) => {
    isMobileSnapshot = e.matches;
    cb();
  };
  mql?.addEventListener('change', handler);
  return () => mql?.removeEventListener('change', handler);
}

function getSnapshot() {
  return isMobileSnapshot;
}

/**
 * Shared mobile detection hook — uses a single MediaQueryList listener
 * instead of one per component instance (DesktopIcon, App, etc.)
 */
export function useIsMobile() {
  return useSyncExternalStore(subscribe, getSnapshot, () => false);
}
