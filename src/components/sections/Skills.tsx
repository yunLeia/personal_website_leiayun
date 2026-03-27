import { SKILLS } from '../../lib/constants';
import { useFadeIn } from '../../hooks/useFadeIn';

export default function Skills() {
  const { ref, visible } = useFadeIn();

  return (
    <section
      ref={ref}
      className={`mb-28 max-sm:mb-20 transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
    >
      <div className="text-[12px] font-medium text-[#aaa] tracking-[0.1em] uppercase mb-10 max-sm:mb-7">
        Skills
      </div>
      <div className="flex flex-col gap-5 max-sm:gap-4">
        {SKILLS.map((group) => (
          <div key={group.category}>
            <span className="text-[13px] max-sm:text-[12px] font-medium text-[#aaa] block mb-1.5 sm:hidden">
              {group.category}
            </span>
            <div className="flex flex-wrap items-baseline gap-x-1.5">
              <span className="text-[13px] font-medium text-[#aaa] mr-3 max-sm:hidden">
                {group.category}
              </span>
              {group.values.map((val, i) => (
                <span key={val} className="text-[14px] max-sm:text-[13px] text-[#555]">
                  {val}
                  {i < group.values.length - 1 && (
                    <span className="text-[#ccc] mx-1.5">·</span>
                  )}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
