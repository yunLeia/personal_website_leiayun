import { type ReactNode } from 'react';

// ─── Colors ──────────────────────────────────────────────────────

const c = {
  blueBg: '#eff6ff', blueText: '#1d4ed8',
  yellowBg: '#fffbeb', yellowText: '#b45309',
};

// ─── Helpers (used in JSX data) ─────────────────────────────────

function B({ children }: { children: ReactNode }) {
  return <strong className="font-semibold text-[#111]">{children}</strong>;
}

function Hi({ color, children }: { color: 'blue' | 'yellow'; children: ReactNode }) {
  const bg = color === 'blue' ? c.blueBg : c.yellowBg;
  const fg = color === 'blue' ? c.blueText : c.yellowText;
  return <mark style={{ background: bg, color: fg, padding: '2px 6px', fontWeight: 600, borderRadius: 3 }}>{children}</mark>;
}

// ─── Types ──────────────────────────────────────────────────────

interface ThinkingStep { label: string; text: ReactNode }
interface ExecStep { label: string; text: ReactNode }
interface ImpactMetric { value: string; label: string }

export interface PlanfitProject {
  num: string;
  slug: string;
  title: string;
  summary: string;
  image?: string;
  imageZoom?: number;
  heroTagline: [string, string];
  heroMetrics: string;
  problemHeadline: string;
  problemBody: ReactNode;
  thinkingHeadline: string;
  thinking: ThinkingStep[];
  executionHeadline: string;
  execution: ExecStep[];
  impactHeadline: string;
  impact: ImpactMetric[];
  impactTakeaway: ReactNode;
  tools: string[];
}

// ─── Overview ───────────────────────────────────────────────────

export const PLANFIT_OVERVIEW = {
  role: 'Product Owner Intern → Solver',
  team: 'Activation · Subscription',
  period: 'Mar – Dec 2025',
  summary:
    'Planfit is an AI-powered fitness app with 4M+ users worldwide. As a Solver, I owned problems end-to-end — user research, PRD, design, development, QA, and post-launch analysis — without handing off to other functions.',
};

// ─── Projects ───────────────────────────────────────────────────

export const PLANFIT_PROJECTS: PlanfitProject[] = [
  {
    num: '01',
    slug: 'community-club',
    title: 'Community Club',
    summary: 'Redesigned the club feature from a passive social feed into a competition-based system, lifting community engagement +20% and generating 2,000+ user-created clubs.',
    image: '/images/planfit-community-club.webp',
    imageZoom: 1.15,
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
    tools: ['0→1 Product', 'User Research', 'Problem Discovery', 'Figma MCP', 'Amplitude'],
  },
  {
    num: '02',
    slug: 'onboarding-paywall',
    title: 'Onboarding & Paywall',
    summary: 'Built an automated experimentation engine that runs 30+ A/B tests across segments, lifting CTA click rate +20% and subscription CVR +7% — with zero manual deploy cycles.',
    image: '/images/planfit-onboarding-paywall.webp',
    heroTagline: [
      "The bottleneck wasn't ideas.",
      'It was how fast we could test them.',
    ],
    heroMetrics: '+20% CTA · +7% Trial CVR',
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
    tools: ['A/B Testing', 'Funnel Analysis', 'Reference Research', 'GPT API', 'Make.com', 'Django'],
  },
  {
    num: '03',
    slug: 'ai-stretching',
    title: 'AI Stretching Recommendation',
    summary: 'Rewrote the stretching recommendation logic to account for muscle mapping and movement flow, lifting completion +13% and US activation +12% — clearing the entire VOC backlog.',
    image: '/images/planfit-ai-stretching.webp',
    imageZoom: 1.1,
    heroTagline: [
      "Users weren't complaining about stretching.",
      'They were telling me the logic was broken.',
    ],
    heroMetrics: '+13% Subscription · +12% US Activation',
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
    tools: ['VOC Analysis', 'User Interviews', 'Recommendation Logic', 'Django', 'React Native'],
  },
];
