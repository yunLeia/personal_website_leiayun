import { type ReactNode } from 'react';

// Bold: what I did, and the one result worth skimming
export function B({ children }: { children: ReactNode }) {
  return <strong className="font-semibold text-[#111]">{children}</strong>;
}

// Orange highlight: the one real-problem insight per project (original orange, a touch lighter in weight)
export function Hi({ children }: { children: ReactNode }) {
  return <mark style={{ background: '#fffbeb', color: '#b45309', padding: '1px 4px', fontWeight: 500, borderRadius: 3, WebkitBoxDecorationBreak: 'clone', boxDecorationBreak: 'clone' }}>{children}</mark>;
}
