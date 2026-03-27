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
  title: string;
  description: string;
  tags: string[];
  href?: string;
  image?: string;
}
