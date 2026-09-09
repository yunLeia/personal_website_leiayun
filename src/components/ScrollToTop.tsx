import { useEffect, useLayoutEffect } from 'react';
import { useLocation, useNavigationType } from 'react-router-dom';

// Session-scoped scroll position cache, keyed by React Router's per-entry
// location.key. The browser's own back/forward scroll restoration is
// unreliable here: it fires before client-rendered content reaches its
// final height, so we track and restore positions ourselves instead.
const scrollPositions = new Map<string, number>();

export default function ScrollToTop() {
  const { pathname, hash, key } = useLocation();
  const navigationType = useNavigationType();

  // `html { scroll-behavior: smooth }` (index.css) makes even
  // `window.scrollTo(0, 0)` glide instead of jump, which is what looked
  // like the page sliding up on every navigation. `behavior: 'instant'`
  // overrides that. Runs in useLayoutEffect (before paint, and before
  // nested useScrollReveal checks) so sections compute their in-viewport
  // state against the new page's scroll position, not the old one.
  useLayoutEffect(() => {
    // Prevent the browser from fighting our own restoration below.
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }
    if (hash) return;
    const target = navigationType === 'POP' ? scrollPositions.get(key) ?? 0 : 0;
    window.scrollTo({ top: target, left: 0, behavior: 'instant' });
  }, [pathname, hash, key, navigationType]);

  // Keep the cache up to date so it's there if the user leaves and comes
  // back via back/forward.
  useEffect(() => {
    const onScroll = () => scrollPositions.set(key, window.scrollY);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [key]);

  useEffect(() => {
    if (!hash) return;
    const timer = setTimeout(() => {
      const el = document.querySelector(hash);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }, 50);
    return () => clearTimeout(timer);
  }, [pathname, hash]);

  return null;
}
