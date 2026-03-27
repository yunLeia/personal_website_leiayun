import { CONTACTS } from '../../lib/constants';
import { useFadeIn } from '../../hooks/useFadeIn';

export default function Contact() {
  const { ref, visible } = useFadeIn();

  return (
    <div
      ref={ref}
      className={`mb-14 transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
    >
      <div className="text-[11px] font-medium text-[#bbb] tracking-[0.1em] uppercase mb-6">
        Contact
      </div>
      <div className="flex flex-col">
        {CONTACTS.map((item, i) => (
          <a
            key={item.category}
            href={item.href}
            {...(item.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
            {...(item.download ? { download: true } : {})}
            className={`flex items-center gap-4 py-3 border-b border-[#f0f0f0] no-underline text-[#666] text-[13px] font-light transition-all duration-200 hover:text-[#111] hover:pl-1 ${
              i === 0 ? 'border-t border-t-[#f0f0f0]' : ''
            }`}
          >
            <span className="text-[11px] text-[#ccc] w-16 shrink-0">
              {item.category}
            </span>
            {item.label}
          </a>
        ))}
      </div>
    </div>
  );
}
