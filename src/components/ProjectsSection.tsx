import { Link } from 'react-router-dom';
import { PROJECTS } from '../data';
import { SectionHeader } from './HomeUI';

const SUMMARIES: Record<string, string> = {
  GatheRoll: 'One shared album for every event. Scan a QR code, add your photos, and let AI handle the sorting.',
  myIndigo: 'Real-time sound awareness for deaf and hard-of-hearing people, with actionable alerts on their watch.',
  CulinAI: 'Turn a photo of your ingredients into a recipe, and put what’s already in your fridge to use.',
};

export default function ProjectsSection() {
  return (
    <section id="projects" className="portfolio-section portfolio-enter" style={{ animationDelay: '180ms' }}>
      <SectionHeader num="02" title="Projects" />
      <ul className="project-list">
        {PROJECTS.map((proj, index) => (
          <li key={proj.name}>
            <Link className="portfolio-project-row" to={proj.detailPath}>
              <span className={`project-icon-frame project-icon-${index}`} aria-hidden="true">
                {proj.cover ? <img src={proj.cover} alt="" width="36" height="36" loading="lazy" decoding="async" /> : <span className="project-monogram">{proj.name[0]}</span>}
              </span>
              <span className="project-identity"><span className="project-name">{proj.name}<span className="project-arrow" aria-hidden="true">↗</span></span><span className="project-category">{proj.tags?.[0]}</span></span>
              <span className="project-description">{SUMMARIES[proj.name] || proj.sub}</span>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
