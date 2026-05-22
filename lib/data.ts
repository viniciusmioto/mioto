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
  date: string;
  website?: string;
  github?: string;
  summary: string;
  body: string;
  tags: string[];
  image?: string;
}

export interface Blog {
  title: string;
  event: string;
  date: string;
  location: string;
  abstract: string;
}

export const blog: Blog[] = [];
