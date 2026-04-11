import { useState, useCallback } from 'react';
import Header from '../components/Header';
import Highlights from '../components/Highlights';
import ExperienceSection from '../components/ExperienceSection';
import ProjectsSection from '../components/ProjectsSection';
import ContactSection from '../components/ContactSection';
import DetailPanel, { type PanelChat } from '../components/DetailPanel';

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
    <div className="min-h-screen px-6 sm:px-12 lg:px-24 pt-14 pb-12 max-sm:pb-24">
      <div className="max-w-[680px] mx-auto">
        <Header />
        <main className="mt-10">
          <Highlights />
          <ExperienceSection onSelect={openChat} activeKey={activeKey} />
          <ProjectsSection onSelect={openChat} activeKey={activeKey} />
          <ContactSection />
        </main>
      </div>
      <DetailPanel chat={chat} onClose={closeChat} />
    </div>
  );
}
