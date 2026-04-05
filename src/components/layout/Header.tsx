import { SITE, CONTACTS } from '../../lib/constants';

export default function Header() {
  return (
    <header className="flex justify-between items-start animate-fade-in">
      <div>
        <div className="text-[28px] max-sm:text-[24px] font-semibold tracking-tight text-[#1d1d1f]">
          {SITE.name}
        </div>
        <a
          href={`mailto:${SITE.email}`}
          className="text-[15px] max-sm:text-[14px] text-[#86868b] no-underline transition-opacity duration-200 hover:opacity-60"
        >
          {SITE.email}
        </a>
        <div className="text-[15px] max-sm:text-[14px] text-[#86868b]">
          computer science at NYU
        </div>
      </div>
      <nav className="flex items-center gap-7 max-sm:gap-3 pt-2 shrink-0">
        {CONTACTS.filter(l => l.label !== 'Email').map((link) => (
          <a
            key={link.label}
            href={link.href}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[15px] max-sm:text-[12px] text-[#86868b] no-underline transition-opacity duration-200 hover:opacity-60 whitespace-nowrap"
          >
            {link.label.toLowerCase()}
            <span className="text-[10px] max-sm:text-[9px] ml-0.5">&#8599;</span>
          </a>
        ))}
      </nav>
    </header>
  );
}
