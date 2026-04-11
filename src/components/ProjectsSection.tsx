import { PROJECTS } from '../data';
import { useStaggerReveal } from '../hooks/useStaggerReveal';
import type { PanelChat } from './DetailPanel';

interface Props {
  onSelect: (chat: PanelChat) => void;
  activeKey: string | null;
}

export default function ProjectsSection({ onSelect, activeKey }: Props) {
  const { ref, visible } = useStaggerReveal(PROJECTS.length, 120);

  return (
    <section ref={ref} className="mb-20 max-sm:mb-14">
      <h2 className="text-[13px] max-sm:text-[12px] font-medium text-[#86868b] uppercase tracking-[0.04em] mb-8 max-sm:mb-6">
        Projects
      </h2>

      <div className="flex flex-col gap-1">
        {PROJECTS.map((proj, i) => {
          const key = `${proj.name}-${proj.sub}`;
          return (
            <button
              key={proj.name}
              onClick={() =>
                onSelect({
                  messages: proj.chat,
                  title: proj.name,
                  subtitle: 'project details',
                })
              }
              className={`group w-full text-left bg-transparent border-0 font-[inherit] px-4 py-4 -mx-4 rounded-xl cursor-pointer transition-all duration-300 hover:bg-[#f5f5f7] ${
                visible[i] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-3'
              } ${activeKey === key ? 'bg-[#f5f5f7]' : ''}`}
            >
              <div className="text-[17px] max-sm:text-[15px] font-semibold text-[#1d1d1f] tracking-tight transition-opacity duration-200 group-hover:opacity-70">
                {proj.name}
              </div>
              <div className="text-[15px] max-sm:text-[13px] text-[#86868b] mt-1">
                {proj.sub}
              </div>
            </button>
          );
        })}
      </div>
    </section>
  );
}
