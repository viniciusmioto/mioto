import Link from 'next/link';
import { getAllBlogs } from '../../lib/content';
import { SectionHeading } from '../../components/SectionHeading';
import { BlogCard } from '../../components/BlogCard';

export default function BlogPage() {
  const blogs = getAllBlogs();

  return (
    <div className="page-shell">
      <SectionHeading title="Blog" description="Recent blog posts and articles." />
      {blogs.length === 0 ? (
        <div className="empty-state">
          <p>No blog posts are published yet. Check back soon for updates.</p>
        </div>
      ) : (
        <div className="single-column-list">
          {blogs.map((post) => (
            <BlogCard key={post.slug} post={post} />
          ))}
        </div>
      )}
      <div className="section-actions" style={{ marginTop: '1.5rem', display: 'flex', justifyContent: 'center' }}>
        <a className="button button-secondary" href="https://blog.ptidej.net/author/vinicius/" target="_blank" rel="noopener noreferrer">
          View all blogs
        </a>
      </div>
    </div>
  );
}
