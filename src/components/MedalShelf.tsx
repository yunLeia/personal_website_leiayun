import { useState } from 'react';
import { SectionHeader } from './HomeUI';

const MEDALS = [
  { image: 'mapo', title: 'Mapo Seo Yun-bok Marathon', detail: 'Seoul · April 19, 2025' },
  { image: 'seoul-10k', title: 'Ilgan Sports Seoul Marathon', detail: '10K finisher · September 7, 2025' },
  { image: 'seoul-october', title: 'Ilgan Sports Marathon', detail: 'Yeouido, Seoul · October 12, 2025' },
  { image: 'brooklyn', title: 'NYCRUNS Brooklyn Experience', detail: 'Half Marathon · Brooklyn, New York' },
];

export default function MedalShelf() {
  const [selected, setSelected] = useState(MEDALS.length - 1);
  return (
    <section id="shelf" className="portfolio-section medal-section">
      <SectionHeader num="03" title="On the Shelf" />
      <div className="medal-shelf" role="group" aria-label="Marathon medal collection">
        <div className="medal-row">
          {MEDALS.map((medal, index) => (
            <button key={medal.image} type="button" className="medal-item" aria-pressed={selected === index} aria-label={`Show ${medal.title}, ${medal.detail}`} onClick={() => setSelected(index)} onKeyDown={(event) => {
              if (!['ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(event.key)) return;
              event.preventDefault();
              const next = event.key === 'Home' ? 0 : event.key === 'End' ? MEDALS.length - 1 : (index + (event.key === 'ArrowRight' ? 1 : -1) + MEDALS.length) % MEDALS.length;
              setSelected(next);
              event.currentTarget.parentElement?.querySelectorAll('button')[next]?.focus();
            }}>
              <img src={`/images/medals/${medal.image}.png`} alt="" width="1122" height="1402" loading="lazy" />
            </button>
          ))}
        </div>
        <div className="medal-shelf-edge" aria-hidden="true" />
      </div>
      <div className="medal-caption" aria-live="polite" aria-atomic="true">
        <p>{MEDALS[selected].title}</p>
        <span>{MEDALS[selected].detail}</span>
      </div>
    </section>
  );
}
