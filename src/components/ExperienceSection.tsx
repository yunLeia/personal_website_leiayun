import { useNavigate } from 'react-router-dom';
import { EXPERIENCE } from '../data';
import { useScrollReveal } from '../hooks/useScrollReveal';
import type { PanelChat } from './DetailPanel';

interface Props {
  onSelect: (chat: PanelChat) => void;
  activeKey: string | null;
}

function ExperienceCard({
  exp,
  isActive,
  onClick,
}: {
  exp: (typeof EXPERIENCE)[number];
  isActive: boolean;
  onClick: () => void;
}) {
  const { ref, visible } = useScrollReveal();

  return (
    <div ref={ref}>
      <button
        onClick={onClick}
        className={`group w-full text-left font-[inherit] px-8 py-8 max-sm:px-6 max-sm:py-5 rounded-2xl max-sm:rounded-xl cursor-pointer transition-all duration-500 bg-white/15 backdrop-blur-[16px] border border-white/30 shadow-[0_2px_16px_rgba(0,0,0,0.06),inset_0_1px_0_rgba(255,255,255,0.3)] hover:bg-white/25 hover:shadow-[0_4px_24px_rgba(0,0,0,0.08),inset_0_1px_0_rgba(255,255,255,0.6)] ${
          visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
        } ${isActive ? 'bg-white/25 border-white/40 shadow-[0_4px_24px_rgba(0,0,0,0.08),inset_0_1px_0_rgba(255,255,255,0.6)]' : ''}`}
      >
        <div className="flex items-baseline justify-between gap-4">
          <div className="text-[20px] max-sm:text-[16px] text-[#1d1d1f] tracking-tight transition-opacity duration-200 group-hover:opacity-70">
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
          <div className="text-[15px] max-sm:text-[13px] text-[#999] shrink-0">
            {exp.date.toLowerCase()}
          </div>
        </div>
        {exp.subtitle && (
          <div className="text-[16px] max-sm:text-[14px] font-normal text-[#444] mt-3 max-sm:mt-2 leading-[1.65] max-w-[720px]">
            {exp.subtitle}
          </div>
        )}
        {exp.tags && (
          <div className="flex flex-wrap gap-2 mt-4 max-sm:mt-3">
            {exp.tags.map((tag) => (
              <span
                key={tag}
                className="text-[11px] max-sm:text-[10px] font-medium text-[#888] bg-white/20 backdrop-blur-[6px] border border-white/25 rounded-full px-3 py-1"
              >
                {tag}
              </span>
            ))}
          </div>
        )}
      </button>
    </div>
  );
}

export default function ExperienceSection({ onSelect, activeKey }: Props) {
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
    <section id="experience" className="min-h-[85vh] max-sm:min-h-0 flex flex-col justify-center py-16 max-sm:py-10 scroll-mt-20">
      <h2 className="text-[12px] max-sm:text-[11px] font-semibold text-[#999] uppercase tracking-[0.14em] mb-10 max-sm:mb-6">
        Experience
      </h2>

      <div className="flex flex-col gap-5 max-sm:gap-3">
        {EXPERIENCE.map((exp) => {
          const key = `${exp.company}-${exp.role.toLowerCase()} · ${exp.date.toLowerCase()}`;
          return (
            <ExperienceCard
              key={exp.company}
              exp={exp}
              isActive={activeKey === key}
              onClick={() => handleClick(exp)}
            />
          );
        })}
      </div>
    </section>
  );
}
