import ProjectIntro from '../components/ProjectIntro';
import { WorkSection } from '../components/WorkItem';

export default function ShipShapeDetail() {
  return (
    <div className="case-study-content">
      <ProjectIntro
        name="ShipShape"
        facts={[
          { label: 'Category', value: 'Builder Community' },
          { label: 'Format', value: '1:1 product feedback' },
          { label: 'Audience', value: 'Early-stage builders' },
        ]}
        links={[{ label: 'Visit site', href: 'https://shipshapeworks.com/', primary: true }]}
        preview={
          <figure className="case-cover">
            <div className="shipshape-preview">
              <div className="shipshape-preview-brand">
                <img src="/images/shipshape-logo-dark.svg" alt="" width="56" height="56" />
                <span>ShipShape</span>
              </div>
              <p>Shape it before you ship it.</p>
            </div>
          </figure>
        }
      />
      <WorkSection id="coming-soon" num="01" title="Coming soon">
        {null}
      </WorkSection>
    </div>
  );
}
