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
  bio: {
    title: 'NYU Computer Science and Data Science',
    subtitle: 'Product Owner Intern, AI Engineering Intern.',
  },
};

export const EXPERIENCE: ExperienceItem[] = [
  {
    company: 'Planfit',
    date: 'Mar–Dec 2025',
    role: 'Product Owner Intern → Solver',
    skills: ['Product Strategy', 'Complete Product Lifecycle', 'PRD Writing', 'Customer Discovery', 'A/B Testing', 'Data Analysis', 'User Interviews', 'Funnel Analysis', 'UX Optimization'],
    subTeams: [
      {
        label: 'Activation Team',
        bullets: [
          { text: 'Shipped full-stack AI stretching recommendation (server + UI/UX) grounded in 30+ user interviews, 100+ surveys, 15+ A/B tests', metric: '+12% US activation', keywords: ['AI stretching recommendation', '30+ user interviews', '15+ A/B tests'] },
          {
            text: 'Pioneered adoption of AI tools (SuperClaude, Serena, CodeRabbit, Figma-Claude MCP), developing playbooks to integrate them into sprint workflows', keywords: ['Pioneered adoption of AI tools']
          },
        ],
      },
      {
        label: 'Subscription Team — Solo Builder',
        bullets: [
          { text: 'Owned competition leaderboard + real-time push notifications feature 0 \→1', metric: '2,000+ clubs · +20% engagement', keywords: ['competition leaderboard', 'real-time push notifications', 'Claude Code'] },
          { text: 'Executed 30+ A/B experiments in the onboarding funnel, optimizing copy and UI/UX across country, platform, and traffic segments', metric: 'Trial · Sub CVR 15% ↑', keywords: [' 30+ A/B experiments in the onboarding funnel'] },
        ],
      },
    ],
  },
  {
    company: 'Parachute',
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
    values: ['Java', 'JavaScript', 'Python', 'SQL', 'HTML/CSS', 'SwiftUI', 'React', 'React Native', 'Django', 'Node.js', 'TypeScript'],
  },
  {
    category: 'AI & Tools',
    values: ['GPT API', 'RAG', 'Claude Code', 'Make.com', 'Figma MCP', 'Zapier'],
  },
  {
    category: 'DevOps & Tools',
    values: ['AWS', 'Firebase', 'Docker', 'Xcode', 'GitHub'],
  },
];

export const CONTACTS: ContactLink[] = [
  { label: 'Email', href: 'mailto:sy3544@nyu.edu' },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/leia-yun-s/', external: true },
  { label: 'GitHub', href: 'https://github.com/leiassyun', external: true },
  { label: 'Resume', href: '/Leia_Yun_Resume.pdf' },
];
