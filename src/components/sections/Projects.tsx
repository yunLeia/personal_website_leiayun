import { PROJECTS } from '../../lib/constants';

export default function Projects() {
  return (
    <div className="flex flex-col gap-2">
      {PROJECTS.map((proj) => (
        <div
          key={proj.name}
          className="bg-[#fafafa] rounded-lg px-5 py-4 max-sm:px-4 max-sm:py-3"
        >
          <div className="flex justify-between items-baseline mb-1">
            <span className="text-[13px] font-medium text-[#1a1a1a]">
              {proj.name}
            </span>
            <span className="text-[12px] text-[#999]">{proj.sub}</span>
          </div>
          <div className="text-[12px] text-[#666] mb-1">{proj.desc}</div>
          {proj.metric && (
            <div className="text-[12px] font-medium text-[#1a1a1a]">
              {proj.metric}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
