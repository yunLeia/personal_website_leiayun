import { SKILLS } from '../../lib/constants';
import { useFadeIn } from '../../hooks/useFadeIn';

export default function Skills() {
  const { ref, visible } = useFadeIn();

  return (
    <div
      ref={ref}
      className={`mb-14 transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
    >
      <div className="text-[11px] font-medium text-[#bbb] tracking-[0.1em] uppercase mb-6">
        Skills
      </div>
      <div className="flex flex-col gap-2.5">
        {SKILLS.map((skill) => (
          <div
            key={skill.category}
            className="grid grid-cols-[72px_1fr] gap-4 items-baseline max-[480px]:grid-cols-1 max-[480px]:gap-0.5"
          >
            <span className="text-xs text-[#bbb]">{skill.category}</span>
            <span className="text-[13px] text-[#666] font-light">
              {skill.values}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
