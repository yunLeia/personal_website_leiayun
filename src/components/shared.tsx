import { type ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';
import { useScrollReveal } from '../hooks/useScrollReveal';

// Shared tool/keyword pill used across detail pages
export function ToolPill({ children }: { children: string }) {
  return (
    <span className="text-[11px] text-[#666] font-normal bg-black/[0.05] rounded-full px-3 py-1">
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
      className={`transition-all duration-600 ease-out ${
        visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'
      } ${className}`}
    >
      {children}
    </div>
  );
}

// "← back" link used on detail pages. Uses browser history (POP navigation)
// instead of Link to="/" (a PUSH) so ScrollToTop restores the homepage's
// saved scroll position instead of resetting to the top.
export function BackLink({ children = '← back' }: { children?: ReactNode }) {
  const navigate = useNavigate();
  return (
    <button
      type="button"
      onClick={() => (window.history.length > 1 ? navigate(-1) : navigate('/'))}
      className="text-[14px] font-medium text-[#86868b] no-underline transition-opacity duration-200 hover:opacity-60 bg-transparent border-none p-0 cursor-pointer"
    >
      {children}
    </button>
  );
}
