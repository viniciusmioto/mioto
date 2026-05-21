import Link from 'next/link';
import { talks } from '../../lib/data';
import { SectionHeading } from '../../components/SectionHeading';

export default function TalksPage() {
  return (
    <div className="page-shell">
      <SectionHeading title="Talks" description="Recent presentations and invited talks." />
      {talks.length === 0 ? (
        <div className="empty-state">
          <p>No talks are published yet. Check back soon for updates.</p>
        </div>
      ) : (
        <div className="grid-card-list">
          {talks.map((talk) => (
            <article key={talk.title} className="card">
              <h3>{talk.title}</h3>
              <p className="meta-line">{talk.event} • {talk.date}</p>
              <p>{talk.abstract}</p>
            </article>
          ))}
        </div>
      )}
      <div className="page-actions">
        <Link className="button" href="/">Back to home</Link>
      </div>
    </div>
  );
}
