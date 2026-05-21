import Link from 'next/link';
import { projects } from '../../lib/data';
import { SectionHeading } from '../../components/SectionHeading';
import { Card } from '../../components/Card';

export default function ProjectsPage() {
  return (
    <div className="page-shell">
      <SectionHeading title="Projects" description="Practical work and research projects with code, data, and results." />
      <div className="grid-card-list">
        {projects.map((project) => (
          <Card key={project.slug} title={project.title} description={project.summary} href={`/projects/${project.slug}`} tags={project.tags} />
        ))}
      </div>
      <div className="page-actions">
        <Link className="button" href="/">Back to home</Link>
      </div>
    </div>
  );
}
