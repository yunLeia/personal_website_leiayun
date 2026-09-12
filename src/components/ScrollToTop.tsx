import { useEffect, useLayoutEffect } from 'react';
import { useLocation, useNavigationType } from 'react-router-dom';

const scrollPositions = new Map<string, number>();
const storageKey = (key: string, pathname: string) => `portfolio-scroll:${key}:${pathname}`;

export default function ScrollToTop() {
  const { pathname, hash, key, state } = useLocation();
  const navigationType = useNavigationType();

  useLayoutEffect(() => {
    window.history.scrollRestoration = 'manual';
    let saved = scrollPositions.get(key);
    if (saved === undefined) {
      try {
        const stored = sessionStorage.getItem(storageKey(key, pathname));
        if (stored !== null) saved = Number(stored);
      } catch { /* Scroll restoration still works without browser storage. */ }
    }
    // Restore before paint, without animating the journey from the page top.
    if (navigationType === 'POP' && saved !== undefined && Number.isFinite(saved)) {
      window.scrollTo({ top: saved, left: 0, behavior: 'instant' });
      return;
    }
    const section = (state as { section?: string } | null)?.section;
    const target = document.getElementById(section || hash.slice(1));
    if (target) target.scrollIntoView({ behavior: 'instant' });
    else window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  }, [pathname, hash, key, state, navigationType]);

  useEffect(() => {
    const save = () => {
      scrollPositions.set(key, window.scrollY);
      try { sessionStorage.setItem(storageKey(key, pathname), String(window.scrollY)); } catch { /* Storage is optional. */ }
    };
    window.addEventListener('scroll', save, { passive: true });
    window.addEventListener('pagehide', save);
    return () => {
      window.removeEventListener('scroll', save);
      window.removeEventListener('pagehide', save);
    };
  }, [key, pathname]);

  return null;
}
