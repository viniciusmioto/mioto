import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';
import { AuthorProfile, Publication, Project } from './data';

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
      if (pdfLink && pdfLink.url) {
        let url = pdfLink.url;
        
        // Best practice: if the PDF is co-located with the markdown file, copy it to the public directory
        if (!url.startsWith('http')) {
          // Extract just the filename in case the user provided a full path
          const fileName = path.basename(url);
          const srcPdf = path.join(publicationsDirectory, slug, fileName);
          
          if (fs.existsSync(srcPdf)) {
            const destDir = path.join(process.cwd(), 'public', 'publications', slug);
            fs.mkdirSync(destDir, { recursive: true });
            const destPdf = path.join(destDir, fileName);
            fs.copyFileSync(srcPdf, destPdf);
            url = `/publications/${slug}/${fileName}`;
          }
        }
        
        pdfUrl = url;
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

/**
 * Read all markdown files in content/projects and return them sorted by date (newest first).
 */
export function getAllProjects(): Project[] {
  const projectsDirectory = path.join(contentDirectory, 'projects');
  
  let folderNames: string[] = [];
  try {
    if (fs.existsSync(projectsDirectory)) {
      folderNames = fs.readdirSync(projectsDirectory).filter((name) => {
        const folderPath = path.join(projectsDirectory, name);
        return fs.statSync(folderPath).isDirectory();
      });
    }
  } catch (error) {
    console.error("Could not read projects directory", error);
    return [];
  }

  const projectsData: Project[] = folderNames.map((slug) => {
    const fullPath = path.join(projectsDirectory, slug, 'index.md');
    
    if (!fs.existsSync(fullPath)) {
      return null;
    }

    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const { data, content } = matter(fileContents);

    // Look for featured image and copy to public directory if found
    let imagePath = undefined;
    const imgNames = ['featured.png', 'feature.png', 'featured.jpg', 'feature.jpg', 'featured.jpeg', 'feature.jpeg'];
    for (const imgName of imgNames) {
      const srcImg = path.join(projectsDirectory, slug, imgName);
      if (fs.existsSync(srcImg)) {
        const destDir = path.join(process.cwd(), 'public', 'projects', slug);
        fs.mkdirSync(destDir, { recursive: true });
        const destImg = path.join(destDir, imgName);
        fs.copyFileSync(srcImg, destImg);
        imagePath = `/projects/${slug}/${imgName}`;
        break;
      }
    }

    return {
      slug,
      title: data.title,
      date: data.date ? String(data.date) : '',
      website: data.website || undefined,
      github: data.github || undefined,
      summary: data.summary ?? '',
      body: renderMarkdown(content.trim()),
      tags: data.tags ?? [],
      image: imagePath,
    } as Project;
  }).filter(Boolean) as Project[];

  // Sort projects by date in descending order
  return projectsData.sort((a, b) => {
    if (a.date < b.date) {
      return 1;
    } else {
      return -1;
    }
  });
}

