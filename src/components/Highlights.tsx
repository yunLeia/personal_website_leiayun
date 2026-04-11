import { HIGHLIGHTS } from '../data';
import { useStaggerReveal } from '../hooks/useStaggerReveal';

export default function Highlights() {
  const { ref, visible } = useStaggerReveal(HIGHLIGHTS.length, 100);

  return (
    <div ref={ref} className="grid grid-cols-3 max-sm:grid-cols-3 gap-4 mt-12 mb-20 max-sm:mb-14">
      {HIGHLIGHTS.map((h, i) => (
        <div
          key={h.label}
          className={`bg-[#fafafa] border border-[#eee] rounded-xl px-6 py-5 max-sm:px-4 max-sm:py-4 transition-all duration-300 ${
            visible[i] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-3'
          }`}
        >
          <div className="text-[32px] max-sm:text-[22px] font-semibold text-[#111] tracking-tight leading-none" style={{ fontFamily: "'Lora', serif" }}>
            {h.value}
          </div>
          <div className="text-[12px] max-sm:text-[11px] font-medium text-[#888] mt-2 uppercase tracking-[0.06em]">
            {h.label}
          </div>
        </div>
      ))}
    </div>
  );
}
