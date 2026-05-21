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

export const publications: Publication[] = [
  {
    slug: 'gas2025',
    title: 'A Mapping of Recording-based Game Test Automation Tools',
    authors: ['Vinicius Mioto', 'Fabio Petrillo'],
    date: '2025-04-29',
    venue: '2025 IEEE/ACM 9th International Workshop on Games and Software Engineering (GAS)',
    summary:
      'This paper maps recording-based game test automation tools, comparing general-purpose and game-specific solutions to support scalable, reliable testing workflows.',
    tags: ['Software Engineering'],
    featured: true,
    doi: '10.1109/GAS66647.2025.00006',
  },
  {
    slug: 'brasnam2025',
    title: 'Beyond Boundaries: Collaboration Networks and Research Output in Brazilian Computer Science',
    authors: ['Vinicius Mioto', 'André Vignatti'],
    date: '2025-07-29',
    venue: 'Accepted for the XIV Brazilian Workshop on Social Network Analysis and Mining (BraSNAM2025)',
    summary:
      'Analysis of Brazilian computer science collaboration networks using OpenAlex data, highlighting international engagement and subfield differences in co-authorship patterns.',
    tags: ['Network Science'],
    featured: true,
    doi: '10.5753/brasnam.2025.8329',
    pdf: 'https://sol.sbc.org.br/index.php/brasnam/article/view/36367/36154',
  },
  {
    slug: 'conpet2021',
    title: 'ADEGA: Análise de Dados Estatísticos da Grade Acadêmica',
    authors: [
      'Ana P. A. Sodré',
      'Bruno H. Meyer',
      'Bruno M. Junior',
      'Henrique Margotte',
      'Matheus P. de Miranda',
      'Odair M. D. Junior',
      'Pedro P. de Andrade',
      'Tiago S. Valadares',
      'Vinicius Mioto',
    ],
    date: '2021-11-17',
    venue: 'Revista ComInG - Communications and Innovations Gazette (CONPET2021)',
    summary:
      'DESCRIBE ADEGA, a system for analyzing academic grade data and generating reports for course coordination and student risk assessment.',
    tags: ['Data Science'],
    featured: true,
    doi: '10.5902/2448190467933',
    pdf: 'https://periodicos.ufsm.br/coming/article/view/67933/pdf',
  },
];

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
