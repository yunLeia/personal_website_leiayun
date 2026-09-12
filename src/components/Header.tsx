import { SITE, SOCIAL_LINKS } from '../data';
import HalftonePhoto from './HalftonePhoto';
import { ExternalArrow } from './HomeUI';
import AnimatedName from './AnimatedName';

export default function Header() {
  const linkedIn = SOCIAL_LINKS.find((link) => link.label === 'LinkedIn');
  return (
    <header id="about" className="portfolio-intro portfolio-enter">
      <div className="intro-copy">
        <AnimatedName />
        <p>I'm Leia, a senior at NYU studying Computer Science. I care about the space where product and engineering meet, and really about anything that solves a problem for someone.</p>
        <p>Most recently I interned at <a href="#experience" onClick={(event) => { event.preventDefault(); document.getElementById('experience')?.scrollIntoView({ behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth' }); }}>TikTok</a>, building AI powered workflows that automated the busywork for client facing teams. Before that I was a Product Engineer at <a href="/work/planfit">Planfit</a>, where I owned core business metrics and ran 100+ experiments end to end.</p>
        <p>Being a generalist is kind of my thing. I bring speed, craft, and a little fun to whatever the team is making.</p>
        <p>Have something in mind? <a href={`https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(SITE.email)}`} target="_blank" rel="noopener noreferrer" aria-label="Let’s talk — compose an email in Gmail">Let's talk<ExternalArrow /></a></p>
      </div>
      <div className="intro-aside">
        <div className="portrait-frame"><HalftonePhoto src={SITE.photo} alt="Portrait of Leia Yun" size={240} cell={3} /></div>
        <a className="resume-link" href={SITE.resumePath} target="_blank" rel="noopener noreferrer">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true"><path d="M14 3H5v18h14V8zM14 3v6h5M8 13h8M8 17h6" /></svg>
          Résumé <ExternalArrow />
        </a>
        {linkedIn && <a className="linkedin-link" href={linkedIn.href} target="_blank" rel="noopener noreferrer"><svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M20.45 2H3.55C2.69 2 2 2.68 2 3.52v16.96c0 .84.69 1.52 1.55 1.52h16.9c.86 0 1.55-.68 1.55-1.52V3.52c0-.84-.69-1.52-1.55-1.52ZM7.93 18.75H4.98V9.2h2.95v9.55ZM6.45 7.9a1.71 1.71 0 1 1 0-3.42 1.71 1.71 0 0 1 0 3.42Zm12.3 10.85H15.8V14.1c0-1.11-.02-2.54-1.55-2.54-1.55 0-1.79 1.21-1.79 2.46v4.73H9.51V9.2h2.83v1.3h.04c.39-.74 1.36-1.52 2.79-1.52 2.99 0 3.58 1.97 3.58 4.53v5.24Z"/></svg>LinkedIn<ExternalArrow /></a>}
      </div>
    </header>
  );
}
