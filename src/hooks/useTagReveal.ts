import { useEffect, useState } from 'react';

export function useTagReveal(count: number, isVisible: boolean, baseDelay = 400, stagger = 80) {
  const [revealed, setRevealed] = useState<boolean[]>(new Array(count).fill(false));

  useEffect(() => {
    if (!isVisible) return;
    const timers: ReturnType<typeof setTimeout>[] = [];
    for (let i = 0; i < count; i++) {
      timers.push(
        setTimeout(() => {
          setRevealed((prev) => {
            const n = [...prev];
            n[i] = true;
            return n;
          });
        }, baseDelay + i * stagger),
      );
    }
    return () => timers.forEach(clearTimeout);
  }, [isVisible, count, baseDelay, stagger]);

  return revealed;
}
