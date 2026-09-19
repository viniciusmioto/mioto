import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLink } from '@fortawesome/free-solid-svg-icons';
import { Publication } from '../lib/data';

interface PublicationListItemProps {
  publication: Publication;
}

export function PublicationListItem({ publication }: PublicationListItemProps) {
  return (
    <div className="pub-list-item">
      <Link href={`/publications/${publication.slug}`} className="pub-title">
        <FontAwesomeIcon icon={faLink} className="title-link-icon" aria-hidden="true" />
        {publication.title}
      </Link>
      
      <p className="pub-authors">{publication.authors.join(', ')}</p>
      
      <p className="pub-venue">
        <span className="pub-year">{new Date(publication.date).getFullYear()}</span> — {publication.venue}
      </p>

      {(publication.pdf || publication.doi) && (
        <div className="pub-meta-links">
          {publication.pdf && (
            <a href={publication.pdf} target="_blank" rel="noreferrer" className="pub-meta-link">
              PDF
            </a>
          )}
          {publication.doi && (
            <a href={`https://doi.org/${publication.doi.replace('https://doi.org/', '')}`} target="_blank" rel="noreferrer" className="pub-meta-link">
              DOI
            </a>
          )}
        </div>
      )}
    </div>
  );
}
