import { PROJECTS } from '../../lib/constants';
import { useFadeIn } from '../../hooks/useFadeIn';

export default function Projects() {
  const { ref, visible } = useFadeIn();

  return (
    <div
      ref={ref}
      className={`mb-14 transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
    >
      <div className="text-[11px] font-medium text-[#bbb] tracking-[0.1em] uppercase mb-6">
        Projects
      </div>
      <div className="flex flex-col">
        {PROJECTS.map((proj, i) => (
          <div
            key={proj.name}
            className={`flex justify-between items-baseline gap-4 py-3.5 border-b border-[#f0f0f0] transition-colors duration-200 hover:bg-[#fafafa] px-2 -mx-2 rounded-sm max-[480px]:flex-col max-[480px]:gap-1 ${
              i === 0 ? 'border-t border-t-[#f0f0f0]' : ''
            }`}
          >
            <div className="flex-1">
              <div className="text-[13px] font-medium mb-0.5">{proj.name}</div>
              <div className="text-[11px] text-[#bbb] italic mb-1">{proj.stack}</div>
              <div className="text-xs text-[#999] font-light">{proj.desc}</div>
            </div>
            <div className="shrink-0">
              <div className="text-[13px] font-medium text-[#111] whitespace-nowrap text-right max-[480px]:text-left">
                {proj.metric}
              </div>
              <div className="text-[11px] text-[#bbb] text-right max-[480px]:text-left">
                {proj.metricSub}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
