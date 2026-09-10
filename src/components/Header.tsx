import { Link } from 'react-router-dom';
import { SITE } from '../data';
import HalftonePhoto from './HalftonePhoto';

const LINK = 'text-[#1a1a1a] underline decoration-dotted decoration-1 underline-offset-[3px] hover:decoration-solid transition-all duration-150';

export default function Header() {
  function scrollToExperience(e: React.MouseEvent) {
    e.preventDefault();
    document.querySelector('#experience')?.scrollIntoView({ behavior: 'smooth' });
  }

  function scrollToContact(e: React.MouseEvent) {
    e.preventDefault();
    document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' });
  }

  return (
    <header id="about" className="animate-fade-in pt-6 max-sm:pt-2 pb-4">
      <HalftonePhoto src={SITE.photo} alt={SITE.name} size={112} cell={4} className="rounded-full mb-6" />

      <Link to="/" className="inline-flex items-center gap-2 no-underline mb-5">
        <span className="text-[17px] font-semibold tracking-tight text-[#1a1a1a]">{SITE.name}</span>
        <span className="flex gap-[3px]">
          <span className="w-[6px] h-[6px] bg-[#c96f4a]" />
          <span className="w-[6px] h-[6px] bg-[#999]" />
        </span>
      </Link>

      <div className="flex flex-col gap-4 max-w-[480px]">
        <p className="text-[14px] text-[#4a4a4a] leading-[1.7]">
          {SITE.tagline}. I'm a CS + Data Science student at NYU who builds products and turns user
          behavior into data-driven decisions.
        </p>
        <p className="text-[14px] text-[#4a4a4a] leading-[1.7]">
          Most recently at{' '}
          <a href="#experience" onClick={scrollToExperience} className={LINK}>
            Planfit
          </a>
          , I owned features end-to-end and ran 40+ experiments to improve activation and conversion.
        </p>
        <p className="text-[14px] text-[#4a4a4a] leading-[1.7]">
          See{' '}
          <a href="#experience" onClick={scrollToExperience} className={LINK}>
            my work
          </a>
          , open my{' '}
          <a href={SITE.resumePath} target="_blank" rel="noopener noreferrer" className={LINK}>
            resume
          </a>
          , or{' '}
          <a href="#contact" onClick={scrollToContact} className={LINK}>
            say hi
          </a>
          .
        </p>
      </div>
    </header>
  );
}
