import { Blog } from '../lib/data';

interface BlogCardProps {
  post: Blog;
}

export function BlogCard({ post }: BlogCardProps) {
  return (
    <article className="blog-card">
      <a href={post.link} target="_blank" rel="noopener noreferrer" className="blog-card-link">
        <div className="blog-card-content">
          <div className="blog-card-left">
            <h3 className="blog-card-title">{post.title}</h3>
            {post.summary && <p className="blog-card-summary">{post.summary}</p>}
            {post.date && <p className="blog-card-date">{post.date}</p>}
          </div>
          {post.image && (
            <div className="blog-card-right">
              <img 
                src={post.image} 
                alt={`Featured image for ${post.title}`} 
                className="blog-card-image"
              />
            </div>
          )}
        </div>
      </a>
    </article>
  );
}
