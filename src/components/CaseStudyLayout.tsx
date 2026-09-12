import { Outlet, useLocation } from 'react-router-dom';
import { PROJECTS } from '../data';
import Outline from './Outline';
import PaperGrain from './PaperGrain';
import ContactSection from './ContactSection';

export default function CaseStudyLayout() {
  const { pathname } = useLocation();
  const project = PROJECTS.find((item) => item.detailPath === pathname);
  return (
    <div className="portfolio-page case-study-page">
      <PaperGrain />
      <Outline key={pathname} />
      <main className="case-study-main">
        {project?.cover && <figure className="case-cover portfolio-enter">
          <img src={project.cover} alt={`${project.name} project cover`} width="720" height="450" />
          <figcaption><span>{project.name}</span><span>Selected project</span></figcaption>
        </figure>}
        <Outlet />
        <ContactSection />
      </main>
    </div>
  );
}
