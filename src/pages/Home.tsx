import { useState, useCallback, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Header from '../components/Header';
import ExperienceSection from '../components/ExperienceSection';
import ProjectsSection from '../components/ProjectsSection';
import ContactSection from '../components/ContactSection';
import DetailPanel, { type PanelChat } from '../components/DetailPanel';

export default function Home() {
  const location = useLocation();
  const [chat, setChat] = useState<PanelChat | null>(null);

  useEffect(() => {
    const state = location.state as { openGreeting?: boolean } | null;
    if (state?.openGreeting) {
      window.dispatchEvent(new CustomEvent('open-greeting'));
      window.history.replaceState({}, '');
    }
  }, [location.state]);

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
    <div className="min-h-screen px-8 sm:px-12 max-sm:px-5 pt-20 max-sm:pt-16 pb-12 max-sm:pb-24 relative overflow-hidden">
      <div className="max-w-[1080px] mx-auto">
        <Header />
        <main>
          <ExperienceSection onSelect={openChat} activeKey={activeKey} />
          <ProjectsSection onSelect={openChat} activeKey={activeKey} />
          <ContactSection />
        </main>
      </div>
      <DetailPanel chat={chat} onClose={closeChat} />
    </div>
  );
}
