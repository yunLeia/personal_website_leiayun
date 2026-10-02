import { type ReactNode } from 'react';
import { B, Hi } from '../components/InlineMarks';

// ─── Types ──────────────────────────────────────────────────────

interface ThinkingStep { label: string; text: ReactNode }
interface ExecStep { label: string; text: ReactNode }
interface ImpactMetric { value: string; label: string }

export interface PlanfitProject {
  num: string;
  slug: string;
  title: string;
  image?: string;
  heroTagline: [string, string];
  problemBody: ReactNode;
  thinking: ThinkingStep[];
  execution: ExecStep[];
  impact: ImpactMetric[];
  impactTakeaway: ReactNode;
  tools: string[];
}

// ─── Overview ───────────────────────────────────────────────────

export const PLANFIT_OVERVIEW = {
  role: 'Product Engineer Intern',
  team: 'Activation · Subscription',
  period: 'Mar – Dec 2025',
  summary:
    'Planfit is an AI-powered fitness app with 4M+ users worldwide. As a Builder, I owned problems end-to-end (user research, PRD, design, development, QA, and post-launch analysis) without handing off to other functions.',
};

// ─── Projects ───────────────────────────────────────────────────

export const PLANFIT_PROJECTS: PlanfitProject[] = [
  {
    num: '01',
    slug: 'community-club',
    title: 'Community Club',
    image: '/images/planfit-community-club-fig.webp',
    heroTagline: [
      "Users don't want community.",
      'They want a reason to come back.',
    ],
    problemBody: (
      <>
        Club feature existed: <B>4.1%</B> join rate, <B>3.2%</B> revisit within 3 days. VOC and 20+ user interviews pointed to the same friction: users didn't know which club to pick, didn't see the value, and felt the social feed was one more thing to maintain.
      </>
    ),
    thinking: [
      { label: 'Observation', text: <>Users saw it. They just didn't use it. Low join and revisit rates, backed by interviews and behavioral data.</> },
      { label: 'Diagnosis', text: <>A passive social feed gives users nothing to return for after a workout. The feature existed. The reason to care didn't.</> },
      { label: 'Hypothesis', text: <>Users don't want community. They want <B>competition</B>. Auto-match by fitness level. Surface rankings right after workouts. Give them a reason to care about their rank.</> },
    ],
    execution: [
      { label: 'Concept Shift', text: <>Social feed → competition-based system. Rewrote the product spec from scratch.</> },
      { label: 'Challenge League', text: <>Auto-matched users by fitness level. Tested immediately: <Hi color="blue">122 signups vs. 27</Hi> for regular clubs in the same window.</> },
      { label: 'Post-Workout Trigger', text: <>Surfaced rankings right after session completion, the highest-motivation moment.</> },
      { label: 'Build & Ship', text: <>Defined MVP scope and PRDs, then built the leaderboard end to end: UI/UX, relational schema, APIs, and event-driven notifications, with Claude Code, SuperClaude, and Figma MCP. No eng handoff.</> },
      { label: 'Iterate', text: <>Validated with <Hi color="blue">75+ A/B tests</Hi> against DAU/MAU and guardrail metrics.</> },
    ],
    impact: [
      { value: '+14%', label: 'Community engagement' },
      { value: '340+', label: 'Clubs created' },
      { value: '75+', label: 'A/B tests' },
    ],
    impactTakeaway: <>Users returned when given a clear competitive context. Timing and structure drove retention, not feature visibility.</>,
    tools: ['0→1 Product', 'User Research', 'Problem Discovery', 'Figma MCP', 'Amplitude'],
  },
  {
    num: '02',
    slug: 'onboarding-paywall',
    title: 'Onboarding & Paywall',
    image: '/images/planfit-onboarding-paywall-fig.webp',
    heroTagline: [
      "The bottleneck wasn't ideas.",
      'It was how fast we could test them.',
    ],
    problemBody: (
      <>
        Trial CVR sat at <B>~15%</B>. Users completed onboarding but didn't convert. Funnel analysis on Amplitude revealed drop-offs weren't random: they clustered around moments where users were asked to trust the product before it had earned that trust. Copy wasn't localized. The paywall wasn't personalized. And every experiment required a full dev cycle to ship.
      </>
    ),
    thinking: [
      { label: 'Observation', text: <>Drop-offs varied by platform, country, and traffic source, each segment breaking the funnel in a different spot.</> },
      { label: 'Diagnosis', text: <>Users didn't feel seen by the time they reached the paywall. Generic copy and a one-size-fits-all experience couldn't convert a diverse, global user base.</> },
      { label: 'Hypothesis', text: <>If we <B>personalize by segment</B> and experiment fast enough, conversion will move. And if the loop runs itself, we can test continuously without slowing the team down.</> },
    ],
    execution: [
      { label: 'Funnel Mapping', text: <>Mapped every drop-off via Amplitude by platform, country, and traffic source. Found where trust broke down.</> },
      { label: '30+ A/B Experiments', text: <>Designed and directly coded variants (copy, UI/UX, flow) grounded in <Hi color="blue">loss aversion, personalization expectations, and commitment devices</Hi>.</> },
      { label: 'Automated Testing Engine', text: <>Built at the Planfit hackathon: GPT generates localized copy → Django REST deploys it in real time → Amplitude detects significance → <Hi color="yellow">auto-applies the winner</Hi>, orchestrated with n8n. Scaled to <B>150+ copy experiments</B> with no manual intervention.</> },
      { label: 'Segmented Execution', text: <>Each segment (country, platform, traffic source) got its own variant. Nothing was generic.</> },
    ],
    impact: [
      { value: '+20%', label: 'CTA conversion' },
      { value: '+8%', label: 'Subscription conversion' },
      { value: '150+', label: 'Automated experiments' },
    ],
    impactTakeaway: <>Conversion moved when users felt the product was built for them. Automation meant the next experiment started the moment the last one ended.</>,
    tools: ['A/B Testing', 'Funnel Analysis', 'Reference Research', 'GPT API', 'n8n', 'Django'],
  },
  {
    num: '03',
    slug: 'ai-stretching',
    title: 'AI Stretching Recommendation',
    image: '/images/planfit-ai-stretching-fig.webp',
    heroTagline: [
      "Users weren't complaining about stretching.",
      'They were telling me the logic was broken.',
    ],
    problemBody: (
      <>
        Change the order. Swap this exercise. Adjust the timing. On the surface, it looked like a list of small feature requests. <B>100+ VOC entries. 30+ user interviews.</B> The same friction, over and over.
      </>
    ),
    thinking: [
      { label: 'Observation', text: <>Users kept asking to modify their stretching routine: wrong movements, no customization, no way to preview. High volume, consistent pattern.</> },
      { label: 'Diagnosis', text: <>The recommendation logic didn't account for physical flow. Users were constantly switching positions mid-routine, making the experience feel disjointed. They weren't asking for features. They were telling me something deeper was wrong.</> },
      { label: 'Hypothesis', text: <>Don't fix the surface complaints. <B>Fix the sequence logic.</B> If stretches map to muscles worked that day and follow natural movement flow, completion will increase on its own.</> },
    ],
    execution: [
      { label: 'VOC Analysis', text: <>Categorized 100+ entries and 30+ interview insights into friction clusters. Prioritized by impact: sequence logic first, customization second.</> },
      { label: 'V2 Recommendation Engine', text: <>Built candidate filtering and weighted scoring over <B>80M+ workout records</B>, mapping stretches to the muscles worked that day, equipment, and movement flow. Owned server logic, API integration, testing, and deployment.</> },
      { label: 'Key Failure', text: <>Removing cardio warmup <Hi color="yellow">dropped completion 9.8% at 98% significance</Hi>. Data revealed it acts as a psychological on-ramp: users needed a familiar entry point. Rolled back immediately.</> },
      { label: 'Ship & Validate', text: <>Shipped add/delete/reorder and video preview. Validated through 15+ A/B experiments across 30,000+ DAU.</> },
    ],
    impact: [
      { value: '+12%', label: 'Activation' },
      { value: '300K+', label: 'MAU served' },
      { value: '80M+', label: 'Workout records' },
    ],
    impactTakeaway: <>One root-cause fix cleared the VOC backlog, reduced onboarding drop-off, and moved activation and D7 retention. Going deeper than the surface request drove broader product impact than any individual feature fix would have.</>,
    tools: ['VOC Analysis', 'User Interviews', 'Recommendation Logic', 'Django', 'React Native'],
  },
];
