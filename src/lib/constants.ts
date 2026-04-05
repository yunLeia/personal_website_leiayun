import type { ExperienceItem, ProjectRow, SkillGroup, ContactLink, AboutContent } from '../types';

export const SITE = {
  name: 'Leia Yun',
  resume: '/Leia_Yun_Resume.pdf',
  email: 'sy3544@nyu.edu',
  photo: '/images/leia.png',
};

export const ABOUT: AboutContent = {
  intro: [
    "hi! i'm leia — cs + data science @ nyu",
    "i like building products + figuring out why users behave the way they do",
    "most recently at planfit — ai features + a lot of experiments",
    "click anything if you're curious :)",
  ],
  currently: [
    "Exploring product + engineering roles for 2026",
    "Building side projects with LLMs",
    "Trying to cook more and scroll less",
  ],
};

export const EXPERIENCE: ExperienceItem[] = [
  {
    company: 'Planfit',
    url: 'https://planfit.ai/en',
    date: 'Mar–Dec 2025',
    role: 'Product Owner Intern → Solver',
    skills: ['Product Strategy', 'Complete Product Lifecycle', 'PRD Writing', 'Customer Discovery', 'A/B Testing', 'Data Analysis', 'User Interviews', 'Funnel Analysis', 'UX Optimization'],
    chat: [
      'planfit is a mobile fitness app — i was a **product owner + builder**',
      'i built a couple features **end to end** myself',
      'like an **ai stretching routine** and a **competition leaderboard** from scratch',
      'from **user interviews** to **PRDs** to writing **full-stack code** myself',
      'the leaderboard grew to **2k+ clubs** and bumped activation **~12%** in the us',
      'i also spent a lot of time on **onboarding experiments** — copy, ui, flows across segments — that got trial → sub up **~15%**',
    ],
  },
  {
    company: 'Parachute',
    url: 'https://www.letsparachute.com',
    date: 'Mar–Jun 2024',
    role: 'AI Engineering Intern',
    skills: ['RAG', 'Python', 'ETL', 'LLM Benchmarking', 'Vector DBs'],
    chat: [
      'parachute is an ai startup — i was an **ai engineering intern**',
      'worked on a **rag pipeline** for production use',
      'tested different **llms + vector dbs** to see what actually performs better',
      'also built **python pipelines** to clean + structure data at scale',
    ],
  },
  {
    company: 'LikeLion@NYU',
    url: 'https://us.likelion.net/',
    date: 'Jun 2024–Present',
    role: 'Vice President',
    skills: ['Leadership', 'Event Management', 'Community Building'],
    chat: [
      'likelion is a coding club at nyu — i\'m the **vice president**',
      'helped grow the club pretty much **from scratch**',
      'we grew membership **~50%** and shipped a few projects together',
      'also ran a **hackathon** with **100+ participants**',
    ],
  },
];

export const PROJECTS: ProjectRow[] = [
  { name: 'Paywall A/B Engine', desc: 'Auto-running experiment loop — GPT → Django → Amplitude. Zero manual cycles.', sub: 'Planfit', chat: [
    'built an **automated a/b testing system**',
    'basically rotates variants on its own based on **performance**',
    'used it to **localize paywalls** + optimize flows',
    'bumped **cta by ~15%** and **subscriptions by ~10%**',
  ] },
  { name: 'CulineAI', desc: 'AI recipe app that turns ingredient photos into recipes.', sub: 'Tech@NYU', chat: [
    'built an **ai recipe app**',
    'you upload a photo of ingredients and it turns that into a **usable recipe** to reduce food waste',
    'used **multimodal models + prompt tuning** to make outputs actually useful',
  ] },
];

export const SKILLS: SkillGroup[] = [
  {
    category: 'Product & Growth', values: ['A/B Testing', 'User Research', 'PRD', 'Funnel Analysis', 'Amplitude']
  },
  {
    category: 'Language & Frameworkds',
    values: ['JavaScript', 'TypeScript', 'React', 'React Native', 'Node.js', 'Django', 'Python', 'SQL', 'Java', 'HTML/CSS'],
  },
  {
    category: 'AI & Tools',
    values: ['GPT API', 'RAG', 'Claude Code', 'Figma MCP', 'Make.com', 'Zapier', 'AWS', 'Firebase', 'Docker', 'GitHub', 'Figma', 'Linear'],
  },
];
export const CONTACTS: ContactLink[] = [
  { label: 'Email', href: 'mailto:sy3544@nyu.edu' },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/leia-yun-s/', external: true },
  { label: 'GitHub', href: 'https://github.com/leiassyun', external: true },
  { label: 'Resume', href: '/Leia_Yun_Resume.pdf' },
];
