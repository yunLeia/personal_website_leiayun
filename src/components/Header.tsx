import { SITE, SOCIAL_LINKS } from '../data';
import HalftonePhoto from './HalftonePhoto';
import { ExternalArrow } from './HomeUI';

export default function Header() {
  const linkedIn = SOCIAL_LINKS.find((link) => link.label === 'LinkedIn');
  return (
    <header id="about" className="portfolio-intro portfolio-enter">
      <div className="intro-copy">
        <h1>{SITE.name}<span className="identity-mark" aria-hidden="true">✳</span></h1>
        <p>I'm Leia, an <span className="ink">AI & product engineer</span> and a CS + Data Science student at NYU. I build products and turn user behavior into better product decisions.</p>
        <p>At <a href="#experience">TikTok</a>, I built AI-powered workflows. Previously at <a href="/work/planfit">Planfit</a>, I owned features end-to-end and ran 40+ experiments to improve activation and conversion.</p>
        <p>I enjoy the whole process: understanding a problem, building something useful, and paying attention to the details that make it work.</p>
        <p>Have something in mind? <a href={`mailto:${SITE.email}`}>Let's talk<ExternalArrow /></a></p>
      </div>
      <div className="intro-aside">
        <div className="portrait-frame"><HalftonePhoto src={SITE.photo} alt="Portrait of Leia Yun" size={240} cell={3} /></div>
        <a className="resume-link" href={SITE.resumePath} target="_blank" rel="noopener noreferrer">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true"><path d="M14 3H5v18h14V8zM14 3v6h5M8 13h8M8 17h6" /></svg>
          Résumé <ExternalArrow />
        </a>
        {linkedIn && <a className="linkedin-link" href={linkedIn.href} target="_blank" rel="noopener noreferrer">LinkedIn<ExternalArrow /></a>}
      </div>
    </header>
  );
}
