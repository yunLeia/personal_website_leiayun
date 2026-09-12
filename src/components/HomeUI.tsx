import type { ReactNode } from 'react';

export function SectionHeader({ num, title, action }: { num: string; title: string; action?: ReactNode }) {
  return (
    <div className="portfolio-section-heading">
      <h2 className="section-tag"><span className="section-index">{num}</span><span className="section-hatch" aria-hidden="true" /><span className="section-label">{title}</span></h2>
      {action}
    </div>
  );
}

export function ExternalArrow() {
  return <span className="external-arrow" aria-hidden="true">↗</span>;
}
