import ProjectIntro from '../components/ProjectIntro';
import { WorkSection, WorkProse, WorkFigure, WorkTools } from '../components/WorkItem';
import { B, Hi } from '../components/InlineMarks';

export default function IndigoDetail() {
  return (
    <div className="case-study-content">
      <ProjectIntro
        name="myIndigo"
        summary="Real-time audio awareness for deaf and hard-of-hearing users. Your phone listens, classifies sounds with Gemini 2.5 Flash, and sends actionable alerts to your Apple Watch: instructions, not transcriptions."
        facts={[
          { label: 'Role', value: 'Full-Stack + AI Engineer' },
          { label: 'Date', value: 'March 2026 · 36 hours' },
          { label: 'Context', value: 'NYC Build With AI Hackathon @ NYU Tandon' },
        ]}
        links={[
          { label: 'GitHub', href: 'https://github.com/yunLeia/indigo-ai-agent' },
          { label: 'Pitch deck', href: 'https://www.figma.com/deck/ebsg6XMvEQVfHLcYQmva4Z/myIndigo_Google?node-id=1-133&viewport=-124%2C-31%2C0.59&t=TTdyLd0Ns68gQfd3-1&scaling=min-zoom&content-scaling=fixed&page-id=0%3A1', primary: true },
        ]}
      />

      <WorkSection id="problem" num="01" title="The Problem" lede="Critical sounds go unheard, and that’s both a safety and an accessibility problem.">
        <WorkProse>
          <p>Alarms, announcements, doorbells, laughter: everyday sounds carry information most people take for granted. Missing them means <B>limited access to information</B>, <Hi color="yellow">constant safety uncertainty</Hi>, social disconnection, and a loss of control in everyday life.</p>
          <p>The primary users are <B>deaf and hard-of-hearing people</B>, for whom detection is both an accessibility and a safety need. Older adults are an extended audience: <B>about 1 in 3 people over 65</B> experience hearing loss and miss household alerts.</p>
        </WorkProse>
        <WorkFigure num="01" src="/images/indigo-problem.webp" alt="User quotes about missed alarms, announcements, and doorbells" caption="What we heard from users" />
      </WorkSection>

      <WorkSection id="solution" num="02" title="The Solution" lede="Turn sounds into grounded, actionable guidance.">
        <WorkProse>
          <p>myIndigo <B>listens</B> for sirens, doorbells, and announcements, <B>understands</B> the context by combining time, location, weather, and user state, and <B>acts</B> by alerting the phone and Apple Watch with what to do, like “Check surroundings and yield.”</p>
          <p>The alert is guidance, not a caption: <Hi color="blue">instructions, not transcriptions</Hi>.</p>
        </WorkProse>
        <WorkFigure num="02" src="/images/indigo-solution.webp" alt="Solution: Listen, Understand, Act" caption="Listen, understand, act" />
      </WorkSection>

      <WorkSection id="pipeline" num="03" title="Audio Pipeline" lede="Audio in, action out, end to end in real time.">
        <WorkProse>
          <p>PCM16 audio streams from the browser over WebSocket to a FastAPI backend. Gemini 2.5 Flash classifies each clip as <B>siren, speech, or ambient</B>, ADK agents interpret the structured output with task-specific reasoning, and the alert goes back over WebSocket to the phone and watch with <Hi color="blue">low latency</Hi>.</p>
        </WorkProse>
        <WorkFigure num="03" src="/images/indigo-pipeline.webp" alt="End-to-end audio pipeline" caption="End-to-end audio pipeline" />
        <WorkTools tools={['Gemini 2.5 Flash', 'WebSocket', 'FastAPI', 'Web Audio API']} />
      </WorkSection>

      <WorkSection id="system-design" num="04" title="System Design" lede="One model, multiple roles, orchestrated by agents.">
        <WorkProse>
          <p>One model plays three roles: audio classification, siren analysis (SirenAgent), and speech summarization (SummaryAgent). Every role returns <Hi color="blue">structured data, not raw text</Hi>, so the next step can act on it reliably.</p>
          <p>Google ADK routes each request to a <B>task-specific agent</B>, with stateless execution per session.</p>
        </WorkProse>
        <WorkFigure num="04" src="/images/indigo-gemini-roles.webp" alt="Gemini used in three roles" caption="Gemini 2.5 Flash across three roles" />
        <WorkTools tools={['Google ADK', 'LlmAgent', 'Python']} />
      </WorkSection>

      <WorkSection id="decisions" num="05" title="Key Decisions" lede="Ship fast, stay safe.">
        <WorkProse>
          <p><B>One model instead of several.</B> Using Gemini for everything reduced system complexity and let us ship quickly. A dedicated classifier would perform better at scale, but wasn’t worth the integration cost in a 36-hour build.</p>
          <p><B>Deterministic routing.</B> After classification, routing is plain if/else. <Hi color="yellow">Misrouting a siren is a safety failure, not a UX issue</Hi>, so predictability mattered more than flexibility.</p>
        </WorkProse>
      </WorkSection>
    </div>
  );
}
