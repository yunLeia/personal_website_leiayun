import { useState, useCallback } from 'react';
import Header from '../components/Header';
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
    <div className="min-h-screen px-6 sm:px-10 pt-14 pb-12 max-sm:pb-24 relative overflow-hidden">
      {/* Background blobs */}
      <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute -top-[5%] -right-[5%] w-[350px] h-[350px] rounded-full bg-[rgba(100,140,180,0.1)] blur-[100px]" />
        <div className="absolute bottom-[10%] -left-[5%] w-[280px] h-[280px] rounded-full bg-[rgba(120,155,190,0.08)] blur-[90px]" />
        <div className="absolute top-[40%] left-[35%] w-[200px] h-[200px] rounded-full bg-[rgba(140,170,200,0.06)] blur-[70px]" />
      </div>

      <div className="max-w-[1080px] mx-auto">
        <Header />
        <main className="mt-10">
          <ExperienceSection onSelect={openChat} activeKey={activeKey} />
          <ProjectsSection onSelect={openChat} activeKey={activeKey} />
          <ContactSection />
        </main>
      </div>
      <DetailPanel chat={chat} onClose={closeChat} />
    </div>
  );
}
