import { SITE, SOCIAL_LINKS } from '../data';

export default function ContactSection() {
  return (
    <footer id="contact" className="mt-24 max-sm:mt-16 mb-8 pt-10 max-sm:pt-8 border-t border-black/5 scroll-mt-20">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <p className="text-[16px] max-sm:text-[14px] font-normal text-[#999] leading-[1.6]">
          always happy to chat —{' '}
          <a
            href={`mailto:${SITE.email}`}
            className="text-[#444] font-medium no-underline hover:text-[#111] transition-colors duration-200"
          >
            {SITE.email}
          </a>
        </p>
        <div className="flex items-center gap-5">
          {SOCIAL_LINKS.map((link) => (
            <a
              key={link.label}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[14px] max-sm:text-[13px] font-medium text-[#666] no-underline transition-opacity duration-200 hover:opacity-60"
            >
              {link.label.toLowerCase()}
              <span className="text-[10px] ml-0.5">&#8599;</span>
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}
