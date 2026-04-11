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
      <h2 className="text-[11px] font-semibold text-[#bbb] uppercase tracking-[0.14em] mb-6">
        Experience
      </h2>

      <div className="flex flex-col gap-3">
        {EXPERIENCE.map((exp, i) => {
          const key = `${exp.company}-${exp.role.toLowerCase()} · ${exp.date.toLowerCase()}`;
          return (
            <button
              key={exp.company}
              onClick={() => handleClick(exp)}
              className={`group w-full text-left font-[inherit] px-6 py-5 rounded-xl cursor-pointer transition-all duration-300 bg-[#fafafa] border border-[#eee] hover:border-[#d2d2d7] hover:shadow-[0_2px_12px_rgba(0,0,0,0.04)] ${
                visible[i] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-3'
              } ${activeKey === key ? 'border-[#d2d2d7] shadow-[0_2px_12px_rgba(0,0,0,0.04)]' : ''}`}
            >
              <div className="flex items-baseline justify-between gap-4">
                <div className="text-[16px] max-sm:text-[15px] text-[#111] tracking-tight transition-opacity duration-200 group-hover:opacity-70">
                  {exp.role.toLowerCase()} at{' '}
                  {exp.url ? (
                    <a
                      href={exp.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className="font-semibold text-[#111] underline underline-offset-[3px] decoration-[#d2d2d7] hover:decoration-[#111] transition-colors duration-200"
                    >
                      {exp.company}
                    </a>
                  ) : (
                    <span className="font-semibold">{exp.company}</span>
                  )}
                </div>
                <div className="text-[13px] max-sm:text-[12px] text-[#bbb] shrink-0">
                  {exp.date.toLowerCase()}
                </div>
              </div>
              {exp.subtitle && (
                <div className="text-[14px] max-sm:text-[13px] font-light text-[#555] mt-2 leading-[1.6] max-w-[640px]">
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
