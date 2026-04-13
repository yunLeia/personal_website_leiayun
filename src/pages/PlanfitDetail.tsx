import { useState, type ReactNode } from 'react';
import { Link } from 'react-router-dom';

// ─── Colors ──────────────────────────────────────────────────────

const c = {
  blueBg: '#eff6ff', blueText: '#1d4ed8',
  yellowBg: '#fffbeb', yellowText: '#b45309',
  greenBg: '#f0fdf4', greenText: '#15803d', greenBorder: '#bbf7d0',
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

interface ThinkingStep { label: string; text: ReactNode }
interface ExecStep { label: string; text: ReactNode }
interface ImpactMetric { value: string; label: string }

interface Project {
  num: string;
  title: string;
  // Hero
  heroTagline: [string, string];
  heroMetrics: string;
  // Problem
  problemHeadline: string;
  problemBody: ReactNode;
  // Thinking
  thinkingHeadline: string;
  thinking: ThinkingStep[];
  // Execution
  executionHeadline: string;
  execution: ExecStep[];
  // Impact
  impactHeadline: string;
  impact: ImpactMetric[];
  impactTakeaway: ReactNode;
  // Tools
  tools: string[];
}

const PROJECTS: Project[] = [
  {
    num: '01',
    title: 'Community Club',
    heroTagline: [
      "Users don't want community.",
      'They want a reason to come back.',
    ],
    heroMetrics: '+20% Engagement · 2,000+ Clubs',
    problemHeadline: 'Nobody used it.',
    problemBody: (
      <>
        Club feature existed — <B>4.1%</B> join rate, <B>3.2%</B> revisit within 3 days. VOC and 20+ user interviews pointed to the same friction: users didn't know which club to pick, didn't see the value, and felt the social feed was one more thing to maintain.
      </>
    ),
    thinkingHeadline: "The problem wasn't the feature. It was the concept.",
    thinking: [
      { label: 'Observation', text: <>Users saw it. They just didn't use it. Low join and revisit rates — backed by interviews and behavioral data.</> },
      { label: 'Diagnosis', text: <>A passive social feed gives users nothing to return for after a workout. The feature existed. The reason to care didn't.</> },
      { label: 'Hypothesis', text: <>Users don't want community. They want <B>competition</B>. Auto-match by fitness level. Surface rankings right after workouts. Give them a reason to care about their rank.</> },
    ],
    executionHeadline: 'So I rebuilt it around competition.',
    execution: [
      { label: 'Concept Shift', text: <>Social feed → competition-based system. Rewrote the product spec from scratch.</> },
      { label: 'Challenge League', text: <>Auto-matched users by fitness level. Tested immediately: <Hi color="blue">122 signups vs. 27</Hi> for regular clubs in the same window.</> },
      { label: 'Post-Workout Trigger', text: <>Surfaced rankings right after session completion — the highest-motivation moment.</> },
      { label: 'Build & Ship', text: <>Ranking engine, push notification loop, Django admin — built end-to-end with Claude Code, SuperClaude, Figma MCP. No eng handoff.</> },
    ],
    impactHeadline: 'And users came back.',
    impact: [
      { value: '+20%', label: 'Community engagement' },
      { value: '+28%', label: 'US tab engagement' },
      { value: '+75%', label: 'Friend invite rate' },
      { value: '2,000+', label: 'User-generated clubs' },
    ],
    impactTakeaway: <>Users returned when given a clear competitive context. Timing and structure drove retention — not feature visibility.</>,
    tools: ['Claude Code', 'SuperClaude', 'Figma MCP', 'Django', 'React Native', 'Amplitude', 'SQL'],
  },
  {
    num: '02',
    title: 'Onboarding & Paywall',
    heroTagline: [
      "The bottleneck wasn't ideas.",
      'It was how fast we could test them.',
    ],
    heroMetrics: '+20% CTA · +7% Subscription CVR',
    problemHeadline: 'Conversion was stuck.',
    problemBody: (
      <>
        Trial CVR sat at <B>~15%</B>. Users completed onboarding but didn't convert. Funnel analysis on Amplitude revealed drop-offs weren't random — they clustered around moments where users were asked to trust the product before it had earned that trust. Copy wasn't localized. The paywall wasn't personalized. And every experiment required a full dev cycle to ship.
      </>
    ),
    thinkingHeadline: "The problem wasn't the paywall. It was the speed.",
    thinking: [
      { label: 'Observation', text: <>Drop-offs varied by platform, country, and traffic source. The funnel wasn't broken in one place — it was broken differently for each segment.</> },
      { label: 'Diagnosis', text: <>Users didn't feel seen by the time they reached the paywall. Generic copy and a one-size-fits-all experience couldn't convert a diverse, global user base.</> },
      { label: 'Hypothesis', text: <>If we <B>personalize by segment</B> and experiment fast enough, conversion will move. And if the loop runs itself — we can test continuously without slowing the team down.</> },
    ],
    executionHeadline: 'So I built a machine that tests itself.',
    execution: [
      { label: 'Funnel Mapping', text: <>Mapped every drop-off via Amplitude by platform, country, and traffic source. Found where trust broke down.</> },
      { label: '30+ A/B Experiments', text: <>Designed and directly coded variants — copy, UI/UX, flow — grounded in <Hi color="blue">loss aversion, personalization expectations, and commitment devices</Hi>.</> },
      { label: 'Automated Paywall Engine', text: <>Built at Planfit Hackathon: GPT API generates localized copy → Django REST deploys in real-time → Amplitude detects significance → <Hi color="yellow">auto-applies the winner</Hi>. Zero manual cycles.</> },
      { label: 'Segmented Execution', text: <>Each segment — country, platform, traffic source — got its own variant. Nothing was generic.</> },
    ],
    impactHeadline: 'And the loop kept running.',
    impact: [
      { value: '+20%', label: 'CTA click rate' },
      { value: '+7%', label: 'Subscription CVR' },
      { value: '30+', label: 'Experiments shipped' },
      { value: '0', label: 'Manual deploy cycles' },
    ],
    impactTakeaway: <>Conversion moved when users felt the product was built for them. Automation meant the next experiment started the moment the last one ended.</>,
    tools: ['GPT API', 'Django', 'Amplitude', 'Make.com', 'Claude Code', 'React Native', 'Figma'],
  },
  {
    num: '03',
    title: 'AI Stretching',
    heroTagline: [
      "Users weren't complaining about stretching.",
      'They were telling me the logic was broken.',
    ],
    heroMetrics: '+13% Completion · +12% US Activation',
    problemHeadline: 'The requests kept coming in.',
    problemBody: (
      <>
        Change the order. Swap this exercise. Adjust the timing. On the surface, it looked like a list of small feature requests. <B>100+ VOC entries. 30+ user interviews.</B> The same friction, over and over.
      </>
    ),
    thinkingHeadline: "The problem wasn't the features. It was the sequence.",
    thinking: [
      { label: 'Observation', text: <>Users kept asking to modify their stretching routine — wrong movements, no customization, no way to preview. High volume, consistent pattern.</> },
      { label: 'Diagnosis', text: <>The recommendation logic didn't account for physical flow. Users were constantly switching positions mid-routine, making the experience feel disjointed. They weren't asking for features. They were telling me something deeper was wrong.</> },
      { label: 'Hypothesis', text: <>Don't fix the surface complaints. <B>Fix the sequence logic.</B> If stretches map to muscles worked that day and follow natural movement flow, completion will increase on its own.</> },
    ],
    executionHeadline: 'So I stopped fixing requests. I rewrote the logic.',
    execution: [
      { label: 'VOC Analysis', text: <>Categorized 100+ entries and 30+ interview insights into friction clusters. Prioritized by impact — sequence logic first, customization second.</> },
      { label: 'V2 Recommendation Engine', text: <>Built a system mapping stretches to muscles worked that day, accounting for equipment and movement flow. Full-stack — server logic, algorithm, UI/UX.</> },
      { label: 'Key Failure', text: <>Removing cardio warmup <Hi color="yellow">dropped completion 9.8% at 98% significance</Hi>. Data revealed it acts as a psychological on-ramp — users needed a familiar entry point. Rolled back immediately.</> },
      { label: 'Ship & Validate', text: <>Shipped add/delete/reorder and video preview. Validated through 15+ A/B experiments across 30,000+ DAU.</> },
    ],
    impactHeadline: 'And the complaints stopped.',
    impact: [
      { value: '+13%', label: 'Stretching completion' },
      { value: '+12%', label: 'US activation' },
      { value: '0', label: 'Stretching VOC in sprint' },
      { value: '30K+', label: 'DAU on rec system' },
    ],
    impactTakeaway: <>One root-cause fix cleared the VOC backlog and moved activation. Going deeper than the surface request drove broader product impact than any individual feature fix would have.</>,
    tools: ['Django', 'React Native', 'SQL', 'Amplitude', 'Claude Code', 'Figma'],
  },
];

// ─── Helpers ─────────────────────────────────────────────────────

function B({ children }: { children: ReactNode }) {
  return <strong className="font-semibold text-[#111]">{children}</strong>;
}

function Hi({ color, children }: { color: 'blue' | 'yellow'; children: ReactNode }) {
  const bg = color === 'blue' ? c.blueBg : c.yellowBg;
  const fg = color === 'blue' ? c.blueText : c.yellowText;
  return <mark style={{ background: bg, color: fg, padding: '2px 6px', fontWeight: 600, borderRadius: 3 }}>{children}</mark>;
}

function ToolPill({ children }: { children: string }) {
  return (
    <span className="text-[11px] text-[#666] font-normal bg-white/30 backdrop-blur-[8px] border border-white/50 rounded-sm px-2.5 py-1">
      {children}
    </span>
  );
}

// ─── Project view ────────────────────────────────────────────────

function ProjectView({ project }: { project: Project }) {
  return (
    <div className="animate-fade-in">

      {/* ── HERO ── */}
      <div className="mb-12">
        <p className="text-[36px] sm:text-[44px] font-light text-[#111] leading-[1.2] tracking-tight mb-12" style={{ fontFamily: "'Lora', serif" }}>
          <span className="italic">{project.heroTagline[0]}</span>
          <br />
          <span className="italic">{project.heroTagline[1]}</span>
        </p>
        <div className="text-[15px] font-medium text-[#888] tracking-tight">
          {project.heroMetrics}
        </div>
      </div>

      {/* ── PROBLEM ── */}
      <div className="mb-16">
        <h3 className="text-[26px] font-bold text-[#111] tracking-tight mb-7 leading-[1.25]">
          {project.problemHeadline}
        </h3>
        <p className="text-[15px] font-normal text-[#555] leading-[1.85] max-w-[640px]">
          {project.problemBody}
        </p>
      </div>

      {/* ── Divider ── */}
      <div className="h-px bg-black/5 mb-16" />

      {/* ── THINKING ── */}
      <div className="mb-16">
        <h3 className="text-[26px] font-bold text-[#111] tracking-tight mb-7 leading-[1.25]">
          {project.thinkingHeadline}
        </h3>
        <div className="grid grid-cols-3 max-sm:grid-cols-1 gap-4">
          {project.thinking.map((step) => (
            <div key={step.label} className="bg-white/30 backdrop-blur-[16px] border border-white/50 shadow-[0_2px_16px_rgba(0,0,0,0.06),inset_0_1px_0_rgba(255,255,255,0.5)] rounded-xl px-6 py-6">
              <div className="text-[11px] font-semibold text-[#bbb] uppercase tracking-[0.14em] mb-3">
                {step.label}
              </div>
              <p className="text-[15px] font-normal text-[#555] leading-[1.85]">
                {step.text}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* ── Divider ── */}
      <div className="h-px bg-black/5 mb-16" />

      {/* ── EXECUTION ── */}
      <div className="mb-16">
        <h3 className="text-[26px] font-bold text-[#111] tracking-tight mb-7 leading-[1.25]">
          {project.executionHeadline}
        </h3>
        <div className="grid grid-cols-2 max-sm:grid-cols-1 gap-4">
          {project.execution.map((step, i) => (
            <div key={i} className="bg-white/30 backdrop-blur-[16px] border border-white/50 shadow-[0_2px_16px_rgba(0,0,0,0.06),inset_0_1px_0_rgba(255,255,255,0.5)] rounded-xl px-6 py-6">
              <div className="flex items-baseline gap-3 mb-3">
                <span className="text-[13px] font-bold text-[#d2d2d7]">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <span className="text-[14px] font-semibold text-[#111]">
                  {step.label}
                </span>
              </div>
              <p className="text-[15px] font-normal text-[#555] leading-[1.85]">
                {step.text}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* ── Divider ── */}
      <div className="h-px bg-black/5 mb-16" />

      {/* ── IMPACT ── */}
      <div className="mb-16">
        <h3 className="text-[26px] font-bold text-[#111] tracking-tight mb-7 leading-[1.25]">
          {project.impactHeadline}
        </h3>
        <div className="grid grid-cols-4 max-sm:grid-cols-2 gap-4 mb-8">
          {project.impact.map((m) => (
            <div key={m.label} className="bg-white/30 backdrop-blur-[16px] border border-white/50 shadow-[0_2px_16px_rgba(0,0,0,0.06),inset_0_1px_0_rgba(255,255,255,0.5)] rounded-xl px-5 py-7 text-center">
              <div className="text-[40px] sm:text-[52px] font-semibold text-[#111] leading-none mb-3" style={{ fontFamily: "'Lora', serif" }}>
                {m.value}
              </div>
              <div className="text-[11px] font-medium text-[#888] uppercase tracking-[0.08em]">
                {m.label}
              </div>
            </div>
          ))}
        </div>
        <p className="text-[15px] font-normal text-[#555] italic leading-[1.8] max-w-[640px]" style={{ fontFamily: "'Lora', serif" }}>
          {project.impactTakeaway}
        </p>
      </div>

      {/* ── TOOLS ── */}
      <div className="bg-white/30 backdrop-blur-[16px] border border-white/50 shadow-[0_2px_16px_rgba(0,0,0,0.06),inset_0_1px_0_rgba(255,255,255,0.5)] rounded-xl px-6 py-5 flex items-center gap-3 flex-wrap">
        <span className="text-[11px] font-semibold text-[#bbb] uppercase tracking-[0.14em] shrink-0">Tools</span>
        {project.tools.map((t) => <ToolPill key={t}>{t}</ToolPill>)}
      </div>
    </div>
  );
}

// ─── Page ────────────────────────────────────────────────────────

export default function PlanfitDetail() {
  const [active, setActive] = useState(0);

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
            <div className="text-[15px] font-normal text-[#555]"><span className="font-semibold text-[#111]">Role:</span> {OVERVIEW.role}</div>
            <div className="text-[15px] font-normal text-[#555]"><span className="font-semibold text-[#111]">Team:</span> {OVERVIEW.team}</div>
            <div className="text-[15px] font-normal text-[#555]"><span className="font-semibold text-[#111]">Period:</span> {OVERVIEW.period}</div>
          </div>
          <p className="text-[15px] font-normal text-[#555] leading-[1.85] mb-6">{OVERVIEW.summary}</p>
          <div className="flex flex-wrap gap-2 mb-4">
            {OVERVIEW.skills.map((s) => <ToolPill key={s}>{s}</ToolPill>)}
          </div>
          <div className="flex flex-wrap gap-2">
            {OVERVIEW.tools.map((t) => <ToolPill key={t}>{t}</ToolPill>)}
          </div>
        </div>

        <div className="h-px bg-black/5 mb-10" />

        {/* Tabs */}
        <div className="flex gap-2 mb-14 overflow-x-auto">
          {PROJECTS.map((p, i) => (
            <button
              key={p.title}
              onClick={() => setActive(i)}
              className={`shrink-0 text-[13px] font-medium tracking-[0.02em] px-5 py-2.5 cursor-pointer transition-all duration-200 rounded-sm ${
                active === i
                  ? 'bg-[#1d1d1f] text-white border border-[#1d1d1f]'
                  : 'bg-white/30 backdrop-blur-[12px] text-[#86868b] border border-white/50 hover:bg-white/40 hover:text-[#1d1d1f]'
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
