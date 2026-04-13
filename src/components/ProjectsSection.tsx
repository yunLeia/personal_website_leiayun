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
      <h2 className="text-[11px] font-semibold text-[#bbb] uppercase tracking-[0.14em] mb-6">
        Projects
      </h2>

      <div className="grid grid-cols-2 max-sm:grid-cols-1 gap-4">
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
              className={`group w-full text-left font-[inherit] px-6 py-5 rounded-xl cursor-pointer transition-all duration-300 bg-white/55 backdrop-blur-[20px] border border-white/70 shadow-[0_2px_12px_rgba(0,0,0,0.04)] hover:border-white/90 hover:shadow-[0_4px_20px_rgba(0,0,0,0.06)] ${
                visible[i] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-3'
              } ${activeKey === key ? 'border-white/90 shadow-[0_4px_20px_rgba(0,0,0,0.06)]' : ''}`}
            >
              <div className="text-[16px] max-sm:text-[15px] font-semibold text-[#111] tracking-tight transition-opacity duration-200 group-hover:opacity-70">
                {proj.name}
              </div>
              <div className="text-[14px] max-sm:text-[13px] font-light text-[#555] mt-1.5 leading-[1.5]">
                {proj.sub}
              </div>
            </button>
          );
        })}
      </div>
    </section>
  );
}
