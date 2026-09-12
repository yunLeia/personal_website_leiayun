import { useState, useCallback } from 'react';
import MedalShelf from '../components/MedalShelf';
import Header from '../components/Header';
import ExperienceSection from '../components/ExperienceSection';
import ProjectsSection from '../components/ProjectsSection';
import ContactSection from '../components/ContactSection';
import DetailPanel, { type PanelChat } from '../components/DetailPanel';
import Dock from '../components/Dock';
import PaperGrain from '../components/PaperGrain';

export default function Home() {
  const [chat, setChat] = useState<PanelChat | null>(null);
  const openChat = useCallback(
    (incoming: PanelChat) => {
      const key = `${incoming.title}-${incoming.subtitle}`;
      const currentKey = chat ? `${chat.title}-${chat.subtitle}` : null;
      setChat(key === currentKey ? null : incoming);
    },
    [chat],
  );

  const closeChat = useCallback(() => setChat(null), []);

  const activeKey = chat ? `${chat.title}-${chat.subtitle}` : null;

  return (
    <div className="portfolio-page">
      <PaperGrain />
      <div className="portfolio-shell">
        <Header />
        <main>
          <ExperienceSection onSelect={openChat} activeKey={activeKey} />
          <ProjectsSection onSelect={openChat} activeKey={activeKey} />
          <MedalShelf />
          <ContactSection />
        </main>
      </div>
      <Dock />
      {chat && <DetailPanel chat={chat} onClose={closeChat} greetingOpen={false} onCloseGreeting={closeChat} />}
    </div>
  );
}
