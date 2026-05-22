import Link from 'next/link';
import { getAllProjects } from '../../lib/content';
import { SectionHeading } from '../../components/SectionHeading';
import { Card } from '../../components/Card';

export default function ProjectsPage() {
  const projects = getAllProjects();
  
  return (
    <div className="page-shell">
      <SectionHeading title="Projects" description="Practical work and research projects with code, data, and results." />
      <div className="grid-card-list">
        {projects.map((project) => (
          <Card 
            key={project.slug} 
            title={project.title} 
            description={project.summary} 
            href={`/projects/${project.slug}`} 
            tags={project.tags}
            website={project.website}
            github={project.github}
            image={project.image}
          />
        ))}
      </div>
      <div className="page-actions">
        <Link className="button" href="/">Back to home</Link>
      </div>
    </div>
  );
}

