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
        PROJECTS
      </h2>
      <div className="flex flex-col gap-1">
        {PROJECTS.map((proj, i) => (
          <button
            key={proj.name}
            onClick={() => onSelect(proj)}
            className={`group w-full text-left bg-transparent border-0 font-[inherit] px-3 py-3 -mx-3 rounded-md cursor-pointer transition-all duration-300 hover:bg-[#fafafa] ${
              visible[i] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'
            }`}
          >
            <div className="text-[15px] max-sm:text-[14px] text-[#1a1a1a] transition-colors duration-150 group-hover:text-[#555]">
              <span className="font-medium">{proj.name}</span>
            </div>
            <div className="text-[14px] max-sm:text-[13px] text-[#999] mt-0.5">
              {proj.sub.toLowerCase()}
            </div>
          </button>
        ))}
      </div>
    </section>
  );
}
