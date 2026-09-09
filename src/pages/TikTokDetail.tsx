import { EXPERIENCE } from '../data';
import { Reveal, ToolPill, BackgroundBlobs, BackLink } from '../components/shared';

const tiktok = EXPERIENCE.find((experience) => experience.company === 'TikTok')!;

export default function TikTokDetail() {
  return (
    <div className="min-h-screen">
      <BackgroundBlobs />
      <div className="max-w-[1080px] mx-auto px-10 max-sm:px-5 pt-28 max-sm:pt-24 pb-24">
        <BackLink />

        <div className="mt-12 mb-14 animate-fade-in">
          <h1 className="text-[32px] max-sm:text-[26px] font-bold tracking-tight text-[#111] mb-6">
            <a
              href={tiktok.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#111] no-underline hover:underline underline-offset-[6px] decoration-[#d2d2d7] hover:decoration-[#111] transition-colors duration-200"
            >
              {tiktok.company}
            </a>
          </h1>
          <div className="flex flex-col gap-2 mb-6">
            <div className="text-[15px] font-normal text-[#444]"><span className="font-semibold text-[#111]">Role:</span> {tiktok.role}</div>
            <div className="text-[15px] font-normal text-[#444]"><span className="font-semibold text-[#111]">Period:</span> {tiktok.date}</div>
          </div>
          <p className="text-[15px] font-normal text-[#444] leading-[1.7]">{tiktok.subtitle}</p>
        </div>

        <div className="h-px bg-black/5 mb-16" />

        <div className="mb-8 animate-fade-in">
          <h2 className="text-[12px] font-semibold text-[#999] uppercase tracking-[0.14em] mb-12">
            Case Studies
          </h2>
          <Reveal>
            <div className="flex flex-col md:flex-row items-center gap-10 md:gap-14">
              <div className="w-full md:flex-[2]">
                <div className="w-full aspect-[16/10] rounded-2xl border border-white/25 bg-[#F0F3F7] flex flex-col items-center justify-center px-6 text-center">
                  <span className="text-[52px] max-sm:text-[44px] font-semibold tracking-tight text-[#111] leading-none">170+</span>
                  <span className="mt-4 text-[12px] font-medium text-[#888] uppercase tracking-[0.14em]">Daily adoption</span>
                </div>
              </div>
              <div className="w-full md:flex-[3]">
                <p className="text-[13px] font-medium text-[#666]">01 &middot; Internal teams &amp; enterprise clients</p>
                <h3 className="mt-3 text-[28px] max-sm:text-[22px] font-bold text-[#111] tracking-tight leading-[1.2]">
                  AI-Powered Workflows
                </h3>
                <p className="mt-4 text-[15px] text-[#333] leading-[1.65]">
                  Built AI-powered workflows for internal teams and enterprise clients, with a focus on workflow automation and internal tooling.
                </p>
                <div className="flex flex-wrap gap-2 mt-5">
                  {tiktok.tags?.map((tag) => <ToolPill key={tag}>{tag}</ToolPill>)}
                </div>
                <p className="mt-6 text-[14px] text-[#86868b]">Detailed case study coming soon.</p>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </div>
  );
}
