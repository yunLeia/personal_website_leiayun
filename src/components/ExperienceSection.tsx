import { useNavigate } from 'react-router-dom';
import { EXPERIENCE } from '../data';
import { useStaggerReveal } from '../hooks/useStaggerReveal';
import type { PanelChat } from './DetailPanel';

interface Props {
  onSelect: (chat: PanelChat) => void;
  activeKey: string | null;
}

export default function ExperienceSection({ onSelect, activeKey }: Props) {
  const { ref, visible } = useStaggerReveal(EXPERIENCE.length, 120);
  const navigate = useNavigate();

  function handleClick(exp: (typeof EXPERIENCE)[number]) {
    if (exp.detailPath) {
      navigate(exp.detailPath);
    } else {
      const allChat = exp.subProjects.flatMap((s) => s.chat);
      onSelect({
        messages: allChat,
        title: exp.company,
        subtitle: `${exp.role.toLowerCase()} · ${exp.date.toLowerCase()}`,
      });
    }
  }

  return (
    <section ref={ref} className="mb-20 max-sm:mb-14">
      <h2 className="text-[13px] max-sm:text-[12px] font-medium text-[#86868b] uppercase tracking-[0.04em] mb-8 max-sm:mb-6">
        Experience
      </h2>

      <div className="flex flex-col gap-1">
        {EXPERIENCE.map((exp, i) => {
          const key = `${exp.company}-${exp.role.toLowerCase()} · ${exp.date.toLowerCase()}`;
          return (
            <button
              key={exp.company}
              onClick={() => handleClick(exp)}
              className={`group w-full text-left bg-transparent border-0 font-[inherit] px-4 py-4 -mx-4 rounded-xl cursor-pointer transition-all duration-300 hover:bg-[#f5f5f7] ${
                visible[i] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-3'
              } ${activeKey === key ? 'bg-[#f5f5f7]' : ''}`}
            >
              <div className="text-[17px] max-sm:text-[15px] text-[#1d1d1f] tracking-tight transition-opacity duration-200 group-hover:opacity-70">
                {exp.role.toLowerCase()} at{' '}
                {exp.url ? (
                  <a
                    href={exp.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    className="font-semibold text-[#1d1d1f] underline underline-offset-[3px] decoration-[#d2d2d7] hover:decoration-[#1d1d1f] transition-colors duration-200"
                  >
                    {exp.company}
                  </a>
                ) : (
                  <span className="font-semibold">{exp.company}</span>
                )}
              </div>
              <div className="text-[15px] max-sm:text-[13px] text-[#86868b] mt-1">
                {exp.date.toLowerCase()}
              </div>
              {exp.subtitle && (
                <div className="text-[14px] max-sm:text-[13px] text-[#86868b] mt-1.5 leading-[1.5]">
                  {exp.subtitle}
                </div>
              )}
            </button>
          );
        })}
      </div>
    </section>
  );
}
