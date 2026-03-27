import { SITE } from '../../lib/constants';

const NAV_LINKS = [
  { label: 'Experience', href: '#experience' },
  { label: 'Projects', href: '#projects' },
  { label: 'Contact', href: '#contact' },
];

export default function Nav() {
  return (
    <nav className="fixed top-0 left-0 w-full z-50 px-6 max-sm:px-5 py-5 max-sm:py-4 flex justify-between items-center">
      <a href="#" className="text-[14px] font-medium text-[#1a1a1a] no-underline">
        {SITE.name}
      </a>
      <div className="flex gap-7 max-sm:gap-5">
        {NAV_LINKS.map((link) => (
          <a
            key={link.href}
            href={link.href}
            className="text-[14px] max-sm:text-[13px] text-[#888] no-underline transition-colors duration-150 hover:text-[#1a1a1a]"
          >
            {link.label}
          </a>
        ))}
      </div>
    </nav>
  );
}
