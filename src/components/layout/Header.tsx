import { SITE, CONTACTS } from '../../lib/constants';

export default function Header() {
  return (
    <header className="flex justify-between items-start animate-fade-in">
      <div>
        <div className="text-[24px] max-sm:text-[20px] font-semibold text-[#1a1a1a]">
          {SITE.name}
        </div>
        <a
          href={`mailto:${SITE.email}`}
          className="text-[14px] max-sm:text-[13px] text-[#999] no-underline transition-colors duration-150 hover:text-[#1a1a1a]"
        >
          {SITE.email}
        </a>
      </div>
      <nav className="flex items-center gap-6 max-sm:gap-4 pt-2">
        {CONTACTS.filter(l => l.label !== 'Email').map((link) => (
          <a
            key={link.label}
            href={link.href}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[15px] max-sm:text-[13px] text-[#888] no-underline transition-colors duration-150 hover:text-[#1a1a1a]"
          >
            {link.label.toLowerCase()}
            <span className="text-[10px] ml-0.5">&#8599;</span>
          </a>
        ))}
      </nav>
    </header>
  );
}
