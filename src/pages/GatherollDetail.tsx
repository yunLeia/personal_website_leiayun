import { useState } from 'react';
import { Reveal } from '../components/shared';

// ─── Data ────────────────────────────────────────────────────────

const OVERVIEW = {
  meta: 'Product Engineer · 2026',
  tagline: "Everyone's photos from one event, in one shared album.",
  subtext: 'Scan a QR, bulk-add your photos, and GatheRoll handles the rest.',
  demoCaption: 'Scan a QR, bulk-add your photos, and GatheRoll handles the rest.',
  links: {
    github: 'https://github.com/yunLeia/gatheroll',
    demo: '#',
  },
};

const PROBLEM =
  "After an event, photos stay scattered across everyone's camera rolls. Existing tools work, but sharing still requires people to remember, select, check, and send their photos.";

const INSIGHT_TAKEAWAY = 'I accepted bulk selection as V1 friction and focused on removing the review burden.';

const DECISIONS = [
  {
    num: '01',
    title: 'Remove approval flows',
    description: 'Originally designed private events with host approval. Replaced them with unlisted links and optional event codes to reduce coordination.',
  },
  {
    num: '02',
    title: 'Keep the web',
    description: 'Automatic camera-roll discovery would require native access. I kept GatheRoll web-first and accepted bulk selection instead of overbuilding.',
  },
  {
    num: '03',
    title: 'Review exceptions, not everything',
    description: 'High-confidence photos go straight to the album. Only uncertain photos require attention.',
  },
];

const FLOW_STEPS = ['Create event', 'Share QR', 'Bulk select', 'Automatic check', 'Shared album'];

const FLOW_CAPTION =
  'Processing never blocks the experience. Users return to the album immediately and can keep browsing while their photos are checked.';

const BUILT = [
  { label: 'Product', items: 'Problem framing · PRDs · prioritization · UX' },
  { label: 'Engineering', items: 'Next.js · FastAPI · Postgres · R2 · CI' },
  { label: 'AI', items: 'Photo screening · review routing · evaluation harness' },
];

// ─── Shared card / heading classes ──────────────────────────────

const CARD =
  'bg-black/[0.03] rounded-2xl';
const EYEBROW = 'text-[12px] font-semibold text-[#999] uppercase tracking-[0.14em] mb-3';
const H2 = 'text-[26px] max-sm:text-[22px] font-bold text-[#111] tracking-tight leading-[1.2]';

// ─── Small components ────────────────────────────────────────────

function DemoMedia() {
  const [errored, setErrored] = useState(false);

  return (
    <div className="section-media mt-6">
      <div className={`w-full aspect-video overflow-hidden ${CARD} flex items-center justify-center`}>
        {!errored ? (
          <img
            src="/images/gatheroll-demo.gif"
            alt="GatheRoll demo: scan a QR, bulk-add your photos, watch them sort"
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

function Arrow() {
  return <span className="text-[#bbb] mx-1.5">&rarr;</span>;
}

function FlowStepper() {
  return (
    <>
      {/* Desktop: horizontal with connecting lines */}
      <div className="hidden md:grid md:grid-cols-5 gap-4">
        {FLOW_STEPS.map((step, i) => (
          <div key={step} className="relative flex flex-col items-center text-center px-2">
            {i > 0 && <div className="absolute top-5 right-1/2 w-full h-px bg-black/10" />}
            <div className="relative w-10 h-10 rounded-full bg-[#1d1d1f] text-white flex items-center justify-center text-[14px] font-semibold mb-4">
              {i + 1}
            </div>
            <div className="text-[14px] font-semibold text-[#111] tracking-tight">{step}</div>
          </div>
        ))}
      </div>

      {/* Mobile: stacked */}
      <div className="flex flex-col gap-4 md:hidden">
        {FLOW_STEPS.map((step, i) => (
          <div key={step} className="flex items-center gap-4">
            <div className="w-10 h-10 shrink-0 rounded-full bg-[#1d1d1f] text-white flex items-center justify-center text-[14px] font-semibold">
              {i + 1}
            </div>
            <div className="text-[15px] font-semibold text-[#111] tracking-tight">{step}</div>
          </div>
        ))}
      </div>
    </>
  );
}

// ─── Page ────────────────────────────────────────────────────────

export default function GatherollDetail() {
  return (
    <div className="case-study-body">
      <div className="case-study-content">

        {/* Overview */}
        <div id="overview" data-outline="Overview" className="mt-12 mb-14 animate-fade-in">
          <h1 className="text-[32px] max-sm:text-[26px] font-bold tracking-tight text-[#111] mb-2">
            GatheRoll
          </h1>
          <p className="text-[14px] text-[#999] mb-6">{OVERVIEW.meta}</p>
          <h2 className="text-[22px] max-sm:text-[19px] font-semibold text-[#111] tracking-tight leading-[1.4] mb-3">
            {OVERVIEW.tagline}
          </h2>
          <p className="text-[15px] font-normal text-[#444] leading-[1.7] mb-6">{OVERVIEW.subtext}</p>


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
              className="text-[14px] font-medium px-5 py-2 rounded-full bg-black/[0.05] text-[#1d1d1f] no-underline transition-all duration-200 hover:bg-black/[0.08] active:scale-[0.97]"
            >
              live demo &#8599;
            </a>
          </div>
          <DemoMedia />
        </div>

        <div className="h-px bg-black/5 mb-16" />

        {/* Problem */}
        <Reveal className="mb-14" id="problem" outline="Problem">
          <div className={EYEBROW}>Problem</div>
          <h2 className={`${H2} mb-6`}>Sharing photos is easy. Getting everyone to actually do it isn't.</h2>
          <p className="text-[15px] text-[#444] leading-[1.7] max-w-[640px]">{PROBLEM}</p>
        </Reveal>

        <div className="h-px bg-black/5 mb-16" />

        {/* Key Product Insight */}
        <Reveal className="mb-20 max-sm:mb-14" id="insight" outline="Key Insight">
          <div className={EYEBROW}>Key Product Insight</div>
          <h2 className={`${H2} mb-8`}>
            Reviewing the whole batch before sharing was the expensive part.
          </h2>
          <div className={`p-7 max-sm:p-6 mb-6 ${CARD}`}>
            <div className="flex flex-col gap-4">
              <div className="flex items-center gap-4 flex-wrap">
                <span className="text-[11px] font-semibold text-[#999] uppercase tracking-[0.1em] w-[84px] shrink-0">Before</span>
                <span className="text-[14px] text-[#666]">
                  Select 80<Arrow />Review 80<Arrow />Share
                </span>
              </div>
              <div className="h-px bg-black/5" />
              <div className="flex items-center gap-4 flex-wrap">
                <span className="text-[11px] font-semibold text-[#111] uppercase tracking-[0.1em] w-[84px] shrink-0">GatheRoll</span>
                <span className="text-[14px] text-[#111]">
                  Select 80<Arrow />Check automatically<Arrow />
                  <span className="font-semibold">62 shared</span> <span className="text-[#888]">/ 18 review</span>
                </span>
              </div>
            </div>
          </div>
          <p className="text-[15px] text-[#444] leading-[1.7]">{INSIGHT_TAKEAWAY}</p>
        </Reveal>

        <div className="h-px bg-black/5 mb-16" />

        {/* 3 Product Decisions */}
        <Reveal className="mb-20 max-sm:mb-14" id="decisions" outline="Decisions">
          <div className={EYEBROW}>3 Product Decisions</div>
          <h2 className={`${H2} mb-10`}>Every decision traded one failure mode for a cheaper one.</h2>
          <div className="grid grid-cols-3 max-sm:grid-cols-1 gap-5">
            {DECISIONS.map((d) => (
              <div key={d.num} className={`p-7 max-sm:p-6 flex flex-col ${CARD}`}>
                <p className="text-[13px] font-medium text-[#666] mb-3">{d.num}</p>
                <h3 className="text-[18px] font-semibold text-[#111] tracking-tight mb-3">{d.title}</h3>
                <p className="text-[15px] text-[#444] leading-[1.65]">{d.description}</p>
              </div>
            ))}
          </div>
        </Reveal>

        <div className="h-px bg-black/5 mb-16" />

        {/* Product Flow */}
        <Reveal className="mb-20 max-sm:mb-14" id="flow" outline="Product Flow">
          <div className={EYEBROW}>Product Flow</div>
          <h2 className={`${H2} mb-10`}>From QR scan to a shared album.</h2>
          <div className={`p-8 max-sm:p-6 mb-6 ${CARD}`}>
            <FlowStepper />
          </div>
          <p className="text-[15px] text-[#444] leading-[1.7]">{FLOW_CAPTION}</p>
        </Reveal>

        <div className="h-px bg-black/5 mb-16" />

        {/* Built End-to-End */}
        <Reveal className="mb-16" id="built" outline="Built End-to-End">
          <div className={EYEBROW}>Built End-to-End</div>
          <div className={`p-7 max-sm:p-6 ${CARD}`}>
            <div className="grid grid-cols-3 max-sm:grid-cols-1 gap-6">
              {BUILT.map((row) => (
                <div key={row.label}>
                  <div className="text-[13px] font-semibold text-[#999] uppercase tracking-[0.1em] mb-2">
                    {row.label}
                  </div>
                  <div className="text-[14px] text-[#444] leading-[1.6]">{row.items}</div>
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </div>
  );
}
