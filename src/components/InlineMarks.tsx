import { type ReactNode } from 'react';

const COLORS = {
  blueBg: '#eff6ff', blueText: '#1d4ed8',
  yellowBg: '#fffbeb', yellowText: '#b45309',
};

// Bold callout used inline in case study copy
export function B({ children }: { children: ReactNode }) {
  return <strong className="font-semibold text-[#111]">{children}</strong>;
}

// Highlighted metric/phrase used inline in case study copy
export function Hi({ color, children }: { color: 'blue' | 'yellow'; children: ReactNode }) {
  const bg = color === 'blue' ? COLORS.blueBg : COLORS.yellowBg;
  const fg = color === 'blue' ? COLORS.blueText : COLORS.yellowText;
  return <mark style={{ background: bg, color: fg, padding: '1px 4px', fontWeight: 600, borderRadius: 3, WebkitBoxDecorationBreak: 'clone', boxDecorationBreak: 'clone' }}>{children}</mark>;
}
