import { Link } from 'react-router-dom';
import { EXPERIENCE } from '../data';
import type { PanelChat } from './DetailPanel';
import { SectionHeader, ExternalArrow } from './HomeUI';

interface Props {
  onSelect: (chat: PanelChat) => void;
  activeKey: string | null;
}

export default function ExperienceSection({ onSelect, activeKey }: Props) {
  return (
    <section id="experience" className="portfolio-section portfolio-enter" style={{ animationDelay: '100ms' }}>
      <SectionHeader num="01" title="Experience" />
      <ol className="experience-list">
        {EXPERIENCE.map((exp) => (
          <li className="experience-entry" key={exp.company}>
            {exp.detailPath ? <Link className="experience-row-link" to={exp.detailPath} aria-label={`Read about my work at ${exp.company}`} /> : <button className="experience-row-link" type="button" aria-label={`Read about my work at ${exp.company}`} aria-pressed={activeKey === `${exp.company}-${exp.role} · ${exp.date}`} onClick={() => onSelect({ messages: exp.subProjects.flatMap((s) => s.chat), title: exp.company, subtitle: `${exp.role} · ${exp.date}` })} />}
            <div className="experience-heading">
              <h3>{exp.url ? <a className="company-link" href={exp.url} target="_blank" rel="noopener noreferrer" aria-label={`${exp.company} website (opens in a new tab)`}>{exp.company}<ExternalArrow /></a> : exp.company}</h3>
              <span className="experience-date">{exp.date}</span>
            </div>
            <p className="experience-position">{exp.role}</p>
            {exp.subtitle && <p className="experience-summary">{exp.subtitle}</p>}
            <span className="experience-open-indicator" aria-hidden="true">↗</span>
          </li>
        ))}
      </ol>
    </section>
  );
}
