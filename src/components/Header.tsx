import { Link, useLocation, useNavigate } from 'react-router-dom';
import { SITE, LINKS, NAV_LINKS } from '../data';

export default function Header() {
  const location = useLocation();
  const navigate = useNavigate();

  function handleClick(e: React.MouseEvent, link: (typeof NAV_LINKS)[number]) {
    if (link.type === 'scroll') {
      e.preventDefault();
      if (location.pathname !== '/') {
        navigate('/' + link.href);
      } else {
        document.querySelector(link.href)?.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }

  return (
    <header className="animate-fade-in">
      <div className="flex justify-between items-start">
        <div>
          <Link to="/" className="text-[28px] max-sm:text-[24px] font-semibold tracking-tight text-[#1d1d1f] no-underline">
            {SITE.name}
          </Link>
          <div className="text-[15px] max-sm:text-[14px] text-[#86868b] mt-0.5">
            {SITE.tagline}
          </div>
        </div>
        <nav className="flex items-center gap-7 max-sm:gap-3 pt-2 shrink-0">
          {NAV_LINKS.map((link) =>
            link.type === 'route' ? (
              <Link
                key={link.label}
                to={link.href}
                className="text-[15px] max-sm:text-[12px] text-[#86868b] no-underline transition-opacity duration-200 hover:opacity-60 whitespace-nowrap"
              >
                {link.label.toLowerCase()}
              </Link>
            ) : (
              <a
                key={link.label}
                href={link.href}
                onClick={(e) => handleClick(e, link)}
                className="text-[15px] max-sm:text-[12px] text-[#86868b] no-underline transition-opacity duration-200 hover:opacity-60 whitespace-nowrap"
              >
                {link.label.toLowerCase()}
              </a>
            ),
          )}
          {LINKS.map((link) => (
            <a
              key={link.label}
              href={link.href}
              target={link.external ? '_blank' : undefined}
              rel={link.external ? 'noopener noreferrer' : undefined}
              className="text-[15px] max-sm:text-[12px] text-[#86868b] no-underline transition-opacity duration-200 hover:opacity-60 whitespace-nowrap"
            >
              {link.label.toLowerCase()}
              {link.external && <span className="text-[10px] max-sm:text-[9px] ml-0.5">&#8599;</span>}
            </a>
          ))}
        </nav>
      </div>

      {/* Two buttons */}
      <div className="flex gap-3 mt-6">
        <Link
          to="/work"
          className="bg-[#1d1d1f] text-white text-[14px] max-sm:text-[13px] font-medium px-5 py-2 rounded-full no-underline transition-all duration-200 hover:bg-[#424245] active:scale-[0.97]"
        >
          view work
        </Link>
        <a
          href={SITE.resumePath}
          download
          className="text-[14px] max-sm:text-[13px] font-medium px-5 py-2 rounded-full border border-[#d2d2d7] text-[#1d1d1f] no-underline transition-all duration-200 hover:bg-[#f5f5f7] active:scale-[0.97]"
        >
          download resume
        </a>
      </div>
    </header>
  );
}
