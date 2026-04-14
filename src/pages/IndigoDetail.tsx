import { type ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { useScrollReveal } from '../hooks/useScrollReveal';

function Reveal({ children, className = '' }: { children: ReactNode; className?: string }) {
  const { ref, visible } = useScrollReveal();
  return (
    <div ref={ref} className={`transition-all duration-600 ease-out ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'} ${className}`}>
      {children}
    </div>
  );
}

function ToolPill({ children }: { children: string }) {
  return (
    <span className="text-[11px] text-[#666] font-normal bg-white/15 backdrop-blur-[8px] border border-white/30 rounded-full px-3 py-1">
      {children}
    </span>
  );
}

// ─── Data ────────────────────────────────────────────────────────

const OVERVIEW = {
  event: 'NYC Build With AI Hackathon @ NYU Tandon — March 2026',
  role: 'Full-Stack + AI Engineer',
  duration: '36 hours',
  summary:
    'Real-time audio awareness for deaf and hard-of-hearing users. Your phone listens, classifies sounds with Gemini 2.5 Flash, and sends actionable alerts to your Apple Watch — not transcriptions, but instructions.',
  links: {
    pitchDeck: 'https://www.figma.com/deck/ebsg6XMvEQVfHLcYQmva4Z/myIndigo_Google?node-id=1-133&viewport=-124%2C-31%2C0.59&t=TTdyLd0Ns68gQfd3-1&scaling=min-zoom&content-scaling=fixed&page-id=0%3A1',
    github: 'https://github.com/yunLeia/indigo-ai-agent',
  },
};

const FLOW_STEPS = [
  {
    label: 'Detect',
    bullets: [
      'PCM16 audio streamed via WebSocket',
      'Gemini classifies into {siren, speech, ambient}',
    ],
  },
  {
    label: 'Understand',
    bullets: [
      'ADK agents interpret structured outputs',
      'Context-aware reasoning per task',
    ],
  },
  {
    label: 'Act',
    bullets: [
      'Low-latency alerts via WebSocket',
      'Delivered to phone + Apple Watch',
    ],
  },
];

const DECISIONS = [
  {
    title: 'Single model',
    description: 'Used a single model (Gemini) to reduce system complexity and ship quickly. A dedicated classifier would improve performance at scale, but wasn\u2019t worth the integration cost in a 36-hour build.',
  },
  {
    title: 'Routing',
    description: 'Used deterministic routing (if/else) after classification. Misrouting a siren is a safety failure, not a UX issue, so predictability mattered more than flexibility.',
  },
];

// ─── Page ────────────────────────────────────────────────────────

export default function IndigoDetail() {
  return (
    <div className="min-h-screen">
      <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute -top-[10%] -right-[10%] w-[500px] h-[500px] rounded-full bg-[rgba(100,140,180,0.25)] blur-[120px]" />
        <div className="absolute bottom-[5%] -left-[10%] w-[450px] h-[450px] rounded-full bg-[rgba(120,155,190,0.2)] blur-[110px]" />
        <div className="absolute top-[35%] left-[30%] w-[350px] h-[350px] rounded-full bg-[rgba(140,170,200,0.15)] blur-[90px]" />
      </div>
      <div className="max-w-[1080px] mx-auto px-10 max-sm:px-5 pt-28 max-sm:pt-24 pb-24">
        <Link to="/" className="text-[14px] font-medium text-[#86868b] no-underline transition-opacity duration-200 hover:opacity-60">
          ← back
        </Link>

        {/* Overview */}
        <div className="mt-12 mb-14 animate-fade-in">
          <h1 className="text-[32px] max-sm:text-[26px] font-bold tracking-tight text-[#111] mb-2">
            myIndigo
          </h1>
          <p className="text-[14px] text-[#999] mb-6">{OVERVIEW.event}</p>
          <div className="flex flex-col gap-2 mb-6">
            <div className="text-[15px] font-normal text-[#444]"><span className="font-semibold text-[#111]">Role:</span> {OVERVIEW.role}</div>
          </div>
          <p className="text-[15px] font-normal text-[#444] leading-[1.7] mb-6">{OVERVIEW.summary}</p>
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
              href={OVERVIEW.links.pitchDeck}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[14px] font-medium px-5 py-2 rounded-full bg-white/15 backdrop-blur-[12px] border border-white/30 text-[#1d1d1f] no-underline transition-all duration-200 hover:bg-white/25 active:scale-[0.97]"
            >
              pitch deck &#8599;
            </a>
          </div>
        </div>

        <div className="h-px bg-black/5 mb-16" />

        {/* Context — Problem / Target */}
        <Reveal className="mb-20 max-sm:mb-14">
          <div className="text-[11px] font-semibold text-[#999] uppercase tracking-[0.14em] mb-3">
            Context
          </div>
          <h2 className="text-[26px] max-sm:text-[22px] font-bold text-[#111] tracking-tight leading-[1.2] mb-10">
            Critical sounds go unheard — and that's both a safety and accessibility problem.
          </h2>
          <div className="grid grid-cols-2 max-sm:grid-cols-1 gap-5 max-sm:gap-4">
            {/* The Problem */}
            <div className="bg-white/15 backdrop-blur-[16px] border border-white/30 shadow-[0_2px_16px_rgba(0,0,0,0.06),inset_0_1px_0_rgba(255,255,255,0.3)] rounded-2xl p-7 max-sm:p-6">
              <h3 className="text-[18px] font-semibold text-[#111] tracking-tight mb-3">
                The Problem
              </h3>
              <p className="text-[15px] font-normal text-[#444] leading-[1.65] mb-5">
                Critical sounds in daily life go unheard — alarms, announcements, doorbells, laughter.
              </p>
              <ul className="space-y-2 text-[14px] text-[#666] leading-[1.6]">
                <li>• Limited access to information</li>
                <li>• Constant safety uncertainty</li>
                <li>• Social disconnection</li>
                <li>• Loss of control in everyday life</li>
              </ul>
            </div>

            {/* Who It's For */}
            <div className="bg-white/15 backdrop-blur-[16px] border border-white/30 shadow-[0_2px_16px_rgba(0,0,0,0.06),inset_0_1px_0_rgba(255,255,255,0.3)] rounded-2xl p-7 max-sm:p-6">
              <h3 className="text-[18px] font-semibold text-[#111] tracking-tight mb-3">
                Who It's For
              </h3>
              <div className="mb-4">
                <div className="text-[14px] font-semibold text-[#111] mb-1">Primary</div>
                <div className="text-[14px] text-[#444] leading-[1.6]">Deaf &amp; hard-of-hearing users — for whom detection is both an accessibility and safety need.</div>
              </div>
              <div>
                <div className="text-[14px] font-semibold text-[#111] mb-1">Extended</div>
                <div className="text-[14px] text-[#444] leading-[1.6]">Older adults — ~1/3 of 65+ experience hearing loss and miss household alerts.</div>
              </div>
            </div>
          </div>
        </Reveal>

        {/* The Solution (full-width image) */}
        <Reveal className="mb-20 max-sm:mb-14">
          <div className="text-[11px] font-semibold text-[#999] uppercase tracking-[0.14em] mb-3">
            The Solution
          </div>
          <h2 className="text-[26px] max-sm:text-[22px] font-bold text-[#111] tracking-tight leading-[1.2] mb-10">
            Turn sounds into grounded, actionable guidance.
          </h2>
          <div className="w-full rounded-2xl overflow-hidden bg-white/10 backdrop-blur-[12px] border border-white/25">
            <img src="/images/indigo-solution.png" alt="Solution — Listen, Understand, Act" className="w-full h-auto block" />
          </div>
        </Reveal>

        <div className="h-px bg-black/5 mb-16" />

        {/* Real-time audio pipeline */}
        <Reveal className="mb-20 max-sm:mb-14">
          <div className="text-[11px] font-semibold text-[#999] uppercase tracking-[0.14em] mb-3">
            Real-time Audio Pipeline
          </div>
          <h2 className="text-[26px] max-sm:text-[22px] font-bold text-[#111] tracking-tight leading-[1.2] mb-3">
            Audio in, action out.
          </h2>
          <p className="text-[16px] max-sm:text-[15px] font-normal text-[#666] leading-[1.5] mb-10">
            End-to-end real-time audio pipeline.
          </p>
          <div className="flex flex-col md:flex-row md:items-start gap-8 md:gap-12">
            <div className="flex-1 w-full">
              <div className="w-full rounded-2xl overflow-hidden bg-white/10 backdrop-blur-[12px] border border-white/25">
                <img src="/images/indigo-pipeline.png" alt="End-to-end audio pipeline" className="w-full h-auto block" />
              </div>
            </div>
            <div className="flex-1">
              <div className="flex flex-col gap-5">
                {FLOW_STEPS.map((step) => (
                  <div key={step.label}>
                    <div className="text-[16px] font-semibold text-[#111] tracking-tight mb-2">{step.label}</div>
                    <ul className="space-y-1 text-[14px] text-[#444] leading-[1.6]">
                      {step.bullets.map((b) => (
                        <li key={b}>• {b}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
              <div className="flex flex-wrap gap-2 mt-7">
                <ToolPill>Gemini 2.5 Flash</ToolPill>
                <ToolPill>WebSocket</ToolPill>
                <ToolPill>FastAPI</ToolPill>
                <ToolPill>Web Audio API</ToolPill>
              </div>
            </div>
          </div>
        </Reveal>

        <div className="h-px bg-black/5 mb-16" />

        {/* System Design */}
        <Reveal className="mb-20 max-sm:mb-14">
          <div className="text-[11px] font-semibold text-[#999] uppercase tracking-[0.14em] mb-3">
            System Design
          </div>
          <h2 className="text-[26px] max-sm:text-[22px] font-bold text-[#111] tracking-tight leading-[1.2] mb-3">
            One model. Multiple roles.
          </h2>
          <p className="text-[16px] max-sm:text-[15px] font-normal text-[#666] leading-[1.5] mb-10">
            Orchestrated via agents.
          </p>
          <div className="flex flex-col md:flex-row-reverse md:items-start gap-8 md:gap-12">
            <div className="flex-1 w-full">
              <div className="w-full rounded-2xl overflow-hidden bg-white/10 backdrop-blur-[12px] border border-white/25">
                <img src="/images/indigo-gemini-roles.png" alt="Gemini used in three roles" className="w-full h-auto block" />
              </div>
            </div>
            <div className="flex-1">
              <div className="flex flex-col gap-5">
                <div>
                  <div className="text-[16px] font-semibold text-[#111] tracking-tight mb-2">Gemini 2.5 Flash is used across</div>
                  <ul className="space-y-1 text-[14px] text-[#444] leading-[1.6]">
                    <li>• Audio classification</li>
                    <li>• Siren analysis <span className="text-[#888]">(SirenAgent)</span></li>
                    <li>• Speech summarization <span className="text-[#888]">(SummaryAgent)</span></li>
                  </ul>
                  <p className="text-[13px] text-[#666] leading-[1.6] mt-2">Outputs structured data, not raw text.</p>
                </div>
                <div>
                  <div className="text-[16px] font-semibold text-[#111] tracking-tight mb-2">Orchestrated via Google ADK</div>
                  <ul className="space-y-1 text-[14px] text-[#444] leading-[1.6]">
                    <li>• Each request handled by task-specific agents</li>
                    <li>• Stateless execution per session</li>
                  </ul>
                </div>
              </div>
              <div className="flex flex-wrap gap-2 mt-7">
                <ToolPill>Google ADK</ToolPill>
                <ToolPill>LlmAgent</ToolPill>
                <ToolPill>Python</ToolPill>
              </div>
            </div>
          </div>
        </Reveal>

        <div className="h-px bg-black/5 mb-16" />

        {/* Key Decisions */}
        <Reveal className="mb-16">
          <div className="text-[11px] font-semibold text-[#999] uppercase tracking-[0.14em] mb-3">
            Key Decisions
          </div>
          <h2 className="text-[26px] max-sm:text-[22px] font-bold text-[#111] tracking-tight leading-[1.2] mb-10">
            Ship fast, stay safe.
          </h2>
          <div className="grid grid-cols-2 max-sm:grid-cols-1 gap-5">
            {DECISIONS.map((d) => (
              <div key={d.title} className="bg-white/15 backdrop-blur-[16px] border border-white/30 shadow-[0_2px_16px_rgba(0,0,0,0.06),inset_0_1px_0_rgba(255,255,255,0.3)] rounded-2xl p-7 max-sm:p-6">
                <h3 className="text-[18px] font-semibold text-[#111] tracking-tight mb-3">{d.title}</h3>
                <p className="text-[15px] font-normal text-[#444] leading-[1.65]">{d.description}</p>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </div>
  );
}
