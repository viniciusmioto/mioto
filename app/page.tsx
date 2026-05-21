import Link from 'next/link';
import { author, publications, projects } from '../lib/data';
import { SectionHeading } from '../components/SectionHeading';
import { Card } from '../components/Card';

const featuredPublications = publications.filter((publication) => publication.featured).slice(0, 3);

export default function HomePage() {
  return (
    <div className="page-shell">
      <section className="hero-card">
        <div className="hero-copy">
          <p className="eyebrow">Hi, I'm</p>
          <h1>{author.name}</h1>
          <p className="hero-description">{author.role} at {author.organizations[0].name}, building research and tools for AI, data science, software engineering, and network science.</p>
          <div className="hero-actions">
            <Link className="button" href="/cv">View CV</Link>
            <Link className="button button-secondary" href="/publications">Publications</Link>
          </div>
        </div>
        <div className="hero-image">
          <img src="/avatar.jpg" alt="Profile photo of Vinicius Mioto" />
        </div>
      </section>

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
  );
}
