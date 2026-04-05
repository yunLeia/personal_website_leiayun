import { useEffect, useRef, useState } from 'react';
import { EXPERIENCE } from '../../lib/constants';
import type { ExperienceItem } from '../../types';

interface Props {
  onSelect: (item: ExperienceItem) => void;
}

export default function ExperiencePreview({ onSelect }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState<boolean[]>(new Array(EXPERIENCE.length).fill(false));

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      () => {
        EXPERIENCE.forEach((_, i) => {
          setTimeout(() => {
            setVisible(prev => { const n = [...prev]; n[i] = true; return n; });
          }, i * 100);
        });
        observer.disconnect();
      },
      { threshold: 0.1 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={ref} className="mb-14">
      <h2 className="text-[17px] max-sm:text-[16px] font-bold text-[#1a1a1a] mb-6">
        EXPERIENCE
      </h2>
      <div className="flex flex-col gap-1">
        {EXPERIENCE.map((exp, i) => (
          <button
            key={exp.company}
            onClick={() => onSelect(exp)}
            className={`group w-full text-left bg-transparent border-0 font-[inherit] px-3 py-3 -mx-3 rounded-md cursor-pointer transition-all duration-300 hover:bg-[#fafafa] ${
              visible[i] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'
            }`}
          >
            <div className="text-[15px] max-sm:text-[14px] text-[#1a1a1a] transition-colors duration-150 group-hover:text-[#555]">
              {exp.role.toLowerCase()} at{' '}
              {exp.url ? (
                <a
                  href={exp.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  className="font-medium underline underline-offset-2 decoration-[#ccc] hover:decoration-[#1a1a1a] transition-colors duration-150 text-inherit"
                >
                  {exp.company}
                </a>
              ) : (
                <span className="font-medium underline underline-offset-2 decoration-[#ccc]">
                  {exp.company}
                </span>
              )}
            </div>
            <div className="text-[14px] max-sm:text-[13px] text-[#999] mt-0.5">
              {exp.date.toLowerCase()}
            </div>
          </button>
        ))}
      </div>
    </section>
  );
}
