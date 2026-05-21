import Link from 'next/link';

interface CardProps {
  title: string;
  description: string;
  href: string;
  tags?: string[];
}

export function Card({ title, description, href, tags = [] }: CardProps) {
  return (
    <article className="card card-link">
      <div>
        <h3>{title}</h3>
        <p>{description}</p>
      </div>
      <div className="tag-list">
        {tags.map((tag) => (
          <span key={tag} className="tag">{tag}</span>
        ))}
      </div>
      <Link className="card-action" href={href}>
        Learn more
      </Link>
    </article>
  );
}
