import { useNavigate } from 'react-router-dom';
import { EXPERIENCE } from '../data';
import type { PanelChat } from './DetailPanel';
import { SectionHeader, ExternalArrow } from './HomeUI';

interface Props {
  onSelect: (chat: PanelChat) => void;
  activeKey: string | null;
}

function ExperienceRow({
  exp,
  onClick,
}: {
  exp: (typeof EXPERIENCE)[number];
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className="group w-full text-left font-[inherit] grid grid-cols-[minmax(0,1fr)_max-content] items-start gap-4 py-3 border-t border-black/[0.08] first:border-t-0 cursor-pointer hover:bg-black/[0.015] transition-colors duration-150 -mx-2 px-2"
    >
      <div className="min-w-0">
        {exp.url ? (
          <a
            href={exp.url}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            className="text-[14px] font-medium text-[#1e1d1b] hover:opacity-70 transition-opacity duration-150"
          >
            {exp.company}
            <ExternalArrow />
          </a>
        ) : (
          <span className="text-[14px] font-medium text-[#1e1d1b]">{exp.company}</span>
        )}
        <div className="text-[14px] text-[#8a8a86]">{exp.role}</div>
        {exp.subtitle && (
          <div className="text-[13px] font-normal text-[#8a8a86] mt-1 leading-[1.6] max-w-[420px]">
            {exp.subtitle}
          </div>
        )}
      </div>
      <span className="text-[14px] text-[#8a8a86] [font-variant-numeric:tabular-nums]">
        {exp.date.toLowerCase()}
      </span>
    </button>
  );
}

export default function ExperienceSection({ onSelect }: Props) {
  const navigate = useNavigate();

  function handleClick(exp: (typeof EXPERIENCE)[number]) {
    if (exp.detailPath) {
      navigate(exp.detailPath);
    } else {
      const allChat = exp.subProjects.flatMap((s) => s.chat);
      onSelect({
        messages: allChat,
        title: exp.company,
        subtitle: `${exp.role} · ${exp.date}`,
      });
    }
  }

  return (
    <section id="experience" className="py-8 scroll-mt-20">
      <SectionHeader num="01" title="Experience" />

      <div className="flex flex-col">
        {EXPERIENCE.map((exp) => (
          <ExperienceRow
            key={exp.company}
            exp={exp}
            onClick={() => handleClick(exp)}
          />
        ))}
      </div>
    </section>
  );
}
