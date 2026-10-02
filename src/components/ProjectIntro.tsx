import type { ReactNode } from 'react';

type Fact = { label: string; value: string };

type Props = {
  name: string;
  summary: string;
  eyebrow?: string;
  role?: string;
  context?: string;
  duration?: string;
  facts?: Fact[];
  links: { label: string; href: string }[];
  children?: ReactNode;
};

export default function ProjectIntro({ name, summary, eyebrow = 'Selected project', role, context, duration, facts, links, children }: Props) {
  const rows = facts ?? [
    role && { label: 'My role', value: role },
    context && { label: 'Context', value: context },
    duration && { label: 'Duration', value: duration },
  ].filter((row): row is Fact => Boolean(row));

  return (
    <header id="overview" data-outline="Overview" className="project-intro">
      <p className="project-eyebrow">{eyebrow}</p>
      <h1>{name}</h1>
      <p className="project-lede">{summary}</p>
      <dl className="project-facts">
        {rows.map((row) => <div key={row.label}><dt>{row.label}</dt><dd>{row.value}</dd></div>)}
      </dl>
      <div className="project-actions">{links.filter(link => link.href !== '#').map(link => <a key={link.href} href={link.href} target="_blank" rel="noopener noreferrer">{link.label}<span aria-hidden="true">↗</span></a>)}</div>
      {children}
    </header>
  );
}
