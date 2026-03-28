import { useState } from 'react';
import { SITE, HERO } from '../../lib/constants';

export default function Hero() {
  const [copied, setCopied] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(SITE.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section className="min-h-screen flex items-center py-20 max-sm:py-16 max-sm:min-h-0 max-sm:pt-24">
      <div className="flex w-full gap-16 max-lg:flex-col max-lg:gap-10">
        {/* Left column */}
        <div className="w-3/5 flex flex-col justify-center max-lg:w-full">
          <div className="animate-fade-in">
            <h1 className="text-[56px] max-lg:text-[44px] max-sm:text-[32px] font-bold leading-[1.08] text-[#1a1a1a] tracking-[-0.03em]">
              {HERO.lines.map((line, i) => (
                <span key={i} className="block">
                  {line}
                </span>
              ))}
            </h1>
            <div className="flex items-center gap-5 mt-7 max-sm:mt-5 max-sm:flex-wrap max-sm:gap-4">
              <a
                href={SITE.resume}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[14px] font-medium text-white bg-[#1a1a1a] px-5 py-2.5 no-underline transition-opacity duration-150 hover:opacity-70"
              >
                Resume
              </a>
              <button
                onClick={handleCopyEmail}
                className="text-[14px] max-sm:text-[13px] text-[#888] bg-transparent border-0 border-b border-[#d0d0d0] pb-px cursor-pointer transition-colors duration-150 hover:text-[#1a1a1a] p-0 font-[inherit]"
              >
                {copied ? 'Copied!' : SITE.email}
              </button>
            </div>
          </div>
        </div>

        {/* Right column */}
        <div className="w-2/5 flex flex-col max-lg:w-full">
          <img
            src={SITE.photo}
            alt={SITE.name}
            className="w-full min-h-[400px] max-lg:min-h-[300px] max-sm:min-h-[250px] max-sm:max-h-[350px] object-cover grayscale-[20%]"
          />
          <div className="mt-5 max-sm:mt-4">
            <div className="text-[14px] font-medium text-[#1a1a1a]">
              {HERO.bio.title}
            </div>
            <div className="text-[13px] text-[#888] mt-0.5">{HERO.bio.subtitle}</div>
          </div>
        </div>
      </div>
    </section>
  );
}
