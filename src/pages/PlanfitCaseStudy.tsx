import { Link, useParams, Navigate } from 'react-router-dom';
import { PLANFIT_PROJECTS, type PlanfitProject } from './planfitData';
import { Reveal, ToolPill } from '../components/shared';

// ─── Case Study View ────────────────────────────────────────────

function CaseStudyView({ project }: { project: PlanfitProject }) {
  return (
    <div>
      {/* ── HERO ── */}
      <Reveal className="mb-12" id="overview" outline="Overview">
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
      <Reveal className="mb-16" id="problem" outline="Problem">
        <h2 className="text-[26px] font-bold text-[#111] tracking-tight mb-7 leading-[1.25]">
          {project.problemHeadline}
        </h2>
        <p className="text-[15px] font-normal text-[#444] leading-[1.7] max-w-[640px]">
          {project.problemBody}
        </p>
      </Reveal>

      <div className="h-px bg-black/5 mb-16" />

      {/* ── THINKING ── */}
      <Reveal className="mb-16" id="thinking" outline="Thinking">
        <h2 className="text-[26px] font-bold text-[#111] tracking-tight mb-7 leading-[1.25]">
          {project.thinkingHeadline}
        </h2>
        <div className="grid grid-cols-3 max-sm:grid-cols-1 gap-4">
          {project.thinking.map((step) => (
            <div key={step.label} className="bg-black/[0.03] rounded-2xl px-6 py-6">
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
      <Reveal className="mb-16" id="execution" outline="Execution">
        <h2 className="text-[26px] font-bold text-[#111] tracking-tight mb-7 leading-[1.25]">
          {project.executionHeadline}
        </h2>
        <div className="grid grid-cols-2 max-sm:grid-cols-1 gap-4">
          {project.execution.map((step, i) => (
            <div key={i} className="bg-black/[0.03] rounded-2xl px-6 py-6">
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
      <Reveal className="mb-16" id="impact" outline="Impact">
        <h2 className="text-[26px] font-bold text-[#111] tracking-tight mb-7 leading-[1.25]">
          {project.impactHeadline}
        </h2>
        <div className="grid grid-cols-4 max-sm:grid-cols-2 gap-4 mb-8">
          {project.impact.map((m) => (
            <div key={m.label} className="bg-black/[0.03] rounded-2xl px-5 py-7 text-center">
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
        <div className="bg-black/[0.03] rounded-2xl px-6 py-5 flex items-center gap-3 flex-wrap">
          <span className="text-[11px] font-semibold text-[#999] uppercase tracking-[0.14em] shrink-0">Tools</span>
          {project.tools.map((t) => <ToolPill key={t}>{t}</ToolPill>)}
        </div>
      </Reveal>
    </div>
  );
}

// ─── Page ────────────────────────────────────────────────────────

// Gate: case studies are hidden behind a password. Direct URL access is
// redirected back to the Planfit overview until the content is ready to
// publish. Remove this line to re-enable the case studies.
const CASE_STUDIES_PUBLISHED = false;

export default function PlanfitCaseStudy() {
  const { slug } = useParams<{ slug: string }>();
  const project = PLANFIT_PROJECTS.find((p) => p.slug === slug);

  if (!CASE_STUDIES_PUBLISHED) return <Navigate to="/work/planfit" replace />;
  if (!project) return <Navigate to="/work/planfit" replace />;

  return (
    <div className="case-study-body">
      <div className="case-study-content">
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
