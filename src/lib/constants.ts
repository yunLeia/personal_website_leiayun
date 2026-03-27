import type { ExperienceItem, ProjectRow, SkillGroup, ContactLink } from '../types';

export const SITE = {
  name: 'Leia Yun',
  resume: '/Leia_Yun_Resume.pdf',
  email: 'sy3544@nyu.edu',
  photo: '/images/leia.jpg',
};

export const HERO = {
  lines: [
    'Product person.',
    'Engineer.',
    'I find the problem.',
    'I ship the fix.',
  ],
  tag: 'NYU CS · Seoul · New York',
  bio: {
    title: 'NYU Computer Science',
    subtitle: 'Product + Engineering. Previously Planfit, Parachute.',
  },
};

export const EXPERIENCE: ExperienceItem[] = [
  {
    company: 'Planfit',
    location: 'Seoul, KR',
    date: 'Mar–Dec 2025',
    role: 'Product Owner Intern → Solver',
    skills: ['Product Strategy', 'Complete Product Lifecycle', 'PRD Writing', 'Customer Discovery', 'A/B Testing', 'Data Analysis', 'User Interviews', 'Funnel Analysis', 'UX Optimization'],
    subTeams: [
      {
        label: 'Activation Team',
        bullets: [
          { text: 'Shipped full-stack AI stretching recommendation (server + UI/UX) grounded in 30+ user interviews, 100+ surveys, 15+ A/B tests', metric: '+12% US activation', keywords: ['AI stretching recommendation', '30+ user interviews', '15+ A/B tests'] },
          { text: 'Pioneered SuperClaude, Serena, CodeRabbit, Figma MCP — built playbooks, integrated into sprint workflows', keywords: ['SuperClaude', 'CodeRabbit', 'Figma MCP'] },
        ],
      },
      {
        label: 'Subscription Team — Solo Builder',
        bullets: [
          { text: 'Built competition leaderboard + real-time push notifications 0→1 with Claude Code', metric: '2,000+ clubs · +20% engagement', keywords: ['competition leaderboard', 'real-time push notifications', 'Claude Code'] },
          { text: 'Designed and coded 30+ onboarding A/B experiments — copy, UI/UX segmented by country, platform, traffic source', metric: 'Trial CVR ↑', keywords: ['30+ onboarding A/B experiments'] },
          { text: 'Owned experiment tracking end-to-end via Amplitude — funnel analysis, significance monitoring, iteration', keywords: ['Amplitude', 'funnel analysis'] },
        ],
      },
    ],
  },
  {
    company: 'Parachute',
    location: 'Baltimore, MD',
    date: 'Mar–Jun 2024',
    role: 'AI Engineering Intern',
    skills: ['RAG', 'Python', 'ETL', 'LLM Benchmarking', 'Vector DBs'],
    bullets: [
      { text: 'Designed RAG pipeline — benchmarked LLMs and vector DBs for production retrieval accuracy', keywords: ['RAG pipeline', 'LLMs', 'vector DBs'] },
      { text: 'Built Python ETL pipelines for data parsing and normalization at scale', keywords: ['Python ETL pipelines'] },
    ],
  },
  {
    company: 'LikeLion @NYU',
    location: 'New York, NY',
    date: 'Jun 2024–Present',
    role: 'Vice President',
    skills: ['Leadership', 'Event Management', 'Community Building'],
    bullets: [
      { text: 'Scaled club from ground up — 50% membership growth, 4 projects shipped, 100+ participant hackathon', keywords: ['50% membership growth', '100+ participant hackathon'] },
    ],
  },
];

export const PROJECTS: ProjectRow[] = [
  { name: 'Paywall A/B Engine', desc: 'Auto-running experiment loop — GPT → Django → Amplitude. Zero manual cycles.', metric: '+20% CTA', sub: 'Planfit Hackathon' },
  { name: 'RAG Pipeline', desc: 'LLM + vector DB benchmarking for production retrieval. Python ETL at scale.', metric: 'Prod', sub: 'Parachute' },
];

export const SKILLS: SkillGroup[] = [
  {
    category: 'Product',
    values: ['Amplitude', 'Figma', 'Linear', 'A/B Testing', 'SQL', 'User Research', 'PRD'],
  },
  {
    category: 'Engineering',
    values: ['Python', 'Django', 'React Native', 'TypeScript', 'Node.js', 'AWS'],
  },
  {
    category: 'AI & Tools',
    values: ['GPT API', 'RAG', 'Claude Code', 'Make.com', 'Figma MCP'],
  },
];

export const CONTACTS: ContactLink[] = [
  { label: 'Email', href: 'mailto:sy3544@nyu.edu' },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/leia-yun-s/', external: true },
  { label: 'GitHub', href: 'https://github.com/leiassyun', external: true },
  { label: 'Resume', href: '/Leia_Yun_Resume.pdf' },
];
