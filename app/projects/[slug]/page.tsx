import { notFound } from 'next/navigation';
import { projects } from '../../../lib/data';
import { SectionHeading } from '../../../components/SectionHeading';
import Link from 'next/link';

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export default function ProjectPage({ params }: { params: any }) {
  const project = projects.find((item) => item.slug === params.slug);
  if (!project) {
    notFound();
  }

  return (
    <div className="page-shell">
      <SectionHeading title={project.title} description={project.summary} />
      <div className="project-detail">
        {project.image ? <img className="project-image" src={project.image} alt={project.title} /> : null}
        <div className="project-meta">
          <p>{project.details}</p>
          <div className="tag-list">
            {project.tags.map((tag) => (
              <span key={tag} className="tag">{tag}</span>
            ))}
          </div>
          {project.projectUrl ? (
            <p>
              <Link className="button" href={project.projectUrl} target="_blank" rel="noreferrer">
                View project
              </Link>
            </p>
          ) : null}
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
