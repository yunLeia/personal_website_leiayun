import { useNavigate } from 'react-router-dom';
import { EXPERIENCE } from '../data';
import type { PanelChat } from './DetailPanel';

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
      className="group w-full text-left font-[inherit] py-5 border-t border-black/[0.08] first:border-t-0 cursor-pointer"
    >
      <div className="flex items-baseline justify-between gap-4">
        <div className="text-[15px] text-[#1a1a1a] tracking-tight transition-opacity duration-150 group-hover:opacity-60">
          {exp.role.includes('Intern') ? (
            <>
              <span className="font-semibold">{exp.role.replace(/ ?Intern$/, '')}</span>
              {' Intern'}
            </>
          ) : (
            <span className="font-semibold">{exp.role}</span>
          )}{' '}at{' '}
          {exp.url ? (
            <a
              href={exp.url}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="font-semibold text-[#1a1a1a] underline decoration-dotted underline-offset-[3px] hover:decoration-solid transition-all duration-150"
            >
              {exp.company}
            </a>
          ) : (
            <span className="font-semibold">{exp.company}</span>
          )}
        </div>
        <div className="text-[12px] text-[#999] shrink-0">
          {exp.date.toLowerCase()}
        </div>
      </div>
      {exp.subtitle && (
        <div className="text-[13px] font-normal text-[#666] mt-2 leading-[1.6] max-w-[480px]">
          {exp.subtitle}
        </div>
      )}
      {exp.tags && (
        <div className="text-[12px] text-[#999] mt-2">
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
      <h2 className="text-[11px] font-semibold text-[#999] uppercase tracking-[0.14em] mb-2">
        Experience
      </h2>

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
