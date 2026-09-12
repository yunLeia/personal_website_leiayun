import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';

interface OutlineItem { id: string; label: string }

export default function Outline() {
  const [items, setItems] = useState<OutlineItem[]>([]);
  const [activeId, setActiveId] = useState('');
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const linksRef = useRef<HTMLElement>(null);

  useEffect(() => {
    let frame = 0;
    let elements: HTMLElement[] = [];
    const updateActive = () => {
      frame = 0;
      let current = elements[0]?.id || '';
      for (const element of elements) {
        if (element.getBoundingClientRect().top <= 160) current = element.id;
      }
      if (window.scrollY + window.innerHeight >= document.documentElement.scrollHeight - 4) current = elements.at(-1)?.id || current;
      setActiveId(current);
    };
    const scan = () => {
      elements = Array.from(document.querySelectorAll<HTMLElement>('.case-study-main [data-outline]'));
      const title = document.querySelector('.case-study-main h1')?.textContent?.trim();
      const next = elements.map((element, index) => {
        if (!element.id) element.id = `outline-section-${index}`;
        return { id: element.id, label: index === 0 && title ? title : element.dataset.outline || '' };
      });
      setItems(next);
      updateActive();
    };
    // Read after the routed page has committed; observe later content changes too.
    const init = requestAnimationFrame(scan);
    const root = document.querySelector('.case-study-main');
    const observer = new MutationObserver(scan);
    if (root) observer.observe(root, { childList: true, subtree: true });
    const onScroll = () => { if (!frame) frame = requestAnimationFrame(updateActive); };
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => { cancelAnimationFrame(init); cancelAnimationFrame(frame); observer.disconnect(); window.removeEventListener('scroll', onScroll); window.removeEventListener('resize', onScroll); };
  }, []);

  return (
    <aside className={`article-outline ${collapsed ? 'is-collapsed' : ''} ${mobileOpen ? 'is-open' : ''}`}>
      <button type="button" className="outline-toggle" aria-label={collapsed ? 'Expand page outline' : 'Collapse page outline'} aria-expanded={!collapsed} aria-controls="article-outline-links" onClick={() => setCollapsed(!collapsed)}>
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true"><rect x="3" y="4" width="18" height="16" rx="3"/><path d="M9 4v16m6-10-2 2 2 2"/></svg>
      </button>
      <Link to="/#projects" className="outline-back">← Portfolio</Link>
      <button type="button" className="outline-mobile-toggle" aria-expanded={mobileOpen} aria-controls="article-outline-links" onClick={() => setMobileOpen(!mobileOpen)}>On this page <span aria-hidden="true">{mobileOpen ? '−' : '+'}</span></button>
      <nav id="article-outline-links" ref={linksRef} aria-label="Page outline" hidden={collapsed}>
        <ul>{items.map((item) => <li key={item.id}>
          <a href={`#${item.id}`} aria-current={activeId === item.id ? 'location' : undefined} onClick={(event) => {
            event.preventDefault();
            const element = document.getElementById(item.id);
            if (!element) return;
            element.scrollIntoView({ behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth' });
            element.setAttribute('tabindex', '-1');
            element.focus({ preventScroll: true });
            window.history.replaceState(window.history.state, '', `#${item.id}`);
            setActiveId(item.id);
            setMobileOpen(false);
          }}><span className="outline-tick" aria-hidden="true"/><span>{item.label}</span></a>
        </li>)}</ul>
      </nav>
    </aside>
  );
}
