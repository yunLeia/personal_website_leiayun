import type {
  AboutData,
  ContactData,
  Experience,
  HeroData,
  Project,
} from '../types';

export const HERO_DATA: HeroData = {
  greeting: 'Hi, I\'m',
  name: 'Leia Yun',
  tagline: 'Software engineer building thoughtful, user-focused products on the web.',
  cta: {
    label: 'View My Work',
    href: '#projects',
  },
};

export const ABOUT_DATA: AboutData = {
  heading: 'About Me',
  paragraphs: [
    'I\'m a software engineer passionate about creating elegant solutions to complex problems. I enjoy working across the full stack, from crafting pixel-perfect interfaces to designing robust backend systems.',
    'When I\'m not coding, you can find me exploring new technologies, contributing to open-source projects, or enjoying a good book.',
  ],
  skills: [
    {
      category: 'Languages',
      items: ['TypeScript', 'JavaScript', 'Python', 'Go'],
    },
    {
      category: 'Frontend',
      items: ['React', 'Next.js', 'Tailwind CSS', 'HTML/CSS'],
    },
    {
      category: 'Backend',
      items: ['Node.js', 'PostgreSQL', 'Redis', 'REST APIs'],
    },
    {
      category: 'Tools',
      items: ['Git', 'Docker', 'AWS', 'CI/CD'],
    },
  ],
};

export const PROJECTS: Project[] = [
  {
    id: 'project-1',
    title: 'Cloud Dashboard',
    description:
      'A real-time monitoring dashboard for cloud infrastructure with interactive charts, alerting, and team collaboration features.',
    tags: ['React', 'TypeScript', 'D3.js', 'WebSocket'],
    href: 'https://example.com/cloud-dashboard',
    repo: 'https://github.com/leiayun/cloud-dashboard',
  },
  {
    id: 'project-2',
    title: 'TaskFlow',
    description:
      'A project management tool with drag-and-drop Kanban boards, sprint planning, and automated workflow triggers.',
    tags: ['Next.js', 'PostgreSQL', 'Prisma', 'Tailwind CSS'],
    href: 'https://example.com/taskflow',
    repo: 'https://github.com/leiayun/taskflow',
  },
  {
    id: 'project-3',
    title: 'DevBlog Engine',
    description:
      'A statically generated blog platform with MDX support, syntax highlighting, and full-text search.',
    tags: ['Astro', 'MDX', 'TypeScript', 'Algolia'],
    repo: 'https://github.com/leiayun/devblog-engine',
  },
  {
    id: 'project-4',
    title: 'API Gateway',
    description:
      'A lightweight API gateway with rate limiting, request validation, and automatic OpenAPI documentation generation.',
    tags: ['Go', 'Docker', 'Redis', 'OpenAPI'],
    repo: 'https://github.com/leiayun/api-gateway',
  },
];

export const EXPERIENCES: Experience[] = [
  {
    id: 'exp-1',
    company: 'Acme Corp',
    role: 'Senior Software Engineer',
    startDate: '2023-01',
    endDate: 'Present',
    description:
      'Leading frontend architecture for the core product platform.',
    highlights: [
      'Migrated legacy jQuery codebase to React, reducing bundle size by 40%',
      'Designed and implemented a component library used by 5 product teams',
      'Mentored 3 junior engineers through structured onboarding program',
    ],
  },
  {
    id: 'exp-2',
    company: 'Startup Inc',
    role: 'Full Stack Engineer',
    startDate: '2021-06',
    endDate: '2022-12',
    description:
      'Built and maintained features across the entire product stack.',
    highlights: [
      'Developed real-time collaboration features using WebSocket connections',
      'Reduced API response times by 60% through query optimization and caching',
      'Implemented CI/CD pipelines that cut deployment time from 45 to 8 minutes',
    ],
  },
  {
    id: 'exp-3',
    company: 'Tech Solutions',
    role: 'Software Engineer',
    startDate: '2019-08',
    endDate: '2021-05',
    description:
      'Worked on client-facing web applications and internal tooling.',
    highlights: [
      'Built an internal admin dashboard serving 200+ daily active users',
      'Created automated testing suite achieving 85% code coverage',
      'Contributed to open-source libraries used across the organization',
    ],
  },
];

export const CONTACT_DATA: ContactData = {
  heading: 'Get In Touch',
  subheading:
    'I\'m always open to new opportunities, collaborations, or just a friendly chat. Feel free to reach out!',
  email: 'hello@leiayun.com',
};
