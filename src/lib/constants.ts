import type { ExperienceItem, ProjectItem, SkillItem, ContactItem } from '../types';

export const SITE = {
  name: 'Leia Yun',
  tag: 'Product · Engineering · NYU CS',
  tagline: 'I find the problem. I run the experiment. I ship the fix.',
  email: 'sy3544@nyu.edu',
  linkedin: 'https://linkedin.com/in/leiayun',
  github: 'https://github.com/leiayun',
  resume: '/Leia_Yun_Resume.pdf',
};

export const EDUCATION = {
  school: 'New York University',
  college: 'College of Arts and Science',
  degree: 'Bachelor of Arts in Computer Science and Data Science',
  expected: 'Expected 2027',
  gpa: '3.8 / 4.0',
  orgs: 'LikeLion@NYU (Vice President), Tech@NYU (TrekTrack), Product Management Club',
  coursework: 'Agile Software and DevOps, Operating System, Basic Algo, Natural Language Processing, Programming Tools for Data Scientist, Principle of Data Science, Linear Algebra, Discrete Math',
};

export const EXPERIENCE: ExperienceItem[] = [
  {
    company: 'Planfit',
    team: 'Activation/Subscription Team',
    date: 'Mar 2025 – Dec 2025',
    role: 'Product Owner Intern',
    bullets: [
      'Owned 30+ full-cycle sprints, leading problem discovery, KPI definition, PRD writing, cross-functional execution, and technical QAs, while driving data-informed iterations through Amplitude/SQL analysis',
      'Launched an end-to-end leaderboard features as the Sole Builder, leveraging AI-augmented workflows (Claude Code, MCPs, Figma Dev) to increase the engagement by 20% and generate 1,000+ user-created clubs',
      'Conducted 30+ user interviews and market research, translating insights into prioritized product roadmaps',
    ],
  },
  {
    company: 'Parachute',
    date: 'Mar 2024 – Jun 2024',
    role: 'AI Engineering Intern',
    bullets: [
      'Developed a RAG-based resume processing system featuring Python ETL pipelines for automated data extraction, improving mentor-mentee matching speed by 18% by reducing manual parsing overhead',
    ],
  },
];

export const PROJECTS: ProjectItem[] = [
  {
    name: 'Automated A/B Testing System',
    stack: 'Make.com, GPT API, Django REST APIs, React Native, Amplitude',
    date: 'May – Jun 2025',
    desc: 'Full-stack A/B testing system that automatically rotates variants based on performance, driving localized paywall optimization.',
    metric: '+15% CTR',
    metricSub: '+10% conversion',
  },
  {
    name: 'CulinAI',
    stack: 'JavaScript, Node.js, Replicate API, LLaVa, SDXL-Turbo',
    date: 'Jan – May 2024',
    desc: 'AI-powered recipe generation platform that converts user-uploaded images into personalized recipes to reduce food waste.',
    metric: '<2s',
    metricSub: 'latency',
  },
];

export const SKILLS: SkillItem[] = [
  {
    category: 'Languages',
    values: 'Java, JavaScript, Python, SQL, HTML/CSS, SwiftUI, React/Native, Django, Node.js',
  },
  {
    category: 'Tools',
    values: 'Linear, Amplitude, Figma, Make.com, Zapier, Firebase, AWS, Docker, Xcode, GitHub',
  },
];

export const AWARDS = [
  { name: 'NYU CAS Dean\'s List', date: 'May 2024' },
  { name: 'Google: Troubleshooting and Debugging Techniques', date: 'Jan 2023' },
];

export const CONTACTS: ContactItem[] = [
  {
    category: 'Email',
    label: 'sy3544@nyu.edu',
    href: 'mailto:sy3544@nyu.edu',
  },
  {
    category: 'LinkedIn',
    label: 'linkedin.com/in/leiayun',
    href: 'https://linkedin.com/in/leiayun',
    external: true,
  },
  {
    category: 'GitHub',
    label: 'github.com/leiayun',
    href: 'https://github.com/leiayun',
    external: true,
  },
  {
    category: 'Resume',
    label: 'Download PDF',
    href: '/Leia_Yun_Resume.pdf',
    download: true,
  },
];
