import { useState } from 'react';
import { SITE } from '../../lib/constants';

export default function Hero() {
  const [copied, setCopied] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(SITE.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="mb-16 animate-fade-in">
      <div className="text-lg font-medium mb-3">{SITE.name}</div>
      <div className="text-[13px] text-[#999] mb-5">{SITE.tag}</div>
      <div className="text-[15px] text-[#444] leading-[1.7] max-w-[420px]">
        {SITE.tagline}
      </div>
      <div className="flex items-center gap-4 mt-6">
        <a
          href={SITE.resume}
          download
          className="text-[13px] font-medium text-white bg-[#111] px-4 py-2 no-underline transition-opacity duration-150 hover:opacity-70"
        >
          Resume
        </a>
        <button
          onClick={handleCopyEmail}
          className="text-[13px] text-[#999] bg-transparent border-0 border-b border-[#e0e0e0] pb-px cursor-pointer transition-colors duration-150 hover:text-[#111] p-0 font-[inherit]"
        >
          {copied ? 'Copied!' : SITE.email}
        </button>
      </div>
    </div>
  );
}
