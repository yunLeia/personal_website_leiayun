import { Link } from 'react-router-dom';
import { PROJECTS } from '../data';
import { SectionHeader, ExternalArrow } from './HomeUI';

const SUMMARIES: Record<string, string> = {
  Cabine: 'An AI outfit preview that turns a new piece into an outfit with clothes you already own',
  myIndigo: 'A real-time sound awareness app that sends actionable alerts straight to your watch',
  CulinAI: 'An AI recipe app that turns what’s in your fridge into something you can cook',
};

export default function ProjectsSection() {
  return (
    <section id="projects" className="portfolio-section portfolio-enter" style={{ animationDelay: '180ms' }}>
      <SectionHeader num="02" title="Projects" />
      <ul className="project-list">
        {PROJECTS.filter((proj) => !proj.hidden).map((proj, index) => (
          <li className="portfolio-project-row" key={proj.name}>
            <Link className="experience-row-link" to={proj.detailPath} aria-label={`Read about ${proj.name}`} />
            <span className={`project-icon-frame project-icon-${index}`} aria-hidden="true">
              {proj.cover ? <img src={proj.cover} alt="" width="36" height="36" loading="lazy" decoding="async" /> : <span className="project-monogram">{proj.name[0]}</span>}
            </span>
            <span className="project-identity">
              <span className="project-name">{proj.url ? <a className="company-link" href={proj.url} target="_blank" rel="noopener noreferrer" aria-label={`${proj.name} website (opens in a new tab)`}>{proj.name}<ExternalArrow /></a> : proj.name}</span>
              <span className="project-category">{proj.tags?.[0]}</span>
            </span>
            <span className="project-description">{SUMMARIES[proj.name] || proj.sub}</span>
            <span className="experience-open-indicator" aria-hidden="true">↗</span>
          </li>
        ))}
      </ul>
    </section>
  );
}
