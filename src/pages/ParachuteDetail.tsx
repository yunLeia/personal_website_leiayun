import { type ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { useScrollReveal } from '../hooks/useScrollReveal';

function Reveal({ children, className = '' }: { children: ReactNode; className?: string }) {
  const { ref, visible } = useScrollReveal();
  return (
    <div ref={ref} className={`transition-all duration-600 ease-out ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'} ${className}`}>
      {children}
    </div>
  );
}

function ToolPill({ children }: { children: string }) {
  return (
    <span className="text-[11px] text-[#666] font-normal bg-white/15 backdrop-blur-[8px] border border-white/30 rounded-full px-3 py-1">
      {children}
    </span>
  );
}

// ─── Data ────────────────────────────────────────────────────────

const OVERVIEW = {
  role: 'AI Engineering Intern',
  period: 'Mar – Jun 2024',
  summary:
    'Parachute is an AI-powered career coaching startup. I built the foundational AI infrastructure — resume classification, RAG pipeline, and ETL systems — from zero existing AI infra.',
};

const WORK_ITEMS = [
  {
    title: 'Resume Classifier',
    description: 'Built a Streamlit prototype — PDF upload → PyPDF extraction → GPT classification. Benchmarked 3 prompting strategies (structured JSON, zero-shot, instruction-guided). Zero-shot won at ~73% accuracy; recommended fine-tuning path for production.',
    tools: ['GPT API', 'Streamlit', 'PyPDF', 'Pydantic'],
  },
  {
    title: 'RAG Pipeline',
    description: 'Designed the full query-response architecture for the career coaching chatbot MVP. Document chunking → FAISS embedding → retrieval → GPT generation. Chose FAISS over Pinecone (no hosted cost for MVP scale) and LangChain for chain composition.',
    tools: ['LangChain', 'FAISS', 'GPT API', 'Python'],
  },
  {
    title: 'ETL Pipeline',
    description: 'Automated resume ingestion → text parsing → structured field extraction. Replaced the manual workflow that was bottlenecking mentor-mentee matching, resulting in 18% faster matching.',
    tools: ['Python', 'PyPDF', 'Pydantic'],
  },
];

const RESULTS = [
  { value: '18%', label: 'Faster matching' },
  { value: '3', label: 'Strategies benchmarked' },
  { value: '1', label: 'Prototype shipped' },
  { value: 'Full', label: 'Stack recommendation' },
];

// ─── Page ────────────────────────────────────────────────────────

export default function ParachuteDetail() {
  return (
    <div className="min-h-screen">
      <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute -top-[10%] -right-[10%] w-[500px] h-[500px] rounded-full bg-[rgba(100,140,180,0.25)] blur-[120px]" />
        <div className="absolute bottom-[5%] -left-[10%] w-[450px] h-[450px] rounded-full bg-[rgba(120,155,190,0.2)] blur-[110px]" />
        <div className="absolute top-[35%] left-[30%] w-[350px] h-[350px] rounded-full bg-[rgba(140,170,200,0.15)] blur-[90px]" />
      </div>
      <div className="max-w-[1080px] mx-auto px-10 max-sm:px-5 pt-28 max-sm:pt-24 pb-24">
        <Link to="/" className="text-[14px] font-medium text-[#86868b] no-underline transition-opacity duration-200 hover:opacity-60">
          ← back
        </Link>

        {/* Overview */}
        <div className="mt-12 mb-14 animate-fade-in">
          <h1 className="text-[32px] max-sm:text-[26px] font-bold tracking-tight text-[#111] mb-6">
            Parachute
          </h1>
          <div className="flex flex-col gap-2 mb-6">
            <div className="text-[15px] font-normal text-[#444]"><span className="font-semibold text-[#111]">Role:</span> {OVERVIEW.role}</div>
            <div className="text-[15px] font-normal text-[#444]"><span className="font-semibold text-[#111]">Period:</span> {OVERVIEW.period}</div>
          </div>
          <p className="text-[15px] font-normal text-[#444] leading-[1.7]">{OVERVIEW.summary}</p>
        </div>

        <div className="h-px bg-black/5 mb-16" />

        {/* What I Built */}
        <div className="mb-16">
          <h2 className="text-[12px] font-semibold text-[#999] uppercase tracking-[0.14em] mb-12">
            What I Built
          </h2>
          <div className="space-y-24 max-sm:space-y-16">
            {WORK_ITEMS.map((item, i) => {
              const reversed = i % 2 !== 0;
              return (
                <Reveal key={item.title}>
                  <div className={`flex flex-col ${reversed ? 'md:flex-row-reverse' : 'md:flex-row'} items-center gap-10 md:gap-14`}>
                    <div className="flex-1 w-full">
                      <div className="w-full aspect-[16/10] rounded-2xl bg-white/10 backdrop-blur-[12px] border border-white/25 flex items-center justify-center">
                        <span className="text-black/20 text-[13px]">screenshot</span>
                      </div>
                    </div>
                    <div className="flex-1">
                      <h3 className="text-[24px] max-sm:text-[20px] font-semibold text-[#1d1d1f] tracking-tight">
                        {item.title.toLowerCase()}
                      </h3>
                      <p className="mt-3 text-[15px] text-[#444] leading-[1.7]">{item.description}</p>
                      <div className="flex flex-wrap gap-2 mt-5">
                        {item.tools.map((t) => <ToolPill key={t}>{t}</ToolPill>)}
                      </div>
                    </div>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>

        <div className="h-px bg-black/5 mb-16" />

        {/* Results */}
        <Reveal className="mb-16">
          <h2 className="text-[12px] font-semibold text-[#999] uppercase tracking-[0.14em] mb-10">
            Results
          </h2>
          <div className="grid grid-cols-4 max-sm:grid-cols-2 gap-4">
            {RESULTS.map((r) => (
              <div key={r.label} className="bg-white/15 backdrop-blur-[16px] border border-white/30 shadow-[0_2px_16px_rgba(0,0,0,0.06),inset_0_1px_0_rgba(255,255,255,0.3)] rounded-2xl px-5 py-7 text-center">
                <div className="text-[40px] sm:text-[52px] font-semibold text-[#111] leading-none mb-3" style={{ fontFamily: "'Lora', serif" }}>
                  {r.value}
                </div>
                <div className="text-[11px] font-medium text-[#888] uppercase tracking-[0.08em]">
                  {r.label}
                </div>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </div>
  );
}
