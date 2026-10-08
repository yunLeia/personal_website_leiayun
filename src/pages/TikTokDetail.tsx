import { EXPERIENCE } from '../data';
import ProjectIntro from '../components/ProjectIntro';
import WorkItem, { type WorkItemData } from '../components/WorkItem';
import { B, Hi } from '../components/InlineMarks';
import WorkQuestions from '../components/WorkQuestions';

const tiktok = EXPERIENCE.find((experience) => experience.company === 'TikTok')!;

const QUESTIONS = [
  <>What’s the <Hi>root problem</Hi> underneath the symptom?</>,
  <>How can I turn a prompt into a <Hi>scalable system</Hi>?</>,
  <>How do I communicate about AI with <Hi>nontechnical people</Hi>?</>,
  <>What makes <Hi>automation worth</Hi> more than just another alert?</>,
];

const WORK: WorkItemData[] = [
  {
    id: 'diagnostic-tool',
    num: '01',
    title: 'Account Health Diagnostic Tool',
    problem: <>Account managers spent about <B>1 hour per account</B> pulling data from eight scattered sources. By shadowing teammates 1:1, I found the deeper issue: <Hi>there was no shared framework for what a healthy account looked like.</Hi> Different teams — and even senior and junior CSMs — checked different signals.</>,
    did: (
      <p>I worked with C&amp;S leads, Industry Ops, and Data Analysis to define a shared diagnostic framework, then built a <B>Python and SQL service integrating 8 data sources</B> that generates a complete account health report from a single client ID. In V2, I added an <B>LLM decision-support layer</B> that detects meaningful changes and turns each diagnosis into a specific next action.</p>
    ),
    takeaway: <>Report preparation dropped from <B>about 1 hour to under 1 minute</B>, with usage reaching <B>170+ runs per day</B>. Teammates began building their own schedulers on top of the tool, and CSMs used its recommendations and summary tables directly in client conversations. The framework later expanded across App, Gaming, and Lead Gen.</>,
    figure: {
      src: '/images/tiktok-diagnostic-tool.webp',
      alt: 'Internal automation workspace listing the Hygiene Report Generator alongside other team automations',
      caption: 'The report generator and the automations built on it',
    },
    tools: ['Python', 'SQL', 'Data Integration', 'Business Logic', 'Visualization', 'LLM Analysis', 'Automation'],
  },
  {
    id: 'creative-audit',
    num: '02',
    title: 'Creative Audit Agent Workflow',
    problem: <>A single enterprise account could have <B>3,000+ ad creatives</B>, but reviewing them required account managers to manually watch, label, and analyze each video. That made creative audits too time-consuming to scale beyond a small number of priority clients. There was also no shared Korea-specific standard for evaluating creatives, making the analysis difficult to apply consistently.</>,
    did: (
      <p>I partnered with <B>APAC Industry Ops and Sales</B> to turn regional benchmarks into a <B>Korea-specific creative rubric</B>, then built a reusable AI skill using <B>browser MCP</B> to open, inspect, and label creatives. My first version handled data retrieval, video review, analysis, and reporting in one long agent run, but as the workflow grew, carrying too much context and intermediate state made it fragile. I redesigned it into <Hi>smaller modular skills with bounded responsibilities, explicit inputs, structured JSON outputs, and controlled handoffs</Hi> between stages. This <B>externalized the workflow state instead of relying on a single model context</B>, while the individual skills were orchestrated back into one simple end-to-end workflow for account managers.</p>
    ),
    takeaway: <>The workflow was used across <B>3 Sales teams</B>, with creative audit reports delivered directly to <B>20+ enterprise clients</B>. After launch, account managers continued using the published skills to prepare for Quarterly Business Reviews, <B>running the full workflow themselves with just a client account ID</B>.</>,
    tools: ['Agentic Workflow', 'MCP', 'Prompt Chaining', 'Context Window', 'State Management', 'Ad Analytics'],
  },
  {
    id: 'ai-enablement',
    num: '03',
    title: 'AI Implementation Guide & Workshops',
    problem: <>ByteDance had <B>100+ internal AI tools</B>, but many nontechnical GBS teams did not know which tools mattered to them or where AI could actually fit into their day-to-day work.</>,
    did: (
      <p>With a collaborator from TikTok Japan, I created an internal AI implementation guide with ready-to-use prompts, demo workflows, and a method for identifying tasks worth automating. <Hi>I organized it around real scenarios teams already understood, rather than around AI features or technical capabilities.</Hi> I then turned those workflows into sessions and workshops for <B>100+ employees</B>.</p>
    ),
    takeaway: <>Two sessions ranked <B>#1 and #2 in that year’s KR Masterclass series</B>. Afterward, people from teams I had never worked with began reaching out not to ask me to build something for them, but to ask how they could apply the same approach themselves.</>,
    tools: ['Technical Enablement', 'Workshop Facilitation', 'Prompt Workflows'],
  },
  {
    id: 'weekly-alerts',
    num: '04',
    title: 'Weekly Key Change Alerts',
    problem: <>Each CSM managed <B>70+ accounts</B>, so attention naturally went to the largest advertisers while meaningful shifts in the accounts in between often went unnoticed.</>,
    did: (
      <p>V1 scanned account data for sudden drops, growth, and meaningful metric changes, but many alerts were read and ignored. I rebuilt it with a <B>rule-based drill-down from client → account → campaign → ad group</B> to pinpoint where each change came from, and sent alerts only to opted-in CSMs who could act on them.</p>
    ),
    impactLabel: 'What I learned',
    tools: ['Alerting', 'Rule-based Logic', 'Drill-down Analysis', 'Revenue Monitoring', 'Automation'],
    takeaway: <>Automation only creates <Hi>real business value</Hi> when it leads to action that helps the client and, ultimately, drives business outcomes — not when it simply produces another alert. That changed the question I ask from “What can I automate?” to <B>“Will the time and insight it creates turn into business results?”</B></>,
  },
];

export default function TikTokDetail() {
  return (
    <div className="case-study-content">
      <ProjectIntro
        name={tiktok.company}
        eyebrow="Experience"
        summary={tiktok.subtitle ?? ''}
        facts={[{ label: 'Role', value: tiktok.role }, { label: 'Team', value: 'Global Business Solutions (GBS) · Contents & Services' }, { label: 'Period', value: tiktok.date }]}
        links={tiktok.url ? [{ label: 'Company site', href: tiktok.url }] : []}
      />
      <WorkQuestions items={WORK.map((w, i) => ({ id: w.id, num: w.num, title: w.title, question: QUESTIONS[i], content: <WorkItem {...w} /> }))} />
    </div>
  );
}
