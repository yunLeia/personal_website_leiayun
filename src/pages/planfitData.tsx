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
    'Owned product problems end to end — from discovery through design, engineering, launch, and iteration',
  note: ['AI fitness app · 4M+ users · 4.7★', 'App of the Day in 100+ countries'],
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
    title: 'Clubs & Leaderboard',
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
    title: 'Onboarding & Experiment System',
    subtitle: 'Conversion experiments across activation and subscription',
    goal: 'Subscription',
    image: ['/images/planfit-onboarding-paywall-fig.webp', '/images/planfit-onboarding-n8n.webp', '/images/planfit-onboarding-offer.webp'],
    problemBody: (
      <>
        Trial conversion had plateaued around 15%, with major drop-offs happening before users had experienced enough product value to trust the paywall. Early experiments showed another pattern: there was no single “best” onboarding message — different segments responded to different motivations. But <B>testing each new hypothesis still required a development cycle, making the team’s learning speed a bottleneck of its own.</B>
      </>
    ),
    thinking: [],
    execution: [],
    didBody: (
      <p>
        I first ran experiments across localized copy, CTAs, onboarding flow, and paywall messaging, using Amplitude funnels to understand how each segment responded. As the number of experiments grew, I <Hi>turned that repeated workflow into an automated multilingual experimentation system</Hi>: GPT generated localized variants, Django APIs handled targeting and assignment, Amplitude measured outcomes, and n8n orchestrated significance checks and winner rollout. Once we defined the right user segments, the system could <B>continuously generate and test new copy for each one</B> — allowing us to keep learning what worked without rebuilding every experiment from scratch.
      </p>
    ),
    impactTakeaway: <>The system <B>scaled experimentation to 150+ variants and improved CTA conversion by 20%</B>. It expanded beyond onboarding into paywall experiments and became more valuable as Planfit entered new markets, supporting localized testing across English, German, Spanish, and Japanese. What started as a way to improve one funnel became infrastructure for learning what messaging worked across segments and markets.</>,
    tools: ['Growth Experimentation', 'Funnel Analysis', 'Statistical Testing', 'GPT', 'n8n', 'Amplitude', 'Automation'],
  },
  {
    num: '04',
    slug: 'voc-pipeline',
    title: 'VOC Pipeline',
    subtitle: 'From fragmented feedback to product decisions',
    goal: 'Product Decisions',
    problemBody: (
      <>
        I handled customer support every morning, reading emails, reviews, bug reports, and feature requests firsthand, and kept seeing the same complaints resurface. VOC was already stored in a database and reviewed regularly, but as volume grew, searching individual messages wasn’t enough: <B>I couldn’t show how common an issue was, whether it was getting worse, or how it compared with other issues competing for the next sprint.</B>
      </>
    ),
    thinking: [],
    execution: [],
    didBody: (
      <>
        <p>
          I built a pipeline that turned raw feedback into structured product evidence. <Hi>n8n collected and normalized VOC from each source; semantic retrieval matched new feedback with similar historical issues, and GPT assigned consistent labels</Hi> for issue, product area, type, and urgency. I aggregated frequency and trends across <B>2,500+ VOC items</B>, then surfaced them in a Notion dashboard with representative customer feedback so anyone on the team could understand the signal without querying the data.
        </p>
        <p>
          I also created a <B>biweekly VOC review</B> where I walked Product, Design, and Engineering leads through the dashboard and we prioritized which customer problems should enter upcoming sprints.
        </p>
      </>
    ),
    impactTakeaway: <>Those decisions led to <B>fixes shipped across 8+ sprints</B>, and the review became an ongoing team process — turning VOC from a passive archive into a recurring input for product prioritization and planning.</>,
    tools: ['VOC Analysis', 'n8n', 'Semantic Retrieval', 'LLM Classification', 'Notion Dashboard', 'Prioritization'],
  },
];
