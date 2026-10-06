import { PLANFIT_OVERVIEW, PLANFIT_PROJECTS } from './planfitData';
import ProjectIntro from '../components/ProjectIntro';
import WorkItem from '../components/WorkItem';
import WorkQuestions from '../components/WorkQuestions';
import { Hi } from '../components/InlineMarks';

const CAPTIONS: Record<string, string[]> = {
  'community-club': ['Challenge Club unlock and weekly ranking screens', 'Engagement results in Amplitude after launch'],
  'onboarding-paywall': ['Onboarding and paywall variants across segments', 'Workflow automation in n8n', 'One-time offer paywall'],
  'ai-stretching': ['Stretching routine redesign: before, after, and the edit flow', 'Experiment results in Amplitude'],
  'voc-pipeline': [],
};

export default function PlanfitDetail() {
  return (
    <div className="case-study-content">
      <ProjectIntro
        name="Planfit"
        eyebrow="Experience"
        summary={PLANFIT_OVERVIEW.summary}
        facts={[
          { label: 'Role', value: PLANFIT_OVERVIEW.role },
          { label: 'Team', value: PLANFIT_OVERVIEW.team },
          { label: 'Period', value: PLANFIT_OVERVIEW.period },
        ]}
        links={[{ label: 'Company site', href: 'https://planfit.ai/en' }]}
      />
      <WorkQuestions
        lead="I owned:"
        items={PLANFIT_PROJECTS.map((p) => ({
          id: p.slug,
          num: p.num,
          title: p.title,
          question: <>{p.title} for <Hi>{p.goal}</Hi></>,
          sublabel: p.subtitle,
          content: (
            <WorkItem
              id={p.slug}
              num={p.num}
              title={p.title}
              figure={p.image ? [p.image].flat().map((src, i) => ({ src, alt: `${p.title} ${i + 1}`, caption: CAPTIONS[p.slug][i] })) : undefined}
              problem={p.problemBody}
              bet={p.thinking.find((step) => step.label === 'Hypothesis')?.text}
              did={p.didBody ?? p.execution.map((step) => <><span className="text-[#111]">{step.label}.</span> {step.text}</>)}
              takeaway={p.impactTakeaway}
              tools={p.tools}
            />
          ),
        }))}
      />
    </div>
  );
}
