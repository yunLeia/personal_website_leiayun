import { SITE, SOCIAL_LINKS } from '../data';
import { ExternalArrow } from './HomeUI';

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
          <li><a href={`mailto:${SITE.email}`}>{SITE.email}<ExternalArrow /></a></li>
          {SOCIAL_LINKS.map((link) => <li key={link.label}><a href={link.href} target="_blank" rel="noopener noreferrer">{link.label}<ExternalArrow /></a></li>)}
        </ul>
      </div>
    </footer>
  );
}
