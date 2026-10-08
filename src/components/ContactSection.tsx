import { SITE, SOCIAL_LINKS } from '../data';
import { ExternalArrow } from './HomeUI';

const stroke = { width: 14, height: 14, viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: 1.6, strokeLinecap: 'round', strokeLinejoin: 'round', 'aria-hidden': true } as const;
const fill = { width: 14, height: 14, viewBox: '0 0 24 24', fill: 'currentColor', 'aria-hidden': true } as const;

const ICONS: Record<string, JSX.Element> = {
  Gmail: <svg {...stroke}><rect x="3" y="5" width="18" height="14" rx="2" /><path d="m3 7 9 6 9-6" /></svg>,
  Calendly: <svg {...stroke}><rect x="3" y="5" width="18" height="16" rx="2" /><path d="M8 3v4M16 3v4M3 10h18" /></svg>,
  LinkedIn: <svg {...fill}><path d="M20.45 2H3.55C2.69 2 2 2.68 2 3.52v16.96c0 .84.69 1.52 1.55 1.52h16.9c.86 0 1.55-.68 1.55-1.52V3.52c0-.84-.69-1.52-1.55-1.52ZM7.93 18.75H4.98V9.2h2.95v9.55ZM6.45 7.9a1.71 1.71 0 1 1 0-3.42 1.71 1.71 0 0 1 0 3.42Zm12.3 10.85H15.8V14.1c0-1.11-.02-2.54-1.55-2.54-1.55 0-1.79 1.21-1.79 2.46v4.73H9.51V9.2h2.83v1.3h.04c.39-.74 1.36-1.52 2.79-1.52 2.99 0 3.58 1.97 3.58 4.53v5.24Z" /></svg>,
  GitHub: <svg {...fill}><path d="M12 2C6.48 2 2 6.58 2 12.25c0 4.53 2.87 8.37 6.84 9.73.5.1.68-.22.68-.49v-1.9c-2.78.62-3.37-1.21-3.37-1.21-.45-1.18-1.11-1.5-1.11-1.5-.91-.64.07-.62.07-.62 1 .07 1.53 1.06 1.53 1.06.89 1.57 2.34 1.12 2.91.86.09-.66.35-1.12.64-1.38-2.22-.26-4.56-1.14-4.56-5.06 0-1.12.39-2.03 1.03-2.75-.1-.26-.45-1.3.1-2.71 0 0 .84-.28 2.75 1.05A9.3 9.3 0 0 1 12 6.84c.85 0 1.7.12 2.5.35 1.91-1.33 2.75-1.05 2.75-1.05.55 1.41.2 2.45.1 2.71.64.72 1.03 1.63 1.03 2.75 0 3.93-2.34 4.8-4.57 5.05.36.32.68.94.68 1.9v2.81c0 .27.18.59.69.49A10.25 10.25 0 0 0 22 12.25C22 6.58 17.52 2 12 2Z" /></svg>,
};
const iconFor = (label: string) => ICONS[label.split(' ')[0]];

export default function ContactSection() {
  return (
    <footer id="contact" className="portfolio-footer">
      <div className="footer-identity">
        <p>© {new Date().getFullYear()} {SITE.name}</p>
        <p className="footer-note">AI, products, and the details.</p>
      </div>
      <div>
        <h2>Contact</h2>
        <ul className="footer-tree">
          <li><a href={`https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(SITE.email)}`} target="_blank" rel="noopener noreferrer">{ICONS.Gmail}<span>Gmail ({SITE.email})</span><ExternalArrow /></a></li>
          {SOCIAL_LINKS.map((link) => <li key={link.label}><a href={link.href} target="_blank" rel="noopener noreferrer">{iconFor(link.label)}<span>{link.label}</span><ExternalArrow /></a></li>)}
        </ul>
      </div>
    </footer>
  );
}
