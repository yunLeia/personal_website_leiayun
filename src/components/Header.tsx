import { SITE, EXPERIENCE, PROJECTS } from '../data';
import HalftonePhoto from './HalftonePhoto';

const LINK = 'text-[#1a1a1a] underline decoration-dotted decoration-1 underline-offset-[3px] hover:decoration-solid transition-all duration-150';

function scrollTo(id: string) {
  document.querySelector(id)?.scrollIntoView({ behavior: 'smooth' });
}

function StatCell({ icon, label, count, onClick }: { icon: React.ReactNode; label: string; count: string; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="flex-1 flex flex-col items-center gap-2 py-5 cursor-pointer hover:bg-black/[0.02] transition-colors"
    >
      <div className="w-6 h-6 flex items-center justify-center text-[#666]">{icon}</div>
      <div className="text-[13px] font-semibold text-[#1a1a1a]">{label}</div>
      <div className="text-[12px] text-[#999]">{count}</div>
    </button>
  );
}

export default function Header() {
  return (
    <header id="about" className="animate-fade-in pt-6 max-sm:pt-2 pb-8">
      <div className="flex max-sm:flex-col-reverse gap-6">
        <div className="flex-1 min-w-0">
          <div className="inline-flex items-center gap-2 mb-4">
            <span className="text-[16px] font-semibold tracking-tight text-[#1e1d1b]">{SITE.name}</span>
            <span className="flex gap-[3px]">
              <span className="w-[6px] h-[6px] bg-[#c96f4a]" />
              <span className="w-[6px] h-[6px] bg-[#999]" />
            </span>
          </div>

          <div className="flex flex-col gap-3.5">
            <p className="text-[14px] text-[#464542] leading-[1.7]">
              {SITE.tagline}. I'm a CS + Data Science student at NYU who builds products and turns user
              behavior into data-driven decisions.
            </p>
            <p className="text-[14px] text-[#464542] leading-[1.7]">
              Most recently at{' '}
              <a href="#experience" onClick={(e) => { e.preventDefault(); scrollTo('#experience'); }} className={LINK}>
                Planfit
              </a>
              , I owned features end-to-end and ran 40+ experiments to improve activation and conversion.
            </p>
            <p className="text-[14px] text-[#464542] leading-[1.7]">
              See{' '}
              <a href="#experience" onClick={(e) => { e.preventDefault(); scrollTo('#experience'); }} className={LINK}>
                my work
              </a>
              , open my{' '}
              <a href={SITE.resumePath} target="_blank" rel="noopener noreferrer" className={LINK}>
                resume
              </a>
              , or{' '}
              <a href="#contact" onClick={(e) => { e.preventDefault(); scrollTo('#contact'); }} className={LINK}>
                say hi
              </a>
              .
            </p>
          </div>
        </div>

        <HalftonePhoto src={SITE.photo} alt={SITE.name} size={112} cell={4} className="rounded-lg shrink-0 max-sm:mx-auto" />
      </div>

      <div className="border border-black/10 rounded-lg divide-x divide-black/10 flex mt-2">
        <StatCell
          onClick={() => scrollTo('#experience')}
          label="Experience"
          count={`${EXPERIENCE.length} roles`}
          icon={
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="7" width="18" height="13" rx="2" />
              <path d="M8 7V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
            </svg>
          }
        />
        <StatCell
          onClick={() => scrollTo('#projects')}
          label="Projects"
          count={`${PROJECTS.length} projects`}
          icon={
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="3" width="8" height="8" rx="1.5" />
              <rect x="13" y="3" width="8" height="8" rx="1.5" />
              <rect x="3" y="13" width="8" height="8" rx="1.5" />
              <rect x="13" y="13" width="8" height="8" rx="1.5" />
            </svg>
          }
        />
        <StatCell
          onClick={() => scrollTo('#contact')}
          label="Contact"
          count="say hi"
          icon={
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="5" width="18" height="14" rx="2" />
              <path d="m3 7 9 6 9-6" />
            </svg>
          }
        />
      </div>
    </header>
  );
}
