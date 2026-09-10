import { useNavigate } from 'react-router-dom';
import { PROJECTS } from '../data';
import type { PanelChat } from './DetailPanel';
import { SectionHeader } from './HomeUI';

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
      className="group w-full text-left font-[inherit] py-4 border-t border-black/[0.08] first:border-t-0 cursor-pointer flex max-sm:flex-col items-start gap-4"
    >
      <div className="w-12 h-12 rounded-lg overflow-hidden shrink-0 bg-black/[0.04]">
        {proj.cover && (
          <img
            src={proj.cover}
            alt={proj.name}
            loading="lazy"
            decoding="async"
            className="w-full h-full object-cover object-top"
          />
        )}
      </div>
      <div className="w-[170px] max-sm:w-full shrink-0">
        <div className="text-[14px] font-semibold text-[#1a1a1a] transition-opacity duration-150 group-hover:opacity-60">
          {proj.name}
        </div>
        {proj.tags && <div className="text-[12px] text-[#999] mt-0.5">{proj.tags[0]}</div>}
      </div>
      <div className="text-[13px] text-[#666] leading-[1.6] flex-1">{proj.sub}</div>
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
      <SectionHeader num="02" title="Projects" />

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
