import { EXPERIENCE } from '../data';
import ProjectIntro from '../components/ProjectIntro';
import WorkItem, { type WorkItemData } from '../components/WorkItem';
import { B, Hi } from '../components/InlineMarks';

const tiktok = EXPERIENCE.find((experience) => experience.company === 'TikTok')!;

const WORK: WorkItemData[] = [
  {
    id: 'diagnostic-tool',
    num: '01',
    title: 'Marketing Diagnostic Tool',
    lede: 'An hour of manual queries, turned into a one-minute account health report.',
    problem: [
      <>To check an account’s health, Sales ran <B>15+ queries by hand</B> across separate datasets.</>,
      <>Each report took <B>about an hour</B>, and Apps, Gaming, and Leads accounts each need different checks.</>,
    ],
    did: [
      <>Built an end-to-end diagnostic tool: enter an ad lever (Apps, Gaming, or Leads) and an account ID, get a full hygiene report.</>,
      <>Integrated <B>8+ datasets</B> through Python/SQL ETL pipelines, covering revenue, budget utilization, signal quality, attribution, and creative volume.</>,
      <>Matched each lever to its own report profile, so every account type gets only the sections that apply to it.</>,
      <>Generated a doc with charts, a summary table, and <B>LLM-written suggested actions</B>, sent to the requester automatically.</>,
      <>Extended it into scheduled automations: a <B>Monday workflow</B> that finds newly spending apps and accounts and routes their reports to each department’s group chat, and a <B>weekly revenue monitor</B> that sends role-specific alerts to client partners and CSMs.</>,
    ],
    metrics: [
      { value: '1 min', label: 'Per report, from 60 min' },
      { value: '15+', label: 'Manual queries replaced' },
      { value: '8+', label: 'Datasets integrated' },
      { value: 'Daily', label: 'Team use' },
    ],
    takeaway: <>Reporting went <Hi color="blue">from 60 minutes to 1</Hi>, which made daily use by the team possible.</>,
    figure: {
      src: '/images/tiktok-diagnostic-tool.webp',
      alt: 'Internal automation workspace listing the Hygiene Report Generator alongside other team automations',
      caption: 'The report generator and the automations built on it',
    },
    tools: ['Python', 'SQL', 'ETL Pipelines', 'LLM Analysis', 'Automation'],
  },
  {
    id: 'creative-audit',
    num: '02',
    title: 'Ad Creative Audit Workflow',
    lede: 'Creative recommendations for every gaming account, without anyone watching thousands of videos.',
    problem: [
      <>Gaming sales and account managers needed <B>consistent, advisory creative recommendations</B> for their clients.</>,
      <>Enterprise accounts run <B>3,000+ ad creatives</B> each, far too many to review video by video.</>,
    ],
    did: [
      <>Engineered a multi-stage agentic workflow with <B>MCP tool calls, prompt chaining, structured JSON outputs, and retry logic</B>.</>,
      <>Step one labels every creative against <B>8 best-practice criteria</B>, such as a brand logo in the first 3 seconds or a CTA with both text and sound, plus concept clusters that emerge from the set.</>,
      <><Hi color="yellow">Audited against validated best practices instead of re-running statistical analysis</Hi>, since each criterion is already tied to a measured performance lift.</>,
      <>Step two turns the labels into a <B>Creative Growth Report</B>: what’s winning, what risk is emerging, and what to produce next.</>,
      <>Improved acceptance rate through <B>human-in-the-loop review</B>. Using it needs no video review or coding: attach a CSV, run the prompt, get the report.</>,
    ],
    metrics: [
      { value: '3,000+', label: 'Creatives per account' },
      { value: '20+', label: 'Enterprise clients' },
      { value: '8', label: 'Best-practice criteria' },
    ],
    tools: ['Agentic Workflow', 'MCP', 'Prompt Chaining', 'Structured Outputs', 'Ad Analytics'],
  },
  {
    id: 'ai-enablement',
    num: '03',
    title: 'AI Playbook & Workshops',
    lede: 'Helping client partners spend less time on manual work and more on clients.',
    problem: 'Client partners spent much of their week on manual reporting and analysis, while new internal AI tools like Aime, iDA, and Magibook weren’t yet part of how the team worked.',
    did: [
      <>Co-authored an <B>AI playbook</B> documenting prompt workflows, tool integrations, and prototype demos.</>,
      <>Led the <B>AI Essentials</B> workshop series, from Aime to iDA and Magibook automation, for <B>100+ employees</B>.</>,
      <>Shared the playbook cross-functionally with <B>TikTok Japan</B>.</>,
      <>The sessions <Hi color="blue">ranked #1 and #2</Hi> among the year’s internal Masterclasses.</>,
    ],
    metrics: [
      { value: 'Top 2', label: 'Masterclass ranking, org-wide' },
      { value: '170+', label: 'Daily adoption' },
      { value: '100+', label: 'Employees trained' },
    ],
    takeaway: <>“As a CP, we can spend more time focusing on clients rather than doing manual work.” <span className="text-[#888]">— Workshop participant</span></>,
    tools: ['Technical Enablement', 'Workshop Facilitation', 'Prompt Workflows'],
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
