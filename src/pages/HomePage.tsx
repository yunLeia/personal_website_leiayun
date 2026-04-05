import ExperiencePreview from '../components/home/ExperiencePreview';
import ProjectsPreview from '../components/home/ProjectsPreview';
import Skills from '../components/sections/Skills';
import Contact from '../components/sections/Contact';

export default function HomePage() {
  return (
    <>
      <ExperiencePreview />
      <ProjectsPreview />
      <Skills />
      <Contact />
    </>
  );
}
