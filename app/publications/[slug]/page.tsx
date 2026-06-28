import { notFound } from 'next/navigation';
import { getAllPublications } from '../../../lib/content';
import { SectionHeading } from '../../../components/SectionHeading';
import Link from 'next/link';

export async function generateStaticParams() {
  const publications = await getAllPublications();
  return publications.map((publication) => ({ slug: publication.slug }));
}

export default async function PublicationPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const publications = await getAllPublications();
  const publication = publications.find((item) => item.slug === resolvedParams.slug);

  if (!publication) {
    notFound();
  }

  const { default: Post } = await import(`../../../content/publications/${resolvedParams.slug}/index.md`);

  return (
    <div className="page-shell">
      <SectionHeading title={publication.title} description={publication.summary} />
      <div className="publication-detail">
        <p className="meta-line">
          <strong>Publication</strong> {publication.venue}
        </p>
        <p className="meta-line">
          <strong>Authors</strong> {publication.authors.join(', ')}
        </p>
        <p className="meta-line">
          <strong>Date</strong> {publication.date}
        </p>
        <div className="tag-list">
          {publication.tags.map((tag) => (
            <span key={tag} className="tag">{tag}</span>
          ))}
        </div>
        <div className="publication-links">
          {publication.pdf ? (
            <Link className="meta-link" href={publication.pdf} target="_blank" rel="noreferrer">
              View PDF
            </Link>
          ) : null}
          {publication.doi ? (
            <Link className="meta-link" href={`https://doi.org/${publication.doi.replace('https://doi.org/', '')}`} target="_blank" rel="noreferrer">
              DOI link
            </Link>
          ) : null}
        </div>

        {publication.abstract && (
          <div className="publication-abstract" style={{ marginTop: '2rem' }}>
            <h3>Abstract</h3>
            <p>{publication.abstract}</p>
          </div>
        )}

          <div className="publication-body" style={{ marginTop: '2rem' }}>
            <Post />
          </div>
      </div>
      <div className="page-actions">
        <Link className="button button-secondary" href="/publications">
          Back to publications
        </Link>
      </div>
    </div>
  );
}
