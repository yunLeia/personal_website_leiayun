import { HIGHLIGHTS } from '../data';
import { useStaggerReveal } from '../hooks/useStaggerReveal';

export default function Highlights() {
  const { ref, visible } = useStaggerReveal(HIGHLIGHTS.length, 100);

  return (
    <div ref={ref} className="flex gap-10 max-sm:gap-6 mt-12 mb-20 max-sm:mb-14">
      {HIGHLIGHTS.map((h, i) => (
        <div
          key={h.label}
          className={`transition-all duration-300 ${
            visible[i] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-3'
          }`}
        >
          <div className="text-[28px] max-sm:text-[22px] font-semibold text-[#1d1d1f] tracking-tight leading-none">
            {h.value}
          </div>
          <div className="text-[13px] max-sm:text-[12px] text-[#86868b] mt-1.5">
            {h.label}
          </div>
        </div>
      ))}
    </div>
  );
}
