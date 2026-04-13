import { type ReactNode } from 'react';
import { Link, useParams, Navigate } from 'react-router-dom';
import { useScrollReveal } from '../hooks/useScrollReveal';
import { PLANFIT_PROJECTS, type PlanfitProject } from './planfitData';

// ─── Helpers ─────────────────────────────────────────────────────

function ToolPill({ children }: { children: string }) {
  return (
    <span className="text-[11px] text-[#666] font-normal bg-white/15 backdrop-blur-[8px] border border-white/30 rounded-full px-3 py-1">
      {children}
    </span>
  );
}

function Reveal({ children, className = '' }: { children: ReactNode; className?: string }) {
  const { ref, visible } = useScrollReveal();
  return (
    <div ref={ref} className={`transition-all duration-600 ease-out ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'} ${className}`}>
      {children}
    </div>
  );
}

// ─── Case Study View ────────────────────────────────────────────

function CaseStudyView({ project }: { project: PlanfitProject }) {
  return (
    <div>
      {/* ── HERO ── */}
      <Reveal className="mb-12">
        <p className="text-[36px] sm:text-[44px] font-light text-[#111] leading-[1.2] tracking-tight mb-12" style={{ fontFamily: "'Lora', serif" }}>
          <span className="italic">{project.heroTagline[0]}</span>
          <br />
          <span className="italic">{project.heroTagline[1]}</span>
        </p>
        <div className="text-[16px] font-medium text-[#555] tracking-tight">
          {project.heroMetrics}
        </div>
      </Reveal>

      {/* ── PROBLEM ── */}
      <Reveal className="mb-16">
        <h3 className="text-[26px] font-bold text-[#111] tracking-tight mb-7 leading-[1.25]">
          {project.problemHeadline}
        </h3>
        <p className="text-[15px] font-normal text-[#444] leading-[1.7] max-w-[640px]">
          {project.problemBody}
        </p>
      </Reveal>

      <div className="h-px bg-black/5 mb-16" />

      {/* ── THINKING ── */}
      <Reveal className="mb-16">
        <h3 className="text-[26px] font-bold text-[#111] tracking-tight mb-7 leading-[1.25]">
          {project.thinkingHeadline}
        </h3>
        <div className="grid grid-cols-3 max-sm:grid-cols-1 gap-4">
          {project.thinking.map((step) => (
            <div key={step.label} className="bg-white/15 backdrop-blur-[16px] border border-white/30 shadow-[0_2px_16px_rgba(0,0,0,0.06),inset_0_1px_0_rgba(255,255,255,0.3)] rounded-2xl px-6 py-6">
              <div className="text-[11px] font-semibold text-[#999] uppercase tracking-[0.14em] mb-3">
                {step.label}
              </div>
              <p className="text-[15px] font-normal text-[#444] leading-[1.7]">
                {step.text}
              </p>
            </div>
          ))}
        </div>
      </Reveal>

      <div className="h-px bg-black/5 mb-16" />

      {/* ── EXECUTION ── */}
      <Reveal className="mb-16">
        <h3 className="text-[26px] font-bold text-[#111] tracking-tight mb-7 leading-[1.25]">
          {project.executionHeadline}
        </h3>
        <div className="grid grid-cols-2 max-sm:grid-cols-1 gap-4">
          {project.execution.map((step, i) => (
            <div key={i} className="bg-white/15 backdrop-blur-[16px] border border-white/30 shadow-[0_2px_16px_rgba(0,0,0,0.06),inset_0_1px_0_rgba(255,255,255,0.3)] rounded-2xl px-6 py-6">
              <div className="flex items-baseline gap-3 mb-3">
                <span className="text-[13px] font-bold text-[#d2d2d7]">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <span className="text-[14px] font-semibold text-[#111]">
                  {step.label}
                </span>
              </div>
              <p className="text-[15px] font-normal text-[#444] leading-[1.7]">
                {step.text}
              </p>
            </div>
          ))}
        </div>
      </Reveal>

      <div className="h-px bg-black/5 mb-16" />

      {/* ── IMPACT ── */}
      <Reveal className="mb-16">
        <h3 className="text-[26px] font-bold text-[#111] tracking-tight mb-7 leading-[1.25]">
          {project.impactHeadline}
        </h3>
        <div className="grid grid-cols-4 max-sm:grid-cols-2 gap-4 mb-8">
          {project.impact.map((m) => (
            <div key={m.label} className="bg-white/15 backdrop-blur-[16px] border border-white/30 shadow-[0_2px_16px_rgba(0,0,0,0.06),inset_0_1px_0_rgba(255,255,255,0.3)] rounded-2xl px-5 py-7 text-center">
              <div className="text-[40px] sm:text-[52px] font-semibold text-[#111] leading-none mb-3" style={{ fontFamily: "'Lora', serif" }}>
                {m.value}
              </div>
              <div className="text-[11px] font-medium text-[#888] uppercase tracking-[0.08em]">
                {m.label}
              </div>
            </div>
          ))}
        </div>
        <p className="text-[15px] font-normal text-[#444] italic leading-[1.8] max-w-[640px]" style={{ fontFamily: "'Lora', serif" }}>
          {project.impactTakeaway}
        </p>
      </Reveal>

      {/* ── TOOLS ── */}
      <Reveal>
        <div className="bg-white/15 backdrop-blur-[16px] border border-white/30 shadow-[0_2px_16px_rgba(0,0,0,0.06),inset_0_1px_0_rgba(255,255,255,0.3)] rounded-2xl px-6 py-5 flex items-center gap-3 flex-wrap">
          <span className="text-[11px] font-semibold text-[#999] uppercase tracking-[0.14em] shrink-0">Tools</span>
          {project.tools.map((t) => <ToolPill key={t}>{t}</ToolPill>)}
        </div>
      </Reveal>
    </div>
  );
}

// ─── Page ────────────────────────────────────────────────────────

export default function PlanfitCaseStudy() {
  const { slug } = useParams<{ slug: string }>();
  const project = PLANFIT_PROJECTS.find((p) => p.slug === slug);

  if (!project) return <Navigate to="/work/planfit" replace />;

  return (
    <div className="min-h-screen">
      <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute -top-[10%] -right-[10%] w-[500px] h-[500px] rounded-full bg-[rgba(100,140,180,0.25)] blur-[120px]" />
        <div className="absolute bottom-[5%] -left-[10%] w-[450px] h-[450px] rounded-full bg-[rgba(120,155,190,0.2)] blur-[110px]" />
        <div className="absolute top-[35%] left-[30%] w-[350px] h-[350px] rounded-full bg-[rgba(140,170,200,0.15)] blur-[90px]" />
      </div>
      <div className="max-w-[1080px] mx-auto px-10 max-sm:px-5 pt-14 pb-24">
        <Link to="/work/planfit" className="text-[14px] font-medium text-[#86868b] no-underline transition-opacity duration-200 hover:opacity-60">
          ← back to planfit
        </Link>

        <div className="mt-12 mb-14 animate-fade-in">
          <p className="text-[13px] text-[#999] mb-2">planfit · case study {project.num}</p>
          <h1 className="text-[32px] max-sm:text-[26px] font-bold tracking-tight text-[#111]">
            {project.title}
          </h1>
        </div>

        <div className="h-px bg-black/5 mb-14" />

        <CaseStudyView project={project} />
      </div>
    </div>
  );
}
