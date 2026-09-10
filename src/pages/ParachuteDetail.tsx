import { Reveal, ToolPill, BackLink } from '../components/shared';
import Outline from '../components/Outline';

// ─── Data ────────────────────────────────────────────────────────

const OVERVIEW = {
  role: 'AI Engineering Intern',
  period: 'Mar – Jun 2024',
  summary:
    'Parachute is an AI-powered career coaching startup. I built the foundational AI infrastructure (resume classification and RAG pipeline) from zero existing AI infra.',
};

const WORK_ITEMS = [
  {
    num: '01',
    meta: '~73% accuracy · 3 strategies benchmarked',
    title: 'Resume Classifier',
    description: 'Built a Streamlit prototype: PDF upload → PyPDF extraction → GPT classification. Benchmarked 3 prompting strategies (structured JSON, zero-shot, instruction-guided). Zero-shot won at ~73% accuracy; recommended fine-tuning path for production.',
    tools: ['Prompt Engineering', 'Benchmarking', 'GPT API', 'Streamlit', 'PyPDF'],
    image: '/images/parachute-resume-classifier.webp',
  },
  {
    num: '02',
    meta: 'Full RAG architecture for chatbot MVP',
    title: 'RAG Pipeline',
    description: 'Designed the full query-response architecture for the career coaching chatbot MVP. Document chunking → FAISS embedding → retrieval → GPT generation. Chose FAISS over Pinecone (no hosted cost for MVP scale) and LangChain for chain composition.',
    tools: ['System Design', 'Architecture', 'LangChain', 'FAISS', 'GPT API'],
    image: '/images/parachute-rag.webp',
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
      <Outline />
      <div className="max-w-[1080px] mx-auto px-10 max-sm:px-5 pt-28 max-sm:pt-24 pb-24">
        <BackLink />

        {/* Overview */}
        <div id="overview" data-outline="Overview" className="mt-12 mb-14 animate-fade-in">
          <h1 className="text-[32px] max-sm:text-[26px] font-bold tracking-tight text-[#111] mb-6">
            <a
              href="https://www.letsparachute.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#111] no-underline hover:underline underline-offset-[6px] decoration-[#d2d2d7] hover:decoration-[#111] transition-colors duration-200"
            >
              Parachute
            </a>
          </h1>
          <div className="flex flex-col gap-2 mb-6">
            <div className="text-[15px] font-normal text-[#444]"><span className="font-semibold text-[#111]">Role:</span> {OVERVIEW.role}</div>
            <div className="text-[15px] font-normal text-[#444]"><span className="font-semibold text-[#111]">Period:</span> {OVERVIEW.period}</div>
          </div>
          <p className="text-[15px] font-normal text-[#444] leading-[1.7]">{OVERVIEW.summary}</p>
        </div>

        <div className="h-px bg-black/5 mb-16" />

        {/* What I Built */}
        <div id="what-i-built" data-outline="What I Built" className="mb-16">
          <h2 className="text-[12px] font-semibold text-[#999] uppercase tracking-[0.14em] mb-12">
            What I Built
          </h2>
          <div className="space-y-24 max-sm:space-y-16">
            {WORK_ITEMS.map((item, i) => {
              const reversed = i % 2 !== 0;
              return (
                <Reveal key={item.title}>
                  <div className={`flex flex-col ${reversed ? 'md:flex-row-reverse' : 'md:flex-row'} items-center gap-10 md:gap-14`}>
                    <div className="w-full md:flex-[2]">
                      <div className="w-full aspect-[16/10] rounded-2xl overflow-hidden border border-black/5 bg-[#F0F3F7]">
                        {item.image ? (
                          <img src={item.image} alt={item.title} loading="lazy" decoding="async" className="w-full h-full object-contain" />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center">
                            <span className="text-black/20 text-[13px]">screenshot</span>
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="md:flex-[3]">
                      <p className="text-[13px] font-medium text-[#666]">
                        {item.num} &middot; {item.meta}
                      </p>
                      <h3 className="mt-3 text-[28px] max-sm:text-[22px] font-bold text-[#111] tracking-tight leading-[1.2]">
                        {item.title}
                      </h3>
                      <p className="mt-4 text-[15px] text-[#333] leading-[1.65]">{item.description}</p>
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
        <Reveal className="mb-16" id="results" outline="Results">
          <h2 className="text-[12px] font-semibold text-[#999] uppercase tracking-[0.14em] mb-10">
            Results
          </h2>
          <div className="grid grid-cols-4 max-sm:grid-cols-2 gap-4">
            {RESULTS.map((r) => (
              <div key={r.label} className="bg-black/[0.03] rounded-2xl px-5 py-7 text-center">
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
