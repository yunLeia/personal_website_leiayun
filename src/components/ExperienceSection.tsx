import { useNavigate } from 'react-router-dom';
import { EXPERIENCE } from '../data';
import type { PanelChat } from './DetailPanel';
import { SectionHeader, DotRow, ExternalArrow } from './HomeUI';

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
      className="group w-full text-left font-[inherit] py-4 border-t border-black/[0.08] first:border-t-0 cursor-pointer"
    >
      <DotRow
        title={
          exp.url ? (
            <a
              href={exp.url}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="font-semibold text-[#1a1a1a] hover:opacity-60 transition-opacity duration-150"
            >
              {exp.company}
              <ExternalArrow />
            </a>
          ) : (
            <span className="font-semibold text-[#1a1a1a]">{exp.company}</span>
          )
        }
        trailing={exp.date.toLowerCase()}
      />
      <div className="text-[13px] text-[#666] mt-1">{exp.role}</div>
      {exp.subtitle && (
        <div className="text-[13px] font-normal text-[#888] mt-1.5 leading-[1.6] max-w-[480px]">
          {exp.subtitle}
        </div>
      )}
      {exp.tags && (
        <div className="text-[12px] text-[#aaa] mt-1.5">
          {exp.tags.join(' · ')}
        </div>
      )}
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
