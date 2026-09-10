import type { ReactNode } from 'react';

const HATCH_BG = {
  backgroundImage:
    'repeating-linear-gradient(45deg, rgba(0,0,0,0.18) 0px, rgba(0,0,0,0.18) 1px, transparent 1px, transparent 5px)',
};

export function SectionHeader({ num, title, action }: { num: string; title: string; action?: ReactNode }) {
  return (
    <div className="flex items-center justify-between mb-4">
      <div className="flex items-center gap-2">
        <span className="text-[11px] font-mono text-[#999] border border-black/10 rounded-[4px] w-6 h-6 flex items-center justify-center shrink-0">
          {num}
        </span>
        <span className="w-6 h-6 rounded-[4px] border border-black/10 shrink-0" style={HATCH_BG} />
        <span className="text-[11px] font-semibold text-[#999] uppercase tracking-[0.14em]">{title}</span>
      </div>
      {action}
    </div>
  );
}

export function ExternalArrow() {
  return <span className="text-[#999] text-[12px] ml-[3px] opacity-60 group-hover:opacity-100 transition-opacity duration-150">&#8599;</span>;
}
