// ─── Site ────────────────────────────────────────────────────────
export const SITE = {
  name: 'Leia Yun',
  email: 'sy3544@nyu.edu',
  resumePath: '/Leia_Yun_Resume.pdf',
  photo: '/images/leia.png',
  tagline: 'pm & builder — turning ideas into impact',
};

export const LINKS = [
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/leia-yun-s/', external: true },
  { label: 'GitHub', href: 'https://github.com/leiassyun', external: true },
  { label: 'Resume', href: '/Leia_Yun_Resume.pdf' },
];

// ─── Highlights (3 numbers) ─────────────────────────────────────
export const HIGHLIGHTS = [
  { value: '+15%', label: 'subscription lift' },
  { value: '2K+', label: 'clubs launched' },
  { value: '3', label: 'products shipped' },
];

// ─── Experience ──────────────────────────────────────────────────
export interface SubProject {
  title: string;
  metric?: string;
  chat: string[];
}

export interface ExperienceItem {
  company: string;
  url?: string;
  role: string;
  date: string;
  subtitle?: string;
  detailPath?: string;
  subProjects: SubProject[];
}

export const EXPERIENCE: ExperienceItem[] = [
  {
    company: 'Planfit',
    url: 'https://planfit.ai/en',
    role: 'Product Owner Intern → Solver',
    date: 'Mar–Dec 2025',
    subtitle: 'Owned 5 product tracks end-to-end — from problem discovery to deployment — across a fitness app serving 30,000+ DAU.',
    detailPath: '/work/planfit',
    subProjects: [
      {
        title: 'Paywall A/B Engine',
        metric: '+15% subs',
        chat: [
          'built an **automated a/b testing system**',
          'basically rotates variants on its own based on **performance**',
          'used it to **localize paywalls** + optimize flows',
          'bumped **cta by ~15%** and **subscriptions by ~10%**',
        ],
      },
      {
        title: 'Competition Leaderboard',
        metric: '2k+ clubs',
        chat: [
          'designed a **competition leaderboard** from scratch',
          'did everything from **user interviews** to **full-stack code**',
          'grew to **2k+ clubs** and lifted activation **~12%** in the us',
          'one of my favorite **0→1 builds**',
        ],
      },
      {
        title: 'Onboarding Experiments',
        metric: '+15% trial→sub',
        chat: [
          'spent a lot of time on **onboarding experiments**',
          'tested **copy, ui, flows** across different segments',
          'got trial → sub up **~15%**',
          'learned a ton about **localization** and **user psychology**',
        ],
      },
    ],
  },
  {
    company: 'Parachute',
    url: 'https://www.letsparachute.com',
    role: 'AI Engineering Intern',
    date: 'Mar–Jun 2024',
    subProjects: [
      {
        title: 'RAG Pipeline',
        chat: [
          'worked on a **rag pipeline** for production use',
          'tested different **llms + vector dbs** to see what actually performs better',
          'also built **python pipelines** to clean + structure data at scale',
        ],
      },
    ],
  },
  {
    company: 'LikeLion @ NYU',
    url: 'https://us.likelion.net/',
    role: 'Vice President',
    date: 'Jun 2024–Present',
    subProjects: [
      {
        title: 'Hackathon',
        metric: '100+ participants',
        chat: [
          'ran a **hackathon** with **100+ participants**',
          'handled **sponsorships, logistics, judging** — the whole thing',
          'one of the most rewarding things i\'ve done at nyu',
        ],
      },
    ],
  },
];

// ─── Projects ────────────────────────────────────────────────────
export interface ProjectItem {
  name: string;
  sub: string;
  chat: string[];
}

export const PROJECTS: ProjectItem[] = [
  {
    name: 'CulineAI',
    sub: 'ai recipe app — multimodal models + prompt tuning',
    chat: [
      'built an **ai recipe app**',
      'you upload a photo of ingredients and it turns that into a **usable recipe**',
      'used **multimodal models + prompt tuning** to make outputs actually useful',
      'the goal was to help **reduce food waste**',
    ],
  },
  {
    name: 'This Portfolio',
    sub: 'react + typescript + tailwind — interactive chat ui',
    chat: [
      'you\'re looking at it right now :)',
      'built with **react + typescript + tailwind**',
      'has **interactive chat panels** and **staggered animations**',
      'wanted something that feels **alive**, not just a static page',
    ],
  },
];

// ─── About (greeting bubbles) ────────────────────────────────────
export const ABOUT_INTRO = [
  "hi! i'm leia — cs + data science @ nyu",
  "i like building products + figuring out why users behave the way they do",
  "most recently at planfit — ai features + a lot of experiments",
  "click anything if you're curious :)",
];

// ─── Work page (detailed /work) ─────────────────────────────────
export interface WorkProject {
  company: string;
  year: string;
  title: string;
  description: string;
  hasCase: boolean;
  chat: string[];
}

export const WORK_PROJECTS: WorkProject[] = [
  {
    company: 'Planfit',
    year: '2025',
    title: 'Paywall A/B Engine',
    description:
      'Designed and built an automated paywall experimentation system using GPT + Django + Amplitude. The engine auto-rotates creative variants based on statistical significance, eliminating manual experiment cycles and boosting CTA conversion by ~15%.',
    hasCase: true,
    chat: [
      'built an **automated a/b testing system**',
      'basically rotates variants on its own based on **performance**',
      'used it to **localize paywalls** + optimize flows',
      'bumped **cta by ~15%** and **subscriptions by ~10%**',
    ],
  },
  {
    company: 'Planfit',
    year: '2025',
    title: 'Competition Leaderboard',
    description:
      'Took a social fitness feature from concept to launch — from user interviews and competitive analysis through full-stack implementation. The leaderboard grew to 2K+ clubs and lifted activation by ~12% in the US market.',
    hasCase: true,
    chat: [
      'took this from **concept to launch**',
      'started with **user interviews** and **competitive analysis**',
      'then did **full-stack implementation** myself',
      'grew to **2k+ clubs** and lifted activation **~12%**',
    ],
  },
  {
    company: 'NYU / Personal',
    year: '2024',
    title: 'CulineAI — AI Recipe App',
    description:
      'Built an AI-powered recipe app that turns ingredient photos into step-by-step recipes to reduce food waste. Used multimodal models and prompt engineering to produce practical, usable outputs.',
    hasCase: false,
    chat: [
      'built an **ai recipe app**',
      'you upload a photo of ingredients and it turns that into a **usable recipe**',
      'used **multimodal models + prompt tuning** to make outputs actually useful',
      'the goal was to help **reduce food waste**',
    ],
  },
];

// ─── Nav ─────────────────────────────────────────────────────────
export const NAV_LINKS = [
  { label: 'Work', href: '/work', type: 'route' as const },
  { label: 'Contact', href: '#contact', type: 'scroll' as const },
];
