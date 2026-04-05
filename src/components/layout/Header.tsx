import { Link, useLocation } from 'react-router';
import { SITE } from '../../lib/constants';

const NAV_LINKS = [
  { label: 'about', to: '/about' },
  { label: 'contact', to: '/#contact' },
  { label: 'resume', href: SITE.resume },
];

export default function Header() {
  const location = useLocation();

  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-white/80 backdrop-blur-sm">
      <div className="max-w-[680px] mx-auto px-6 max-sm:px-5 py-5 max-sm:py-4 flex justify-between items-center">
        <Link
          to="/"
          className="text-[16px] font-medium text-[#1a1a1a] no-underline"
        >
          {SITE.name}
        </Link>
        <div className="flex gap-6 max-sm:gap-4">
          {NAV_LINKS.map((link) =>
            link.href ? (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[13px] text-[#555] no-underline transition-colors duration-150 hover:text-[#1a1a1a]"
              >
                {link.label} <span className="text-[11px]">&#8599;</span>
              </a>
            ) : (
              <Link
                key={link.label}
                to={link.to!}
                className={`text-[13px] no-underline transition-colors duration-150 hover:text-[#1a1a1a] ${
                  location.pathname === link.to ? 'text-[#1a1a1a]' : 'text-[#555]'
                }`}
              >
                {link.label}
              </Link>
            ),
          )}
        </div>
      </div>
    </header>
  );
}
