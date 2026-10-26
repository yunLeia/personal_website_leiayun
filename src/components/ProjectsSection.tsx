import { Link } from 'react-router-dom';
import { PROJECTS } from '../data';
import { SectionHeader, ExternalArrow } from './HomeUI';

export default function ProjectsSection() {
  return (
    <section id="projects" className="portfolio-section portfolio-enter" style={{ animationDelay: '180ms' }}>
      <SectionHeader num="02" title="Projects" />
      <ul className="project-list">
        {PROJECTS.filter((proj) => !proj.hidden).map((proj, index) => (
          <li className={`portfolio-project-row${proj.closed ? ' is-closed' : ''}`} key={proj.name}>
            {!proj.closed && <Link className="experience-row-link" to={proj.detailPath} aria-label={`Read about ${proj.name}`} />}
            <span className={`project-icon-frame project-icon-${index}`} data-project={proj.name} aria-hidden="true">
              {proj.cover ? <span className="project-icon-image"><img src={proj.cover} alt="" width="40" height="40" loading="lazy" decoding="async" /></span> : <span className="project-monogram">{proj.name[0]}</span>}
            </span>
            <span className="project-identity">
              <span className="project-name">{proj.url ? <a className="company-link" href={proj.url} target="_blank" rel="noopener noreferrer" aria-label={`${proj.name} website (opens in a new tab)`}>{proj.name}<ExternalArrow /></a> : proj.name}</span>
              <span className="project-category">{proj.tags?.[0]}</span>
            </span>
            <span className="project-description">{proj.sub}</span>
            {!proj.closed && <span className="experience-open-indicator" aria-hidden="true">↗</span>}
          </li>
        ))}
      </ul>
    </section>
  );
}
