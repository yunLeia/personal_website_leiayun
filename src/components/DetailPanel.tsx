import { useState, useEffect, useRef, type ReactNode } from 'react';
import { SITE, ABOUT_INTRO } from '../data';

// ─── Helpers ─────────────────────────────────────────────────────

function parseBold(text: string): ReactNode[] {
  const parts = text.split(/(\*\*[^*]+\*\*)/g);
  return parts.map((part, i) =>
    part.startsWith('**') && part.endsWith('**')
      ? <span key={i} className="font-medium text-[#1a1a1a]">{part.slice(2, -2)}</span>
      : part,
  );
}

function TypingIndicator() {
  return (
    <div className="flex gap-1.5 px-4 py-3">
      <span className="w-2 h-2 bg-black/15 rounded-full animate-bounce [animation-delay:0ms]" />
      <span className="w-2 h-2 bg-black/15 rounded-full animate-bounce [animation-delay:150ms]" />
      <span className="w-2 h-2 bg-black/15 rounded-full animate-bounce [animation-delay:300ms]" />
    </div>
  );
}

function Bubble({ children, className = '' }: { children: ReactNode; className?: string }) {
  return (
    <div className={`bg-black/[0.04] rounded-2xl rounded-bl-md px-4 py-3 max-w-[88%] ${className}`}>
      {children}
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
    if (visibleCount >= total) { setShowTyping(false); return; }
    const typingDelay = setTimeout(() => setShowTyping(true), 100);
    const bubbleDelay = setTimeout(() => {
      setVisibleCount(prev => prev + 1);
      setShowTyping(false);
    }, 600 + visibleCount * 100);
    return () => { clearTimeout(typingDelay); clearTimeout(bubbleDelay); };
  }, [visibleCount, total]);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: 'smooth', block: 'end' });
  }, [visibleCount, showTyping]);

  return (
    <div ref={scrollRef} className="flex flex-col gap-2.5">
      {children.slice(0, visibleCount).map((child, i) => (
        <div key={i} className="animate-[bubble-in_0.3s_ease-out]">{child}</div>
      ))}
      {showTyping && visibleCount < total && <TypingIndicator />}
    </div>
  );
}

// ─── "wanna know more?" ──────────────────────────────────────────

function WannaKnowMoreWrapper({ count }: { count: number }) {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setShow(true), count * 700 + 800);
    return () => clearTimeout(t);
  }, [count]);
  if (!show) return null;
  return <div className="animate-[bubble-in_0.3s_ease-out]"><WannaKnowMore /></div>;
}

function WannaKnowMore() {
  const [clicked, setClicked] = useState(false);
  return (
    <div className="flex flex-col gap-2.5">
      <Bubble className="max-w-[65%]">
        <div className="text-[14px] max-sm:text-[13px] text-[#555] leading-[1.6]">wanna know more?</div>
      </Bubble>
      {!clicked ? (
        <div className="animate-[bubble-in_0.3s_ease-out]">
          <button
            onClick={() => setClicked(true)}
            className="bg-[#1a1a1a] text-white text-[14px] max-sm:text-[13px] font-medium px-5 py-2 rounded-full border-0 cursor-pointer transition-all duration-200 hover:bg-[#333] active:scale-[0.97]"
          >
            yes
          </button>
        </div>
      ) : (
        <div className="animate-[bubble-in_0.3s_ease-out]">
          <Bubble>
            <div className="text-[14px] max-sm:text-[13px] text-[#555] leading-[1.6]">
              always happy to chat:{' '}
              <a href={`mailto:${SITE.email}`} className="text-[#1a1a1a] font-medium underline decoration-dotted underline-offset-[3px] hover:decoration-solid transition-all duration-150">
                {SITE.email}
              </a>
            </div>
          </Bubble>
        </div>
      )}
    </div>
  );
}

// ─── Chat content renderers ──────────────────────────────────────

function ChatMessages({ messages, chatKey }: { messages: string[]; chatKey: string }) {
  const bubbles: ReactNode[] = messages.map((text, i) => (
    <Bubble key={i}>
      <div className="text-[14px] max-sm:text-[13px] text-[#555] leading-[1.6]">{parseBold(text)}</div>
    </Bubble>
  ));
  return (
    <div className="flex flex-col gap-2.5">
      <ChatBubbles keyProp={chatKey}>{bubbles}</ChatBubbles>
      <WannaKnowMoreWrapper count={bubbles.length} />
    </div>
  );
}

function AboutGreeting() {
  const bubbles: ReactNode[] = ABOUT_INTRO.map((text, i) => (
    <Bubble key={i} className={i === ABOUT_INTRO.length - 1 ? 'max-w-[70%]' : ''}>
      <div className="text-[14px] max-sm:text-[13px] text-[#444] leading-[1.6]">
        {text}
      </div>
    </Bubble>
  ));
  return <ChatBubbles keyProp="greeting">{bubbles}</ChatBubbles>;
}

// ─── Panel ───────────────────────────────────────────────────────

export interface PanelChat {
  messages: string[];
  title: string;
  subtitle: string;
}

interface DetailPanelProps {
  chat: PanelChat | null;
  onClose: () => void;
  greetingOpen: boolean;
  onCloseGreeting: () => void;
}

export default function DetailPanel({ chat, onClose, greetingOpen, onCloseGreeting }: DetailPanelProps) {
  const isOpen = chat !== null;
  const scrollRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen && scrollRef.current) scrollRef.current.scrollTop = 0;
  }, [chat, isOpen]);

  useEffect(() => {
    const open = isOpen || greetingOpen;
    if (!open) return;
    const handler = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        if (isOpen) onClose();
        else onCloseGreeting();
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [isOpen, greetingOpen, onClose, onCloseGreeting]);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        if (isOpen) onClose();
        else if (greetingOpen) onCloseGreeting();
      }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [onClose, isOpen, greetingOpen, onCloseGreeting]);

  const panelOpen = isOpen || greetingOpen;
  const panelType = isOpen ? chat!.subtitle : 'about me';

  return (
    <div ref={containerRef} className="fixed bottom-24 left-1/2 -translate-x-1/2 z-50 max-sm:bottom-20">
      <div
        className={`w-[400px] max-sm:w-[calc(100vw-32px)] max-h-[60vh] bg-white border border-black/10 rounded-[20px] shadow-[0_8px_40px_rgba(0,0,0,0.12)] flex flex-col origin-bottom transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] ${
          panelOpen ? 'opacity-100 scale-100 translate-y-0' : 'opacity-0 scale-95 translate-y-2 pointer-events-none'
        }`}
      >
        <div className="flex items-center gap-3 px-6 py-4 border-b border-black/5 shrink-0">
          <img src={SITE.photo} alt={SITE.name} className="w-8 h-8 rounded-full object-cover" />
          <div className="flex-1">
            <div className="text-[15px] font-semibold text-[#1a1a1a] tracking-tight">
              {isOpen ? chat!.title : SITE.name}
            </div>
            <div className="text-[12px] text-[#888]">{panelType}</div>
          </div>
          <button
            onClick={() => { if (isOpen) onClose(); else onCloseGreeting(); }}
            className="w-7 h-7 flex items-center justify-center rounded-full bg-black/[0.05] cursor-pointer transition-all duration-200 hover:bg-black/[0.08] text-[#666] text-[14px] leading-none"
          >
            &times;
          </button>
        </div>

        <div ref={scrollRef} className="flex-1 overflow-y-auto px-6 py-5">
          {isOpen && chat && (
            <ChatMessages messages={chat.messages} chatKey={`${chat.title}-${chat.subtitle}`} />
          )}
          {!isOpen && greetingOpen && <AboutGreeting />}
        </div>
      </div>
    </div>
  );
}
