import ProjectIntro from '../components/ProjectIntro';
import { WorkSection, WorkProse, WorkList } from '../components/WorkItem';
import { B, Hi } from '../components/InlineMarks';

export default function GatherollDetail() {
  return (
    <div className="case-study-content">
      <ProjectIntro
        name="GatheRoll"
        summary="Everyone’s photos from one event, in one shared album. Scan a QR, bulk-add your photos, and GatheRoll handles the rest."
        role="Product Engineer"
        context="Independent project · 2026"
        links={[{ label: 'GitHub', href: 'https://github.com/yunLeia/gatheroll' }]}
      />

      <WorkSection id="problem" num="01" title="The Problem" lede="Sharing photos is easy. Getting everyone to actually do it isn’t.">
        <WorkProse>
          <p>After an event, photos stay scattered across everyone’s camera rolls. Existing tools work, but sharing still requires people to <B>remember, select, check, and send</B> their photos.</p>
        </WorkProse>
      </WorkSection>

      <WorkSection id="insight" num="02" title="Key Insight" lede="Reviewing the whole batch before sharing was the expensive part.">
        <WorkProse>
          <p>Today, someone selects 80 photos, reviews all 80, then shares. With GatheRoll, they select 80 and let the system check them: <Hi color="blue">62 go straight to the album</Hi> and only 18 need a look.</p>
          <p>I accepted bulk selection as V1 friction and focused on <B>removing the review burden</B>.</p>
        </WorkProse>
      </WorkSection>

      <WorkSection id="decisions" num="03" title="Product Decisions" lede="Every decision traded one failure mode for a cheaper one.">
        <WorkProse>
          <WorkList items={[
            <><B>No approval flows.</B> I originally designed private events with host approval, then replaced them with unlisted links and optional event codes to reduce coordination.</>,
            <><B>Keep the web.</B> Automatic camera-roll discovery would require native access, so I stayed web-first and <Hi color="yellow">accepted bulk selection instead of overbuilding</Hi>.</>,
            <><B>Review exceptions, not everything.</B> High-confidence photos go straight to the album. Only uncertain ones need attention.</>,
          ]} />
        </WorkProse>
      </WorkSection>

      <WorkSection id="flow" num="04" title="Product Flow" lede="From QR scan to a shared album.">
        <WorkProse>
          <p><B>Create event → Share QR → Bulk select → Automatic check → Shared album.</B></p>
          <p>Processing <Hi color="blue">never blocks the experience</Hi>. Users return to the album immediately and keep browsing while their photos are checked.</p>
        </WorkProse>
      </WorkSection>

      <WorkSection id="built" num="05" title="Built End-to-End" lede="Product, engineering, and AI, end to end.">
        <WorkProse>
          <WorkList items={[
            <><B>Product:</B> problem framing, PRDs, prioritization, and UX.</>,
            <><B>Engineering:</B> Next.js, FastAPI, Postgres, R2, and CI.</>,
            <><B>AI:</B> photo screening, review routing, and an evaluation harness.</>,
          ]} />
        </WorkProse>
      </WorkSection>
    </div>
  );
}
