import { SITE } from '../data';

interface Props {
  onAvatarClick: () => void;
  avatarActive: boolean;
}

function DockIcon({ children, label, onClick }: { children: React.ReactNode; label: string; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      title={label}
      className="w-9 h-9 flex items-center justify-center rounded-full text-[#666] transition-colors duration-150 hover:bg-black/[0.05] hover:text-[#111] cursor-pointer"
    >
      {children}
    </button>
  );
}

function scrollTo(id: string) {
  document.querySelector(id)?.scrollIntoView({ behavior: 'smooth' });
}

export default function Dock({ onAvatarClick, avatarActive }: Props) {
  return (
    <nav
      aria-label="Primary"
      className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40 flex items-center gap-1 px-2 py-2 rounded-full bg-[oklab(0.99_0_0.001_/_0.72)] shadow-[0_0_0_1px_rgba(0,0,0,0.06),0_8px_30px_rgba(0,0,0,0.1)]"
    >
      <button
        type="button"
        onClick={onAvatarClick}
        aria-label="About Leia"
        title="About"
        className={`w-9 h-9 rounded-full overflow-hidden shrink-0 transition-all duration-150 cursor-pointer ${
          avatarActive ? 'ring-2 ring-black/20' : 'hover:ring-2 hover:ring-black/10'
        }`}
      >
        <img src={SITE.photo} alt={SITE.name} className="w-full h-full object-cover" />
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

      <DockIcon label="Contact" onClick={() => scrollTo('#contact')}>
        <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
          <rect x="3" y="5" width="18" height="14" rx="2" />
          <path d="m3 7 9 6 9-6" />
        </svg>
      </DockIcon>
    </nav>
  );
}
