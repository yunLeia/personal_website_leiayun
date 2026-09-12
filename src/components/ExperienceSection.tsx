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
            <div className="experience-heading">
              <h3>{exp.detailPath ? <Link to={exp.detailPath}>{exp.company}<span className="experience-detail-arrow" aria-hidden="true">↗</span></Link> : <button type="button" aria-pressed={activeKey === `${exp.company}-${exp.role} · ${exp.date}`} onClick={() => onSelect({ messages: exp.subProjects.flatMap((s) => s.chat), title: exp.company, subtitle: `${exp.role} · ${exp.date}` })}>{exp.company}<ExternalArrow /></button>}</h3>
              <span className="experience-date">{exp.date}</span>
            </div>
            <p className="experience-position">{exp.role}</p>
            {exp.subtitle && <p className="experience-summary">{exp.subtitle}</p>}
          </li>
        ))}
      </ol>
    </section>
  );
}
