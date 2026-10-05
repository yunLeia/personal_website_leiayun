import { EXPERIENCE } from '../data';
import ProjectIntro from '../components/ProjectIntro';
import WorkItem, { type WorkItemData } from '../components/WorkItem';
import { B, Hi } from '../components/InlineMarks';

const parachute = EXPERIENCE.find((experience) => experience.company === 'Parachute')!;

const WORK: WorkItemData[] = [
  {
    id: 'resume-classifier',
    num: '01',
    title: 'Resume Parsing & Classification',
    lede: 'From PDF resumes to structured profiles that make mentor matching faster.',
    problem: <>Parachute matched mentors and mentees from PDF resumes, but had <Hi>no AI infrastructure to turn them into structured data</Hi>.</>,
    did: [
      <>Built <B>Python ETL pipelines</B> using PyMuPDF and regex-based field extraction to turn PDF resumes into structured candidate profiles.</>,
      'Prototyped GPT classification in Streamlit: PDF upload → text extraction → classification.',
      <>Benchmarked 3 prompting strategies: structured JSON, zero-shot, and instruction-guided. Zero-shot won at ~73% accuracy.</>,
      <>Found that structured JSON mode hallucinated fields that weren’t in the resume, and <B>recommended a fine-tuning path for production</B>.</>,
    ],
    metrics: [
      { value: '18%', label: 'Faster mentor–mentee matching' },
      { value: '~73%', label: 'Accuracy, zero-shot' },
      { value: '3', label: 'Strategies benchmarked' },
    ],
    takeaway: <>Structured profiles <B>cut mentor–mentee matching time</B> by 18%.</>,
    figure: {
      src: '/images/parachute-resume-classifier-fig.webp',
      alt: 'Resume classifier prototype with prompt, uploaded resume, and structured output',
      caption: 'Streamlit prototype and prompt experiments',
    },
    tools: ['Python', 'PyMuPDF', 'Regex', 'GPT API', 'Streamlit', 'Prompt Engineering'],
  },
  {
    id: 'rag-pipeline',
    num: '02',
    title: 'RAG Pipeline',
    lede: 'The retrieval pipeline behind the career coaching chatbot MVP.',
    problem: <>The chatbot MVP needed answers grounded in Parachute’s own documents, <Hi>without adding infrastructure cost at an early stage</Hi>.</>,
    did: [
      <>Evaluated <B>FAISS, Pinecone, and Elasticsearch</B> across latency, cost, and integration complexity.</>,
      <>Chose <B>self-hosted FAISS</B> and deployed the pipeline at zero additional infrastructure cost.</>,
      'Built the flow end to end: document chunking → embedding generation → top-k retrieval → context assembly → LLM response.',
      'Used LangChain for chain composition.',
    ],
    metrics: [
      { value: '$0', label: 'Added infra cost' },
      { value: '3', label: 'Vector stores evaluated' },
    ],
    figure: {
      src: '/images/parachute-rag-fig.webp',
      alt: 'RAG pipeline diagram: user query, embedding, top-k retrieval, context and prompt, GPT response',
      caption: 'RAG pipeline architecture',
    },
    tools: ['System Design', 'FAISS', 'LangChain', 'GPT API'],
  },
];

export default function ParachuteDetail() {
  return (
    <div className="case-study-content">
      <ProjectIntro
        name={parachute.company}
        eyebrow="Experience"
        summary="Parachute is an AI-powered career coaching startup. I built its foundational AI infrastructure, resume classification and a RAG pipeline."
        facts={[{ label: 'Role', value: parachute.role }, { label: 'Period', value: parachute.date }]}
        links={[{ label: 'Company site', href: 'https://www.letsparachute.com' }]}
      />
      {WORK.map((item) => <WorkItem key={item.id} {...item} />)}
    </div>
  );
}
