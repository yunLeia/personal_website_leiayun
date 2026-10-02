import { PLANFIT_OVERVIEW, PLANFIT_PROJECTS } from './planfitData';
import ProjectIntro from '../components/ProjectIntro';
import WorkItem from '../components/WorkItem';

const CAPTIONS: Record<string, string> = {
  'community-club': 'Challenge League screens and engagement after launch',
  'onboarding-paywall': 'Onboarding and paywall variants across segments',
  'ai-stretching': 'V2 stretching recommendation flow',
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
      {PLANFIT_PROJECTS.map((p) => (
        <WorkItem
          key={p.slug}
          id={p.slug}
          num={p.num}
          title={p.title}
          lede={`${p.heroTagline[0]} ${p.heroTagline[1]}`}
          figure={p.image ? { src: p.image, alt: p.title, caption: CAPTIONS[p.slug] } : undefined}
          problem={p.problemBody}
          bet={p.thinking.find((step) => step.label === 'Hypothesis')?.text}
          did={p.execution.map((step) => <><strong>{step.label}.</strong> {step.text}</>)}
          metrics={p.impact}
          takeaway={p.impactTakeaway}
          tools={p.tools}
        />
      ))}
    </div>
  );
}
