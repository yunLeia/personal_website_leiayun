import { PROJECTS } from '../../lib/constants';
import { useFadeIn } from '../../hooks/useFadeIn';

export default function Projects() {
  const { ref, visible } = useFadeIn();

  return (
    <section
      id="projects"
      ref={ref}
      className={`mb-28 max-sm:mb-20 transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
    >
      <div className="text-[12px] font-medium text-[#aaa] tracking-[0.1em] uppercase mb-10 max-sm:mb-7">
        Projects
      </div>
      <div className="flex flex-col">
        {PROJECTS.map((proj, i) => (
          <div
            key={proj.name}
            className={`py-4 max-sm:py-3.5 border-b border-[#e4e4e4] transition-colors duration-150 hover:bg-[#ebebeb] px-3 -mx-3 ${
              i === 0 ? 'border-t border-t-[#e4e4e4]' : ''
            }`}
          >
            {/* Desktop: single row */}
            <div className="flex items-baseline justify-between gap-6 max-sm:hidden">
              <div className="flex items-baseline gap-3">
                <span className="text-[14px] font-medium text-[#1a1a1a]">
                  {proj.name}
                </span>
                <span className="text-[12px] text-[#aaa]">{proj.sub}</span>
              </div>
              <span className="text-[14px] text-[#888] font-light flex-1">
                {proj.desc}
              </span>
              <span className="text-[14px] font-semibold text-[#1a1a1a] whitespace-nowrap">
                {proj.metric}
              </span>
            </div>
            {/* Mobile: stacked */}
            <div className="hidden max-sm:block">
              <div className="flex items-baseline justify-between gap-2 mb-1">
                <span className="text-[13px] font-medium text-[#1a1a1a]">
                  {proj.name}
                </span>
                <span className="text-[13px] font-semibold text-[#1a1a1a] whitespace-nowrap">
                  {proj.metric}
                </span>
              </div>
              <div className="text-[12px] text-[#888] font-light">
                {proj.desc}
              </div>
              <div className="text-[11px] text-[#aaa] mt-0.5">{proj.sub}</div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
