import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { NAV_ITEMS, type NavItem } from '../data';

export default function Nav() {
  const location = useLocation();
  const navigate = useNavigate();
  const [openKey, setOpenKey] = useState<string | null>(null);
  const isHome = location.pathname === '/';

  function handleItemClick(e: React.MouseEvent, item: NavItem) {
    e.preventDefault();

    const triggerGreeting = item.label === 'About';

    if (location.pathname !== '/') {
      navigate('/' + item.href, triggerGreeting ? { state: { openGreeting: true } } : undefined);
    } else {
      document.querySelector(item.href)?.scrollIntoView({ behavior: 'smooth' });
      if (triggerGreeting) {
        window.dispatchEvent(new CustomEvent('open-greeting'));
      }
    }
  }

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-40 border-b ${
        isHome ? 'bg-[#151515] border-white/10' : 'bg-[#f0f2f5] border-black/5'
      }`}
    >
      <div className="max-w-[1080px] mx-auto flex items-center justify-end gap-8 max-sm:gap-4 px-8 max-sm:px-5 py-4">
        {NAV_ITEMS.map((item: NavItem) => {
          const hasDropdown = !!item.items?.length;
          const isOpen = openKey === item.label;
          const menuId = `nav-menu-${item.label.toLowerCase()}`;

          return (
            <div
              key={item.label}
              className="relative"
              onMouseEnter={() => hasDropdown && setOpenKey(item.label)}
              onMouseLeave={() => hasDropdown && setOpenKey(null)}
            >
              <a
                href={item.href}
                onClick={(e) => handleItemClick(e, item)}
                aria-haspopup={hasDropdown || undefined}
                aria-expanded={hasDropdown ? isOpen : undefined}
                aria-controls={hasDropdown ? menuId : undefined}
                className={`text-[14px] max-sm:text-[12px] font-medium no-underline transition-opacity duration-200 hover:opacity-60 whitespace-nowrap ${
                  isHome ? 'text-white/60' : 'text-[#666]'
                }`}
              >
                {item.label.toLowerCase()}
              </a>

              {hasDropdown && (
                <div
                  id={menuId}
                  role="menu"
                  aria-label={`${item.label} submenu`}
                  className={`absolute top-full left-1/2 -translate-x-1/2 pt-3 transition-all duration-200 max-sm:hidden ${
                    isOpen ? 'opacity-100 translate-y-0 pointer-events-auto' : 'opacity-0 -translate-y-1 pointer-events-none'
                  }`}
                >
                  <div
                    className={`border rounded-xl py-2 min-w-[160px] ${
                      isHome
                        ? 'bg-[#1c1c1e] border-white/10 shadow-[0_8px_24px_rgba(0,0,0,0.4)]'
                        : 'bg-white border-black/10 shadow-[0_8px_24px_rgba(0,0,0,0.1)]'
                    }`}
                  >
                    {item.items!.map((sub) => {
                      const isHash = sub.href.startsWith('#');
                      const className = `block text-[13px] font-medium no-underline px-4 py-2 transition-colors whitespace-nowrap ${
                        isHome ? 'text-white/70 hover:bg-white/10' : 'text-[#444] hover:bg-black/5'
                      }`;
                      if (isHash) {
                        return (
                          <a
                            key={sub.label}
                            href={sub.href}
                            role="menuitem"
                            onClick={(e) => {
                              e.preventDefault();
                              setOpenKey(null);
                              if (location.pathname !== '/') {
                                navigate('/' + sub.href);
                              } else {
                                document.querySelector(sub.href)?.scrollIntoView({ behavior: 'smooth' });
                              }
                            }}
                            className={className}
                          >
                            {sub.label}
                          </a>
                        );
                      }
                      return (
                        <Link
                          key={sub.label}
                          to={sub.href}
                          role="menuitem"
                          className={className}
                        >
                          {sub.label}
                        </Link>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </nav>
  );
}
