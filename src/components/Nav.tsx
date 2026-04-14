import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { NAV_ITEMS, type NavItem } from '../data';

export default function Nav() {
  const location = useLocation();
  const navigate = useNavigate();
  const [openKey, setOpenKey] = useState<string | null>(null);

  function handleItemClick(e: React.MouseEvent, item: NavItem) {
    e.preventDefault();

    // About opens chat greeting, does not scroll
    if (item.label === 'About') {
      const dispatch = () => window.dispatchEvent(new CustomEvent('open-greeting'));
      if (location.pathname !== '/') {
        navigate('/');
        setTimeout(dispatch, 150);
      } else {
        dispatch();
      }
      return;
    }

    // Section scroll (Experience, Projects, Contact)
    if (location.pathname !== '/') {
      navigate('/' + item.href);
    } else {
      document.querySelector(item.href)?.scrollIntoView({ behavior: 'smooth' });
    }
  }

  return (
    <nav className="fixed top-0 left-0 right-0 z-40 backdrop-blur-[12px] bg-white/40 border-b border-white/30">
      <div className="max-w-[1080px] mx-auto flex items-center justify-end gap-8 max-sm:gap-4 px-8 max-sm:px-5 py-4">
        {NAV_ITEMS.map((item: NavItem) => {
          const hasDropdown = !!item.items?.length;
          const isOpen = openKey === item.label;

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
                className="text-[14px] max-sm:text-[12px] font-medium text-[#666] no-underline transition-opacity duration-200 hover:opacity-60 whitespace-nowrap"
              >
                {item.label.toLowerCase()}
              </a>

              {hasDropdown && (
                <div
                  className={`absolute top-full left-1/2 -translate-x-1/2 pt-3 transition-all duration-200 ${
                    isOpen ? 'opacity-100 translate-y-0 pointer-events-auto' : 'opacity-0 -translate-y-1 pointer-events-none'
                  }`}
                >
                  <div className="bg-white/50 backdrop-blur-[20px] border border-white/50 rounded-xl shadow-[0_8px_32px_rgba(0,0,0,0.08),inset_0_1px_0_rgba(255,255,255,0.5)] py-2 min-w-[160px]">
                    {item.items!.map((sub) => (
                      <Link
                        key={sub.label}
                        to={sub.href}
                        className="block text-[13px] font-medium text-[#444] no-underline px-4 py-2 hover:bg-white/40 transition-colors whitespace-nowrap"
                      >
                        {sub.label.toLowerCase()}
                      </Link>
                    ))}
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
