import { EXPERIENCE } from '../../lib/constants';
import type { Bullet } from '../../types';

function highlightKeywords(text: string, keywords?: string[]) {
  if (!keywords || keywords.length === 0) return text;

  const pattern = new RegExp(`(${keywords.map(k => k.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')).join('|')})`, 'g');
  const parts = text.split(pattern);

  return parts.map((part, i) =>
    keywords.some(k => k === part) ? (
      <span key={i} className="font-normal text-[#1a1a1a]">{part}</span>
    ) : (
      part
    ),
  );
}

function BulletList({ bullets }: { bullets: Bullet[] }) {
  return (
    <ul className="list-none flex flex-col gap-2.5">
      {bullets.map((b, i) => (
        <li
          key={i}
          className="text-[13px] leading-[1.7] text-[#555] font-light pl-4 relative before:content-['·'] before:absolute before:left-0 before:text-[#999] before:font-bold"
        >
          {b.metric && (
            <span className="font-medium text-[#1a1a1a]">{b.metric}</span>
          )}
          {b.metric && <span className="text-[#ccc] mx-1.5">|</span>}
          <span>{highlightKeywords(b.text, b.keywords)}</span>
        </li>
      ))}
    </ul>
  );
}

export default function Experience() {
  return (
    <div className="flex flex-col gap-10">
      {EXPERIENCE.map((exp) => (
        <div key={exp.company}>
          <div className="flex justify-between items-baseline mb-1">
            <span className="text-[15px] font-medium text-[#1a1a1a]">
              {exp.company}
            </span>
            <span className="text-[12px] text-[#999]">{exp.date}</span>
          </div>
          <div className="text-[13px] text-[#666] mb-4">{exp.role}</div>

          {exp.subTeams && (
            <div className="flex flex-col gap-3">
              {exp.subTeams.map((team) => (
                <div
                  key={team.label}
                  className="bg-[#fafafa] rounded-lg px-5 py-4 max-sm:px-4 max-sm:py-3"
                >
                  <div className="text-[11px] font-medium text-[#999] tracking-[0.05em] uppercase mb-2.5">
                    {team.label}
                  </div>
                  <BulletList bullets={team.bullets} />
                </div>
              ))}
            </div>
          )}

          {exp.bullets && (
            <div className="bg-[#fafafa] rounded-lg px-5 py-4 max-sm:px-4 max-sm:py-3">
              <BulletList bullets={exp.bullets} />
            </div>
          )}

          <div className="flex flex-wrap gap-1.5 mt-4">
            {exp.skills.map((skill) => (
              <span
                key={skill}
                className="bg-[#fafafa] rounded-md px-2.5 py-1 text-[11px] text-[#777]"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
