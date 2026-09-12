import { useState } from 'react';
import { PLANFIT_OVERVIEW, PLANFIT_PROJECTS } from './planfitData';
import PasswordModal from '../components/PasswordModal';
import { trackCaseStudyClick } from '../lib/analytics';
import { Reveal, ToolPill } from '../components/shared';

// ─── Project block (Work-page style) ────────────────────────────

function ProjectBlock({ project, index, onReadMore }: {
  project: (typeof PLANFIT_PROJECTS)[number];
  index: number;
  onReadMore: () => void;
}) {
  const reversed = index % 2 !== 0;

  return (
    <Reveal id={`case-study-${project.slug}`} outline={project.title}>
      <div className={`flex flex-col ${reversed ? 'md:flex-row-reverse' : 'md:flex-row'} items-center gap-10 md:gap-14`}>
        {/* Image */}
        <div className="w-full md:flex-[2]">
          <div className="w-full aspect-[16/10] rounded-2xl overflow-hidden border border-black/5 bg-[#F0F3F7]">
            {project.image ? (
              <img
                src={project.image}
                alt={project.title}
                loading="lazy"
                decoding="async"
                className="w-full h-full object-contain"
                style={{
                  transform: project.imageZoom ? `scale(${project.imageZoom})` : undefined,
                  filter: 'blur(2.5px)',
                }}
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center">
                <span className="text-black/20 text-[13px]">screenshot</span>
              </div>
            )}
          </div>
        </div>

        {/* Text */}
        <div className="md:flex-[3]">
          <p className="text-[13px] font-medium text-[#666]">
            {project.num} &middot; {project.heroMetrics}
          </p>
          <h3 className="mt-3 text-[28px] max-sm:text-[22px] font-bold text-[#111] tracking-tight leading-[1.2]">
            {project.title}
          </h3>
          <p className="mt-4 text-[15px] text-[#333] leading-[1.65]">{project.summary}</p>
          {project.tools && project.tools.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-5">
              {project.tools.map((t) => (
                <ToolPill key={t}>{t}</ToolPill>
              ))}
            </div>
          )}
          <div className="mt-6">
            <button
              onClick={onReadMore}
              className="inline-flex items-center gap-2 text-[14px] font-medium px-5 py-2 rounded-full bg-[#1d1d1f] text-white border-0 cursor-pointer transition-all duration-200 hover:bg-[#424245] active:scale-[0.97]"
            >
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                <path d="M7 11V7a5 5 0 0 1 10 0v4" />
              </svg>
              read case study
            </button>
          </div>
        </div>
      </div>
    </Reveal>
  );
}

// ─── Page ────────────────────────────────────────────────────────

export default function PlanfitDetail() {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <div className="case-study-body">
      <div className="case-study-content">

        {/* Overview */}
        <div id="overview" data-outline="Overview" className="mt-12 mb-14 animate-fade-in">
          <h1 className="text-[32px] max-sm:text-[26px] font-bold tracking-tight text-[#111] mb-6">
            <a
              href="https://planfit.ai/en"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#111] no-underline hover:underline underline-offset-[6px] decoration-[#d2d2d7] hover:decoration-[#111] transition-colors duration-200"
            >
              Planfit
            </a>
          </h1>
          <div className="flex flex-col gap-2 mb-6">
            <div className="text-[15px] font-normal text-[#444]"><span className="font-semibold text-[#111]">Role:</span> {PLANFIT_OVERVIEW.role}</div>
            <div className="text-[15px] font-normal text-[#444]"><span className="font-semibold text-[#111]">Team:</span> {PLANFIT_OVERVIEW.team}</div>
            <div className="text-[15px] font-normal text-[#444]"><span className="font-semibold text-[#111]">Period:</span> {PLANFIT_OVERVIEW.period}</div>
          </div>
          <p className="text-[15px] font-normal text-[#444] leading-[1.7]">{PLANFIT_OVERVIEW.summary}</p>
        </div>

        <div className="h-px bg-black/5 mb-16" />

        {/* Case studies */}
        <div className="mb-8 animate-fade-in">
          <h2 className="text-[12px] font-semibold text-[#999] uppercase tracking-[0.14em] mb-12">
            Case Studies
          </h2>
          <div className="space-y-24 max-sm:space-y-16">
            {PLANFIT_PROJECTS.map((project, i) => (
              <ProjectBlock key={project.slug} project={project} index={i} onReadMore={() => {
                setModalOpen(true);
                trackCaseStudyClick(project.slug);
              }} />
            ))}
          </div>
        </div>
      </div>
      {modalOpen && <PasswordModal onClose={() => setModalOpen(false)} />}
    </div>
  );
}
