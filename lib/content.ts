import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { AuthorProfile } from './data';

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
    name: data.title,
    role: data.role,
    avatar: data.avatar,
    description: content.trim(),
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
