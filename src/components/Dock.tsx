import { SITE } from '../data';
import HalftonePhoto from './HalftonePhoto';

function Tooltip({ label }: { label: string }) {
  return (
    <span className="pointer-events-none absolute bottom-full left-1/2 -translate-x-1/2 mb-2.5 px-2 py-1 rounded-md bg-[#1e1d1b] text-white text-[12px] font-medium whitespace-nowrap opacity-0 scale-95 group-hover:opacity-100 group-hover:scale-100 transition-all duration-150">
      {label}
    </span>
  );
}

function DockIcon({ children, label, onClick }: { children: React.ReactNode; label: string; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      className="group relative w-9 h-9 flex items-center justify-center rounded-full text-[#666] transition-colors duration-150 hover:bg-black/[0.05] hover:text-[#111] cursor-pointer"
    >
      <Tooltip label={label} />
      {children}
    </button>
  );
}

function scrollTo(id: string) {
  document.querySelector(id)?.scrollIntoView({ behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth' });
}

export default function Dock() {
  return (
    <nav
      aria-label="Primary"
      className="portfolio-dock"
    >
      <button
        type="button"
        onClick={() => window.scrollTo({ top: 0, behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth' })}
        aria-label="Back to top"
        className="group relative w-9 h-9 rounded-full overflow-hidden shrink-0 cursor-pointer hover:ring-2 hover:ring-black/10"
      >
        <Tooltip label="Back to top" />
        <HalftonePhoto src={SITE.photo} alt="Leia Yun in halftone dots" size={36} cell={1.5} />
      </button>

      <div className="w-px h-5 bg-black/10 mx-1" />

      <DockIcon label="Experience" onClick={() => scrollTo('#experience')}>
        <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
          <rect x="3" y="7" width="18" height="13" rx="2" />
          <path d="M8 7V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
        </svg>
      </DockIcon>

      <DockIcon label="Projects" onClick={() => scrollTo('#projects')}>
        <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
          <rect x="3" y="3" width="8" height="8" rx="1.5" />
          <rect x="13" y="3" width="8" height="8" rx="1.5" />
          <rect x="3" y="13" width="8" height="8" rx="1.5" />
          <rect x="13" y="13" width="8" height="8" rx="1.5" />
        </svg>
      </DockIcon>

      <DockIcon label="On the Shelf" onClick={() => scrollTo('#shelf')}>
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><circle cx="15" cy="4" r="2"/><path d="m5 10 4-3 4 2 3 4h4M13 9l-3 6 4 3v4M10 15l-4 4H2"/></svg>
      </DockIcon>

      <DockIcon label="Contact" onClick={() => scrollTo('#contact')}>
        <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
          <rect x="3" y="5" width="18" height="14" rx="2" />
          <path d="m3 7 9 6 9-6" />
        </svg>
      </DockIcon>
    </nav>
  );
}
