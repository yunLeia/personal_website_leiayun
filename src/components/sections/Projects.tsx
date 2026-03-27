import { PROJECTS } from '../../lib/constants';
import { useFadeIn } from '../../hooks/useFadeIn';

export default function Projects() {
  const { ref, visible } = useFadeIn();

  return (
    <section
      id="projects"
      ref={ref}
      className={`mb-28 transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
    >
      <div className="text-[12px] font-medium text-[#aaa] tracking-[0.1em] uppercase mb-10">
        Projects
      </div>
      <div className="flex flex-col">
        {PROJECTS.map((proj, i) => (
          <div
            key={proj.name}
            className={`flex items-baseline justify-between gap-6 py-4 border-b border-[#e4e4e4] transition-colors duration-150 hover:bg-[#ebebeb] px-3 -mx-3 max-sm:flex-col max-sm:gap-1.5 ${
              i === 0 ? 'border-t border-t-[#e4e4e4]' : ''
            }`}
          >
            <div className="flex items-baseline gap-3">
              <span className="text-[14px] font-medium text-[#1a1a1a]">
                {proj.name}
              </span>
              <span className="text-[12px] text-[#aaa]">{proj.sub}</span>
            </div>
            <span className="text-[14px] text-[#888] font-light flex-1 max-sm:flex-none">
              {proj.desc}
            </span>
            <span className="text-[14px] font-semibold text-[#1a1a1a] whitespace-nowrap">
              {proj.metric}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}
