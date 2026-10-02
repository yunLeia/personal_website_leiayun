import { EXPERIENCE } from '../data';
import ProjectIntro from '../components/ProjectIntro';
import WorkItem, { type WorkItemData } from '../components/WorkItem';
import { B, Hi } from '../components/InlineMarks';

const parachute = EXPERIENCE.find((experience) => experience.company === 'Parachute')!;

const WORK: WorkItemData[] = [
  {
    id: 'resume-classifier',
    num: '01',
    title: 'Resume Classifier',
    lede: 'Three prompting strategies benchmarked to find what actually classifies resumes.',
    figure: {
      src: '/images/parachute-resume-classifier-fig.webp',
      alt: 'Resume classifier prototype with prompt, uploaded resume, and structured output',
      caption: 'Streamlit prototype and prompt experiments',
    },
    problem: <>Parachute needed to classify incoming resumes automatically, but had <B>no AI infrastructure</B> to build on.</>,
    did: [
      'Built a Streamlit prototype: PDF upload → PyPDF extraction → GPT classification.',
      <>Benchmarked <B>3 prompting strategies</B>: structured JSON, zero-shot, and instruction-guided. Zero-shot won at <Hi color="blue">~73% accuracy</Hi>.</>,
      <>Found <Hi color="yellow">structured JSON mode hallucinated fields</Hi> that weren’t in the resume.</>,
      'Recommended a fine-tuning path for production.',
    ],
    metrics: [
      { value: '~73%', label: 'Accuracy, zero-shot' },
      { value: '3', label: 'Strategies benchmarked' },
    ],
    tools: ['Prompt Engineering', 'Benchmarking', 'GPT API', 'Streamlit', 'PyPDF'],
  },
  {
    id: 'rag-pipeline',
    num: '02',
    title: 'RAG Pipeline',
    lede: 'The query-to-answer architecture behind the career coaching chatbot MVP.',
    figure: {
      src: '/images/parachute-rag-fig.webp',
      alt: 'RAG pipeline diagram: user query, embedding, top-k retrieval, context and prompt, GPT response',
      caption: 'RAG pipeline architecture',
    },
    problem: 'The chatbot MVP needed answers grounded in Parachute’s own content, at a cost that made sense for an early-stage product.',
    did: [
      'Designed the full flow: document chunking → FAISS embedding → retrieval → GPT generation.',
      <>Chose <Hi color="yellow">FAISS over Pinecone</Hi>: no hosted cost at MVP scale.</>,
      'Used LangChain for chain composition.',
    ],
    tools: ['System Design', 'LangChain', 'FAISS', 'GPT API'],
  },
];

export default function ParachuteDetail() {
  return (
    <div className="case-study-content">
      <ProjectIntro
        name={parachute.company}
        eyebrow="Experience"
        summary="Parachute is an AI-powered career coaching startup. I built its foundational AI infrastructure, resume classification and a RAG pipeline, starting from zero."
        facts={[{ label: 'Role', value: parachute.role }, { label: 'Period', value: parachute.date }]}
        links={[{ label: 'Company site', href: 'https://www.letsparachute.com' }]}
      />
      {WORK.map((item) => <WorkItem key={item.id} {...item} />)}
    </div>
  );
}
