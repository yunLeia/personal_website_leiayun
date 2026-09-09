import { useState } from 'react';
import { Reveal, ToolPill, BackgroundBlobs, BackLink } from '../components/shared';

// ─── Data ────────────────────────────────────────────────────────

const OVERVIEW = {
  meta: 'Personal Project · 2026',
  role: 'Product Engineer · Full-stack + Computer Vision',
  summary:
    'A shared camera roll for group events. Scan a QR, add your photos once, and Gatheroll helps clean and organize the collection so everyone can easily find and download the photos they’re missing.',
  demoCaption: 'Scan a QR, add your photos, and Gatheroll cleans and organizes the collection.',
  links: {
    github: 'https://github.com/yunLeia/gatheroll',
    demo: '#',
  },
};

const SOLUTION_STEPS = [
  {
    n: 1,
    label: 'Join',
    text: 'Scan a QR. No app install or account required.',
  },
  {
    n: 2,
    label: 'Contribute',
    text: 'Bulk-select photos from your camera roll.',
  },
  {
    n: 3,
    label: 'Clean',
    text: 'Gatheroll surfaces likely selfies, screenshots, blurry shots, and duplicates before upload. The user decides what stays.',
  },
  {
    n: 4,
    label: 'Browse & Download',
    text: 'Shared photos can be filtered by labels like People, Selfies, Food, Scenery, and Candid. Download all returns the photos you don’t already own.',
  },
];

const TECH_STACK = [
  { label: 'Frontend', items: ['Next.js', 'TypeScript', 'Tailwind'] },
  { label: 'Backend', items: ['FastAPI', 'PostgreSQL', 'SQLAlchemy', 'Alembic'] },
  { label: 'Storage', items: ['Cloudflare R2 (private)', 'Direct presigned uploads'] },
  { label: 'Vision', items: ['Deterministic CV', 'Pretrained vision models'] },
  { label: 'Infra', items: ['Vercel', 'Railway', 'GitHub Actions'] },
];

const DECISIONS = [
  {
    title: 'Trust user intent instead of predicting event relevance.',
    description:
      'I initially explored embedding-based event relevance, then removed it after realizing users already express relevance when they select photos. I moved the intelligence layer to cleanup, organization, and deduplication instead.',
  },
  {
    title: 'Use the simplest technique for each image problem.',
    description:
      'Blur detection uses deterministic CV, exact duplicates use hashing, while semantic photo labels use pretrained vision models rather than sending every image to an LLM.',
  },
  {
    title: 'Separate uploaded from shared.',
    description:
      'Photos are stored privately first. Uploading a photo does not automatically make it visible to the group.',
  },
  {
    title: 'Make downloads participant-aware.',
    description:
      'Bulk download excludes photos the participant originally contributed, with duplicate-aware exclusion planned for visually identical copies from others.',
  },
];

const EVAL_ITEMS = [
  'Screenshot detection',
  'Selfie detection',
  'Blur detection',
  'Exact duplicate detection',
];

const ROADMAP = [
  { version: '01', text: 'Semantic smart filters: People / Food / Scenery / Candid' },
  { version: '02', text: 'Near-duplicate detection' },
  { version: '03', text: 'One-action participant-aware bulk download' },
  { version: '04', text: 'App Clip exploration for lower-friction photo access' },
];

// ─── Shared card / heading classes ──────────────────────────────

const CARD =
  'bg-white/15 backdrop-blur-[16px] border border-white/30 shadow-[0_2px_16px_rgba(0,0,0,0.06),inset_0_1px_0_rgba(255,255,255,0.3)] rounded-2xl';
const EYEBROW = 'text-[11px] font-semibold text-[#999] uppercase tracking-[0.14em] mb-3';
const H2 = 'text-[26px] max-sm:text-[22px] font-bold text-[#111] tracking-tight leading-[1.2]';

// ─── Small components ────────────────────────────────────────────

function DemoMedia() {
  const [errored, setErrored] = useState(false);

  return (
    <div className="mb-6">
      <div className={`w-full aspect-video overflow-hidden ${CARD} flex items-center justify-center`}>
        {!errored ? (
          <img
            src="/images/gatheroll-demo.gif"
            alt="Gatheroll demo — scan a QR, dump your photos, watch them sort"
            loading="lazy"
            className="w-full h-full object-cover"
            onError={() => setErrored(true)}
          />
        ) : (
          <span className="text-[13px] text-[#999]">demo coming soon</span>
        )}
      </div>
      <p className="text-[12px] text-[#999] mt-2">{OVERVIEW.demoCaption}</p>
    </div>
  );
}

function Stepper() {
  return (
    <>
      {/* Desktop: horizontal with connecting lines */}
      <div className="hidden md:grid md:grid-cols-4 gap-4">
        {SOLUTION_STEPS.map((step, i) => (
          <div key={step.n} className="relative flex flex-col items-center text-center px-2">
            {i > 0 && <div className="absolute top-5 right-1/2 w-full h-px bg-black/10" />}
            <div className="relative w-10 h-10 rounded-full bg-[#1d1d1f] text-white flex items-center justify-center text-[14px] font-semibold mb-4">
              {step.n}
            </div>
            <div className="text-[16px] font-semibold text-[#111] tracking-tight mb-1">{step.label}</div>
            <div className="text-[13px] text-[#444] leading-[1.6]">{step.text}</div>
          </div>
        ))}
      </div>

      {/* Mobile: stacked */}
      <div className="flex flex-col gap-6 md:hidden">
        {SOLUTION_STEPS.map((step) => (
          <div key={step.n} className="flex gap-4">
            <div className="w-10 h-10 shrink-0 rounded-full bg-[#1d1d1f] text-white flex items-center justify-center text-[14px] font-semibold">
              {step.n}
            </div>
            <div>
              <div className="text-[16px] font-semibold text-[#111] tracking-tight mb-1">{step.label}</div>
              <div className="text-[14px] text-[#444] leading-[1.65]">{step.text}</div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

function DecisionsCarousel() {
  return (
    <div>
      <div className="flex gap-5 overflow-x-auto snap-x snap-mandatory pb-4 -mx-10 px-10 max-sm:-mx-5 max-sm:px-5">
        {DECISIONS.map((d) => (
          <div
            key={d.title}
            className={`snap-start shrink-0 w-[82%] sm:w-[420px] p-9 max-sm:p-7 ${CARD}`}
          >
            <h3 className="text-[19px] font-semibold text-[#111] tracking-tight mb-4">{d.title}</h3>
            <p className="text-[15px] text-[#444] leading-[1.7]">{d.description}</p>
          </div>
        ))}
      </div>
      <p className="text-[12px] text-[#999] mt-2 sm:hidden">swipe to see all &rarr;</p>
    </div>
  );
}

function RoadmapLadder() {
  return (
    <div className="relative pl-8 max-sm:pl-7">
      <div className="absolute left-[7px] top-2 bottom-2 w-px bg-black/10" />
      <div className="flex flex-col gap-6">
        {ROADMAP.map((item) => (
          <div key={item.version} className="relative">
            <div className="absolute -left-8 max-sm:-left-7 top-1 w-[15px] h-[15px] rounded-full bg-[#1d1d1f] border-2 border-white" />
            <div className="text-[11px] font-semibold text-[#999] uppercase tracking-[0.14em] mb-1">
              {item.version}
            </div>
            <div className="text-[15px] text-[#444] leading-[1.65]">{item.text}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Page ────────────────────────────────────────────────────────

export default function GatherollDetail() {
  return (
    <div className="min-h-screen">
      <BackgroundBlobs />
      <div className="max-w-[1080px] mx-auto px-10 max-sm:px-5 pt-28 max-sm:pt-24 pb-24">
        <BackLink />

        {/* Overview */}
        <div className="mt-12 mb-14 animate-fade-in">
          <h1 className="text-[32px] max-sm:text-[26px] font-bold tracking-tight text-[#111] mb-2">
            Gatheroll
          </h1>
          <p className="text-[14px] text-[#999] mb-6">{OVERVIEW.meta}</p>
          <div className="flex flex-col gap-2 mb-6">
            <div className="text-[15px] font-normal text-[#444]">
              <span className="font-semibold text-[#111]">Role:</span> {OVERVIEW.role}
            </div>
          </div>
          <p className="text-[15px] font-normal text-[#444] leading-[1.7] mb-6">{OVERVIEW.summary}</p>

          <DemoMedia />

          <div className="flex gap-3">
            <a
              href={OVERVIEW.links.github}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[14px] font-medium px-5 py-2 rounded-full bg-[#1d1d1f] text-white no-underline transition-all duration-200 hover:bg-[#424245] active:scale-[0.97]"
            >
              github &#8599;
            </a>
            <a
              href={OVERVIEW.links.demo}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[14px] font-medium px-5 py-2 rounded-full bg-white/15 backdrop-blur-[12px] border border-white/30 text-[#1d1d1f] no-underline transition-all duration-200 hover:bg-white/25 active:scale-[0.97]"
            >
              live demo &#8599;
            </a>
          </div>
        </div>

        <div className="h-px bg-black/5 mb-16" />

        {/* The Problem */}
        <Reveal className="mb-14">
          <div className={EYEBROW}>The Problem</div>
          <h2 className={`${H2} mb-10`}>Sharing photos costs more than the photos are worth.</h2>
          <div className={`p-7 max-sm:p-6 flex flex-col gap-4 ${CARD}`}>
            <p className="text-[15px] text-[#444] leading-[1.7]">
              After a trip, dinner, or night out, everyone leaves with photos on different phones.
              The annoying part isn't storing them — it's getting everyone to actually send them,
              sorting through duplicates, and downloading the same photos you already have.
            </p>
          </div>
        </Reveal>

        <div className="h-px bg-black/5 mb-16" />

        {/* The Product */}
        <Reveal className="mb-20 max-sm:mb-14">
          <div className={EYEBROW}>The Product</div>
          <h2 className={`${H2} mb-3`}>From QR scan to a clean, shared album.</h2>
          <p className="text-[16px] max-sm:text-[15px] font-normal text-[#666] leading-[1.5] mb-10">
            Join, contribute, clean, and browse.
          </p>
          <div className={`p-8 max-sm:p-6 ${CARD}`}>
            <Stepper />
          </div>
        </Reveal>

        <div className="h-px bg-black/5 mb-16" />

        {/* Tech Stack */}
        <Reveal className="mb-20 max-sm:mb-14">
          <div className={EYEBROW}>Tech Stack</div>
          <h2 className={`${H2} mb-10`}>Full-stack, with computer vision as a first-class layer.</h2>
          <div className={`p-7 max-sm:p-6 ${CARD}`}>
            <div className="flex flex-col gap-4">
              {TECH_STACK.map((row, i) => (
                <div
                  key={row.label}
                  className={`grid grid-cols-[140px_1fr] max-sm:grid-cols-1 gap-x-6 gap-y-2 items-start pb-4 ${
                    i < TECH_STACK.length - 1 ? 'border-b border-black/5' : ''
                  }`}
                >
                  <div className="text-[13px] font-semibold text-[#999] uppercase tracking-[0.1em] pt-1">
                    {row.label}
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {row.items.map((item) => (
                      <ToolPill key={item}>{item}</ToolPill>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Reveal>

        <div className="h-px bg-black/5 mb-16" />

        {/* Key Engineering Decisions */}
        <Reveal className="mb-20 max-sm:mb-14">
          <div className={EYEBROW}>Key Engineering Decisions</div>
          <h2 className={`${H2} mb-10`}>Every decision traded one failure mode for a cheaper one.</h2>
          <DecisionsCarousel />
        </Reveal>

        <div className="h-px bg-black/5 mb-16" />

        {/* What I'm Evaluating */}
        <Reveal className="mb-20 max-sm:mb-14">
          <div className={EYEBROW}>What I'm Evaluating</div>
          <h2 className={`${H2} mb-10`}>Measure each capability before wiring it into production.</h2>
          <div className={`p-7 max-sm:p-6 ${CARD}`}>
            <div className="flex flex-wrap gap-2 mb-6">
              {EVAL_ITEMS.map((item) => (
                <ToolPill key={item}>{item}</ToolPill>
              ))}
            </div>
            <p className="text-[15px] text-[#444] leading-[1.7]">
              The goal is to measure each capability separately before wiring it into production.
            </p>
          </div>
        </Reveal>

        <div className="h-px bg-black/5 mb-16" />

        {/* Next */}
        <Reveal className="mb-16">
          <div className={EYEBROW}>Next</div>
          <h2 className={`${H2} mb-10`}>What's ahead.</h2>
          <div className={`p-7 max-sm:p-6 ${CARD}`}>
            <RoadmapLadder />
          </div>
        </Reveal>
      </div>
    </div>
  );
}
