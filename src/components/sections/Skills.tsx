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
    <section ref={ref} className={`mb-14 transition-all duration-500 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-3'}`}>
      <h2 className="text-[17px] max-sm:text-[16px] font-bold text-[#1a1a1a] mb-6">
        SKILLS
      </h2>
      <div className="flex flex-wrap gap-2">
        {allSkills.map((skill, i) => (
          <span
            key={skill}
            onMouseEnter={() => setHoveredSkill(skill)}
            onMouseLeave={() => setHoveredSkill(null)}
            className={`text-[14px] max-sm:text-[13px] px-2.5 py-1 rounded-md cursor-default transition-all duration-200 ${
              hoveredSkill === null
                ? 'text-[#555] bg-[#fafafa]'
                : hoveredSkill === skill
                  ? 'text-[#1a1a1a] bg-[#eee] scale-105'
                  : 'text-[#ccc] bg-[#fafafa]'
            }`}
            style={{ transitionDelay: visible ? `${i * 20}ms` : '0ms' }}
          >
            {skill.toLowerCase()}
          </span>
        ))}
      </div>
    </section>
  );
}
