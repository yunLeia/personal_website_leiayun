import { useEffect, useRef, useState, type ReactNode } from 'react';
import { useScrollReveal } from '../hooks/useScrollReveal';

export interface WorkQuestion {
  id: string;
  num: string;
  title: string;
  question: ReactNode;
  content: ReactNode;
}

const TOP_OFFSET = 24;
const PIN_DURATION = 520;
const prefersReducedMotion = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches;

export default function WorkQuestions({ lead = 'I asked:', items }: { lead?: string; items: WorkQuestion[] }) {
  const { ref, visible } = useScrollReveal();
  const [openId, setOpenId] = useState<string | null>(null);
  const rows = useRef<Record<string, HTMLLIElement | null>>({});
  const openIdRef = useRef<string | null>(null);
  const stopPin = useRef<(() => void) | null>(null);
  const ids = items.map((item) => item.id).join('|');
  openIdRef.current = openId;

  // Start scrolling right away and keep the row pinned near the top while panels expand and collapse around it.
  const pinRow = (id: string) => {
    const row = rows.current[id];
    if (!row) return;
    stopPin.current?.();
    row.querySelector<HTMLButtonElement>('.work-q-head')?.focus({ preventScroll: true });
    if (prefersReducedMotion()) {
      requestAnimationFrame(() => row.scrollIntoView({ block: 'start' }));
      return;
    }
    const events = ['wheel', 'touchstart', 'keydown', 'mousedown'] as const;
    const began = performance.now();
    const startY = window.scrollY;
    let frame = 0;
    const stop = () => {
      cancelAnimationFrame(frame);
      events.forEach((name) => window.removeEventListener(name, stop));
      if (stopPin.current === stop) stopPin.current = null;
    };
    const tick = (now: number) => {
      const elapsed = now - began;
      // Where the page would need to be right now to hold the row at the top; it keeps moving while panels resize.
      const target = window.scrollY + (row.getBoundingClientRect().top - TOP_OFFSET);
      const progress = Math.min(1, elapsed / PIN_DURATION);
      const eased = progress < 0.5 ? 2 * progress ** 2 : 1 - (-2 * progress + 2) ** 2 / 2;
      const next = progress >= 1 ? target : startY + (target - startY) * eased;
      if (Math.abs(next - window.scrollY) > 0.3) window.scrollTo(0, next);
      if (elapsed < PIN_DURATION + 200) frame = requestAnimationFrame(tick);
      else stop();
    };
    events.forEach((name) => window.addEventListener(name, stop, { passive: true }));
    stopPin.current = stop;
    frame = requestAnimationFrame(tick);
  };

  useEffect(() => {
    const openFromHash = () => {
      const hash = window.location.hash.slice(1);
      if (!hash || !ids.split('|').includes(hash)) return;
      setOpenId(hash);
      pinRow(hash);
    };
    openFromHash();
    window.addEventListener('hashchange', openFromHash);
    const onOpen = (event: Event) => {
      const id = (event as CustomEvent<string>).detail;
      if (!ids.split('|').includes(id)) return;
      event.preventDefault();
      setOpenId(id);
      pinRow(id);
    };
    window.addEventListener('open-work-section', onOpen);
    return () => {
      window.removeEventListener('open-work-section', onOpen);
      window.removeEventListener('hashchange', openFromHash);
      stopPin.current?.();
    };
  }, [ids]);

  const toggle = (id: string) => {
    if (openIdRef.current === id) {
      setOpenId(null);
      return;
    }
    setOpenId(id);
    pinRow(id);
  };

  return (
    <section ref={ref} className={`work-questions${visible ? ' is-visible' : ''}${openId ? ' has-open' : ''}`} aria-label="Questions this work answers">
      <p className="work-questions-lead">{lead}</p>
      <ol>
        {items.map((item, i) => {
          const open = openId === item.id;
          return (
            <li key={item.id} ref={(el) => { rows.current[item.id] = el; }} className={open ? 'is-open' : undefined} style={{ ['--i' as string]: i }}>
              <button type="button" className="work-q-head" aria-expanded={open} aria-controls={`panel-${item.id}`} onClick={() => toggle(item.id)}>
                <span className="work-q-num">{String(i + 1).padStart(2, '0')}</span>
                <span className="work-q-body">
                  <span className="work-q-text">{item.question}</span>
                  <span className="work-q-target">{item.num} · {item.title}</span>
                </span>
                <span className="work-q-toggle" aria-hidden="true" />
              </button>
              <div
                id={`panel-${item.id}`}
                role="region"
                aria-label={item.title}
                aria-hidden={!open}
                className={`work-panel${open ? ' is-open' : ''}`}
                ref={(el) => { if (el) { if (open) el.removeAttribute('inert'); else el.setAttribute('inert', ''); } }}
              >
                <div className="work-panel-inner">{item.content}</div>
              </div>
            </li>
          );
        })}
      </ol>
    </section>
  );
}
