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
    lede: 'An hour of manual account research, turned into a one-minute account health report.',
    problem: (
      <div className="work-stack">
        <p>Account managers spent about an hour per account pulling data from eight scattered sources, so much of their book went unreviewed.</p>
        <p>By shadowing teammates 1:1, I found a deeper issue: <Hi>there was no shared framework for what a healthy account looked like.</Hi> Different teams — even senior and junior CSMs — checked different signals.</p>
      </div>
    ),
    did: (
      <>
        <p>I worked with C&amp;S team leads, Industry Ops, and Data Analysis to define a shared diagnostic framework for each vertical, covering metrics like budget utilization, CPA against target, and product adoption. I then built a <B>Python and SQL service</B> that integrates all eight sources and generates a complete account health report from a single client ID.</p>
        <p>In V2, I added an <B>LLM decision-support layer</B> that detects meaningful changes, explains what matters, and turns each diagnosis into a specific next action.</p>
      </>
    ),
    metrics: [
      { value: '< 1 min', label: 'Per report, from ~60 min' },
      { value: '170+', label: 'Runs per day' },
      { value: '8', label: 'Data sources integrated' },
    ],
    takeaway: (
      <div className="work-stack">
        <p>Report preparation dropped from ~60 minutes to under 1 minute, and usage grew to 170+ runs per day. Teammates began <B>building their own schedulers</B> on top of the tool to cover their full account books.</p>
        <p>CSMs used its recommendations in client conversations and brought its summary tables directly into client meetings. The diagnostic framework later expanded from App to Gaming and Lead Gen, covering every vertical on the Contents &amp; Services team.</p>
      </div>
    ),
    figure: {
      src: '/images/tiktok-diagnostic-tool.webp',
      alt: 'Internal automation workspace listing the Hygiene Report Generator alongside other team automations',
      caption: 'The report generator and the automations built on it',
    },
  },
  {
    id: 'creative-audit',
    num: '02',
    title: 'Creative Audit Agent Workflow',
    lede: 'Thousands of ad creatives per account, audited by a staged agent workflow instead of by hand.',
    problem: <>A single enterprise account could hold 3,000+ ad creatives, making manual review of concept, format, hook, CTA, and best-practice adherence impossible to scale. There was also no rubric for <B>what strong creative looked like in the Korean market, so even faster review lacked a consistent standard</B>.</>,
    did: (
      <>
        <p>I secured APAC benchmark data and best-practice examples from Industry Ops, then worked with CSMs and CPs to turn what applied to Korea into <B>a shared review rubric</B>.</p>
        <p>A single prompt wasn’t enough for a task this complex, so I broke the process into <Hi>a staged workflow using internal AI agents and a browser MCP tool</Hi>: open each creative, evaluate it against the rubric, return structured JSON, aggregate patterns at the account level, and generate client-ready recommendations.</p>
      </>
    ),
    takeaway: <>The workflow audited 3,000+ creatives per account and produced reports for 20+ enterprise clients across 3 Sales teams. After a prototype demo and rounds of feedback with Sales, those reports were delivered to clients and <B>used in their Quarterly Business Reviews</B>.</>,
    metrics: [
      { value: '3,000+', label: 'Creatives audited per account' },
      { value: '20+', label: 'Enterprise clients' },
      { value: '3', label: 'Sales teams' },
    ],
    tools: ['Agentic Workflow', 'MCP', 'Prompt Chaining', 'Structured Outputs', 'Ad Analytics'],
  },
  {
    id: 'ai-enablement',
    num: '03',
    title: 'AI Implementation Guide & Workshops',
    lede: 'Instead of building every automation myself, helping non-technical teams build their own.',
    problem: <>ByteDance had 100+ internal AI tools, updated so quickly that no one had organized them, so most people didn’t know what existed or which tool fit which situation. Underneath that, <B>people new to AI couldn’t tell which parts of their own work could be automated</B>, so even good tools went unused.</>,
    did: (
      <p>With a collaborator from TikTok Japan, I wrote an internal AI implementation guide built around real workflows I had shipped. I organized it around <Hi>the real workflows teams actually went through, rather than around what each AI tool could do</Hi>, with ready-to-use prompts, demo workflows, and a method for spotting which tasks were worth automating. I then ran sessions and workshops for 100+ employees.</p>
    ),
    takeaway: <>Two of my sessions ranked #1 and #2 in that year’s KR Masterclass series. The signal I cared about more came afterward: people from teams I had never worked with messaged me asking not “Can you build this for us?” but <B>“How can I build something like this myself?”</B></>,
    metrics: [
      { value: '100+', label: 'Employees trained' },
      { value: '#1, #2', label: 'KR Masterclass sessions' },
    ],
    tools: ['Technical Enablement', 'Workshop Facilitation', 'Prompt Workflows'],
  },
  {
    id: 'weekly-alerts',
    num: '04',
    title: 'Weekly Key Change Alerts',
    lede: 'From alerts people ignored to alerts that point to the cause.',
    problem: <>Each CSM managed 70+ accounts, so attention went to the biggest advertisers and smaller shifts that signaled revenue opportunities or coming drops went unnoticed. I focused on <B>the accounts in between</B>: the largest were already checked daily, and the smallest weren’t worth the time.</>,
    did: (
      <p>V1 scanned a large dataset for sudden drops, growth, and meaningful metric changes, and sent them to Sales as a weekly alert. Then I saw that the alerts were read and ignored, because knowing something changed didn’t tell anyone where to look or what to do. So V2 used a <B>rule-based drill-down from client to account, campaign, and ad group</B> to pinpoint where each change came from, and went only to <B>opted-in subscribers who could act on it</B>.</p>
    ),
    impactLabel: 'What I learned',
    takeaway: <>Automating detection does not automatically create value. A useful alert tells <Hi>the right person what changed, why it matters, and what to do next — and ultimately leads to business value.</Hi> The question that mattered was never how much I could detect, but whether anyone would act.</>,
  },
];

export default function TikTokDetail() {
  return (
    <div className="case-study-content">
      <ProjectIntro
        name={tiktok.company}
        eyebrow="Experience"
        summary={tiktok.subtitle ?? ''}
        facts={[{ label: 'Role', value: <>{tiktok.role} | <em>Internal Automation</em></> }, { label: 'Team', value: 'Global Business Solutions (GBS) · Contents & Services' }, { label: 'Period', value: tiktok.date }]}
        links={tiktok.url ? [{ label: 'Company site', href: tiktok.url }] : []}
      />
      <WorkQuestions items={WORK.map((w, i) => ({ id: w.id, num: w.num, title: w.title, question: QUESTIONS[i], content: <WorkItem {...w} /> }))} />
    </div>
  );
}
