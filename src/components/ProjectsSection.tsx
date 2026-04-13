import { PROJECTS } from '../data';
import { useScrollReveal } from '../hooks/useScrollReveal';
import { useTagReveal } from '../hooks/useTagReveal';
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
  const tagRevealed = useTagReveal(proj.tags?.length ?? 0, visible);

  return (
    <div ref={ref}>
      <button
        onClick={onClick}
        className={`group w-full text-left font-[inherit] px-8 py-8 max-sm:px-6 max-sm:py-5 rounded-2xl max-sm:rounded-xl cursor-pointer transition-all duration-500 bg-white/15 backdrop-blur-[16px] border border-white/30 shadow-[0_2px_16px_rgba(0,0,0,0.06),inset_0_1px_0_rgba(255,255,255,0.3)] hover:bg-white/25 hover:shadow-[0_4px_24px_rgba(0,0,0,0.08),inset_0_1px_0_rgba(255,255,255,0.6)] ${
          visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
        } ${isActive ? 'bg-white/25 border-white/40 shadow-[0_4px_24px_rgba(0,0,0,0.08),inset_0_1px_0_rgba(255,255,255,0.6)]' : ''}`}
      >
        <div className="text-[20px] max-sm:text-[16px] font-semibold text-[#111] tracking-tight transition-opacity duration-200 group-hover:opacity-70">
          {proj.name}
        </div>
        <div className="text-[16px] max-sm:text-[14px] font-normal text-[#444] mt-3 max-sm:mt-1.5 leading-[1.6]">
          {proj.sub}
        </div>
        {proj.tags && (
          <div className="flex flex-wrap gap-2 mt-4 max-sm:mt-3">
            {proj.tags.map((tag, j) => (
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

export default function ProjectsSection({ onSelect, activeKey }: Props) {
  return (
    <section className="min-h-[85vh] max-sm:min-h-0 flex flex-col justify-center py-16 max-sm:py-10">
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
              onClick={() =>
                onSelect({
                  messages: proj.chat,
                  title: proj.name,
                  subtitle: 'project details',
                })
              }
            />
          );
        })}
      </div>
    </section>
  );
}
