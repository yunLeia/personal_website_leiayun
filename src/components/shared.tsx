import { type ReactNode } from 'react';
import { useScrollReveal } from '../hooks/useScrollReveal';

// Fade-in label shown above an icon button on hover/focus
export function Tooltip({ label }: { label: string }) {
  return (
    <span className="pointer-events-none absolute bottom-full left-1/2 -translate-x-1/2 mb-2.5 px-2 py-1 rounded-md bg-[#1e1d1b] text-white text-[12px] font-medium whitespace-nowrap opacity-0 scale-95 group-hover:opacity-100 group-hover:scale-100 transition-all duration-150">
      {label}
    </span>
  );
}

// Shared tool/keyword pill used across detail pages
export function ToolPill({ children }: { children: string }) {
  return (
    <span className="text-[12px] text-[#797772] font-normal border border-black/10 rounded-sm px-2 py-1">
      {children}
    </span>
  );
}

// Scroll-triggered fade-in wrapper used across detail sections
export function Reveal({
  children,
  className = '',
  id,
  outline,
}: {
  children: ReactNode;
  className?: string;
  id?: string;
  outline?: string;
}) {
  const { ref, visible } = useScrollReveal();
  return (
    <div
      ref={ref}
      id={id}
      data-outline={outline}
      className={`detail-reveal transition-all duration-300 ease-out ${
        visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'
      } ${className}`}
    >
      {children}
    </div>
  );
}
