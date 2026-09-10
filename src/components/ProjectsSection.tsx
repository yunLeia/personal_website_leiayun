import { useNavigate } from 'react-router-dom';
import { PROJECTS } from '../data';
import type { PanelChat } from './DetailPanel';

interface Props {
  onSelect: (chat: PanelChat) => void;
  activeKey: string | null;
}

function ProjectRow({
  proj,
  onClick,
}: {
  proj: (typeof PROJECTS)[number];
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className="group w-full text-left font-[inherit] py-5 border-t border-black/[0.08] first:border-t-0 cursor-pointer flex items-start gap-4"
    >
      {proj.cover && (
        <div className="w-14 h-14 rounded-lg overflow-hidden shrink-0 bg-black/[0.04]">
          <img
            src={proj.cover}
            alt={proj.name}
            loading="lazy"
            decoding="async"
            className="w-full h-full object-cover object-top"
          />
        </div>
      )}
      <div className="flex-1 min-w-0">
        <div className="text-[15px] font-semibold text-[#1a1a1a] tracking-tight transition-opacity duration-150 group-hover:opacity-60">
          {proj.name}
        </div>
        <div className="text-[13px] font-normal text-[#666] mt-1.5 leading-[1.6] max-w-[440px]">
          {proj.sub}
        </div>
        {proj.tags && (
          <div className="text-[12px] text-[#999] mt-2">
            {proj.tags.join(' · ')}
          </div>
        )}
      </div>
    </button>
  );
}

export default function ProjectsSection({ onSelect }: Props) {
  const navigate = useNavigate();

  function handleClick(proj: (typeof PROJECTS)[number]) {
    if (proj.detailPath) {
      navigate(proj.detailPath);
    } else {
      onSelect({
        messages: proj.chat,
        title: proj.name,
        subtitle: 'project details',
      });
    }
  }

  return (
    <section id="projects" className="py-8 scroll-mt-20">
      <h2 className="text-[11px] font-semibold text-[#999] uppercase tracking-[0.14em] mb-2">
        Projects
      </h2>

      <div className="flex flex-col">
        {PROJECTS.map((proj) => (
          <ProjectRow
            key={proj.name}
            proj={proj}
            onClick={() => handleClick(proj)}
          />
        ))}
      </div>
    </section>
  );
}
