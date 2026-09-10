import { Link } from 'react-router-dom';
import { SITE } from '../data';

export default function Header() {
  function scrollToExperience(e: React.MouseEvent) {
    e.preventDefault();
    document.querySelector('#experience')?.scrollIntoView({ behavior: 'smooth' });
  }

  return (
    <header id="about" className="animate-fade-in min-h-[85vh] max-sm:min-h-[70vh] flex flex-col justify-center">
      <div>
        <Link to="/" className="text-[48px] max-sm:text-[36px] font-semibold tracking-tight text-[#111] no-underline leading-[1.1]">
          {SITE.name}
        </Link>
        <div className="text-[18px] max-sm:text-[16px] font-normal text-[#666] mt-2">
          {SITE.tagline}
        </div>

        <div className="flex gap-3 mt-10 max-sm:mt-8">
          <a
            href="#experience"
            onClick={scrollToExperience}
            className="bg-[#111] text-white text-[15px] max-sm:text-[14px] font-medium px-7 max-sm:px-5 py-3 max-sm:py-2.5 rounded-full no-underline transition-all duration-200 hover:bg-[#333] active:scale-[0.97]"
          >
            view work
          </a>
          <a
            href={SITE.resumePath}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[15px] max-sm:text-[14px] font-medium px-7 max-sm:px-5 py-3 max-sm:py-2.5 rounded-full bg-black/[0.04] text-[#111] no-underline transition-all duration-200 hover:bg-black/[0.07] active:scale-[0.97]"
          >
            open resume
          </a>
        </div>
      </div>
    </header>
  );
}
