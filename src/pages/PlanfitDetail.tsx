import { type ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { useScrollReveal } from '../hooks/useScrollReveal';
import { PLANFIT_OVERVIEW, PLANFIT_PROJECTS } from './planfitData';

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

// ─── Project block (Work-page style) ────────────────────────────

function ProjectBlock({ project, index }: {
  project: (typeof PLANFIT_PROJECTS)[number];
  index: number;
}) {
  const reversed = index % 2 !== 0;

  return (
    <Reveal>
      <div className={`flex flex-col ${reversed ? 'md:flex-row-reverse' : 'md:flex-row'} items-center gap-10 md:gap-14`}>
        {/* Image placeholder */}
        <div className="flex-1 w-full">
          <div className="w-full aspect-[16/10] rounded-2xl bg-white/10 backdrop-blur-[12px] border border-white/25 flex items-center justify-center">
            <span className="text-black/20 text-[13px]">screenshot</span>
          </div>
        </div>

        {/* Text */}
        <div className="flex-1">
          <p className="text-[13px] text-[#999]">
            {project.num} · {project.heroMetrics}
          </p>
          <h3 className="mt-2 text-[24px] max-sm:text-[20px] font-semibold text-[#1d1d1f] tracking-tight">
            {project.title.toLowerCase()}
          </h3>
          <p className="mt-3 text-[15px] text-[#444] leading-[1.65]">{project.summary}</p>
          <div className="mt-5">
            <Link
              to={`/work/planfit/${project.slug}`}
              className="text-[14px] font-medium px-5 py-2 rounded-full bg-[#1d1d1f] text-white no-underline cursor-pointer transition-all duration-200 hover:bg-[#424245] active:scale-[0.97]"
            >
              read case study
            </Link>
          </div>
        </div>
      </div>
    </Reveal>
  );
}

// ─── Page ────────────────────────────────────────────────────────

export default function PlanfitDetail() {
  return (
    <div className="min-h-screen">
      <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute -top-[10%] -right-[10%] w-[500px] h-[500px] rounded-full bg-[rgba(100,140,180,0.25)] blur-[120px]" />
        <div className="absolute bottom-[5%] -left-[10%] w-[450px] h-[450px] rounded-full bg-[rgba(120,155,190,0.2)] blur-[110px]" />
        <div className="absolute top-[35%] left-[30%] w-[350px] h-[350px] rounded-full bg-[rgba(140,170,200,0.15)] blur-[90px]" />
      </div>
      <div className="max-w-[1080px] mx-auto px-10 max-sm:px-5 pt-14 pb-24">
        <Link to="/" className="text-[14px] font-medium text-[#86868b] no-underline transition-opacity duration-200 hover:opacity-60">
          ← back
        </Link>

        {/* Overview */}
        <div className="mt-12 mb-14 animate-fade-in">
          <h1 className="text-[32px] max-sm:text-[26px] font-bold tracking-tight text-[#111] mb-6">
            Planfit
          </h1>
          <div className="flex flex-col gap-2 mb-6">
            <div className="text-[15px] font-normal text-[#444]"><span className="font-semibold text-[#111]">Role:</span> {PLANFIT_OVERVIEW.role}</div>
            <div className="text-[15px] font-normal text-[#444]"><span className="font-semibold text-[#111]">Team:</span> {PLANFIT_OVERVIEW.team}</div>
            <div className="text-[15px] font-normal text-[#444]"><span className="font-semibold text-[#111]">Period:</span> {PLANFIT_OVERVIEW.period}</div>
          </div>
          <p className="text-[15px] font-normal text-[#444] leading-[1.7] mb-6">{PLANFIT_OVERVIEW.summary}</p>
          <div className="flex flex-wrap gap-2 mb-4">
            {PLANFIT_OVERVIEW.skills.map((s) => <ToolPill key={s}>{s}</ToolPill>)}
          </div>
          <div className="flex flex-wrap gap-2">
            {PLANFIT_OVERVIEW.tools.map((t) => <ToolPill key={t}>{t}</ToolPill>)}
          </div>
        </div>

        <div className="h-px bg-black/5 mb-16" />

        {/* Case studies */}
        <div className="mb-8 animate-fade-in">
          <h2 className="text-[12px] font-semibold text-[#999] uppercase tracking-[0.14em] mb-12">
            Case Studies
          </h2>
          <div className="space-y-24 max-sm:space-y-16">
            {PLANFIT_PROJECTS.map((project, i) => (
              <ProjectBlock key={project.slug} project={project} index={i} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
