import Link from 'next/link';
import { publications, projects } from '../lib/data';
import { Hero } from '../components/Hero';
import { SectionHeading } from '../components/SectionHeading';
import { Card } from '../components/Card';

const featuredPublications = publications.filter((publication) => publication.featured).slice(0, 3);

export default function HomePage() {
  return (
    <>
      <Hero />
      <div className="page-shell">

      <section>
        <SectionHeading title="Featured publications" description="Recent work and selected research outputs." />
        <div className="grid-card-list">
          {featuredPublications.map((publication) => (
            <Card key={publication.slug} title={publication.title} description={publication.summary} href={`/publications/${publication.slug}`} tags={publication.tags} />
          ))}
        </div>
      </section>

      <section>
        <SectionHeading title="Selected projects" description="Research and engineering work drawn from current and past collaborations." />
        <div className="grid-card-list">
          {projects.map((project) => (
            <Card key={project.slug} title={project.title} description={project.summary} href={`/projects/${project.slug}`} tags={project.tags} />
          ))}
        </div>
      </section>

      <section>
        <SectionHeading title="More" description="Explore the portfolio and academic record." />
        <div className="split-grid">
          <Link className="panel-link" href="/cv">
            <h3>CV</h3>
            <p>Education, work experience, and profile details.</p>
          </Link>
          <Link className="panel-link" href="/talks">
            <h3>Talks</h3>
            <p>Conference presentations and invited talks.</p>
          </Link>
        </div>
      </section>
    </div>
      </>
  );
}
