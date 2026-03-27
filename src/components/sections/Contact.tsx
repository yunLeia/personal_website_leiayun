import { CONTACTS } from '../../lib/constants';

export default function Contact() {
  return (
    <footer id="contact" className="pt-24 pb-16 text-center">
      <div className="flex justify-center items-center gap-1.5 flex-wrap">
        {CONTACTS.map((link, i) => (
          <span key={link.label} className="flex items-center gap-1.5">
            <a
              href={link.href}
              {...(link.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
              className="text-[14px] text-[#888] no-underline transition-colors duration-150 hover:text-[#1a1a1a]"
            >
              {link.label}
            </a>
            {i < CONTACTS.length - 1 && (
              <span className="text-[14px] text-[#ccc] mx-2">·</span>
            )}
          </span>
        ))}
      </div>
    </footer>
  );
}
