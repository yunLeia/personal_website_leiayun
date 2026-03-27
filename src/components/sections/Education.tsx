import { EDUCATION } from '../../lib/constants';
import { useFadeIn } from '../../hooks/useFadeIn';

export default function Education() {
  const { ref, visible } = useFadeIn();

  return (
    <div
      ref={ref}
      className={`mb-14 transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
    >
      <div className="text-[11px] font-medium text-[#bbb] tracking-[0.1em] uppercase mb-6">
        Education
      </div>
      <div>
        <div className="flex justify-between items-baseline mb-0.5">
          <span className="text-sm font-medium">{EDUCATION.school}</span>
          <span className="text-xs text-[#bbb]">{EDUCATION.expected}</span>
        </div>
        <div className="text-[13px] text-[#888] italic mb-1">{EDUCATION.degree}</div>
        <div className="text-[13px] text-[#999] mb-2">{EDUCATION.gpa}</div>
        <ul className="list-none flex flex-col gap-1">
          <li className="text-[13px] text-[#666] font-light pl-3.5 relative before:content-['·'] before:absolute before:left-0 before:text-[#ccc]">
            <span className="text-[#888] font-normal">Organizations:</span> {EDUCATION.orgs}
          </li>
          <li className="text-[13px] text-[#666] font-light pl-3.5 relative before:content-['·'] before:absolute before:left-0 before:text-[#ccc]">
            <span className="text-[#888] font-normal">Coursework:</span> {EDUCATION.coursework}
          </li>
        </ul>
      </div>
    </div>
  );
}
