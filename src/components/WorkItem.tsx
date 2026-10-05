import { isValidElement, useEffect, useRef, useState, type ReactNode } from 'react';
import { createPortal } from 'react-dom';
import { useScrollReveal } from '../hooks/useScrollReveal';
import { Reveal, ToolPill } from './shared';

export function WorkSection({ id, num, title, lede, children }: { id: string; num: string; title: string; lede?: ReactNode; children: ReactNode }) {
  return (
    <Reveal id={id} outline={title} className="work-item">
      <h2 className="work-title">
        <span className="section-tag" aria-hidden="true"><span className="section-index">{num}</span><span className="section-hatch" /></span>
        <span>{title}</span>
      </h2>
      {lede && <p className="work-lede">{lede}</p>}
      {children}
    </Reveal>
  );
}

export function WorkProse({ children }: { children: ReactNode }) {
  return <div className="work-prose">{children}</div>;
}

export function WorkBlock({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="work-block">
      <h3 className="work-label">{label}</h3>
      <div className="work-body">{typeof children === 'string' ? <p>{children}</p> : children}</div>
    </div>
  );
}

export function WorkList({ items }: { items: ReactNode[] }) {
  return <ul className="work-list">{items.map((item, i) => <li key={i}>{item}</li>)}</ul>;
}

export function WorkMetrics({ metrics }: { metrics: { value: string; label: string }[] }) {
  return (
    <dl className="work-metrics">
      {metrics.map((m) => (
        <div key={m.label}>
          <dd>{m.value}</dd>
          <dt>{m.label}</dt>
        </div>
      ))}
    </dl>
  );
}

const ExpandIcon = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7" /></svg>
);

function Lightbox({ num, src, alt, caption, onClose }: { num: string; src: string; alt: string; caption: string; onClose: () => void }) {
  const closeRef = useRef<HTMLButtonElement>(null);
  const onCloseRef = useRef(onClose);
  onCloseRef.current = onClose;
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onCloseRef.current(); };
    document.addEventListener('keydown', onKey);
    const overflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    closeRef.current?.focus();
    return () => { document.removeEventListener('keydown', onKey); document.body.style.overflow = overflow; };
  }, []);
  return createPortal(
    <div className="work-lightbox" role="dialog" aria-modal="true" aria-label={`Figure ${num}: ${caption}`} onClick={onClose}>
      <figure onClick={(e) => e.stopPropagation()}>
        <img src={src} alt={alt} />
        <figcaption>Fig. {num} — {caption}</figcaption>
      </figure>
      <button ref={closeRef} type="button" className="work-lightbox-close" onClick={onClose} aria-label="Close">Esc ×</button>
    </div>,
    document.body,
  );
}

type Fig = { src: string; alt: string; caption: string };

export function WorkFigures({ num, figures }: { num: string; figures: Fig[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const { ref, visible } = useScrollReveal();
  const trigger = useRef<HTMLElement | null>(null);
  const close = () => { setOpenIndex(null); trigger.current?.focus(); };
  const labelFor = (i: number) => (figures.length > 1 ? `${num}${String.fromCharCode(65 + i)}` : num);
  const card = (fig: Fig, i: number, variant: string) => (
    <figure className={`work-figure ${variant}`} key={fig.src}>
      <button type="button" className="work-figure-btn" onClick={(e) => { trigger.current = e.currentTarget; setOpenIndex(i); }} aria-label={`Expand figure ${labelFor(i)}: ${fig.caption}`}>
        <img src={fig.src} alt={fig.alt} loading="eager" decoding="async" ref={(el) => { if (el?.complete) el.classList.add('is-loaded'); }} onLoad={(e) => e.currentTarget.classList.add('is-loaded')} />
        <span className="work-figure-badge"><ExpandIcon />Expand</span>
      </button>
      <figcaption>Fig. {labelFor(i)} — {fig.caption}</figcaption>
    </figure>
  );
  const open = openIndex === null ? null : figures[openIndex];
  return (
    <>
      <div className="work-figure-group">{figures.map((fig, i) => card(fig, i, 'work-figure--inline'))}</div>
      <aside ref={ref} className={`work-aside${visible ? ' is-visible' : ''}`}>
        <div className="work-aside-sticky">{figures.map((fig, i) => card(fig, i, 'work-figure--side'))}</div>
      </aside>
      {open && openIndex !== null && <Lightbox num={labelFor(openIndex)} src={open.src} alt={open.alt} caption={open.caption} onClose={close} />}
    </>
  );
}

export function WorkFigure({ num, ...fig }: { num: string } & Fig) {
  return <WorkFigures num={num} figures={[fig]} />;
}

export function WorkTools({ tools }: { tools: string[] }) {
  return <div className="work-tools">{tools.map((t) => <ToolPill key={t}>{t}</ToolPill>)}</div>;
}

export interface WorkItemData {
  id: string;
  num: string;
  title: string;
  lede?: ReactNode;
  figure?: Fig | Fig[];
  problem: ReactNode | ReactNode[];
  bet?: ReactNode;
  did: ReactNode[] | ReactNode;
  takeaway?: ReactNode;
  impactLabel?: string;
  tools?: string[];
}

export default function WorkItem({ id, num, title, lede, figure, problem, bet, did, takeaway, impactLabel, tools }: WorkItemData) {
  return (
    <WorkSection id={id} num={num} title={title} lede={lede}>
      <WorkBlock label="The problem">{Array.isArray(problem) ? <WorkList items={problem} /> : isValidElement(problem) && problem.type === 'div' ? problem : <p>{problem}</p>}</WorkBlock>
      {bet && <WorkBlock label="My bet"><p>{bet}</p></WorkBlock>}
      <WorkBlock label="What I did">{Array.isArray(did) ? <WorkList items={did} /> : did}</WorkBlock>
      {takeaway && (
        <WorkBlock label={impactLabel ?? 'Impact'}>
          {takeaway && (isValidElement(takeaway) && takeaway.type === 'div' ? takeaway : <p className="work-takeaway">{takeaway}</p>)}
        </WorkBlock>
      )}
      {figure && <WorkFigures num={num} figures={Array.isArray(figure) ? figure : [figure]} />}
      {tools && <WorkTools tools={tools} />}
    </WorkSection>
  );
}
