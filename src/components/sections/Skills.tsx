import { useEffect, useRef, useState } from 'react';
import { SKILLS } from '../../lib/constants';

export default function Skills() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) { setVisible(true); observer.disconnect(); }
      },
      { threshold: 0.1 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const allSkills = SKILLS.flatMap(g => g.values);

  return (
    <section ref={ref} className={`mb-20 max-sm:mb-14 transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-3'}`}>
      <h2 className="text-[13px] max-sm:text-[12px] font-medium text-[#86868b] uppercase tracking-[0.04em] mb-8 max-sm:mb-6">
        Skills
      </h2>
      <div className="flex flex-wrap gap-2.5 max-sm:gap-2">
        {allSkills.map((skill, i) => (
          <span
            key={skill}
            onMouseEnter={() => setHoveredSkill(skill)}
            onMouseLeave={() => setHoveredSkill(null)}
            className={`text-[15px] max-sm:text-[14px] px-3.5 py-1.5 rounded-full cursor-default transition-all duration-200 ${
              hoveredSkill === null
                ? 'text-[#1d1d1f] bg-[#f5f5f7]'
                : hoveredSkill === skill
                  ? 'text-[#1d1d1f] bg-[#e8e8ed] scale-105'
                  : 'text-[#d2d2d7] bg-[#f5f5f7]'
            }`}
            style={{ transitionDelay: visible ? `${i * 20}ms` : '0ms' }}
          >
            {skill}
          </span>
        ))}
      </div>
    </section>
  );
}
