import { useEffect, useRef, useState } from 'react';

const RATIOS = [[.7773,.6641],[.9297,.9258],[.3984,.4648],[.8867,1.094],[.9531,.9023],[.9609,.8281],[.9375,.9805]];
const LETTERS = ['L', 'e', 'i', 'a', 'Y', 'u', 'n'];

export default function AnimatedName() {
  const [variants, setVariants] = useState<(number | null)[]>(() => LETTERS.map(() => null));
  const heading = useRef<HTMLHeadingElement>(null);
  const versions = useRef(LETTERS.map(() => 0));
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);
  const returns = useRef<(ReturnType<typeof setTimeout> | undefined)[]>([]);
  const reduced = useRef(false);
  const entered = useRef(false);

  useEffect(() => {
    const introTimers = timers.current;
    const measure = () => heading.current?.querySelectorAll<HTMLElement>('.name-type').forEach((letter) => {
      letter.parentElement?.style.setProperty('--text-width', `${letter.offsetWidth}px`);
    });
    measure();
    void document.fonts.ready.then(measure);
    const preference = window.matchMedia('(prefers-reduced-motion: reduce)');
    reduced.current = preference.matches;
    const update = () => {
      reduced.current = preference.matches;
      if (preference.matches) {
        timers.current.forEach(clearTimeout);
        returns.current.forEach(clearTimeout);
        setVariants(LETTERS.map(() => null));
      }
    };
    preference.addEventListener('change', update);
    let cancelled = false;
    const images = LETTERS.flatMap((_, index) => [0, 1].map((version) => {
      const image = new Image();
      image.src = `/images/name/${index}-${version}.webp`;
      return image.decode().catch(() => undefined);
    }));
    Promise.all(images).then(() => {
      if (cancelled || reduced.current || entered.current) return;
      LETTERS.forEach((_, index) => {
        const show = (variant: number | null) => setVariants((current) => current.map((value, i) => i === index ? variant : value));
        timers.current.push(setTimeout(() => show(0), 150 + index * 75));
        timers.current.push(setTimeout(() => show(1), 540 + index * 75));
        timers.current.push(setTimeout(() => show(null), 980 + index * 75));
      });
    });
    const returnTimers = returns.current;
    return () => {
      cancelled = true;
      introTimers.forEach(clearTimeout);
      returnTimers.forEach(clearTimeout);
      preference.removeEventListener('change', update);
    };
  }, []);

  const play = (index: number) => {
    if (reduced.current) return;
    if (!entered.current) {
      entered.current = true;
      timers.current.forEach(clearTimeout);
      setVariants(LETTERS.map(() => null));
    }
    clearTimeout(returns.current[index]);
    const version = versions.current[index] % 2;
    versions.current[index] += 1;
    setVariants((current) => current.map((value, i) => i === index ? version : value));
    returns.current[index] = setTimeout(() => {
      setVariants((current) => current.map((value, i) => i === index ? null : value));
    }, 850);
  };

  return (
    <h1 ref={heading} className="animated-name" aria-label="Leia Yun">
      <span className="name-letters" aria-hidden="true">
        {LETTERS.map((letter, index) => <span key={index} className={`name-letter ${index === 4 ? 'name-word-start' : ''}`} style={{ width: variants[index] === null ? 'var(--text-width)' : `${RATIOS[index][variants[index]!] * 1.32 + .08}em` }} data-illustrated={variants[index] !== null} onPointerEnter={(event) => { if (event.pointerType !== 'touch') play(index); }} onPointerDown={(event) => { if (event.pointerType === 'touch') play(index); }}>
          <span className="name-type">{letter}</span>
          {[0, 1].map((version) => <img key={version} className="name-art" data-visible={variants[index] === version} src={`/images/name/${index}-${version}.webp`} alt="" draggable={false} />)}
        </span>)}
      </span>
    </h1>
  );
}
