import { SITE, SOCIAL_LINKS } from '../data';

const ICONS: Record<string, React.ReactNode> = {
  LinkedIn: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.03-3.04-1.85-3.04-1.86 0-2.14 1.45-2.14 2.95v5.66H9.35V9h3.42v1.56h.05c.48-.9 1.64-1.85 3.38-1.85 3.61 0 4.28 2.38 4.28 5.47v6.27zM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12zM7.12 20.45H3.56V9h3.56v11.45zM22.23 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.23.79 24 1.77 24h20.46c.98 0 1.77-.77 1.77-1.73V1.73C24 .77 23.21 0 22.23 0z"/>
    </svg>
  ),
  GitHub: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 .3a12 12 0 0 0-3.79 23.39c.6.11.82-.26.82-.58v-2.01c-3.34.72-4.04-1.61-4.04-1.61-.55-1.4-1.34-1.77-1.34-1.77-1.08-.74.08-.72.08-.72 1.2.08 1.83 1.24 1.83 1.24 1.07 1.83 2.81 1.3 3.5.99.1-.78.42-1.3.76-1.6-2.67-.3-5.47-1.33-5.47-5.93 0-1.31.47-2.38 1.24-3.22-.12-.3-.54-1.52.12-3.18 0 0 1.01-.32 3.3 1.23a11.48 11.48 0 0 1 6 0c2.29-1.55 3.3-1.23 3.3-1.23.66 1.66.24 2.88.12 3.18.77.84 1.23 1.91 1.23 3.22 0 4.61-2.8 5.62-5.48 5.92.43.37.81 1.1.81 2.22v3.29c0 .32.22.69.83.58A12 12 0 0 0 12 .3"/>
    </svg>
  ),
};

export default function ContactSection() {
  return (
    <footer id="contact" className="mt-32 max-sm:mt-20 mb-10 pt-16 max-sm:pt-12 border-t border-white/10 scroll-mt-20">
      <p className="text-[18px] max-sm:text-[15px] font-normal text-white/40 leading-[1.6]">
        always happy to chat:{' '}
        <a
          href={`mailto:${SITE.email}`}
          className="text-white/70 font-medium no-underline hover:text-white transition-colors duration-200"
        >
          {SITE.email}
        </a>
      </p>
      <div className="flex items-center gap-6 max-sm:gap-5 mt-4">
        {SOCIAL_LINKS.map((link) => (
          <a
            key={link.label}
            href={link.href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={link.label}
            className="inline-flex items-center gap-2 text-[17px] max-sm:text-[15px] font-medium text-white/70 no-underline transition-opacity duration-200 hover:opacity-60"
          >
            <span className="text-white/70">{ICONS[link.label]}</span>
            {link.label.toLowerCase()}
          </a>
        ))}
      </div>
    </footer>
  );
}
