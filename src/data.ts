// ─── Site ────────────────────────────────────────────────────────
export const SITE = {
  name: 'Leia Yun',
  email: 'sy3544@nyu.edu',
  resumePath: '/Leia_Yun_Resume.pdf',
  photo: '/images/leia.webp',
  tagline: 'pm & builder — turning ideas into impact',
};

export const SOCIAL_LINKS = [
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/leia-yun-s/' },
  { label: 'GitHub', href: 'https://github.com/leiassyun' },
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
  tags?: string[];
  subProjects: SubProject[];
}

export const EXPERIENCE: ExperienceItem[] = [
  {
    company: 'TikTok',
    url: 'https://lifeattiktok.com/',
    role: 'Client Solutions Manager Intern',
    date: 'May 2026–Present',
    subtitle: 'Partnering with Sales and cross-functional teams on campaign optimization and competitive strategy for advertisers.',
    tags: ['Global Business Solutions', 'Campaign Optimization', 'Competitive Analysis', 'Cross-functional'],
    subProjects: [
      {
        title: 'Overview',
        chat: [
          'this is my current role — **client solutions manager intern** at tiktok',
          "i'm currently working on it, so more to share soon :)",
        ],
      },
    ],
  },
  {
    company: 'Planfit',
    url: 'https://planfit.ai/en',
    role: 'Product Manager Intern → Builder',
    date: 'Mar–Dec 2025',
    subtitle: 'Owned 5 product tracks end-to-end — from problem discovery to deployment.',
    detailPath: '/work/planfit',
    tags: ['0→1 Product', '4M+ Users', '+15% Subscription', 'End-to-End Ownership', 'Claude Code', 'Amplitude'],
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
    subtitle: 'Built resume classification and RAG pipeline for an AI career coaching platform — from zero AI infra.',
    detailPath: '/work/parachute',
    tags: ['AI Infra from Zero', 'RAG Pipeline', 'Resume Classifier', 'LangChain', 'GPT API'],
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
];

// ─── Projects ────────────────────────────────────────────────────
export interface ProjectItem {
  name: string;
  sub: string;
  tags?: string[];
  detailPath?: string;
  cover?: string;
  chat: string[];
}

export const PROJECTS: ProjectItem[] = [
  {
    name: 'myIndigo',
    sub: 'real-time audio awareness for deaf & hard-of-hearing users — gemini + google adk',
    tags: ['Accessibility', 'Gemini 2.5 Flash', 'Google ADK', 'Hackathon'],
    detailPath: '/work/indigo',
    cover: '/images/indigo-cover.webp',
    chat: [
      'built a **real-time audio awareness app** for deaf and hard-of-hearing users',
      'your phone listens, classifies sounds with **gemini 2.5 flash**, and sends **actionable alerts** to your watch',
      'emergency sirens → "move to the right, fire truck approaching"',
      'built in **36 hours** at nyc build with ai hackathon @ nyu tandon',
    ],
  },
  {
    name: 'CulinAI',
    sub: 'an AI-powered site that generates recipes from a photo of your fridge or food items.',
    tags: ['Multimodal AI', 'Food Waste Reduction', 'LLaVA', 'SDXL-Turbo'],
    detailPath: '/work/culinai',
    cover: '/images/culinai-cover.webp',
    chat: [
      'built an **ai recipe app**',
      'you upload a photo of ingredients and it turns that into a **usable recipe**',
      'used **multimodal models + prompt tuning** to make outputs actually useful',
      'the goal was to help **reduce food waste**',
    ],
  },
];

// ─── About (greeting bubbles) ────────────────────────────────────
export const ABOUT_INTRO = [
  "hi! i'm leia — cs + data science @ nyu",
  "i build products and turn user behavior into data-driven decisions",
  "most recently at planfit, i owned features end-to-end and ran 40+ experiments to improve activation and conversion",
  "click anything if you're curious :)",
];

// ─── Nav ─────────────────────────────────────────────────────────
export interface NavSubItem {
  label: string;
  href: string;
}

export interface NavItem {
  label: string;
  href: string;
  items?: NavSubItem[];
}

export const NAV_ITEMS: NavItem[] = [
  { label: 'About', href: '#about' },
  {
    label: 'Experience',
    href: '#experience',
    items: [
      { label: 'TikTok', href: '#experience' },
      { label: 'Planfit', href: '/work/planfit' },
      { label: 'Parachute', href: '/work/parachute' },
    ],
  },
  {
    label: 'Projects',
    href: '#projects',
    items: [
      { label: 'myIndigo', href: '/work/indigo' },
      { label: 'CulinAI', href: '/work/culinai' },
    ],
  },
  { label: 'Contact', href: '#contact' },
];
