// ─── Site ────────────────────────────────────────────────────────
export const SITE = {
  name: 'Leia Yun',
  email: 'sy3544@nyu.edu',
  resumePath: 'https://drive.google.com/file/d/1qm-EaJg0X32yqbZfeX1Ird_6rhEQ9duP/view?usp=sharing',
  photo: '/images/leia.webp',
  photoHalftone: '/images/leia-dots.png',
  tagline: 'ai & product engineer, turning ideas into impact',
};

export const SOCIAL_LINKS = [
  { label: 'Calendly (15-min chat)', href: 'https://calendly.com/leia-yun-s/15-min-chat' },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/leia-yun-s/' },
  { label: 'GitHub', href: 'https://github.com/leiassyun' },
];

// ─── Experience ──────────────────────────────────────────────────
export interface ExperienceItem {
  company: string;
  url?: string;
  logo?: string;
  role: string;
  date: string;
  subtitle?: string;
  detailPath: string;
  tags?: string[];
}

export const EXPERIENCE: ExperienceItem[] = [
  {
    company: 'TikTok',
    detailPath: '/work/tiktok',
    url: 'https://lifeattiktok.com/',
    logo: '/images/tiktok-logo.png',
    role: 'Client Solutions Manager Intern',
    date: 'May-Aug 2026',
    subtitle: 'Found bottlenecks in repetitive Sales workflows and built AI systems that saved time and drove better decisions',
    tags: ['AI Workflow Automation', 'Internal Tooling', 'Cross-functional Builder', '170+ Daily Adoption'],
  },
  {
    company: 'Planfit',
    url: 'https://planfit.ai/en',
    logo: '/images/planfit-logo.png',
    role: 'Product Engineer Intern',
    date: 'Mar–Dec 2025',
    subtitle: 'Owned product problems end to end — from discovery through design, engineering, launch, and iteration',
    detailPath: '/work/planfit',
    tags: ['0→1 Product', '4M+ Users', '+8% Subscription', 'End-to-End Ownership', 'Claude Code', 'Amplitude'],
  },
  {
    company: 'Parachute',
    logo: '/images/parachute-logo.jpeg',
    role: 'AI Engineer Intern',
    date: 'Mar–Jun 2024',
    subtitle: 'Built resume classification and RAG pipelines for an AI career coaching platform',
    detailPath: '/work/parachute',
    tags: ['AI Infra from Zero', 'RAG Pipeline', 'Resume Classifier', 'LangChain', 'GPT API'],
  },
];

// ─── Projects ────────────────────────────────────────────────────
export interface ProjectItem {
  name: string;
  // Product site; the name on the homepage links here while the row opens the detail page.
  url?: string;
  sub: string;
  tags?: string[];
  detailPath: string;
  cover?: string;
  // Animated image shown at the top of the detail page; falls back to cover.
  hero?: string;
  // Hidden from the homepage list and nav menu; the detail page still works by URL.
  hidden?: boolean;
}

export const PROJECTS: ProjectItem[] = [
  {
    name: 'Cabine',
    url: 'https://cabine-j7p.pages.dev',
    sub: 'a chrome extension that brings your wardrobe beside an online store, so you can see what you’d wear a new piece with before buying it.',
    tags: ['Chrome Extension', '0→1 Product', 'In Progress'],
    detailPath: '/work/cabine',
    cover: '/images/cabine-thumbnail.png',
    hero: '/images/cabine-hero.webp',
  },
  {
    name: 'myIndigo',
    sub: 'real-time audio awareness for deaf & hard-of-hearing users, built with gemini + google adk',
    tags: ['Accessibility', 'Gemini 2.5 Flash', 'Google ADK', 'Hackathon'],
    detailPath: '/work/indigo',
    cover: '/images/myindigo-thumbnail.png',
    hero: '/images/indigo-hero.webp',
  },
  {
    name: 'CulinAI',
    sub: 'an AI-powered site that generates recipes from a photo of your fridge or food items.',
    tags: ['Multimodal AI', 'Food Waste Reduction', 'LLaVA', 'SDXL-Turbo'],
    detailPath: '/work/culinai',
    cover: '/images/culinai-thumbnail.png',
    hero: '/images/culinai-hero.webp',
  },
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
      { label: 'TikTok', href: '/work/tiktok' },
      { label: 'Planfit', href: '/work/planfit' },
      { label: 'Parachute', href: '/work/parachute' },
    ],
  },
  {
    label: 'Projects',
    href: '#projects',
    items: PROJECTS.filter((project) => !project.hidden).map((project) => ({ label: project.name, href: project.detailPath })),
  },
  { label: 'Shelf', href: '#shelf' },
  { label: 'Contact', href: '#contact' },
];
