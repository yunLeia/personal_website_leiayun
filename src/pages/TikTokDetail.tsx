import { EXPERIENCE } from '../data';
import { Reveal, ToolPill, BackLink } from '../components/shared';

const tiktok = EXPERIENCE.find((experience) => experience.company === 'TikTok')!;

// ─── Data ────────────────────────────────────────────────────────

const WORK_ITEMS = [
  {
    num: '01',
    meta: '8 datasets · reports in 1 minute',
    title: 'Internal Marketing Diagnostic Tool',
    description: "Built the Korea team's first internal marketing diagnostic tool, integrating 8 datasets into a Python service that generates account-level hygiene reports in 1 minute, replacing a 15+ query, one-hour manual process and enabling daily team use.",
    tools: ['Python', 'Data Pipelines', 'Automation', 'Internal Tooling'],
  },
  {
    num: '02',
    meta: '3,000+ creatives per account · 20+ enterprise clients',
    title: 'Ad Creative Audit Pipeline',
    description: 'Designed a multi-stage LLM pipeline to label 3,000+ ad creatives per account and audit best practices, decomposing analysis into focused prompts to generate optimization recommendations for 20+ enterprise clients.',
    tools: ['LLM Pipelines', 'Prompt Engineering', 'Ad Analytics'],
  },
  {
    num: '03',
    meta: '100+ employees adopted · ranked #1 & #2 org-wide',
    title: 'AI Learning Series & Internal Guide',
    description: 'Created an all-in-one internal AI guide of use cases and prompts adopted by 100+ employees, and led a two-session AI Learning Series that ranked 1st and 2nd among the organization\'s internal Masterclasses that year.',
    tools: ['Technical Enablement', 'Workshop Facilitation', 'Content Design'],
  },
];

const RESULTS = [
  { value: 'Top 2', label: 'Masterclass ranking, org-wide' },
  { value: '4.95', label: 'Avg feedback score (of 5)' },
  { value: '100+', label: 'Employees using AI guide' },
  { value: '20+', label: 'Enterprise clients served' },
];

// ─── Page ────────────────────────────────────────────────────────

export default function TikTokDetail() {
  return (
    <div className="case-study-body">
      <div className="case-study-content">
        <BackLink />

        <div id="overview" data-outline="Overview" className="mt-12 mb-14 animate-fade-in">
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

        {/* What I Built */}
        <Reveal className="mb-16" id="what-i-built" outline="What I Built">
          <h2 className="text-[12px] font-semibold text-[#999] uppercase tracking-[0.14em] mb-10">
            What I Built
          </h2>
          <div className="grid grid-cols-3 max-sm:grid-cols-1 gap-5">
            {WORK_ITEMS.map((item) => (
              <div key={item.title} className="bg-black/[0.03] rounded-2xl p-7 max-sm:p-6 flex flex-col">
                <p className="text-[13px] font-medium text-[#666] mb-3">
                  {item.num} &middot; {item.meta}
                </p>
                <h3 className="text-[18px] font-semibold text-[#111] tracking-tight mb-3">
                  {item.title}
                </h3>
                <p className="text-[15px] text-[#444] leading-[1.65] mb-5 flex-1">{item.description}</p>
                <div className="flex flex-wrap gap-2">
                  {item.tools.map((t) => <ToolPill key={t}>{t}</ToolPill>)}
                </div>
              </div>
            ))}
          </div>
        </Reveal>

        <div className="h-px bg-black/5 mb-16" />

        {/* Results */}
        <Reveal className="mb-16" id="results" outline="Results">
          <h2 className="text-[12px] font-semibold text-[#999] uppercase tracking-[0.14em] mb-10">
            Results
          </h2>
          <div className="grid grid-cols-4 max-sm:grid-cols-2 gap-4">
            {RESULTS.map((r) => (
              <div key={r.label} className="bg-black/[0.03] rounded-2xl px-5 py-7 text-center">
                <div className="text-[40px] sm:text-[52px] font-semibold text-[#111] leading-none mb-3" style={{ fontFamily: "'Lora', serif" }}>
                  {r.value}
                </div>
                <div className="text-[11px] font-medium text-[#888] uppercase tracking-[0.08em]">
                  {r.label}
                </div>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </div>
  );
}
