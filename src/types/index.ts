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
  location: string;
  date: string;
  role: string;
  skills: string[];
  subTeams?: SubTeam[];
  bullets?: Bullet[];
}

export interface ProjectRow {
  name: string;
  desc: string;
  metric: string;
  sub: string;
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
