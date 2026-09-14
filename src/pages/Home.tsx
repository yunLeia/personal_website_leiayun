import MedalShelf from '../components/MedalShelf';
import Header from '../components/Header';
import ExperienceSection from '../components/ExperienceSection';
import ProjectsSection from '../components/ProjectsSection';
import ContactSection from '../components/ContactSection';
import Dock from '../components/Dock';
import PaperGrain from '../components/PaperGrain';

export default function Home() {
  return (
    <div className="portfolio-page">
      <PaperGrain />
      <div className="portfolio-shell">
        <Header />
        <main>
          <ExperienceSection />
          <ProjectsSection />
          <MedalShelf />
          <ContactSection />
        </main>
      </div>
      <Dock />
    </div>
  );
}
