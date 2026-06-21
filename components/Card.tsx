import Link from 'next/link';
import Image from 'next/image';

interface CardProps {
  title: string;
  description: string;
  href: string;
  tags?: string[];
  website?: string;
  github?: string;
  image?: string;
}

export function Card({ title, description, href, tags = [], website, github, image }: CardProps) {
  return (
    <article className="card project-card">
      <div className="project-card-content">
        <div className="project-card-left">
          <h3>
            <Link href={href} className="project-title-link">
              {title}
            </Link>
          </h3>
          <p className="project-card-description">{description}</p>
          
          <div className="tag-list" style={{ marginTop: '0.75rem', marginBottom: '0.75rem' }}>
            {tags.map((tag) => (
              <span key={tag} className="tag">{tag}</span>
            ))}
          </div>

          {(website || github) && (
            <div className="pub-meta-links" style={{ marginTop: '0.5rem' }}>
              {website && (
                <a href={website} target="_blank" rel="noreferrer" className="pub-meta-link">
                  Website
                </a>
              )}
              {github && (
                <a href={github} target="_blank" rel="noreferrer" className="pub-meta-link">
                  GitHub
                </a>
              )}
            </div>
          )}
        </div>
        
        {image && (
          <div className="project-card-right">
            <Link href={href}>
              <Image src={image} alt={`Featured image for ${title}`} className="project-card-image" width={600} height={400} />
            </Link>
          </div>
        )}
      </div>
    </article>
  );
}

