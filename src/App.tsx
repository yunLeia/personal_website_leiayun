import { useState, useCallback } from 'react';
import Header from './components/layout/Header';
import ExperiencePreview from './components/home/ExperiencePreview';
import ProjectsPreview from './components/home/ProjectsPreview';
import Skills from './components/sections/Skills';
import DetailPanel from './components/home/DetailPanel';
import type { ExperienceItem, ProjectRow } from './types';

type PanelState = {
  item: ExperienceItem | ProjectRow | null;
  type: 'experience' | 'project' | null;
};

function App() {
  const [panel, setPanel] = useState<PanelState>({ item: null, type: null });

  const openExperience = useCallback((item: ExperienceItem) => {
    setPanel({ item, type: 'experience' });
  }, []);

  const openProject = useCallback((item: ProjectRow) => {
    setPanel({ item, type: 'project' });
  }, []);

  const close = useCallback(() => {
    setPanel({ item: null, type: null });
  }, []);

  return (
    <div className="min-h-screen px-8 sm:px-16 lg:px-24 pt-12 pb-8">
      <div className="max-w-[720px] mx-auto">
        <Header />
        <main className="mt-16 max-sm:mt-10">
          <ExperiencePreview onSelect={openExperience} />
          <ProjectsPreview onSelect={openProject} />
          <Skills />
        </main>
      </div>
      <DetailPanel item={panel.item} type={panel.type} onClose={close} />
    </div>
  );
}

export default App;
