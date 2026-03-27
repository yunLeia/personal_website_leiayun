export interface ExperienceItem {
  company: string;
  team?: string;
  date: string;
  role: string;
  bullets: string[];
}

export interface ProjectItem {
  name: string;
  stack: string;
  date: string;
  desc: string;
  metric: string;
  metricSub: string;
}

export interface SkillItem {
  category: string;
  values: string;
}

export interface ContactItem {
  category: string;
  label: string;
  href: string;
  external?: boolean;
  download?: boolean;
}
