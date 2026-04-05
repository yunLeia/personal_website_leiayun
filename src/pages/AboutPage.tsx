import { ABOUT, SITE } from '../lib/constants';

export default function AboutPage() {
  return (
    <div>
      <div className="mb-10">
        {ABOUT.intro.map((p, i) => (
          <p
            key={i}
            className="text-[14px] leading-[1.8] text-[#444] mb-4 last:mb-0"
          >
            {p}
          </p>
        ))}
      </div>

      <div className="mb-10">
        <div className="text-[14px] font-medium text-[#1a1a1a] mb-3">
          Currently
        </div>
        <ul className="list-none flex flex-col gap-1.5">
          {ABOUT.currently.map((item, i) => (
            <li
              key={i}
              className="text-[13px] text-[#555] pl-4 relative before:content-['·'] before:absolute before:left-0 before:text-[#999]"
            >
              {item}
            </li>
          ))}
        </ul>
      </div>

      <div className="flex gap-5 text-[13px]">
        <a
          href={`mailto:${SITE.email}`}
          className="text-[#555] no-underline hover:text-[#1a1a1a] transition-colors duration-150"
        >
          {SITE.email}
        </a>
      </div>
    </div>
  );
}
