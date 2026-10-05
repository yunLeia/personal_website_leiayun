import type { ReactNode } from 'react';
import { PROJECTS } from '../data';

type Fact = { label: string; value: ReactNode };
type Link = { label: string; href: string; primary?: boolean };

type Props = {
  name: string;
  summary: string;
  eyebrow?: string;
  facts: Fact[];
  links: Link[];
  children?: ReactNode;
};

export default function ProjectIntro({ name, summary, eyebrow = 'Selected project', facts, links, children }: Props) {
  const project = PROJECTS.find((item) => item.name === name);
  const image = project?.hero ?? project?.cover;

  return (
    <header id="overview" data-outline="Overview" className="project-intro">
      <p className="project-eyebrow">{eyebrow}</p>
      <div className="project-title-row">
        <h1>{name}</h1>
        <div className="project-actions">
          {links.filter((link) => link.href !== '#').map((link) => (
            <a key={link.href} href={link.href} target="_blank" rel="noopener noreferrer" className={link.primary ? 'is-primary' : undefined}>
              {link.label}<span aria-hidden="true">↗</span>
            </a>
          ))}
        </div>
      </div>
      {image && (
        <figure className={`case-cover${project?.hero ? ' is-natural' : ''}`}>
          <img src={image} alt={`${name} preview`} />
        </figure>
      )}
      <p className="project-lede">{summary}</p>
      <dl className="project-facts">
        {facts.map((row) => <div key={row.label}><dt>{row.label}</dt><dd>{row.value}</dd></div>)}
      </dl>
      {children}
    </header>
  );
}
