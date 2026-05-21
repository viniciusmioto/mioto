import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';
import { AuthorProfile, Publication } from './data';

/**
 * Convert a markdown string to an HTML string.
 */
function renderMarkdown(markdown: string): string {
  const result = remark().use(html, { sanitize: false }).processSync(markdown);
  return String(result);
}

const contentDirectory = path.join(process.cwd(), 'content');

/**
 * Parse content/hero.md and return a typed AuthorProfile.
 * Runs at build time only (called from Server Components).
 */
export function getHeroData(): AuthorProfile {
  const filePath = path.join(contentDirectory, 'hero.md');
  const fileContents = fs.readFileSync(filePath, 'utf-8');
  const { data, content } = matter(fileContents);

  return {
    name: data.name,
    role: data.role,
    avatar: data.avatar,
    description: renderMarkdown(content.trim()),
    email: data.email,
    github: data.github,
    linkedin: data.linkedin,
    scholar: data.scholar,
    orcid: data.orcid,
    organizations: data.organizations ?? [],
    interests: data.interests ?? [],
    education: data.education ?? [],
    work: data.work ?? [],
  };
}

/**
 * Read all markdown files in content/publications and return them sorted by date (newest first).
 */
export function getAllPublications(): Publication[] {
  const publicationsDirectory = path.join(contentDirectory, 'publications');
  
  // Get all folders inside content/publications
  let folderNames: string[] = [];
  try {
    folderNames = fs.readdirSync(publicationsDirectory).filter((name) => {
      const folderPath = path.join(publicationsDirectory, name);
      return fs.statSync(folderPath).isDirectory();
    });
  } catch (error) {
    console.error("Could not read publications directory", error);
    return [];
  }

  const publicationsData: Publication[] = folderNames.map((slug) => {
    const fullPath = path.join(publicationsDirectory, slug, 'index.md');
    
    if (!fs.existsSync(fullPath)) {
      return null;
    }

    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const { data, content } = matter(fileContents);

    // Extract PDF link from links array if available
    let pdfUrl = undefined;
    if (data.links && Array.isArray(data.links)) {
      const pdfLink = data.links.find((link: any) => link.type === 'pdf');
      if (pdfLink) {
        pdfUrl = pdfLink.url;
      }
    }

    return {
      slug,
      title: data.title,
      authors: data.authors ?? [],
      date: data.date,
      venue: data.publication ?? data.publication_short ?? '',
      summary: data.summary ?? '',
      abstract: data.abstract ?? '',
      body: renderMarkdown(content.trim()),
      tags: data.tags ?? [],
      featured: data.featured ?? false,
      doi: data.doi,
      pdf: pdfUrl,
    } as Publication;
  }).filter(Boolean) as Publication[];

  // Sort publications by date in descending order
  return publicationsData.sort((a, b) => {
    if (a.date < b.date) {
      return 1;
    } else {
      return -1;
    }
  });
}
