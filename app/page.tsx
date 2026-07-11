import Link from 'next/link';
import HeroContent from '../content/hero.md';
import { getHeroData, getAllPublications, getAllProjects, getAllBlogs, getAllNews } from '../lib/content';
import { Hero } from '../components/Hero';
import { SectionHeading } from '../components/SectionHeading';
import { Card } from '../components/Card';
import { PublicationListItem } from '../components/PublicationListItem';
import { BlogCard } from '../components/BlogCard';
import { NewsListItem } from '../components/NewsListItem';

export default async function HomePage() {
  const author = await getHeroData();
  const allPublications = await getAllPublications();
  const topPublications = allPublications.slice(0, 5);
  const allProjects = await getAllProjects();
  const topProjects = allProjects.slice(0, 3);
  const allBlogs = getAllBlogs();
  const topBlogs = allBlogs.slice(0, 3);
  const allNews = await getAllNews();
  const topNews = allNews.slice(0, 10);

  return (
    <>
      <Hero author={author}>
        <HeroContent />
      </Hero>
      <div className="page-shell">

        <section>
          <SectionHeading title="Selected publications" />
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
            <Link className="button button-secondary" href="https://blog.ptidej.net/author/vinicius/" target="_blank" rel="noopener noreferrer">
              View all blogs
            </Link>
          </div>
        </section>

        <section>
          <SectionHeading title="News" />
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
            {topNews.map((newsItem, index) => (
              <NewsListItem key={index} newsItem={newsItem} />
            ))}
          </div>
          <div className="section-actions" style={{ marginTop: '1.5rem' }}>
            <Link className="button button-secondary" href="/news">
              View all news
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

