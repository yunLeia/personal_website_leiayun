import { useLayoutEffect, useRef, useState } from 'react';
import { SectionHeader } from './HomeUI';

const MEDALS = [
  { image: 'mapo', title: 'Mapo Seo Yun-bok Marathon', detail: 'Seoul · April 19, 2025' },
  { image: 'seoul-10k', title: 'Ilgan Sports Seoul Marathon', detail: '10K finisher · September 7, 2025' },
  { image: 'seoul-october', title: 'Ilgan Sports Marathon', detail: 'Yeouido, Seoul · October 12, 2025' },
  { image: 'brooklyn', title: 'NYCRUNS Brooklyn Experience', detail: 'Half Marathon · Brooklyn, New York' },
];

export default function MedalShelf() {
  const [selected, setSelected] = useState(MEDALS.length - 1);
  const row = useRef<HTMLDivElement>(null);
  const active = useRef(MEDALS.length - 1);
  const drag = useRef({ start: 0, scroll: 0, moved: false, down: false });
  const reduceMotion = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const center = (index: number, behavior: ScrollBehavior = 'smooth') => {
    const track = row.current;
    const item = track?.querySelectorAll<HTMLButtonElement>('button')[index];
    if (!track || !item) return;
    track.scrollTo({ left: item.offsetLeft + item.offsetWidth / 2 - track.clientWidth / 2, behavior: reduceMotion() ? 'instant' : behavior });
  };
  useLayoutEffect(() => {
    const track = row.current;
    if (!track) return;
    const resize = new ResizeObserver(() => {
      const item = track.querySelectorAll<HTMLButtonElement>('button')[active.current];
      if (item) track.scrollTo({ left: item.offsetLeft + item.offsetWidth / 2 - track.clientWidth / 2, behavior: 'instant' });
    });
    resize.observe(track);
    return () => resize.disconnect();
  }, []);
  return (
    <section id="shelf" className="portfolio-section medal-section">
      <SectionHeader num="03" title="On the Shelf" />
      <div className="medal-shelf" role="group" aria-label="Marathon medal collection">
        <div className="medal-shelf-edge" aria-hidden="true" />
        <div ref={row} className="medal-row" onScroll={() => {
          const track = row.current;
          if (!track) return;
          const middle = track.scrollLeft + track.clientWidth / 2;
          const items = Array.from(track.querySelectorAll<HTMLButtonElement>('button'));
          const nearest = items.reduce((best, item, index) => Math.abs(item.offsetLeft + item.offsetWidth / 2 - middle) < Math.abs(items[best].offsetLeft + items[best].offsetWidth / 2 - middle) ? index : best, 0);
          active.current = nearest;
          setSelected(nearest);
        }} onPointerDown={(event) => {
          if (event.pointerType !== 'mouse' || event.button !== 0) return;
          drag.current = { start: event.clientX, scroll: event.currentTarget.scrollLeft, moved: false, down: true };
        }} onPointerMove={(event) => {
          if (!drag.current.down) return;
          const distance = event.clientX - drag.current.start;
          if (Math.abs(distance) > 5 && !drag.current.moved) {
            drag.current.moved = true;
            event.currentTarget.setPointerCapture(event.pointerId);
            event.currentTarget.dataset.dragging = 'true';
          }
          if (drag.current.moved) event.currentTarget.scrollLeft = drag.current.scroll - distance;
        }} onPointerUp={(event) => {
          if (!drag.current.down) return;
          drag.current.down = false;
          delete event.currentTarget.dataset.dragging;
          if (event.currentTarget.hasPointerCapture(event.pointerId)) event.currentTarget.releasePointerCapture(event.pointerId);
          if (drag.current.moved) center(active.current);
        }} onPointerCancel={(event) => {
          drag.current.down = false;
          delete event.currentTarget.dataset.dragging;
        }} onPointerLeave={() => { if (!drag.current.moved) drag.current.down = false; }}>
          {MEDALS.map((medal, index) => (
            <button key={medal.image} type="button" className="medal-item" aria-pressed={selected === index} aria-label={`Show ${medal.title}, ${medal.detail}`} onClick={() => {
              if (drag.current.moved) { drag.current.moved = false; return; }
              center(index);
            }} onPointerMove={(event) => {
              if (drag.current.down || event.pointerType === 'touch' || reduceMotion()) return;
              const bounds = event.currentTarget.getBoundingClientRect();
              const tilt = ((event.clientX - bounds.left) / bounds.width - .5) * 7;
              event.currentTarget.style.setProperty('--medal-tilt', `${tilt}deg`);
            }} onPointerLeave={(event) => event.currentTarget.style.setProperty('--medal-tilt', '0deg')} onKeyDown={(event) => {
              if (!['ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(event.key)) return;
              event.preventDefault();
              const next = event.key === 'Home' ? 0 : event.key === 'End' ? MEDALS.length - 1 : (index + (event.key === 'ArrowRight' ? 1 : -1) + MEDALS.length) % MEDALS.length;
              center(next);
              row.current?.querySelectorAll('button')[next]?.focus({ preventScroll: true });
            }}>
              <img src={`/images/medals/${medal.image}.png`} alt="" width="1122" height="1402" loading="lazy" draggable={false} />
            </button>
          ))}
        </div>
      </div>
      <div className="medal-caption" aria-live="polite" aria-atomic="true">
        <p>{MEDALS[selected].title}</p>
        <span>{MEDALS[selected].detail}</span>
      </div>
      <p className="medal-hint">Drag to explore <span aria-hidden="true">↔</span></p>
    </section>
  );
}
