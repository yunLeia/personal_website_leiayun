import type { ReactNode } from 'react';
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

export function WorkFigure({ num, src, alt, caption }: { num: string; src: string; alt: string; caption: string }) {
  return (
    <figure className="work-figure">
      <img src={src} alt={alt} loading="lazy" decoding="async" />
      <figcaption>Fig. {num} — {caption}</figcaption>
    </figure>
  );
}

export function WorkTools({ tools }: { tools: string[] }) {
  return <div className="work-tools">{tools.map((t) => <ToolPill key={t}>{t}</ToolPill>)}</div>;
}

export interface WorkItemData {
  id: string;
  num: string;
  title: string;
  lede: ReactNode;
  figure?: { src: string; alt: string; caption: string };
  problem: ReactNode | ReactNode[];
  bet?: ReactNode;
  did: ReactNode[];
  metrics?: { value: string; label: string }[];
  takeaway?: ReactNode;
  tools?: string[];
}

export default function WorkItem({ id, num, title, lede, figure, problem, bet, did, metrics, takeaway, tools }: WorkItemData) {
  return (
    <WorkSection id={id} num={num} title={title} lede={lede}>
      <WorkBlock label="The problem">{Array.isArray(problem) ? <WorkList items={problem} /> : <p>{problem}</p>}</WorkBlock>
      {bet && <WorkBlock label="My bet"><p>{bet}</p></WorkBlock>}
      <WorkBlock label="What I did"><WorkList items={did} /></WorkBlock>
      {metrics && (
        <WorkBlock label="Impact">
          <WorkMetrics metrics={metrics} />
          {takeaway && <p className="work-takeaway">{takeaway}</p>}
        </WorkBlock>
      )}
      {figure && <WorkFigure num={num} {...figure} />}
      {tools && <WorkTools tools={tools} />}
    </WorkSection>
  );
}
