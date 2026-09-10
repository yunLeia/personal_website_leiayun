import { useNavigate } from 'react-router-dom';
import { PROJECTS } from '../data';
import { useScrollReveal } from '../hooks/useScrollReveal';
import type { PanelChat } from './DetailPanel';

interface Props {
  onSelect: (chat: PanelChat) => void;
  activeKey: string | null;
}

function ProjectCard({
  proj,
  isActive,
  onClick,
}: {
  proj: (typeof PROJECTS)[number];
  isActive: boolean;
  onClick: () => void;
}) {
  const { ref, visible } = useScrollReveal();

  return (
    <div ref={ref}>
      <button
        onClick={onClick}
        className={`group w-full text-left font-[inherit] overflow-hidden rounded-[20px] max-sm:rounded-2xl cursor-pointer transition-all duration-300 bg-black/[0.03] hover:bg-black/[0.05] ${
          visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
        } ${isActive ? 'bg-black/[0.06]' : ''}`}
      >
        <div className="px-8 pt-8 pb-6 max-sm:px-6 max-sm:pt-5 max-sm:pb-5">
          <div className="text-[20px] max-sm:text-[16px] font-semibold text-[#111] tracking-tight transition-opacity duration-200 group-hover:opacity-70">
            {proj.name}
          </div>
          <div className="text-[16px] max-sm:text-[14px] font-normal text-[#444] mt-3 max-sm:mt-2 leading-[1.65] max-w-[720px]">
            {proj.sub}
          </div>
          {proj.tags && (
            <div className="flex flex-wrap gap-2 mt-4 max-sm:mt-3">
              {proj.tags.map((tag) => (
                <span
                  key={tag}
                  className="text-[11px] max-sm:text-[10px] font-medium text-[#888] bg-black/[0.05] rounded-full px-3 py-1"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>
        {proj.cover && (
          <div className="w-full aspect-[16/9] overflow-hidden border-t border-black/[0.04]">
            <img
              src={proj.cover}
              alt={proj.name}
              loading="lazy"
              decoding="async"
              className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-[1.02]"
            />
          </div>
        )}
      </button>
    </div>
  );
}

export default function ProjectsSection({ onSelect, activeKey }: Props) {
  const navigate = useNavigate();

  function handleClick(proj: (typeof PROJECTS)[number]) {
    if (proj.detailPath) {
      navigate(proj.detailPath);
    } else {
      onSelect({
        messages: proj.chat,
        title: proj.name,
        subtitle: 'project details',
      });
    }
  }

  return (
    <section id="projects" className="min-h-[85vh] max-sm:min-h-0 flex flex-col justify-center py-16 max-sm:py-10 scroll-mt-20">
      <h2 className="text-[12px] max-sm:text-[11px] font-semibold text-[#999] uppercase tracking-[0.14em] mb-10 max-sm:mb-6">
        Projects
      </h2>

      <div className="grid grid-cols-2 max-sm:grid-cols-1 gap-5 max-sm:gap-3">
        {PROJECTS.map((proj) => {
          const key = `${proj.name}-${proj.sub}`;
          return (
            <ProjectCard
              key={proj.name}
              proj={proj}
              isActive={activeKey === key}
              onClick={() => handleClick(proj)}
            />
          );
        })}
      </div>
    </section>
  );
}
