import { useState, useEffect, useRef, type ReactNode } from 'react';
import { SITE, ABOUT } from '../../lib/constants';
import type { ExperienceItem, ProjectRow } from '../../types';

function parseBold(text: string): ReactNode[] {
  const parts = text.split(/(\*\*[^*]+\*\*)/g);
  return parts.map((part, i) =>
    part.startsWith('**') && part.endsWith('**')
      ? <span key={i} className="font-medium text-[#1d1d1f]">{part.slice(2, -2)}</span>
      : part,
  );
}

function TypingIndicator() {
  return (
    <div className="flex gap-1.5 px-4 py-3">
      <span className="w-2 h-2 bg-[#d2d2d7] rounded-full animate-bounce [animation-delay:0ms]" />
      <span className="w-2 h-2 bg-[#d2d2d7] rounded-full animate-bounce [animation-delay:150ms]" />
      <span className="w-2 h-2 bg-[#d2d2d7] rounded-full animate-bounce [animation-delay:300ms]" />
    </div>
  );
}

function ChatBubbles({ children, keyProp }: { children: ReactNode[]; keyProp: string }) {
  const [visibleCount, setVisibleCount] = useState(0);
  const [showTyping, setShowTyping] = useState(true);
  const total = children.length;
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setVisibleCount(0);
    setShowTyping(true);
  }, [keyProp]);

  useEffect(() => {
    if (visibleCount >= total) {
      setShowTyping(false);
      return;
    }
    const typingDelay = setTimeout(() => setShowTyping(true), 100);
    const bubbleDelay = setTimeout(() => {
      setVisibleCount(prev => prev + 1);
      setShowTyping(false);
    }, 600 + visibleCount * 100);
    return () => { clearTimeout(typingDelay); clearTimeout(bubbleDelay); };
  }, [visibleCount, total]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollIntoView({ behavior: 'smooth', block: 'end' });
    }
  }, [visibleCount, showTyping]);

  return (
    <div ref={scrollRef} className="flex flex-col gap-2.5">
      {children.slice(0, visibleCount).map((child, i) => (
        <div key={i} className="animate-[bubble-in_0.3s_ease-out]">
          {child}
        </div>
      ))}
      {showTyping && visibleCount < total && <TypingIndicator />}
    </div>
  );
}

function Bubble({ children, className = '' }: { children: ReactNode; className?: string }) {
  return (
    <div className={`bg-[#f5f5f7] rounded-2xl rounded-bl-md px-4 py-3 max-w-[88%] ${className}`}>
      {children}
    </div>
  );
}

function WannaKnowMoreWrapper({ count }: { count: number }) {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const delay = count * 700 + 800;
    const t = setTimeout(() => setShow(true), delay);
    return () => clearTimeout(t);
  }, [count]);
  if (!show) return null;
  return (
    <div className="animate-[bubble-in_0.3s_ease-out]">
      <WannaKnowMore />
    </div>
  );
}

function WannaKnowMore() {
  const [clicked, setClicked] = useState(false);
  return (
    <div className="flex flex-col gap-2.5">
      <Bubble className="max-w-[65%]">
        <div className="text-[14px] max-sm:text-[13px] text-[#86868b] leading-[1.6]">
          wanna know more?
        </div>
      </Bubble>
      {!clicked && (
        <div className="animate-[bubble-in_0.3s_ease-out]">
          <button
            onClick={() => setClicked(true)}
            className="bg-[#1d1d1f] text-white text-[14px] max-sm:text-[13px] font-medium px-5 py-2 rounded-full border-0 cursor-pointer transition-all duration-200 hover:bg-[#424245] active:scale-[0.97]"
          >
            yes
          </button>
        </div>
      )}
      {clicked && (
        <div className="animate-[bubble-in_0.3s_ease-out]">
          <Bubble>
            <div className="text-[14px] max-sm:text-[13px] text-[#86868b] leading-[1.6]">
              always happy to chat —{' '}
              <a
                href="mailto:sy3544@nyu.edu"
                className="text-[#1d1d1f] font-medium underline underline-offset-[3px] decoration-[#d2d2d7] hover:decoration-[#1d1d1f] transition-colors duration-200"
              >
                sy3544@nyu.edu
              </a>
            </div>
          </Bubble>
        </div>
      )}
    </div>
  );
}

function ExperienceDetail({ item }: { item: ExperienceItem }) {
  if (item.chat) {
    const bubbles: ReactNode[] = item.chat.map((text, i) => (
      <Bubble key={i}>
        <div className="text-[14px] max-sm:text-[13px] text-[#86868b] leading-[1.6]">
          {parseBold(text)}
        </div>
      </Bubble>
    ));
    return (
      <div className="flex flex-col gap-2.5">
        <ChatBubbles keyProp={item.company}>{bubbles}</ChatBubbles>
        <WannaKnowMoreWrapper count={bubbles.length} />
      </div>
    );
  }

  const bubbles: ReactNode[] = [];
  bubbles.push(
    <Bubble>
      <div className="text-[14px] max-sm:text-[13px] text-[#1d1d1f] leading-[1.6]">
        At <span className="font-semibold">{item.company}</span>, I worked as{' '}
        <span className="font-semibold">{item.role.toLowerCase()}</span>.
      </div>
      <div className="text-[13px] text-[#86868b] mt-1">{item.date}</div>
    </Bubble>
  );
  bubbles.push(
    <Bubble>
      <div className="flex flex-wrap gap-1.5">
        {item.skills.map((skill) => (
          <span key={skill} className="text-[12px] text-[#86868b] bg-white rounded-full px-2.5 py-0.5">
            {skill.toLowerCase()}
          </span>
        ))}
      </div>
    </Bubble>
  );
  return <ChatBubbles keyProp={item.company}>{bubbles}</ChatBubbles>;
}

function ProjectDetail({ item }: { item: ProjectRow }) {
  if (item.chat) {
    const bubbles: ReactNode[] = item.chat.map((text, i) => (
      <Bubble key={i}>
        <div className="text-[14px] max-sm:text-[13px] text-[#86868b] leading-[1.6] whitespace-pre-line">
          {parseBold(text)}
        </div>
      </Bubble>
    ));
    return (
      <div className="flex flex-col gap-2.5">
        <ChatBubbles keyProp={item.name}>{bubbles}</ChatBubbles>
        <WannaKnowMoreWrapper count={bubbles.length} />
      </div>
    );
  }

  const bubbles: ReactNode[] = [
    <Bubble>
      <div className="text-[14px] max-sm:text-[13px] text-[#1d1d1f] leading-[1.6]">
        <span className="font-semibold">{item.name}</span> — {item.desc.toLowerCase()}
      </div>
      <div className="text-[13px] text-[#86868b] mt-1">{item.sub}</div>
    </Bubble>,
  ];
  return <ChatBubbles keyProp={item.name}>{bubbles}</ChatBubbles>;
}

function AboutGreeting() {
  const bubbles: ReactNode[] = ABOUT.intro.map((text, i) => (
    <Bubble key={i} className={i === ABOUT.intro.length - 1 ? 'max-w-[70%]' : ''}>
      <div className={`${i === 0 ? 'text-[14px] max-sm:text-[13px] text-[#1d1d1f]' : 'text-[15px] max-sm:text-[14px] text-[#86868b]'} leading-[1.6]`}>
        {text}
      </div>
    </Bubble>
  ));
  return <ChatBubbles keyProp="greeting">{bubbles}</ChatBubbles>;
}

interface DetailPanelProps {
  item: ExperienceItem | ProjectRow | null;
  type: 'experience' | 'project' | null;
  onClose: () => void;
}

export default function DetailPanel({ item, type, onClose }: DetailPanelProps) {
  const isOpen = item !== null;
  const [greetingOpen, setGreetingOpen] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const t = setTimeout(() => setGreetingOpen(true), 1500);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    if (isOpen) {
      setGreetingOpen(false);
      if (scrollRef.current) scrollRef.current.scrollTop = 0;
    }
  }, [item, isOpen]);

  useEffect(() => {
    const open = isOpen || greetingOpen;
    if (!open) return;
    const handler = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        if (isOpen) onClose();
        else setGreetingOpen(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [isOpen, greetingOpen, onClose]);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        if (isOpen) onClose();
        else if (greetingOpen) setGreetingOpen(false);
      }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [onClose, isOpen, greetingOpen]);

  const panelOpen = isOpen || greetingOpen;
  const panelType = isOpen
    ? (type === 'experience' ? 'work experience' : 'project details')
    : 'about me';

  return (
    <div ref={containerRef} className="fixed bottom-6 right-6 max-sm:bottom-4 max-sm:right-4 z-50">
      {/* Chat box */}
      <div
        className={`absolute bottom-16 right-0 w-[400px] max-sm:w-[calc(100vw-32px)] max-sm:right-[-12px] max-h-[72vh] max-sm:max-h-[60vh] bg-white/95 backdrop-blur-xl rounded-[20px] shadow-[0_8px_60px_rgba(0,0,0,0.08),0_0_0_0.5px_rgba(0,0,0,0.05)] flex flex-col origin-bottom-right transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] ${
          panelOpen
            ? 'opacity-100 scale-100 translate-y-0'
            : 'opacity-0 scale-95 translate-y-2 pointer-events-none'
        }`}
      >
        <div className="flex items-center gap-3 px-6 py-4 border-b border-[#f5f5f7] shrink-0">
          <img
            src={SITE.photo}
            alt={SITE.name}
            className="w-8 h-8 rounded-full object-cover"
          />
          <div className="flex-1">
            <div className="text-[15px] font-semibold text-[#1d1d1f] tracking-tight">
              {SITE.name}
            </div>
            <div className="text-[12px] text-[#86868b]">{panelType}</div>
          </div>
          <button
            onClick={() => {
              if (isOpen) onClose();
              else setGreetingOpen(false);
            }}
            className="w-7 h-7 flex items-center justify-center rounded-full bg-[#f5f5f7] border-0 cursor-pointer transition-all duration-200 hover:bg-[#e8e8ed] text-[#86868b] text-[14px] leading-none"
          >
            &times;
          </button>
        </div>

        <div ref={scrollRef} className="flex-1 overflow-y-auto px-6 py-5">
          {isOpen && type === 'experience' && item && (
            <ExperienceDetail item={item as ExperienceItem} />
          )}
          {isOpen && type === 'project' && item && (
            <ProjectDetail item={item as ProjectRow} />
          )}
          {!isOpen && greetingOpen && <AboutGreeting />}
        </div>
      </div>

      {/* Avatar */}
      <button
        onClick={() => {
          if (isOpen) onClose();
          else if (greetingOpen) setGreetingOpen(false);
          else setGreetingOpen(true);
        }}
        className={`w-14 h-14 max-sm:w-12 max-sm:h-12 rounded-full overflow-hidden shadow-[0_2px_20px_rgba(0,0,0,0.1)] cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-[0_4px_28px_rgba(0,0,0,0.15)] ${
          panelOpen ? 'ring-2 ring-[#e8e8ed] ring-offset-2' : ''
        }`}
      >
        <img
          src={SITE.photo}
          alt={SITE.name}
          className="w-full h-full object-cover"
        />
      </button>
    </div>
  );
}
