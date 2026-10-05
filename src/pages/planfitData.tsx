import { type ReactNode } from 'react';
import { B, Hi } from '../components/InlineMarks';

// ─── Types ──────────────────────────────────────────────────────

interface ThinkingStep { label: string; text: ReactNode }
interface ExecStep { label: string; text: ReactNode }

export interface PlanfitProject {
  num: string;
  slug: string;
  title: string;
  subtitle: string;
  goal: string;
  image?: string | string[];
  problemBody: ReactNode;
  thinking: ThinkingStep[];
  execution: ExecStep[];
  didBody?: ReactNode;
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
    slug: 'ai-stretching',
    title: 'Stretching Recommendation',
    subtitle: 'Recommendation logic, experiment design, and activation',
    goal: 'Activation',
    image: ['/images/planfit-ai-stretching-1.webp', '/images/planfit-ai-stretching-2.webp'],
    problemBody: (
      <>
        Stretching feedback looked fragmented: users said routines were too short, hard to follow, or that they wanted to add, remove, and reorder exercises. I initially thought the answer was more customization. But after digging deeper through VOC and user interviews, I found a shared root cause: <B>the routines ignored physical flow.</B> A sequence could jump from standing → sitting → standing → lying, making individually relevant stretches frustrating to follow as a routine.
      </>
    ),
    thinking: [],
    execution: [],
    didBody: (
      <p>
        Instead of adding controls for users to fix the routine themselves, I redesigned the recommendation to make it better by default. I <B>classified stretches by posture, added a transition cost between positions</B>, and combined that with existing personalization signals like workout history, body area, and injury context. The pipeline became <Hi>candidate filtering → weighted scoring → sequence optimization</Hi>, so recommendations were both relevant to the user and natural to follow. I translated the discovery into production implementation — from user interviews and PRD to database/schema design, backend recommendation logic, React Native integration, and A/B testing.
      </p>
    ),
    impactTakeaway: (
      <div className="work-stack">
        <p>The new recommendation <B>increased activation by 12%</B>, with more users not only starting a workout but completing the full routine.</p>
        <p>More unexpectedly, it also <B>increased free-trial starts by 7%</B> in A/B testing. Since most trials previously came from the onboarding paywall, this suggested a new conversion path: users could decide to subscribe after experiencing the quality of the recommendation itself.</p>
      </div>
    ),
    tools: ['Product Discovery', 'User Interviews', 'PRD', 'Recommendation System', 'Database & Schema Design', 'Activation Strategy', 'Weighted Scoring', 'REST APIs'],
  },
  {
    num: '02',
    slug: 'community-club',
    title: 'Public Clubs & Leaderboard',
    subtitle: 'Community mechanics, engagement, and iteration',
    goal: 'Engagement + Retention',
    image: ['/images/planfit-community-club-1.webp', '/images/planfit-community-club-2.webp'],
    problemBody: (
      <>
        Planfit already had Clubs — small private groups where friends could share workouts and react to each other’s posts — but adoption remained low. Through user interviews and behavioral data, I found the core constraint: <B>the social experience depended too heavily on existing friendships.</B> Joining required inviting friends, and when one person stopped working out, the group often faded with them — limiting Clubs’ ability to support Planfit’s goal of helping users build consistent workout habits.
      </>
    ),
    thinking: [],
    execution: [],
    didBody: (
      <p>
        I reframed the question from “How do we improve Clubs?” to “What kind of social motivation helps people keep working out?” Based on competitive research and a hypothesis around shared goals, progress, and light competition, I <Hi>redesigned Clubs as discoverable communities and introduced activity-based leaderboards and overtake notifications</Hi>. I <B>owned the feature end to end</B> — from product definition and UX through React Native/Django implementation, instrumentation, and iteration.
      </p>
    ),
    impactTakeaway: <>The redesign led to <B>340+ user-created clubs and increased club engagement by 14%</B>. Leaderboard and notification experiments also improved re-engagement, while participants showed stronger workout-goal completion and retention — evidence that the feature was influencing not just social activity, but workout consistency.</>,
    tools: ['Full Stack', 'React Native', 'Django', 'SQL / Relational DB', 'Concurrency', 'Notifications System', 'Ranking Logic', 'Amplitude', 'A/B Testing', 'Figma', 'Competitive Research'],
  },
  {
    num: '03',
    slug: 'onboarding-paywall',
    title: 'Onboarding & Paywall',
    subtitle: 'Conversion experiments across activation and subscription',
    goal: 'Subscription',
    image: '/images/planfit-onboarding-paywall-fig.webp',
    problemBody: (
      <>
        Trial CVR sat at ~15%. Users completed onboarding but didn't convert. Funnel analysis on Amplitude revealed drop-offs weren't random: <B>they clustered around moments where users were asked to trust the product before it had earned that trust</B>. Copy wasn't localized. The paywall wasn't personalized. And every experiment required a full dev cycle to ship.
      </>
    ),
    thinking: [
      { label: 'Observation', text: <>Drop-offs varied by platform, country, and traffic source, each segment breaking the funnel in a different spot.</> },
      { label: 'Diagnosis', text: <>Users didn't feel seen by the time they reached the paywall. Generic copy and a one-size-fits-all experience couldn't convert a diverse, global user base.</> },
      { label: 'Hypothesis', text: <>If we <B>personalize by segment</B> and experiment fast enough, conversion will move. And if the loop runs itself, we can test continuously without slowing the team down.</> },
    ],
    execution: [
      { label: 'Funnel Mapping', text: <>Mapped every drop-off via Amplitude by platform, country, and traffic source. Found where trust broke down.</> },
      { label: '30+ A/B Experiments', text: <>Designed and directly coded variants (copy, UI/UX, flow) grounded in loss aversion, personalization expectations, and commitment devices.</> },
      { label: 'Automated Testing Engine', text: <>Built at the Planfit hackathon: <Hi>GPT generates localized copy → Django REST deploys it in real time → Amplitude detects significance → auto-applies the winner</Hi>, orchestrated with n8n. Scaled to 150+ copy experiments with no manual intervention.</> },
      { label: 'Segmented Execution', text: <>Each segment (country, platform, traffic source) got its own variant. Nothing was generic.</> },
    ],
    impactTakeaway: <><B>Conversion moved when users felt the product was built for them.</B> Automation meant the next experiment started the moment the last one ended.</>,
    tools: ['A/B Testing', 'Funnel Analysis', 'Reference Research', 'GPT API', 'n8n', 'Django'],
  },
  {
    num: '04',
    slug: 'voc-pipeline',
    title: 'VOC Pipeline',
    subtitle: 'From fragmented feedback to product decisions',
    goal: 'Product Decisions',
    problemBody: (
      <>
        Customer feedback came in from multiple sources and was too fragmented to turn into product decisions. <B>Recurring issues were hard to see, and nothing connected them to what got built next.</B>
      </>
    ),
    thinking: [],
    execution: [
      { label: 'Ingestion', text: <><Hi>Engineered a multi-source ingestion pipeline</Hi> for 2,500+ VOC items.</> },
      { label: 'Classification', text: <>Built an LLM classifier with JSON schema validation to categorize each item.</> },
      { label: 'Aggregation', text: <>Implemented deduplication and SQL aggregation queries to surface recurring issues.</> },
      { label: 'Ship', text: <>Turned the findings into fixes shipped across 8+ sprints.</> },
    ],
    impactTakeaway: <>Recurring issues surfaced from <B>2,500+ feedback items</B> became fixes shipped across 8+ sprints.</>,
    tools: ['VOC Analysis', 'LLM Classifier', 'Data Pipeline', 'JSON Schema', 'SQL'],
  },
];
