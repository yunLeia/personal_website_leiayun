import { useEffect, useRef, useState } from 'react';

export function useStaggerReveal(count: number, delay = 120) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState<boolean[]>(new Array(count).fill(false));

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      () => {
        for (let i = 0; i < count; i++) {
          setTimeout(() => {
            setVisible((prev) => {
              const n = [...prev];
              n[i] = true;
              return n;
            });
          }, i * delay);
        }
        observer.disconnect();
      },
      { threshold: 0.1 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [count, delay]);

  return { ref, visible };
}
