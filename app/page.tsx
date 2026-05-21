import Link from 'next/link';
import { projects } from '../lib/data';
import { getHeroData, getAllPublications } from '../lib/content';
import { Hero } from '../components/Hero';
import { SectionHeading } from '../components/SectionHeading';
import { Card } from '../components/Card';
import { PublicationListItem } from '../components/PublicationListItem';

export default function HomePage() {
  const author = getHeroData();
  const allPublications = getAllPublications();
  const topPublications = allPublications.slice(0, 5);

  return (
    <>
      <Hero author={author} />
      <div className="page-shell">

      <section>
        <SectionHeading title="Recent publications" />
        <div className="single-column-list">
          {topPublications.map((publication) => (
            <PublicationListItem key={publication.slug} publication={publication} />
          ))}
        </div>
        <div className="section-actions" style={{ marginTop: '1.5rem' }}>
          <Link className="button button-secondary" href="/publications">
            View all publications
          </Link>
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
