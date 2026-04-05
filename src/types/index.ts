export interface Bullet {
  text: string;
  metric?: string;
  keywords?: string[];
}

export interface SubTeam {
  label: string;
  bullets: Bullet[];
}

export interface ExperienceItem {
  company: string;
  url?: string;
  date: string;
  role: string;
  skills: string[];
  chat?: string[];
  subTeams?: SubTeam[];
  bullets?: Bullet[];
}

export interface ProjectRow {
  name: string;
  desc: string;
  sub: string;
  chat?: string[];
}

export interface SkillGroup {
  category: string;
  values: string[];
}

export interface ContactLink {
  label: string;
  href: string;
  external?: boolean;
}

export interface AboutContent {
  intro: string[];
  currently: string[];
}
