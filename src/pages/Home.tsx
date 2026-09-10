import { useState, useCallback, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Header from '../components/Header';
import ExperienceSection from '../components/ExperienceSection';
import ProjectsSection from '../components/ProjectsSection';
import ContactSection from '../components/ContactSection';
import DetailPanel, { type PanelChat } from '../components/DetailPanel';
import Dock from '../components/Dock';
import PaperGrain from '../components/PaperGrain';

export default function Home() {
  const location = useLocation();
  const [chat, setChat] = useState<PanelChat | null>(null);
  const [greetingOpen, setGreetingOpen] = useState(false);

  useEffect(() => {
    const state = location.state as { openGreeting?: boolean } | null;
    if (state?.openGreeting) {
      setGreetingOpen(true);
      window.history.replaceState({}, '');
    }
  }, [location.state]);

  const openChat = useCallback(
    (incoming: PanelChat) => {
      setGreetingOpen(false);
      const key = `${incoming.title}-${incoming.subtitle}`;
      const currentKey = chat ? `${chat.title}-${chat.subtitle}` : null;
      setChat(key === currentKey ? null : incoming);
    },
    [chat],
  );

  const closeChat = useCallback(() => setChat(null), []);

  const toggleGreeting = useCallback(() => {
    setChat(null);
    setGreetingOpen((v) => !v);
  }, []);

  const activeKey = chat ? `${chat.title}-${chat.subtitle}` : null;

  return (
    <div className="min-h-screen bg-[#f7f6f2] px-8 sm:px-12 max-sm:px-5 pt-14 max-sm:pt-10 pb-12 max-sm:pb-24 relative">
      <PaperGrain />
      <div className="max-w-[820px] mx-auto relative z-10">
        <Header />
        <main>
          <ExperienceSection onSelect={openChat} activeKey={activeKey} />
          <ProjectsSection onSelect={openChat} activeKey={activeKey} />
          <ContactSection />
        </main>
      </div>
      <Dock onAvatarClick={toggleGreeting} avatarActive={greetingOpen || chat !== null} />
      <DetailPanel chat={chat} onClose={closeChat} greetingOpen={greetingOpen} onCloseGreeting={() => setGreetingOpen(false)} />
    </div>
  );
}
