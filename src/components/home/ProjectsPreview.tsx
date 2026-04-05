import { useEffect, useRef, useState } from 'react';
import { PROJECTS } from '../../lib/constants';
import type { ProjectRow } from '../../types';

interface Props {
  onSelect: (item: ProjectRow) => void;
}

export default function ProjectsPreview({ onSelect }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState<boolean[]>(new Array(PROJECTS.length).fill(false));

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      () => {
        PROJECTS.forEach((_, i) => {
          setTimeout(() => {
            setVisible(prev => { const n = [...prev]; n[i] = true; return n; });
          }, i * 120);
        });
        observer.disconnect();
      },
      { threshold: 0.1 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={ref} className="mb-20 max-sm:mb-14">
      <h2 className="text-[13px] max-sm:text-[12px] font-medium text-[#86868b] uppercase tracking-[0.04em] mb-8 max-sm:mb-6">
        Projects
      </h2>
      <div className="flex flex-col gap-1">
        {PROJECTS.map((proj, i) => (
          <button
            key={proj.name}
            onClick={() => onSelect(proj)}
            className={`group w-full text-left bg-transparent border-0 font-[inherit] px-4 py-4 -mx-4 rounded-xl cursor-pointer transition-all duration-300 hover:bg-[#f5f5f7] ${
              visible[i] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-3'
            }`}
          >
            <div className="text-[17px] max-sm:text-[15px] font-semibold text-[#1d1d1f] tracking-tight transition-opacity duration-200 group-hover:opacity-70">
              {proj.name}
            </div>
            <div className="text-[15px] max-sm:text-[13px] text-[#86868b] mt-1">
              {proj.sub.toLowerCase()}
            </div>
          </button>
        ))}
      </div>
    </section>
  );
}
