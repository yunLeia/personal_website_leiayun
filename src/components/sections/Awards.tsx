import { AWARDS } from '../../lib/constants';
import { useFadeIn } from '../../hooks/useFadeIn';

export default function Awards() {
  const { ref, visible } = useFadeIn();

  return (
    <div
      ref={ref}
      className={`mb-14 transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
    >
      <div className="text-[11px] font-medium text-[#bbb] tracking-[0.1em] uppercase mb-6">
        Awards & Certificates
      </div>
      <div className="flex flex-col">
        {AWARDS.map((award, i) => (
          <div
            key={award.name}
            className={`flex justify-between items-baseline py-3 border-b border-[#f0f0f0] ${
              i === 0 ? 'border-t border-t-[#f0f0f0]' : ''
            }`}
          >
            <span className="text-[13px] text-[#666] font-light">{award.name}</span>
            <span className="text-xs text-[#bbb]">{award.date}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
