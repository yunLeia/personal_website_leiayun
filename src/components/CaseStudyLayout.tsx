import { Outlet, useLocation } from 'react-router-dom';
import Outline from './Outline';
import PaperGrain from './PaperGrain';
import ContactSection from './ContactSection';

export default function CaseStudyLayout() {
  const { pathname } = useLocation();
  return (
    <div className="portfolio-page case-study-page">
      <PaperGrain />
      <Outline key={pathname} />
      <main className="case-study-main">
        <Outlet />
        <ContactSection />
      </main>
    </div>
  );
}
