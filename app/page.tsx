import Link from 'next/link';
import HeroContent from '../content/hero.md';
import { getHeroData, getAllPublications, getAllProjects, getAllBlogs } from '../lib/content';
import { Hero } from '../components/Hero';
import { SectionHeading } from '../components/SectionHeading';
import { Card } from '../components/Card';
import { PublicationListItem } from '../components/PublicationListItem';
import { BlogCard } from '../components/BlogCard';

export default async function HomePage() {
  const author = await getHeroData();
  const allPublications = await getAllPublications();
  const topPublications = allPublications.slice(0, 5);
  const allProjects = await getAllProjects();
  const topProjects = allProjects.slice(0, 3);
  const allBlogs = getAllBlogs();
  const topBlogs = allBlogs.slice(0, 3);

  return (
    <>
      <Hero author={author}>
        <HeroContent />
      </Hero>
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
        <SectionHeading title="Recent blog posts" />
        <div className="single-column-list">
          {topBlogs.map((post) => (
            <BlogCard key={post.slug} post={post} />
          ))}
        </div>
        <div className="section-actions" style={{ marginTop: '1.5rem' }}>
          <Link className="button button-secondary" href="/blog">
            View all blogs
          </Link>
        </div>
      </section>

      {/* <section>
        <SectionHeading title="Selected projects" description="" />
        <div className="grid-card-list">
          {topProjects.map((project) => (
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
        <div className="section-actions" style={{ marginTop: '1.5rem' }}>
          <Link className="button button-secondary" href="/projects">
            View full portfolio
          </Link>
        </div>
      </section> */}
    </div>
      </>
  );
}

