import { SKILLS } from '../../lib/constants';

export default function Skills() {
  return (
    <section className="mb-12">
      <div className="text-[14px] font-medium text-[#1a1a1a] mb-4">
        Skills
      </div>
      <div className="flex flex-wrap gap-1.5">
        {SKILLS.flatMap((group) =>
          group.values.map((val) => (
            <span
              key={val}
              className="bg-[#fafafa] rounded-md px-3 py-1.5 text-[12px] text-[#555]"
            >
              {val}
            </span>
          )),
        )}
      </div>
    </section>
  );
}
