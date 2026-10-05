import { useEffect, useRef, useState, type ReactNode } from 'react';
import { useScrollReveal } from '../hooks/useScrollReveal';

export interface WorkQuestion {
  id: string;
  num: string;
  title: string;
  question: ReactNode;
  content: ReactNode;
}

const prefersReducedMotion = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches;

export default function WorkQuestions({ lead = 'I asked:', items }: { lead?: string; items: WorkQuestion[] }) {
  const { ref, visible } = useScrollReveal();
  const [openId, setOpenId] = useState<string | null>(null);
  const [settledId, setSettledId] = useState<string | null>(null);
  const rows = useRef<Record<string, HTMLLIElement | null>>({});
  const scrollMode = useRef<'near' | 'force' | null>(null);
  const openIdRef = useRef<string | null>(null);
  const ids = items.map((item) => item.id).join('|');
  openIdRef.current = openId;

  const scrollRow = (id: string) => {
    const row = rows.current[id];
    if (!row) return;
    row.scrollIntoView({ behavior: prefersReducedMotion() ? 'auto' : 'smooth', block: 'start' });
    row.querySelector<HTMLButtonElement>('.work-q-head')?.focus({ preventScroll: true });
  };

  useEffect(() => {
    const openFromHash = () => {
      const hash = window.location.hash.slice(1);
      if (!hash || !ids.split('|').includes(hash)) return;
      if (openIdRef.current !== hash) scrollMode.current = 'force';
      setOpenId(hash);
    };
    openFromHash();
    window.addEventListener('hashchange', openFromHash);
    const onOpen = (event: Event) => {
      const id = (event as CustomEvent<string>).detail;
      if (!ids.split('|').includes(id)) return;
      event.preventDefault();
      if (openIdRef.current === id) { scrollRow(id); return; }
      scrollMode.current = 'force';
      setOpenId(id);
    };
    window.addEventListener('open-work-section', onOpen);
    return () => { window.removeEventListener('open-work-section', onOpen); window.removeEventListener('hashchange', openFromHash); };
  }, [ids]);

  // Once the panel has finished expanding (its height transition ends; a timer covers the no-transition case),
  // let its content overflow again (the side thumbnail sits outside the column) and scroll the row into place.
  useEffect(() => {
    setSettledId(null);
    if (!openId) return;
    const panel = document.getElementById(`panel-${openId}`);
    let done = false;
    const finish = () => {
      if (done) return;
      done = true;
      setSettledId(openId);
      const mode = scrollMode.current;
      scrollMode.current = null;
      const row = rows.current[openId];
      if (!mode || !row) return;
      const top = row.getBoundingClientRect().top;
      if (mode === 'force' || top < 0 || top > 160) scrollRow(openId);
    };
    const onEnd = (event: TransitionEvent) => {
      if (event.target === panel && event.propertyName === 'grid-template-rows') window.setTimeout(finish, 30);
    };
    panel?.addEventListener('transitionend', onEnd);
    const fallback = window.setTimeout(finish, prefersReducedMotion() ? 0 : 900);
    return () => { panel?.removeEventListener('transitionend', onEnd); window.clearTimeout(fallback); };
  }, [openId]);

  const toggle = (id: string) => {
    scrollMode.current = openId !== id ? 'near' : null;
    setOpenId(openId === id ? null : id);
  };

  return (
    <section ref={ref} className={`work-questions${visible ? ' is-visible' : ''}`} aria-label="Questions this work answers">
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
                className={`work-panel${open ? ' is-open' : ''}${settledId === item.id ? ' is-settled' : ''}`}
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
