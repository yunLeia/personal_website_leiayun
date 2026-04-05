import { useState, useEffect, useRef, type ReactNode } from 'react';
import { SITE, ABOUT } from '../../lib/constants';
import type { ExperienceItem, ProjectRow } from '../../types';

function parseBold(text: string): ReactNode[] {
  const parts = text.split(/(\*\*[^*]+\*\*)/g);
  return parts.map((part, i) =>
    part.startsWith('**') && part.endsWith('**')
      ? <span key={i} className="font-medium text-[#1a1a1a]">{part.slice(2, -2)}</span>
      : part,
  );
}

function highlightKeywords(text: string, keywords?: string[]) {
  if (!keywords || keywords.length === 0) return text;
  const pattern = new RegExp(`(${keywords.map(k => k.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')).join('|')})`, 'g');
  const parts = text.split(pattern);
  return parts.map((part, i) =>
    keywords.some(k => k === part)
      ? <span key={i} className="font-normal text-[#1a1a1a]">{part}</span>
      : part,
  );
}

// Typing dots animation
function TypingIndicator() {
  return (
    <div className="flex gap-1 px-4 py-3 max-w-[60px]">
      <span className="w-1.5 h-1.5 bg-[#ccc] rounded-full animate-bounce [animation-delay:0ms]" />
      <span className="w-1.5 h-1.5 bg-[#ccc] rounded-full animate-bounce [animation-delay:150ms]" />
      <span className="w-1.5 h-1.5 bg-[#ccc] rounded-full animate-bounce [animation-delay:300ms]" />
    </div>
  );
}

// Wrapper that staggers children with typing indicator
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

    const typingDelay = setTimeout(() => {
      setShowTyping(true);
    }, 100);

    const bubbleDelay = setTimeout(() => {
      setVisibleCount(prev => prev + 1);
      setShowTyping(false);
    }, 600 + visibleCount * 100);

    return () => {
      clearTimeout(typingDelay);
      clearTimeout(bubbleDelay);
    };
  }, [visibleCount, total]);

  // Auto-scroll as bubbles appear
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollIntoView({ behavior: 'smooth', block: 'end' });
    }
  }, [visibleCount, showTyping]);

  return (
    <div ref={scrollRef} className="flex flex-col gap-3">
      {children.slice(0, visibleCount).map((child, i) => (
        <div
          key={i}
          className="animate-[bubble-in_0.25s_ease-out]"
        >
          {child}
        </div>
      ))}
      {showTyping && visibleCount < total && <TypingIndicator />}
    </div>
  );
}

function Bubble({ children, className = '' }: { children: ReactNode; className?: string }) {
  return (
    <div className={`bg-[#f5f5f5] rounded-2xl rounded-bl-sm px-4 py-3 max-w-[90%] ${className}`}>
      {children}
    </div>
  );
}

function WannaKnowMoreWrapper({ count }: { count: number }) {
  const [show, setShow] = useState(false);

  useEffect(() => {
    // Wait for all bubbles to finish typing, then show
    const delay = count * 700 + 800;
    const t = setTimeout(() => setShow(true), delay);
    return () => clearTimeout(t);
  }, [count]);

  if (!show) return null;

  return (
    <div className="animate-[bubble-in_0.25s_ease-out]">
      <WannaKnowMore />
    </div>
  );
}

function WannaKnowMore() {
  const [clicked, setClicked] = useState(false);

  return (
    <div className="flex flex-col gap-3">
      <Bubble className="max-w-[70%]">
        <div className="text-[13px] max-sm:text-[12px] text-[#555] leading-[1.7]">
          wanna know more?
        </div>
      </Bubble>
      {!clicked && (
        <div className="animate-[bubble-in_0.25s_ease-out]">
          <button
            onClick={() => setClicked(true)}
            className="bg-[#1a1a1a] text-white text-[13px] max-sm:text-[12px] font-medium px-4 py-2 rounded-full border-0 cursor-pointer transition-all duration-150 hover:bg-[#333] active:scale-95"
          >
            yes
          </button>
        </div>
      )}
      {clicked && (
        <div className="animate-[bubble-in_0.25s_ease-out]">
          <Bubble>
            <div className="text-[13px] max-sm:text-[12px] text-[#555] leading-[1.7]">
              always happy to chat —{' '}
              <a
                href="mailto:sy3544@nyu.edu"
                className="text-[#1a1a1a] font-medium underline underline-offset-2 decoration-[#ccc] hover:decoration-[#1a1a1a] transition-colors duration-150"
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
  // If chat lines exist, use conversational style
  if (item.chat) {
    const bubbles: ReactNode[] = item.chat.map((text, i) => (
      <Bubble key={i}>
        <div className="text-[13px] max-sm:text-[12px] text-[#555] leading-[1.7]">
          {parseBold(text)}
        </div>
      </Bubble>
    ));
    // Add "wanna know more?" as the last element (rendered after ChatBubbles finishes)
    return (
      <div className="flex flex-col gap-3">
        <ChatBubbles keyProp={item.company}>{bubbles}</ChatBubbles>
        <WannaKnowMoreWrapper count={bubbles.length} />
      </div>
    );
  }

  // Fallback: structured bubbles for items without chat
  const bubbles: ReactNode[] = [];

  bubbles.push(
    <Bubble>
      <div className="text-[14px] max-sm:text-[13px] text-[#1a1a1a] leading-[1.6]">
        At <span className="font-medium">{item.company}</span>, I worked as{' '}
        <span className="font-medium">{item.role.toLowerCase()}</span>.
      </div>
      <div className="text-[12px] text-[#999] mt-1">{item.date}</div>
    </Bubble>
  );

  item.bullets?.forEach((b, i) => {
    bubbles.push(
      <Bubble key={`b-${i}`}>
        {b.metric && (
          <span className="inline-block font-medium text-[#1a1a1a] bg-white rounded-full px-2 py-0.5 text-[11px] mr-1.5 mb-1">
            {b.metric}
          </span>
        )}
        <div className="text-[13px] max-sm:text-[12px] text-[#555] leading-[1.6]">
          {highlightKeywords(b.text, b.keywords)}
        </div>
      </Bubble>
    );
  });

  bubbles.push(
    <Bubble>
      <div className="flex flex-wrap gap-1.5">
        {item.skills.map((skill) => (
          <span key={skill} className="text-[11px] text-[#888] bg-white rounded-full px-2 py-0.5">
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
        <div className="text-[13px] max-sm:text-[12px] text-[#555] leading-[1.7] whitespace-pre-line">
          {parseBold(text)}
        </div>
      </Bubble>
    ));
    return (
      <div className="flex flex-col gap-3">
        <ChatBubbles keyProp={item.name}>{bubbles}</ChatBubbles>
        <WannaKnowMoreWrapper count={bubbles.length} />
      </div>
    );
  }

  const bubbles: ReactNode[] = [
    <Bubble>
      <div className="text-[14px] max-sm:text-[13px] text-[#1a1a1a] leading-[1.6]">
        <span className="font-medium">{item.name}</span> — {item.desc.toLowerCase()}
      </div>
      <div className="text-[12px] text-[#999] mt-1">{item.sub}</div>
    </Bubble>,
  ];

  return <ChatBubbles keyProp={item.name}>{bubbles}</ChatBubbles>;
}

function AboutGreeting() {
  const bubbles: ReactNode[] = ABOUT.intro.map((text, i) => (
    <Bubble key={i} className={i === ABOUT.intro.length - 1 ? 'max-w-[75%]' : ''}>
      <div className={`${i === 0 ? 'text-[14px] max-sm:text-[13px] text-[#1a1a1a]' : 'text-[13px] max-sm:text-[12px] text-[#555]'} leading-[1.7]`}>
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

  // When a new item is selected, close greeting and scroll to top
  useEffect(() => {
    if (isOpen) {
      setGreetingOpen(false);
      if (scrollRef.current) scrollRef.current.scrollTop = 0;
    }
  }, [item, isOpen]);

  // Close on click outside (without blocking page interactions)
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
    <>
      <div ref={containerRef} className="fixed bottom-6 right-6 max-sm:bottom-4 max-sm:right-4 z-50">
        {/* Chat box */}
        <div
          className={`absolute bottom-16 right-0 w-[380px] max-sm:w-[calc(100vw-32px)] max-sm:right-[-12px] max-h-[70vh] max-sm:max-h-[60vh] bg-white rounded-2xl shadow-[0_8px_40px_rgba(0,0,0,0.12)] border border-[#eee] flex flex-col origin-bottom-right transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] ${
            panelOpen
              ? 'opacity-100 scale-100 translate-y-0'
              : 'opacity-0 scale-95 translate-y-2 pointer-events-none'
          }`}
        >
          <div className="flex items-center gap-3 px-5 py-4 border-b border-[#f0f0f0] shrink-0">
            <img
              src={SITE.photo}
              alt={SITE.name}
              className="w-7 h-7 rounded-full object-cover"
            />
            <div className="flex-1">
              <div className="text-[13px] font-medium text-[#1a1a1a]">
                {SITE.name.toLowerCase()}
              </div>
              <div className="text-[11px] text-[#999]">{panelType}</div>
            </div>
            <button
              onClick={() => {
                if (isOpen) onClose();
                else setGreetingOpen(false);
              }}
              className="text-[16px] text-[#ccc] bg-transparent border-0 cursor-pointer transition-colors duration-150 hover:text-[#1a1a1a] leading-none p-1"
            >
              &times;
            </button>
          </div>

          <div ref={scrollRef} className="flex-1 overflow-y-auto px-5 py-4">
            {isOpen && type === 'experience' && item && (
              <ExperienceDetail item={item as ExperienceItem} />
            )}
            {isOpen && type === 'project' && item && (
              <ProjectDetail item={item as ProjectRow} />
            )}
            {!isOpen && greetingOpen && <AboutGreeting />}
          </div>
        </div>

        <div
          className={`absolute bottom-[60px] max-sm:bottom-[52px] right-5 w-3 h-3 bg-white border-r border-b border-[#eee] rotate-45 z-[51] transition-opacity duration-200 ${
            panelOpen ? 'opacity-100' : 'opacity-0'
          }`}
        />

        <button
          onClick={() => {
            if (isOpen) onClose();
            else if (greetingOpen) setGreetingOpen(false);
            else setGreetingOpen(true);
          }}
          className={`w-12 h-12 max-sm:w-11 max-sm:h-11 rounded-full overflow-hidden border-2 border-white shadow-[0_2px_12px_rgba(0,0,0,0.1)] cursor-pointer transition-all duration-300 hover:scale-110 ${
            panelOpen ? 'ring-2 ring-[#eee]' : ''
          }`}
        >
          <img
            src={SITE.photo}
            alt={SITE.name}
            className="w-full h-full object-cover"
          />
        </button>
      </div>

    </>
  );
}
