import { useEffect, useState } from 'react';

interface OutlineItem {
  id: string;
  label: string;
}

// Left-side scroll-spy outline for long detail pages. Scans the page for
// elements marked with data-outline="Label" and tracks which is in view.
export default function Outline() {
  const [items, setItems] = useState<OutlineItem[]>([]);
  const [activeId, setActiveId] = useState<string | null>(null);

  useEffect(() => {
    const els = Array.from(document.querySelectorAll<HTMLElement>('[data-outline]'));
    if (els.length === 0) return;

    setItems(
      els.map((el, i) => {
        if (!el.id) el.id = `outline-section-${i}`;
        return { id: el.id, label: el.dataset.outline! };
      }),
    );
    setActiveId(els[0].id);

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActiveId(entry.target.id);
        }
      },
      { rootMargin: '-15% 0px -70% 0px' },
    );
    els.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  if (items.length === 0) return null;

  return (
    <nav
      aria-label="Page outline"
      className="hidden 2xl:block fixed left-10 top-1/2 -translate-y-1/2 w-[170px] z-30"
    >
      <ul className="flex flex-col gap-3">
        {items.map((item) => {
          const isActive = activeId === item.id;
          return (
            <li key={item.id}>
              <a
                href={`#${item.id}`}
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById(item.id)?.scrollIntoView({ behavior: 'smooth' });
                }}
                className={`block pl-3 border-l text-[13px] leading-[1.4] no-underline transition-colors duration-150 ${
                  isActive
                    ? 'border-[#1a1a1a] text-[#1a1a1a] font-medium'
                    : 'border-black/10 text-[#999] hover:text-[#666]'
                }`}
              >
                {item.label}
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
