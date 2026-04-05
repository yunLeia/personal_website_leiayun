import { Link } from 'react-router';
import { EXPERIENCE } from '../../lib/constants';

export default function ExperiencePreview() {
  const preview = EXPERIENCE.slice(0, 3);

  return (
    <section className="mb-12">
      <div className="text-[14px] font-medium text-[#1a1a1a] mb-4">
        Experience
      </div>
      <div className="flex flex-col gap-2">
        {preview.map((exp) => (
          <div
            key={exp.company}
            className="bg-[#fafafa] rounded-lg px-5 py-4 max-sm:px-4 max-sm:py-3"
          >
            <div className="flex justify-between items-baseline mb-1">
              <span className="text-[13px] font-medium text-[#1a1a1a]">
                {exp.company}
              </span>
              <span className="text-[12px] text-[#999]">{exp.date}</span>
            </div>
            <div className="text-[12px] text-[#666]">{exp.role}</div>
          </div>
        ))}
      </div>
      <Link
        to="/experience"
        className="text-[12px] text-[#555] no-underline mt-3 inline-block transition-colors duration-150 hover:text-[#1a1a1a]"
      >
        See more &rarr;
      </Link>
    </section>
  );
}
