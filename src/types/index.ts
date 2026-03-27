export interface NavLink {
  label: string;
  href: string;
}

export interface SocialLink {
  label: string;
  href: string;
  icon: string;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  tags: string[];
  href?: string;
  repo?: string;
  image?: string;
}

export interface Experience {
  id: string;
  company: string;
  role: string;
  startDate: string;
  endDate: string;
  description: string;
  highlights: string[];
}

export interface Skill {
  category: string;
  items: string[];
}

export interface HeroData {
  greeting: string;
  name: string;
  tagline: string;
  cta: {
    label: string;
    href: string;
  };
}

export interface AboutData {
  heading: string;
  paragraphs: string[];
  skills: Skill[];
}

export interface ContactData {
  heading: string;
  subheading: string;
  email: string;
}
