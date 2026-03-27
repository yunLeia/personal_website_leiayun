import type { NavLink, SocialLink } from '../types';

export const SITE_NAME = 'Leia Yun';

export const SITE_URL = 'https://www.leiayun.com';

export const SITE_DESCRIPTION =
  'Personal portfolio of Leia Yun — software engineer.';

export const NAV_LINKS: NavLink[] = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Projects', href: '#projects' },
  { label: 'Experience', href: '#experience' },
  { label: 'Contact', href: '#contact' },
];

export const SOCIAL_LINKS: SocialLink[] = [
  { label: 'GitHub', href: 'https://github.com/leiayun', icon: 'github' },
  { label: 'LinkedIn', href: 'https://linkedin.com/in/leiayun', icon: 'linkedin' },
  { label: 'Email', href: 'mailto:hello@leiayun.com', icon: 'mail' },
];
