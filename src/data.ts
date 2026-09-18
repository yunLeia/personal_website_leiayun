// ─── Site ────────────────────────────────────────────────────────
export const SITE = {
  name: 'Leia Yun',
  email: 'sy3544@nyu.edu',
  resumePath: '/Leia_Yun_Resume.pdf',
  photo: '/images/leia.webp',
  photoHalftone: '/images/leia-dots.png',
  tagline: 'ai & product engineer, turning ideas into impact',
};

export const SOCIAL_LINKS = [
  { label: 'Calendly (15-min chat)', href: 'https://calendly.com/leia-yun-s/15-minute-meeting' },
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
    role: 'Client Solution Manager Intern',
    date: 'May-Aug 2026',
    subtitle: 'Built AI-powered workflows for internal teams and enterprise clients.',
    tags: ['AI Workflow Automation', 'Internal Tooling', 'Cross-functional Builder', '170+ Daily Adoption'],
  },
  {
    company: 'Planfit',
    url: 'https://planfit.ai/en',
    logo: '/images/planfit-logo.png',
    role: 'Product Engineer Intern',
    date: 'Mar–Dec 2025',
    subtitle: 'Owned 5 product tracks end-to-end, from problem discovery to deployment.',
    detailPath: '/work/planfit',
    tags: ['0→1 Product', '4M+ Users', '+15% Subscription', 'End-to-End Ownership', 'Claude Code', 'Amplitude'],
  },
  {
    company: 'Parachute',
    logo: '/images/parachute-logo.jpeg',
    role: 'AI Engineer Intern',
    date: 'Mar–Jun 2024',
    subtitle: 'Built resume classification and RAG pipeline for an AI career coaching platform, starting from zero AI infra.',
    detailPath: '/work/parachute',
    tags: ['AI Infra from Zero', 'RAG Pipeline', 'Resume Classifier', 'LangChain', 'GPT API'],
  },
];

// ─── Projects ────────────────────────────────────────────────────
export interface ProjectItem {
  name: string;
  sub: string;
  tags?: string[];
  detailPath: string;
  cover?: string;
}

export const PROJECTS: ProjectItem[] = [
  {
    name: 'GatheRoll',
    sub: "everyone's photos from one event, in one shared album. Scan a QR, bulk-add your photos, and GatheRoll handles the rest.",
    tags: ['0→1 Product', 'Computer Vision', 'Next.js', 'FastAPI'],
    detailPath: '/work/gatheroll',
    cover: '/images/gatheroll-thumbnail.png',
  },
  {
    name: 'myIndigo',
    sub: 'real-time audio awareness for deaf & hard-of-hearing users, built with gemini + google adk',
    tags: ['Accessibility', 'Gemini 2.5 Flash', 'Google ADK', 'Hackathon'],
    detailPath: '/work/indigo',
    cover: '/images/myindigo-thumbnail.png',
  },
  {
    name: 'CulinAI',
    sub: 'an AI-powered site that generates recipes from a photo of your fridge or food items.',
    tags: ['Multimodal AI', 'Food Waste Reduction', 'LLaVA', 'SDXL-Turbo'],
    detailPath: '/work/culinai',
    cover: '/images/culinai-thumbnail.png',
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
      { label: 'TikTok', href: '#experience' },
      { label: 'Planfit', href: '/work/planfit' },
      { label: 'Parachute', href: '/work/parachute' },
    ],
  },
  {
    label: 'Projects',
    href: '#projects',
    items: [
      { label: 'GatheRoll', href: '/work/gatheroll' },
      { label: 'myIndigo', href: '/work/indigo' },
      { label: 'CulinAI', href: '/work/culinai' },
    ],
  },
  { label: 'Shelf', href: '#shelf' },
  { label: 'Contact', href: '#contact' },
];
