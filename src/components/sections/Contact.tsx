import { CONTACTS } from '../../lib/constants';

export default function Contact() {
  return (
    <footer id="contact" className="pt-8 pb-16 border-t border-[#eee]">
      <div className="flex gap-5 text-[13px]">
        {CONTACTS.map((link) => (
          <a
            key={link.label}
            href={link.href}
            {...(link.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
            className="text-[#555] no-underline transition-colors duration-150 hover:text-[#1a1a1a]"
          >
            {link.label}
            {link.external && <span className="text-[11px] ml-0.5">&#8599;</span>}
          </a>
        ))}
      </div>
    </footer>
  );
}
