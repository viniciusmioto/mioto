import Link from 'next/link';
import { getAllPublications } from '../../lib/content';
import { SectionHeading } from '../../components/SectionHeading';
import { PublicationListItem } from '../../components/PublicationListItem';

export default function PublicationsPage() {
  const publications = getAllPublications();

  return (
    <div className="page-shell">
      <SectionHeading title="Publications" />
      <div className="single-column-list">
        {publications.map((publication) => (
          <PublicationListItem key={publication.slug} publication={publication} />
        ))}
      </div>
      <div className="page-actions">
        <Link className="button" href="/">Back to home</Link>
      </div>
    </div>
  );
}
