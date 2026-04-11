import { useState, type ReactNode } from 'react';
import { Link } from 'react-router-dom';

// ─── Colors ──────────────────────────────────────────────────────

const c = {
  blueBg: '#eff6ff', blueText: '#1d4ed8',
  yellowBg: '#fffbeb', yellowText: '#b45309',
  greenBg: '#f0fdf4', greenText: '#15803d',
};

// ─── Data ────────────────────────────────────────────────────────

const OVERVIEW = {
  role: 'Product Owner Intern → Solver',
  team: 'Activation · Subscription',
  period: 'Mar – Dec 2025 · Seoul, KR',
  summary:
    'Planfit is an AI-powered fitness app serving 30,000+ daily active users across the US and Korea. As a Solver, I owned problems end-to-end — user research, PRD, design, development, QA, and post-launch analysis — without handing off to other functions.',
  skills: [
    'End-to-end product ownership', 'Cross-functional execution',
    'Experimentation', 'Vibe coding', 'AI-augmented workflow',
  ],
  tools: [
    'Amplitude', 'Linear', 'Figma', 'Django', 'React Native',
    'Claude Code', 'SuperClaude', 'Figma MCP', 'CodeRabbit', 'SQL', 'Serena',
  ],
};

interface ThinkingCard { label: string; phrases: string[] }
interface ExecStep { label: string; phrase: string }
interface ImpactMetric { value: string; label: string }

interface Project {
  num: string;
  title: string;
  tags: { label: string; color: 'blue' | 'yellow' | 'green' }[];
  heroStat: string;
  heroInsight: string;
  problemLines: ReactNode[];
  thinking: ThinkingCard[];
  execution: ExecStep[];
  impact: ImpactMetric[];
  impactTakeaway: string;
  tools: string[];
}

const PROJECTS: Project[] = [
  {
    num: '01',
    title: 'Community Club',
    tags: [
      { label: '0→1', color: 'yellow' },
      { label: 'Retention', color: 'blue' },
    ],
    heroStat: '+20% Engagement',
    heroInsight: "Users don't want community. They want competition.",
    problemLines: [
      <>Club feature existed — <B>nobody used it</B>.</>,
      <>Join rate: <B>4.1%</B>. Revisit within 3 days: <B>3.2%</B>.</>,
      <>VOC + 20 interviews → same friction: no value, no reason to return.</>,
    ],
    thinking: [
      { label: 'Observation', phrases: ['4.1% join rate', '3.2% revisit', 'Users saw it, didn\'t use it'] },
      { label: 'Diagnosis', phrases: ['Not a visibility problem', 'Feed ≠ motivation', 'Nothing to come back for'] },
      { label: 'Hypothesis', phrases: ['Competition > community', 'Auto-match by level', 'Surface rank post-workout'] },
    ],
    execution: [
      { label: 'Concept Shift', phrase: 'Social feed → Competition system' },
      { label: 'Challenge League', phrase: '122 signups vs. 27 — auto-matched by fitness level' },
      { label: 'Post-Workout Trigger', phrase: 'Rankings surfaced at highest-motivation moment' },
      { label: 'Build & Ship', phrase: 'End-to-end with Claude Code — no eng handoff' },
    ],
    impact: [
      { value: '+20%', label: 'Engagement' },
      { value: '+28%', label: 'US Tab' },
      { value: '+75%', label: 'Invite Rate' },
      { value: '2,000+', label: 'Clubs' },
    ],
    impactTakeaway: 'Timing and structure drove retention — not feature visibility.',
    tools: ['Claude Code', 'SuperClaude', 'Figma MCP', 'Django', 'React Native', 'Amplitude'],
  },
  {
    num: '02',
    title: 'Onboarding & Paywall',
    tags: [
      { label: 'Experimentation', color: 'blue' },
      { label: 'Revenue', color: 'yellow' },
    ],
    heroStat: '+7% Subscription CVR',
    heroInsight: "The bottleneck wasn't ideas. It was experiment velocity.",
    problemLines: [
      <>Trial CVR stuck at <B>~15%</B>.</>,
      <>Drop-offs clustered where users were asked to trust before trust was earned.</>,
      <>Copy not localized. Paywall not personalized. Every test = full dev cycle.</>,
    ],
    thinking: [
      { label: 'Observation', phrases: ['Drop-offs vary by segment', 'Platform × country × source', 'Not one break — many'] },
      { label: 'Diagnosis', phrases: ['Users don\'t feel seen', 'Generic copy ≠ trust', 'One-size paywall fails globally'] },
      { label: 'Hypothesis', phrases: ['Personalize by segment', 'Run experiments faster', 'Automate the loop'] },
    ],
    execution: [
      { label: 'Funnel Mapping', phrase: 'Amplitude → drop-offs by platform, country, source' },
      { label: '30+ Experiments', phrase: 'Copy, UI, flow — loss aversion, commitment devices' },
      { label: 'Auto Paywall Engine', phrase: 'GPT → Django → Amplitude → auto-apply winner' },
      { label: 'Segmented Deploy', phrase: 'Each segment gets the right variant' },
    ],
    impact: [
      { value: '+20%', label: 'CTA Rate' },
      { value: '+7%', label: 'Sub CVR' },
      { value: '30+', label: 'Experiments' },
      { value: 'Auto', label: 'Cycle' },
    ],
    impactTakeaway: 'Automation meant the next experiment started the moment the last one ended.',
    tools: ['GPT API', 'Django', 'Amplitude', 'Make.com', 'Claude Code', 'React Native', 'Figma'],
  },
  {
    num: '03',
    title: 'AI Stretching',
    tags: [
      { label: 'Activation', color: 'blue' },
      { label: 'VOC', color: 'yellow' },
    ],
    heroStat: '+13% Completion',
    heroInsight: 'The recommendation logic was broken. Not the feature.',
    problemLines: [
      <>Stretching completion low — <B>VOC kept coming</B>.</>,
      <>Users asked for order changes, timing, swaps — surface-level requests.</>,
      <>But the volume and pattern pointed deeper.</>,
    ],
    thinking: [
      { label: 'Observation', phrases: ['100+ VOC entries', '30+ interviews', 'Same friction every time'] },
      { label: 'Diagnosis', phrases: ['Requests ≠ real problem', 'Sequence logic broken', 'Position switching mid-routine'] },
      { label: 'Hypothesis', phrases: ['Fix sequence, not features', 'Map to muscles worked', 'Natural movement flow'] },
    ],
    execution: [
      { label: 'VOC Analysis', phrase: '100+ entries → friction clusters, prioritized by impact' },
      { label: 'V2 Rec Engine', phrase: 'Muscles worked × equipment × movement flow' },
      { label: 'Key Failure', phrase: 'Removed warmup → −9.8% completion. Rolled back.' },
      { label: 'Ship & Validate', phrase: '15+ A/B experiments across 30,000+ DAU' },
    ],
    impact: [
      { value: '+13%', label: 'Completion' },
      { value: '+12%', label: 'US Activation' },
      { value: '0', label: 'VOC in Sprint' },
      { value: '30K+', label: 'DAU' },
    ],
    impactTakeaway: 'One root-cause fix cleared the backlog and moved activation.',
    tools: ['Django', 'React Native', 'SQL', 'Amplitude', 'Claude Code', 'Figma'],
  },
];

// ─── Helpers ─────────────────────────────────────────────────────

function B({ children }: { children: ReactNode }) {
  return <strong className="font-semibold text-[#1d1d1f]">{children}</strong>;
}

function ToolPill({ children }: { children: string }) {
  return (
    <span className="text-[11px] text-[#6e6e73] font-medium bg-[#f5f5f7] border border-[#e8e8ed] rounded-sm px-2.5 py-1">
      {children}
    </span>
  );
}

function SectionLabel({ children, color }: { children: string; color?: string }) {
  return (
    <div className="flex items-center gap-3 mb-6">
      <h3 className="text-[11px] font-bold uppercase tracking-[0.16em]" style={{ color: color || '#aeaeb2' }}>
        {children}
      </h3>
      <span className="flex-1 h-px bg-[#e8e8ed]" />
    </div>
  );
}

// ─── Project view ────────────────────────────────────────────────

function ProjectView({ project }: { project: Project }) {
  return (
    <div className="animate-fade-in">

      {/* ── HERO — dark, stat + one line ── */}
      <div className="bg-[#111] rounded-2xl px-8 py-12 sm:px-12 sm:py-16 mb-14 max-sm:px-6">
        <div className="flex gap-2 mb-6">
          {project.tags.map((t) => (
            <span key={t.label} className="text-[10px] font-semibold uppercase tracking-[0.08em] text-white/40 border border-white/10 rounded-sm px-2.5 py-1">
              {t.label}
            </span>
          ))}
        </div>
        <div
          className="text-[48px] sm:text-[64px] font-bold text-white leading-none tracking-tight mb-4"
          style={{ fontFamily: "'Lora', serif" }}
        >
          {project.heroStat}
        </div>
        <p className="text-[17px] sm:text-[19px] text-white/60 leading-[1.5] max-w-[480px]">
          {project.heroInsight}
        </p>
      </div>

      {/* ── PROBLEM — short lines ── */}
      <div className="mb-14">
        <SectionLabel>Problem</SectionLabel>
        <div className="flex flex-col gap-3">
          {project.problemLines.map((line, i) => (
            <p key={i} className="text-[16px] text-[#6e6e73] leading-[1.7]">{line}</p>
          ))}
        </div>
      </div>

      {/* ── THINKING — 3 cards, phrases only ── */}
      <div className="mb-14">
        <SectionLabel color={c.blueText}>Thinking</SectionLabel>
        <div className="grid grid-cols-3 max-sm:grid-cols-1 gap-1.5">
          {project.thinking.map((card) => (
            <div key={card.label} className="bg-[#f5f5f7] border border-[#e8e8ed] px-5 py-5">
              <div className="text-[11px] font-bold text-[#1d1d1f] uppercase tracking-[0.08em] mb-4">
                {card.label}
              </div>
              <div className="flex flex-col gap-2">
                {card.phrases.map((phrase, i) => (
                  <div key={i} className="text-[14px] text-[#6e6e73] leading-[1.5]">
                    {phrase}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── EXECUTION — short, keyword-driven ── */}
      <div className="mb-14">
        <SectionLabel color={c.yellowText}>Execution</SectionLabel>
        <div className="flex flex-col gap-0.5">
          {project.execution.map((step, i) => (
            <div key={i} className="flex items-baseline gap-4 px-5 py-3.5 bg-white border border-[#e8e8ed]">
              <span className="text-[12px] font-bold text-[#d2d2d7] shrink-0">
                {String(i + 1).padStart(2, '0')}
              </span>
              <span className="text-[14px] font-semibold text-[#1d1d1f] shrink-0">
                {step.label}
              </span>
              <span className="text-[14px] text-[#86868b]">
                {step.phrase}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* ── IMPACT — numbers biggest ── */}
      <div className="mb-14">
        <SectionLabel color={c.greenText}>Impact</SectionLabel>
        <div className="grid grid-cols-4 max-sm:grid-cols-2 gap-1.5 mb-5">
          {project.impact.map((m) => (
            <div key={m.label} className="bg-[#f5f5f7] border border-[#e8e8ed] px-5 py-6 text-center">
              <div
                className="text-[36px] sm:text-[44px] font-bold text-[#1d1d1f] leading-none mb-2"
                style={{ fontFamily: "'Lora', serif" }}
              >
                {m.value}
              </div>
              <div className="text-[11px] font-semibold text-[#aeaeb2] uppercase tracking-[0.06em]">
                {m.label}
              </div>
            </div>
          ))}
        </div>
        <p className="text-[15px] text-[#86868b] italic leading-[1.6]" style={{ fontFamily: "'Lora', serif" }}>
          {project.impactTakeaway}
        </p>
      </div>

      {/* ── SCREENSHOT PLACEHOLDER ── */}
      <div className="mb-14">
        <div className="w-full aspect-[16/9] rounded-xl bg-[#f5f5f7] border border-[#e8e8ed] flex items-center justify-center">
          <span className="text-[13px] text-[#d2d2d7]">screenshot placeholder</span>
        </div>
      </div>

      {/* ── TOOLS ── */}
      <div className="flex items-center gap-3 flex-wrap">
        <span className="text-[11px] font-bold text-[#aeaeb2] uppercase tracking-[0.1em] shrink-0">Tools</span>
        {project.tools.map((t) => <ToolPill key={t}>{t}</ToolPill>)}
      </div>
    </div>
  );
}

// ─── Page ────────────────────────────────────────────────────────

export default function PlanfitDetail() {
  const [active, setActive] = useState(0);

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-[800px] mx-auto px-8 max-sm:px-5 pt-14 pb-24">
        <Link to="/" className="text-[14px] font-medium text-[#86868b] no-underline transition-opacity duration-200 hover:opacity-60">
          ← back
        </Link>

        {/* Overview */}
        <div className="mt-12 mb-14 animate-fade-in">
          <h1 className="text-[32px] max-sm:text-[26px] font-bold tracking-tight text-[#1d1d1f] mb-6">
            Planfit
          </h1>
          <div className="flex flex-col gap-2 mb-6">
            <div className="text-[15px] text-[#6e6e73]"><span className="font-semibold text-[#1d1d1f]">Role:</span> {OVERVIEW.role}</div>
            <div className="text-[15px] text-[#6e6e73]"><span className="font-semibold text-[#1d1d1f]">Team:</span> {OVERVIEW.team}</div>
            <div className="text-[15px] text-[#6e6e73]"><span className="font-semibold text-[#1d1d1f]">Period:</span> {OVERVIEW.period}</div>
          </div>
          <p className="text-[16px] text-[#6e6e73] leading-[1.8] mb-6">{OVERVIEW.summary}</p>
          <div className="flex flex-wrap gap-2 mb-4">
            {OVERVIEW.skills.map((s) => <ToolPill key={s}>{s}</ToolPill>)}
          </div>
          <div className="flex flex-wrap gap-2">
            {OVERVIEW.tools.map((t) => <ToolPill key={t}>{t}</ToolPill>)}
          </div>
        </div>

        <div className="h-px bg-[#e8e8ed] mb-10" />

        {/* Tabs */}
        <div className="flex gap-2 mb-14 overflow-x-auto">
          {PROJECTS.map((p, i) => (
            <button
              key={p.title}
              onClick={() => setActive(i)}
              className={`shrink-0 text-[12px] font-semibold tracking-[0.02em] px-5 py-2.5 cursor-pointer transition-all duration-200 rounded-sm ${
                active === i
                  ? 'bg-[#1d1d1f] text-white border border-[#1d1d1f]'
                  : 'bg-white text-[#86868b] border border-[#d2d2d7] hover:bg-[#f5f5f7] hover:text-[#1d1d1f]'
              }`}
            >
              {p.num} {p.title}
            </button>
          ))}
        </div>

        <ProjectView key={PROJECTS[active].title} project={PROJECTS[active]} />
      </div>
    </div>
  );
}
