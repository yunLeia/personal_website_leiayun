import { EXPERIENCE } from '../../lib/constants';
import { useFadeIn } from '../../hooks/useFadeIn';
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
    <ul className="list-none flex flex-col gap-2">
      {bullets.map((b, i) => (
        <li
          key={i}
          className="text-[14px] max-sm:text-[13px] leading-[1.65] text-[#555] font-light pl-4 relative before:content-['·'] before:absolute before:left-0 before:text-[#bbb] before:font-bold"
        >
          <div className="flex justify-between gap-6 max-sm:flex-col max-sm:gap-1">
            <span className="flex-1">{highlightKeywords(b.text, b.keywords)}</span>
            {b.metric && (
              <span className="text-[13px] max-sm:text-[12px] font-medium text-[#1a1a1a] whitespace-nowrap shrink-0 max-sm:pl-0 max-sm:text-[#555]">
                {b.metric}
              </span>
            )}
          </div>
        </li>
      ))}
    </ul>
  );
}

function SkillTags({ skills }: { skills: string[] }) {
  return (
    <div className="flex flex-wrap gap-2 mt-5">
      {skills.map((skill) => (
        <span
          key={skill}
          className="text-[12px] max-sm:text-[11px] text-[#777] border border-[#ddd] px-2.5 py-1 rounded-sm"
        >
          {skill}
        </span>
      ))}
    </div>
  );
}

export default function Experience() {
  const { ref, visible } = useFadeIn();

  return (
    <section
      id="experience"
      ref={ref}
      className={`mb-28 max-sm:mb-20 transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
    >
      <div className="text-[12px] font-medium text-[#aaa] tracking-[0.1em] uppercase mb-10 max-sm:mb-7">
        Experience
      </div>
      <div className="flex flex-col gap-12 max-sm:gap-10">
        {EXPERIENCE.map((exp) => (
          <div key={exp.company}>
            <div className="flex justify-between items-baseline mb-1.5">
              <span className="text-[16px] max-sm:text-[15px] font-semibold text-[#1a1a1a]">{exp.company}</span>
              <span className="text-[13px] max-sm:text-[12px] text-[#aaa]">{exp.date}</span>
            </div>
            <div className="text-[14px] max-sm:text-[13px] text-[#777] mb-4 max-sm:mb-3">
              {exp.role} · {exp.location}
            </div>

            {exp.subTeams && (
              <div className="flex flex-col gap-6 max-sm:gap-5">
                {exp.subTeams.map((team) => (
                  <div key={team.label}>
                    <div className="text-[11px] max-sm:text-[10px] font-semibold text-[#aaa] tracking-[0.08em] uppercase mb-3 max-sm:mb-2">
                      {team.label}
                    </div>
                    <BulletList bullets={team.bullets} />
                  </div>
                ))}
              </div>
            )}

            {exp.bullets && <BulletList bullets={exp.bullets} />}

            <SkillTags skills={exp.skills} />
          </div>
        ))}
      </div>
    </section>
  );
}
