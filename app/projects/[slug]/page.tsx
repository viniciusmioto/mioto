import { notFound } from 'next/navigation';
import { getAllProjects } from '../../../lib/content';
import { SectionHeading } from '../../../components/SectionHeading';
import Link from 'next/link';
import Image from 'next/image';

export async function generateStaticParams() {
  const projects = await getAllProjects();
  return projects.map((project) => ({ slug: project.slug }));
}

export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const projects = await getAllProjects();
  const project = projects.find((item) => item.slug === resolvedParams.slug);

  if (!project) {
    notFound();
  }

  const { default: Post } = await import(`../../../content/projects/${resolvedParams.slug}/index.md`);

  return (
    <div className="page-shell">
      <SectionHeading title={project.title} description={project.summary} />
      
      <div className="project-detail">
        {project.image ? (
          <Image className="project-image" src={project.image} alt={project.title} width={1200} height={630} />
        ) : null}

        <div className="project-meta">
          <div className="tag-list">
            {project.tags.map((tag) => (
              <span key={tag} className="tag">{tag}</span>
            ))}
          </div>

          {(project.website || project.github) && (
          <div className="project-links" style={{ display: 'flex', gap: '1rem', marginTop: '1.5rem', marginBottom: '1.5rem' }}>
              {project.website && (
                <a className="meta-link" href={project.website} target="_blank" rel="noreferrer">
                  Website
                </a>
              )}
              {project.github && (
                <a className="meta-link" href={project.github} target="_blank" rel="noreferrer">
                  GitHub Repository
                </a>
              )}
            </div>
          )}

          <div className="project-body" style={{ marginTop: '2rem' }}>
            <Post />
          </div>
        </div>
      </div>

      <div className="page-actions">
        <Link className="button button-secondary" href="/projects">
          Back to projects
        </Link>
      </div>
    </div>
  );
}

