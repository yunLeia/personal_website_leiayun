import { type ReactNode } from 'react';
import { Link } from 'react-router-dom';

// ─── Helpers ─────────────────────────────────────────────────────

function B({ children }: { children: ReactNode }) {
  return <strong className="font-semibold text-[#111]">{children}</strong>;
}

function ToolPill({ children }: { children: string }) {
  return (
    <span className="text-[11px] text-[#666] font-normal bg-white/30 backdrop-blur-[8px] border border-white/50 rounded-sm px-2.5 py-1">
      {children}
    </span>
  );
}

function SectionLabel({ children }: { children: string }) {
  return (
    <div className="flex items-center gap-3 mb-6">
      <h3 className="text-[11px] font-semibold text-[#bbb] uppercase tracking-[0.14em]">
        {children}
      </h3>
      <span className="flex-1 h-px bg-black/5" />
    </div>
  );
}

// ─── Data ────────────────────────────────────────────────────────

const OVERVIEW = {
  role: 'AI Engineering Intern',
  period: 'Mar – Jun 2024',
  summary:
    'Parachute is an AI-powered career coaching startup. I built the foundational AI infrastructure — resume classification, RAG pipeline, and ETL systems — from zero existing AI infra.',
  tools: ['Python', 'GPT API', 'LangChain', 'FAISS', 'Streamlit', 'PyPDF', 'Pydantic'],
};

const APPROACHES = [
  {
    label: 'Approach 1 — Structured JSON (Pydantic)',
    text: (
      <>
        Model hallucinated when fields weren't present — <B>fabricated job titles, invented dates</B>. Schema enforced structure, not truth.
      </>
    ),
  },
  {
    label: 'Approach 2 — Zero-Shot',
    text: (
      <>
        "Is this a resume? Yes or no." Lowest hallucination. Best results. But GPT-only classification caps at <B>~73% accuracy</B>.
      </>
    ),
  },
  {
    label: 'Approach 3 — Instruction-Guided',
    text: (
      <>
        Added context ("check for work experience"). Same document returned "yes" then "no" in consecutive runs. <B>More specificity, less stability.</B>
      </>
    ),
  },
];

const ARCHITECTURE = [
  {
    label: 'Vector Storage — FAISS',
    text: 'Open-source, no hosted cost, right for MVP. Pinecone added cost and lock-in the data volume didn\'t justify.',
  },
  {
    label: 'Framework — LangChain',
    text: 'Broader chain composition for a pipeline that needed parsing, retrieval, and generation in one flow.',
  },
  {
    label: 'Model — GPT',
    text: 'Strongest structured output support at the time, critical for resume field extraction downstream.',
  },
];

const IMPLEMENTATION = [
  {
    label: 'Resume Classifier',
    text: 'Streamlit app. PDF upload → PyPDF extraction → GPT classification → yes/no. Shipped as prototype for stakeholder demo.',
  },
  {
    label: 'ETL Pipeline',
    text: 'Automated resume ingestion → text parsing → structured field extraction. Replaced the manual workflow bottlenecking mentor-mentee matching.',
  },
  {
    label: 'RAG Pipeline',
    text: 'Document chunking → FAISS embedding → retrieval → GPT generation. Designed the full query-response architecture for the chatbot MVP.',
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
      <div className="max-w-[1080px] mx-auto px-10 max-sm:px-5 pt-14 pb-24">
        <Link to="/" className="text-[14px] font-medium text-[#86868b] no-underline transition-opacity duration-200 hover:opacity-60">
          ← back
        </Link>

        {/* Overview */}
        <div className="mt-12 mb-14 animate-fade-in">
          <h1 className="text-[32px] max-sm:text-[26px] font-bold tracking-tight text-[#111] mb-6">
            Parachute
          </h1>
          <div className="flex flex-col gap-2 mb-6">
            <div className="text-[15px] font-normal text-[#555]"><span className="font-semibold text-[#111]">Role:</span> {OVERVIEW.role}</div>
            <div className="text-[15px] font-normal text-[#555]"><span className="font-semibold text-[#111]">Period:</span> {OVERVIEW.period}</div>
          </div>
          <p className="text-[15px] font-normal text-[#555] leading-[1.85] mb-6 max-w-[640px]">{OVERVIEW.summary}</p>
          <div className="flex flex-wrap gap-2">
            {OVERVIEW.tools.map((t) => <ToolPill key={t}>{t}</ToolPill>)}
          </div>
        </div>

        <div className="h-px bg-black/5 mb-14" />

        {/* ── HERO ── */}
        <div className="mb-16 animate-fade-in">
          <p className="text-[36px] sm:text-[44px] font-light text-[#111] leading-[1.2] tracking-tight mb-4" style={{ fontFamily: "'Lora', serif" }}>
            <span className="italic">73% accuracy.</span>
          </p>
          <p className="text-[20px] sm:text-[24px] font-light text-[#111] leading-[1.35] tracking-tight italic mb-6" style={{ fontFamily: "'Lora', serif" }}>
            That means 1 in 4 real job seekers get rejected before they even start.
          </p>
          <div className="text-[15px] font-medium text-[#888] tracking-tight">
            Resume Classifier · RAG Pipeline · Career Coach MVP
          </div>
        </div>

        {/* ── PROBLEM ── */}
        <div className="mb-16">
          <h3 className="text-[26px] font-bold text-[#111] tracking-tight mb-7 leading-[1.25]">
            One wrong classification, one lost user.
          </h3>
          <p className="text-[15px] font-normal text-[#555] leading-[1.85] max-w-[640px]">
            Parachute needed an AI career coaching platform — starting with a resume classifier at the gate. No existing AI infrastructure, no training data, no baseline. And every misclassification meant blocking someone who genuinely needed help.
          </p>
        </div>

        <div className="h-px bg-black/5 mb-16" />

        {/* ── TECHNICAL EXPLORATION ── */}
        <div className="mb-16">
          <SectionLabel>Technical Exploration</SectionLabel>
          <h3 className="text-[26px] font-bold text-[#111] tracking-tight mb-7 leading-[1.25]">
            Three prompting strategies. Each failed differently.
          </h3>
          <div className="grid grid-cols-3 max-sm:grid-cols-1 gap-4 mb-8">
            {APPROACHES.map((a) => (
              <div key={a.label} className="bg-white/30 backdrop-blur-[16px] border border-white/50 shadow-[0_2px_16px_rgba(0,0,0,0.06),inset_0_1px_0_rgba(255,255,255,0.5)] rounded-xl px-6 py-6">
                <div className="text-[13px] font-semibold text-[#111] mb-3">
                  {a.label}
                </div>
                <p className="text-[15px] font-normal text-[#555] leading-[1.85]">
                  {a.text}
                </p>
              </div>
            ))}
          </div>
          <p className="text-[15px] font-normal text-[#555] leading-[1.85] max-w-[640px]">
            <B>Verdict:</B> Zero-shot was the safest baseline. But prompt-only has a hard ceiling — scaling requires fine-tuning (~89% with 3.5k examples) or embedding + ML (~93% with 400k).
          </p>
        </div>

        <div className="h-px bg-black/5 mb-16" />

        {/* ── ARCHITECTURE DECISIONS ── */}
        <div className="mb-16">
          <SectionLabel>Architecture Decisions</SectionLabel>
          <h3 className="text-[26px] font-bold text-[#111] tracking-tight mb-7 leading-[1.25]">
            The career coaching chatbot needed a full RAG pipeline. Three calls:
          </h3>
          <div className="grid grid-cols-3 max-sm:grid-cols-1 gap-4">
            {ARCHITECTURE.map((a) => (
              <div key={a.label} className="bg-white/30 backdrop-blur-[16px] border border-white/50 shadow-[0_2px_16px_rgba(0,0,0,0.06),inset_0_1px_0_rgba(255,255,255,0.5)] rounded-xl px-6 py-6">
                <div className="text-[13px] font-semibold text-[#111] mb-3">
                  {a.label}
                </div>
                <p className="text-[15px] font-normal text-[#555] leading-[1.85]">
                  {a.text}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="h-px bg-black/5 mb-16" />

        {/* ── IMPLEMENTATION ── */}
        <div className="mb-16">
          <SectionLabel>Implementation</SectionLabel>
          <div className="grid grid-cols-3 max-sm:grid-cols-1 gap-4">
            {IMPLEMENTATION.map((item) => (
              <div key={item.label} className="bg-white/30 backdrop-blur-[16px] border border-white/50 shadow-[0_2px_16px_rgba(0,0,0,0.06),inset_0_1px_0_rgba(255,255,255,0.5)] rounded-xl px-6 py-6">
                <div className="text-[13px] font-semibold text-[#111] mb-3">
                  {item.label}
                </div>
                <p className="text-[15px] font-normal text-[#555] leading-[1.85]">
                  {item.text}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="h-px bg-black/5 mb-16" />

        {/* ── RESULTS ── */}
        <div className="mb-16">
          <SectionLabel>Results</SectionLabel>
          <div className="grid grid-cols-4 max-sm:grid-cols-2 gap-4 mb-8">
            {RESULTS.map((r) => (
              <div key={r.label} className="bg-white/30 backdrop-blur-[16px] border border-white/50 shadow-[0_2px_16px_rgba(0,0,0,0.06),inset_0_1px_0_rgba(255,255,255,0.5)] rounded-xl px-5 py-7 text-center">
                <div className="text-[40px] sm:text-[52px] font-semibold text-[#111] leading-none mb-3" style={{ fontFamily: "'Lora', serif" }}>
                  {r.value}
                </div>
                <div className="text-[11px] font-medium text-[#888] uppercase tracking-[0.08em]">
                  {r.label}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ── TOOLS ── */}
        <div className="bg-white/30 backdrop-blur-[16px] border border-white/50 shadow-[0_2px_16px_rgba(0,0,0,0.06),inset_0_1px_0_rgba(255,255,255,0.5)] rounded-xl px-6 py-5 flex items-center gap-3 flex-wrap">
          <span className="text-[11px] font-semibold text-[#bbb] uppercase tracking-[0.14em] shrink-0">Tools</span>
          {OVERVIEW.tools.map((t) => <ToolPill key={t}>{t}</ToolPill>)}
        </div>
      </div>
    </div>
  );
}
