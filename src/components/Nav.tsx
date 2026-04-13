import { Link, useLocation, useNavigate } from 'react-router-dom';
import { LINKS, NAV_LINKS } from '../data';

export default function Nav() {
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
    <nav className="fixed top-0 right-0 z-40 flex items-center gap-7 max-sm:gap-4 px-8 max-sm:px-5 py-5 max-sm:py-4">
      {NAV_LINKS.map((link) =>
        link.type === 'route' ? (
          <Link
            key={link.label}
            to={link.href}
            className="text-[14px] max-sm:text-[12px] font-medium text-[#666] no-underline transition-opacity duration-200 hover:opacity-60 whitespace-nowrap"
          >
            {link.label.toLowerCase()}
          </Link>
        ) : (
          <a
            key={link.label}
            href={link.href}
            onClick={(e) => handleClick(e, link)}
            className="text-[14px] max-sm:text-[12px] font-medium text-[#666] no-underline transition-opacity duration-200 hover:opacity-60 whitespace-nowrap"
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
          className="text-[14px] max-sm:text-[12px] font-medium text-[#666] no-underline transition-opacity duration-200 hover:opacity-60 whitespace-nowrap"
        >
          {link.label.toLowerCase()}
          {link.external && <span className="text-[10px] max-sm:text-[9px] ml-0.5">&#8599;</span>}
        </a>
      ))}
    </nav>
  );
}
