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
  event: 'Tech@NYU — TechTrek',
  role: 'PM and AI Engineer',
  summary:
    'CulinAI is an AI-powered site that allows users to generate recipes by uploading a photo of their fridge or food items.',
  links: {
    github: 'https://github.com/leiassyun/CulinAI',
  },
};

const FLOW_STEPS = [
  {
    label: 'Capture',
    text: 'User uploads a photo of their fridge or ingredients.',
  },
  {
    label: 'Recognize',
    text: 'LLaVA extracts ingredients directly from the image — one multimodal pass instead of a separate vision + LLM pipeline.',
  },
  {
    label: 'Generate',
    text: 'Prompt-tuned outputs return a recipe; SDXL-Turbo generates a matching food image. Users save and organize recipes they like.',
  },
];

const DECISIONS = [
  {
    title: 'Multimodal model',
    description: 'LLaVA handles vision + language in a single pass. Reduced pipeline complexity and enabled real-time response.',
    role: 'Modeling decision',
  },
  {
    title: 'Inference strategy',
    description: 'Used Replicate for hosted inference. Optimized for iteration speed over infra control during a solo build.',
    role: 'Infra decision',
  },
];

// ─── Page ────────────────────────────────────────────────────────

export default function CulineAIDetail() {
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
            CulinAI
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
          </div>
        </div>

        <div className="h-px bg-black/5 mb-16" />

        {/* Context */}
        <Reveal className="mb-20 max-sm:mb-14">
          <div className="text-[11px] font-semibold text-[#999] uppercase tracking-[0.14em] mb-3">
            Context
          </div>
          <h2 className="text-[26px] max-sm:text-[22px] font-bold text-[#111] tracking-tight leading-[1.2] mb-10">
            Most people already have food at home. They just don't know how to turn it into a meal.
          </h2>
          <div className="grid grid-cols-2 max-sm:grid-cols-1 gap-5 max-sm:gap-4">
            <div className="bg-white/15 backdrop-blur-[16px] border border-white/30 shadow-[0_2px_16px_rgba(0,0,0,0.06),inset_0_1px_0_rgba(255,255,255,0.3)] rounded-2xl p-7 max-sm:p-6">
              <h3 className="text-[18px] font-semibold text-[#111] tracking-tight mb-3">
                The Problem
              </h3>
              <p className="text-[15px] font-normal text-[#444] leading-[1.65] mb-5">
                "What should I eat today?" isn't a lack of options. It's a mismatch between what people have and what recipes expect.
              </p>
              <ul className="space-y-2 text-[14px] text-[#666] leading-[1.6]">
                <li>• Ingredients sit unused because recipes assume missing items</li>
                <li>• People default to the same meals or order out</li>
                <li>• Planning meals feels harder than cooking them</li>
              </ul>
            </div>
            <div className="bg-white/15 backdrop-blur-[16px] border border-white/30 shadow-[0_2px_16px_rgba(0,0,0,0.06),inset_0_1px_0_rgba(255,255,255,0.3)] rounded-2xl p-7 max-sm:p-6">
              <h3 className="text-[18px] font-semibold text-[#111] tracking-tight mb-3">
                Why CulinAI
              </h3>
              <p className="text-[15px] font-normal text-[#444] leading-[1.65] mb-5">
                Cook from what you already have — not what a recipe expects.
              </p>
              <ul className="space-y-2 text-[14px] text-[#666] leading-[1.6]">
                <li>• Generate recipes from available ingredients</li>
                <li>• Adapt to constraints instead of requiring substitutions</li>
                <li>• Turn "random ingredients" into structured meals</li>
              </ul>
            </div>
          </div>
        </Reveal>

        <div className="h-px bg-black/5 mb-16" />

        {/* Pipeline */}
        <Reveal className="mb-20 max-sm:mb-14">
          <div className="text-[11px] font-semibold text-[#999] uppercase tracking-[0.14em] mb-3">
            How It Works
          </div>
          <h2 className="text-[26px] max-sm:text-[22px] font-bold text-[#111] tracking-tight leading-[1.2] mb-10">
            Photo in, recipe out.
          </h2>
          <div className="flex flex-col md:flex-row md:items-start gap-8 md:gap-12">
            <div className="flex-1 w-full">
              <div className="w-full rounded-2xl overflow-hidden bg-white/10 backdrop-blur-[12px] border border-white/25">
                <img src="/images/culinai-upload.png" alt="CulinAI upload interface" className="w-full h-auto block" />
              </div>
            </div>
            <div className="flex-1">
              <div className="flex flex-col gap-5">
                {FLOW_STEPS.map((step) => (
                  <div key={step.label}>
                    <div className="text-[16px] font-semibold text-[#111] tracking-tight mb-1.5">{step.label}</div>
                    <div className="text-[14px] text-[#444] leading-[1.65]">{step.text}</div>
                  </div>
                ))}
              </div>
              <div className="flex flex-wrap gap-2 mt-7">
                <ToolPill>LLaVA</ToolPill>
                <ToolPill>SDXL-Turbo</ToolPill>
                <ToolPill>Replicate</ToolPill>
                <ToolPill>JavaScript</ToolPill>
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
            Ship fast, stay focused.
          </h2>
          <div className="grid grid-cols-2 max-sm:grid-cols-1 gap-5">
            {DECISIONS.map((d) => (
              <div key={d.title} className="bg-white/15 backdrop-blur-[16px] border border-white/30 shadow-[0_2px_16px_rgba(0,0,0,0.06),inset_0_1px_0_rgba(255,255,255,0.3)] rounded-2xl p-7 max-sm:p-6 flex flex-col">
                <h3 className="text-[18px] font-semibold text-[#111] tracking-tight mb-3">{d.title}</h3>
                <p className="text-[15px] font-normal text-[#444] leading-[1.65] mb-5 flex-1">{d.description}</p>
                <div className="text-[11px] font-semibold text-[#999] uppercase tracking-[0.14em]">
                  {d.role}
                </div>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </div>
  );
}
