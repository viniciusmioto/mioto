import { notFound } from 'next/navigation';
import { publications } from '../../../lib/data';
import { SectionHeading } from '../../../components/SectionHeading';
import Link from 'next/link';

export function generateStaticParams() {
  return publications.map((publication) => ({ slug: publication.slug }));
}

export default function PublicationPage({ params }: { params: any }) {
  const publication = publications.find((item) => item.slug === params.slug);
  if (!publication) {
    notFound();
  }

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
          <strong>Date</strong> {publication.date}</p>
        <div className="tag-list">
          {publication.tags.map((tag) => (
            <span key={tag} className="tag">{tag}</span>
          ))}
        </div>
        <div className="publication-links">
          {publication.pdf ? (
            <Link className="meta-link" href={publication.pdf} target="_blank" rel="noreferrer">
              Download PDF
            </Link>
          ) : null}
          {publication.doi ? (
            <Link className="meta-link" href={`https://doi.org/${publication.doi}`} target="_blank" rel="noreferrer">
              DOI link
            </Link>
          ) : null}
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
