import Link from 'next/link';
import { blog } from '../../lib/data';
import { SectionHeading } from '../../components/SectionHeading';

export default function BlogPage() {
  return (
    <div className="page-shell">
      <SectionHeading title="Blog" description="Recent blog posts and articles." />
      {blog.length === 0 ? (
        <div className="empty-state">
          <p>No blog posts are published yet. Check back soon for updates.</p>
        </div>
      ) : (
        <div className="grid-card-list">
          {blog.map((post) => (
            <article key={post.title} className="card">
              <h3>{post.title}</h3>
              <p className="meta-line">{post.event} • {post.date}</p>
              <p>{post.abstract}</p>
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
