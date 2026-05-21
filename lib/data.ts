export interface AuthorProfile {
  name: string;
  role: string;
  avatar: string;
  description: string;
  email: string;
  github: string;
  linkedin: string;
  scholar: string;
  orcid: string;
  organizations: { name: string; url: string }[];
  interests: string[];
  education: { area: string; institution: string; date_start: string; date_end: string }[];
  work: { position: string; company_name: string; company_url: string; date_start: string; date_end?: string }[];
}

export interface Publication {
  slug: string;
  title: string;
  authors: string[];
  date: string;
  venue: string;
  summary: string;
  abstract?: string;
  body?: string;
  tags: string[];
  featured: boolean;
  doi?: string;
  pdf?: string;
}

export interface Project {
  slug: string;
  title: string;
  summary: string;
  details: string;
  tags: string[];
  projectUrl?: string;
  image?: string;
}

export interface Talk {
  title: string;
  event: string;
  date: string;
  location: string;
  abstract: string;
}

export const projects: Project[] = [
  {
    slug: 'network-analysis',
    title: 'Social Network Analysis',
    summary:
      'Undergraduate research in network science and representation learning for frequent subgraph mining, with advisor support from André Luís Vignatti.',
    details:
      'This project began in 2021 with a study of power-law graph recognition and now focuses on representation learning for frequent subgraph mining. It combines network science, graph learning, and reproducible research practices using GitHub-hosted experiments.',
    tags: ['Data Science', 'Network Science'],
    projectUrl: 'https://github.com/viniciusmioto/social_networks_analysis',
    image: '/network_analysis.png',
  },
];

export const talks: Talk[] = [];
