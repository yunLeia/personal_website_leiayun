import { EXPERIENCE } from '../../lib/constants';
import { useFadeIn } from '../../hooks/useFadeIn';

export default function Experience() {
  const { ref, visible } = useFadeIn();

  return (
    <div
      ref={ref}
      className={`mb-14 transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
    >
      <div className="text-[11px] font-medium text-[#bbb] tracking-[0.1em] uppercase mb-6">
        Experience
      </div>
      <div className="flex flex-col gap-7">
        {EXPERIENCE.map((exp) => (
          <div key={exp.company} className="group">
            <div className="flex justify-between items-baseline mb-0.5">
              <span className="text-sm font-medium">{exp.company}</span>
              <span className="text-xs text-[#bbb]">{exp.date}</span>
            </div>
            <div className="text-[13px] text-[#888] mb-0.5">{exp.role}</div>
            {exp.team && (
              <div className="text-[12px] text-[#aaa] italic mb-2">{exp.team}</div>
            )}
            {!exp.team && <div className="mb-2" />}
            <ul className="list-none flex flex-col gap-1">
              {exp.bullets.map((bullet, i) => (
                <li
                  key={i}
                  className="text-[13px] text-[#666] font-light pl-3.5 relative before:content-['·'] before:absolute before:left-0 before:text-[#ccc]"
                >
                  {bullet}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}
