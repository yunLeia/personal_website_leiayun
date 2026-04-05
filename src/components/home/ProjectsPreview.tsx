import { Link } from 'react-router';
import { PROJECTS } from '../../lib/constants';

export default function ProjectsPreview() {
  const preview = PROJECTS.slice(0, 3);

  return (
    <section className="mb-12">
      <div className="text-[14px] font-medium text-[#1a1a1a] mb-4">
        Projects
      </div>
      <div className="flex flex-col gap-2">
        {preview.map((proj) => (
          <div
            key={proj.name}
            className="bg-[#fafafa] rounded-lg px-5 py-4 max-sm:px-4 max-sm:py-3"
          >
            <div className="flex justify-between items-baseline mb-1">
              <span className="text-[13px] font-medium text-[#1a1a1a]">
                {proj.name}
              </span>
              <span className="text-[12px] text-[#999]">{proj.sub}</span>
            </div>
            <div className="text-[11px] text-[#888]">{proj.desc}</div>
          </div>
        ))}
      </div>
      <Link
        to="/projects"
        className="text-[12px] text-[#555] no-underline mt-3 inline-block transition-colors duration-150 hover:text-[#1a1a1a]"
      >
        See more &rarr;
      </Link>
    </section>
  );
}
