import Link from 'next/link';
import { publications } from '../../lib/data';
import { SectionHeading } from '../../components/SectionHeading';
import { Card } from '../../components/Card';

export default function PublicationsPage() {
  return (
    <div className="page-shell">
      <SectionHeading title="Publications" description="Selected publications, conference papers, and research outputs." />
      <div className="grid-card-list">
        {publications.map((publication) => (
          <Card key={publication.slug} title={publication.title} description={publication.summary} href={`/publications/${publication.slug}`} tags={publication.tags} />
        ))}
      </div>
      <div className="page-actions">
        <Link className="button" href="/">Back to home</Link>
      </div>
    </div>
  );
}
