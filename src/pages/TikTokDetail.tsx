import { EXPERIENCE } from '../data';
import ProjectIntro from '../components/ProjectIntro';
import WorkItem, { type WorkItemData } from '../components/WorkItem';
import { B, Hi } from '../components/InlineMarks';

const tiktok = EXPERIENCE.find((experience) => experience.company === 'TikTok')!;

const WORK: WorkItemData[] = [
  {
    id: 'diagnostic-tool',
    num: '01',
    title: 'Internal Marketing Diagnostic Tool',
    lede: 'An hour of manual queries, turned into a one-minute report.',
    problem: [
      <>Checking an account’s marketing hygiene meant running <B>15+ queries</B> by hand.</>,
      <>Each check took <B>about an hour</B>, so the team couldn’t run it routinely.</>,
    ],
    did: [
      <>Built the Korea team’s <B>first internal marketing diagnostic tool</B>.</>,
      <>Integrated <B>8 datasets</B> into a single Python service.</>,
      <>Generated account-level hygiene reports automatically, <Hi color="blue">in 1 minute instead of 1 hour</Hi>.</>,
    ],
    metrics: [
      { value: '1 min', label: 'Per report, from ~1 hour' },
      { value: '8', label: 'Datasets integrated' },
      { value: 'Daily', label: 'Team use' },
    ],
    figure: {
      src: '/images/tiktok-diagnostic-tool.webp',
      alt: 'Internal automation workspace listing the Hygiene Report Generator alongside other team automations',
      caption: 'Hygiene Report Generator in the team’s automation workspace',
    },
    tools: ['Python', 'Data Pipelines', 'Automation', 'Internal Tooling'],
  },
  {
    id: 'creative-audit',
    num: '02',
    title: 'Ad Creative Audit Pipeline',
    lede: 'Thousands of creatives per account, audited against best practices.',
    problem: [
      <>Enterprise accounts run <B>3,000+ ad creatives</B> each.</>,
      'Reviewing them against best practices by hand doesn’t scale.',
    ],
    did: [
      'Designed a multi-stage LLM pipeline to label every creative in an account.',
      <><Hi color="yellow">Decomposed the analysis into focused prompts</Hi> instead of one large prompt.</>,
      <>Turned the audit into optimization recommendations for <B>20+ enterprise clients</B>.</>,
    ],
    metrics: [
      { value: '3,000+', label: 'Creatives per account' },
      { value: '20+', label: 'Enterprise clients' },
    ],
    tools: ['LLM Pipelines', 'Prompt Engineering', 'Ad Analytics'],
  },
  {
    id: 'ai-learning-series',
    num: '03',
    title: 'AI Learning Series & Internal Guide',
    lede: 'Helping the wider team actually use AI in their daily work.',
    problem: 'Teams wanted to use AI at work but had no shared set of use cases or prompts to start from.',
    did: [
      <>Created an all-in-one internal AI guide of use cases and prompts, adopted by <B>100+ employees</B>.</>,
      <>Led a two-session AI Learning Series that <Hi color="blue">ranked 1st and 2nd</Hi> among the org’s internal Masterclasses that year.</>,
    ],
    metrics: [
      { value: '100+', label: 'Employees using the guide' },
      { value: 'Top 2', label: 'Masterclass ranking, org-wide' },
      { value: '4.95', label: 'Avg feedback (of 5)' },
    ],
    tools: ['Technical Enablement', 'Workshop Facilitation', 'Content Design'],
  },
];

export default function TikTokDetail() {
  return (
    <div className="case-study-content">
      <ProjectIntro
        name={tiktok.company}
        eyebrow="Experience"
        summary={tiktok.subtitle ?? ''}
        facts={[{ label: 'Role', value: tiktok.role }, { label: 'Period', value: tiktok.date }]}
        links={tiktok.url ? [{ label: 'Company site', href: tiktok.url }] : []}
      />
      {WORK.map((item) => <WorkItem key={item.id} {...item} />)}
    </div>
  );
}
