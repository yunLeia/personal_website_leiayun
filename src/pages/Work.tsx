import { useState, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { WORK_PROJECTS, type WorkProject } from '../data';
import DetailPanel, { type PanelChat } from '../components/DetailPanel';
import PasswordModal from '../components/PasswordModal';

function ProjectBlock({ project, index, onChat, onReadMore }: {
  project: WorkProject;
  index: number;
  onChat: () => void;
  onReadMore: () => void;
}) {
  const reversed = index % 2 !== 0;

  return (
    <div className={`flex flex-col ${reversed ? 'md:flex-row-reverse' : 'md:flex-row'} items-center gap-10 md:gap-14`}>
      {/* Image placeholder */}
      <div className="flex-1 w-full">
        <div
          className="w-full aspect-[16/10] rounded-2xl bg-[#f5f5f7] flex items-center justify-center cursor-pointer transition-all duration-200 hover:bg-[#e8e8ed]"
          onClick={onChat}
        >
          <span className="text-[#d2d2d7] text-[13px]">screenshot</span>
        </div>
      </div>

      {/* Text */}
      <div className="flex-1">
        <p className="text-[13px] text-[#86868b]">
          {project.company.toLowerCase()} · {project.year}
        </p>
        <h3 className="mt-2 text-[24px] font-semibold text-[#1d1d1f] tracking-tight">
          {project.title.toLowerCase()}
        </h3>
        <p className="mt-3 text-[15px] text-[#86868b] leading-[1.65]">{project.description}</p>
        <div className="mt-5 flex gap-3">
          <button
            onClick={onChat}
            className="text-[14px] font-medium px-5 py-2 rounded-full border border-[#d2d2d7] text-[#1d1d1f] cursor-pointer transition-all duration-200 hover:bg-[#f5f5f7] active:scale-[0.97]"
          >
            chat about this
          </button>
          {project.hasCase && (
            <button
              onClick={onReadMore}
              className="text-[14px] font-medium px-5 py-2 rounded-full bg-[#1d1d1f] text-white cursor-pointer transition-all duration-200 hover:bg-[#424245] active:scale-[0.97]"
            >
              read more
            </button>
          )}
          {!project.hasCase && (
            <span className="text-[14px] text-[#d2d2d7] font-medium self-center">
              case study coming soon
            </span>
          )}
        </div>
      </div>
    </div>
  );
}

export default function Work() {
  const [modalOpen, setModalOpen] = useState(false);
  const [chat, setChat] = useState<PanelChat | null>(null);

  const openChat = useCallback((project: WorkProject) => {
    setChat((prev) => {
      const key = `${project.title}-${project.company}`;
      const prevKey = prev ? `${prev.title}-${prev.subtitle}` : null;
      if (key === prevKey) return null;
      return {
        messages: project.chat,
        title: project.title,
        subtitle: `${project.company.toLowerCase()} · ${project.year}`,
      };
    });
  }, []);

  const closeChat = useCallback(() => setChat(null), []);

  return (
    <div className="min-h-screen px-6 sm:px-12 lg:px-24 pt-14 pb-12">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between animate-fade-in">
          <Link to="/" className="text-[15px] text-[#86868b] no-underline transition-opacity duration-200 hover:opacity-60">
            ← back
          </Link>
        </div>

        <div className="mt-12 mb-16 animate-fade-in">
          <h1 className="text-[28px] font-semibold text-[#1d1d1f] tracking-tight">work</h1>
          <p className="text-[15px] text-[#86868b] mt-2">
            a closer look at some of the products and features i've shipped.
          </p>
        </div>

        <div className="space-y-24">
          {WORK_PROJECTS.map((project, i) => (
            <ProjectBlock
              key={project.title}
              project={project}
              index={i}
              onChat={() => openChat(project)}
              onReadMore={() => setModalOpen(true)}
            />
          ))}
        </div>
      </div>

      <DetailPanel chat={chat} onClose={closeChat} />
      {modalOpen && <PasswordModal onClose={() => setModalOpen(false)} />}
    </div>
  );
}
