import type { ReactNode } from 'react';

type Props = {
  name: string;
  summary: string;
  role: string;
  context: string;
  duration?: string;
  links: { label: string; href: string }[];
  children?: ReactNode;
};

export default function ProjectIntro({ name, summary, role, context, duration, links, children }: Props) {
  return (
    <header id="overview" data-outline="Overview" className="project-intro">
      <p className="project-eyebrow">Selected project</p>
      <h1>{name}</h1>
      <p className="project-lede">{summary}</p>
      <dl className="project-facts">
        <div><dt>My role</dt><dd>{role}</dd></div>
        <div><dt>Context</dt><dd>{context}</dd></div>
        {duration && <div><dt>Duration</dt><dd>{duration}</dd></div>}
      </dl>
      <div className="project-actions">{links.filter(link => link.href !== '#').map(link => <a key={link.href} href={link.href} target="_blank" rel="noopener noreferrer">{link.label}<span aria-hidden="true">↗</span></a>)}</div>
      {children}
    </header>
  );
}
